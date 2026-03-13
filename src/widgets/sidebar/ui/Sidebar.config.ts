export const Path = {
  UsersList: '/admin/users',
  Statistics: '/admin/statistics',
  PaymentsList: '/admin/payments',
  Posts: '/admin/posts',
  NotFound: '*',
} as const

export const menuItems = [
  { href: Path.UsersList, label: 'Users list', icon: 'usersList', disabled: false },
  {
    href: Path.Statistics,
    label: 'Statistics',
    icon: 'statistic',
    disabled: false,
  },
  { href: Path.PaymentsList, label: 'Payments list', icon: 'payments', disabled: false },
  { href: Path.Posts, label: 'Posts list', icon: 'posts', disabled: false },
]
