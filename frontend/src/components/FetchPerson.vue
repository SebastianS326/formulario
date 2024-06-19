<script setup>
import { ref } from 'vue';
import axios from 'axios';

const id = ref('');
const persona = ref(null);

const fetchPerson = () => {
  axios.get(`http://localhost:3000/person/${id.value}`)
    .then(response => {
      persona.value = response.data;
    })
    .catch(error => {
      alert('!!!Persona NO ENCONTRADA!!!');
      id.value = '';
      persona.value = null;
    });
};
</script>

<template>

  <body>

    <form @submit.prevent="fetchPerson">

      <div class="login">

        <div class="login-screen">

          <div class="app-title">
            <h1> Consultar ID </h1>
          </div>

          <div class="login-form">

            <div class="control-group">
              <input type="text" v-model="id" required class="login-field" value="" placeholder="ID" id="login-name">
              <label class="login-field-icon fui-user" for="login-name"></label>
            </div>

            <button type="submit" class="btn btn-primary btn-large btn-block">Buscar</button>

          </div>

        </div>

      </div>

    </form>

    <div v-if="persona" class="mov-screen">
        <h2>Información de la Persona</h2>
        <p><strong>Nombre:</strong> {{ persona.nombre }}</p>
        <p><strong>Apellido:</strong> {{ persona.apellido }}</p>
        <p><strong>Email:</strong> {{ persona.email }}</p>
        <p><strong>Teléfono:</strong> {{ persona.telefono }}</p>
      </div>

  </body>

</template>

<style scoped>
  .mov-screen {
    text-align: center;
    background-color: #FFF;
    padding: 20px;
    border-radius: 5px;
  }
</style>