<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const limpiarLoIng = () => {
  username.value = '';
  password.value = '';
}

const login = () => {
  axios.post('http://localhost:3000/login', { username: username.value, password: password.value })
    .then(response => {
      localStorage.setItem('token', response.data.token);
      const role = JSON.parse(atob(response.data.token.split('.')[1])).role;
      if (role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/operario');
      }
    })
    .catch(error => {
      console.error(error);
      alert('Usuario o Contraseña incorrecta');
      limpiarLoIng()
    });
};
</script>

<template>
  <body>

    <form @submit.prevent="login">
      <div class="login">
		<div class="login-screen">
			<div class="app-title">
				<h1>Login</h1>
			</div>

			<div class="login-form">
				<div class="control-group">
				<input type="text" v-model="username" required class="login-field" value="" placeholder="Usuario" id="login-name">
				<label class="login-field-icon fui-user" for="login-name"></label>
				</div>

				<div class="control-group">
				<input type="password" v-model="password" required class="login-field" value="" placeholder="Contraseña" id="login-pass">
				<label class="login-field-icon fui-lock" for="login-pass"></label>
				</div>

				<button type="submit" class="btn btn-primary btn-large btn-block">Login</button>
			</div>
		</div>
	</div>

    </form>
	
</body>
</template>

<style scoped>

</style>