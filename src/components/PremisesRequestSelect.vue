<template>
  <select v-model="value" @change="handleChangePremise">
    <option :value="item.id" v-for="item in items" :key="item.id">
      {{ item.address }}
    </option>
  </select>
</template>

<script>
import { mapState } from 'vuex';

  export default {
    name: 'PremisesRequestSelect',
    data() {
      return {
        value: ''
      }
    },
    methods: {
      handleChangePremise() {
        this.$emit('change', this.value)
      }
    },
    computed: {
      ...mapState('premises', {
        items: state => state.items
      })
    },
    mounted() {
      this.$store.dispatch('premises/getAll')
    }
  }
</script>

<style lang="scss" scoped>

</style>