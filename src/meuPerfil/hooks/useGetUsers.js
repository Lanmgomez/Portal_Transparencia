import { useQuery } from '@tanstack/react-query'
import { HttpRequest, users_url } from '../../components/commons/utils'

export default function useGetUsers() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: () => HttpRequest('GET', users_url),
  })

  const users = data?.data?.data

  return { users, isLoading, isError }
}
