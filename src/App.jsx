import React from "react";

import {
  ArrowUpRight,
  ChevronDown,
  ExternalLink,
  Instagram,
  Play,
  Radio,
  Twitch,
  Youtube
} from "lucide-react";

const creator = {
  name: "INFERNO",
  handle: "@_Inferno_playz",
  location: "India",

  description:
    "Valorant rank grinds, clutch moments, story-driven games and a little bit of chaos along the way.",

  instagram: "https://www.instagram.com/_inferno_172/",
  youtube: "https://www.youtube.com/@_Inferno_playz",

  subscribers: "18.3K",
  videos: "667",
  views: "1.35M"
};

const streams = [
  {
    title: "THE LOBBY IS COOKING ME",
    game: "VALORANT",
    viewers: "58 watching",
    duration: "LIVE",
    type: "live",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85"
  },
  {
    title: "MY NIGHT MARKET BETTER NOT BE TRASH",
    game: "VALORANT",
    viewers: "6.7K views",
    duration: "5:41:43",
    type: "vod",
    image:
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1200&q=85"
  },
  {
    title: "THIS GAME IS GASLIGHTING ME",
    game: "VALORANT",
    viewers: "8.9K views",
    duration: "5:39:37",
    type: "vod",
    image:
      "https://images.unsplash.com/photo-1605899435973-ca2d1a8861cf?auto=format&fit=crop&w=1200&q=85"
  }
];

const videos = [
  {
    title: "THE MOST CHAOTIC RANKED GAME",
    category: "VALORANT",
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=85"
  },
  {
    title: "WE SHOULD NOT HAVE WON THIS",
    category: "VALORANT",
    image:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1200&q=85"
  },
  {
    title: "TRYING A COMPLETELY NEW GAME",
    category: "AAA / STORY",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=85"
  }
];

