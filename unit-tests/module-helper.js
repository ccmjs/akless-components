/**
 * @overview unit tests for modules
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'module-helper.js' ] = {
  helper: {
    setup: suite => suite.path = '../modules/helper.mjs',
    action: {
      setup: async suite => {
        suite.modules = await suite.ccm.load( suite.path );
        suite.add = window.add = window.ccm.add = ( a, b ) => suite.sum = a + b;
      },
      tests: {
        without: suite => suite.assertSame( 3, suite.add( 1, 2 ) ),
        byFunction:  async suite => suite.assertSame( 3, await suite.modules.action( [ suite.add, 1, 2 ] ) ),
        byName:      async suite => suite.assertSame( 3, await suite.modules.action( [ 'add', 1, 2 ] ) ),
        byContext:   async suite => suite.assertSame( 3, await suite.modules.action( [ 'this.add', 1, 2 ], suite ) ),
        byNamespace: async suite => suite.assertSame( 3, await suite.modules.action( [ 'ccm.add', 1, 2 ] ) ),
        byExtern:    async suite => suite.assertSame( 3, await suite.modules.action( [ [ 'ccm.load', suite.path + '#action' ], [ add, 1, 2 ] ] ) )
      },
      finally: () => { delete window.add; delete window.ccm.add; }
    },
    executeByName: {
      setup: async suite => {
        suite.modules = await suite.ccm.load( suite.path );
        suite.add = window.add = window.ccm.add = ( a, b ) => suite.sum = a + b;
      },
      tests: {
        without: suite => suite.assertSame( 3, suite.add( 1, 2 ) ),
        byName:      async suite => suite.assertSame( 3, await suite.modules.executeByName( 'add', [ 1, 2 ] ) ),
        byContext:   async suite => suite.assertSame( 3, await suite.modules.executeByName( 'this.add', [ 1, 2 ], suite ) ),
        byNamespace: async suite => suite.assertSame( 3, await suite.modules.executeByName( 'ccm.add', [ 1, 2 ] ) )
      },
      finally: () => { delete window.add; delete window.ccm.add; }
    }
  }
};