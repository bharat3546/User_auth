
const isAuthenticated=function(){
  console.log('test');
}
const routes = [
  {
    path: '',
    redirect:'/login',
  },
  {
    path: '/login',
    component:()=>import('layouts/unautenticated'),
    children:[
      {path:'',component:()=>import('pages/login')}
    ]
  },
  {
    path: '/home',
    component:()=>import('layouts/home'),
    beforeEnter:isAuthenticated,
    children:[
      {path:'',component:()=>import('pages/Index')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
