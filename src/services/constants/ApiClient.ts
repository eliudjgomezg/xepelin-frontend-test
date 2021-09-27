import { IUser } from './../../models/IUser'
import { IPost } from './../../models/IPost'
import autoBind from 'auto-bind'
import endpoints from './endpoints'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

class APIClient {
  server: string
  endpoints = endpoints

  constructor() {
    this.server = BASE_URL
    autoBind(this)
  }

  async fetch<T>(endpoint: string, method: 'GET' | 'POST' = 'GET', data: FormData | any = undefined): Promise<T> {
    const body = JSON.stringify(data)
    const headers = { 'Content-Type': 'application/json' }

    return await fetch(`${this.server}${endpoint}`, { method, body, headers }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      throw { name: 'Fetch error', response: res }
    })
  }

  //Posts
  getPosts(): Promise<IPost[]> {
    return this.fetch(this.endpoints.posts, 'GET')
  }
  getPost(id: string): Promise<IPost> {
    return this.fetch(this.endpoints.post(id), 'GET')
  }
  postPlan(body: IPost): Promise<IPost> {
    return this.fetch(this.endpoints.posts, 'POST', body)
  }

  //Users
  getUser(id: string): Promise<IUser> {
    return this.fetch(this.endpoints.user(id), 'GET')
  }
}

const apiClient = new APIClient()

export { apiClient }
export default APIClient
