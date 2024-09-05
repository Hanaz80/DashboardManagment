<template>
  <div class="px-5 col-md-10 ms-auto">
    <div class="row">
      <!-- Static tasks -->
      <div class="col-sm-4 mt-4">
        <h6>شروع تسک</h6>
        <div v-for="(project, index) in staticProjects" :key="'static-' + index" class="card mb-3 mt-4 card-custom" style="background: rgb(158 217 227 / 55%); ">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title" style="color: white;"><i class="bi bi-person-rolodex me-1"></i> {{ index + 1 }}. {{ project.name }}</h5>
            <p class="card-text" style="color: #bebdd2;">{{ project.description }}</p>
            <div class="card-actions mt-auto">
              <button class="btn btn-sm " style="color: white; background-color: #a0dee9;" id="edit" @click="openEditModal(index, 'static')">ویرایش</button>
              <button class="btn btn-sm  ms-2" style="color: white; background-color: rgb(176 211 218);" id="complete" @click="completeTask(index)">تکمیل تسک</button>
              <button class="btn btn-sm  ms-2" style="color: white; background-color: rgb(114 193 208);" id="del" @click="openDeleteModal(index, 'static')">حذف</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Completed tasks -->
      <div class="col-sm-4 mt-4">
        <h6>تسک های انجام شده</h6>
        <div v-for="(project, index) in completedProjects" :key="'completed-' + index" class="card mb-3 mt-4 card-custom" style="background: rgb(158 217 227 / 55%); ">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title" style="color: white;"><i class="bi bi-database-fill"></i> {{ index + 1 }}. {{ project.name }}</h5>
            <p class="card-text" style="color: #bebdd2;">{{ project.description }}</p>
            <div class="card-actions mt-auto">
              <button class="btn btn-sm "  style="color: white; background-color: #a0dee9;" id="edit" @click="openEditModal(index, 'completed')">ویرایش</button>
              <button class="btn btn-sm  ms-2" id="del"  style="color: white; background-color: rgb(114 193 208);" @click="openDeleteModal(index, 'completed')">حذف</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Daily User Reports -->
      <div class="col-sm-4 mt-4">
        <h6>گزارش روزانه کاربر</h6>
        <div v-for="(report, index) in userDailyReports" :key="'report-' + index" class="card mb-3 mt-4 card-custom" style="background: #ffcccb; ">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title" style="color: rgb(247, 247, 247);#d2691e;">{{ report.title }}</h5>
            <p class="card-text" style="color: rgb(192, 144, 144);">{{ report.description }}</p>
            <div class="card-actions mt-auto">
              <button class="btn btn-sm" style="background: rgb(236 186 185);  color: white;" @click="openReportModal(index)">مشاهده</button>
              <button class="btn btn-sm ms-2" style="background: rgb(220 207 206); color: white;" @click="openEditModal(index, 'report')">ویرایش</button>
              <button class="btn btn-sm ms-2" style="background: rgb(196 142 141); color: white;" @click="openDeleteModal(index, 'report')">حذف</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <!-- Add New task -->
      <div class="col-sm-3 mt-4">
        <h6>اضافه کردن تسک جدید</h6>
        <div class="card mb-3 mt-4 card-custom" style="background: rgba(31, 221, 254, 0.2901960784); ">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title" style="color: #5c3882;">اضافه کردن تسک جدید</h5>
            <input v-model="newProjectName" type="text" class="form-control" placeholder="نام تسک ">
            <textarea v-model="newProjectDescription" class="form-control mt-2" placeholder="توضیحات تسک "></textarea>
            <button class="btn mt-2" style="background-color: #85dae9; color: white;" @click="addProject">افزودن پروژه</button>
          </div>
        </div>
      </div>

      <!-- Add New Report -->
      <div class="col-sm-3 mt-4">
        <h6>اضافه کردن گزارش جدید</h6>
        <div class="card mb-3 mt-4 card-custom" style="background: rgb(254 125 164 / 50%);">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title" style="color: #fff;">اضافه کردن گزارش جدید</h5>
            <input v-model="newReportTitle" type="text" class="form-control" placeholder="عنوان گزارش ">
            <textarea v-model="newReportDescription" class="form-control mt-2" placeholder="توضیحات گزارش "></textarea>
            <button class="btn mt-2" style="background-color: #fe7da4; color: white;" @click="addReport">افزودن گزارش</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="modal fade show" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true" style="display: block; padding-right: 15px;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">ویرایش</h5>
            <button type="button" class="btn-close" @click="closeEditModal"></button>
          </div>
          <div class="modal-body">
            <input v-model="editProjectName" type="text" class="form-control" placeholder="نام">
            <textarea v-model="editProjectDescription" class="form-control mt-2" placeholder="توضیحات"></textarea>
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
            آیا مطمئن هستید که می‌خواهید این آیتم را حذف کنید؟
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDeleteModal">لغو</button>
            <button type="button" class="btn btn-danger" @click="confirmDelete">حذف</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Report Modal -->
    <div v-if="showReportModal" class="modal fade show" tabindex="-1" aria-labelledby="reportModalLabel" aria-hidden="true" style="display: block; padding-right: 15px;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="reportModalLabel">{{ currentReport.title }}</h5>
            <button type="button" class="btn-close" @click="closeReportModal"></button>
          </div>
          <div class="modal-body">
            <p>{{ currentReport.description }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeReportModal">بستن</button>
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
  { name: 'انجام تکالیف و پروژه‌ها', description: 'انجام تکالیف و پروژه‌های محوله به موقع و با کیفیت بالا برای یادگیری و بهبود نمرات' },
  { name: 'خواندن کتاب‌', description: 'مطالعه کتاب‌ها و مقالات مرتبط با دروس برای کسب دانش عمیق‌تر و گسترده‌تر '},
  { name: 'bootstrap', description: 'یاد گیری فریم ورک بوت استرپ' }
]);
const completedProjects = ref([
  { name: 'خواب کافی و استراحت', description: 'داشتن خواب کافی و استراحت منظم برای بهبود عملکرد ذهنی و جسمی' },
  { name: 'javascript', description: 'مرور جاوااسکریپت' }
]);

