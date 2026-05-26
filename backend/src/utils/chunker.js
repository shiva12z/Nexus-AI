/**
 * Split text into overlapping chunks for RAG embedding.
 */
export function chunkText(text, chunkSize = 800, overlap = 120) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return [];

  const chunks = [];
  let start = 0;

  while (start < cleaned.length) {
    const end = Math.min(start + chunkSize, cleaned.length);
    chunks.push(cleaned.slice(start, end));
    if (end >= cleaned.length) break;
    start = end - overlap;
  }

  return chunks;
}
