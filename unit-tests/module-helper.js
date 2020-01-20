/**
 * @overview unit tests for module helper functions
 * @author André Kless <andre.kless@web.de> 2019-2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'module-helper.js' ] = {
  setup: async suite => {
    suite.path = '../modules/helper.mjs';
    suite.modules = await suite.ccm.load( suite.path );
  },

/*----------------------------------------- Action Data and Data Management ------------------------------------------*/

  action: {
    setup: suite => {
      suite.add = window.add = window.ccm.add = ( a = 0, b = 0 ) => suite.sum = a + b;
      suite.expected = 3;
    },
    tests: {
      without:           suite => suite.assertSame( suite.expected, suite.add( 1, 2 ) ),
      byFunction:  async suite => suite.assertSame( suite.expected, await suite.modules.action( [ suite.add,  1, 2 ]        ) ),
      byName:      async suite => suite.assertSame( suite.expected, await suite.modules.action( [ 'add',      1, 2 ]        ) ),
      byContext:   async suite => suite.assertSame( suite.expected, await suite.modules.action( [ 'this.add', 1, 2 ], suite ) ),
      byNamespace: async suite => suite.assertSame( suite.expected, await suite.modules.action( [ 'ccm.add',  1, 2 ]        ) ),
      byExternal:  async suite => suite.assertSame( suite.expected, await suite.modules.action( [ [ 'ccm.load', suite.path + '#action' ], [ add, 1, 2 ] ] ) ),
      useContext:  async suite => suite.assertSame( suite.expected, await suite.modules.action( function () { return this.add( 1, 2 ); }, suite ) ),
      noParams:    async suite => suite.assertSame( 0, await suite.modules.action( [ suite.add ] ) ),
      noArray:     async suite => suite.assertSame( 0, await suite.modules.action(   suite.add   ) )
    },
    finally: () => { delete window.add; delete window.ccm.add; }
  },
  executeByName: {
    setup: suite => {
      suite.add = window.add = window.ccm.add = ( a = 0, b = 0 ) => suite.sum = a + b;
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
      },
      noParams:    async suite => suite.assertSame( 0, await suite.modules.executeByName( 'add', [] ) ),
      noArray:     async suite => suite.assertSame( 0, await suite.modules.executeByName( 'add' ) )
    },
    finally: () => { delete window.add; delete window.ccm.add; }
  },

/*--------------------------------------------- Asynchronous Programming ---------------------------------------------*/

  asyncForEach: {
    tests: {
      waitSum: async suite => {
        let sum = 0;
        await suite.modules.asyncForEach( [ 1, 2, 3 ], async ( value, i, array ) => {
          await suite.ccm.helper.sleep( value );
          sum += value + i + array.length
        } );
        suite.assertSame( 18, sum );
      }
    }
  },

