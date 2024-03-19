<template>
    <h1 class="text-center">Login</h1>
    <a-row>
        <!-- <a-col span="12" :offset="6"> -->
        <a-col :xs="{ span: 24}" :sm="{ span: 12, offset: 6}">

            <a-form 
                 
                name="basicLogin" 
                autocomplete="off" 
                layout="vertical"
                :model="formState"
                @finish="onFinish"
                @finishFailed="onFinishFailed">

                <a-form-item 
                    label="email" 
                    name="Email"
                    :rules="[{required: true, whitespace: true, type: 'email', message: 'Su email es obligatorio'}]"
                    >
                    <a-input v-model:value="formState.Email"></a-input>
                </a-form-item>

                <a-form-item 
                    label="password"
                    name="Password"
                    :rules="[{required: true, whitespace: true, min: 6, message: 'Su paswword por favor minimo 6 caracteres'}]"
                    >
                    <a-input-password v-model:value="formState.Password"></a-input-password>
                </a-form-item>

                <a-form-item>
                    <a-button 
                        type="primary" 
                        html-type="submit" 
                        :disabled="useStore.loadingUser"
                        :loading="useStore.loadingUser">Ingresar
                    </a-button>
                </a-form-item>

            </a-form>

        </a-col>
  </a-row>
   
</template>

<script setup>

import { reactive } from "vue"
import { useUsuariosStore } from "../stores/usuarios";

import { message } from 'ant-design-vue';
/* import 'ant-design-vue/es/message/style/css'; */ 


const useStore = useUsuariosStore()

const formState = reactive( {
    Email: '',
    Password: '' 
})

/* const handleSubmit = async () => {
       
} */
const onFinish = async (values) => {
      //console.log('Success:', values);
      /* await useStore.LoguearUsuarios(formState.Email, formState.Password) */
      const Error = await useStore.LoguearUsuarios(formState.Email, formState.Password)

      if (!Error) {
          return message.success('Bienvenido a esta App')
      }
      switch (Error) {

          case "auth/user-not-found":
              /* alert("No existe esa cuenta") */

               message.error('Este email no esta registrado');
              break;
          case "auth/wrong-password":
              /* alert("Password incorrecto") */

              message.error('Passwor no valido');
              break;
      
          default:
              /* alert ("Fallo algo en Firebase intentelo nuevamente") */

              message.error('Error en el servidor intente nuevamente');
              break;
      }
    };

const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
</script>

