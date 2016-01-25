export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'bun-venit'], name: 'bunvenit',     moduleId: 'bunvenit',     nav: true, title: 'Bun Venit' },
      { route: 'despre-proiect',  name: 'proiect',      moduleId: 'proiect',      nav: true, title: 'Despre Proiect' },
      { route: 'parteneri',       name: 'parteneri',    moduleId: 'parteneri',    nav: true, title: 'Partneri' },
      { route: 'planteaza',       name: 'planteaza',    moduleId: 'planteaza',    nav: true, title: 'Planteaza' },
      { route: 'contact',         name: 'contact',      moduleId: 'contact',      nav: true, title: 'Contact' }
    //   { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}
