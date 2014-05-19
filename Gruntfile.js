var path = require('path');
var stylesheetsDir = 'www/less';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      compile: {
        options: {
          paths: [stylesheetsDir],
          compress: true,
          sourceMap: grunt.option('sourceMap') || false,
          sourceMapFilename: 'www/assets/css/compiled.min.css.map',
          outputSourceFiles: true,
          sourceMapURL: '/assets/css/compiled.min.css.map'
        },
        files: {
          'www/assets/css/compiled.css': stylesheetsDir + '/index.less'
        }
      }
    },

    // ------------------------------------------------------------------------
    // Handelbars
    //
    // Compile templates
    // ------------------------------------------------------------------------
    handlebars: {
      compile: {
        options: {
          partialsUseNamespace: true,
          namespace: "front",
          // commonjs: false,
          wrapped: true,
          amd: true,
          processName: function(filename) {
            return filename.replace('www/app/views/_templates/', '').replace('.hbs', '');
          }
        },
        src: "www/app/views/_templates/**/*.hbs",
        dest: "www/app/views/_templates/compiled.js",
        filter: function(filepath) {
          var filename = path.basename(filepath);
          // Exclude files that begin with '__' from being sent to the client,
          // i.e. __layout.hbs.
          return filename.slice(0, 2) !== '__';
        }
      }
    },

    // ------------------------------------------------------------------------
    // Require.js
    //
    // Compile the JS files
    // ------------------------------------------------------------------------
    requirejs: {
      compile: {
        options: {
          name : 'index',
          baseUrl: "www/app",
          generateSourceMaps: grunt.option('sourceMap') || false,
          optimize: "uglify2",
          preserveLicenseComments: false,
          mainConfigFile: "www/app/index.js",
          out: "www/assets/js/index.js"
        }
      }
    },

    // ------------------------------------------------------------------------
    // Watch these files for changes
    //
    // Do a task when the files change
    // ------------------------------------------------------------------------
    watch: {

      templates: {
        files: 'www/app/views/_templates/**/*.hbs',
        tasks: ['handlebars'],
        options: {
          interrupt: true
        }
      },
      stylesheets: {
        files: [stylesheetsDir + '/*.less', stylesheetsDir + '/**/*.less'],
        tasks: ['less'],
        options: {
          interrupt: true
        }
      },
      livereload: {
        // Here we watch the files the sass task will compile to
        // These files are sent to the live reload server after sass compiles to them
        options: { livereload: true },
        files: ['www/assets/css/*'],
      },
    }

  });

  // ------------------------------------------------------------------------
  // NPM Tasks
  // ------------------------------------------------------------------------
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // On compile
  grunt.registerTask('compile', ['less', 'handlebars', 'requirejs']);

  // Run the server and watch for file changes
  grunt.registerTask('server', ['watch']);

  // Default task(s).
  grunt.registerTask('default', ['server']);
};
