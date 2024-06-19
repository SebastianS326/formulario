<script setup>
  import PersonForm from './PersonForm.vue';
  import FetchPerson from './FetchPerson.vue';
</script>

<template>
    <div>
      <h1>Administrador</h1>
      <header>
        <PersonForm />
        
      </header>

      <body>
        <FetchPerson />
      </body>
      
      
    </div>
  </template>

  <style scoped>
    h1 {
      text-align: center;
      color: #777;
    }
  </style>
  

  