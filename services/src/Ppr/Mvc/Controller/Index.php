<?php

namespace Ppr\Mvc\Controller;

use Ppr\Application;
use Ppr\Mvc\Model;
use Ppr\Http\Response;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class Index
 */
class Index {

    /**
     * @param Application $app
     * @return Response
     */
    public function treeCount(Application $app) {
        // TODO: Implement tree count from database
        try {
            $treeCount = $app->getEm()
                ->createQuery('SELECT SUM(fu.trees) AS treeCount FROM \Ppr\Mvc\Model\ForestryUnit fu')
                ->getSingleScalarResult();

            return Response::response(array(
                    'error' => 0,
                    'treeCount' => $treeCount ? $treeCount : 0,
            ));
        } catch(\Exception $e) {
            $app->getLogger()->err("{$e->getMessage()}\n{$e->getTraceAsString()}");
            return Response::response500(array(
                'error' => 'Failed grabbing tree count',
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ), $app);
        }
    }

    /**
     * @param Application $app
     * @return Response
     */
    public function donatorList(Application $app) {

        // TODO: Implement donator list from database
        try {
            $list = [];
            $donations = $app->getEm()
                ->createQuery('SELECT d FROM \Ppr\Mvc\Model\Donation d WHERE d.donation != 0 AND (d.status = ?1 OR d.status = ?2) ORDER BY d.id DESC')
                ->setParameter(1, Model\Donation::STATUS_COMPLETED)
                ->setParameter(2, Model\Donation::STATUS_EMAILED)
                ->setMaxResults(20)
                ->getResult();
            foreach ($donations as $donation) {
                if (!$donation->getDonator()) {
                    continue;
                }
                $list[] = array(
                    'hash' => $donation->getUuid(),
                    'name' => $donation->getDonator()->getCompany() ? $donation->getDonator()->getCompany() : $donation->getDonator()->getName(),
                    'location' => $donation->getDonator()->getLocation(),
                    'trees' => $donation->getTrees()
                );
            }
            return Response::response(array(
                'error' => 0,
                'list' => $list,
            ));
        } catch(\Exception $e) {
            $app->getLogger()->err("{$e->getMessage()}\n{$e->getTraceAsString()}");
            return Response::response500(array(
                    'error' => 'Failed grabbing tree count',
                    'message' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
            ), $app);
        }
    }

    /**
     * @param Application $app
     * @return Response
     */
    public function updateForestryUnits(Application $app) {
        $units = require $app->getCOnfig('path') . '/../sql/insert-forestry-unit.php';
        $restoreUnits = [];
        foreach ($units as $unit) {
            $unit = new Model\ForestryUnit($unit);
            if ($app->getEm()->find('\Ppr\Mvc\Model\ForestryUnit', $unit->getId()) === null) {
                $app->getEm()->persist($unit);
            } else {
                $app->getEm()->merge($unit);
            }
            $app->getEm()->flush();
            $restoreUnits[] = $unit->toArray();
        }
        return Response::response($restoreUnits);
    }

    /**
     * @param Application $app
     * @return Response
     */
    public function updateDonations(Application $app) {
        $donations = require $app->getCOnfig('path') . '/../sql/insert-donations.php';
        $restoreUnits = [];
        try {
            foreach ($donations as $donation) {
                $donator = new Model\Donator($donation['donator']);
                if ($app->getEm()->find('\Ppr\Mvc\Model\Donator', $donator->getId()) === null) {
                    $app->getEm()->persist($donator);
                } else {
                    $app->getEm()->merge($donator);
                }
    //            $app->getEm()->flush();

                $donation = new Model\Donation($donation);
                $donation->setDonator($donator);
                if ($app->getEm()->find('\Ppr\Mvc\Model\Donation', $donation->getId()) === null) {
                    $app->getEm()->persist($donation);
                } else {
                    $app->getEm()->merge($donation);
                }
                $app->getEm()->flush();

                $donation = $donation->toArray();
                $donation['donator'] = $donator->toArray();
                $restoreUnits[] = $donation;
            }
            return Response::response($restoreUnits);
        } catch (\Exception $e) {
            return Response::response500([
                'error' => 'Donations update error',
                'e' => $e
            ], $app);
        }
    }

    /**
     * @param Application $app
     * @param Request $request
     * @return Response
     */
    public function eventLocations(Application $app, Request $request) {
        $locations = [];
        try {
            $county = trim($request->get('county'));
            $query = $app->getEm()
                ->createQuery('SELECT m FROM \Ppr\Mvc\Model\ForestryUnit m WHERE m.gps != \'\' AND m.county LIKE ?1')
                ->setParameter(1, '%' . $county . '%');
            if ($county == 'all') {
                $query = $app->getEm()
                    ->createQuery('SELECT m FROM \Ppr\Mvc\Model\ForestryUnit m WHERE m.gps != \'\'');
            }
            $items = $query->getResult();
            foreach ($items as $item) {
                $locations[] = [
                    "lat" => array_shift(explode(',', $item->getGps())),
                    "lng" => array_pop(explode(',', $item->getGps())),
                    "title" => $item->getUnitName(),
                    "street" => $item->getTrees() . ' pomi',
                    "city" => $item->getGpsDetails(),
                    "zip" => $item->getGps()
                ];
            }
            return Response::response($locations);
        } catch (\Exception $e) {
            return Response::response500([
                'error' => 'Donations update error',
                'e' => $e
            ], $app);
        }
    }

}