import { Client } from '@notionhq/client';
import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf8');
const tokenMatch = envContent.match(/NOTION_TOKEN=(.*)/);
const dbMatch = envContent.match(/NOTION_DATABASE_ID=(.*)/);
const token = tokenMatch[1].trim();
const databaseId = dbMatch[1].trim();

const notion = new Client({ auth: token });

const items = [
  { key: 'exp_meta_title', es: 'Experiencias Olfativas — Sibila' },
  { key: 'exp_hero_eyebrow', es: 'Sibila · Mundo 01' },
  { key: 'exp_hero_headline', es: 'Un viaje que no\\nse ve, pero\\n_se recuerda._' },
  { key: 'exp_hero_sub', es: 'Experiencias olfativas que despiertan emociones y conectan con la memoria. Para eventos, bodegas, retiros y todo lo que quiera dejar huella.' },
  { key: 'exp_process_label', es: 'El proceso' },
  { key: 'exp_process_1_title', es: 'Escuchar' },
  { key: 'exp_process_1_text', es: 'Comprendemos la esencia de tu evento, los valores que quieres transmitir y las emociones que buscas despertar.' },
  { key: 'exp_process_2_title', es: 'Crear' },
  { key: 'exp_process_2_text', es: 'Desarrollamos una composición olfativa única que dialoga con tu propuesta, amplificando su significado.' },
  { key: 'exp_process_3_title', es: 'Experimentar' },
  { key: 'exp_process_3_text', es: 'Implementamos la experiencia sensorial completa, guiando a los participantes en un viaje memorable y transformador.' },
  { key: 'exp_examples_label', es: 'Ejemplos' },
  { key: 'exp_ex1_title', es: 'Bodega en Mallorca' },
  { key: 'exp_ex1_text', es: 'Cata olfativa que conecta las notas del vino con aromas de la tierra mediterránea: romero silvestre, higos maduros, sal marina y madera de encina.' },
  { key: 'exp_ex2_title', es: 'Retiro de yoga' },
  { key: 'exp_ex2_text', es: 'Secuencias aromáticas que acompañan cada momento del día: energizante al amanecer, contemplativa al mediodía, restauradora al atardecer.' },
  { key: 'exp_ex3_title', es: 'Team building sensorial' },
  { key: 'exp_ex3_text', es: 'Equipos corporativos descubren nuevas formas de comunicación y creatividad a través del lenguaje olfativo.' },
  { key: 'exp_cta_headline', es: '¿Tienes un evento en mente?\\n_Cuéntame._' },
  { key: 'exp_cta_sub', es: 'Todo empieza con una conversación. Cuéntame tu proyecto y lo traducimos en aroma.' },
  { key: 'exp_cta_btn1', es: 'Diseña tu experiencia' },
  { key: 'exp_cta_btn2', es: '💬 WhatsApp' }
];

async function push() {
  for (const item of items) {
    try {
      await notion.pages.create({
        parent: { type: 'database_id', database_id: databaseId },
        properties: {
          'key': { title: [ { text: { content: item.key } } ] },
          'es': { rich_text: [ { text: { content: item.es } } ] },
          'Pagina': { rich_text: [ { text: { content: 'Experiencias' } } ] }
        }
      });
      console.log(`[OK] Created ${item.key}`);
    } catch (e) {
      console.error(`[ERROR] ${item.key}:`, e.message);
    }
  }
}
push();