/*----------------------------------------------------- Checker ------------------------------------------------------*/

  hasDomContact: {
    setup: suite => suite.element = document.createElement( 'div' ),
    tests: {
      contact: async suite => {
        document.body.appendChild( suite.element );
        const instance = await suite.ccm.instance( { Instance: function () {}, ccm: suite.ccm }, { root: suite.element } );
        suite.assertTrue( suite.modules.hasDomContact( instance ) );
        document.body.removeChild( suite.element );
      },
      noContact: async suite => {
        const instance = await suite.ccm.instance( { Instance: function () {}, ccm: suite.ccm }, { root: suite.element } );
        suite.assertFalse( suite.modules.hasDomContact( instance ) );
      },
      parentContact: async suite => {
        document.body.appendChild( suite.element );
        const parent = await suite.ccm.instance( { Instance: function () {}, ccm: suite.ccm }, { root: suite.element } );
        const instance = await suite.ccm.instance( { Instance: function () {}, ccm: suite.ccm }, { parent: parent } );
        parent.element.appendChild( instance.root );
        suite.assertTrue( suite.modules.hasDomContact( instance ) );
        document.body.removeChild( suite.element );
      },
      noParentContact: async suite => {
        document.body.appendChild( suite.element );
        const parent = await suite.ccm.instance( { Instance: function () {}, ccm: suite.ccm }, { root: suite.element } );
        const instance = await suite.ccm.instance( { Instance: function () {}, ccm: suite.ccm }, { parent: parent } );
        suite.assertFalse( suite.modules.hasDomContact( instance ) );
        document.body.removeChild( suite.element );
      }
    }
  },
  hasParentContact: {
    tests: {
      contact: async suite => {
        const parent = await suite.ccm.instance( { Instance: function () {}, ccm: suite.ccm } );
        const instance = await suite.ccm.instance( { Instance: function () {}, ccm: suite.ccm }, { parent: parent } );
        parent.element.appendChild( instance.root );
        suite.assertTrue( suite.modules.hasParentContact( instance ) );
      },
      noContact: async suite => {
        const parent = await suite.ccm.instance( { Instance: function () {}, ccm: suite.ccm } );
        const instance = await suite.ccm.instance( { Instance: function () {}, ccm: suite.ccm }, { parent: parent } );
        suite.assertFalse( suite.modules.hasParentContact( instance ) );
      },
      noParent: async suite => {
        const instance = await suite.ccm.instance( { Instance: function () {}, ccm: suite.ccm } );
        suite.assertFalse( suite.modules.hasParentContact( instance ) );
      }
    }
  },

/*-------------------------------------------------- Data Handling ---------------------------------------------------*/

  arrToObj: {
    setup: suite => suite.expected = { foo: true, bar: true },
    tests: {
      byArray:  suite => suite.assertEquals( suite.expected, suite.modules.arrToObj( [ 'foo', 'bar' ] ) ),
      byObject: suite => suite.assertEquals( suite.expected, suite.modules.arrToObj( { key: [ 'foo', 'bar' ] }, 'key' ) ),
      noReturn: suite => {
        const obj = { key: [ 'foo', 'bar' ] };
        suite.modules.arrToObj( obj, 'key' );
        suite.assertEquals( suite.expected, obj.key );
      }
    }
  },
  cleanObject: {
    tests: {
      byArray:  suite => suite.assertEquals( [ 'foo', [], {} ], suite.modules.cleanObject( [ 'foo', false, 0, '', null, undefined, [], {} ] ) ),
      byObject: suite => suite.assertEquals( { a: 'foo', g: [], h: {} }, suite.modules.cleanObject( { a: 'foo', b: false, c: 0, d: '', e: null, f: undefined, g: [], h: {} } ) ),
      deepArrayFalse: suite => suite.assertEquals( [
        'Hello World!', [], {},
        [ 'foo', false, 0, '', null, undefined, [], {} ],
        { a: 'bar', b: false, c: 0, d: '', e: null, f: undefined, g: [], h: {} }
      ], suite.modules.cleanObject( [
        'Hello World!', false, 0, '', null, undefined, [], {},
        [ 'foo', false, 0, '', null, undefined, [], {} ],
        { a: 'bar', b: false, c: 0, d: '', e: null, f: undefined, g: [], h: {} }
      ] ) ),
      deepArrayTrue: suite => suite.assertEquals( [
        'Hello World!', [], {},
        [ 'foo', [], {} ],
        { a: 'bar', g: [], h: {} }
      ], suite.modules.cleanObject( [
        'Hello World!', false, 0, '', null, undefined, [], {},
        [ 'foo', false, 0, '', null, undefined, [], {} ],
        { a: 'bar', b: false, c: 0, d: '', e: null, f: undefined, g: [], h: {} }
      ], true ) )
    }
  },
  decodeJSON: {
    tests: {
      array:  suite => suite.assertEquals( { log: true, restart: true }, suite.modules.decodeJSON( "{%'%log%'%:true,%'%restart%'%:true}" ) ),
      object: suite => suite.assertEquals( [ 'ccm.instance', './ccm.user.js' ], suite.modules.decodeJSON( "[%'%ccm.instance%'%,%'%./ccm.user.js%'%]" ) ),
      input:  suite => suite.assertEquals( [ 'ccm.instance', './ccm.user.js' ], suite.modules.decodeJSON( suite.ccm.helper.html( { tag: 'input', type: 'checkbox', value: suite.modules.encodeJSON( [ 'ccm.instance', './ccm.user.js' ] ) } ).value ) )
    }
  },
  encodeJSON: {
    tests: {
      array:  suite => suite.assertSame( "{%'%log%'%:true,%'%restart%'%:true}", suite.modules.encodeJSON( { log: true, restart: true } ) ),
      object: suite => suite.assertSame( "[%'%ccm.instance%'%,%'%./ccm.user.js%'%]", suite.modules.encodeJSON( [ 'ccm.instance', './ccm.user.js' ] ) ),
      input:  suite => suite.assertSame( "[%'%ccm.instance%'%,%'%./ccm.user.js%'%]", suite.ccm.helper.html( { tag: 'input', type: 'checkbox', value: suite.modules.encodeJSON( [ 'ccm.instance', './ccm.user.js' ] ) } ).value )
    }
  },
  escapeHTML: {
    tests: {
      string: suite => suite.assertSame( 'Hello &lt;b&gt;World&lt;/b&gt;!', suite.modules.escapeHTML( 'Hello <b>World</b>!' ) )
    }
  },
  filterProperties: {
    tests: {
      object: suite => suite.assertEquals( { a: 'x', b: 'y' }, suite.modules.filterProperties( { a: 'x', b: 'y', c: 'z' }, 'a', 'b' ) )
    }
  },
  unescapeHTML: {
    tests: {
      string: suite => suite.assertSame( 'Hello <b>World</b>!', suite.modules.unescapeHTML( 'Hello &lt;b&gt;World&lt;/b&gt;!' ) )
    }
  },

