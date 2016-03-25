<?php
/**
 * Created by PhpStorm.
 * User: dragosc
 * Date: 05.03.2016
 * Time: 13:27
 */

namespace Ppr;

use Doctrine\DBAL;
use Doctrine\ORM;

use Ppr\Http\CorsListener;
use Zend\Cache\StorageFactory;

/**
 * Class Application
 * @package Ppr
 */
class Application extends \Silex\Application {

    const ENV_DEVELOP = 'development';
    const ENV_TESTING = 'testing';
    const ENV_STAGING = 'staging';
    const ENV_PRODUCT = 'production';

    static $ENV_ORDER_CASCADE = array(
        self::ENV_PRODUCT,
        self::ENV_STAGING,
        self::ENV_TESTING,
        self::ENV_DEVELOP
    );

    /********************************************************
     * Public Declarations
     ********************************************************/

    /**
     * Application constructor.
     * @param array $values
     */
    public function __construct(array $values = array())
    {

        parent::__construct($values);

//        $this['dispatcher']->addSubscriber(new CorsListener());

        if ($this->getEnv() == self::ENV_DEVELOP || $this->getEnv() == self::ENV_TESTING) {
            $this['debug'] = true;
        }

        $this['config'] = new \Zend\Config\Config(require_once $this['path'] . '/config.php');

        $this->getEm();

//        if (file_exists(__DIR__ . '.cache')) {
//            self::$cache = StorageFactory::factory(self::config('cache_helper'));
//        }
    }

    /**
     * @param $path
     * @return mixed
     */
    public function getConfig($path) {
        if (empty($this['envOrderCascade'])) {

            $envOrderCascade = [];
            foreach (self::$ENV_ORDER_CASCADE as $key) {
                array_push($envOrderCascade, $key);
            }
            while (array_shift($envOrderCascade) != $this['env']) ;
            array_unshift($envOrderCascade, $this['env']);
            $this['envOrderCascade'] = $envOrderCascade;
        }

        $keys = explode('.', $path);
        foreach ($this['envOrderCascade'] as $env) {
            $o = $this['config']->$env;
            $found = true;
            for ($i = 0; $i < count($keys); $i++) {
                if ($found && isset($o->{$keys[$i]})) {
                    $o = $o->{$keys[$i]};
                } else {
                    $found = false;
                }
            }
            if ($found && $i == count($keys)) {
                return $o;
            }
        }
        return null;
    }

    /**
     * @return string
     */
    public function getEnv()
    {
        if (!isset($this['env']) || empty($this['env'])) {
            if (!isset($this['env']) || empty($this['env'])) {
                $this['env'] = 'development';
            }

            if (file_exists($this['path'] . '/.env')) {
                $this['env'] = trim(file_get_contents($this['path'] . '/.env'));
                if (!in_array($this['env'], self::$ENV_ORDER_CASCADE)) {
                    throw new \Exception("Invalid environment setting: `" . $this['env'] . "`");
                }
            }
        }
        return $this['env'];
    }

    /**
     * @return \Doctrine\ORM\EntityManager|null
     */
    public function getEm() {
        if (!isset($this['em']) || empty($this['em'])) {
            if (!$this->getConfig('db')) {
               throw new \Exception('Application has no database configured');
            }

            if ($this['debug']) {
                $cache = new \Doctrine\Common\Cache\ArrayCache;
//                $cache = new \Doctrine\Common\Cache\FilesystemCache($this->getConfig('path') . '/cache');
            } else {
                $cache = new \Doctrine\Common\Cache\ApcuCache;
            }

            $config = ORM\Tools\Setup::createAnnotationMetadataConfiguration(
                array($this['path'] .'/src/Ppr/Mvc/Model'),
                $this['debug'],
                $this['path'] .'/src/Ppr/Mvc/Model/Proxy',
                $cache,
                false
            );
            $config->setProxyNamespace('Ppr\Mvc\Model\Proxy');
            $config->setMetadataCacheImpl($cache);
            $config->setQueryCacheImpl($cache);

            $this['em'] = ORM\EntityManager::create($this->getConfig('db')->toArray(), $config);
        }
        return $this['em'];
    }

    /**
     * @return mixed|\Zend\Log\Logger|null
     */
    public function getLogger() {
        if (!isset($this['logger']) || empty($this['logger'])) {
            $this['logger'] = new \Zend\Log\Logger;
//            $this['logger']->addWriter(new \Zend\Log\Writer\Stream($this['path'] . '/.log2'));
            foreach ($this->getConfig('logger')->toArray() as $writer) {
                call_user_func_array([$this['logger'], 'addWriter'], $writer);
            }
        }
        return $this['logger'];
    }

    /**
     * @param $object mixed
     * @return string
     * @throws \Exception
     */
    public function encode($object) {
        if ($this->getEnv() == self::ENV_DEVELOP || $this->getEnv() == self::ENV_TESTING) {
            return json_encode($object);
        }
        return base64_encode(json_encode($object));
    }
    /**
     * @param $strign string
     * @return mixed|string|void
     * @throws \Exception
     */
    public function decode($string) {
        if ($this->getEnv() == self::ENV_DEVELOP || $this->getEnv() == self::ENV_TESTING) {
            return json_decode($string);
        }
        return json_decode(base64_decode($string));
    }

    /**
     * @return string
     * @throws \Exception
     */
    public function encodeMethod() {
        if ($this->getEnv() == self::ENV_DEVELOP || $this->getEnv() == self::ENV_TESTING) {
            return '';
        }
        return 'base64';
    }

}