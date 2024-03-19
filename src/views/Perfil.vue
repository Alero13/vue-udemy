<template>

  <h1 class="text-center">Perfil de Usuario</h1>

  <!-- <p>{{ userStore.usuarioData }}</p> -->

  <div class="text-center mb-5">
     <a-avatar :src="userStore.usuarioData.PhotoUrl" :size="150"></a-avatar>
  </div>
 
  <a-row>
        <!-- <a-col span="12" :offset="6"> -->
        <a-col :xs="{ span: 24}" :sm="{ span: 12, offset: 6}">

            <a-form 
                 
                name="basicPerfil" 
                autocomplete="off" 
                layout="vertical"
                :model="userStore.usuarioData"
                @finish="onFinish"
                >

                <a-form-item 
                    label="Tù Email (No Modificable)" 
                    name="Email"
                    :rules="[{required: true, whitespace: true, type: 'email', message: 'Su email es obligatorio'}]"
                    >
                    <a-input disabled v-model:value="userStore.usuarioData.Email"></a-input>
                </a-form-item>

                <a-form-item 
                    label="Ingrese su NickName" 
                    name="DisplayName"
                    :rules="[{required: true, whitespace: true, message: 'Su NickName es obligatorio'}]"
                    >
                    <a-input v-model:value="userStore.usuarioData.DisplayName"></a-input>
                </a-form-item>

                <a-upload
                  v-model:file-list="fileList"
                  list-type="picture" 
                 :before-upload="beforeUpload"      
                 :max-count="1"
                 class="mb-5">
                  <a-button>Subir foto de Perfil</a-button>

                </a-upload>

                <a-form-item class="mt-5">
                    <a-button 
                        type="primary" 
                        html-type="submit" 
                        :disabled="userStore.loadingUser"
                        :loading="userStore.loadingUser">Actualizar Perfil
                    </a-button>
                </a-form-item>

            </a-form>

        </a-col>
  </a-row>

</template>

<script setup>

import { message } from "ant-design-vue";
import { ref } from "vue";
import { useUsuariosStore } from "../stores/usuarios";
const userStore = useUsuariosStore()

const fileList = ref([])

/* const handleRemove = file => {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
}; */


const beforeUpload = (file) => {

  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('Solamente archivos JPG son permitidos!');
    /* handleRemove() */
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  //return isJpgOrPng && isLt2M;

  fileList.value = [...fileList.value, file];
    return false;

}

const onFinish = async (value) => {
  /* console.log(fileList.value[0]) */

  const Error = await userStore.ActualizarPerfil(userStore.usuarioData.DisplayName)

  if (fileList.value[0]) {
    const Error = await userStore.ActualizarImagen(fileList.value[0])
    if (Error) {
      return message.success(' Problema con tu foro de Perfil ')
    }
    message.success(' Foto de perfil actualizada correctamente')
  }

  /* fileList.value.forEach(file => {
        console.log(file)
  }); */

  /* console.log(fileList.value[0]) */

  if (!Error) {
    return message.success(' Perfil de usuario actualizado correctamente')
  }
  message.error('Ocurrio un error actualizando tu perfil de usuario')
}
</script>

<style>
  .mb-5{
    margin-bottom: 2rem;
  }
  .mt-5 {
    margin-top: 2rem;
  }
</style>

