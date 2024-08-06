<template>
  <div>
    ApplicationsView
    <button @click="$store.dispatch('auth/login')">test</button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

  export default {
    name: 'ApplicationsView',
    methods: {
      ...mapActions('auth', ['login'])
    },
    computed: {
      ...mapState('auth', {
        isAuth: state => state.isAuth
      })
    },
  }
</script>

<style lang="scss" scoped>

</style>