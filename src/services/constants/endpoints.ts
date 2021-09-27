const endpoints = {
  //Post
  posts: '/posts',
  post: (id: string) => `/posts/${id}`,
  //Users
  users: '/users',
  user: (id: string) => `/users/${id}`,
}
export default endpoints
