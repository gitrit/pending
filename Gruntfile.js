module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: ['build'],
            sassCache: ['.sass-cache']
        },
        copy: {
        	main: {
                files: [
                    {expand: true, src: ['app/**/*.html', '*.md'], dest: 'build/', flatten: true, filter: 'isFile'},
                    {expand: true, src: ['app/res/*'], dest: 'build/res/', filter: 'isFile'}
                ]
            }
        },
        watch: {
            css: {
                files: [
                'app/styles/**/*.scss',
                'app/styles/**/*.sass'
                ],
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: [
                'app/**/*.js',
                'Gruntfile.js'
                ],
                tasks: ['eslint', 'browserify'],
                options: {
                    livereload: true
                }
            },
            other: {
                files: [
                'app/**/*.html',
                './**/*.md',
                'app/res/*'
                ],
                tasks: ['copy'],
                options: {
                    livereload: true
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'build/main.css': 'app/styles/main.scss'
                }
            }
        },
        eslint: {
            options: {
                silent: true,
                configFile: 'config/eslintConfig.json'
            },
            src: ['Gruntfile.js', 'app/**/*.js']
        },
        browserify: {
            dist: {
                src: ['app/**/*.js'],
                dest: 'build/bundle.js',
                options: {
                    transform: ['reactify']
                }
            },
        },
        connect: {
            livereload: {
                options: {
                    open: true,
                    base: 'build'
                }
            }
        },
        uglify: {
            build: {
                files: {
                    'build/bundle.min.js': ['build/bundle.js']
                }
            }
        }
    });

grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('gruntify-eslint');
grunt.loadNpmTasks('grunt-browserify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-uglify');

grunt.registerTask('default', ['clean', 'copy', 'sass', 'eslint', 'browserify', 'connect', 'watch']);
grunt.registerTask('build', ['clean', 'copy', 'sass', 'eslint', 'browserify', 'uglify']);
};
