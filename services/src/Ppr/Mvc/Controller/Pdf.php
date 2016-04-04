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
<!-- your html goes here -->
<?php
        return new Response(ob_get_clean(), Response::HTTP_OK, [ 'Content-Type', 'text/html' ]);
    }

}