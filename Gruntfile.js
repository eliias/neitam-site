module.exports = function( grunt ) {
    'use strict';

    // Load grunt tasks automatically
    require( 'load-grunt-tasks' )( grunt );

    // Time how long tasks take. Can help when optimizing build times
    require( 'time-grunt' )( grunt );

    var config = {
        app:  'app',
        dist: 'dist'
    };

    grunt.initConfig( {

        config: config,

        gitclone: {
            dist: {
                options: {
                    repository: 'https://github.com/eliias/netiam.git',
                    branch:     'master',
                    directory:  '.tmp/lib',
                    depth:      1
                }
            }
        },

        watch: {
            bower:      {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js:         {
                files:   ['<%= config.app %>/scripts/**/*.js'],
                tasks:   ['jshint'],
                options: {
                    livereload: true
                }
            },
            gruntfile:  {
                files: ['Gruntfile.js']
            },
            less:       {
                files: ['<%= config.app %>/styles/**/*.less'],
                tasks: ['less:styles', 'autoprefixer']
            },
            jade:       {
                files: ['<%= config.app %>/**/*.{jade,md}'],
                tasks: ['jade:build']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files:   [
                    '.tmp/**/*.html',
                    '.tmp/styles/**/*.css',
                    '<%= config.app %>/img/**/*'
                ]
            }
        },

        connect: {
            options:    {
                port:     3000,
                open:     true,
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    middleware: function( connect ) {
                        return [
                            connect.static( '.tmp' ),
                            connect().use( '/bower_components', connect.static( './bower_components' ) ),
                            connect.static( config.app )
                        ];
                    }
                }
            },
            dist:       {
                options: {
                    base:       '<%= config.dist %>',
                    livereload: false
                }
            }
        },

        clean: {
            dist:   {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*'
                    ]
                }]
            },
            server: '.tmp'
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require( 'jshint-stylish' )
            },
            all:     [
                'Gruntfile.js',
                '<%= config.app %>/scripts/**/*.js'
            ]
        },

        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist:    {
                files: [{
                    expand: true,
                    cwd:    '.tmp/styles/',
                    src:    '**/*.css',
                    dest:   '<%= config.dist %>/styles/'
                }]
            }
        },

        wiredep: {
            app: {
                src:     ['<%= config.app %>/bower-*.jade'],
                exclude: ['bower_components/bootstrap/dist/js/bootstrap.js']
            }
        },

        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/scripts/**/*.js',
                        '<%= config.dist %>/styles/**/*.css',
                        '<%= config.dist %>/img/**/*.*',
                        '!<%= config.dist %>/img/**/*@2x.*',
                        '<%= config.dist %>/fonts/**/*.*',
                        '<%= config.dist %>/*.{png}'
                    ]
                }
            }
        },

        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html:    '<%= config.dist %>/index.html'
        },

        usemin: {
            options: {
                assetsDirs: [
                    '<%= config.dist %>',
                    '<%= config.dist %>/img'
                ]
            },
            html:    ['<%= config.dist %>/**/*.html'],
            css:     ['<%= config.dist %>/styles/**/*.css']
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd:    '<%= config.app %>/img',
                    src:    '**/*.{gif,jpeg,jpg,png}',
                    dest:   '<%= config.dist %>/img'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd:    '<%= config.app %>/img',
                    src:    '**/*.svg',
                    dest:   '<%= config.dist %>/img'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace:        true,
                    removeAttributeQuotes:     true,
                    removeCommentsFromCDATA:   true,
                    removeEmptyAttributes:     true,
                    removeOptionalTags:        true,
                    removeRedundantAttributes: true,
                    useShortDoctype:           true
                },
                files:   [{
                    expand: true,
                    cwd:    '<%= config.dist %>',
                    src:    '**/*.html',
                    dest:   '<%= config.dist %>'
                }]
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot:    true,
                    cwd:    '<%= config.app %>',
                    dest:   '<%= config.dist %>',
                    src:    [
                        '.htaccess',
                        '*.{ico,png,txt}'
                    ]
                }, {
                    expand: true,
                    dot:    true,
                    cwd:    'bower_components/bootstrap/dist',
                    src:    ['fonts/*.*'],
                    dest:   '<%= config.dist %>'
                }, {
                    expand: true,
                    dot:    true,
                    cwd:    'bower_components/font-awesome/',
                    src:    ['fonts/*.*'],
                    dest:   '<%= config.dist %>'
                }]
            }
        },

        less: {
            styles: {
                src:  '<%= config.app %>/styles/main.less',
                dest: '.tmp/styles/main.css'
            }
        },

        jade: {
            options: {
                pretty: true
            },
            build:   {
                src:  '<%= config.app %>/index.jade',
                dest: '.tmp/index.html'
            },
            dist:    {
                src:  '<%= config.app %>/index.jade',
                dest: '<%= config.dist %>/index.html'
            }
        },

        concurrent: {
            server: [
                'less:styles',
                'jade:build'
            ],
            dist:   [
                'less:styles',
                'imagemin',
                'svgmin'
            ]
        },

        uncss: {
            options: {
                ignore: [
                    /fa/,
                    /btn/,
                    /.in/,
                    /.out/,
                    /tito/,
                    /#map/,
                    /modal/,
                    /footer/,
                    /sponsor/,
                    /\.team-member/,
                    /\.img\-circle/,
                    /\.list\-inline/,
                    /\.navbar\-shrink/,
                    /collap/,
                    /\.social\-buttons/
                ]
            },
            dist:    {
                files: [{
                    src:  '<%= config.dist %>/index.html',
                    dest: '<%= config.dist %>/styles/main.css'
                }]
            }
        },

        cssmin: {
            dist: {
                files: [{
                    src:  '<%= config.dist %>/styles/main.css',
                    dest: '<%= config.dist %>/styles/main.css'
                }]
            }
        }
    } );

    grunt.registerTask( 'serve', function( target ) {
        if (target === 'dist') {
            return grunt.task.run( ['build', 'connect:dist:keepalive'] );
        }

        grunt.task.run( [
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'copy:dist',
            'watch'
        ] );
    } );

    grunt.registerTask( 'build', [
        'clean:dist',
        'gitclone',
        'jade:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'uglify',
        'copy:dist',
        'uncss',
        'cssmin:dist',
        'rev',
        'usemin',
        'htmlmin'
    ] );

    grunt.registerTask( 'default', [
        'newer:jshint',
        'build'
    ] );
};