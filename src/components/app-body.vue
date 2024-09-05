<template>
  <div class="bodys px-5 col-md-10 ms-auto">
    <h3 class="welcome-message mt-1 ">{{ username }} خوش آمدی</h3>
    <div class="row mt-2">
      <div class="col-sm-4">
        <div class="card card1 container" id="cards">
          <div class="card-body">
            <div id="sqr" class="row align-items-center me-3">
              <i class="bi bi-filetype-js"></i>
            </div>
            <h5 class="card-title mt-2" style="color: white;">javascript</h5>
            <p class="card-text mt-5" style="color: #bebdd2;">خواندن قسمت هایی از جاوااسکریپت</p>
            <div class="d-flex " id="bts">
              <div class="mx-2 "><button class="btn shadow-none "><i class="bi bi-journal-check"></i></button></div>
              <div class="mx-2 btn">|</div>
              <div class="mx-2 "><button class="btn shadow-none"><i class="bi bi-list-task"></i></button></div>
              <div class="mx-2 btn">|</div>
              <div class="mx-2"><button class="btn shadow-none"><i class="bi bi-exposure"></i></button></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card card2 container" id="cards">
          <div class="card-body">
            <div id="sqr1" class="row align-items-center">
              <i class="bi bi-bootstrap"></i>
            </div>
            <h5 class="card-title mt-2" style="color: rgb(7, 7, 7);">bootstrap</h5>
            <p class="card-text mt-5" style="color: #bebdd2;">خواندن قسمت هایی از بوت استرپ</p>
            <div class="d-flex " id="bts2">
              <div class="mx-2 "><button class="btn shadow-none "><i class="bi bi-journal-check"></i></button></div>
              <div class="mx-2 btn">|</div>
              <div class="mx-2 "><button class="btn shadow-none"><i class="bi bi-list-task"></i></button></div>
              <div class="mx-2 btn">|</div>
              <div class="mx-2"><button class="btn shadow-none"><i class="bi bi-exposure"></i></button></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card card3 container" id="cards">
          <div class="card-body">
            <div id="sqr" class="row align-items-center">
              <i class="bi bi-book"></i>
            </div>
            <h5 class="card-title mt-2" style="color: white;">خواندن کتاب‌</h5>
            <p class="card-text mt-5" style="color:#bebdd2;">داشتن خواب کافی و استراحت منظم برای بهبود عملکرد ذهنی و جسمی</p>
            <div class="d-flex " id="bts">
              <div class="mx-2 "><button class="btn shadow-none "><i class="bi bi-journal-check"></i></button></div>
              <div class="mx-2 btn">|</div>
              <div class="mx-2 "><button class="btn shadow-none"><i class="bi bi-list-task"></i></button></div>
              <div class="mx-2 btn">|</div>
              <div class="mx-2"><button class="btn shadow-none"><i class="bi bi-exposure"></i></button></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="div2">
      <div class="row mt-5 ms-5">
        <div class="col-sm-5">
          <div class="card card4" id="chartCard">
            <div class="card-body">
              <Bar id="myChart" :options="chartOptions" :data="chartData" />
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="row justify-content-center">
            <div class="card calendar-card" id="calendarCard" style="padding: 0px;">
              <div class="card-header calendar-header">
                <button @click="previousMonth" class="btn btn-secondary">&lt;</button>
                {{ currentMonthName }} {{ currentYear }}
                <button @click="nextMonth" class="btn btn-secondary">&gt;</button>
              </div>
              <div class="card-body calendar-body">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th v-for="day in days" :key="day" class="text-center">{{ day }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(week, index) in calendar" :key="index">
                      <td
                        v-for="date in week"
                        :key="date.id"
                        @click="selectDate(date)"
                        :class="{ 'bg-lightpink text-white': isToday(date), 'bg-info text-white': isSelected(date) }"
                        class="text-center calendar-cell"
                      >
                        {{ date.date }}
                        <br>
                        <small>{{ date.fullDate }}</small>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="card card6 mt-4 mb-3">
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
                  {{ project.projectName }}
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
      </div>
    </div>
  </div>
  
</template>

<script setup>

import { ref, computed ,onMounted} from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const days = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
const months = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مرداد', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
];

const currentDate = ref(new Date());
const currentMonth = computed(() => currentDate.value.getMonth());
const currentYear = computed(() => currentDate.value.getFullYear());
const currentMonthName = computed(() => months[currentMonth.value]);

const getMonthLength = (year, month) => new Date(year, month + 1, 0).getDate();
const getMonthStartDay = (year, month) => new Date(year, month, 1).getDay();

const generateCalendar = () => {
  const startDay = getMonthStartDay(currentYear.value, currentMonth.value);
  const monthLength = getMonthLength(currentYear.value, currentMonth.value);
  const calendar = [];
  let date = 1;

  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < startDay) {
        week.push({ id: '', date: '' });
      } else if (date > monthLength) {
        break;
      } else {
        const fullDate = new Date(currentYear.value, currentMonth.value, date).toLocaleDateString('fa-IR');
        week.push({ id: date, date, fullDate });
        date++;
      }
    }
    calendar.push(week);
    if (date > monthLength) break;
  }

  return calendar;
};

