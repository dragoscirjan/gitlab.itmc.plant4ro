<?php

use MarkWilson\XmlToJson\XmlToJsonConverter;
use Symfony\Component\HttpFoundation\Response;

return function() {

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
        return new Response(
            json_encode(array(
                'error' => 0,
                'list' => $list,
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
