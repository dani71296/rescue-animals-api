const swaggerautogen = require('swagger-autogen') ;
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;
  

const doc = {
  info: {
    title: 'Paws & Homes Foundation API',
    description: 'This is the API documentation for the Paws & Homes Foundation. It provides information about the available endpoints, request parameters, and response formats.',
  },
  host: `localhost:${PORT}`,
  schemes: ['http','https'],
};
  
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerautogen(outputFile, endpointsFiles, doc);