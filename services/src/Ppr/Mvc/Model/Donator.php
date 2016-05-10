<?php

namespace Ppr\Mvc\Model;

use Doctrine\ORM\Mapping as ORM;

/**
 * Donators
 *
 * @ORM\Table(name="donators")
 * @ORM\Entity
 */
class Donator {

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
     * @ORM\Column(name="name", type="string", length=256, nullable=true)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=256, nullable=true)
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="url", type="string", length=256, nullable=true)
     */
    private $url;

    /**
     * @var string
     *
     * @ORM\Column(name="logo", type="string", length=256, nullable=true)
     */
    private $logo;

    /**
     * @var string
     *
     * @ORM\Column(name="company", type="string", length=256, nullable=true)
     */
    private $company;

    /**
     * @var string
     *
     * @ORM\Column(name="phone", type="string", length=256, nullable=true)
     */
    private $phone;

    /**
     * @var string
     *
     * @ORM\Column(name="location", type="string", length=256, nullable=true)
     */
    private $location = 'Romania';

    /**
     * @var string
     *
     * @ORM\Column(name="locationGps", type="string", length=256, nullable=true)
     */
    private $locationgps;

    /**
     * @var string
     *
     * @ORM\Column(name="companyVAT", type="string", length=20, nullable=true)
     */
    private $companyvat;

    /**
     * @var array
     *
     * @ORM\OneToMany(targetEntity="Donation", mappedBy="donations")
     */
    private $donations;


}

