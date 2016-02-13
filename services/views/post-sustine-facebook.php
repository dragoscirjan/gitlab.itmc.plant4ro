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

    /**
     * @param Request $request
     * @return Response
     */
    function run(Request $request) {
        return $this->tryCall(function() {
            // https://developers.facebook.com/docs/php/howto/example_access_token_from_javascript
            // try to obtaining facebook js access token
            return $this->getAccessToken();
        }, function($token) use ($request) {
            // if success
            // if cover selected, try to upload cover
            if ($request->get('cover')) {
                return $this->cover($request->get('cover'), $token);
            }
            // if picture selected, try to upload picture
            if ($request->get('picture')) {
                return $this->picture($request->get('picture'), $token);
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
     * @param $id    int
     * @param $token string
     * @return Response
     */
    function picture($id, $token)
    {
        // prepare image upload
        $image = array(
            'caption' => 'Sustin Planteaza pentru Romania',
            'source' => $this->fileToUpload('pictures/picture-1.jpg'),
        );
        // try to upload image
        return $this->tryCall(function() use ($image, $token) {
            // post image
            return $this->post('/me/photos', $image, $token);
        }, function($response) use ($token) {
            // return picture id
            return $this->response(array(
                'error' => 0,
                'id' => $response->getDecodedBody()['id']
            ));
        }, function($message) {
            // send error in any other case
            return $this->response500($message);
        });
    }

    /**********************************************************************************************
     * Response
     **********************************************************************************************/

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

    /**
     * @param $try     callback
     * @param $resolve callback
     * @param $reject  callback
     * @return Response
     */
    function tryCall($try, $resolve, $reject) {
        try {
            return call_user_func_array($resolve, array(
                call_user_func($try)
            ));
        } catch(FacebookSdk\Exceptions\FacebookResponseException $e) {
            return call_user_func_array($reject, array(array(
                'error' => 'Facebook Graph API returned an error.',
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            )));
        } catch(FacebookSdk\Exceptions\FacebookSDKException $e) {
            return call_user_func_array($reject, array(array(
                array(
                    'error' => 'Facebook SDK returned an error.',
                    'message' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                )
            )));
        } catch(\Exception $e) {
            return call_user_func_array($reject, array(array(
                'error' => 'Facebook SDK failed.',
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            )));
        }


    }

    /**********************************************************************************************
     * Access Token
     **********************************************************************************************/

    /**
     * @return \Facebook\Authentication\AccessToken|string|null
     */
    function getAccessToken() {
        if ($this->hasSessionAccessToken()) {
            return $this->getSessionAccessToken();
        }
        $token = $this->getJavaScriptHelper()->getAccessToken();
        $ltToken = json_decode(
            $this->get('/oauth/access_token?grant_type=fb_exchange_token&client_id=' . $this->getApp()->getId() .
                '&client_secret=' . $this->getApp()->getSecret() . '&fb_exchange_token=' . ((string) $token), $token)->getBody()
        );
        $this->setSessionAccessToken($ltToken->access_token);
        return $this->getSessionAccessToken();
    }

    /**
     * @return string
     */
    function getSessionAccessToken() {
        return $_SESSION['fb_access_token'];
    }

    /**
     * @return bool
     */
    function hasSessionAccessToken() {
        return !empty($_SESSION['fb_access_token']);
    }

    /**
     * @param string $token
     * @return string
     */
    function setSessionAccessToken($token) {
        $_SESSION['fb_access_token'] = (string) $token;
        return $_SESSION['fb_access_token'];
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
