const API_BASE = "https://www.googleapis.com/youtube/v3";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const CHANNEL_ID = "UCPWZa2S14x_TK_ObDyGDbcQ";

async function youtubeFetch(endpoint, params = {}) {
  const searchParams = new URLSearchParams({
    ...params,
    key: API_KEY,
  });

  const response = await fetch(
    `${API_BASE}/${endpoint}?${searchParams.toString()}`
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));

    throw new Error(
      error?.error?.message || "YouTube API request failed"
    );
  }

  return response.json();
}

export async function getChannel() {
  const data = await youtubeFetch("channels", {
    part: "snippet,contentDetails,statistics",
    id: CHANNEL_ID,
  });

  if (!data.items?.length) {
    throw new Error("YouTube channel not found");
  }

  return data.items[0];
}

export async function getLatestVideos(uploadPlaylistId) {
  const playlistData = await youtubeFetch("playlistItems", {
    part: "snippet,contentDetails",
    playlistId: uploadPlaylistId,
    maxResults: 6,
  });

  const videoIds = playlistData.items
    .map((item) => item.contentDetails.videoId)
    .filter(Boolean);

  if (!videoIds.length) {
    return [];
  }

  const videoData = await youtubeFetch("videos", {
    part: "snippet,contentDetails,statistics,liveStreamingDetails",
    id: videoIds.join(","),
  });

  return videoData.items || [];
}

export async function getCreatorData() {
  const channel = await getChannel();

  const uploadsPlaylistId =
    channel.contentDetails.relatedPlaylists.uploads;

  const videos = await getLatestVideos(uploadsPlaylistId);

  const liveVideo = videos.find(
    (video) => video.snippet.liveBroadcastContent === "live"
  );

  return {
    channel,
    videos,
    liveVideo: liveVideo || null,
  };
}