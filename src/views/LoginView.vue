<template>
  <div>
    <form @submit.prevent="login">
      <input v-model="username" />
      <input v-model="password" />
      <button type="submit" :disabled="isLoading">Submit</button>
      <div v-if="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import {  mapState } from 'vuex';

  export default {
    name: 'LoginView',
    methods: {
      async login() {
        await this.$store.dispatch('auth/login', { username: this.username, password: this.password})
        if (!this.error)
          this.$router.push({ name: 'Appeals'})
      }
    },
    computed: {
      ...mapState('auth', {
        isLoading: state => state.isLoading,
        error: state => state.error
      })
    },
    data() {
      return {
      username: '79122333444',
      password: '123456'
    }
    }
  }
</script>

<style lang="scss" scoped>

</style>