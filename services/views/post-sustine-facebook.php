<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Facebook\Facebook;

/**
 * @param Request $request
 * @return Response
 */
return function(Request $request) {

    // if no picture and no cover are mentioned, throw an error
    if (!$request->get('picture') && !$request->get('cover')) {
        return new Response(json_encode(array(
            'error' => 'The request is invalid. No picture and no cover are mentioned',
        )), Response::HTTP_BAD_REQUEST);
    }

    // initialize facebook API
    $fb = new Facebook([
        'app_id'     => '187326271624400',
        'app_secret' => '3481a3748dcc9fd362b8de7d3f0ce197',
        'default_graph_version' => 'v2.5',
    ]);

    
    $fb->get

    return new Response('', 201);
}

?>
