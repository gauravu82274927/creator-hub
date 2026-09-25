import React, {
  useEffect,
  useState,
} from "react";

import {
  ArrowUpRight,
  ChevronDown,
  ExternalLink,
  Instagram,
  MessageCircle,
  Play,
  Radio,
  Youtube,
} from "lucide-react";

import creator from "./config/creator";
import {
  getCreatorData,
} from "./services/youtube";

// ==========================================
// NUMBER FORMATTER
// ==========================================

function formatNumber(value) {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return "0";
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return "0";
  }

  if (number >= 1000000) {
    return `${(
      number / 1000000
    ).toFixed(2)}M`;
  }

  if (number >= 1000) {
    return `${(
      number / 1000
    ).toFixed(1)}K`;
  }

  return number.toLocaleString();
}

// ==========================================
// YOUTUBE DURATION
// ==========================================

function formatDuration(duration) {
  if (!duration) {
    return "";
  }

  const match = duration.match(
    /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
  );

  if (!match) {
    return "";
  }

  const hours = Number(
    match[1] || 0
  );

  const minutes = Number(
    match[2] || 0
  );

  const seconds = Number(
    match[3] || 0
  );

  if (hours > 0) {
    return `${hours}:${String(
      minutes
    ).padStart(
      2,
      "0"
    )}:${String(
      seconds
    ).padStart(
      2,
      "0"
    )}`;
  }

  return `${minutes}:${String(
    seconds
  ).padStart(
    2,
    "0"
  )}`;
}

// ==========================================
// VIDEO THUMBNAIL
// ==========================================

function getVideoThumbnail(video) {
  return (
    video?.snippet?.thumbnails?.maxres
      ?.url ||
    video?.snippet?.thumbnails?.high
      ?.url ||
    video?.snippet?.thumbnails?.medium
      ?.url ||
    video?.snippet?.thumbnails?.default
      ?.url ||
    ""
  );
}

// ==========================================
// VIDEO URL
// ==========================================

function getVideoUrl(videoId) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

// ==========================================
// APP
// ==========================================

