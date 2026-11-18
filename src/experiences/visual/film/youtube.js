/**
 * The 11-character video id from a YouTube address, or null if it isn't one.
 * Handles watch links, youtu.be short links, embed, Shorts and live links.
 */
export function youtubeId(url) {
  if (!url) return null;
  const match =
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/|v\/))([A-Za-z0-9_-]{11})/.exec(
      url,
    );
  return match ? match[1] : null;
}
