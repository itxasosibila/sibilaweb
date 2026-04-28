import { Client } from '@notionhq/client';
import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf8');
const tokenMatch = envContent.match(/NOTION_TOKEN=(.*)/);
const dbMatch = envContent.match(/NOTION_DATABASE_ID=(.*)/);
const token = tokenMatch[1].trim();
const databaseId = dbMatch[1].trim();

const notion = new Client({ auth: token });

const items = [
  { key: 'mar_meta_title', es: 'Consultoría Aromática para Marcas — Sibila' },
  { key: 'mar_hero_eyebrow', es: 'Sibila · Mundo 03' },
  { key: 'mar_hero_headline', es: 'Tu marca tiene\\nun aroma,\\n_aunque no lo sepa._' },
  { key: 'mar_hero_sub', es: 'Identidades olfativas que definen hoteles, espacios de diseño y productos exclusivos. La firma invisible de tu marca.' },
  { key: 'mar_prob_headline', es: 'Las marcas que se recuerdan\\n_no solo se ven._' },
  { key: 'mar_prob_p1', es: 'Las marcas invierten millones en identidad visual y sonora, saturando todos los canales de comunicación. Pero pocas dominan la dimensión sensorial más poderosa: el olfato.' },
  { key: 'mar_prob_p2', es: 'Un aroma puede aumentar la permanencia en un espacio hasta un 20%, incrementar ventas y generar reconocimiento de marca inmediato. No se trata de perfumar — se trata de comunicar.' },
  { key: 'mar_stat1', es: 'Incremento en tiempo de permanencia en el espacio' },
  { key: 'mar_stat2', es: 'Incremento en ventas documentado en retail' },
  { key: 'mar_stat3', es: 'Incremento en el recuerdo de marca' },
  { key: 'mar_proc_label', es: 'El proceso' },
  { key: 'mar_proc1_title', es: 'Brief sensorial' },
  { key: 'mar_proc1_text', es: 'Análisis profundo de tu marca: valores, público, espacios físicos y experiencia deseada.' },
  { key: 'mar_proc2_title', es: 'Creación' },
  { key: 'mar_proc2_text', es: 'Desarrollo de muestras personalizadas. Iteraciones hasta encontrar la composición perfecta.' },
  { key: 'mar_proc3_title', es: 'Implementación' },
  { key: 'mar_proc3_text', es: 'Diseño del sistema de difusión adecuado para cada espacio. Formación del equipo.' },
  { key: 'mar_proc4_title', es: 'Mantenimiento' },
  { key: 'mar_proc4_text', es: 'Seguimiento continuo y ajustes estacionales para que el aroma evolucione con tu marca.' },
  { key: 'mar_cases_label', es: 'Casos de éxito' },
  { key: 'mar_case1_title', es: 'Hotel boutique' },
  { key: 'mar_case1_text', es: 'Fragancia mediterránea con notas de limón de Sóller, sal marina y maderas locales. Incremento del 35% en menciones positivas sobre la experiencia del huésped.' },
  { key: 'mar_case2_title', es: 'Marca de moda sostenible' },
  { key: 'mar_case2_text', es: 'Aroma de algodón orgánico, té verde y cedro para puntos de venta. Coherencia total con los valores ecológicos de la marca.' },
  { key: 'mar_case3_title', es: 'Estudio de arquitectura' },
  { key: 'mar_case3_text', es: 'Fragancia característica para showroom: hormigón, madera de roble y notas minerales reflejando su estilo contemporáneo.' },
  { key: 'mar_cta_headline', es: '¿Cuándo empezamos\\na crear tu _firma olfativa?_' },
  { key: 'mar_cta_sub', es: 'Todo empieza con una conversación. Sin tarifas en la web — cada proyecto es único.' },
  { key: 'mar_cta_btn1', es: 'Diseña tu identidad aromática' },
  { key: 'mar_cta_btn2', es: '💬 WhatsApp' }
];

async function push() {
  for (const item of items) {
    try {
      await notion.pages.create({
        parent: { type: 'database_id', database_id: databaseId },
        properties: {
          'key': { title: [ { text: { content: item.key } } ] },
          'es': { rich_text: [ { text: { content: item.es } } ] },
          'Pagina': { rich_text: [ { text: { content: 'Marca' } } ] }
        }
      });
      console.log(`[OK] Created ${item.key}`);
    } catch (e) {
      console.error(`[ERROR] ${item.key}:`, e.message);
    }
  }
}
push();
