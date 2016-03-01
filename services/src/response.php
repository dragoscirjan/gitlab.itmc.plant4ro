<?php

use Symfony\Component\HttpFoundation\Response;

/**
 * @param $message
 * @param int $status
 * @return Response
 */
function response($message, $status = Response::HTTP_CREATED) {
    return new Response(
        json_encode($message),
        $status
    );
}

/**
 * @param $message
 * @return Response
 */
function response400($message) {
    return $this->response(
        $message,
        Response::HTTP_BAD_REQUEST
    );
}
/**
 * @param $message
 * @return Response
 */
function response500($message) {
    return $this->response(
        $message,
        Response::HTTP_INTERNAL_SERVER_ERROR
    );
}