import {createRouter, createWebHistory} from 'vue-router'
import NotFound from "../views/misc/NotFound";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import Home from "../views/Home";
import Orders from "../views/Orders";

const projectName = 'itorum_test'

const routes = [
    {
        path:  `/${projectName}/orders`,
        name: 'Orders',
        component: Orders,
        props: true
    },
    {
        path:  `/${projectName}`,
        name: 'Home',
        component: Home,
        props: true
    },
    {
        path:  `/${projectName}/login`,
        name: 'Login',
        component: Login
    },
    {
        path:  `/${projectName}/register`,
        name: 'Register',
        component: Register
    },
    {
        path:  `/${projectName}/404`,
        name: '404',
        component: NotFound,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
})

router.beforeEach((to, from, next) => {
    const publicPages = ['404', 'Login', 'Register', 'Home'];
    const authRequired = !publicPages.includes(to.name);
    const loggedIn = localStorage.getItem('user');
    if (!to.name) {
        return next({
            name: '404'
        })
    }
    if (authRequired && !loggedIn) {
        return next({
            name: 'Login'
        });
    } else {
        return next();
    }
});

export default router
