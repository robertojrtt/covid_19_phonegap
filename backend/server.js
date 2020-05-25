const dotenv = require('dotenv').config();

const port = process.env.PORT || 9090;

const corsMiddleware = require('restify-cors-middleware')

const cors = corsMiddleware({
   preflightMaxAge: 5,
   origins: ['*'],
   allowHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
   exposeHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
})


const restify = require('restify');
const errorHandler = require('restify-errors');


const server = restify.createServer({
   name: 'covid-api',
   version: '0.0.1'
});


server.pre(cors.preflight)
server.use(cors.actual)

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());


server.listen(port, function (error) {
   if(error) {
      throw error;
  }
   console.log('\033[2J'); 
   console.log('Api Listening in %s', server.url);
});


require('./src/routes.js')({ server, errorHandler});