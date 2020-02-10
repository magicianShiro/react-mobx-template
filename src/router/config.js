const constantRoutes = [
  // {
  //   path: '/',
  //   redirect: '/about',
  //   show: false,
  // },
  {
    path: '/about',
    title: 'about',
    icon: 'bank',
    component: () => import('@/views/About'),
    children: [
      {
        path: '/me',
        title: 'me',
        icon: 'bank',
        component: () => import('@/views/Me'),
      }
    ],
  },
  {
    path: '/home',
    title: 'home',
    icon: 'laptop',
    component: () => import('@/views/Home')
  }
]

export default constantRoutes