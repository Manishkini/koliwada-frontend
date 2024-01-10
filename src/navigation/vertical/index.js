const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'tabler:smart-home'
    },
    {
      title: 'Second Page',
      path: '/second-page',
      icon: 'tabler:mail'
    },
    {
      title: 'Villages',
      path: '/villages',
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
}

export default navigation
