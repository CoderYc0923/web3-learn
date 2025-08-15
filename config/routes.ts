const baseRoutes = [
    {
        path: '/',
        redirect: '/home',
      },
      {
        name: '首页',
        path: '/home',
        component: './Home',
      },
      {
        name: '合约升级',
        path: '/upgrade',
        component: './Upgrade',
      },
      /* {
        name: '权限演示',
        path: '/access',
        component: './Access',
      },
      {
        name: ' CRUD 示例',
        path: '/table',
        component: './Table',
      }, */
]

const routes = [...baseRoutes]

export default routes