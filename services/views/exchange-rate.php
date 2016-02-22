<?php

use MarkWilson\XmlToJson\XmlToJsonConverter;
use Symfony\Component\HttpFoundation\Response;

return function() {

    try {
        return new Response(
            json_encode(array(
                'error' => 0,
                'exchange' => (new XmlToJsonConverter())->asArray(
                    new SimpleXMLElement(file_get_contents('http://www.bnr.ro/nbrfxrates.xml'))
                ),
            )),
            200
        );
    } catch(\Exception $e) {
        return new Response(
            json_encode(array(
                'error' => 'Failed grabbing exchange rate',
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            )),
            200
        );
    }
};