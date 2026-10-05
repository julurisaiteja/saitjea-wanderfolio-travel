"use client";
import { useState } from "react";

/** Cinematic hero with vignette — no product WebGL. */
export function HeroFilm({
  video,
  image,
  alt = "",
  className = "",
  overlay = true,
}: {
  video?: string;
  image: string;
  alt?: string;
  className?: string;
  overlay?: boolean;
}) {
  const [useVideo, setUseVideo] = useState(Boolean(video));
  return (
    <div className={"hero-film " + className} aria-hidden="true">
      {useVideo && video ? (
        <video
          className="hero-film-media"
          autoPlay
          muted
          loop
          playsInline
          poster={image}
          onError={() => setUseVideo(false)}
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="hero-film-img" src={image} alt={alt} />
      )}
      {overlay ? <div className="hero-film-veil" /> : null}
    </div>
  );
}
