'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
    // 判断是否需要sourceMaps
    let sourceMap = process.env.EMBER_ENV === 'production' ? 'false' : 'inline';
    console.info(sourceMap);
    let app = new EmberApp(defaults, {
        // Add options here
        cssModules: {
            plugins: [
                require('postcss-import'),
                require('postcss-extend'),
                require('postcss-cssnext'),
                require('rucksack-css')({
                    alias: false,
                    hexRGBA: false,
                    fallbacks: true
                })
            ]
        },
        'ember-bootstrap': {
            'bootstrapVsesion': 3,
            'importBootstrapFont': true,
            'importBootstrapCSS': true
        },
        babel: {
            sourceMaps: sourceMap
        },
        flatpickr: {
          theme: 'material_blue'
        }
    });
    app.import("vendor/echarts.js")
    app.import("vendor/china.js")
      // Use `app.import` to add additional libraries to the generated
      // output files.
      //
      // If you need to use different assets in different
      // environments, specify an object as the first parameter. That
      // object's keys should be the environment name and the values
      // should be the asset to use in that environment.
      //
      // If the library that you are including contains AMD or ES6
      // modules that you would like to import into your application
      // please specify an object with the list of modules as keys
      // along with the exports of each module as its value.

      return app.toTree();
};
