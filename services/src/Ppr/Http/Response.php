<?php

namespace Ppr\Http;

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
    public static function response500($message) {
        return self::response(
            $message,
            Response::HTTP_INTERNAL_SERVER_ERROR
        );
    }
}