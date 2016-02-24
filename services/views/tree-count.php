<?php

use MarkWilson\XmlToJson\XmlToJsonConverter;
use Symfony\Component\HttpFoundation\Response;

return function() {

// TODO: Implement tree count from database
    try {
        return new Response(
            json_encode(array(
                'error' => 0,
                'treeCount' => substr(time(), -6),
            )),
            200
        );
    } catch(\Exception $e) {
        return new Response(
            json_encode(array(
                'error' => 'Failed grabbing tree count',
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            )),
            200
        );
    }
};

?>
