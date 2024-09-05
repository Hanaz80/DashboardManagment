<template>
    <div id="sidenav  " class="sidebar bg-light " >
      <div class="container-fluid text-center  ">
        <ul class="navbar-nav" id="side">
            <li class="nav-item ">
              <div class="d-flex ">
               
                <button v-on:click="dashboard()" class="btn  shadow-none" >
                  <i class="bi bi-columns-gap mt-2"></i>
                داشبورد
              </button>
              </div>
            </li>
          </ul>
          <ul class="navbar-nav" id="side">
            <li class="nav-item ">
              <div class="d-flex ">
               
                <button v-on:click="proje()" class="btn shadow-none" style="margin-left: -20px;" >
                  <i class="bi bi-folder2"></i>
                پروژه
              </button>
              </div>
            </li>
          </ul>
          <ul class="navbar-nav" id="side">
            <li class="nav-item ">
              <div class="d-flex ">
               
                <button v-on:click="task()" class="btn shadow-none" style="margin-left: -8px;" >
                  <i class="bi bi-journal-bookmark"></i>
                تکالیف
              </button>
              </div>
            </li>
          </ul>
          <ul class="navbar-nav" id="side">
            <li class="nav-item ">
              <div class="d-flex ">
               
                <button v-on:click="users()" class="btn  shadow-none" >
                  <i class="bi bi-person-circle me-2"></i>
                کاربران
              </button>
              </div>
            </li>
          </ul>
          <ul class="navbar-nav" id="side">
            <li class="nav-item ">
              <div class="d-flex ">
               
                <button v-on:click="setting()" class="btn shadow-none" >
                  <i class="bi bi-gear-wide-connected mt-2"></i>
                تنظیمات 
              </button>
              </div>
            </li>
          </ul>
          <ul class="navbar-nav" id="side">
            <li class="nav-item ">
              <div class="d-flex ">
               
                <button v-on:click="logout()" class="btn shadow-none"  style="margin-left: -24px;">
                  <i class="bi bi-box-arrow-left mt-2"></i>
                خروج
              </button>
              </div>
            </li>
          </ul>
      </div>
      
    </div>
  </template>
  <script setup>
  import { useRouter } from 'vue-router';
   const router = useRouter()
   function logout(){
  return router.push('/')
   }
   function proje(){
    return router.push('/proje')
   }
   function task(){
    return router.push('/task')
   }
   function dashboard(){
    return router.push('/dashboard')
   }
   function setting(){
    return router.push('/setting')
   }
   function users(){
    return router.push('/users')
   }
   

</script>