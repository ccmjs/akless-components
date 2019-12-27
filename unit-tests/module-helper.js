/**
 * @overview unit tests for modules
 * @author André Kless <andre.kless@web.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'module-helper.js' ] = {
  setup: async suite => {
    suite.path = '../modules/helper.mjs';
    suite.modules = await suite.ccm.load( suite.path );
  },

/*--------------------------------------------------- Action Data ----------------------------------------------------*/

  action: {
    setup: suite => {
      suite.add = window.add = window.ccm.add = ( a, b ) => suite.sum = a + b;
      suite.expected = 3;
    },
    tests: {
      without:           suite => suite.assertSame( suite.expected, suite.add( 1, 2 ) ),
      byFunction:  async suite => suite.assertSame( suite.expected, await suite.modules.action( [ suite.add,  1, 2 ]        ) ),
      byName:      async suite => suite.assertSame( suite.expected, await suite.modules.action( [ 'add',      1, 2 ]        ) ),
      byContext:   async suite => suite.assertSame( suite.expected, await suite.modules.action( [ 'this.add', 1, 2 ], suite ) ),
      byNamespace: async suite => suite.assertSame( suite.expected, await suite.modules.action( [ 'ccm.add',  1, 2 ]        ) ),
      byExternal:  async suite => suite.assertSame( suite.expected, await suite.modules.action( [ [ 'ccm.load', suite.path + '#action' ], [ add, 1, 2 ] ] ) ),
      useContext:  async suite => suite.assertSame( suite.expected, await suite.modules.action( function () { return this.add( 1, 2 ); }, suite ) )
    },
    finally: () => { delete window.add; delete window.ccm.add; }
  },
  executeByName: {
    setup: suite => {
      suite.add = window.add = window.ccm.add = ( a, b ) => suite.sum = a + b;
      suite.expected = 3;
    },
    tests: {
      without:           suite => suite.assertSame( suite.expected, suite.add( 1, 2 ) ),
      byName:      async suite => suite.assertSame( suite.expected, await suite.modules.executeByName( 'add',      [ 1, 2 ]        ) ),
      byContext:   async suite => suite.assertSame( suite.expected, await suite.modules.executeByName( 'this.add', [ 1, 2 ], suite ) ),
      byNamespace: async suite => suite.assertSame( suite.expected, await suite.modules.executeByName( 'ccm.add',  [ 1, 2 ]        ) ),
      useContext:  async suite => {
        window.add = function () { return this.add( 1, 2 ); };
        suite.assertSame( suite.expected, await suite.modules.executeByName( 'add', [], window.ccm ) );
      }
    },
    finally: () => { delete window.add; delete window.ccm.add; }
  },

