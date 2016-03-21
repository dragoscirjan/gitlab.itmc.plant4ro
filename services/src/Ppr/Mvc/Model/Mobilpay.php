<?php

namespace Ppr\Mvc\Model;

use Doctrine\ORM\Mapping as ORM;

/**
 * Donator
 *
 * @ORM\Table(name="mobilpay")
 * @ORM\Entity
 */
class Mobilpay {

    use \Ppr\Mvc\Model\ModelTrait\Doctrine;

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="uuid", type="string", length=48, nullable=true)
     */
    private $uuid;

    /**
     * @var string
     *
     * @ORM\Column(name="hash", type="string", length=65536, nullable=true)
     */
    private $hash;

    /**
     * @var string
     *
     * @ORM\Column(name="hash_method", type="string", length=8, nullable=true)
     */
    private $hashMethod;

    /**
     * @var integer
     *
     * @ORM\Column(name="stamp", type="integer", nullable=false)
     */
    private $stamp;

}