import { getSupabaseAdmin } from "../config/supabase.js";
import { chunkText } from "../utils/chunker.js";
import { storeEmbeddings } from "../ai/embeddingService.js";

export async function createKnowledgeItem(teamId, { title, type, content, sourceUrl, filePath }) {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("knowledge_base")
    .insert({
      team_id: teamId,
      title,
      type,
      source_url: sourceUrl,
      file_path: filePath,
      status: "training",
    })
    .select()
    .single();

  if (error) throw error;

  if (content) {
    await trainKnowledgeItem(teamId, data.id, content);
  }

  return data;
}

export async function trainKnowledgeItem(teamId, knowledgeId, rawText) {
  const supabase = getSupabaseAdmin();
  const chunks = chunkText(rawText);

  await supabase.from("embeddings").delete().eq("knowledge_id", knowledgeId);

  const count = await storeEmbeddings(teamId, knowledgeId, chunks);
  return { knowledgeId, chunkCount: count };
}

export async function listKnowledge(teamId) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("knowledge_base")
    .select("*")
    .eq("team_id", teamId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function deleteKnowledge(teamId, knowledgeId) {
  const supabase = getSupabaseAdmin();
  await supabase.from("knowledge_base").delete().eq("id", knowledgeId).eq("team_id", teamId);
}
