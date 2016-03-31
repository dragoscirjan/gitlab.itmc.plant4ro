<?php

namespace Ppr\Mvc\Model;

use Doctrine\ORM\Mapping as ORM;

/**
 * Diplomas
 *
 * @ORM\Table(name="diplomas", uniqueConstraints={@ORM\UniqueConstraint(name="UNIQ_EEED2AD51E057D48", columns={"donationId"})})
 * @ORM\Entity
 */
class Diploma {

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
     * @var integer
     *
     * @ORM\Column(name="diplomaType", type="integer", nullable=false)
     */
    private $diplomatype;

    /**
     * @var integer
     *
     * @ORM\Column(name="sent", type="integer", nullable=false)
     */
    private $sent;

    /**
     * @var \Donation
     *
     * @ORM\ManyToOne(targetEntity="Donation")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="donationId", referencedColumnName="id")
     * })
     */
    private $donationid;


}

