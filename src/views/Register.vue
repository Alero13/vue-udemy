<template>
    <h1 class="text-center">Register</h1>
    <a-row>
        <a-col :xs="{ span: 24}" :sm="{ span: 12, offset: 6}">
            <a-form 
                name="basicRegister" 
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

                <a-form-item 
                    label="Repite Password"
                    name="RePassword"
                    :rules="[{validator: validatePass }]"
                    >
                    <a-input-password v-model:value="formState.RePassword"></a-input-password>
                </a-form-item>

                <a-form-item>
                    <a-button type="primary" 
                              html-type="submit" 
                              :disabled="useStore.loadingUser"
                              :loading="useStore.loadingUser">
                        Ingresar
                    </a-button>
                </a-form-item>

            </a-form>
        </a-col>
    </a-row>

</template>

<script setup>
import { message } from "ant-design-vue";
import { reactive } from "vue"

import { useUsuariosStore } from "../stores/usuarios";

const useStore = useUsuariosStore()

const formState = reactive( {
    Email: '',
    Password: '',
    RePassword: '' 
})

const validatePass = async (_rule, value) => {
    if(value === '') {
        return Promise.reject('Repita su Password')
    }
    if(value !== formState.Password) {
        return Promise.reject('No coinciden los password')
    }
    return Promise.resolve()
}

const onFinish = async (values) => {
      //console.log('Success:', values);
      /* await useStore.RegistrarUsuario(formState.Email, formState.Password) */

      const Error = await useStore.RegistrarUsuario(formState.Email, formState.Password)
      if (!Error) {
          return message.success('Revisa tu email y verificalo')
      }

      switch (Error) {

          case "auth/email-already-in-use":
               message.error('Este email ya esta registrado');
              break;
         
          default:
              message.error('Error en el servidor intente nuevamente');
              break;
      }

    };

const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
</script>