import { Client } from '@notionhq/client';
import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf8');
const tokenMatch = envContent.match(/NOTION_TOKEN=(.*)/);
const dbMatch = envContent.match(/NOTION_DATABASE_ID=(.*)/);
const token = tokenMatch[1].trim();
const databaseId = dbMatch[1].trim();

const notion = new Client({ auth: token });

const translations = {
  meta_title: { cat: "Sibila — Hi ha coses que no es veuen, però se senten", en: "Sibila — There are things that cannot be seen, but felt" },
  hero_eyebrow: { cat: "Sibila · Identitat Sensorial · Mallorca", en: "Sibila · Sensorial Identity · Mallorca" },
  hero_headline: { cat: "Hi ha un llenguatge invisible que habita en l'aire, en la memòria i en el cos.<br><em>Jo el tradueixo.</em>", en: "There is an invisible language that lives in the air, in memory, and in the body.<br><em>I translate it.</em>" },
  hero_sub: { cat: "Experiències olfactives · Art multisensorial · Identitat aromàtica<br>Des de la planta, la matèria i l'emoció.", en: "Olfactory experiences · Multisensory art · Aromatic identity<br>From the plant, the matter, and the emotion." },
  hero_btn_primary: { cat: "Descobrir els meus mons", en: "Discover my worlds" },
  hero_btn_ghost: { cat: "Parlem", en: "Let's talk" },
  hero_formula: { cat: "C₁₀H₁₈O — linalool", en: "C₁₀H₁₈O — linalool" },
  trust_quote: { cat: "El viatge no comença quan olores. Comença quan alguna cosa dins teu desperta, respon… i es transforma.", en: "The journey does not begin when you smell. It begins when something inside you awakens, responds... and transforms." },
  about_label: { cat: "Sobre Mi", en: "About Me" },
  about_headline: { cat: "Soc Itxaso Sibila.<br>Treballo amb l'aroma com a <em>llenguatge.</em>", en: "I am Itxaso Sibila.<br>I work with aroma as a <em>language.</em>" },
  about_p1: { cat: "Un llenguatge subtil, invisible i profundament present. Entre la ciència i la natura vaig aprendre a escoltar la matèria, a respectar els temps de la planta i a reconèixer que cada essència guarda una història.", en: "A subtle, invisible, and deeply present language. Between science and nature, I learned to listen to matter, respect the timing of the plant, and recognize that every essence holds a story." },
  about_p2: { cat: "Des de Mallorca recol·lecto, destil·lo i tradueixo aquest llenguatge en experiències que toquen el cos —de manera física—, la memòria i l'emoció.", en: "From Mallorca I forage, distill, and translate this language into experiences that touch the body —physically—, the memory, and the emotion." },
  about_quote: { cat: '"Allà comença el viatge.<br>I, amb ell, la transformació."', en: '"There begins the journey.<br>And with it, the transformation."' },
  services_label: { cat: "Els Meus Tres Mons", en: "My Three Worlds" },
  services_title: { cat: "Tres maneres de donar espai<br>al llenguatge de l'<em>aroma.</em>", en: "Three ways to give space<br>to the language of <em>aroma.</em>" },
  services_intro1: { cat: "Treballo des de tres mons que s'entrellacen i s'alimenten entre ells: l'experiència, la creació i la identitat.", en: "I work from three worlds that intertwine and feed each other: experience, creation, and identity." },
  services_intro2: { cat: "Tot neix al mateix lloc: en l'escolta de la matèria viva. Jo acompanyo aquest trànsit. Escolto, afino, componc i revelo. I des d'aquí, l'aroma es converteix en experiència.", en: "Everything is born in the same place: listening to living matter. I accompany this transit. I listen, refine, compose, and reveal. And from there, aroma becomes an experience." },
  svc1_tag: { cat: "Workshop · Sensorial · Natura", en: "Workshop · Sensorial · Nature" },
  svc1_name: { cat: "Experiències Olfactives", en: "Olfactory Experiences" },
  svc1_desc: { cat: "Creeo experiències on l'aroma obre el recorregut i afina la percepció. Espais per aturar-se, respirar, sentir i recordar d'una altra manera. Treballo amb grups, recessos, esdeveniments i llocs que desitgen una mica més que una activitat.", en: "I create experiences where aroma opens the path and refines perception. Spaces to pause, breathe, feel, and remember differently. I work with groups, retreats, events, and places that want more than just an activity." },
  svc1_link: { cat: "Explorar →", en: "Explore →" },
  svc2_tag: { cat: "Col·laboració · Art · Cultura", en: "Collaboration · Art · Culture" },
  svc2_name: { cat: "Art Multisensorial", en: "Multisensory Art" },
  svc2_desc: { cat: "I si la teva obra també es pogués olorar? Treballo amb l'aroma com una dimensió més de la creació. Col·laboro amb músics, artistes, festivals i projectes culturals per obrir un lloc a l'olfacte dins la narrativa.", en: "What if your work could also be smelled? I work with aroma as another dimension of creation. I collaborate with musicians, artists, festivals, and cultural projects to open a space for scent within the narrative." },
  svc2_link: { cat: "Explorar →", en: "Explore →" },
  svc3_tag: { cat: "Branding · Identitat · Marca", en: "Branding · Identity · Brand" },
  svc3_name: { cat: "Identitat Olfactiva", en: "Olfactory Identity" },
  svc3_desc: { cat: "La teva marca ja està comunicant, fins i tot abans de ser mirada. Treballo creant identitats olfactives per a hotels, espais, marques i projectes que desitgen encarnar una presència pròpia i deixar un rastre inoblidable.", en: "Your brand is already communicating, even before being looked at. I work creating olfactory identities for hotels, spaces, brands, and projects that wish to embody a unique presence and leave an unforgettable trace." },
  svc3_link: { cat: "Explorar →", en: "Explore →" },
  hook_pre: { cat: "La teva diferència", en: "Your difference" },
  hook_headline: { cat: "No perfumo espais.<br><em>Componc experiències.</em>", en: "I don't perfume spaces.<br><em>I compose experiences.</em>" },
  hook_text: { cat: "Treballo des de la matèria viva —la planta, la molècula, l'oli essencial— i des d'allò que no es veu: l'emoció, la memòria, la percepció. Perquè quan la matèria està viva, l'aroma no només fa olor: acompanya, sosté i transforma.", en: "I work from living matter—the plant, the molecule, the essential oil—and from what is unseen: emotion, memory, perception. Because when matter is alive, aroma doesn't just smell: it accompanies, supports, and transforms." },
  hook_btn: { cat: "Vull crear quelcom únic", en: "I want to create something unique" },
  proj_label: { cat: "Projectes Destacats", en: "Featured Projects" },
  proj1_cat: { cat: "Art · Festival · Jerez", en: "Art · Festival · Jerez" },
  proj1_title: { cat: "Festival de Flamenco", en: "Flamenco Festival" },
  proj1_desc: { cat: "Una composició que no descriu, sinó que travessa.", en: "A composition that does not describe, but pierces through." },
  proj2_cat: { cat: "Art · Concert · Barcelona", en: "Art · Concert · Barcelona" },
  proj2_title: { cat: "Marco Mezquida", en: "Marco Mezquida" },
  proj2_desc: { cat: "L'aroma com a capa invisible que dialoga amb la música.", en: "Aroma as an invisible layer that dialogues with the music." },
  proj3_cat: { cat: "Art · Exposició · Valldemossa", en: "Art · Exhibition · Valldemossa" },
  proj3_title: { cat: "Jordi Miralles", en: "Jordi Miralles" },
  proj3_desc: { cat: "L'olfacte com a presència dins l'obra.", en: "Scent as a presence within the artwork." },
  proj4_cat: { cat: "Marca · Emoció", en: "Brand · Emotion" },
  proj4_title: { cat: "Narrativa olfactiva de núvia", en: "Bridal olfactory narrative" },
  proj4_desc: { cat: "Una identitat que es porta, se sent… i roman.", en: "An identity that is worn, felt... and remains." },
  proj_btn_all: { cat: "Veure tots els projectes →", en: "View all projects →" },
  lm_label: { cat: "Guia Gratuïta", en: "Free Guide" },
  lm_headline: { cat: "Tornar a olorar<br><em>el món.</em>", en: "Smelling the world<br><em>again.</em>" },
  lm_text: { cat: "Hem après a mirar, a escoltar, a pensar. Però hem oblidat com olorar. L'olfacte és l'únic sentit que connecta directament amb la memòria i l'emoció.", en: "We have learned to look, to listen, to think. But we have forgotten how to smell. Scent is the only sense that connects directly with memory and emotion." },
  lm_list_1: { cat: "El passeig olfactiu de 10 minuts que ho canvia tot", en: "The 10-minute olfactory walk that changes everything" },
  lm_list_2: { cat: "Com crear el teu mapa personal d'aromes i memòries", en: "How to create your personal map of scents and memories" },
  lm_list_3: { cat: "L'exercici dels cinc elements mediterranis", en: "The exercise of the five Mediterranean elements" },
  lm_ph_name: { cat: "El teu nom", en: "Your name" },
  lm_ph_email: { cat: "El teu email", en: "Your email" },
  lm_btn: { cat: "Vull la meva guia →", en: "I want my guide →" },
  lm_note: { cat: "Sense soroll. Sense fórmules. Només una invitació a tornar a sentir.", en: "No noise. No formulas. Just an invitation to feel again." },
  contact_label: { cat: "Contacte", en: "Contact" },
  contact_headline: { cat: "Tot comença<br>amb una<br><em>conversa.</em>", en: "Everything begins<br>with a<br><em>conversation.</em>" },
  contact_text: { cat: "Explica'm què vols crear. Quina emoció vols despertar. Quina experiència necessita prendre forma. A vegades no falta la idea. Falta el llenguatge. I l'aroma pot obrir aquest espai.", en: "Tell me what you want to create. What emotion you want to awaken. What experience needs to take shape. Sometimes the idea isn't missing. The language is. And aroma can open that space." },
  contact_wa_label: { cat: "Parlem per WhatsApp", en: "Let's talk on WhatsApp" },
  contact_wa_val: { cat: "Escriu-me i parlem", en: "Write me and we'll talk" },
  contact_em_label: { cat: "Email", en: "Email" },
  contact_em_val: { cat: "info@itxasosibila.es", en: "info@itxasosibila.es" },
  cform_ph_name: { cat: "El teu nom", en: "Your name" },
  cform_ph_email: { cat: "El teu email", en: "Your email" },
  cform_ph_type: { cat: "Experiències, Art o Marca?", en: "Experiences, Art or Brand?" },
  cform_ph_msg: { cat: "Explica'm el teu projecte…", en: "Tell me about your project..." },
  cform_btn: { cat: "Enviar missatge", en: "Send message" }
};