// User Daily Reports Data
const userDailyReports = ref([
  { title: 'گزارش روزانه 1', description: ' انجام دادن تسک یک' },
  { title: 'گزارش روزانه 2', description: 'انجام دادن تسک یک و دو' }
]);

// New Project Data
const newProjectName = ref('');
const newProjectDescription = ref('');

// New Report Data
const newReportTitle = ref('');
const newReportDescription = ref('');

// Edit Modal Data
const showEditModal = ref(false);
const editProjectName = ref('');
const editProjectDescription = ref('');
let currentEditIndex = null;
let currentEditType = '';

// Delete Modal Data
const showDeleteModal = ref(false);
let currentDeleteIndex = null;
let currentDeleteType = '';

// Report Modal Data
const showReportModal = ref(false);
const currentReport = ref({ title: '', description: '' });

const addProject = () => {
  if (newProjectName.value && newProjectDescription.value) {
    staticProjects.value.push({ name: newProjectName.value, description: newProjectDescription.value });
    newProjectName.value = '';
    newProjectDescription.value = '';
  }
};

const addReport = () => {
  if (newReportTitle.value && newReportDescription.value) {
    userDailyReports.value.push({ title: newReportTitle.value, description: newReportDescription.value });
    newReportTitle.value = '';
    newReportDescription.value = '';
  }
};

const openEditModal = (index, type) => {
  if (type === 'static') {
    editProjectName.value = staticProjects.value[index].name;
    editProjectDescription.value = staticProjects.value[index].description;
  } else if (type === 'completed') {
    editProjectName.value = completedProjects.value[index].name;
    editProjectDescription.value = completedProjects.value[index].description;
  } else if (type === 'report') {
    editProjectName.value = userDailyReports.value[index].title;
    editProjectDescription.value = userDailyReports.value[index].description;
  }
  currentEditIndex = index;
  currentEditType = type;
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
};

const saveEdit = () => {
  if (currentEditType === 'static') {
    staticProjects.value[currentEditIndex].name = editProjectName.value;
    staticProjects.value[currentEditIndex].description = editProjectDescription.value;
  } else if (currentEditType === 'completed') {
    completedProjects.value[currentEditIndex].name = editProjectName.value;
    completedProjects.value[currentEditIndex].description = editProjectDescription.value;
  } else if (currentEditType === 'report') {
    userDailyReports.value[currentEditIndex].title = editProjectName.value;
    userDailyReports.value[currentEditIndex].description = editProjectDescription.value;
  }
  showEditModal.value = false;
};

const openDeleteModal = (index, type) => {
  currentDeleteIndex = index;
  currentDeleteType = type;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
};

const confirmDelete = () => {
  if (currentDeleteType === 'static') {
    staticProjects.value.splice(currentDeleteIndex, 1);
  } else if (currentDeleteType === 'completed') {
    completedProjects.value.splice(currentDeleteIndex, 1);
  } else if (currentDeleteType === 'report') {
    userDailyReports.value.splice(currentDeleteIndex, 1);
  }
  showDeleteModal.value = false;
};

const openReportModal = (index) => {
  currentReport.value = userDailyReports.value[index];
  showReportModal.value = true;
};

const closeReportModal = () => {
  showReportModal.value = false;
};

const completeTask = (index) => {
  const completedTask = staticProjects.value.splice(index, 1)[0];
  completedProjects.value.push(completedTask);
};
</script>

