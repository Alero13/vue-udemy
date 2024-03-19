<template>
    <div>
        <!-- <h1>Home - {{ useStore.usuarioData}}</h1> -->
        <h1>Home de Rutas Protegidas </h1>
        <!-- <p>{{ useStore.usuarioData}}</p> -->

        <p>{{ useStore.usuarioData?.Email}}</p>

        <Add-form></Add-form>

        <!-- <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese URL" v-model="Url">
            <button type="submit">Ingresar</button>
        </form> -->

        <p v-if="useDatabaseStore.LoadingDoc">Loading Docs ...</p>

        <a-space direction="vertical" v-if="!useDatabase.LoadingDoc" style="width: 100%">
            <a-card 
                v-for="item of useDatabase.documents" 
                :key="item.id"
                :title="item.short" 
        >
            <template #extra>
                <a-space>
                    <a-popconfirm
                        title="Seguro de eliminar este dato?"
                        ok-text="Si"
                        cancel-text="No"
                        @confirm="confirm(item.Id)"
                        @cancel="cancel">
                        <a-button 
                            type="danger"
                            :disabled="useDatabase.Loading"
                            :Loading="useDatabase.Loading"
                            >Eliminar</a-button>
                    </a-popconfirm>
                    
                    <a-button type="primary" @click="Router.push(`/Editar/${item.Id}`)">Editar</a-button>
                </a-space>
            </template>
            <p>{{ item.name }}</p>
        </a-card>

        <!-- <a-card 
            title="Url corta" 
            style="width: %100"
        >
            <template #extra>
                <a-space>
                    <a-button type="danger" @click="useDatabase.EliminarUrl(item.Id)">Eliminar</a-button>
                    <a-button type="primary" @click="Router.push(`/Editar/${item.Id}`)">Editar</a-button>
                </a-space>
            </template>
            <p>Url Extensa</p>
        </a-card> -->
        </a-space>
        

        <!-- <ul v-if="!useDatabaseStore.LoadingDoc">
            <li v-for="item of useDatabase.documents" :key="item.id">
                {{ item.Id }}
                <br> 
                {{ item.name}}
                <br>
                {{ item.short}}
                <br>
                <button @click="useDatabase.EliminarUrl(item.Id)">Eliminar</button>
                <button @click="Router.push(`/Editar/${item.Id}`)">Editar</button>
            </li>
        </ul> -->
    </div>
</template>

<script setup>
import { useUsuariosStore } from "../stores/usuarios";

import { useDatabaseStore } from "../stores/database";

import { useRouter } from "vue-router";

import { message } from "ant-design-vue";

const useStore = useUsuariosStore()

const useDatabase = useDatabaseStore()

const Router = useRouter()

useDatabase.getUrls()

const confirm =  async (id) => {
    const Error = await useDatabase.EliminarUrl(id)
    if (!Error) return message.success('Eliminacion exitosa')
    return message.error(Error)
}

const cancel = () => {
    message.error('No se elimino')
}

</script>

