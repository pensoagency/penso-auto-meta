module.exports = function (grunt) {
    grunt.initConfig(
        {
            pkg: grunt.file.readJSON('package.json'),
            jshint: {
                all: ['<%= pkg.jsSource %>/**/*.js']
            },
            concat: {
                options: {
                    // define a string to put between each file in the concatenated output
                    separator: ';'
                },
                dist: {
                    files: {
                        '<%= pkg.jsDestination %>/<%= pkg.name %>-src.js': ['<%= pkg.jsSource %>/**/*.js']
                    }
                }
            },
            uglify: {
                jstarget: {
                    files: {
                        '<%= pkg.jsDestination %>/<%= pkg.name %>-min.js': ['<%= pkg.jsDestination %>/<%= pkg.name %>-src.js']
                    }
                }
            },
            less: {
                main: {
                    options: {
                        paths: ["<%= pkg.lessSource %>"]
                    },
                    files: {
                        "<%= pkg.cssDestination %>/<%= pkg.name %>.css": "<%= pkg.lessSource %>/<%= pkg.name %>.less",
                        "<%= pkg.cssDestination %>/<%= pkg.name %>-bootstrap.css": "<%= pkg.lessSource %>/<%= pkg.name %>-bootstrap.less"
                    }
                }
            },
            cssmin:
            {
                compress:{
                    files:{
                        "<%= pkg.cssDestination %>/<%= pkg.name %>.min.css":["<%= pkg.cssDestination %>/<%= pkg.name %>.css"],
                        "<%= pkg.cssDestination %>/<%= pkg.name %>-bootstrap.min.css":["<%= pkg.cssDestination %>/<%= pkg.name %>-bootstrap.css"]
                    }
                }
            },
            watch: {
                js: {
                    files: [
                        '<%= pkg.jsSource %>/**/*' ],
                    tasks: ['jshint','concat', 'uglify']
                },
                less: {
                    files: ['<%= pkg.lessSource %>/**/*'],
                    tasks: ['less','cssmin']
                }
            }

        });
    grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'less','cssmin']);
    grunt.registerTask('deploy', ['jshint', 'concat', 'uglify', 'less','cssmin']);
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
}
;