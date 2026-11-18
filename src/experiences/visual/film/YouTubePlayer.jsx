import { useState } from "react";
import { ExternalLink } from "lucide-react";

/**
 * A YouTube video that costs nothing until it is played (CLAUDE.md,
 * Performance). Before the click this is only the poster image and a play
 * button. A real YouTube iframe pulls in a few hundred kilobytes of scripts, so
 * it is created only when the visitor asks for it, and starts playing at once.
 * The privacy-friendly youtube-nocookie.com address is used.
 *
 * `poster` is { src, width, height } and is the film's thumbnail from Studio.
 * Without a usable video id the player falls back to a plain link.
 */
export function YouTubePlayer({ videoId, url, title, poster }) {
  const [playing, setPlaying] = useState(false);

  if (!videoId) {
    return (
      <a className="vp-linkbtn" href={url} target="_blank" rel="noopener noreferrer">
        Watch on YouTube
        <ExternalLink size={16} aria-hidden="true" />
      </a>
    );
  }

  return (
    <div className="vf-screen">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          className="vf-poster"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title}`}
        >
          {poster && (
            <img
              src={poster.src}
              alt=""
              width={poster.width}
              height={poster.height}
              decoding="async"
              // The poster is the largest image on the page, above the fold.
              loading="eager"
              fetchPriority="high"
            />
          )}
          <span className="vf-play" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M6 4l14 8-14 8z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
