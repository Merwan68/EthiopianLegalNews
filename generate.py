import feedparser
import json
from datetime import datetime

FEEDS = [
    {
        "name": "The Reporter Ethiopia",
        "url": "https://www.thereporterethiopia.com/feed/"
    }
]

articles = []

for feed in FEEDS:

    try:

        rss = feedparser.parse(feed["url"])

        for entry in rss.entries[:20]:

            title = entry.get("title", "No Title")

            link = entry.get("link", "#")

            description = entry.get(
                "summary",
                "No description available."
            )

            date = ""

            if hasattr(entry, "published_parsed"):

                date = datetime(
                    *entry.published_parsed[:6]
                ).strftime("%Y-%m-%d")

            articles.append({
                "title": title,
                "source": feed["name"],
                "description": description[:300],
                "date": date,
                "link": link
            })

    except Exception as e:

        print(
            f"Failed to load {feed['name']}: {e}"
        )

articles = sorted(
    articles,
    key=lambda x: x["date"],
    reverse=True
)

with open(
    "feed.json",
    "w",
    encoding="utf-8"
) as f:

    json.dump(
        articles[:100],
        f,
        ensure_ascii=False,
        indent=2
    )

print(
    f"Generated {len(articles)} articles."
)