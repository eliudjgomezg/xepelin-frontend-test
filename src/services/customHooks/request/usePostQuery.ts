import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { apiClient } from '../../constants/ApiClient'
import endpoints from '../../constants/endpoints'

export const usePostsQuery = () => {
  return useQuery(`all_${endpoints.posts}`, apiClient.getPosts, {
    select: (data) => data,
    cacheTime: 0,
    keepPreviousData: false,
  })
}

export const usePostQuery = (id: string) => {
  return useQuery(`one_${endpoints.posts}`, () => apiClient.getPost(id), {
    cacheTime: 0,
    keepPreviousData: false,
  })
}

export const usePostMutation = () => {
  const mutation = useMutation(`post_${endpoints.posts}`, apiClient.postPlan)
  useRefreshPosts(mutation)
  return mutation
}

export const useRefreshPosts = (mutation: any) => {
  const queryClient = useQueryClient()
  useEffect(() => {
    mutation.isSuccess && queryClient.refetchQueries(`all_${endpoints.posts}`)
  }, [mutation.isSuccess])
}
