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
        // if no picture and no cover are mentioned, throw an error
        if (!$request->get('picture') && !$request->get('cover')) {
            return $this->response400(array(
                'error' => 'The request is invalid. No picture and no cover are mentioned',
            ));
        }


        // check if access token is obtainable
        try {
            // initialize facebook API
            // https://developers.facebook.com/docs/php/howto/example_access_token_from_javascript
            $helper = $this->getJavaScriptHelper();

            $accessToken = $helper->getAccessToken();
        } catch(FacebookSdk\Exceptions\FacebookResponseException $e) {
            return $this->response500(array(
                'error' => 'Facebook Graph API returned an error.',
                'debug' => $e->getMessage(),
            ));
        } catch(FacebookSdk\Exceptions\FacebookSDKException $e) {
            return $this->response500(array(
                'error' => 'Facebook SDK returned an error.',
                'debug' => $e->getMessage(),
            ));
        } catch(\Exception $e) {
            return $this->response500(array(
                'error' => 'Facebook SDK failed.',
                'debug' => $e->getMessage(),
            ));
        }

        // return error if no access token obtained
        if (!isset($accessToken)) {
            return $this->response400(array(
                'error' => 'User is not logged in or aplication is not authorized.'
            ));
        }


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
