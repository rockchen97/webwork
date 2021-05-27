import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Login2 from '../views/login2.vue'
import Sign from '../views/sign.vue'
import Sign2 from '../views/sign2.vue'
import Management from '../views/management.vue'
import User from '../views/user.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/sign',
    name: 'sign',
    component: Sign
  },
  {
    path: '/management',
    name: 'management',
    component: Management
  },

  {
    path: '/login2',
    name: 'login2',
    component: Login2
  },
  {
    path: '/sign2',
    name: 'sign2',
    component: Sign2
  },
  {
    path: '/user',
    
    component: User,
    children: [
      {
        path: 'center',
        redirect: '/user/center/info',
        component: ()=> import('../views/center.vue'),
        children: [
          {
            path: 'info',
            name: 'info',
            component: ()=> import('../views/info.vue'),
          },
          {
            path: 'record',
            name: 'record',
            component: ()=> import('../views/record.vue'),
          },
        ]
      },
      {
        path: 'mall',
        name: 'mall',
        component: ()=> import('../views/mall.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/sign'|| to.path === '/sign2'|| to.path === '/login2') {
    next();
  } else {
    let id = localStorage.getItem('id');
    if (id === null || id === '') {
      next('/login');
    } else {
      next();
    }
  } 
});

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};
export default router