async function execute() {
  console.log("Fetching data source ID...");
  const dbInfo = await notion.databases.retrieve({ database_id: databaseId });
  const dataSourceId = dbInfo.data_sources[0].id;
  
  console.log("Querying rows...");
  let hasMore = true;
  let nextCursor = undefined;
  const results = [];
  
  while (hasMore) {
    const response = await notion.dataSources.query({ 
        data_source_id: dataSourceId,
        start_cursor: nextCursor
    });
    results.push(...response.results);
    hasMore = response.has_more;
    nextCursor = response.next_cursor;
  }
  
  console.log("Total rows found:", results.length);
  
  for (const page of results) {
    const keyProp = page.properties['key'];
    const rowKey = keyProp && keyProp.title && keyProp.title.length > 0 ? keyProp.title[0].plain_text : null;
    
    if (rowKey && translations[rowKey]) {
      const trans = translations[rowKey];
      try {
        await notion.pages.update({
          page_id: page.id,
          properties: {
             'cat': { rich_text: [ { text: { content: trans.cat } } ] },
             'en': { rich_text: [ { text: { content: trans.en } } ] }
          }
        });
        console.log(`[OK] Translated: ${rowKey}`);
      } catch (err) {
        console.error(`[ERROR] translating ${rowKey}: ${err.message}`);
      }
    }
  }
  console.log("ALL TRANSLATIONS DEPLOYED!");
}

execute();
