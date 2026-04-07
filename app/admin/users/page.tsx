import { UserDetailsPage } from '@/pages/usersList/ul/userDetails/UserDetailsPage' // экран детальной информации о пользователе
import { UsersList } from '@/pages/usersList/ul/UsersList' // экран списка пользователей


type UsersPageProps = {
  searchParams: Promise<{
    userId?: string
  }>
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const params = await searchParams

  if (params.userId) {
    return <UserDetailsPage userId={Number(params.userId)} />
  }

  return <UsersList />
}
