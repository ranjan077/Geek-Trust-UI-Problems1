module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'styles/app.css' : 'styles/scss/*.scss'
        }
      }
    },

    watch: {
      css: {
        files: 'styles/scss/*.scss',
        tasks: ['sass']
      }
    },
    
    connect: {
      geek: {
        port: 9000,
        base: './'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-connect');
  // Default task(s).
  grunt.registerTask('default', ['watch']);

  // Start local server
  grunt.registerTask('server', ['connect:geek']);

};