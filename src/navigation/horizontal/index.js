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
    title: 'Villages',
    path: '/villages',
    icon: 'tabler:building-pavilion',
    children: [
      {
        title: 'Charkop',
        path: '/villages/charkop',
        icon: 'tabler:building-circus'
      }
    ]
  }
]

export default navigation
