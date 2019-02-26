const grpc = require('grpc');
const options = { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true };

function loadService ({ file, package, service, url }) {
  const PROTO_PATH = require('path').join(__dirname, `../protos/${file}.proto`);
  const packageDefinition = require('@grpc/proto-loader').loadSync(PROTO_PATH, options);
  const proto = grpc.loadPackageDefinition(packageDefinition)[package];
  const client = new proto[service](url, grpc.credentials.createInsecure());
  return client;
}

module.exports = loadService;
