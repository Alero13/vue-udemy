<template>
    <div>
        <!-- <h1>Editar Id: route.params</h1> -->
        <h1>Editar Id: {{Route.params.Id}}</h1>
        
        <!-- <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese URL" v-model="Url">
            <button type="submit" class="btn btn-primary">Editar</button>
        </form> -->

        <a-form 
            name="editForm" 
            autocomplete="off" 
            layout="vertical"
            :model="formState"
            @finish="onFinish">
    
            <a-form-item
                name="Url"
                label="Ingrese la Url"
                :rules="[{
                    required: true, 
                    whitespace: true, 
                    pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
                    message: 'Ingrese una URL valida'
                }]">
                <a-input v-model:value="formState.Url">Ingrese la url</a-input>
            </a-form-item>
            <a-form-item>
                <a-button 
                    type="primary" 
                    html-type="submit" 
                    :disabled="databaseStore.Loading"
                    :Loading="databaseStore.Loading"
                    >Editar Url
                </a-button>
            </a-form-item>
    </a-form>

    </div>
</template>

<script setup>

import { onMounted, ref, reactive } from "vue";
import { useRoute } from "vue-router";

import { useDatabaseStore } from "../stores/database";

import { message } from 'ant-design-vue';

    const databaseStore = useDatabaseStore()

    const Route = useRoute()
    //console.log(Route.params.Id)

    const formState = reactive({
        Url: ''
    })

    /* const handleSubmit = () => {
        console.log('Editar')
        databaseStore.ActualizarUrl(Route.params.Id, Url.value)
    } */

    const onFinish = async (value) => {
        //console.log('Todo correcto' + value)
        /* const Error = await useDatabase.AddUrls(formState.Url) */
        const Error = await databaseStore.ActualizarUrl(Route.params.Id, formState.Url)
        if (!Error) {
            formState.Url = ''
            return message.success('Url editada')
        }
        switch (Error) { 
            default:
                message.error('Error en el servidor intente nuevamente');
                break;
        }
    }

    /* const Url = ref() */

    onMounted( async () => {
        /* Url.value = await databaseStore.LeerUrl(Route.params.Id) */
        formState.Url = await databaseStore.LeerUrl(Route.params.Id)
    }) 
    

</script>

