<?php

namespace Ppr\Mvc\Model;

use Doctrine\ORM\Mapping as ORM;

/**
 * Donations
 *
 * @ORM\Table(name="donations")
 * @ORM\Entity
 */
class Donation {

    const STATUS_FAILED = 0;
    const STATUS_PENDING = 10;
    const STATUS_COMPLETED = 512;
    const STATUS_COMPLETED_ANNO = 513;
    const STATUS_EMAILED = 1024;
    const STATUS_EMAILED_ANNO = 1025;

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
     * @ORM\Column(name="donation", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $donation;

    /**
     * @var string
     *
     * @ORM\Column(name="currency", type="string", length=3, nullable=false)
     */
    private $currency = 'RON';

    /**
     * @var string
     *
     * @ORM\Column(name="exchange", type="decimal", precision=6, scale=4, nullable=false)
     */
    private $exchange = 0;

    /**
     * @var integer
     *
     * @ORM\Column(name="trees", type="integer", nullable=false)
     */
    private $trees;

    /**
     * @var string
     *
     * @ORM\Column(name="uuid", type="string", length=48, nullable=true)
     */
    private $uuid;

    /**
     * @var string
     *
     * @ORM\Column(name="status", type="integer", length=30, nullable=false)
     */
    private $status = self::STATUS_PENDING;

    /**
     * @var string
     *
     * @ORM\Column(name="hash", type="text", length=65535, nullable=true)
     */
    private $hash = '';

    /**
     * @var string
     *
     * @ORM\Column(name="hash_method", type="string", length=8, nullable=true)
     */
    private $hashMethod = '';

    /**
     * @var \Donator
     *
     * @ORM\ManyToOne(targetEntity="Donator", inversedBy="donations")
     * @ORM\JoinColumn(name="donatorId", referencedColumnName="id")
     */
    private $donator;

}

