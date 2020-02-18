import swaggerJSDoc from 'swagger-jsdoc';
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'On Demand Mock Server', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'API Documentation',
  },
  host: 'localhost:4000/v1',
  basePath: '/v1', // the basepath of your endpoint
  schemes: [ 'http' ],
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,

  // path to the API docs
  apis: [ './**/*.yml' ],
};
// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

const file = fs.readFileSync(path.resolve(__dirname, 'swagger.yml'), 'utf8');
const yaml = YAML.parse(file);
export const swaggerJson = { ...swaggerDefinition, ...yaml };

export default swaggerSpec;
