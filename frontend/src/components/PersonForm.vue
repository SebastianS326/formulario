<script setup>
import { ref } from 'vue';
import axios from 'axios';

const nombre = ref('');
const apellido = ref('');
const email = ref('');
const telefono = ref('');

const submitForm = () => {
  const persona = {
    nombre: nombre.value,
    apellido: apellido.value,
    email: email.value,
    telefono: telefono.value
  };
  axios.post('http://localhost:3306/add', persona)
    .then(response => {
      alert('Persona agregada');
      nombre.value = '';
      apellido.value = '';
      email.value = '';
      telefono.value = '';
    })
    .catch(error => {
      console.error(error);
    });
};
</script>

<template>

  <body>

    <form @submit.prevent="submitForm">

      <div class="login">

        <div class="login-screen">

          <div class="app-title">
            <h1> Agregar Persona </h1>
          </div>

          <div class="login-form">

            <div class="control-group">
              <input type="text" v-model="nombre" required class="login-field"  placeholder="Nombre"
                id="login-name">
              <label class="login-field-icon fui-user" for="login-name"></label>
            </div>
           
            <div class="control-group">
              <input type="text" v-model="apellido" required class="login-field"  placeholder="Apellido"
                id="login-name">
              <label class="login-field-icon fui-user" for="login-name"></label>
            </div>

            <div class="control-group">
              <input type="email" v-model="email" required class="login-field"  placeholder="eMail"
                id="login-name">
              <label class="login-field-icon fui-user" for="login-name"></label>
            </div>

            <div class="control-group">
              <input type="tel" v-model="telefono" required class="login-field"  placeholder="Telefono"
                id="login-name">
              <label class="login-field-icon fui-user" for="login-name"></label>
            </div>

            <button type="submit" class="btn btn-primary btn-large btn-block">Enviar</button>

          </div>

        </div>

      </div>

    </form>

  </body>

</template>


<style scoped>

</style>