/*------------------------------------------------- DOM Manipulation -------------------------------------------------*/

  append: {
    setup: suite => {
      suite.element = suite.ccm.helper.html( { inner: 'Hello' } );
      suite.expected = 'Hello World!';
    },
    tests: {
      byString: suite => {
        suite.modules.append( suite.element, '<b> World</b>!' );
        suite.assertSame( suite.expected, suite.element.innerText );
      },
      byMany: suite => {
        suite.modules.append( suite.element, ' ', '<b>World</b>', '!' );
        suite.assertSame( suite.expected, suite.element.innerText );
      },
      byArray: suite => {
        suite.modules.append( suite.element, [ ' ', '<b>World</b>', '!' ] );
        suite.assertSame( suite.expected, suite.element.innerText );
      },
      byMultiArray: suite => {
        suite.modules.append( suite.element, [ ' ', [ '<b>World</b>', [ '!' ] ] ] );
        suite.assertSame( suite.expected, suite.element.innerText );
      },
      byJSON: suite => {
        suite.modules.append( suite.element, { tag: 'b', inner: ' World!' } );
        suite.assertSame( suite.expected, suite.element.innerText );
      },
      byMix: suite => {
        suite.modules.append( suite.element, ' ', [ { tag: 'b', inner: 'World' }, [ '!' ] ] );
        suite.assertSame( suite.expected, suite.element.innerText );
      }
    }
  },
  prepend: {
    setup: suite => {
      suite.element = suite.ccm.helper.html( { inner: '!' } );
      suite.expected = 'Hello World!';
    },
    tests: {
      byString: suite => {
        suite.modules.prepend( suite.element, '<span>Hello </span><b>World</b>' );
        suite.assertSame( suite.expected, suite.element.innerText );
      },
      byMany: suite => {
        suite.modules.prepend( suite.element, 'Hello', ' ', '<b>World</b>' );
        suite.assertSame( suite.expected, suite.element.innerText );
      },
      byArray: suite => {
        suite.modules.prepend( suite.element, [ 'Hello', ' ', '<b>World</b>' ] );
        suite.assertSame( suite.expected, suite.element.innerText );
      },
      byMultiArray: suite => {
        suite.modules.prepend( suite.element, [ 'Hello', [ ' ', '<b>World</b>' ] ] );
        suite.assertSame( suite.expected, suite.element.innerText );
      },
      byJSON: suite => {
        suite.modules.prepend( suite.element, { tag: 'span', inner: [ 'Hello ', { tag: 'b', inner: 'World' } ] } );
        suite.assertSame( suite.expected, suite.element.innerText );
      },
      byMix: suite => {
        suite.modules.prepend( suite.element, [ 'Hello', [ ' ', { tag: 'b', inner: 'World' } ] ] );
        suite.assertSame( suite.expected, suite.element.innerText );
      }
    }
  },
  replace: {
    setup: suite => {
      suite.element = suite.ccm.helper.html( { inner: [ { inner: 'Hello' }, ' ', { id: 'child', inner: 'old' }, { inner: '!' } ] } );
      suite.expected = 'Hello World!';
    },
    tests: {
      byString: suite => {
        suite.modules.replace( suite.element.querySelector( '#child' ), 'World' );
        suite.assertSame( suite.expected, suite.element.innerText );
      },
      byJSON: suite => {
        suite.modules.replace( suite.element.querySelector( '#child' ), { tag: 'b', inner: 'World' } );
        suite.assertSame( suite.expected, suite.element.innerText );
      }
    }
  },
  setContent: {
    setup: suite => {
      suite.element = suite.ccm.helper.html( { inner: 'old' } );
      suite.expected = 'Hello World!';
    },
    tests: {
      byString: suite => {
        suite.modules.setContent( suite.element, '<span>Hello </span><b>World</b>!' );
        suite.assertSame( suite.expected, suite.element.innerText );
      },
      byMany: suite => {
        suite.modules.setContent( suite.element, 'Hello', ' ', '<b>World</b>', '!' );
        suite.assertSame( suite.expected, suite.element.innerText );
      },
      byArray: suite => {
        suite.modules.setContent( suite.element, [ 'Hello', ' ', '<b>World</b>', '!' ] );
        suite.assertSame( suite.expected, suite.element.innerText );
      },
      byMultiArray: suite => {
        suite.modules.setContent( suite.element, [ 'Hello', [ ' ', '<b>World</b>', [ '!' ] ] ] );
        suite.assertSame( suite.expected, suite.element.innerText );
      },
      byJSON: suite => {
        suite.modules.setContent( suite.element, { tag: 'span', inner: [ 'Hello ', { tag: 'b', inner: 'World' }, '!' ] } );
        suite.assertSame( suite.expected, suite.element.innerText );
      },
      byMix: suite => {
        suite.modules.setContent( suite.element, [ 'Hello', [ ' ', { tag: 'b', inner: 'World' }, [ '!' ] ] ] );
        suite.assertSame( suite.expected, suite.element.innerText );
      }
    }
  },

/*----------------------------------------------------- Security -----------------------------------------------------*/

  protect: {
    setup: suite => {
      suite.html = "Hello <script>alert('XSS');</script>World!";
      suite.expected = 'Hello World!';
    },
    tests: {
      byString: suite => {
        suite.assertSame( suite.expected, suite.modules.protect( suite.html ) );
      },
      byElement: suite => {
        let div = document.createElement( 'div' );
        div.innerHTML = "Hello <script>alert('XSS');</script>World!";
        suite.assertSame( suite.expected, suite.modules.protect( div ).innerHTML );
      }
    }
  }

};