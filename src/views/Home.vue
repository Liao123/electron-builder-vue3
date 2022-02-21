<template>
  <div class="home">
    <button @click="fetchAjax">调用ax2ios{{ajaxText}}</button>

    <button @click="sendPostMessage">给主程序发送消息123</button>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts" src="./Home.ts"></script>
