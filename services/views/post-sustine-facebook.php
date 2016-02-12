<?php

namespace Prietenii\Padurilor;

use Facebook as FacebookSdk;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


/**
 * Class Facebook
 * @package Prietenii\Padurilor
 */
class Facebook extends FacebookSdk\Facebook {


    function run(Request $request) {

        $self = $this;

        return $this->tryCall(function() {
            // initialize facebook API
            // https://developers.facebook.com/docs/php/howto/example_access_token_from_javascript
            return $this->getJavaScriptHelper()->getAccessToken();
        }, function($token) use ($request, $self) {
            // if cover is sent
            if ($request->get('cover')) {
                return $self->cover($request->get('cover'), $token);
            }

            //
            if ($request->get('picture')) {
                return $self->picture($request->get('picture'), $token);
            }

            // if no picture and no cover are mentioned, throw an error
            return $this->response400(array(
                'error' => 'The request is invalid. No picture and no cover are mentioned',
            ));
        }, function($message) {
            return $this->response500($message);
        });
    }

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

    //https://github.com/ashwin47/Net-Neutral/blob/master/update.php
    function picture($id, $token)
    {
        // prepare image upload
        $image = array(
            'caption' => 'Sustin Planteaza pentru Romania',
            'source' => $this->fileToUpload('pictures/picture-1.jpg'),
        );

        return $this->tryCall(function() use ($image, $token) {
            // post image
            return $this->post('/me/photos', $image, $token);
        }, function($response){
            $graphNode = $response->getGraphNode();
            var_dump($response);
            var_dump($graphNode);
            die();
//            http://stackoverflow.com/questions/4370669/facebook-api-php-is-it-possible-to-change-a-users-profile-image-via-fb-graph
//            http://www.sanwebe.com/2012/09/change-facebook-cover-or-profile-pic-with-php
//            object(Facebook\GraphNodes\GraphNode)#86 (1) {
//            ["items":protected]=>
//  array(2) {
//                ["id"]=>
//    string(16) "1231598333535995"
//    ["post_id"]=>
//    string(33) "1230886800273815_1231598333535995"
//  }
//}
            return $this->response(array('error' => 0, 'message' => 'Te pup, pa pa!'));
        }, function($message) {
            return $this->response500($message);
        });

    }

    /**
     * @param $callback closure
     */
    function tryCall($try, $resolve, $reject) {
        try {
            call_user_func_array($resolve, array(
                call_user_func($try)
            ));
        } catch(FacebookSdk\Exceptions\FacebookResponseException $e) {
            return call_user_func_array($reject, array(array(
                'error' => 'Facebook Graph API returned an error.',
                'message' => $e->getMessage(),
            )));
        } catch(FacebookSdk\Exceptions\FacebookSDKException $e) {
            return call_user_func_array($reject, array(array(
                array(
                    'error' => 'Facebook SDK returned an error.',
                    'message' => $e->getMessage(),
                )
            )));
        } catch(\Exception $e) {
            return call_user_func_array($reject, array(array(
                'error' => 'Facebook SDK failed.',
                'message' => $e->getMessage(),
            )));
        }
    }

}

/**
 * @param Request $request
 * @return Response
 */
return function(Request $request) {
    return (new Facebook([
        'app_id'     => '187326271624400',
        'app_secret' => '3481a3748dcc9fd362b8de7d3f0ce197',
        'default_graph_version' => 'v2.5',
    ]))->run($request);
};


?>
