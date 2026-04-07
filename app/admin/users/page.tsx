import { UserDetailsPage } from '@/pages/usersList/ul/userDetails/UserDetailsPage' // экран детальной информации о пользователе
import { UsersList } from '@/pages/usersList/ul/UsersList' // экран списка пользователей


// 2 Идея дальше простая: этот route-компонент будет решать, что именно показать, список или детали.
//   - /admin/users → userId нет
//   - /admin/users?userId=15 → userId === '15'

type UsersPageProps = {
  searchParams: Promise<{ // это query-параметры из URL
    userId?: string
  }>
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const params = await searchParams // Здесь мы дожидаемся значения searchParams из URL.

  if (params.userId) { //  - если в query-параметрах есть userId - значит пользователь хочет открыть детальную страницу, а не список
    return <UserDetailsPage userId={Number(params.userId)} /> //рендерим UserDetailsPage.
    // почему Number?  внутри UserDetailsPage GraphQL-запросы ожидают числовой userId
    //   - поэтому строку из URL надо привести к числу
  }

  return <UsersList />
}