/*-------------------------------------------------- Data Workflow ---------------------------------------------------*/

  dataset: {
    setup: async suite => {
      suite.store = await suite.ccm.store();
      suite.key = 'dataset_key';
      suite.dataset = { key: suite.key, foo: 'bar' };
    },
    tests: {
      exists: async suite => {
        await suite.store.set( suite.dataset );
        suite.assertEquals( suite.dataset, await suite.modules.dataset( { store: suite.store, key: suite.key } ) );
      },
      notExists: async suite => suite.assertEquals( { key: suite.key }, await suite.modules.dataset( { store: suite.store, key: suite.key } ) ),
      notStored: async suite => {
        await suite.modules.dataset( { store: suite.store, key: suite.key } );
        suite.assertFalse( await suite.store.get( suite.key ) );
      },
      generated: async suite => {
        const dataset = await suite.modules.dataset( { store: suite.store } );
        suite.assertTrue( Object.keys( dataset ).length === 1 && ccm.helper.isKey( dataset.key ) );
      },
      datasetAsSettings: async suite => suite.assertEquals( suite.dataset, await suite.modules.dataset( suite.dataset ) ),
      datasetAsKey: async suite => suite.assertEquals( suite.dataset, await suite.modules.dataset( { store: suite.store, key: suite.dataset } ) ),
      default: async suite => suite.assertEquals( {}, await suite.modules.dataset() ),
      cloned: async suite => suite.assertNotSame( suite.dataset, await suite.modules.dataset( suite.dataset ) ),
      userLogin: async suite => {
        suite.store.user = { login: () => {} };
        await suite.store.set( suite.dataset );
        suite.assertEquals( suite.dataset, await suite.modules.dataset( { store: suite.store, key: suite.key, login: true } ) );
      },
      userLoginFailed: async suite => {
        try {
          suite.store.user = { login: function () { throw new Error( 'Authentication failed' ); } };
          await suite.modules.dataset( { store: suite.store, key: suite.key, login: true } );
          suite.failed( 'Exception was not caught' );
        }
        catch( e ) {
          suite.passed();
        }
      },
      userSpecificKey: async suite => {
        suite.store.user = { isLoggedIn: () => true, data: () => { return { key: 'john' } }, ccm: true, component: { Instance: true } };
        await suite.store.set( { key: [ suite.key, 'john' ], foo: 'bar' } );
        suite.assertEquals( { key: [ suite.key, 'john' ], foo: 'bar' }, await suite.modules.dataset( { store: suite.store, key: suite.key, user: true } ) );
      },
      permissions: async suite => {
        const permissions = { creator: 'john', realm: 'guest', access: 'creator' };
        suite.assertEquals( { key: suite.key, _: permissions }, await suite.modules.dataset( { store: suite.store, key: suite.key, permissions: permissions } ) );
      },
      convert: async suite => {
        await suite.store.set( suite.dataset );
        suite.assertEquals( { key: suite.key, foo: 'BAR' }, await suite.modules.dataset( { store: suite.store, key: suite.key, convert: dataset => { dataset.foo = dataset.foo.toUpperCase(); return dataset; } } ) );
      }
    }
  },
  onFinish: {
    setup: suite => suite.instance = { ccm: true, component: { Instance: true } },
    tests: {
      byFunction: suite => suite.modules.onFinish( () => suite.passed() ),
      byObject: suite => suite.modules.onFinish( { callback: () => suite.passed() } ),
      byInstance: suite => {
        suite.instance.onfinish = () => suite.passed();
        suite.modules.onFinish( suite.instance );
      },
      getValue: suite => {
        const results = { key: 'value' };
        suite.instance.getValue = () => results;
        suite.instance.onfinish = results2 => suite.assertSame( results, results2 );
        suite.modules.onFinish( suite.instance );
      },
      conditionPassed: suite => {
        suite.instance.onfinish = { condition: () => true, callback: () => suite.passed() };
        suite.modules.onFinish( suite.instance );
      },
      conditionFailed: suite => {
        suite.instance.onfinish = { condition: () => false, callback: () => suite.failed( 'condition has not failed' ) };
        suite.modules.onFinish( suite.instance );
        suite.passed();
      },
      conditionParams: suite => {
        suite.instance.onfinish = { condition: ( results, instance ) => results && instance, callback: () => suite.passed() };
        suite.modules.onFinish( suite.instance, {} );
      },
      userLogin: async suite => {
        suite.instance.user = { login: () => {} };
        suite.instance.onfinish = { login: true };
        await suite.modules.onFinish( suite.instance );
        suite.passed();
      },
      userLoginFailed: async suite => {
        try {
          suite.instance.user = { login: function () { throw new Error( 'Authentication failed' ); } };
          suite.instance.onfinish = { login: true };
          await suite.modules.onFinish( suite.instance );
          suite.failed( 'Exception was not caught' );
        }
        catch( e ) {
          suite.passed();
        }
      },
      convert: suite => suite.modules.onFinish( { convert: results => { results.foo = results.foo.toUpperCase(); return results; }, callback: results => suite.assertEquals( { foo: 'BAR' }, results ) }, { foo: 'bar' } ),
      clear: suite => {
        suite.instance.element = suite.ccm.helper.html( { inner: 'Hello World!' } );
        suite.instance.onfinish = { clear: true };
        suite.modules.onFinish( suite.instance );
        suite.assertSame( '', suite.instance.element.innerHTML );
      },
      clonedSettings: suite => {
        suite.instance.data = {};
        suite.instance.onfinish = { store: true };
        suite.modules.onFinish( suite.instance, { key: 'value' } );
        suite.assertEquals( { store: true }, suite.instance.onfinish );
      },
      clonedResults: suite => {
        const results = {};
        const settings = { callback: results2 => {
          if ( results === results2 ) return suite.failed( 'original results are manipulated' );
          suite.assertEquals( results, results2 );
        } };
        suite.modules.onFinish( settings, results );
      },
      restart: suite => {
        const content = '!';
        suite.instance.element = suite.ccm.helper.html( { inner: content } );
        suite.instance.start = () => suite.instance.element.innerHTML += content;
        suite.instance.onfinish = { restart: true };
        suite.modules.onFinish( suite.instance );
        suite.assertSame( '!!', suite.instance.element.innerHTML );
      },
      renderApp: async suite => {
        const div = suite.ccm.helper.html( { inner: 'Hello World!' } );
        suite.instance.root = div;
        suite.instance.onfinish = { render: { component: { name: 'test', ccm: suite.ccm, Instance: function () { this.start = () => { this.element.innerHTML = 'foo' }; } }, config: { shadow: 'none' } } };
        await suite.modules.onFinish( suite.instance );
        suite.assertSame( 'foo', div.textContent );
      },
      renderWithoutInstance: async suite => {
        const div = suite.ccm.helper.html( { inner: 'Hello World!' } );
        await suite.modules.onFinish( { render: { component: { name: 'test', ccm: suite.ccm, Instance: function () { this.start = () => { this.element.innerHTML = 'foo' }; } }, config: { shadow: 'none', root: div } } } );
        suite.assertSame( 'foo', div.textContent );
      },
      renderHTML: async suite => {
        const div = suite.ccm.helper.html( { inner: 'Hello World!' } );
        suite.instance.root = div;
        suite.instance.onfinish = { render: 'foo' };
        await suite.modules.onFinish( suite.instance );
        suite.assertSame( 'foo', div.textContent );
      },
      renderText: async suite => {
        const div = suite.ccm.helper.html( { inner: 'Hello World!' } );
        suite.instance.root = div;
        suite.instance.onfinish = { render: { inner: 'foo' } };
        await suite.modules.onFinish( suite.instance );
        suite.assertSame( 'foo', div.textContent );
      }
    },
    store: {
      setup: async suite => {
        suite.store = await suite.ccm.store();
        suite.instance.user = { isLoggedIn: () => true, data: () => { return { key: 'user_key' } } };
      },
      tests: {
        bySettings: async suite => {
          await suite.modules.onFinish( { store: { settings: { name: 'test' }, key: 'value' } }, { foo: 'bar' } );
          const store = await suite.ccm.store( { name: 'test' } );
          suite.assertEquals( { foo: 'bar', key: 'value' }, await store.get( 'value' ) );
          await store.del( 'value' );
        },
        byKey: async suite => {
          await suite.modules.onFinish( { store: { settings: suite.store, key: 'value' } }, { foo: 'bar' } );
          suite.assertEquals( { foo: 'bar', key: 'value' }, await suite.store.get( 'value' ) );
        },
        byGeneratedKey: async suite => {
          await suite.modules.onFinish( { store: { settings: suite.store } }, { foo: 'bar' } );
          const dataset = ( await suite.store.get( { foo: 'bar' } ) )[ 0 ];
          suite.assertTrue( suite.ccm.helper.isKey( dataset.key ) && dataset.foo === 'bar' );
        },
        byUserKey: async suite => {
          suite.instance.onfinish = { store: { settings: suite.store, key: 'dataset_key', user: true } };
          await suite.modules.onFinish( suite.instance, { foo: 'bar' } );
          suite.assertEquals( { foo: 'bar', key: [ 'dataset_key', 'user_key' ] }, await suite.store.get( [ 'dataset_key', 'user_key' ] ) );
        },
        byUniqueKey: async suite => {
          suite.instance.onfinish = { store: { settings: suite.store, key: 'dataset_key', unique: true } };
          await suite.modules.onFinish( suite.instance, { foo: 'bar' } );
          const dataset = ( await suite.store.get( { foo: 'bar' } ) )[ 0 ];
          suite.assertTrue( dataset.key.length === 2 && dataset.key[ 0 ] === 'dataset_key' && dataset.foo === 'bar' );
        },
        byUserUniqueKey: async suite => {
          suite.instance.onfinish = { store: { settings: suite.store, key: 'dataset_key', user: true, unique: true } };
          await suite.modules.onFinish( suite.instance, { foo: 'bar' } );
          const dataset = ( await suite.store.get( { foo: 'bar' } ) )[ 0 ];
          suite.assertTrue( dataset.key.length === 3 && dataset.key[ 0 ] === 'dataset_key' && dataset.key[ 1 ] === 'user_key' && dataset.foo === 'bar' );
        },
        withPermissions: async suite => {
          const permissions = { creator: 'john', realm: 'guest', access: 'creator' };
          await suite.modules.onFinish( { store: { settings: suite.store, key: 'value', permissions: permissions } }, { foo: 'bar' } );
          suite.assertEquals( { foo: 'bar', key: 'value', _: permissions }, await suite.store.get( 'value' ) );
        },
        byData: async suite => {
          const permissions = { creator: 'john', realm: 'guest', access: 'creator' };
          suite.instance.data = { store: suite.store, key: 'dataset_key', user: true, permissions: permissions };
          suite.instance.onfinish = { store: true };
          await suite.modules.onFinish( suite.instance, { foo: 'bar' } );
          suite.assertEquals( { foo: 'bar', key: [ 'dataset_key', 'user_key' ], _: permissions }, await suite.store.get( [ 'dataset_key', 'user_key' ] ) );
        }
      }
    }
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
      },
      protect: suite => {
        suite.modules.append( suite.element, "<b> World<script>alert('XSS');</script></b>!" );
        suite.assertSame( suite.expected, suite.element.innerText );
      }
    }
  },
  loading: {
    tests: {
      element: suite => suite.assertTrue( suite.ccm.helper.isElement( suite.modules.loading() ) ),
      keyframeHead: suite => {
        suite.modules.loading();
        suite.assertTrue( document.head.querySelector( 'style#ccm_keyframe' ) );
      },
      keyframeShadow: async suite => {
        const instance = await suite.ccm.instance( { Instance: function () {}, ccm: suite.ccm } );
        suite.modules.loading( instance );
        suite.assertTrue( instance.element.parentNode.querySelector( 'style#ccm_keyframe' ) );
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
      },
      protect: suite => {
        suite.modules.prepend( suite.element, "<span>Hello </span><b>World<script>alert('XSS');</script></b>" );
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
      },
      protect: suite => {
        suite.modules.replace( suite.element.querySelector( '#child' ), "World<script>alert('XSS');</script>" );
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
      },
      protect: suite => {
        suite.modules.setContent( suite.element, "<span>Hello </span><b>World<script>alert('XSS');</script></b>!" );
        suite.assertSame( suite.expected, suite.element.innerText );
      }
    }
  },

