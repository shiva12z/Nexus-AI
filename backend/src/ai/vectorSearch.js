import { generateEmbedding } from "./embeddingService.js";
import { getSupabaseAdmin } from "../config/supabase.js";
import { config } from "../config/index.js";

export async function searchKnowledge(teamId, query, topK = config.rag.topK) {
  try {
    const supabase = getSupabaseAdmin();
    const embedding = await generateEmbedding(query);

    const { data, error } = await supabase.rpc("match_embeddings", {
      query_embedding: embedding,
      match_team_id: teamId,
      match_count: topK,
    });

    if (error) {
      console.warn("[vectorSearch] RPC failed, falling back:", error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.warn("[vectorSearch] Failed to search knowledge, falling back to empty:", err.message);
    return [];
  }
}

export function formatRagContext(chunks) {
  if (!chunks?.length) return "";
  return chunks.map((c, i) => `[${i + 1}] ${c.content}`).join("\n\n");
}

