export interface GithubUser {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: "User" | "Organization"
  user_view_type: "public" | "private"
  site_admin: boolean
  score: number
}

export interface GithubUserSearchResponseData {
  total_count: number
  incomplete_results: boolean
  items: GithubUser[]
}

// A user as shown in the results list. `id` stays the real unique GitHub
// number (needed for React keys / selection). `displayId` is only set on a
// duplicated row: the frontend-only "(1)" suffixed text to show instead.
export interface DisplayedUser extends GithubUser {
  displayId?: string
}
