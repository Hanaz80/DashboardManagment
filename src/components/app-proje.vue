<template>
  <div class="px-5 col-md-10 ms-auto">
    <div class="row">
      <!-- Static Projects -->
      <div class="col-sm-4 mt-4" >
        <h6>برای شروع پروژه</h6>
        <div v-for="(project, index) in staticProjects" :key="'static-' + index" class="card mb-3 mt-4" style="background: #846697;">
          <div class="card-body d-flex flex-column justify-content-between" id="card-h">
            <div>
              <h5 id="pnumber">پروژه {{ project.projectNumber }}</h5>
              <h5 class="card-title" style="color: white;">
                <i class="bi bi-person-rolodex me-1"></i> {{ project.name }} 
              </h5>
              <p class="card-text" style="color: #bebdd2;">{{ project.description }}</p>
            </div>
            <div>
              <button class="btn btn-sm" id="edit" @click="openEditModal(index, 'static')">ویرایش</button>
              <button class="btn btn-sm ms-2" id="del" @click="openDeleteModal(index, 'static')">حذف</button>
              <button class="btn btn-sm ms-2" id="start" @click="startProject(index)">شروع</button>
            </div>
          </div>
        </div>
      </div>

      <!-- In Progress Projects -->
      <div class="col-sm-4 mt-4">
        <h6>پروژه های در حال انجام</h6>
        <div v-for="(project, index) in inProgressProjects" :key="'in-progress-' + index" class="card mb-3 mt-4" style="background: #eda2b8;">
          <div class="card-body d-flex flex-column justify-content-between" id="card-h">
            <div>
              <h5 id="pnumber">پروژه  {{ project.projectNumber }}</h5>
              <h5 class="card-title" style="color: white;">
                <i class="bi bi-bookmarks-fill me-1"></i> {{ project.name }} 
              </h5>
              <p class="card-text" style="color: #af808e;">{{ project.description }}</p>
            </div>
            <div>
              <button class="btn btn-sm" id="edit" @click="openEditModal(index, 'inProgress')">ویرایش</button>
              <button class="btn btn-sm ms-2" id="del" @click="openDeleteModal(index, 'inProgress')">حذف</button>
              <button class="btn btn-sm ms-2" id="complete" @click="completeProject(index)">تکمیل</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Completed Projects -->
      <div class="col-sm-4 mt-4">
        <h6>پروژه های تکمیل شده</h6>
        <div v-for="(project, index) in completedProjects" :key="'completed-' + index" class="card mb-3 mt-4" style="background: #846697;">
          <div class="card-body d-flex flex-column justify-content-between" id="card-h">
            <div>
              <h5 id="pnumber">پروژه {{ project.projectNumber }}</h5>
              <h5 class="card-title" style="color: white;">
                <i class="bi bi-database-fill"></i> {{ project.name }} 
              </h5>
              <p class="card-text" style="color: #bebdd2;">{{ project.description }}</p>
            </div>
            <div>
              <button class="btn btn-sm" id="edit" @click="openEditModal(index, 'completed')">ویرایش</button>
              <button class="btn btn-sm ms-2" id="del" @click="openDeleteModal(index, 'completed')">حذف</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Add New Project -->
      <div class="col-sm-4 mt-4">
        <h6>اضافه کردن پروژه جدید</h6>
        <div class="card mb-3 mt-4" style="background: #846697;">
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 class="card-title" style="color: #5c3882;">اضافه کردن پروژه جدید</h5>
              <input v-model="newProjectName" type="text" class="form-control" placeholder="نام پروژه جدید">
              <textarea v-model="newProjectDescription" class="form-control mt-2" placeholder="توضیحات پروژه جدید"></textarea>
            </div>
            <div>
              <button class="btn mt-2" style="background-color: #5c3882; color: white;" @click="addProject">افزودن پروژه</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="modal fade show" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true" style="display: block; padding-right: 15px;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">ویرایش پروژه</h5>
            <button type="button" class="btn-close" @click="closeEditModal"></button>
          </div>
          <div class="modal-body">
            <input v-model="editProjectName" type="text" class="form-control" placeholder="نام پروژه">
            <textarea v-model="editProjectDescription" class="form-control mt-2" placeholder="توضیحات پروژه"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeEditModal">بستن</button>
            <button type="button" class="btn btn-primary" @click="saveEdit">ذخیره تغییرات</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <div v-if="showDeleteModal" class="modal fade show" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" style="display: block; padding-right: 15px;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">تأیید حذف</h5>
            <button type="button" class="btn-close" @click="closeDeleteModal"></button>
          </div>
          <div class="modal-body">
            آیا مطمئن هستید که می‌خواهید این پروژه را حذف کنید؟
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDeleteModal">لغو</button>
            <button type="button" class="btn btn-danger" @click="confirmDelete">حذف</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Projects Data