/*----------------------------------------------- HTML Input Elements ------------------------------------------------*/

  fillFormData: {
    setup: suite => {
      suite.element = document.createElement( 'div' );
      suite.test = ( input, value = 'Hello World!', key = 'key', expected = value ) => {
        suite.element.innerHTML = input.replace( /%key%/g, key );
        const data = {}; data[ key ] = value;
        suite.modules.fillForm( suite.element, data );
        suite.assertEquals( expected, suite.ccm.helper.deepValue( suite.modules.formData( suite.element ), key ) );
      };
    },
    tests: {
      text:            suite => suite.test( "<input type='text'     name='%key%'>" ),
      password:        suite => suite.test( "<input type='password' name='%key%'>" ),
      search:          suite => suite.test( "<input type='search'   name='%key%'>" ),
      hidden:          suite => suite.test( "<input type='hidden'   name='%key%'>" ),
      email:           suite => suite.test( "<input type='email'    name='%key%'>", 'john.doe@web.de' ),
      url:             suite => suite.test( "<input type='url'      name='%key%'>", 'https://www.john-doe.com' ),
      tel:             suite => suite.test( "<input type='tel'      name='%key%'>", '0123456789' ),
      number:          suite => suite.test( "<input type='number'   name='%key%'>", 3 ),
      range:           suite => suite.test( "<input type='range'    name='%key%'>", 3 ),
      color:           suite => suite.test( "<input type='color'    name='%key%'>", '#abcdef' ),
      time:            suite => suite.test( "<input type='time'     name='%key%'>", '19:41' ),
      week:            suite => suite.test( "<input type='week'     name='%key%'>", '2019-W52' ),
      month:           suite => suite.test( "<input type='month'    name='%key%'>", '2017-11' ),
      date:            suite => suite.test( "<input type='date'     name='%key%'>", '2019-12-29' ),
      datetimeLocal:   suite => suite.test( "<input type='datetime-local' name='%key%'>", '2019-12-29T19:35' ),
      boolCheckbox:    suite => suite.test( "<input type='checkbox' name='%key%'>", true ),
      valueCheckbox:   suite => suite.test( "<input type='checkbox' name='%key%' value='Hello World!'>" ),
      multiCheckbox:   suite => suite.test( "<input type='checkbox' name='%key%' value='A'><input type='checkbox' name='%key%' value='B'><input type='checkbox' name='%key%' value='C'>", [ 'A', 'C' ] ),
      radio:           suite => suite.test( "<input type='radio'    name='%key%' value='A'><input type='radio'    name='%key%' value='B'>", 'A' ),
      valueSelect:     suite => suite.test( "<select name='%key%'><option value='A'></option><option value='B'></option></select>", 'A' ),
      innerSelect:     suite => suite.test( "<select name='%key%'><option>A</option><option>B</option></select>", 'A' ),
      multiSelect:     suite => suite.test( "<select multiple name='%key%'><option>A</option><option>B</option><option>C</option></select>", [ 'A', 'C' ] ),
      textarea:        suite => suite.test( "<textarea name='%key%'>" ),
      contenteditable: suite => suite.test( "<div contenteditable name='%key%'>" ),
      deeperProperty:  suite => suite.test( "<input type='text' name='%key%'>", 'value', 'deep.property.key' ),
      complexData:     suite => suite.test( "<input type='text' name='%key%'>", { number: [ 1, 2, { a: 3 } ], checked: true, value: 'Hello World!' } ),
      protect:         suite => suite.test( "<div contenteditable name='%key%'>", "Hello <script>alert('XSS');</script>World!", undefined, 'Hello World!' )
    }
  },

