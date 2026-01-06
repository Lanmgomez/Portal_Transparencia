import { useQuery } from '@tanstack/react-query'
import { getData, users_url } from '../../components/commons/utils'

export default function useGetUsers() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: () => getData(users_url),
  })

  const users = data?.data?.data

  return { users, isLoading, isError }
}
