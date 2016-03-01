<?php
/**
 * Created by PhpStorm.
 * User: dragosc
 * Date: 28.02.2016
 * Time: 17:28
 */

require '../vendor/autoload.php';

\Braintree\Configuration::environment('sandbox');
\Braintree\Configuration::merchantId('89pcx4ss3kz8x5q7');
\Braintree\Configuration::publicKey('twp79qy2pg755nhz');
\Braintree\Configuration::privateKey('7c97f0a849a5cba4bbbc8ad9b2fe578f');

?>

<form id="checkout" method="post" action="/checkout">
    <div id="payment-form"></div>
    <input id="my-button-element" type="submit" value="Pay $10">
</form>

<script src="https://js.braintreegateway.com/js/braintree-2.21.0.min.js"></script>
<script>
    // We generated a client token for you so you can test out this code
    // immediately. In a production-ready integration, you will need to
    // generate a client token on your server (see section below).
    var clientToken = "<?php echo \Braintree\ClientToken::generate(); ?>";

    var checkout;

//    braintree.setup(clientToken, "custom", {
//        onReady: function (integration) {
//            console.log('integration', integration);
//            checkout = integration;
//        },
//        onPaymentMethodReceived: function (payload) {
//            console.log('payload', payload);
//        },
//        paypal: {
//            singleUse: true,
//            amount: 100.00,
//            currency: 'USD',
//            locale: 'en_us',
////            enableShippingAddress: true,
//            headless: true
//        }
//    });
//
//    // Add a click event listener to your own PayPal button
//    // Note: cross-browser compatibility for click handlers and events are up to you
//    document.querySelector('#my-button-element').addEventListener('click', function (event) {
//        event.preventDefault();
//        checkout.paypal.initAuthFlow();
//    }, false);

    braintree.setup(clientToken, "dropin", {
        onReady: function(ready) {
            console.log('ready', ready);
            checkout = ready;
        },
        onPaymentMethodReceived: function(payload) {
            console.log('onPaymentMethodReceived', payload);
        },
        onError: function(error) {
            console.log('error', error);
        },
//        paypal: {
//            singleUse: true,
//            amount: 100.00,
//            currency: 'USD',
//            locale: 'ro_ro',
////            enableShippingAddress: true,
//            headless: true
//        },
        container: "payment-form"
    });
</script>
