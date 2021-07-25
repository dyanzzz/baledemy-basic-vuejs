const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/kelas', component: Kelas },
    { path: '/kelas/:idKelas', component: DetailKelas },
    { path: '*', component: NotFound }
]

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})