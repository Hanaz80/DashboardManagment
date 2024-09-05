<template>
    <div class="card6 mt-4 mb-3 px-5 col-md-10 ms-auto">
      <input type="text" v-model="searchQuery" placeholder="جستجوی کاربران..." class="form-control mb-3" />
      
      <div class="filter-options mb-3">
        <select v-model="selectedProject" class="form-select">
          <option value="">همه پروژه‌ها</option>
          <option v-for="project in projects" :key="project" :value="project">{{ project }}</option>
        </select>
      </div>
  
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">نام</th>
            <th scope="col">پروژه</th>
            <th scope="col">ساعت پروژه</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in filteredUsers" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>
              <img id="image-table" :src="user.image" alt="" />
              {{ user.name }}
            </td>
            <td>
              <div v-for="project in user.projects" :key="project.projectName">
                <a href="#" @click.prevent="openProjectModal(project)">{{ project.projectName }}</a>
              </div>
            </td>
            <td>
              <div v-for="project in user.projects" :key="project.projectName">
                {{ project.hours }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Project Details Modal -->
      <div v-if="showProjectModal" class="modal fade show" tabindex="-1" aria-labelledby="projectModalLabel" aria-hidden="true" style="display: block; padding-right: 15px;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="projectModalLabel">جزئیات پروژه</h5>
              <button type="button" class="btn-close" @click="closeProjectModal"></button>
            </div>
            <div class="modal-body">
              <h5>{{ selectedProjectDetails.projectName }}</h5>
              <p>ساعت: {{ selectedProjectDetails.hours }}</p>
              <p>توضیحات: {{ selectedProjectDetails.description }}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeProjectModal">بستن</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const users = ref([
    { name: 'حنانه', time: '10', projects: [
        { projectName: 'Simple Contact Book', hours: '5', description: 'پروژه‌ای برای مدیریت مخاطبین ساده.' },
        { projectName: 'Calculator', hours: '4', description: 'پروژه‌ای برای ساخت یک ماشین حساب.' }
      ], image: 'https://tse2.mm.bing.net/th?id=OIP.En-cO2TKqmGphWhizlIidQHaHa&pid=Api&P=0&h=220' 
    },
    { name: 'مهیار', time: '4', projects: [
        { projectName: 'Simple Contact Book', hours: '5', description: 'پروژه‌ای برای مدیریت مخاطبین ساده.' },
        { projectName:'نرم‌افزار مدیریت یادداشت‌ها', hours: '3', description: 'نرم‌افزار برای مدیریت یادداشت‌ها.' }
      ], image: 'https://tse2.mm.bing.net/th?id=OIP.En-cO2TKqmGphWhizlIidQHaHa&pid=Api&P=0&h=220' 
    },
    { name: 'مها', time: '6', projects: [
        { projectName:'نرم‌افزار مدیریت یادداشت‌ها', hours: '3', description: 'نرم‌افزار برای مدیریت یادداشت‌ها.' },
        { projectName: 'شبیه‌سازی پروتکل‌های مسیریابی', hours: '3', description: 'پروژه‌ای برای شبیه‌سازی پروتکل‌های مسیریابی.' }
      ], image: 'https://tse2.mm.bing.net/th?id=OIP.En-cO2TKqmGphWhizlIidQHaHa&pid=Api&P=0&h=220' 
    },
    { name: 'مهسا', time: '4', projects: [
        { projectName: 'Calculator', hours: '4', description: 'پروژه‌ای برای ساخت یک ماشین حساب.' },
        { projectName:'نرم‌افزار مدیریت یادداشت‌ها', hours: '3', description: 'نرم‌افزار برای مدیریت یادداشت‌ها.' }
      ], image: 'https://tse2.mm.bing.net/th?id=OIP.En-cO2TKqmGphWhizlIidQHaHa&pid=Api&P=0&h=220' 
    },
    { name: 'هلیا', time: '4', projects: [
        { projectName: 'مدیریت پایگاه داده ساده', hours: '2', description: ' ایجاد یک پایگاه داده ساده برای مدیریت اطلاعات ' },
        { projectName: 'Calculator', hours: '4', description: 'پروژه‌ای برای ساخت یک ماشین حساب.' }
      ], image: 'https://tse2.mm.bing.net/th?id=OIP.En-cO2TKqmGphWhizlIidQHaHa&pid=Api&P=0&h=220' 
    }, { name: 'علی', time: '4', projects: [
        { projectName: 'Simple Contact Book', hours: '5', description: 'پروژه‌ای برای مدیریت مخاطبین ساده.' },
        { projectName: 'مدیریت وظایف', hours: '2', description: '  ایجاد یک اپلیکیشن ساده برای مدیریت وظایف' }
      ], image: 'https://tse2.mm.bing.net/th?id=OIP.En-cO2TKqmGphWhizlIidQHaHa&pid=Api&P=0&h=220' 
    }, { name: 'زهرا', time: '4', projects: [
        { projectName: 'Weather App',hours: '4', description: 'یک برنامه که پیش‌بینی آب و هوا را نمایش می‌دهد' },
        { projectName: 'مدیریت وظایف', hours: '2', description: '  ایجاد یک اپلیکیشن ساده برای مدیریت وظایف' }
      ], image: 'https://tse2.mm.bing.net/th?id=OIP.En-cO2TKqmGphWhizlIidQHaHa&pid=Api&P=0&h=220' 
    }, { name: 'فاطمه', time: '4', projects: [
        { projectName: 'مدیریت پایگاه داده ساده', hours: '2', description: ' ایجاد یک پایگاه داده ساده برای مدیریت اطلاعات ' },
        { projectName: 'Simple Contact Book', hours: '5', description: 'پروژه‌ای برای مدیریت مخاطبین ساده.' }
      ], image: 'https://tse2.mm.bing.net/th?id=OIP.En-cO2TKqmGphWhizlIidQHaHa&pid=Api&P=0&h=220' 
    }, { name: 'نرگس', time: '4', projects: [
       { projectName: 'Shopping Cart',hours: '4', description: 'یک پروژه که شامل ایجاد یک سبد خرید آنلاین است' },
        { projectName: 'مدیریت وظایف', hours: '2', description: '  ایجاد یک اپلیکیشن ساده برای مدیریت وظایف' }
      ], image: 'https://tse2.mm.bing.net/th?id=OIP.En-cO2TKqmGphWhizlIidQHaHa&pid=Api&P=0&h=220' 
    }, { name: 'مارال', time: '4', projects: [
        { projectName: 'Simple Contact Book', hours: '3', description: 'پروژه‌ای برای مدیریت مخاطبین ساده.' },
        { projectName: 'مدیریت وظایف', hours: '5', description: '  ایجاد یک اپلیکیشن ساده برای مدیریت وظایف' }
      ], image: 'https://tse2.mm.bing.net/th?id=OIP.En-cO2TKqmGphWhizlIidQHaHa&pid=Api&P=0&h=220' 
    },
  ]);
  
  const searchQuery = ref('');
  const selectedProject = ref('');
  const showProjectModal = ref(false);
  const selectedProjectDetails = ref({ projectName: '', hours: '', description: '' });
  
  const projects = computed(() => Array.from(new Set(users.value.flatMap(user => user.projects.map(p => p.projectName)))));
  
  const filteredUsers = computed(() => {
    let result = users.value;
    if (searchQuery.value) {
      result = result.filter(user =>
        user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }
    if (selectedProject.value) {
      result = result.filter(user =>
        user.projects.some(project => project.projectName === selectedProject.value)
      );
    }
    return result;
  });
  
  const openProjectModal = (project) => {
    selectedProjectDetails.value = project;
    showProjectModal.value = true;
  };
  
  const closeProjectModal = () => {
    showProjectModal.value = false;
  };
  </script>
  
  <style scoped>
  .card6 {
      margin-top: 20px;
      padding: 20px;
      border-radius: 15px;
      background-color: #ffe0e6;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .form-control {
      margin-bottom: 20px;
  }
  
  .filter-options {
      display: flex;
      justify-content: space-between;
  }
  
  table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
  }
  
  th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
  }
  
  th {
      background-color: #f8f9fa;
      color: #333;
  }
  
  td {
      background-color: #fff;
     color: #e56b83;
  }
  
  #image-table {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
      object-fit: cover;
      display: inline-block;
      vertical-align: middle;
  }
  
  
  tr:hover {
      background-color: #f1f1f1;
      
  }
  
  .modal.show {
      display: block;
  }
  .modal.fade .modal-dialog {
      transition: transform 0.3s ease-out;
  }
  a {
  text-decoration: none;
  color: #e56b83; /* اگر می‌خواهید رنگ لینک‌ها را نیز تنظیم کنید */
}
  </style>
  