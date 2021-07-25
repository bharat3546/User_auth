
const isAuthenticated=function(to,from,next){
  if(localStorage.getItem('userId')){
    next()
  }else{
    next('/login')
  }
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
      {path:'',name:'login',component:()=>import('pages/login')}
    ]
  },
  {
    path: '/home',
    component:()=>import('layouts/home'),
    beforeEnter:isAuthenticated,
    children:[
      {path:'',name:'home',component:()=>import('pages/Index')}
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
