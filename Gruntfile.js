module.exports = function( grunt ) {

    // Measure task time
    require( 'time-grunt' )( grunt );
    require( 'load-grunt-tasks' )( grunt );

    // Project configuration.
    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),

        clean: ['dist'],

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

        copy: {
            libs: {
                files: [
                    {
                        expand: true,
                        cwd: './bower_components',
                        src: [
                            'jquery/jquery.js',
                            'bootstrap/dist/**',
                            'font-awesome/fonts/**',
                            'img/**'
                        ],
                        dest: 'libs/'
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        src: [
                            'index.html',
                            'css/**/*.css',
                            'js/**/*.js',
                            'img/**'
                        ],
                        dest: 'dist/'
                    }
                ]
            }
        }
    } );

    // Default task(s).
    grunt.registerTask( 'default', ['less', 'copy:libs', 'clean', 'copy:dist'] );

};
