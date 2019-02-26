const grpc = require('grpc');
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};

/**
 *  Starts an RPC server that receives requests for the specified service
 *  at the specified server port.
 */
function startServer(file, package, service, port, functions) {
  try {
    // Path to the .proto file.
    const PROTO_PATH = require('path').join(__dirname, `./protos/${file}.proto`);

    // Load the .proto file for use with gRPC.
    const packageDefinition = require('@grpc/proto-loader').loadSync(PROTO_PATH, options);
    const proto = grpc.loadPackageDefinition(packageDefinition)[package];

    // Create the gRPC server and add the service to it.
    const server = new grpc.Server();
    server.addService(proto[service].service, functions);

    // Start the server.
    server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
    server.start();
    console.log(`gRPC server started for ${service} on port ${port}.`)
  } catch (e) {
    console.log('gRPC ERROR: ');
    console.error(e);
  }
}

function add(call, callback) {
  callback(null, { result: call.request.operand1 + call.request.operand2 });
}

function subtract(call, callback) {
  const { operand1, operand2 } = call.request;
  if (operand2 > operand1) {
    callback({ message: 'This subtractor can only produce positive results!' }, null);
  } else {
    callback(null, { result: operand1 - operand2 });
  }
}

function multiply(call, callback) {
  callback(null, { result: call.request.operand1 * call.request.operand2 });
}

function divide(call, callback) {
  const { operand1, operand2 } = call.request;
  if (operand2 > operand1) {
    callback({message: 'The divisor is larger than the number being divided!'}, null);
  }
  const remainder = (operand1 % operand2 === 0) ? 0 : operand1 % operand2;
  const result = Math.floor(operand1 / operand2);
  callback(null, { integer: result, remainder: remainder });
}

startServer('calculator', 'calculator', 'Calculator', '30003', { add, subtract, multiply, divide });
