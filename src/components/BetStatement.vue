<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold mb-8">BetStatement</h1>
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
        <label for="last" class="block text-gray-700 font-bold mb-2"
          >Last:</label
        >
        <input
          type="string"
          id="last"
          name="last"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="last"
        />
      </div>
      <div class="flex flex-col">
        <label for="per" class="block text-gray-700 font-bold mb-2">Per:</label>
        <input
          type="range"
          id="per"
          name="per"
          v-model="per"
          min="10"
          max="300"
          step="1"
          list="tickmarks"
        />
        <datalist id="tickmarks">
          <option value="10" label="10"></option>
          <option value="50"></option>
          <option value="100"></option>
          <option value="150"></option>
          <option value="200"></option>
          <option value="250"></option>
          <option value="300" label="300"></option>
        </datalist>
        <div class="flex justify-between">
          <span>10</span>
          <span>{{ per }}</span>
          <span>300</span>
        </div>
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
        <label for="start" class="block text-gray-700 font-bold mb-2"
          >Start:</label
        >
        <input
          type="datetime-local"
          id="start"
          name="start"
          v-model="start"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="flex flex-col">
        <label for="end" class="block text-gray-700 font-bold mb-2">End:</label>
        <input
          type="datetime-local"
          id="end"
          name="end"
          v-model="end"
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
import { betStatement } from '../api/api'

const operator = ref('AmGr0oY68J')
const last = ref('0')
const per = ref(10)
const secret = ref('XHU2nsuozSuU5Xku')
const start = ref('')
const end = ref('')
const json = ref('{}')

const unixTime = (date: string) => {
  return Math.floor(new Date(date).getTime() / 1000)
}

const submitForm = async () => {
  json.value = '{}'
  console.log('Operator:', operator.value)
  console.log('Last:', last.value)
  console.log('Per:', per.value)
  console.log('Secret:', secret.value)
  console.log('Start:', start.value)
  console.log('End:', end.value)

  if (start.value && end.value) {
    const startUnix = unixTime(start.value)
    const endUnix = unixTime(end.value)
    const res = await betStatement(
      operator.value,
      last.value,
      per.value,
      secret.value,
      startUnix.toString(),
      endUnix.toString()
    )
    json.value = JSON.stringify(res, null, 2)
    return
  }

  const res = await betStatement(operator.value, last.value, per.value, secret.value)
  json.value = JSON.stringify(res, null, 2)
}
</script>