<?php

namespace Ppr\Mvc\Model\ModelTrait;

trait Doctrine
{

    public function __construct(array $array) {
        foreach ($array as $key => $value) {
            $this->$key = $value;
        }
    }

    public function __call($method, $arguments) {
        if (substr($method, 0, 3) == 'get') {
//            die(var_dump(lcfirst(substr($method, 3)), $this->{lcfirst(substr($method, 3))}));
            return $this->{lcfirst(substr($method, 3))};
        }
        if (substr($method, 0, 3) == 'set') {
            $this->{ucfirst(lcfirst($method, 3))} = $arguments[0];
            return;
        }
        throw new \Exception("Method `$method` does not exists");
    }

}