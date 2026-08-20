# Github user search

## AI-assisted development

I used **Claude Code** (Anthropic's coding agent) as a helper, not an autopilot.

**What I used it for:** setting up the project, generating types from a real GitHub API response, learning about the Search API's rate limits and pagination, simple SVG icons, the loading shimmer, and starting the test suite.

**How I reviewed it:** I read every suggestion and made the final call on architecture and naming. For example, I wanted its opinion on how to connect the duplicate/delete actions to the selection context. But his solution was way too complicated, applying effect synchronization in several UI components. but the real issue at that time was only that the provider was set up too low in the tree, moving it up in the root tsx file was enough to implement a simple helper to duplicate / delete.
