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

class Pdf
{

    public function index(Application $app, Request $request)
    {
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
                    <input class="certificate__input form-control form-control--full text-center" type="text" name="" value.bind="donation.donator.company || donation.donator.name">
                </div>
                <span>Pentru că a susținut proiectul <strong>"Plantează pentru România"</strong> ediția nr. 1 din 2016 adoptând</span>
                <div class="form-group form-group--inline">
                    <input type="text" name="" value.bind="donation.trees" class="certificate__input form-control text-center">
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
                                <input type="text" name="" value="" class="certificate__input form-control text-right">
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
    }

}
