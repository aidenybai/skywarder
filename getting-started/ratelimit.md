---
description: The following headers are provided to manage ratelimits.
---

# Ratelimit

Rate limit: 5 requests per second, 4000 requests per hour global.

| Header | Description |
| :--- | :--- |
| `X-Ratelimit-Limit` | The total amount of requests you can make per time window. |
| `X-Ratelimit-Remaining` | TRequests Left for the time window. |
| `X-Ratelimit-Reset` | Unix seconds when your ratelimit resets. |