/*----------------------------------------------------- Security -----------------------------------------------------*/

  privatize: {
    setup: suite => suite.obj = { foo: 'abc', bar: 'xyz', baz: 4711 },
    tests: {
      objRemoved: suite => {
        suite.modules.privatize( suite.obj, 'foo', 'bar' );
        suite.assertEquals( { baz: 4711 }, suite.obj );
      },
      objResult: suite => suite.assertEquals( { foo: 'abc', bar: 'xyz' }, suite.modules.privatize( suite.obj, 'foo', 'bar' ) ),
      objKeepRemoved: suite => {
        suite.modules.privatize( suite.obj, true, 'foo', 'bar' );
        suite.assertEquals( { foo: 'abc', bar: 'xyz', baz: 4711 }, suite.obj );
      },
      objKeepResult: suite => suite.assertEquals( { foo: 'abc', bar: 'xyz' }, suite.modules.privatize( suite.obj, true, 'foo', 'bar' ) ),
      instanceRemoved: async suite => {
        await suite.ccm.instance( {
          name: 'dummy1',
          ccm: suite.ccm,
          config: { foo: 'abc', bar: 'xyz', baz: 4711, onchange: function () {} },
          Instance: function () {
            this.ready = async () => {
              suite.modules.privatize( this );
              suite.assertFalse( this.foo || this.bar || this.baz || !this.onchange );
            };
          }
        } );
      },
      instanceResult: async suite => {
        await suite.ccm.instance( {
          name: 'dummy2',
          ccm: suite.ccm,
          config: { foo: 'abc', bar: 'xyz', baz: 4711, onchange: function () {} },
          Instance: function () {
            let my;
            this.ready = async () => {
              my = suite.modules.privatize( this );
              suite.assertEquals( suite.obj, my );
            };
          }
        } );
      },
      instanceKeep: async suite => {
        await suite.ccm.instance( {
          name: 'dummy3',
          ccm: suite.ccm,
          config: { foo: 'abc', bar: 'xyz', baz: 4711, onchange: function () {} },
          Instance: function () {
            let my;
            this.ready = async () => {
              my = suite.modules.privatize( this, true );
              suite.assertTrue( this.foo && this.bar && this.baz && this.onchange );
            };
          }
        } );
      }
    }
  },
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