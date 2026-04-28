import { Client } from '@notionhq/client';
import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf8');
const tokenMatch = envContent.match(/NOTION_TOKEN=(.*)/);
const dbMatch = envContent.match(/NOTION_DATABASE_ID=(.*)/);
const token = tokenMatch[1].trim();
const databaseId = dbMatch[1].trim();

const notion = new Client({ auth: token });

const navItems = [
  { key: 'nav_history', es: 'Historia', cat: 'Història', en: 'Story' },
  { key: 'nav_worlds', es: 'Mundos', cat: 'Mons', en: 'Worlds' },
  { key: 'nav_experiences', es: 'Experiencias', cat: 'Experiències', en: 'Experiences' },
  { key: 'nav_art', es: 'Arte', cat: 'Art', en: 'Art' },
  { key: 'nav_brand', es: 'Marca', cat: 'Marca', en: 'Brand' },
  { key: 'nav_projects', es: 'Proyectos', cat: 'Projectes', en: 'Projects' },
  { key: 'nav_contact', es: 'Hablemos', cat: 'Parlem', en: "Let's talk" }
];

async function pushNav() {
  for (const item of navItems) {
    try {
      await notion.pages.create({
        parent: { type: 'database_id', database_id: databaseId },
        properties: {
          'key': { title: [ { text: { content: item.key } } ] },
          'es': { rich_text: [ { text: { content: item.es } } ] },
          'cat': { rich_text: [ { text: { content: item.cat } } ] },
          'en': { rich_text: [ { text: { content: item.en } } ] },
          'Pagina': { rich_text: [ { text: { content: 'Global' } } ] }
        }
      });
      console.log(`[OK] Created ${item.key}`);
    } catch (e) {
      console.error(`[ERROR] ${item.key}:`, e.message);
    }
  }
}

pushNav();
