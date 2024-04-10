import { createRouter, createWebHistory } from "vue-router";
import { useUsuariosStore } from "../src/stores/usuarios";
import { useDatabaseStore } from "./stores/database"

import  Home  from "./views/Home.vue";
import  Login  from "./views/Login.vue";
import  Register  from "./views/Register.vue";
import Editar from "./views/Editar.vue";
import Perfil from "./views/Perfil.vue";
import NotFound from "./views/NotFound.vue";


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

const Redireccion = async(to, from, next) => {
    const databaseStore = useDatabaseStore()

    //console.log(to.params.pathMatch[0]);

    const useStore = useUsuariosStore()
    useStore.loadingSession = true
    
    const name = await databaseStore.getUrl(to.params.pathMatch[0])

    if(!name) { //Si no existe el name pasa al siguiente componente
        next()

        useStore.loadingSession = true
    } else {
        window.location.href = name
        
        useStore.loadingSession = true
        next()
        
    }
    
}

const routes = [
    { path: '/', component: Home, beforeEnter: requireAuth, name: 'Home' },
    { path: '/Perfil', component: Perfil, beforeEnter: requireAuth, name: 'Perfil' },
    { path: '/Editar/:Id', component: Editar, beforeEnter: requireAuth, name: 'Editar' },
    { path: '/Login', component: Login, name: 'Login' },
    { path: '/Register', component: Register, name: 'Register' },
    { path: '/:pathMatch(.*)*', component: NotFound, name: '404', beforeEnter: Redireccion }
]

const router = createRouter({
    routes, history: createWebHistory()
})

export default router