<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-3xl font-bold mb-8">Login</h1>
    <form class="w-full max-w-sm" @submit.prevent="submitForm">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="operator">
          Operator
        </label>
        <input
          v-model="operator"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="operator"
          type="text"
          placeholder="Enter your operator"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="user">
          User
        </label>
        <input
          v-model="user"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="user"
          type="text"
          placeholder="Enter your user"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="uid">
          UID
        </label>
        <input
          v-model="uid"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="uid"
          type="text"
          placeholder="Enter your UID"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="secret">
          Secret
        </label>
        <input
          v-model="secret"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="secret"
          type="text"
          placeholder="Enter your secret"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </div>
    </form>

    <div class="w-full max-w-sm m-4">
      <label class="block text-gray-700 font-bold mb-2" for="response">
        Response
      </label>
      <textarea
        :value="json"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="response"
        rows="10"
        placeholder="Enter your response"
        readonly
      ></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { authApi } from '../api/api'
import { genJWTToken } from '../api/utils'

const operator = ref('AmGr0oY68J')
const user = ref('dennis')
const uid = ref('2023001')
const secret = ref('XHU2nsuozSuU5Xku')
const json = ref('{}')

const submitForm = async() => {
  json.value = '{}'
  console.log('Operator:', operator.value)
  console.log('User:', user.value)
  console.log('UID:', uid.value)
  console.log('Secret:', secret.value)

  const stamp = Math.floor(Date.now() / 1000)
  const token = await genJWTToken(secret.value, user.value, uid.value, stamp)
  console.log('Token:', token);
  const res = await authApi(operator.value, user.value, uid.value, secret.value, token.split('.')[0], stamp)
  json.value = JSON.stringify(res, null, 2)
  if (res.code === 200) {
    localStorage.setItem('token', res.data)
    localStorage.setItem('userName', user.value)
  }
}
</script>
