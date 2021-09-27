import { useQuery } from 'react-query'
import { apiClient } from '../../constants/ApiClient'
import endpoints from '../../constants/endpoints'

export const useUserQuery = (id: string) => {
  return useQuery(`one_${endpoints.users}`, () => apiClient.getUser(id), {
    cacheTime: 0,
    keepPreviousData: false,
  })
}
