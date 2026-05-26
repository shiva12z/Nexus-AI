import * as knowledgeService from "../services/knowledgeService.js";

export async function list(req, res) {
  const items = await knowledgeService.listKnowledge(req.teamId);
  res.json({ success: true, data: items });
}

export async function create(req, res) {
  const { title, type, content, sourceUrl } = req.body;
  const item = await knowledgeService.createKnowledgeItem(req.teamId, {
    title,
    type: type || "text",
    content,
    sourceUrl,
  });
  res.status(201).json({ success: true, data: item });
}

export async function train(req, res) {
  const { content } = req.body;
  const result = await knowledgeService.trainKnowledgeItem(req.teamId, req.params.id, content);
  res.json({ success: true, data: result });
}

export async function remove(req, res) {
  await knowledgeService.deleteKnowledge(req.teamId, req.params.id);
  res.json({ success: true });
}
