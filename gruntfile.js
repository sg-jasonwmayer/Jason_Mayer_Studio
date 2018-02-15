/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    uglify: {
      options: {
        banner: '<%= banner %>',
        sourceMap: true,
        sourceMapName: 'assets/src/js/<%= pkg.name %>.map',
        //sourceMappingURL: '<%= pkg.name %>.map',
        //sourceMapRoot: '..'
      },
      dist: {
        src: [
         "assets/src/js/app.js",
          "assets/src/js/<%= pkg.name %>.js"
        ],
        dest: 'assets/js/<%= pkg.name %>.min.js'
      }
    },

    less: {
      development: {
        options: {
          banner: '<%= banner %>',
          sourceMap: true,
          sourceMapFilename: 'assets/src/less/<%= pkg.name %>.map',
          sourceMapURL: '/assets/src/less/<%= pkg.name %>.map', 
          sourceMapRootpath: '/',
          compress: true,
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ["last 5 versions"]}),
          ]
        },
        files: {
          "assets/css/<%= pkg.name %>.min.css": ["assets/src/less/<%= pkg.name %>.less"],
        }
      },
      production: {
        options: {
          banner: '<%= banner %>',
          compress: true,
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ["last 5 versions"]}),
          ]
        },
        files: {
          "assets/css/<%= pkg.name %>.min.css": ["assets/src/less/<%= pkg.name %>.less"],
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      less: {
        files: ["assets/src/less/*.less","assets/src/less/*/*.less"],
        tasks: ['less:development'],
        options: {
          spawn: false,
          mangle: false,
        },
      },
      uglify: {
        files: ["assets/src/js/*.js","assets/src/js/*/*.js"],
        tasks: ['uglify'],
        options: {
          spawn: false,
        },
      },
    },

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Production task.

  grunt.registerTask(
      'production',
      [
        'less:production',
        'uglify',
      ]
  );


  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });




};