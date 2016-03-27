<?php

namespace Ppr\Mvc\Model\ModelTrait;

use Doctrine\ORM\PersistentCollection;
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
            $name = lcfirst(substr($method, 3));
            if (is_resource($this->{$name})) {
                return stream_get_contents($this->{$name});
            }
            return $this->{$name};
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
                $iterable[$name] = call_user_func([$this, 'get' . ucfirst($name)]);
            }
            if (preg_match('/@ORM.(One|Many)To(One|Many)/i', $reflProp->getDocComment())) {
                $value = call_user_func([$this, 'get' . ucfirst($name)]);
                var_dump($value);die();
                if ($value instanceof PersistentCollection) {
//                    $array = [];
//                    $value->forAll(function($item) use ($array) { $array[] = [ 'id' => $item->getId() ]; });
//                    $iterable[$name] = $array;
                } else {
                    $iterable[$name] = [ 'id' => $value->getId() ];
                }
            }
        }
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