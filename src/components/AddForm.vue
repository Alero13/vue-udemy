<script setup>
import { reactive } from "vue";

import { useDatabaseStore } from "../stores/database";

import { message } from "ant-design-vue";

const useDatabase = useDatabaseStore()

const formState = reactive({
    Url: ''
})

const onFinish = async (value) => {
    console.log('Todo correcto' + value)
    const Error = await useDatabase.AddUrls(formState.Url)
    if (!Error) {
        formState.Url = ''
        return message.success('Url agregada')
    }
    switch (Error) { 
          default:
              message.error('Error en el servidor intente nuevamente');
              break;
      }
}
</script>

<template>
    <a-form 
        name="addForm" 
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
                :disabled="useDatabase.Loading"
                :Loading="useDatabase.Loading"
                >Agregar Url
            </a-button>
        </a-form-item>
    </a-form>
</template>