function App() {
  return (
    <div className="site">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-inner">

          <a href="#top" className="logo">
            <span className="logo-mark"></span>
            <span>INFERNO</span>
          </a>

          <nav className="desktop-nav">
            <a href="#streams">Streams</a>
            <a href="#videos">Videos</a>
            <a href="#about">About</a>
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
              <ArrowUpRight size={16} />
            </a>
          </div>

        </div>
      </header>

      <main id="top">

        {/* HERO */}
        <section className="hero">

          <div className="hero-background">
            <div className="hero-grid"></div>
            <div className="hero-glow"></div>
          </div>

          <div className="container hero-content">

            <div className="hero-copy">

              <div className="live-pill">
                <span className="live-dot"></span>
                LIVE ON YOUTUBE
              </div>

              <h1>
                PLAY HARD.
                <br />
                <span>STAY INFERNO.</span>
              </h1>

              <p className="hero-description">
                Valorant rank grinds, clutch moments, AAA adventures and
                unfiltered reactions from the other side of the screen.
              </p>

              <div className="hero-buttons">

                <a
                  href={creator.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="primary-button"
                >
                  <Play size={17} fill="currentColor" />
                  Watch on YouTube
                </a>

                <a
                  href={creator.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="secondary-button"
                >
                  <Instagram size={17} />
                  Instagram
                </a>

              </div>

            </div>

            <div className="hero-profile">

              <div className="profile-ring">

                <img
                    className="profile-image"
                    src="/images/inferno-profile.jpg"
                    alt="INFERNO"
                />

                <div className="profile-live">
                  <Radio size={13} />
                  LIVE
                </div>

              </div>

              <div className="profile-name">
                <strong>{creator.name}</strong>
                <span>{creator.handle}</span>
              </div>

            </div>

          </div>

          <div className="hero-bottom-fade"></div>
        </section>

        {/* STATS */}
        <section className="stats-section">

          <div className="container stats">

            <div className="stat">
              <strong>{creator.subscribers}</strong>
              <span>Subscribers</span>
            </div>

            <div className="stat-divider"></div>

            <div className="stat">
              <strong>{creator.videos}</strong>
              <span>Videos</span>
            </div>

            <div className="stat-divider"></div>

            <div className="stat">
              <strong>{creator.views}</strong>
              <span>Total views</span>
            </div>

            <div className="stat-divider"></div>

            <div className="stat">
              <strong>{creator.location}</strong>
              <span>Based in</span>
            </div>

          </div>

        </section>

        {/* LIVE */}
        <section id="streams" className="section">

          <div className="container">

            <div className="section-heading">

              <div>
                <div className="eyebrow">
                  <span className="small-live-dot"></span>
                  ON THE CHANNEL
                </div>

                <h2>Streams & VODs</h2>

                <p>
                  Catch the latest rank grinds, chaotic moments and
                  long-form gaming sessions.
                </p>
              </div>

              <a
                href={creator.youtube}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                View all
                <ArrowUpRight size={16} />
              </a>

            </div>

            <div className="stream-grid">

              {streams.map((stream, index) => (
                <article
                  className={`stream-card ${
                    stream.type === "live" ? "is-live" : ""
                  }`}
                  key={index}
                >

                  <div className="thumbnail">

                    <img
                      src={stream.image}
                      alt=""
                    />

                    <div className="thumbnail-overlay"></div>

                    {stream.type === "live" ? (
                      <span className="live-label">
                        <span></span>
                        LIVE
                      </span>
                    ) : (
                      <span className="duration">
                        {stream.duration}
                      </span>
                    )}

                    <button className="play-button">
                      <Play size={19} fill="currentColor" />
                    </button>

                  </div>

                  <div className="card-content">

                    <div className="card-meta">
                      <span>{stream.game}</span>
                      <span>{stream.viewers}</span>
                    </div>

                    <h3>{stream.title}</h3>

                  </div>

                </article>
              ))}

            </div>

          </div>

        </section>

        {/* CONTENT SPLIT */}
        <section className="content-section">

          <div className="container content-layout">

            <div className="content-intro">

              <div className="eyebrow">
                CONTENT
              </div>

              <h2>
                More than
                <br />
                just Valorant.
              </h2>

              <p>
                From sweaty ranked sessions to cinematic story games,
                there's always something different happening on the
                channel.
              </p>

              <a
                href={creator.youtube}
                target="_blank"
                rel="noreferrer"
                className="outline-button"
              >
                Explore channel
                <ExternalLink size={16} />
              </a>

            </div>

            <div className="game-types">

              <div className="game-type active">
                <span className="game-number">01</span>

                <div>
                  <strong>VALORANT</strong>
                  <p>Ranked grind · Clutches · Chaos</p>
                </div>

                <ArrowUpRight size={20} />
              </div>

              <div className="game-type">
                <span className="game-number">02</span>

                <div>
                  <strong>AAA GAMES</strong>
                  <p>New releases · Adventures · Reactions</p>
                </div>

                <ArrowUpRight size={20} />
              </div>

              <div className="game-type">
                <span className="game-number">03</span>

                <div>
                  <strong>STORY MODE</strong>
                  <p>Cinematic experiences · Full playthroughs</p>
                </div>

                <ArrowUpRight size={20} />
              </div>

            </div>

          </div>

        </section>

        {/* VIDEOS */}
        <section id="videos" className="section videos-section">

          <div className="container">

            <div className="section-heading">

              <div>

                <div className="eyebrow">
                  LATEST UPLOADS
                </div>

                <h2>Watch the chaos.</h2>

              </div>

              <a
                href={creator.youtube}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                YouTube
                <ArrowUpRight size={16} />
              </a>

            </div>

            <div className="video-grid">

              {videos.map((video, index) => (
                <article className="video-card" key={index}>

                  <div className="video-image">

                    <img
                      src={video.image}
                      alt=""
                    />

                    <div className="video-overlay">
                      <span className="video-play">
                        <Play size={18} fill="currentColor" />
                      </span>
                    </div>

                  </div>

                  <div className="video-info">

                    <span>{video.category}</span>

                    <h3>{video.title}</h3>

                  </div>

                </article>
              ))}

            </div>

          </div>

        </section>

        {/* ABOUT */}
        <section id="about" className="about-section">

          <div className="container">

            <div className="about-card">

              <div className="about-left">

                <div className="eyebrow">
                  ABOUT INFERNO
                </div>

                <h2>
                  Welcome to
                  <br />
                  the grind.
                </h2>

              </div>

              <div className="about-right">

                <p>{creator.description}</p>

                <p>
                  The channel is built around competitive Valorant,
                  funny gaming moments, story-driven experiences and
                  hanging out with the community.
                </p>

                <div className="about-links">

                  <a
                    href={creator.youtube}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Youtube size={18} />
                    YouTube
                    <ArrowUpRight size={15} />
                  </a>

                  <a
                    href={creator.instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Instagram size={18} />
                    Instagram
                    <ArrowUpRight size={15} />
                  </a>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer>

        <div className="container footer-inner">

          <div className="footer-brand">

            <div className="logo">
              <span className="logo-mark"></span>
              INFERNO
            </div>

            <p>
              Gaming. Chaos. Community.
            </p>

          </div>

          <div className="footer-right">

            <span>
              {new Date().getFullYear()} INFERNO
            </span>

            <a href="#top">
              Back to top
              <ChevronDown size={15} className="rotate-up" />
            </a>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default App;