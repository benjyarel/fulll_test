import type { GithubUser, GithubUserSearchResponseData } from "../types"
export const mockUsers: GithubUser[] = [
  {
    login: "A",
    id: 1410106,
    node_id: "MDQ6VXNlcjE0MTAxMDY=",
    avatar_url: "https://avatars.githubusercontent.com/u/1410106?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/A",
    html_url: "https://github.com/A",
    followers_url: "https://api.github.com/users/A/followers",
    following_url: "https://api.github.com/users/A/following{/other_user}",
    gists_url: "https://api.github.com/users/A/gists{/gist_id}",
    starred_url: "https://api.github.com/users/A/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/A/subscriptions",
    organizations_url: "https://api.github.com/users/A/orgs",
    repos_url: "https://api.github.com/users/A/repos",
    events_url: "https://api.github.com/users/A/events{/privacy}",
    received_events_url: "https://api.github.com/users/A/received_events",
    type: "User",
    user_view_type: "public",
    site_admin: false,
    score: 1,
  },
]

export const mockSearchResponse: GithubUserSearchResponseData = {
  total_count: 2052682,
  incomplete_results: false,
  items: mockUsers,
}
