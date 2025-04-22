import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { generateSwaggerSpec } from "./swaggerOptions";
import { Express } from "express";

// define swagger options
const swaggerOptions: swaggerJsDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Music Events Management API Documentation",
            version: "1.0.0",
            description: "This is the API documentation for music events management application"
        },
    }, 
    apis: ["./src/api/v1/routes/*.ts"],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const swaggerDocs: any = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app: Express): void => {
    const specs = generateSwaggerSpec();
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default setupSwagger;