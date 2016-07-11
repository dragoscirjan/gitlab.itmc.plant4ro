import 'bootstrap';

export function configure(aurelia) {
    aurelia.use
    .standardConfiguration()
    // .developmentLogging()


    // .plugin('aurelia-validation'/*, (config) => {
    //     config.useLocale('ro-RO');//.useViewStrategy(ValidateCustomAttributeViewStrategy.TWBootstrapAppendToInput);
    // }*/)
    .plugin('google-recaptcha')
    .plugin('aurelia-google-analytics', config => {
        config.init('UA-642849-15');
        config.attach({
            logging: {
                enabled: true, // Set to `true` to have some log messages appear in the browser console.
            },
            pageTracking: {
                triggerEvent: 'router:navigation:success',
                triggerCustomEvent: 'on:page:activate',
                enabled: true // Set to `false` to disable in non-production environments.
            },
            clickTracking: {
                enabled: true // Set to `false` to disable in non-production environments.
            }
        });
    })
    //Uncomment the line below to enable animation.
    .plugin('aurelia-animator-css')
    //if the css animator is enabled, add swap-order="after" to all router-view elements
    ;


    //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
    //aurelia.use.plugin('aurelia-html-import-template-loader')

    aurelia.start().then(a => a.setRoot());
}
