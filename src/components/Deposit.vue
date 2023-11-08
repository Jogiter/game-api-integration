<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold mb-8">Deposit</h1>
    <form
      class="w-full max-w-sm flex flex-col space-y-4"
      @submit.prevent="submitForm"
    >
      <div class="flex flex-col">
        <label for="operator" class="block text-gray-700 font-bold mb-2"
          >Operator:</label
        >
        <input
          type="text"
          id="operator"
          name="operator"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="operator"
        />
      </div>
      <div class="flex flex-col">
        <label for="user" class="block text-gray-700 font-bold mb-2"
          >User:</label
        >
        <input
          type="text"
          id="user"
          name="user"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="user"
        />
      </div>
      <div class="flex flex-col">
        <label for="uid" class="block text-gray-700 font-bold mb-2">UID:</label>
        <input
          type="text"
          id="uid"
          name="uid"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="uid"
        />
      </div>
      <div class="flex flex-col">
        <label for="amount" class="block text-gray-700 font-bold mb-2"
          >Amount:</label
        >
        <input
          type="text"
          id="amount"
          name="amount"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="amount"
        />
      </div>
      <div class="flex flex-col">
        <label for="trade_no" class="block text-gray-700 font-bold mb-2"
          >Trade No:</label
        >
        <input
          type="text"
          id="trade_no"
          name="trade_no"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="trade_no"
        />
      </div>
      <div class="flex flex-col">
        <label for="secret" class="block text-gray-700 font-bold mb-2"
          >Secret:</label
        >
        <input
          type="text"
          id="secret"
          name="secret"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="secret"
        />
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
        </select>
      </div>
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
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

<script lang="ts" setup>
import { ref } from 'vue'
import { deposit } from '../api/api'

type Currency = 'USD' | 'EUR' | 'GOLD'

const operator = ref('AmGr0oY68J')
const user = ref('dennis')
const uid = ref('2023001')
const amount = ref(100)
const trade_no = ref('100')
const secret = ref('XHU2nsuozSuU5Xku')
const currency = ref<Currency>('GOLD')
const json = ref('{}')

const submitForm = async () => {
  json.value = '{}'
  console.log('Operator:', operator.value)
  console.log('User:', user.value)
  console.log('UID:', uid.value)
  console.log('Secret:', secret.value)
  console.log('Currency:', currency.value)

  const res = await deposit(operator.value, user.value, uid.value, amount.value, trade_no.value, secret.value, currency.value)
  json.value = JSON.stringify(res, null, 2)
  trade_no.value = (parseFloat(trade_no.value) + 1).toString()
}
</script>
