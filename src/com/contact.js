//import {computedFrom} from 'aurelia-framework';

export class Contact {
  heading = 'Contact';

  activate(params, routeConfig) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve.call(null);
          }, 2000);
      });
  }

}
