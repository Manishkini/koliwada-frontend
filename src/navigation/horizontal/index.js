const navigation = () => [
  {
    title: 'Home',
    path: '/home',
    auth: false,
    icon: 'tabler:smart-home'
  },
  {
    title: 'Second Page',
    path: '/second-page',
    auth: false,
    icon: 'tabler:mail'
  },
  {
    path: '/acl',
    title: 'Access Control',
    auth: false,
    icon: 'tabler:shield'
  },
  {
    title: 'Villages',
    path: '/villages',
    auth: true,
    icon: 'tabler:settings',
    children: [
      {
        title: 'Charkop',
        path: '/villages/charkop',
        icon: 'tabler:user-star'
      }
    ]
  }
]

export default navigation
