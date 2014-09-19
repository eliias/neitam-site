module.exports = function( grunt ) {

    // Measure task time
    require( 'time-grunt' )( grunt );
    require( 'load-grunt-tasks' )( grunt );

    // Project configuration.
    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),

        less: {
            production: {
                options: {
                    paths: ["css"],
                    cleancss: true
                },
                files: {
                    "css/freelancer.css": "css/freelancer.less"
                }
            }
        }
    } );

    // Default task(s).
    grunt.registerTask( 'default', ['less'] );

};