function App() {
  const [
    youtubeData,
    setYoutubeData,
  ] = useState(null);

  const [
    youtubeLoading,
    setYoutubeLoading,
  ] = useState(true);

  const [
    youtubeError,
    setYoutubeError,
  ] = useState("");

  // ========================================
  // LOAD YOUTUBE DATA
  // ========================================

  useEffect(() => {
    async function loadYouTubeData() {
      try {
        setYoutubeLoading(true);
        setYoutubeError("");

        const data =
          await getCreatorData(
            creator.channelHandle
          );

        console.log(
          "Creator Hub data:",
          data
        );

        setYoutubeData(data);
      } catch (error) {
        console.error(
          "YouTube API Error:",
          error
        );

        setYoutubeError(
          error?.message ||
            "Unable to load YouTube data."
        );
      } finally {
        setYoutubeLoading(false);
      }
    }

    loadYouTubeData();
  }, []);

  // ========================================
  // DATA
  // ========================================

  const channel =
    youtubeData?.channel;

  const videos =
    youtubeData?.videos || [];

  const liveVideo =
    youtubeData?.liveVideo;

  const latestVideos =
    videos.slice(0, 3);

  const additionalVideos =
    videos.slice(3, 6);

  // ========================================
  // PROFILE IMAGE
  // ========================================

  const profileImage =
    channel?.snippet?.thumbnails?.high
      ?.url ||
    channel?.snippet?.thumbnails?.medium
      ?.url ||
    channel?.snippet?.thumbnails?.default
      ?.url ||
    "";

  return (
    <div
      className="site"
      style={{
        "--accent":
          creator.accent,

        "--accent-dark":
          creator.accentDark,
      }}
    >
      {/* ==================================
          NAVBAR
      ================================== */}

      <header className="navbar">
        <div className="nav-inner">
          <a
            href="#top"
            className="logo"
          >
            <span className="logo-mark"></span>

            <span>
              {creator.name}
            </span>
          </a>

          <nav className="desktop-nav">
            <a href="#streams">
              Streams
            </a>

            <a href="#videos">
              Videos
            </a>

            <a href="#about">
              About
            </a>
          </nav>

          <div className="nav-actions">
            <a
              href={creator.youtube}
              target="_blank"
              rel="noreferrer"
              className="nav-youtube"
            >
              <Youtube size={17} />

              YouTube
            </a>

            <a
              href={creator.youtube}
              target="_blank"
              rel="noreferrer"
              className="nav-button"
            >
              Watch channel

              <ArrowUpRight
                size={16}
              />
            </a>
          </div>
        </div>
      </header>

      <main id="top">

        {/* ==================================
            HERO
        ================================== */}

        <section className="hero">
          <div className="hero-background">
            <div className="hero-grid"></div>

            <div className="hero-glow"></div>
          </div>

          <div className="container hero-content">

            <div className="hero-copy">

              <div className="live-pill">

                <span className="live-dot"></span>

                {youtubeLoading
                  ? "CHECKING YOUTUBE..."
                  : liveVideo
                    ? "LIVE ON YOUTUBE"
                    : creator.heroEyebrow}

              </div>

              <h1>
                {creator.heroTitleLine1}

                <br />

                <span>
                  {creator.heroTitleLine2}
                </span>
              </h1>

              <p className="hero-description">
                {creator.heroDescription}
              </p>

              <div className="hero-buttons">

                <a
                  href={creator.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="primary-button"
                >
                  <Play
                    size={17}
                    fill="currentColor"
                  />

                  Watch on YouTube
                </a>

                <a
                  href={creator.discord}
                  target="_blank"
                  rel="noreferrer"
                  className="secondary-button"
                >
                  <MessageCircle
                    size={17}
                  />

                  Discord
                </a>

              </div>

            </div>

            {/* PROFILE */}

            <div className="hero-profile">

              <div className="profile-ring">

                {profileImage && (
                  <img
                    className="profile-image"
                    src={profileImage}
                    alt={
                      creator.displayName
                    }
                  />
                )}

                {liveVideo && (
                  <div className="profile-live">

                    <Radio size={13} />

                    LIVE

                  </div>
                )}

              </div>

              <div className="profile-name">

                <strong>
                  {creator.displayName}
                </strong>

                <span>
                  {creator.handle}
                </span>

              </div>

            </div>

          </div>

          <div className="hero-bottom-fade"></div>

        </section>

        {/* ==================================
            STATS
        ================================== */}

        <section className="stats-section">

          <div className="container stats">

            <div className="stat">

              <strong>
                {youtubeLoading
                  ? "..."
                  : formatNumber(
                      channel
                        ?.statistics
                        ?.subscriberCount
                    )}
              </strong>

              <span>
                Subscribers
              </span>

            </div>

            <div className="stat-divider"></div>

            <div className="stat">

              <strong>
                {youtubeLoading
                  ? "..."
                  : formatNumber(
                      channel
                        ?.statistics
                        ?.videoCount
                    )}
              </strong>

              <span>
                Videos
              </span>

            </div>

            <div className="stat-divider"></div>

            <div className="stat">

              <strong>
                {youtubeLoading
                  ? "..."
                  : formatNumber(
                      channel
                        ?.statistics
                        ?.viewCount
                    )}
              </strong>

              <span>
                Total views
              </span>

            </div>

            <div className="stat-divider"></div>

            <div className="stat">

              <strong>
                {creator.location}
              </strong>

              <span>
                Based in
              </span>

            </div>

          </div>

        </section>

        {/* ==================================
            STREAMS
        ================================== */}

        <section
          id="streams"
          className="section"
        >

          <div className="container">

            <div className="section-heading">

              <div>

                <div className="eyebrow">

                  <span className="small-live-dot"></span>

                  ON THE CHANNEL

                </div>

                <h2>
                  Streams & VODs
                </h2>

                <p>
                  Catch the latest games,
                  chaotic moments and
                  live sessions from
                  Vaani's Zone.
                </p>

              </div>

              <a
                href={creator.youtube}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                View all

                <ArrowUpRight
                  size={16}
                />
              </a>

            </div>

            {youtubeError && (
              <div className="loading-message error-message">
                Unable to load YouTube
                videos.
              </div>
            )}

            <div className="stream-grid">

              {youtubeLoading && (
                <div className="loading-message">
                  Loading latest videos...
                </div>
              )}

              {!youtubeLoading &&
                !youtubeError &&
                latestVideos.map(
                  (video) => (
                    <article
                      className="stream-card"
                      key={video.id}
                    >

                      <a
                        href={getVideoUrl(
                          video.id
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >

                        <div className="thumbnail">

                          <img
                            src={getVideoThumbnail(
                              video
                            )}
                            alt={
                              video.snippet
                                .title
                            }
                          />

                          <div className="thumbnail-overlay"></div>

                          {video
                            .snippet
                            .liveBroadcastContent ===
                          "live" ? (
                            <span className="live-label">

                              <span></span>

                              LIVE

                            </span>
                          ) : (
                            <span className="duration">

                              {formatDuration(
                                video
                                  .contentDetails
                                  ?.duration
                              )}

                            </span>
                          )}

                          <span className="play-button">

                            <Play
                              size={19}
                              fill="currentColor"
                            />

                          </span>

                        </div>

                        <div className="card-content">

                          <div className="card-meta">

                            <span>
                              {video
                                .snippet
                                .liveBroadcastContent ===
                              "live"
                                ? "LIVE"
                                : "YOUTUBE"}
                            </span>

                            <span>
                              {video
                                .statistics
                                ?.viewCount
                                ? `${formatNumber(
                                    video
                                      .statistics
                                      .viewCount
                                  )} views`
                                : ""}
                            </span>

                          </div>

                          <h3>
                            {
                              video
                                .snippet
                                .title
                            }
                          </h3>

                        </div>

                      </a>

                    </article>
                  )
                )}

            </div>

          </div>

        </section>

        {/* ==================================
            CONTENT
        ================================== */}

        <section className="content-section">

          <div className="container content-layout">

            <div className="content-intro">

              <div className="eyebrow">
                {creator.contentEyebrow}
              </div>

              <h2>
                {creator.contentTitleLine1}

                <br />

                {creator.contentTitleLine2}
              </h2>

              <p>
                {creator.contentDescription}
              </p>

              <a
                href={creator.youtube}
                target="_blank"
                rel="noreferrer"
                className="outline-button"
              >
                Explore channel

                <ExternalLink
                  size={16}
                />
              </a>

            </div>

            <div className="game-types">

              {creator.categories.map(
                (category, index) => (

                  <div
                    className={`game-type ${
                      index === 0
                        ? "active"
                        : ""
                    }`}
                    key={
                      category.number
                    }
                  >

                    <span className="game-number">
                      {category.number}
                    </span>

                    <div>

                      <strong>
                        {category.title}
                      </strong>

                      <p>
                        {
                          category.description
                        }
                      </p>

                    </div>

                    <ArrowUpRight
                      size={20}
                    />

                  </div>

                )
              )}

            </div>

          </div>

        </section>

        {/* ==================================
            VIDEOS
        ================================== */}

        <section
          id="videos"
          className="section videos-section"
        >

          <div className="container">

            <div className="section-heading">

              <div>

                <div className="eyebrow">
                  LATEST UPLOADS
                </div>

                <h2>
                  Watch the chaos.
                </h2>

              </div>

              <a
                href={creator.youtube}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                YouTube

                <ArrowUpRight
                  size={16}
                />
              </a>

            </div>

            <div className="video-grid">

              {!youtubeLoading &&
                !youtubeError &&
                additionalVideos.map(
                  (video) => (

                    <article
                      className="video-card"
                      key={video.id}
                    >

                      <a
                        href={getVideoUrl(
                          video.id
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >

                        <div className="video-image">

                          <img
                            src={getVideoThumbnail(
                              video
                            )}
                            alt={
                              video.snippet
                                .title
                            }
                          />

                          <div className="video-overlay">

                            <span className="video-play">

                              <Play
                                size={18}
                                fill="currentColor"
                              />

                            </span>

                          </div>

                        </div>

                        <div className="video-info">

                          <span>
                            {video
                              .snippet
                              .liveBroadcastContent ===
                            "live"
                              ? "LIVE"
                              : "YOUTUBE"}
                          </span>

                          <h3>
                            {
                              video
                                .snippet
                                .title
                            }
                          </h3>

                        </div>

                      </a>

                    </article>

                  )
                )}

            </div>

          </div>

        </section>

        {/* ==================================
            ABOUT
        ================================== */}

        <section
          id="about"
          className="about-section"
        >

          <div className="container">

            <div className="about-card">

              <div className="about-left">

                <div className="eyebrow">
                  {creator.aboutEyebrow}
                </div>

                <h2>
                  {creator.aboutTitleLine1}

                  <br />

                  {creator.aboutTitleLine2}
                </h2>

              </div>

              <div className="about-right">

                {creator.aboutParagraphs.map(
                  (
                    paragraph,
                    index
                  ) => (
                    <p key={index}>
                      {paragraph}
                    </p>
                  )
                )}

                <div className="about-links">

                  <a
                    href={creator.youtube}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Youtube
                      size={18}
                    />

                    YouTube

                    <ArrowUpRight
                      size={15}
                    />
                  </a>

                  <a
                    href={creator.instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Instagram
                      size={18}
                    />

                    Instagram

                    <ArrowUpRight
                      size={15}
                    />
                  </a>

                  <a
                    href={creator.discord}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle
                      size={18}
                    />

                    Discord

                    <ArrowUpRight
                      size={15}
                    />
                  </a>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

      {/* ==================================
          FOOTER
      ================================== */}

      <footer>

        <div className="container footer-inner">

          <div className="footer-brand">

            <div className="logo">

              <span className="logo-mark"></span>

              {creator.name}

            </div>

            <p>
              {creator.footerTagline}
            </p>

          </div>

          <div className="footer-right">

            <span>
              {new Date().getFullYear()}{" "}
              {creator.name}
            </span>

            <a href="#top">

              Back to top

              <ChevronDown
                size={15}
                className="rotate-up"
              />

            </a>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default App;