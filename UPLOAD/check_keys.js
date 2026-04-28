import { Client } from '@notionhq/client';
import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf8');
const tokenMatch = envContent.match(/NOTION_TOKEN=(.*)/);
const dbMatch = envContent.match(/NOTION_DATABASE_ID=(.*)/);

const token = tokenMatch[1].trim();
const databaseId = dbMatch[1].trim();

const notion = new Client({ auth: token });

async function check() {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  
  const keys = response.results.map(page => {
    return page.properties.key?.title[0]?.plain_text;
  }).filter(Boolean);
  
  console.log('Total keys in DB:', keys.length);
  console.log('Sample keys:', keys.slice(0, 10));
}

check();
