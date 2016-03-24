<?php

namespace Ppr\Mvc\Model;

use Doctrine\ORM\Mapping as ORM;

/**
 * Donator
 *
 * @ORM\Table(name="forestry_units")
 * @ORM\Entity
 */
class ForestryUnit {

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
     * @ORM\Column(name="unit_name", type="string", length=256, nullable=true)
     */
    private $unitName;

    /**
     * @var string
     *
     * @ORM\Column(name="trees", type="integer", nullable=false)
     */
    private $trees = 0;

    /**
     * @var string
     *
     * @ORM\Column(name="gps", type="string", length=64, nullable=true)
     */
    private $gps;

    /**
     * @var integer
     *
     * @ORM\Column(name="gpsDetails", type="string", length=1024, nullable=true)
     */
    private $gpsDetails;

}