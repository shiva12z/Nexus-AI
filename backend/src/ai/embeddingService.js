import { getOpenAI } from "./openaiClient.js";
import { config } from "../config/index.js";
import { getSupabaseAdmin } from "../config/supabase.js";

export async function generateEmbedding(text) {
  const openai = getOpenAI();
  const res = await openai.embeddings.create({
    model: config.openai.embeddingModel,
    input: text.slice(0, 8000),
  });
  return res.data[0].embedding;
}

export async function generateEmbeddings(texts) {
  const openai = getOpenAI();
  const res = await openai.embeddings.create({
    model: config.openai.embeddingModel,
    input: texts.map((t) => t.slice(0, 8000)),
  });
  return res.data.map((d) => d.embedding);
}

export async function storeEmbeddings(teamId, knowledgeId, chunks) {
  const supabase = getSupabaseAdmin();
  const embeddings = await generateEmbeddings(chunks);

  const rows = chunks.map((content, i) => ({
    team_id: teamId,
    knowledge_id: knowledgeId,
    content,
    embedding: embeddings[i],
    chunk_index: i,
  }));

  const { error } = await supabase.from("embeddings").insert(rows);
  if (error) throw error;

  await supabase
    .from("knowledge_base")
    .update({ status: "trained", chunk_count: chunks.length, updated_at: new Date().toISOString() })
    .eq("id", knowledgeId);

  return rows.length;
}
