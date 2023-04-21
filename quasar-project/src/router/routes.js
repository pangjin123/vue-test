
const routes = [
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }, //indexPage 안에 실행
      { path: '/vue', component: () => import('pages/VueEx.vue') },
      { path: '/shop', component: () => import('pages/ShoppingList.vue') },
      { path: '/todo', component:() => import('pages/Todo.vue') },
      { path: '/cal', component:() => import('pages/Calculator.vue')},
      { path: '/books', component:() => import('pages/Books.vue')},
    ]
  },
  //여기에 path 추가하면 새로운 페이지로 실행


  
  //오류 핸들링
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
