import { NotionSyncEngine } from './core/notion_fetch_engine.js';

const engine = new NotionSyncEngine(import.meta.env.NOTION_TOKEN);

export const getDatabase = async (databaseId) => {
  return await engine.fetchPublishedRows(databaseId);
};

export const getPage = async (pageId) => {
  return await engine.notion.pages.retrieve({ page_id: pageId });
};

export const getBlocks = async (blockId) => {
  const response = await engine.notion.blocks.children.list({ block_id: blockId });
  return response.results;
};

export const parseNotionProperties = (properties) => {
  return engine.parseProperties(properties);
};
