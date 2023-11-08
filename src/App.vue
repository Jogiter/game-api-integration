<script setup lang="ts">
import { ref } from 'vue'
import Login from './components/Login.vue'
import GameList from './components/GameList.vue'
import GetBlance from './components/GetBalance.vue'
import Deposit from './components/Deposit.vue'
import Withdraw from './components/Withdraw.vue'
import TransferCheck from './components/TransferCheck.vue'
import BetStatement from './components/BetStatement.vue'

const componentId = ref('Login')
</script>

<template>
    <div>
      <div class="container mx-auto flex flex-col gap-y-4 m-4">
        <div class="flex justify-between">
          <button @click="componentId = 'Login'" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
          <button @click="componentId = 'GetBlance'" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">GetBlance</button>
          <button @click="componentId = 'Deposit'" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Deposit</button>
        </div>
        <div class="flex justify-between">
          <button @click="componentId = 'Withdraw'" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Withdraw</button>
          <button @click="componentId = 'TransferCheck'" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">TransferCheck</button>
          <button @click="componentId = 'BetStatement'" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">BetStatement</button>
        </div>
        <div class="flex justify-between">
          <button @click="componentId = 'GameList'" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">GameList</button>
        </div>
      </div>
      <hr>
      <Login v-if="componentId === 'Login'" />
      <GetBlance v-if="componentId === 'GetBlance'" />
      <Deposit v-if="componentId === 'Deposit'" />
      <Withdraw v-if="componentId === 'Withdraw'" />
      <TransferCheck v-if="componentId === 'TransferCheck'" />
      <BetStatement v-if="componentId === 'BetStatement'" />
      <GameList v-if="componentId === 'GameList'" />
    </div>
  </template>
