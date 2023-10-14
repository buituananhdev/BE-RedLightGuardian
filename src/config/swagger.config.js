export default {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'PBL4 API',
      version: '1.0.0',
      description: 'The API documentation of PBL4',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
    },
    basePath: '/api',
    servers: [
      {
        url: 'https://quy-1.pularbacc.com/api/',
        url: "http://localhost:3011/api/"
      },
    ],
  },
  tags: [
    {
      "name": "User",
      "description": "API for users"
    },
    {
      "name": "Vehicle",
      "description": "API for vehicles"
    }
  ],
  apis: [
    "src/models/*.js",
    "src/utils/helpers/*.js",
    "src/api/controllers/auth/*.js",
    "src/api/controllers/user/*.js",
    "src/api/controllers/user/edit/*.js",
    "src/api/controllers/user/auth/*.js",
    "src/api/controllers/vehicle/*.js",
    "src/api/controllers/storages/*.js",
    "src/api/controllers/camera/*.js",
    "src/api/controllers/owner/*.js",
  ]
};