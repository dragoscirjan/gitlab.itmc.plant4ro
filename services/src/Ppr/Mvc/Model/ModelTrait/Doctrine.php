<?php

namespace Ppr\Mvc\Model\ModelTrait;

use ReflectionClass, ReflectionProperty;

trait Doctrine
{

    public function __construct($array = []) {
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
            $this->{lcfirst(substr($method, 3))} = $arguments[0];
            return;
        }
        throw new \Exception("Method `$method` does not exists");
    }

    /**
     * @return array
     */
    public function toArray() {
        $iterable = [];
        $refl = new ReflectionClass(get_class($this));
        $reflProps = $refl->getProperties(ReflectionProperty::IS_PRIVATE);
        foreach ($reflProps as $reflProp) {
            $name = $reflProp->getName();
            if (strpos($reflProp->getDocComment(), '@ORM\Column') !== false) {
                $iterable[$name] = $this->{$name};
                if (is_resource($iterable[$name])) {
                    $iterable[$name]  = stream_get_contents($iterable[$name]);
                }
            }
            if (preg_match('/@ORM.(One|Many)To(One|Many)/i', $reflProp->getDocComment())) {
                $iterable[$name] = $this->{$name};
                if (is_array($iterable[$name])) {
                    $array = [];
                    foreach ($iterable[$name] as $item) {
                        $array[] = $item->getId();
                    }
                    $iterable[$name] = $array;
                }
                if (is_object($iterable[$name])) {
                    $iterable[$name] = $iterable[$name]->getId();
                }
            }
        }
        var_dump($iterable);
        die(var_dump(json_encode($iterable)));
        return $iterable;
    }

    /**
     * @return mixed|string|void
     */
    public function toString() {
        return json_encode($this->toArray());
    }

    /**
     * @return mixed|string|void
     */
    public function __toString() {
        return $this->toString();
    }

}