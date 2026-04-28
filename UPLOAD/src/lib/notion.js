import { Client } from '@notionhq/client';

const notion = new Client({ auth: import.meta.env.NOTION_TOKEN });
const databaseId = import.meta.env.NOTION_DATABASE_ID;

export async function getNotionContent(lang = 'es') {
  try {
    const dbInfo = await notion.databases.retrieve({ database_id: databaseId });
    const dataSourceId = dbInfo.data_sources[0].id;
    
    const contentMap = {};
    let hasMore = true;
    let nextCursor = undefined;
    
    while (hasMore) {
      const response = await notion.dataSources.query({
        data_source_id: dataSourceId,
        start_cursor: nextCursor
      });
      
      for (const page of response.results) {
        let key = null;
        let keyProps = ['key', 'Key', 'Name', 'Title'];
        for (const k of keyProps) {
           if (page.properties[k] && page.properties[k].title && page.properties[k].title.length > 0) {
               key = page.properties[k].title[0].plain_text;
               break;
           }
        }
        if (!key) continue;
        
        let text = '';
        if (page.properties[lang]) {
            const prop = page.properties[lang];
            if (prop.type === 'rich_text' && prop.rich_text.length > 0) {
                text = prop.rich_text.map(t => {
                    let html = t.plain_text.replace(/\n/g, '<br>');
                    if (t.annotations.italic) html = `<em>${html}</em>`;
                    if (t.annotations.bold) html = `<strong>${html}</strong>`;
                    if (t.annotations.underline) html = `<u>${html}</u>`;
                    if (t.annotations.strikethrough) html = `<del>${html}</del>`;
                    return html;
                }).join('');
            }
        }
        contentMap[key] = text;
      }
      hasMore = response.has_more;
      nextCursor = response.next_cursor;
    }
    return contentMap;
  } catch (error) {
    console.error('Failed to pull from Notion:', error);
    return {};
  }
}
