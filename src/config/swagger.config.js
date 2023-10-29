export default {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "PBL4 Red light Guardian API",
      version: "1.0.0",
      description: "The API documentation of PBL4",
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/",
      },
    },
    basePath: "/api",
    servers: [
      {
        url: "https://quy-1.pularbacc.com/api/",
        description: "Production Server",
      },
      {
        url: "http://localhost:3011/api/",
        description: "Local Development Server",
      },
    ],
  },
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "x-auth-token",
      scheme: "bearer",
      in: "header",
    },
  },
  security: [{ bearerAuth: [] }],
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          username: { type: "string" },
          email: { type: "string", format: "email" },
          password: { type: "string" },
        },
      },
      Vehicle: {
        type: "object",
        properties: {
          id: { type: "string" },
          vehicleName: { type: "string" },
          licensePlate: { type: "string" },
          ownerID: { type: "string" },
          vehicleType: { type: "string", enum: ["car", "motorcycle"] },
          engineCapacity: { type: "number" },
          color: { type: "string" },
          frameNumber: { type: "string" },
          engineNumber: { type: "string" },
          brand: { type: "string" },
          imageUrl: { type: "string" },
        },
      },
      Camera: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          location: { type: "string" },
          coordinates: { type: "string" },
        },
      },
      Owner: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          citizen_identification: { type: "string" },
          address: { type: "string" },
          email: { type: "string", format: "email" },
        },
      },
      Violation: {
        type: "object",
        properties: {
          id: { type: "string" },
          type: { type: "string", enum: ["Run a red light"] },
          deadline: { type: "integer" },
          status: {
            type: "string",
            enum: ["paid fine", "unpaid fine", "overdue"],
          },
          vehicleID: { type: "string" },
          time: { type: "integer" },
          cameraID: { type: "string" },
          imageUrl: { type: "string" },
        },
      },
    },
  },
  tags: [
    {
      name: "User",
      description: "API for users",
    },
    {
      name: "Vehicle",
      description: "API for vehicles",
    },
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
    "src/api/controllers/violation/*.js",
    "src/api/controllers/storage/*.js",
  ],
};
