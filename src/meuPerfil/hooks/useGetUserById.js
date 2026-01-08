import { useQuery } from '@tanstack/react-query'
import { HttpRequest, users_url } from '../../components/commons/utils'

export default function useGetUserById(id) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: () => HttpRequest('GET', `${users_url}/${id}`),
  })

  const user = data?.data

  const name = user?.name
  const email = user?.email
  const role = user?.role

  return { name, email, role, isLoading, isError }
}
