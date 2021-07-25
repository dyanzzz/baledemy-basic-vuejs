const routes = [
    { path: '/index-firebase.html', component: Home },
    { path: '/index-firebase.html/about', component: About },
    { path: '/index-firebase.html/kelas', component: Kelas },
    { path: '/index-firebase.html/kelas/:idKelas', component: DetailKelas },
    { path: '*', component: NotFound }
]

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})