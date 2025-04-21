import fs from "fs";
import path from "path";
import { generateSwaggerSpec } from "../config/swaggerOptions";
import { getAbsoluteFSPath } from "swagger-ui-dist";

// Generate the OpenAPI JSON spec
const specs = generateSwaggerSpec();

// Paths
const outputDir = path.resolve(__dirname, "../dist");
const specPath = path.join(outputDir, "swagger.json");
const cssPath = path.join(outputDir, "swagger-ui.css");
const jsPath = path.join(outputDir, "swagger-ui-bundle.js");
const htmlPath = path.join(outputDir, "index.html");

// Ensure output directory exists
fs.mkdirSync(outputDir, { recursive: true });

// Save the OpenAPI spec as swagger.json
fs.writeFileSync(specPath, JSON.stringify(specs, null, 2));

// Load swagger-ui-dist
const swaggerUiDist = getAbsoluteFSPath();

// Copy required assets
fs.copyFileSync(path.join(swaggerUiDist, "swagger-ui.css"), cssPath);
fs.copyFileSync(path.join(swaggerUiDist, "swagger-ui-bundle.js"), jsPath);

// HTML template
const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Music Event API Docs</title>
  <link rel="stylesheet" href="swagger-ui.css" />
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="swagger-ui-bundle.js"></script>
  <script>
    window.onload = () => {
      SwaggerUIBundle({
        url: "swagger.json",
        dom_id: "#swagger-ui",
        layout: "BaseLayout",
      });
    };
  </script>
</body>
</html>
`;

// Write the HTML file
fs.writeFileSync(htmlPath, htmlTemplate);

console.log("Swagger HTML documentation generated successfully at ./dist");
