import { Client } from '@notionhq/client';
import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf8');
const tokenMatch = envContent.match(/NOTION_TOKEN=(.*)/);
const dbMatch = envContent.match(/NOTION_DATABASE_ID=(.*)/);
const token = tokenMatch[1].trim();
const databaseId = dbMatch[1].trim();

const notion = new Client({ auth: token });

const items = [
  // PROYECTOS
  { key: 'pro_meta_title', es: 'Proyectos — Sibila', p: 'Proyectos' },
  { key: 'pro_hero_eyebrow', es: 'Sibila · Portfolio', p: 'Proyectos' },
  { key: 'pro_hero_headline', es: 'Aromas que\\n_permanecen._', p: 'Proyectos' },
  { key: 'pro_hero_sub', es: 'Proyectos realizados en los tres mundos — experiencias, arte y consultoría de marca.', p: 'Proyectos' },
  { key: 'pro_list_label', es: 'Todos los proyectos', p: 'Proyectos' },
  { key: 'pro_p1_cat', es: 'Arte · Festival · Jerez de la Frontera', p: 'Proyectos' },
  { key: 'pro_p1_title', es: 'Festival de Flamenco en Jerez', p: 'Proyectos' },
  { key: 'pro_p1_text', es: 'Atmósfera olfativa para el escenario principal con tierra mojada, azahar y tabaco negro. Tarjetas olfativas sincronizadas con la actuación para 800 asistentes.', p: 'Proyectos' },
  { key: 'pro_p2_cat', es: 'Arte · Concierto · Barcelona', p: 'Proyectos' },
  { key: 'pro_p2_title', es: 'Marco Mezquida', p: 'Proyectos' },
  { key: 'pro_p2_text', es: 'Composición aromática sincronizada con el concierto del pianista de jazz. Notas frescas en la improvisación, profundidad de maderas en los momentos contemplativos.', p: 'Proyectos' },
  { key: 'pro_p3_cat', es: 'Marca · Moda · París', p: 'Proyectos' },
  { key: 'pro_p3_title', es: 'Pasarela en París', p: 'Proyectos' },
  { key: 'pro_p3_text', es: 'Cada prenda con su propia narrativa olfativa. Lino con lavanda mediterránea, seda con jazmín oriental, lana con musgo de bosque.', p: 'Proyectos' },
  { key: 'pro_p4_cat', es: 'Experiencia · Enoturismo · Mallorca', p: 'Proyectos' },
  { key: 'pro_p4_title', es: 'Bodega en Mallorca', p: 'Proyectos' },
  { key: 'pro_p4_text', es: 'Cata olfativa conectando las notas del vino con aromas de la tierra mediterránea: romero silvestre, higos maduros, sal marina y madera de encina.', p: 'Proyectos' },

  // PRIVACIDAD
  { key: 'priv_meta_title', es: 'Privacidad — Sibila', p: 'Privacidad' },
  { key: 'priv_title', es: 'Política de Privacidad', p: 'Privacidad' },
  { key: 'priv_update', es: 'Última actualización: enero 2026', p: 'Privacidad' },
  { key: 'priv_resp_title', es: 'Responsable', p: 'Privacidad' },
  { key: 'priv_resp_text', es: 'Sibila Studio · info@itxasosibila.es · Mallorca, España', p: 'Privacidad' },
  { key: 'priv_data_title', es: 'Datos que recopilamos', p: 'Privacidad' },
  { key: 'priv_data_1', es: 'Nombre y email cuando rellenas el formulario de contacto o solicitas la guía gratuita', p: 'Privacidad' },
  { key: 'priv_data_2', es: 'Datos de navegación anónimos a través de Plausible Analytics (sin cookies, sin datos personales)', p: 'Privacidad' },
  { key: 'priv_use_title', es: 'Para qué usamos tus datos', p: 'Privacidad' },
  { key: 'priv_use_1', es: 'Responder a tu consulta o enviarte la guía gratuita solicitada', p: 'Privacidad' },
  { key: 'priv_use_2', es: 'Enviarte información sobre proyectos si has dado tu consentimiento', p: 'Privacidad' },
  { key: 'priv_rights_title', es: 'Tus derechos', p: 'Privacidad' },
  { key: 'priv_rights_text', es: 'Puedes solicitar el acceso, rectificación o eliminación de tus datos en cualquier momento escribiendo a info@itxasosibila.es.', p: 'Privacidad' },
  { key: 'priv_cookies_title', es: 'Cookies', p: 'Privacidad' },
  { key: 'priv_cookies_text', es: 'Esta web utiliza únicamente una cookie técnica para recordar si has aceptado este aviso. No usamos cookies de seguimiento ni publicidad.', p: 'Privacidad' },
  { key: 'priv_contact_title', es: 'Contacto', p: 'Privacidad' },
  { key: 'priv_contact_text', es: 'info@itxasosibila.es', p: 'Privacidad' }
];

async function push() {
  for (const item of items) {
    try {
      await notion.pages.create({
        parent: { type: 'database_id', database_id: databaseId },
        properties: {
          'key': { title: [ { text: { content: item.key } } ] },
          'es': { rich_text: [ { text: { content: item.es } } ] },
          'Pagina': { rich_text: [ { text: { content: item.p } } ] }
        }
      });
      console.log(`[OK] Created ${item.key}`);
    } catch (e) {
      console.error(`[ERROR] ${item.key}:`, e.message);
    }
  }
}
push();
