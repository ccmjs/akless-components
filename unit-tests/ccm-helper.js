/**
 * @overview unit tests for helper functions of the ccm framework
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'ccm-helper.js' ] = {

/*------------------------------------------------ Data Manipulation -------------------------------------------------*/

  convertComponentURL: {
    tests: {
      latest: suite => suite.assertEquals( {
        url: './ccm.quiz.js',
        name: 'quiz',
        index: 'quiz'
      }, suite.ccm.helper.convertComponentURL( './ccm.quiz.js' ) ),
      versioned: suite => suite.assertEquals( {
        url: './ccm.quiz-4.0.2.js',
        name: 'quiz',
        version: '4.0.2',
        index: 'quiz-4-0-2'
      }, suite.ccm.helper.convertComponentURL( './ccm.quiz-4.0.2.js' ) ),
      minified: suite => suite.assertEquals( {
        url: './ccm.quiz.min.js',
        minified: true,
        name: 'quiz',
        index: 'quiz',
      }, suite.ccm.helper.convertComponentURL( './ccm.quiz.min.js' ) ),
      error: suite => {
        try {
          suite.ccm.helper.convertComponentURL( './ccm-quiz.js' );
          suite.failed( 'Exception was not caught' );
        }
        catch( e ) {
          suite.passed();
        }
      }
    }
  },

/*------------------------------------------------------ Others ------------------------------------------------------*/

  loading: {
    tests: {
      element: suite => suite.assertTrue( suite.ccm.helper.isElement( suite.ccm.helper.loading() ) ),
      keyframeHead: suite => {
        suite.ccm.helper.loading();
        suite.assertTrue( document.head.querySelector( 'style#ccm_keyframe' ) );
      },
      keyframeShadow: async suite => {
        const instance = await suite.ccm.instance( { Instance: function () {}, ccm: suite.ccm } );
        suite.ccm.helper.loading( instance );
        suite.assertTrue( instance.element.parentNode.querySelector( 'style#ccm_keyframe' ) );
      }
    }
  }

};