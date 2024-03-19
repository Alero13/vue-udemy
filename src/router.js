import { createRouter, createWebHistory } from "vue-router";

import  Home  from "./views/Home.vue";
import  Login  from "./views/Login.vue";
import  Register  from "./views/Register.vue";
import Editar from "./views/Editar.vue";
import Perfil from "./views/Perfil.vue";

import { useUsuariosStore } from "../src/stores/usuarios";
 
//Funciona como midleware
const requireAuth = async (to, from, next)  => {
    const useStore = useUsuariosStore()

    useStore.loadingSession = true

    const Usuario = await useStore.UsuarioActual()
    if (Usuario) {
        next()
    } else {
        next("/Login")
    }

    useStore.loadingSession = false
}

const routes = [
    { path: '/', component: Home, beforeEnter: requireAuth, name: 'Home' },
    { path: '/Perfil', component: Perfil, beforeEnter: requireAuth, name: 'Perfil' },
    { path: '/Editar/:Id', component: Editar, beforeEnter: requireAuth, name: 'Editar' },
    { path: '/Login', component: Login, name: 'Login' },
    { path: '/Register', component: Register, name: 'Register' }
]

const router = createRouter({
    routes, history: createWebHistory()
})

export default router