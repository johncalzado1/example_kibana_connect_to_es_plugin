export default function (server) {

  const { callWithRequest } = server.plugins.elasticsearch.getCluster('data');

  server.route({
    path: '/api/test_plugin/example',
    method: 'GET',
    handler: async function (req, res) {
      let resp = {}
      try {
        resp = await callWithRequest(req, 'search', {
          index: 'test-index',
          size: 10,
          body: {
            query: {
              match: {
                message: "Hello"
              }
            }
          }
        })
      } catch (errResp) {
        resp = errResp
      }
      return { body: resp }
    }
  });

}

// export default function (server) {

//   server.route({
//     path: '/api/test_plugin/example',
//     method: 'GET',
//     handler() {
//       return { time: (new Date()).toISOString() };
//     }
//   });

// }
