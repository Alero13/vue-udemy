<template>
  
  <a-layout>

    <a-layout-header v-if="!useStore.loadingSession">
      <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }"
      v-model:selectedKeys="selectedKeys">
        <a-menu-item v-if="useStore.usuarioData" key="Home">
          <router-link to="/" >Home</router-link> 
        </a-menu-item>
        <a-menu-item v-if="useStore.usuarioData" key="Perfil">
          <router-link to="/Perfil" >Perfil</router-link> 
        </a-menu-item>
        <a-menu-item v-if="!useStore.usuarioData" key="Login">
          <router-link to="/Login" >Login</router-link> 
        </a-menu-item>
        <a-menu-item v-if="!useStore.usuarioData" key="Register">
          <router-link to="/Register" >Register</router-link> 
        </a-menu-item>
        <a-menu-item @click="useStore.LogOut" v-if="useStore.usuarioData" key="Logout">
          Logout
        </a-menu-item>
      </a-menu>

      <nav >
      
      
      
      
      </nav>
    </a-layout-header>
    
    <a-layout-content style="padding: 0 50px">
      <div class="container">
        <div v-if="useStore.loadingSession">Loading ... User</div>
        <router-view></router-view>
      </div>
      
    </a-layout-content>
    
    

  </a-layout>

</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useUsuariosStore } from "../src/stores/usuarios";

const useStore = useUsuariosStore()
const Route = useRoute()
const selectedKeys = ref(['Login'])

//console.log(Route.name)
watch(() => Route.name, () => /* console.log(Route.name) */ 
  selectedKeys.value = [Route.name])


</script>

<style>
  .container{
    background-color: #fff;
    padding: 24px;
    min-height: calc(100vh - 64px) ;
  }
  .text-center {
    text-align: center;
  }
</style>
