export class App {
    configureRouter(config, router) {
        config.title = 'Planteaza pentru Romania';
        config.map([
            { route: ['', 'acasa'],     name: 'acasa',        moduleId: 'acasa',        nav: true, title: 'Acasa' },
            { route: 'despre-proiect',  name: 'proiect',      moduleId: 'proiect',      nav: true, title: 'Despre Proiect' },
            { route: 'parteneri',       name: 'parteneri',    moduleId: 'parteneri',    nav: true, title: 'Parteneri' },
            { route: 'planteaza',       name: 'planteaza',    moduleId: 'planteaza',    nav: true, title: 'Planteaza' },
            { route: 'contact',         name: 'contact',      moduleId: 'contact',      nav: true, title: 'Contact' },
            { route: 'sustine',         name: 'sustine',      moduleId: 'sustine',      nav: true, title: 'Sustine' }
        ]);

        this.router = router;
    }
}
