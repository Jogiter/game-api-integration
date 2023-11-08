<script setup lang="ts">
import { ref } from 'vue'
import { authApi, getBalance, ResponseCode } from './api/api'
import Login from './components/Login.vue'
import GameList from './components/GameList.vue'
import GetBlance from './components/GetBalance.vue'
import Deposit from './components/Deposit.vue'
import Withdraw from './components/Withdraw.vue'
import TransferCheck from './components/TransferCheck.vue'
import BetStatement from './components/BetStatement.vue'
import { getGameIframe, uuid } from './utils'
import { genJWTToken } from './api/utils'

const componentId = ref('Login')
const gameIframe = ref<string>('')

// const operator = 'AmGr0oY68J'
// const user = 'dennis'
// const uid = '2023001'
// const secret = 'XHU2nsuozSuU5Xku'
const trade_no = 'some_trade_no'
const currency = 'GOLD'
const lang = 'en'
// 最近接收到的流水版本序号，0开始，结果会返回最新的
const last = ''
// 流水获取过程中分页数据量的控制, 允许每个分页数据量, 10-300
const per = 10
const deviceType = 'android'
const isDemo = 'false'

console.log('uuid', uuid());

const onLogin = async ({operator, user, uid, secret}: any) => {
  const stamp = Math.floor(Date.now() / 1000)
  const token1 = await genJWTToken(secret, user, uid, stamp)
  const authRes = await authApi(operator, user, uid, secret, token1.split('.')[0], stamp)
  const token = authRes.data

  console.log(token1, token);

  if (ResponseCode.success === authRes.code) {
    console.log('auth success')
    console.log('auth', authRes.data)
    localStorage.setItem('token', token)
  } else {
    console.log('auth failed')
  }
}
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
      <Login @submit="onLogin" v-if="componentId === 'Login'" />
      <GetBlance v-if="componentId === 'GetBlance'" />
      <Deposit v-if="componentId === 'Deposit'" />
      <Withdraw v-if="componentId === 'Withdraw'" />
      <TransferCheck v-if="componentId === 'TransferCheck'" />
      <BetStatement v-if="componentId === 'BetStatement'" />
      <GameList v-if="componentId === 'GameList'" />
    </div>
  </template>
