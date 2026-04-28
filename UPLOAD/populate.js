import { Client } from '@notionhq/client';
import fs from 'fs';

// Fetch env from .env file
const envContent = fs.readFileSync('.env', 'utf8');
const tokenMatch = envContent.match(/NOTION_TOKEN=(.*)/);
const dbMatch = envContent.match(/NOTION_DATABASE_ID=(.*)/);

const token = tokenMatch[1].trim();
const databaseId = dbMatch[1].trim();

const notion = new Client({ auth: token });

const homeContent = [
  { key: 'meta_title', val: 'Sibila — Hay cosas que no se ven, pero se sienten' },
  { key: 'hero_eyebrow', val: 'Sibila · Identidad Sensorial · Mallorca' },
  { key: 'hero_headline', val: 'Hay un lenguaje invisible que habita en el aire, en la memoria y en el cuerpo.<br><em>Yo lo traduzco.</em>' },
  { key: 'hero_sub', val: 'Experiencias olfativas · Arte multisensorial · Identidad aromática<br>Desde la planta, la materia y la emoción.' },
  { key: 'hero_btn_primary', val: 'Descubrir mis mundos' },
  { key: 'hero_btn_ghost', val: 'Hablemos' },
  { key: 'hero_formula', val: 'C₁₀H₁₈O — linalool' },
  { key: 'trust_quote', val: 'El viaje no comienza cuando hueles. Comienza cuando algo dentro de ti despierta, responde… y se transforma.' },
  { key: 'about_label', val: 'Sobre Mí' },
  { key: 'about_headline', val: 'Soy Itxaso Sibila.<br>Trabajo con el aroma como <em>lenguaje.</em>' },
  { key: 'about_p1', val: 'Un lenguaje sutil, invisible y profundamente presente. Entre la ciencia y la naturaleza aprendí a escuchar la materia, a respetar los tiempos de la planta y a reconocer que cada esencia guarda una historia.' },
  { key: 'about_p2', val: 'Desde Mallorca recolecto, destilo y traduzco ese lenguaje en experiencias que tocan el cuerpo —de forma física—, la memoria y la emoción.' },
  { key: 'about_quote', val: '"Ahí comienza el viaje.<br>Y, con él, la transformación."' },
  { key: 'services_label', val: 'Mis Tres Mundos' },
  { key: 'services_title', val: 'Tres formas de dar espacio<br>al lenguaje del <em>aroma.</em>' },
  { key: 'services_intro1', val: 'Trabajo desde tres mundos que se entrelazan y se alimentan entre sí: la experiencia, la creación y la identidad.' },
  { key: 'services_intro2', val: 'Todo nace en el mismo lugar: en la escucha de la materia viva. Yo acompaño ese tránsito. Escucho, afino, compongo y revelo. Y desde ahí, el aroma se convierte en experiencia.' },
  { key: 'svc1_tag', val: 'Workshop · Sensorial · Naturaleza' },
  { key: 'svc1_name', val: 'Experiencias Olfativas' },
  { key: 'svc1_desc', val: 'Creo experiencias donde el aroma abre el recorrido y afina la percepción. Espacios para detenerse, respirar, sentir y recordar de otra manera. Trabajo con grupos, retiros, eventos y lugares que desean algo más que una actividad.' },
  { key: 'svc1_link', val: 'Explorar →' },
  { key: 'svc2_tag', val: 'Colaboración · Arte · Cultura' },
  { key: 'svc2_name', val: 'Arte Multisensorial' },
  { key: 'svc2_desc', val: '¿Y si tu obra también se pudiera oler? Trabajo con el aroma como una dimensión más de la creación. Colaboro con músicos, artistas, festivales y proyectos culturales para abrir un lugar al olfato dentro de la narrativa.' },
  { key: 'svc2_link', val: 'Explorar →' },
  { key: 'svc3_tag', val: 'Branding · Identidad · Marca' },
  { key: 'svc3_name', val: 'Identidad Olfativa' },
  { key: 'svc3_desc', val: 'Tu marca ya está comunicando, incluso antes de ser mirada. Trabajo creando identidades olfativas para hoteles, espacios, marcas y proyectos que desean encarnar una presencia propia y dejar un rastro inolvidable.' },
  { key: 'svc3_link', val: 'Explorar →' },
  { key: 'hook_pre', val: 'Tu diferencia' },
  { key: 'hook_headline', val: 'No perfumo espacios.<br><em>Compongo experiencias.</em>' },
  { key: 'hook_text', val: 'Trabajo desde la materia viva —la planta, la molécula, el aceite esencial— y desde aquello que no se ve: la emoción, la memoria, la percepción. Porque cuando la materia está viva, el aroma no solo huele: acompaña, sostiene y transforma.' },
  { key: 'hook_btn', val: 'Quiero crear algo único' },
  { key: 'proj_label', val: 'Proyectos Destacados' },
  { key: 'proj1_cat', val: 'Arte · Festival · Jerez' },
  { key: 'proj1_title', val: 'Festival de Flamenco' },
  { key: 'proj1_desc', val: 'Una composición que no describe, sino que atraviesa.' },
  { key: 'proj2_cat', val: 'Arte · Concierto · Barcelona' },
  { key: 'proj2_title', val: 'Marco Mezquida' },
  { key: 'proj2_desc', val: 'El aroma como capa invisible que dialoga con la música.' },
  { key: 'proj3_cat', val: 'Arte · Exposición · Valldemossa' },
  { key: 'proj3_title', val: 'Jordi Miralles' },
  { key: 'proj3_desc', val: 'El olfato como presencia dentro de la obra.' },
  { key: 'proj4_cat', val: 'Marca · Emoción' },
  { key: 'proj4_title', val: 'Narrativa olfativa de novia' },
  { key: 'proj4_desc', val: 'Una identidad que se lleva, se siente… y permanece.' },
  { key: 'proj_btn_all', val: 'Ver todos los proyectos →' },
  { key: 'lm_label', val: 'Guía Gratuita' },
  { key: 'lm_headline', val: 'Volver a oler<br><em>el mundo.</em>' },
  { key: 'lm_text', val: 'Hemos aprendido a mirar, a escuchar, a pensar. Pero hemos olvidado cómo oler. El olfato es el único sentido que conecta directamente con la memoria y la emoción.' },
  { key: 'lm_list_1', val: 'El paseo olfativo de 10 minutos que cambia todo' },
  { key: 'lm_list_2', val: 'Cómo crear tu mapa personal de aromas y memorias' },
  { key: 'lm_list_3', val: 'El ejercicio de los cinco elementos mediterráneos' },
  { key: 'lm_ph_name', val: 'Tu nombre' },
  { key: 'lm_ph_email', val: 'Tu email' },
  { key: 'lm_btn', val: 'Quiero mi guía →' },
  { key: 'lm_note', val: 'Sin ruido. Sin fórmulas. Solo una invitación a volver a sentir.' },
  { key: 'contact_label', val: 'Contacto' },
  { key: 'contact_headline', val: 'Todo empieza<br>con una<br><em>conversación.</em>' },
  { key: 'contact_text', val: 'Cuéntame qué quieres crear. Qué emoción quieres despertar. Qué experiencia necesita tomar forma. A veces no falta la idea. Falta el lenguaje. Y el aroma puede abrir ese espacio.' },
  { key: 'contact_wa_label', val: 'Hablemos por WhatsApp' },
  { key: 'contact_wa_val', val: 'Escríbeme y hablamos' },
  { key: 'contact_em_label', val: 'Email' },
  { key: 'contact_em_val', val: 'info@itxasosibila.es' },
  { key: 'cform_ph_name', val: 'Tu nombre' },
  { key: 'cform_ph_email', val: 'Tu email' },
  { key: 'cform_ph_type', val: '¿Experiencias, Arte o Marca?' },
  { key: 'cform_ph_msg', val: 'Cuéntame tu proyecto…' },
  { key: 'cform_btn', val: 'Enviar mensaje' }
];

async function pushToNotion() {
  console.log('Starting autonomous Notion fill for ' + homeContent.length + ' pieces of text...');
  
  for (let i = 0; i < homeContent.length; i++) {
     const item = homeContent[i];
     
     // Don't overwrite the one you manually created as a test
     if (item.key === 'hero_headline') continue;
     
     try {
       await notion.pages.create({
         parent: { type: 'database_id', database_id: databaseId },
         properties: {
           'key': { title: [ { text: { content: item.key } } ] },
           'es': { rich_text: [ { text: { content: item.val } } ] },
           'Pagina': { rich_text: [ { text: { content: 'Home' } } ] },
           'number': { number: i + 1 }
         }
       });
       console.log(`[SUCCESS] Pushed: ${item.key}`);
     } catch (err) {
       console.error(`[ERROR] Failed to push ${item.key}:`, err.message);
     }
  }
  console.log('Finished pushing to Notion!');
}

pushToNotion();
