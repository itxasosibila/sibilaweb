import fs from 'fs';
import path from 'path';

const srcDir = 'C:/Users/Administrator/Documents/antigravity projects/DANIEL_megaOS/5_DEVELOPMENT/Sibila_Aroma_Astro/_UPLOAD_VERSIONS/V1_Astro_Base/UPLOAD/src';

// Move index.astro to Home.astro
const indexAstroPath = path.join(srcDir, 'pages', 'index.astro');
const homeAstroPath = path.join(srcDir, 'components', 'Home.astro');
fs.renameSync(indexAstroPath, homeAstroPath);

// Create index.astro wrapper
const indexContent = '---\nimport Home from "../components/Home.astro";\n---\n<Home />\n';
fs.writeFileSync(indexAstroPath, indexContent);

// Create cat/index.astro
fs.mkdirSync(path.join(srcDir, 'pages', 'cat'), { recursive: true });
fs.writeFileSync(path.join(srcDir, 'pages', 'cat', 'index.astro'), '---\nimport Home from "../../components/Home.astro";\n---\n<Home />\n');

// Create en/index.astro
fs.mkdirSync(path.join(srcDir, 'pages', 'en'), { recursive: true });
fs.writeFileSync(path.join(srcDir, 'pages', 'en', 'index.astro'), '---\nimport Home from "../../components/Home.astro";\n---\n<Home />\n');

console.log("Routing completed");