const staticProjects = ref([
  { name: 'Simple Contact Book', description: 'یک برنامه ساده برای ذخیره و مدیریت مخاطبان', projectNumber: 1 },
  { name: 'Calculator', description: 'یک برنامه که به کاربران اجازه می‌دهد واحدهای مختلف را به یکدیگر تبدیل کنند', projectNumber: 2 }
]);
const inProgressProjects = ref([
  { name: 'نرم‌افزار مدیریت یادداشت‌ها', description: 'یک برنامه ساده برای نوشتن و مدیریت یادداشت‌ها', projectNumber: 3 },
  { name: 'شبیه‌سازی پروتکل‌های مسیریابی', description: 'پیاده‌سازی ساده پروتکل‌های مسیریابی', projectNumber: 4 }
]);
const completedProjects = ref([
  { name: 'مدیریت پایگاه داده ساده', description: 'ایجاد یک پایگاه داده ساده برای مدیریت اطلاعات', projectNumber: 5 },
  { name: 'مدیریت وظایف', description: 'ایجاد یک اپلیکیشن ساده برای مدیریت وظایف', projectNumber: 6 }
]);

// Modal States
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const editIndex = ref(null);
const deleteIndex = ref(null);
const editProjectType = ref(null);
const editProjectName = ref('');
const editProjectDescription = ref('');
const newProjectName = ref('');
const newProjectDescription = ref('');

// Open Edit Modal
const openEditModal = (index, type) => {
  editProjectType.value = type;
  let projectList;
  if (type === 'static') {
    projectList = staticProjects.value;
  } else if (type === 'inProgress') {
    projectList = inProgressProjects.value;
  } else if (type === 'completed') {
    projectList = completedProjects.value;
  }

  if (projectList) {
    const project = projectList[index];
    if (project) {
      editIndex.value = index;
      editProjectName.value = project.name;
      editProjectDescription.value = project.description;
      showEditModal.value = true;
    }
  }
};

// Save Edit
const saveEdit = () => {
  if (editIndex.value !== null && editProjectType.value) {
    let projectList;
    if (editProjectType.value === 'static') {
      projectList = staticProjects.value;
    } else if (editProjectType.value === 'inProgress') {
      projectList = inProgressProjects.value;
    } else if (editProjectType.value === 'completed') {
      projectList = completedProjects.value;
    }

    if (projectList) {
      projectList[editIndex.value] = {
        name: editProjectName.value,
        description: editProjectDescription.value,
        projectNumber: projectList[editIndex.value].projectNumber // Retain the project number
      };
      editIndex.value = null;
      editProjectName.value = '';
      editProjectDescription.value = '';
      showEditModal.value = false;
    }
  }
};

// Close Edit Modal
const closeEditModal = () => {
  showEditModal.value = false;
};

// Open Delete Modal
const openDeleteModal = (index, type) => {
  deleteIndex.value = index;
  editProjectType.value = type;
  showDeleteModal.value = true;
};

// Confirm Delete
const confirmDelete = () => {
  if (deleteIndex.value !== null && editProjectType.value) {
    let projectList;
    if (editProjectType.value === 'static') {
      projectList = staticProjects.value;
    } else if (editProjectType.value === 'inProgress') {
      projectList = inProgressProjects.value;
    } else if (editProjectType.value === 'completed') {
      projectList = completedProjects.value;
    }

    if (projectList) {
      projectList.splice(deleteIndex.value, 1);
      deleteIndex.value = null;
      showDeleteModal.value = false;
    }
  }
};

// Close Delete Modal
const closeDeleteModal = () => {
  showDeleteModal.value = false;
};

// Add New Project
const addProject = () => {
  if (newProjectName.value.trim() && newProjectDescription.value.trim()) {
    const newProjectNumber = staticProjects.value.length + inProgressProjects.value.length + completedProjects.value.length + 1;
    staticProjects.value.push({
      name: newProjectName.value,
      description: newProjectDescription.value,
      projectNumber: newProjectNumber
    });
    newProjectName.value = '';
    newProjectDescription.value = '';
  }
};

// Start Project
const startProject = (index) => {
  const project = staticProjects.value[index];
  
  if (project) {
    // Remove from staticProjects
    staticProjects.value.splice(index, 1);

    // Add to inProgressProjects
    inProgressProjects.value.push(project);
  }
};

// Complete Project
const completeProject = (index) => {
  const project = inProgressProjects.value[index];
  
  if (project) {
    // Remove from inProgressProjects
    inProgressProjects.value.splice(index, 1);

    // Add to completedProjects
    completedProjects.value.push(project);
  }
};
</script>

