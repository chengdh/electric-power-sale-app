<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { initRouter } from "/@/router/utils";
import { addClass, removeClass } from "/@/utils/operate";
import { storageSession } from "/@/utils/storage";
import { useUserStore } from "/@/store/modules/user";

const router = useRouter();

let username = ref("");
let password = ref("");
const userStore = useUserStore();

const onLogin = (): void => {
  userStore
    .loginByUsername({
      username: username.value,
      password: password.value
    })
    .then(data => {
      router.push("/");
    });

  // initRouter("admin").then(() => {});
};

function onUserFocus() {
  addClass(document.querySelector(".user"), "focus");
}

function onUserBlur() {
  if (username.value.length === 0)
    removeClass(document.querySelector(".user"), "focus");
}

function onPwdFocus() {
  addClass(document.querySelector(".pwd"), "focus");
}

function onPwdBlur() {
  if (password.value.length === 0)
    removeClass(document.querySelector(".pwd"), "focus");
}
</script>

<template>
  <img class="wave" />
  <div class="login-container">
    <div class="img">
      <illustration />
    </div>
    <div class="login-box">
      <div class="login-form">
        <avatar class="avatar" />
        <h2
          v-motion
          :initial="{
            opacity: 0,
            y: 100
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 100
            }
          }"
        >
          Pure Admin
        </h2>
        <div
          class="input-group user focus"
          v-motion
          :initial="{
            opacity: 0,
            y: 100
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 200
            }
          }"
        >
          <div class="icon">
            <IconifyIconOffline icon="fa-user" width="14" height="14" />
          </div>
          <div>
            <h5>用户名</h5>
            <input
              type="text"
              class="input"
              v-model="username"
              @focus="onUserFocus"
              @blur="onUserBlur"
            />
          </div>
        </div>
        <div
          class="input-group pwd focus"
          v-motion
          :initial="{
            opacity: 0,
            y: 100
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 300
            }
          }"
        >
          <div class="icon">
            <IconifyIconOffline icon="fa-lock" width="14" height="14" />
          </div>
          <div>
            <h5>密码</h5>
            <input
              type="password"
              class="input"
              v-model="password"
              @focus="onPwdFocus"
              @blur="onPwdBlur"
            />
          </div>
        </div>
        <button
          class="btn"
          v-motion
          :initial="{
            opacity: 0,
            y: 10
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 400
            }
          }"
          @click="onLogin"
        >
          登录
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("/@/style/login.css");
</style>
