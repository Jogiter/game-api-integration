<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold mb-8">GameList</h1>
    <h4 class="text-red-500 font-bold">Need Login First !</h4>
    <form
      class="w-full max-w-sm flex flex-col space-y-4"
      @submit.prevent="submitForm"
    >
      <div class="flex flex-col">
        <label for="currency" class="block text-gray-700 font-bold mb-2"
          >Game:</label
        >
        <select
          id="game"
          name="game"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="name"
        >
          <option value="Mines">Mines</option>
          <option value="Dice">Dice</option>
          <option value="Keno">Keno</option>
          <option value="Hilo">Hilo</option>
          <option value="Goal">Goal</option>
          <option value="Plinko">Plinko</option>
          <option value="Hotline">Hotline</option>
          <option value="Aviator">Aviator</option>
          <!-- <option value="Mini+Roulette">Mini+Roulette</option> -->
          <!-- <option value="Roulette+Big">Roulette+Big</option>
            <option value="scratch+off">scratch+off</option> -->
        </select>
      </div>
      <div class="flex flex-col">
        <label for="lang" class="block text-gray-700 font-bold mb-2"
          >Lang:</label
        >
        <select
          id="lang"
          name="lang"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="lang"
        >
          <option value="en">en</option>
          <option value="vi">vi</option>
          <option value="es">es</option>
        </select>
      </div>
      <div class="flex flex-col">
        <label for="currency" class="block text-gray-700 font-bold mb-2"
          >Currency:</label
        >
        <select
          id="currency"
          name="currency"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="currency"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GOLD">GOLD</option>
          <option value="PHP">PHP</option>
          <option value="VND">VND</option>
          <option value="BRL">BRL</option>
          <option value="INR">INR</option>
        </select>
      </div>
      <div class="flex flex-col">
        <label for="deviceType" class="block text-gray-700 font-bold mb-2"
          >Device Type:</label
        >
        <select
          id="deviceType"
          name="deviceType"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="deviceType"
        >
          <option value="android">android</option>
          <option value="ios">ios</option>
          <option value="desktop">desktop</option>
          <option value="harmony">harmony</option>
        </select>
      </div>
      <div class="flex flex-col">
        <label for="userName" class="block text-gray-700 font-bold mb-2"
          >User Name:</label
        >
        <input
          type="text"
          id="userName"
          name="userName"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :class="[!userName ? '' : 'bg-gray-200' ]"
          v-model="userName"
          readonly
        />
      </div>
      <div class="flex flex-col">
        <label for="token" class="block text-gray-700 font-bold mb-2"
          >Token:</label
        >
        <input
          type="text"
          id="token"
          name="token"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="token"
          :class="[!token ? '' : 'bg-gray-200' ]"
          readonly
        />
      </div>
      <div class="flex flex-col">
        <label for="isDemo" class="block text-gray-700 font-bold mb-2"
          >Is Demo:</label
        >
        <div
          class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
        >
          <input
            type="checkbox"
            name="isDemo"
            id="isDemo"
            v-model="isDemo"
            :class="{ 'bg-green-400 right-0': isDemo, 'bg-gray-200': !isDemo }"
            class="absolute block w-6 h-6 rounded-full bg-gray-200 border-4 appearance-none cursor-pointer transform transition-transform duration-200"
          />
          <label
            for="isDemo"
            class="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
          ></label>
        </div>
      </div>
      <div class="flex flex-col">
        <label for="sessionToken" class="block text-gray-700 font-bold mb-2"
          >Session Token:</label
        >
        <input
          type="text"
          id="sessionToken"
          v-model="sessionToken"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="flex flex-col">
        <label for="gToken" class="block text-gray-700 font-bold mb-2"
          >G Token:</label
        >
        <input
          type="text"
          id="gToken"
          v-model="gToken"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>

    <div>
      <Game :src="gameIframe" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { getGameIframe, uuid, ICurrency, IGameNames, ILang } from '../utils'
import Game from './Game.vue'

const lang = ref<ILang>('en')
const currency = ref<ICurrency>('GOLD')
const deviceType = ref('android')
const userName = computed(() => {
  return localStorage.getItem('userName') || ''
})
const token = computed(() => {
  return localStorage.getItem('token') || ''
})
const name = ref<IGameNames>('Plinko')
// 0或者1。1表示demo模式，0表示非demo模式
const isDemo = ref(false)
const sessionToken = ref(uuid())
const gToken = ref('')
const gameIframe = ref<string>('')

const submitForm = async () => {
  const params = {
    lang: lang.value,
    currency: currency.value,
    deviceType: deviceType.value,
    userName: userName.value,
    token: token.value,
    name: name.value,
    isDemo: isDemo.value ? '1' : '0',
    sessionToken: sessionToken.value,
    gToken: gToken.value
  }
  console.log('submitForm', params);

  gameIframe.value = getGameIframe(params)
}
</script>
