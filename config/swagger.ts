import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { generateSwaggerSpec } from "./swaggerOptions";
import { Express } from "express";

// define swagger options
const swaggerOptions: swaggerJsDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Music Event API",
            version: "1.0.0",
            description: 'API docs for event organizers, artists & attendees'
        },
    },
    // path to annotated files
    // **TODO** update to use routes instead of app 
    apis: ["./src/api/v1/routes/*.ts"],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const swaggerDocs: any = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app: Express): void => {
    const specs = generateSwaggerSpec();
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default setupSwagger;