const calendar = computed(() => generateCalendar());

const isToday = (date) => {
  const today = new Date();
  return date.id === today.getDate() && currentMonth.value === today.getMonth() && currentYear.value === today.getFullYear();
};

const isSelected = (date) => {
  const selectedDate = selected.value;
  return selectedDate && date.id === selectedDate.getDate() && currentMonth.value === selectedDate.getMonth() && currentYear.value === selectedDate.getFullYear();
};

const selected = ref(null);

const selectDate = (date) => {
  selected.value = new Date(currentYear.value, currentMonth.value, date.id);
};

const previousMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1);
};

const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1);
};

const chartData = {
  labels: [
    "دسته 1", "دسته 2", "دسته 3", "دسته 4", "دسته 5",
    "دسته 6", "دسته 7", "دسته 8", "دسته 9", "دسته 10"
  ],
  datasets: [{
    label: "فعالیت کاربران",
    data: [23, 17, 34, 29, 41, 30, 22, 35, 27, 40],
    backgroundColor: [
      "rgba(255, 99, 132, 0.2)", // صورتی روشن
      "rgba(54, 162, 235, 0.2)", // آبی روشن
      "rgba(153, 102, 255, 0.2)", // بنفش روشن
      "rgba(75, 192, 192, 0.2)", // سبز روشن
      "rgba(255, 99, 132, 0.2)", // صورتی روشن (تکرار)
      "rgba(54, 162, 235, 0.2)", // آبی روشن (تکرار)
      "rgba(153, 102, 255, 0.2)", // بنفش روشن (تکرار)
      "rgba(75, 192, 192, 0.2)", // سبز روشن (تکرار)
    ],
    borderColor: [
      "rgba(255, 99, 132, 1)", // صورتی روشن
      "rgba(54, 162, 235, 1)", // آبی روشن
      "rgba(153, 102, 255, 1)", // بنفش روشن
      "rgba(75, 192, 192, 1)", // سبز روشن
      "rgba(255, 99, 132, 1)", // صورتی روشن (تکرار)
      "rgba(54, 162, 235, 1)", // آبی روشن (تکرار)
      "rgba(153, 102, 255, 1)", // بنفش روشن (تکرار)
      "rgba(75, 192, 192, 1)"  // سبز روشن (تکرار)
    ],
    borderWidth: 1,
    borderRadius: 8 // اضافه کردن border-radius
  }]
};


const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += context.parsed.y;
          }
          return label;
        }
      }
    }
  }
};


const username = ref('');

onMounted(() => {
  const storedUsername = localStorage.getItem('username');
  if (storedUsername) {
    username.value = storedUsername;
  } else {
    // در صورت عدم وجود نام کاربری در localStorage، کاربر به صفحه ورود هدایت می‌شود
    router.push('/login');
  }
});
//کد جدول کاربران
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
        { projectName:'نرم‌افزار مدیریت یادداشت‌ها', hours: '4', description: 'نرم‌افزار برای مدیریت یادداشت‌ها.' },
        { projectName: 'شبیه‌سازی پروتکل‌های مسیریابی', hours: '3', description: 'پروژه‌ای برای شبیه‌سازی پروتکل‌های مسیریابی.' }
      ], image: 'https://tse2.mm.bing.net/th?id=OIP.En-cO2TKqmGphWhizlIidQHaHa&pid=Api&P=0&h=220' 
    },
    { name: 'مهسا', time: '4', projects: [
        { projectName: 'Calculator', hours: '2', description: 'پروژه‌ای برای ساخت یک ماشین حساب.' },
        { projectName:'نرم‌افزار مدیریت یادداشت‌ها', hours: '3', description: 'نرم‌افزار برای مدیریت یادداشت‌ها.' }
      ], image: 'https://tse2.mm.bing.net/th?id=OIP.En-cO2TKqmGphWhizlIidQHaHa&pid=Api&P=0&h=220' 
    },
]);

const searchQuery = ref('');
const selectedProject = ref('');


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
</script>

<style scoped>






.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.calendar-body {
  height: calc(250px - 56px); /* Adjusting for header height */
  overflow: auto;
}

#chartCard, #calendarCard {
  height: 320px;
}
.bg-lightpink {
  background-color: #ffcccb !important; /* رنگ صورتی روشن */
}
.btn-secondary{
  background-color: #85dae9;
  border: #85dae9;
}
.welcome-message {
  text-align: right; /* متن را به سمت راست تراز می‌کند */
  margin: 0; /* حذف حاشیه پیش‌فرض */
  padding: 10px 0; /* اضافه کردن فضای داخلی برای زیبایی بیشتر */
}
.calendar-card {
  width: 470px;
 
}

.calendar-header, .calendar-body {
  padding: 5px;
}

.calendar-body {
  height: calc(100% - 40px); /* Adjusting height considering the header height */
  overflow: hidden;
}

.table {
  width: 100%;
  height: 100%;
  table-layout: fixed;
}

.calendar-cell {
  width: 14%;
  height: 14%;
  padding: 2px;
  font-size: 10px;
  line-height: 1;
}
</style>