const API_BASE = "https://www.googleapis.com/youtube/v3";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

async function youtubeFetch(endpoint, params = {}) {
  if (!API_KEY) {
    throw new Error(
      "YouTube API key is missing. Check your .env file."
    );
  }

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
      error?.error?.message ||
        "YouTube API request failed."
    );
  }

  return response.json();
}

// ==========================================
// GET CHANNEL BY @HANDLE
// ==========================================

export async function getChannel(channelHandle) {
  const cleanHandle = channelHandle.startsWith("@")
    ? channelHandle
    : `@${channelHandle}`;

  const data = await youtubeFetch("channels", {
    part: "snippet,contentDetails,statistics",
    forHandle: cleanHandle,
  });

  if (!data.items?.length) {
    throw new Error(
      `YouTube channel ${cleanHandle} was not found.`
    );
  }

  return data.items[0];
}

// ==========================================
// GET LATEST VIDEOS
// ==========================================

export async function getLatestVideos(
  uploadPlaylistId
) {
  const playlistData = await youtubeFetch(
    "playlistItems",
    {
      part: "snippet,contentDetails",
      playlistId: uploadPlaylistId,
      maxResults: 12,
    }
  );

  const videoIds = playlistData.items
    .map(
      (item) =>
        item.contentDetails?.videoId
    )
    .filter(Boolean);

  if (!videoIds.length) {
    return [];
  }

  const videoData = await youtubeFetch(
    "videos",
    {
      part:
        "snippet,contentDetails,statistics,liveStreamingDetails",
      id: videoIds.join(","),
    }
  );

  const videoMap = new Map(
    videoData.items.map((video) => [
      video.id,
      video,
    ])
  );

  // Keep YouTube's original playlist order
  return videoIds
    .map((id) => videoMap.get(id))
    .filter(Boolean);
}

// ==========================================
// GET COMPLETE CREATOR DATA
// ==========================================

export async function getCreatorData(
  channelHandle
) {
  const channel =
    await getChannel(channelHandle);

  const uploadsPlaylistId =
    channel.contentDetails
      ?.relatedPlaylists?.uploads;

  if (!uploadsPlaylistId) {
    throw new Error(
      "Could not find the creator uploads playlist."
    );
  }

  const videos =
    await getLatestVideos(
      uploadsPlaylistId
    );

  const liveVideo = videos.find(
    (video) =>
      video.snippet
        ?.liveBroadcastContent ===
      "live"
  );

  return {
    channel,
    videos,
    liveVideo:
      liveVideo || null,
  };
}