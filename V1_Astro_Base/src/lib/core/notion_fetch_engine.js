import { Client } from '@notionhq/client';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

/**
 * Antigravity Notion Sync Engine
 * Reusable core logic for syncing Notion databases to static file projects (Astro, 11ty, etc.)
 */
export class NotionSyncEngine {
  constructor(notionToken) {
    this.notion = new Client({ auth: notionToken });
  }

  /**
   * Fetches all published rows from a database
   */
  async fetchPublishedRows(databaseId, options = {}) {
    const { statusProperty = 'Status', publishedValue = 'Published' } = options;
    
    const response = await this.notion.databases.query({
      database_id: databaseId,
      filter: {
        property: statusProperty,
        select: {
          equals: publishedValue,
        },
      },
    });

    return response.results;
  }

  /**
   * Downloads and saves images locally to prevent Notion link expiration
   */
  async downloadImage(url, localPath) {
    const directory = path.dirname(localPath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    return new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(localPath);
      response.data.pipe(writer);
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  }

  /**
   * Helper to parse Notion properties into a simple JSON object
   */
  parseProperties(properties) {
    const parsed = {};
    for (const [key, prop] of Object.entries(properties)) {
      switch (prop.type) {
        case 'title':
          parsed[key] = prop.title[0]?.plain_text || '';
          break;
        case 'rich_text':
          parsed[key] = prop.rich_text[0]?.plain_text || '';
          break;
        case 'select':
          parsed[key] = prop.select?.name || '';
          break;
        case 'files':
          parsed[key] = prop.files[0]?.file?.url || prop.files[0]?.external?.url || '';
          break;
        case 'checkbox':
          parsed[key] = prop.checkbox;
          break;
        default:
          parsed[key] = prop[prop.type];
      }
    }
    return parsed;
  }
}
