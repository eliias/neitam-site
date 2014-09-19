module.exports = function( grunt ) {

    // Measure task time
    require( 'time-grunt' )( grunt );
    require( 'load-grunt-tasks' )( grunt );

    // Project configuration.
    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),

        clean: {
            'dist': ['.tmp', 'dist']
        },

        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            less: {
                files: ['css/**/*.less'],
                tasks: ['less:production']
            }
        },

        wiredep: {
            target: {
                src: [
                    'index.html'
                ]
            }
        },

        rev: {
            dist: {
                files: {
                    src: [
                        'dist/js/**/*.js',
                        'dist/css/**/*.css',
                        'dist/img/**/*.*',
                        '!dist/img/*/*@2x.*',
                        'dist/fonts/**/*.*',
                        'dist/*.{png}'
                    ]
                }
            }
        },

        useminPrepare: {
            options: {
                dest: 'dist'
            },
            html: 'index.html'
        },

        usemin: {
            options: {
                assetsDirs: ['dist', 'dist/img']
            },
            html: ['dist/**/*.html'],
            css: ['dist/css/**/*.css']
        },

        less: {
            production: {
                options: {
                    paths: ['css'],
                    cleancss: true
                },
                files: {
                    'css/freelancer.css': 'css/freelancer.less'
                }
            }
        },

        cssmin: {
            dist: {
                files: [
                    {
                        src: '.tmp/concat/css/freelancer.css',
                        dest: 'dist/css/freelancer.css'
                    }
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'dist',
                        src: '**/*.html',
                        dest: 'dist'
                    }
                ]
            }
        },

        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'img',
                        src: '**/*.{gif,jpeg,jpg,png}',
                        dest: 'dist/img'
                    }
                ]
            }
        },

        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        src: [
                            '.htaccess',
                            'favicon.ico',
                            'index.html'
                        ],
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap/dist',
                        src: ['fonts/*.*'],
                        dest: 'dist'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/font-awesome/',
                        src: ['fonts/*.*'],
                        dest: 'dist'
                    }
                ]
            }
        }
    } );

    // Default task(s).
    grunt.registerTask(
        'default',
        [
            'clean:dist',
            'useminPrepare',
            'less',
            'concat',
            'uglify',
            'copy:dist',
            'cssmin:dist',
            'rev',
            'usemin',
            'htmlmin',
            'imagemin'
        ]
    );

};
