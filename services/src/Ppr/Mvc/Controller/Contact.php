<?php

namespace Ppr\Mvc\Controller;

use Ppr\Application;
use Ppr\Http\Response;

use Symfony\Component\HttpFoundation\Request;
use Zend\Mail;

/**
 * Class Index
 */
class Contact {

    /**
     * @param Application $app
     * @return Response
     */
    public function sendEmail(Application $app, Request $request) {
        // TODO: Implement tree count from database
        try {
            $mail = new Mail\Message();
            $mail->setBody(sprintf("Buna ziua, numele meu este: %s\n
si ma puteti contacta la adresa de mail: %s\n
fac parte din companya: %s\n
avand codul fiscal: %s\n
si va contactez in legatura cu: %s\n
%s",
                $request->get('name'),
                $request->get('email'),
                $request->get('company'),
                $request->get('vat'),
                $request->get('subject'),
                $request->get('message')
            ));
            $mail->setSubject(sprintf('Mesaj nou cu tema: %s', $request->get('subject')));
            call_user_func_array([$mail, 'setFrom'], $app->getConfig('contact.from')->toArray());
            call_user_func_array([$mail, 'addTo'], $app->getConfig('contact.to')->toArray());

            $class = $app->getConfig('contact.mail.transport');
            $transport = new $class();
            if (class_exists($class . 'Options') && $app->getConfig('contact.mail.options')) {
                $class .= 'Options';
                $transport->setOptions(new $class($app->getConfig('contact.mail.options')->toArray()));
            }

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
            ));
        }
    }

}
