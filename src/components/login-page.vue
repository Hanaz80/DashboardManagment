<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="login-card p-5 shadow-lg">
      <form>
        <h4 class="text-center bold mb-4 ">ورود</h4>
        <div class="mb-3">
          <input type="email" v-model="email" class="form-control bg-light border-0 shadow-sm" id="exampleInputEmail1" placeholder="نام کاربری" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <input type="password" v-model="password" class="form-control bg-light border-0 shadow-sm" id="exampleInputPassword1" placeholder="رمز عبور">
        </div>
        <div class="mb-3 form-check d-flex justify-content-between">
          <div>
            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
            <label class="form-check-label text-secondary" for="flexCheckChecked">مرا به خاطر بسپار</label>
          </div>
          <!-- <a href="#" class="bb">فراموشی رمز عبور؟</a> -->
        </div>
        <div class="text-center">
          <button type="button" v-on:click="login()" class="btn btn-primary shadow-none">ورود</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const router = useRouter();
const $toast = useToast();
let email = "";
let password = "";

// Dummy user data
const users = [
  { email: 'admin', password: '1234' },
  { email: 'helia', password: '1111' },
  { email: 'hananeh', password: '1234' },
  { email: 'mahyar', password: '1234' }
];

function login() {
  if (!email || !password) {
    $toast.open({
      message: "لطفا نام کاربری و پسورد خود را وارد کنید",
      type: 'default',
      position: "top-right"
    });
    return false;
  }

  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    localStorage.setItem("email", email);
    localStorage.setItem("username", email.split('@')[0]); // Save username (part before @) in localStorage
    return router.push("/dashboard");
  }

  $toast.open({
    message: "نام کاربری و رمز عبور شما اشتباه است",
    type: 'error',
    position: "top-right"
  });
  

  return;
}
</script>

<style scoped lang="scss">
.login-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  .bold {
    font-weight: 700;
    color: #21c4e2;
  }

  

  .btn-primary {
    background-color:rgb(124 230 249);
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 5px;
    transition: background-color 0.3s ease;

    &:hover {
      background: rgba(31, 221, 254, 0.2901960784);
    }
  }

  input.form-control {
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;

    &:focus {
      border-color:#21c4e2;
      box-shadow: 0 0 10px #21c4e2
    }
  }

  .form-check-input {
    margin-top: 0.25rem;
    &:checked {
      background-color: #007bff;
      border-color: #007bff;
    }
  }

  .form-check-label {
    padding-top: 0.15rem;
  }
}

</style>

