<?php
/**
 * Created by PhpStorm.
 * User: dragosc
 * Date: 04.04.2016
 * Time: 23:36
 */

namespace Ppr\Mvc\Controller;


use Ppr\Application;
use Ppr\Http\Response;

use Symfony\Component\HttpFoundation\Request;
use Zend\Mail;
use Zend\Mime;

class Pdf
{

    public function index(Application $app, Request $request)
    {

        try {

            $donation = $app->getEm()->getRepository('\Ppr\Mvc\Model\Donation')->findBy(['uuid' => $request->get('orderId')])[0];
//            die(var_dump($donation));
//            $donation = $donation->toArray();
//            $donation['hash'] = $app->decode($donation['hash']);
//
//            $donator = $app->getEm()->getRepository('\Ppr\Mvc\Model\Donator')->find($donation['donator']['id']);
//            $donation['donator'] = [
//                'name' => $donator->getName(),
//                'company' => $donator->getCompany()
//            ];

            ob_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="/jspm_packages/github/twbs/bootstrap@3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="/dist/assets/styles/styles.css">
</head>
<body class="print">

    <div id="diploma" class="certificate">
        <div class="certificate__inner">
            <div class="certificate__logo">
                <img src="/dist/assets/img/logo.png" alt="">
            </div>
            <h3 class="certificate__title">Diploma</h3>
            <div class="certificate__content">
                <span>Se acordă titlul de <strong>"Prieten(ă) al Pădurilor din Romania"</strong> companiei/persoanei</span>
                <div class="form-group">
                    <span class="certificate__input form-control form-control--full text-center"><?php echo $donation->getDonator()->getCompany() ? $donation->getDonator()->getCompany() : $donation->getDonator()->getName  (); ?></span>
                </div>
                <span>Pentru că a susținut proiectul <strong>"Plantează pentru România"</strong> ediția nr. 1 din 2016 adoptând</span>
                <div class="form-group form-group--inline">
                    <span class="certificate__input form-control text-center"><?php echo $donation->getTrees(); ?></span>
                </div>
                <span>puieți.</span>
                <p>*Suma primită de la oricine o împărțim la 5 RON care este unitatea standard de măsură a implicării financiare în cadrul acestui proiect (cu fiecare 5 RON sponsorii sau donatorii adoptă un arbore).</p>
            </div>
            <div class="certificate__footer">
                <div class="l-flex l-flex--vcenter">
                    <div class="l-flex__item">
                        <div class="stamp">
                            <span class="stamp__text">Ediția</span>
                            <span class="stamp__number">1</span>
                        </div>
                    </div>
                    <div class="l-flex__item">
                        <div class="certificate__signature">
                            <span><strong>Prietenii Pădurilor din România</strong></span>
                            <br>
                            <span>
                                Președinte
                                <br>
                                ing. silvic Florin Nan
                            </span>
                            <br>
                            <div class="form-group form-group--inline">
                                <span class="certificate__input form-control text-right"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <!-- /.certificate__footer -->
        </div> <!-- /.certificate__inner -->
        <div class="flag flag--ro flag--diploma">
            <div class="flag__colour"></div>
            <div class="flag__colour"></div>
            <div class="flag__colour"></div>
        </div>
    </div> <!-- /#diploma -->

</body>
</html>

<?php
            return new Response(ob_get_clean(), Response::HTTP_OK, [ 'Content-Type', 'text/html' ]);
        } catch (\Exception $e) {
            // return exception
            return Response::response500([
                'error' => '(Pdf/View) :: FAIL Error interrogating database.',
                'e' => $e,
            ], $app);
        }
    }

