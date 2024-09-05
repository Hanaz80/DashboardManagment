<template>
    <div class="container-fluid">
       
     <hello-world  class="col-md-10 ms-auto" />
        <appSidebar  class="col-md-2 "/>
         <slot/>
     </div>
 </template>
 <script setup>
 import appSidebar from './app-sidebar.vue';
 import HelloWorld from './HelloWorld.vue';
 </script>