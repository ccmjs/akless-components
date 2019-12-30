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

/*------------------------------------------------- Data Conversion --------------------------------------------------*/

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