<?php

namespace Ppr\Mvc\Controller;

use Ppr\Application;
use Ppr\Http\Response;

use Symfony\Component\HttpFoundation\Request;

/**
 * Class Index
 */
class Index {

    /**
     * @param Application $app
     * @return Response
     */
    public function sendEmail(Application $app, Request $request) {
        // TODO: Implement tree count from database
        try {
            die(var_dump($request->get('name')));
            return Response::response(array(
                    'error' => 0,
                    'treeCount' => substr(time(), -6),
            ));
        } catch(\Exception $e) {
            $app->getLogger()->err("{$e->getMessage()}\n{$e->getTraceAsString()}");
            return Response::response500(array(
                'error' => 'Failed grabbing tree count',
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ));
        }
    }

}
