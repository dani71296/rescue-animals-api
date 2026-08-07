const swaggerAutogen = require('swagger-autogen');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

const isProduction = process.env.NODE_ENV === 'production';

const host = isProduction
  ? process.env.RENDER_EXTERNAL_HOSTNAME
  : `localhost:${PORT}`;

const doc = {
  info: {
    title: 'Paws & Homes Foundation API',
    description:
      'This is the API documentation for the Paws & Homes Foundation. It provides information about the available endpoints, request parameters, and response formats.',
  },
  host,
  schemes: isProduction ? ['https'] : ['http'],
};

const outputFile = './src/swagger.json';
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);