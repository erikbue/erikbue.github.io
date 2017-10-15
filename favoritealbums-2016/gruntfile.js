// Gruntfile.js
module.exports = function (grunt) {

require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

	// Project configuration.
	grunt.initConfig({
	watch: {
	  sass: {
	    files: "scss/*.scss",
	    tasks: "sass:dev"
	  }
	},
	sass: {
	  dev: {
	    files: {
	      "css/styles.css": "scss/styles.scss"
	    }
	  }
	},
	// Using the BrowserSync Server for your static .html files.
	browserSync: {
	  default_options: {
	    bsFiles: {
	      src: [
	        "css/*.css",
	        "*.html"
	      ]
	    },
	    options: {
	      watchTask: true,
	      browser: "google chrome",
	      server: {
	        baseDir: "./"
	      }
	    }
	  }
	},
	autoprefixer: {
	    options: {
	      // Task-specific options go here.
	      browsers: ['last 2 versions']
	    },
	    your_target: {
	      // Target-specific file lists and/or options go here.
	      src: [
	        "scss/*.scss"
	      ]
	    },
	  },
	ftpPut: {
        options: {
            host: 'ftp.erikbue.com',
            user: 'erikbuecom',
            pass: '!Bbhauh56'
        },
        upload: {
            files: {
                'public_html': 'FavoriteAlbums_2016/*'
            }
        }
    }
});

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-autoprefixer');

  // Launch BrowserSync + watch task
  grunt.registerTask('default', ['browserSync', 'watch', 'ftpPut']);
  
};



