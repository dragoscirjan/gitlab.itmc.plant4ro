<?php

namespace Ppr\Mvc\Model;

use Doctrine\ORM\Mapping as ORM;

/**
 * Donation
 *
 * @ORM\Table(name="donation", uniqueConstraints={@ORM\UniqueConstraint(name="UNIQ_31E581A0A56AD13F", columns={"donatorId"})})
 * @ORM\Entity
 */
class Donation
{

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
    private $currency;

    /**
     * @var string
     *
     * @ORM\Column(name="exchange", type="decimal", precision=6, scale=4, nullable=false)
     */
    private $exchange;

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
    private $completed = 0;

    /**
     * @var string
     *
     * @ORM\Column(name="status", type="string", length=30, nullable=false)
     */
    private $status = '';

    /**
     * @var string
     *
     * @ORM\Column(name="transactions", type="blob", length=65535, nullable=true)
     */
    private $transactions;

    /**
     * @var \Donator
     *
     * @ORM\ManyToOne(targetEntity="Donator")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="donatorId", referencedColumnName="id")
     * })
     */
    private $donatorid;


}

