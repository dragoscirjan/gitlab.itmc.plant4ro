<?php

namespace Ppr\Mvc\Controller;

use Ppr\Application;
use Ppr\Http\Response;

/**
 * Class Index
 */
class Index {

    /**
     * @param Application $app
     * @return Response
     */
    public function treeCount(Application $app) {
        // TODO: Implement tree count from database
        try {
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

    /**
     * @param Application $app
     * @return Response
     */
    public function donatorList(Application $app) {

        // TODO: Implement donator list from database
        try {
            $list = [];
            for ($i = 0; $i < 10; $i++) {
                $list[] = array(
                    'hash' => md5(time() . $i),
                    'name' => 'Dragos Cirjan',
                    'location' => 'Bucuresti, Romania',
                    'trees' => '20'
                );
            }
            for ($i = 10; $i < 20; $i++) {
                $list[] = array(
                    'hash' => md5(time() . $i),
                    'name' => 'Samsung',
                    'location' => 'Romania',
                    'trees' => '20'
                );
            }
            return Response::response(array(
                'error' => 0,
                'list' => $list,
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