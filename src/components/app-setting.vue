<template>
  <div class="px-5 col-md-10 ms-auto">
    <div class="card py-5 px-3 my-4" style="background-color: rgba(158, 217, 227, 0.55);">
      <div class="row">
        <!-- بخش ویرایش پروفایل -->
        <div class="col-sm-6">
          <h5 class="mb-3">ویرایش پروفایل</h5>
          <div class="card">
            <div class="card-body">
              <div class="mb-3">
                <label for="name" class="form-label">نام</label>
                <input id="name" v-model="profile.name" type="text" class="form-control" placeholder="your name">
                <div v-if="profileErrors.name" class="text-danger">{{ profileErrors.name }}</div>
              </div>
              <div class="mb-3">
                <label for="lastName" class="form-label">نام خانوادگی</label>
                <input id="lastName" v-model="profile.lastName" type="text" class="form-control" placeholder="last name">
                <div v-if="profileErrors.lastName" class="text-danger">{{ profileErrors.lastName }}</div>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">پست الکترونیکی</label>
                <input id="email" v-model="profile.email" type="email" class="form-control" placeholder="email">
                <div v-if="profileErrors.email" class="text-danger">{{ profileErrors.email }}</div>
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">شماره تلفن</label>
                <input id="phone" v-model="profile.phone" type="text" class="form-control" placeholder="0939*******">
                <div v-if="profileErrors.phone" class="text-danger">{{ profileErrors.phone }}</div>
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">آدرس</label>
                <input id="address" v-model="profile.address" type="text" class="form-control" placeholder="نشانی شما">
                <div v-if="profileErrors.address" class="text-danger">{{ profileErrors.address }}</div>
              </div>
              <div>
                <button type="button" class="btn" id="btcolor" @click="saveProfile">ویرایش</button>
              </div>
            </div>
          </div>
        </div>

        <!-- بخش ویرایش رمزعبور -->
        <div class="col-sm-6">
          <h5 class="mb-3">ویرایش رمزعبور</h5>
          <div class="card">
            <div class="card-body">
              <div class="mb-3">
                <label for="currentPassword" class="form-label">پسورد فعلی</label>
                <input id="currentPassword" v-model="password.current" type="password" class="form-control" placeholder="current password">
                <div v-if="passwordErrors.current" class="text-danger">{{ passwordErrors.current }}</div>
              </div>
              <div class="mb-3">
                <label for="newPassword" class="form-label">پسورد جدید</label>
                <input id="newPassword" v-model="password.new" type="password" class="form-control" placeholder="new password">
                <div v-if="passwordErrors.new" class="text-danger">{{ passwordErrors.new }}</div>
              </div>
              <div class="mb-3">
                <label for="confirmNewPassword" class="form-label">تأیید پسورد جدید</label>
                <input id="confirmNewPassword" v-model="password.confirm" type="password" class="form-control" placeholder="confirm new password">
                <div v-if="passwordErrors.confirm" class="text-danger">{{ passwordErrors.confirm }}</div>
              </div>
              <div>
                <button type="button" class="btn" id="btcolor" @click="updatePassword">ویرایش رمز</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const profile = ref({
  name: '',
  lastName: '',
  email: '',
  phone: '',
  address: ''
});

const password = ref({
  current: '',
  new: '',
  confirm: ''
});

const profileErrors = ref({
  name: '',
  lastName: '',
  email: '',
  phone: '',
  address: ''
});

const passwordErrors = ref({
  current: '',
  new: '',
  confirm: ''
});

const toast = useToast();

// بارگذاری تنظیمات کاربر از localStorage
onMounted(() => {
  const storedProfile = localStorage.getItem("userSettings");
  if (storedProfile) {
    Object.assign(profile.value, JSON.parse(storedProfile));
  }
});

// ذخیره تنظیمات پروفایل
function saveProfile() {
  clearErrors(profileErrors);
  if (!profile.value.name) profileErrors.value.name = 'لطفاً نام خود را وارد کنید';
  if (!profile.value.lastName) profileErrors.value.lastName = 'لطفاً نام خانوادگی خود را وارد کنید';
  if (!profile.value.email) profileErrors.value.email = 'لطفاً پست الکترونیکی خود را وارد کنید';
  if (!profile.value.phone) profileErrors.value.phone = 'لطفاً شماره تلفن خود را وارد کنید';
  if (!profile.value.address) profileErrors.value.address = 'لطفاً آدرس خود را وارد کنید';

  if (Object.values(profileErrors.value).some(error => error)) return;

  const updatedProfile = {
    name: profile.value.name,
    lastName: profile.value.lastName,
    email: profile.value.email,
    phone: profile.value.phone,
    address: profile.value.address,
  };
  localStorage.setItem("userSettings", JSON.stringify(updatedProfile));
  toast.open({
    message: "تنظیمات پروفایل با موفقیت ذخیره شد.",
    type: 'success',
    position: "top-right"
  });
}

// به‌روزرسانی رمزعبور
function updatePassword() {
  clearErrors(passwordErrors);
  if (!password.value.current) passwordErrors.value.current = 'لطفاً پسورد فعلی خود را وارد کنید';
  if (!password.value.new) passwordErrors.value.new = 'لطفاً پسورد جدید خود را وارد کنید';
  if (!password.value.confirm) passwordErrors.value.confirm = 'لطفاً تأیید پسورد جدید خود را وارد کنید';
  if (password.value.new && password.value.new !== password.value.confirm) {
    passwordErrors.value.confirm = 'رمز عبور جدید با تأیید آن مطابقت ندارد.';
    toast.open({
      message: "رمز عبور جدید با تأیید آن مطابقت ندارد.",
      type: 'error',
      position: "top-right"
    });
    return;
  }

  if (Object.values(passwordErrors.value).some(error => error)) return;

  // در اینجا باید رمزعبور را به سرور ارسال کنید
  toast.open({
    message: "رمز عبور با موفقیت به‌روزرسانی شد.",
    type: 'success',
    position: "top-right"
  });
}

function clearErrors(errors) {
  for (let key in errors.value) {
    errors.value[key] = '';
  }
}
</script>