    /**
     * @param Application $app
     * @param Request $request
     * @return Response
     */
    public function generate(Application $app, Request $request)
    {
        try {
            $command = sprintf(
//                'xvfb-run --server-args="-screen 0 1920x1080x24" wkhtmltopdf -O landscape  --page-size A4 ' .
//                'xvfb-run --server-args="-screen 0 1024x768x24" wkhtmltopdf --orientation landscape  --page-size A4 ' .
                'xvfb-run --server-args="-screen 0 1366x965x24" ' . __DIR__ . '/../../../../vendor/bin/wkhtmltopdf-amd64' .
                // __DIR__ . '/../../../../vendor/bin/wkhtmltopdf-amd64 --orientation landscape  --page-size A4 ' .
//                    '--javascript-delay 2000 ' .
                    ' --zoom 0.99977' .
                    ' --orientation landscape --page-size A4' .
                    // ' -B 3mm -L 3mm -R 3mm -T 3mm ' .
                    ' -B 0mm -L 0mm -R 0mm -T 0mm ' .
                    ' "%s/services/index.php/pdf/%s" %s/cache/%s.pdf',
                $app->getConfig('url'),
                $request->get('orderId'),
                $app->getConfig('path'),
                $request->get('orderId')
            );

            exec($command, $output, $result);

            return Response::response([
                'error' => 0,
                'command' => $command,
                'output' => $output,
                'result' => $result,
            ]);
        } catch (\Exception $e) {
            // return exception
            return Response::response500([
                'error' => '(Pdf/Generate) :: Fail generating the pdf.',
                'e' => $e,
            ], $app);
        }
    }

    /**
     * @param Application $app
     * @param Request $request
     */
    public function download(Application $app, Request $request)
    {
        $file = sprintf('%s/cache/%s.pdf', $app->getConfig('path'), $request->get('orderId'));
        return new Response(
            file_get_contents($file),
            Response::HTTP_OK,
            [
                'Content-Type' => 'application/octet-stream',
                'Content-Disposition' => 'attachment; filename=' . $request->get('orderId') . '.pdf',
                'Content-Type' =>'application/octet-stream',
                'Content-Type' => 'application/download',
                'Content-Description' => 'File Transfer',
                'Content-Length' => filesize($file)
            ]
        );
    }

    /**
     * @param Application $app
     * @param Request $request
     * @return Response
     */
    public function mail(Application $app, Request $request)
    {
        try {
            $donation = $app->getEm()->getRepository('\Ppr\Mvc\Model\Donation')->findBy(['uuid' => $request->get('orderId')])[0];

            // first create the parts
            $text = new Mime\Part();
            $text->type = Mime\Mime::TYPE_HTML;
            $text->charset = 'utf-8';
            $text->setContent("Iti multumim pentru donatia facuta. Copacelul la plantarea caruia tu ai contribuit astazi va creste mare si va avea grija de planeta ta.");

            $file = sprintf('%s/cache/%s.pdf', $app->getConfig('path'), $request->get('orderId'));
            $fileContent = fopen($file, 'r');
            $attachment = new Mime\Part($fileContent);
            $attachment->type = 'application/pdf';
            $attachment->filename = sprintf('dipoma-%s.pdf', $request->get('orderId'));
            $attachment->disposition = Mime\Mime::DISPOSITION_ATTACHMENT;
// Setting the encoding is recommended for binary data
            $attachment->encoding = Mime\Mime::ENCODING_BASE64;

            $message = new Mime\Message();
            $message->setParts([$text, $attachment]);

            $mail = new Mail\Message();
            $mail->setBody($message);
            $mail->setSubject(sprintf('Multumim pentru donatie', $request->get('subject')));

            call_user_func_array([$mail, 'setFrom'], $app->getConfig('contact.from')->toArray());
//            call_user_func_array([$mail, 'addTo'], $app->getConfig('contact.to')->toArray());
            $mail->addTo($donation->getDonator()->getEmail(), $donation->getDonator()->getName());

            $class = $app->getConfig('contact.mail.transport');
            $transport = new $class();
            if (class_exists($class . 'Options') && $app->getConfig('contact.mail.options')) {
                $class .= 'Options';
                $transport->setOptions(new $class($app->getConfig('contact.mail.options')->toArray()));
            }

//            die(var_dump($mail));

            $transport->send($mail);

            return Response::response(array(
                'error' => 0
            ));
        } catch(\Exception $e) {
            $app->getLogger()->err("{$e->getMessage()}\n{$e->getTraceAsString()}");
            return Response::response500(array(
                'error' => 'Failed to send email',
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ), $app);
        }
    }

}
