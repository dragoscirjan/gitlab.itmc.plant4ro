<?php

namespace Ppr\Http;

use Ppr\Application;

use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class Response extends SymfonyResponse
{
    /**
     * @param $message
     * @param int $status
     * @return Response
     */
    public static function response($message, $status = Response::HTTP_CREATED) {
        return new Response(
            json_encode($message),
            $status
        );
    }

    /**
     * @param $message
     * @return Response
     */
    public static function response400($message) {
        return self::response(
            $message,
            Response::HTTP_BAD_REQUEST
        );
    }
    /**
     * @param $message
     * @return Response
     */
    public static function response500($message, Application $app) {
        switch (true) {
            case (!empty($message['e']) && $message['e'] instanceof \Exception):
                $app->getLogger()->err(sprintf(
                    "%s: %s, \n%s",
                    $message['error'],
                    $message['e']->getMessage(),
                    $message['e']->getTraceAsString()
                ));
                return self::response(
                    [
                        'error' => $message['error'],
                        'message' => $message['e']->getMessage(),
                        'trace' => $message['e']->getTraceAsString()
                    ],
                    Response::HTTP_INTERNAL_SERVER_ERROR
                );
            default:
                $app->getLogger()->err(sprintf("%s: %s", $message['error'], json_encode($message)));
                return self::response(
                    $message,
                    Response::HTTP_INTERNAL_SERVER_ERROR
                );
        }


    }
}