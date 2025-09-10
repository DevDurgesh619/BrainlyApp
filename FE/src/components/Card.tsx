import { ShareIcon } from "../icons/Share";

interface CardProps {
  title: string,
  link: string,
  type: "youtube" | "twitter"
}

export function Card({ title, link, type }: CardProps) {
  // Robust YouTube ID extractor
  const getYoutubeId = (url: string) => {
    try {
      const u = new URL(url);

      // Case: normal watch link ?v=VIDEO_ID
      if (u.searchParams.get("v")) {
        return u.searchParams.get("v");
      }

      // Case: youtu.be short link
      if (u.hostname === "youtu.be") {
        return u.pathname.slice(1);
      }

      // Case: embed link
      if (u.pathname.startsWith("/embed/")) {
        return u.pathname.split("/embed/")[1];
      }

      return null;
    } catch {
      return null;
    }
  };

  const youtubeId = type === "youtube" ? getYoutubeId(link) : null;

  return (
    <div className="p-4 bg-white rounded-md shadow-md outline-slate-200 max-w-72 border-gray-200 border min-h-48 min-w-72">
      <div className="flex justify-between">
        <div className="flex items-center text-md">
          <div className="text-gray-500 pr-2 ">
            <ShareIcon size="md" />
          </div>
          {title}
        </div>
        <div className="flex items-center">
          <div className="pr-2 text-gray-500 hover:cursor-pointer">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <ShareIcon size="md" />
            </a>
          </div>
          <div className="text-gray-500">
            <ShareIcon size="md" />
          </div>
        </div>
      </div>

      <div className="pt-4">
        {/* ✅ YouTube Thumbnail */}
        {type === "youtube" && youtubeId && (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <img
              className="w-full rounded-md"
              src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
              alt={title}
            />
          </a>
        )}

        {/* ✅ Twitter Embed */}
        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  )
}
