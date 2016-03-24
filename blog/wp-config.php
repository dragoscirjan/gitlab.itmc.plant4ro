<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

 define('WP_HOME', $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['SERVER_NAME'] . '/blog');
 define('WP_SITEURL', $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['SERVER_NAME'] . '/blog');

define('FS_METHOD', 'direct');

if ($_SERVER['SERVER_NAME'] === 'planteazapentruromania.local') {

	// ** MySQL settings - You can get this info from your web host ** //
	/** The name of the database for WordPress */
	define('DB_NAME', 'wordpress');

	/** MySQL database username */
	define('DB_USER', 'root');

	/** MySQL database password */
	define('DB_PASSWORD', 'weltest');

	/** MySQL hostname */
	define('DB_HOST', 'localhost');

} else {

	// ** MySQL settings - You can get this info from your web host ** //
	/** The name of the database for WordPress */
	define('DB_NAME', 'plant4ro_' . str_replace('.planteazapentruromania.ro', '', $_SERVER['SERVER_NAME']) . '_wp' );

	/** MySQL database username */
	define('DB_USER', 'plant4ro');

	/** MySQL database password */
	define('DB_PASSWORD', 'plant4roma');

	/** MySQL hostname */
	define('DB_HOST', 'localhost');

}

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'tI9HuXPj+qqfm2D3591pxDcR5o~)=0ZO8t9%Jf_Z7utXcqJ2]R%V[=f=6C(I>!CH');
define('SECURE_AUTH_KEY',  'D9|HnLcL{GQ+xk_<Z@I bY7~7LGab.MSF}pwRay>_i[&#>Ffxo#DK+nmE-FBSFE^');
define('LOGGED_IN_KEY',    'C2P|GlL->s0naY.3$HL!f.phhHrAIvwk?DMDLE14/G M6Z$vj?.|b`z-7|+&@D^x');
define('NONCE_KEY',        'o7V&<,|aCUQ;+Hm>b}fuAX.B6QdjnFXrr4d,e,74kpHoR&T@@c-YWRp(FErbexJj');
define('AUTH_SALT',        'i}F7ev$e(Dah.jR &oo<lH|3-`12o*2hN5ygo4LTuv}/_b`}&,;# KGK[{l|3+:4');
define('SECURE_AUTH_SALT', '!%t%C+4RRMFI;IC|1=Vs(dYm+|uV/v%A?ppLg=nSw22@{6nx@zrwf^)Lf-!NsYk)');
define('LOGGED_IN_SALT',   'vOT]ce+4>T62fpT+a[FxlkB5YkEM]a$nqx47ptk~c|_++u~t%nR.c9xrf*=,PcEA');
define('NONCE_SALT',       'Fi<3+Q6j=->Rg=+,4W;32csX%KW;n<P [6*yVFi+y?4lRDm+$z9:_*T_A=R`+[k>');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
