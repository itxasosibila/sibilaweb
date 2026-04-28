import { Client } from '@notionhq/client';
import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf8');
const tokenMatch = envContent.match(/NOTION_TOKEN=(.*)/);
const dbMatch = envContent.match(/NOTION_DATABASE_ID=(.*)/);
const token = tokenMatch[1].trim();
const databaseId = dbMatch[1].trim();

const notion = new Client({ auth: token });

const items = [
  { key: 'art_meta_title', es: 'Arte Multisensorial — Sibila' },
  { key: 'art_hero_eyebrow', es: 'Sibila · Mundo 02' },
  { key: 'art_hero_headline', es: 'Cuando el arte\\n_se respira._' },
  { key: 'art_hero_sub', es: 'Instalaciones olfativas que transforman conciertos, exposiciones y performances en experiencias inmersivas y memorables.' },
  { key: 'art_proj_label', es: 'Proyectos realizados' },
  { key: 'art_proj1_cat', es: 'Festival · Jerez de la Frontera' },
  { key: 'art_proj1_title', es: 'Festival de Flamenco en Jerez' },
  { key: 'art_proj1_text', es: 'Creación de una atmósfera olfativa para el escenario principal: tierra mojada, azahar y tabaco negro evocando el alma del sur. El público recibió tarjetas olfativas sincronizadas con la actuación.' },
  { key: 'art_proj2_cat', es: 'Concierto · Barcelona' },
  { key: 'art_proj2_title', es: 'Marco Mezquida' },
  { key: 'art_proj2_text', es: 'Composición aromática sincronizada con la evolución del concierto: notas frescas en la improvisación, profundidad de maderas en los momentos contemplativos. Una sinfonía que se respira.' },
  { key: 'art_proj3_cat', es: 'Moda · París' },
  { key: 'art_proj3_title', es: 'Pasarela en París' },
  { key: 'art_proj3_text', es: 'Cada prenda acompañada de su propia narrativa olfativa, fusionando moda y perfumería en una experiencia bidimensional: vista y olfato.' },
  { key: 'art_how_label', es: 'Cómo trabajo' },
  { key: 'art_how1_title', es: 'Idea' },
  { key: 'art_how1_text', es: 'Conversamos sobre tu visión artística, el mensaje y las emociones que buscas evocar.' },
  { key: 'art_how2_title', es: 'Concepto olfativo' },
  { key: 'art_how2_text', es: 'Traduzco tu lenguaje creativo en una paleta aromática coherente con tu obra.' },
  { key: 'art_how3_title', es: 'Instalación' },
  { key: 'art_how3_text', es: 'Integramos el componente olfativo en tu espacio, creando una atmósfera inmersiva.' },
  { key: 'art_cta_headline', es: '¿Tienes un proyecto artístico?\\n_Hablemos._' },
  { key: 'art_cta_sub', es: 'El aroma puede amplificar tu obra de formas que la vista y el sonido no alcanzan.' },
  { key: 'art_cta_btn1', es: 'Colabora conmigo' },
  { key: 'art_cta_btn2', es: '💬 WhatsApp' }
];

async function push() {
  for (const item of items) {
    try {
      await notion.pages.create({
        parent: { type: 'database_id', database_id: databaseId },
        properties: {
          'key': { title: [ { text: { content: item.key } } ] },
          'es': { rich_text: [ { text: { content: item.es } } ] },
          'Pagina': { rich_text: [ { text: { content: 'Arte' } } ] }
        }
      });
      console.log(`[OK] Created ${item.key}`);
    } catch (e) {
      console.error(`[ERROR] ${item.key}:`, e.message);
    }
  }
}
push();
