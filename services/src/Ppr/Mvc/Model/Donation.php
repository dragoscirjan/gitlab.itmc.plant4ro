<?php

namespace Ppr\Mvc\Model;

use Doctrine\ORM\Mapping as ORM;

/**
 * Donation
 *
 * @ORM\Table(name="donation", uniqueConstraints={@ORM\UniqueConstraint(name="UNIQ_31E581A0A56AD13F", columns={"donatorId"})})
 * @ORM\Entity
 */
class Donation {

    const STATUS_FAILED = 0;
    const STATUS_PENDING = 10;
    const STATUS_COMPLETED = 512;

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
     * @var integer
     *
     * @ORM\Column(name="started", type="integer", nullable=false)
     */
    private $started;

    /**
     * @var integer
     *
     * @ORM\Column(name="completed", type="integer", nullable=false)
     */
    private $completed = self::STATUS_COMPLETED;

    /**
     * @var string
     *
     * @ORM\Column(name="status", type="string", length=30, nullable=false)
     */
    private $status = '';

    /**
     * @var string
     *
     * @ORM\Column(name="hash", type="blob", length=65535, nullable=true)
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
     * @ORM\ManyToOne(targetEntity="Donator")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="donatorId", referencedColumnName="id")
     * })
     */
    private $donatorid;

    /**
     * @var string
     *
     * @ORM\Column(name="passive", type="boolean")
     */
    private $passive = 0;

    /**
     * @var string
     *
     * @ORM\Column(name="anonymous", type="boolean")
     */
    private $anonymous = 0;

}

