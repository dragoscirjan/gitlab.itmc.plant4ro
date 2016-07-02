<?php

namespace Ppr\Mvc\Controller;

use MyProject\Proxies\__CG__\stdClass;
use Ppr\Application;
use Ppr\Http\Response;
use Ppr\Mvc\Model;

use Braintree;
use MarkWilson\XmlToJson\XmlToJsonConverter;
use Mobilpay_Payment_Request_Abstract as MPRA;
use Symfony\Component\HttpFoundation\Request;

class Partners {

    /**
     * @param Application $app
     * @return Response
     */
    public function forestryUnits(Application $app) {

        // TODO: Implement donator list from database
        try {
            $list = [];
            $forestryUnits = $app->getEm()
                ->createQuery('SELECT fu.unitName, SUM(fu.trees) as treesSum FROM \Ppr\Mvc\Model\ForestryUnit fu GROUP BY fu.unitName HAVING treesSum > 0 ORDER BY treesSum DESC')
//                ->setParameter(1, Model\Donation::STATUS_COMPLETED)
//                ->setParameter(2, Model\Donation::STATUS_EMAILED)
//                ->setMaxResults(20)
                ->getResult();
            foreach ($forestryUnits as $unit) {
                $list[] = $unit;
            }
            return Response::response(array(
                'error' => 0,
                'list' => $list,
            ));
        } catch(\Exception $e) {
            $app->getLogger()->err("{$e->getMessage()}\n{$e->getTraceAsString()}");
            return Response::response500(array(
                'error' => 'Failed grabbing forestry units',
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ), $app);
        }

    }

    public function companies(Application $app) {

        // TODO: Implement donator list from database
        try {
            $list = [];
            $donators = $app->getEm()
                ->createQuery('SELECT d FROM \Ppr\Mvc\Model\Donator d WHERE d.company != \'\' ORDER BY d.id DESC')
                ->getResult();
            foreach ($donators as $donator) {
                $list[] = [
                    'name' => $donator->getCompany(),
                    'logo' => $donator->getLogo(),
                    'url' => $donator->getUrl()
                ];
            }
            return Response::response(array(
                'error' => 0,
                'list' => $list,
            ));
        } catch(\Exception $e) {
            $app->getLogger()->err("{$e->getMessage()}\n{$e->getTraceAsString()}");
            return Response::response500(array(
                'error' => 'Failed grabbing forestry units',
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ), $app);
        }

    }

    public function donators(Application $app) {

        // TODO: Implement donator list from database
        try {
            $list = [];
            $donations = $app->getEm()
//                ->createQuery('SELECT d FROM \Ppr\Mvc\Model\Donator d WHERE d.company = \'\' ORDER BY d.id DESC')
                ->createQuery('SELECT d.name, d.company, d.location, SUM(do.trees) as strees 
FROM \Ppr\Mvc\Model\Donation do
JOIN do.donator d
GROUP BY do.donator
HAVING strees != 0 
ORDER BY do.id DESC')
                ->getResult();
//            die(var_dump($donations));
//            foreach ($donators as $donator) {
            foreach ($donations as $donation) {
                $list[] = [
//                    'name' => $donator->getName(),
//                    'town' => $donator->getLocation()
                    'name' => trim($donation['company']) ? $donation['company'] : $donation['name'],
                    'town' => $donation['location'],
                    'trees' => $donation['strees']
                ];
            }
            return Response::response(array(
                'error' => 0,
                'list' => $list,
            ));
        } catch(\Exception $e) {
            $app->getLogger()->err("{$e->getMessage()}\n{$e->getTraceAsString()}");
            return Response::response500(array(
                'error' => 'Failed grabbing forestry units',
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ), $app);
        }

    }

}