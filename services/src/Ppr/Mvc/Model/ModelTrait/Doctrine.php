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
            if (strpos($reflProp->getDocComment(), '@ORM\Column') !== false) {
                if (!preg_match('/@ORM\\(OneToMany|ManyToMany|ManyToOne)/g', $reflProp->getDocComment())) {
                    $iterable[$reflProp->getName()] = $this->{$reflProp->getName()};
                } else {
                    return [];
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