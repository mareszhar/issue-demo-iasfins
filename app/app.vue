<template>
  <form @submit.prevent="checkIfRegistered">
    <label>
      <div>enter any email:</div>
      <input v-model="email" type="email" required @input="showResult = false" />
    </label>
    <button type="submit">check if registered</button>
  </form>
  <p v-if="showResult">the email '{{ email }}' {{ isRegistered ? 'IS' : 'IS NOT' }} registered</p>
</template>

<script setup lang="ts">
const email = ref('test@gmail.com')
const showResult = ref(false)
const isRegistered = ref(false)

async function checkIfRegistered() {
  const payload: ApiRequest = { email: email.value }
  const res = await $fetch('/api/checkIfRegistered', {
    method: 'POST',
    body: payload,
  })

  isRegistered.value = res.isRegistered
  showResult.value = true
}
</script>
