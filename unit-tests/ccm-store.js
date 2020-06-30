/**
 * @overview unit tests for ccm datastores
 * @author André Kless <andre.kless@web.de> 2020
 * @license The MIT License (MIT)
 */

ccm.files[ 'ccm-store.js' ] = {
  cloud: {
    setup: async suite => suite.url = 'http://localhost:3000',
    tests: {
      noParams: async suite => {
        try { await suite.ccm.load( suite.url ); suite.failed(); }
        catch ( error ) { suite.assertSame( 403, error.data.status ); }
      },
      invalidAuthentication: async suite => {
        try { await suite.ccm.load( { url: suite.url, params: { realm: 'cloud' } } ); suite.failed(); }
        catch ( error ) { suite.assertSame( 403, error.data.status ); }
      },
      invalidLogin: async suite => {
        try { await suite.ccm.load( { url: suite.url, params: { user: 'nobody', token: 'invalid', realm: 'cloud' } } ); suite.failed(); }
        catch ( error ) { suite.assertSame( 401, error.data.status ); }
      },
      invalidCloudToken: async suite => {
        try { await suite.ccm.load( { url: suite.url, params: { store: 'test', count: true, token: 'invalid', realm: 'cloud' } } ); suite.failed(); }
        catch ( error ) { suite.assertSame( 401, error.data.status ); }
      },
      invalidGuestToken: async suite => {
        try { await suite.ccm.load( { url: suite.url, params: { store: 'test', count: true, token: 'John Doe', realm: 'guest' } } ); suite.failed(); }
        catch ( error ) { suite.assertSame( 401, error.data.status ); }
      },
      invalidFB02Token: async suite => {
        try { await suite.ccm.load( { url: suite.url, params: { store: 'test', count: true, token: 'invalid', realm: 'hbrsinfkaul' } } ); suite.failed(); }
        catch ( error ) { suite.assertSame( 401, error.data.status ); }
      },
      invalidFB02Pseudo: async suite => {
        try { await suite.ccm.load( { url: suite.url, params: { store: 'test', count: true, token: 'invalid', realm: 'hbrsinfpseudo' } } ); suite.failed(); }
        catch ( error ) { suite.assertSame( 401, error.data.status ); }
      },
      validGuestToken: async suite => {
        try { await suite.ccm.load( { url: suite.url, params: { store: 'ccm-user', count: true, token: 'john', realm: 'guest' } } ); suite.passed(); }
        catch ( error ) { suite.failed(); }
      }
    },
    mongoDB: {
      setup: async suite => suite.store = await suite.ccm.store( { name: 'test', url: suite.url } ),
      tests: {
        readNotExists: async suite => suite.assertSame( null, await suite.store.get( 'test' ) ),
        createRead: async suite => {
          const key = await suite.store.set( { key: 'test', value: 'foo' } );
          const dataset = await suite.store.get( key );
          if ( !dataset.created_at && dataset.created_at !== key.updated_at ) return suite.failed( 'wrong timestamps' );
          delete dataset.created_at; delete dataset.updated_at;
          suite.assertEquals( { value: 'foo', key: 'test' }, dataset );
        },
        update: async suite => {
          const key = await suite.store.set( { key: 'test', value: 'foo', more: 'bar' } );
          await suite.store.set( { key: key, more: 'baz' } );
          const dataset = await suite.store.get( key );
          delete dataset.created_at; delete dataset.updated_at;
          suite.assertEquals( { value: 'foo', more: 'baz', key: 'test' }, dataset );
        },
        delete: async suite => {
          const key = await suite.store.set( { key: 'test' } );
          const succeed = await suite.store.del( key );
          const dataset = await suite.store.get( key );
          if ( !succeed ) return suite.failed();
          suite.assertSame( null, dataset );
        },
        deleteNotExists: async suite => suite.assertTrue( await suite.store.del( 'test' ) ),
        updateFirstFound: async suite => {
          await suite.store.set( { key: 'test1', value: 'foo' } );
          await suite.store.set( { key: 'test2', value: 'bar' } );
          await suite.store.set( { key: 'test3', value: 'bar' } );
          await suite.store.set( { key: { value: 'bar' }, value: 'baz' } );
          const dataset = await suite.store.get( 'test2' );
          delete dataset.created_at; delete dataset.updated_at;
          suite.assertEquals( { value: 'baz', key: 'test2' }, dataset );
        },
        arrayPush: async suite => {
          const key = await suite.store.set( { key: 'test', value: [ 1, 2 ] } );
          await suite.store.set( { key: key, $push: { value: 3 } } );
          const dataset = await suite.store.get( key );
          delete dataset.created_at; delete dataset.updated_at;
          suite.assertEquals( { value: [ 1, 2, 3 ], key: 'test' }, dataset );
        },
        arrayUpdate: async suite => {
          await suite.store.set( { key: 'test1', value: [ 1, 3, 5 ] } );
          await suite.store.set( { key: 'test2', value: [ 2, 6, 6 ] } );
          await suite.store.set( { key: { value: 6 }, 'value.$': 4 } );
          const dataset = await suite.store.get( 'test2' );
          delete dataset.created_at; delete dataset.updated_at;
          suite.assertEquals( { value: [ 2, 4, 6 ], key: 'test2' }, dataset );
        },
        arrayPushMultiple: async suite => {
          const key = await suite.store.set( { key: 'test', value: [ 1, 2 ], other: [ 'a', 'b' ] } );
          await suite.store.set( { key: key, $push: { value: 3, other: 'c' } } );
          const dataset = await suite.store.get( key );
          delete dataset.created_at; delete dataset.updated_at;
          suite.assertEquals( { value: [ 1, 2, 3 ], other: [ 'a', 'b', 'c' ], key: 'test' }, dataset );
        },
        multipleOperations: async suite => {
          const key = await suite.store.set( { key: 'test', value: [ 1, 2 ], other: [ 'a', 'b' ], x: true } );
          await suite.store.set( {
            key: { other: 'b' },
            $push: { value: 3, other: 'c' },
            x: '',
            y: true
          } );
          const dataset = await suite.store.get( key );
          delete dataset.created_at; delete dataset.updated_at;
          suite.assertEquals( { value: [ 1, 2, 3 ], other: [ 'a', 'b', 'c' ], y: true, key: 'test' }, dataset );
        }
      },
      finally: async suite => {
        await suite.store.del( 'test' );
        await suite.store.del( 'test1' );
        await suite.store.del( 'test2' );
        await suite.store.del( 'test3' );
      }
    }
  }
};