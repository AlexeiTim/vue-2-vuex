<template>
  <select :value="modelValue" @change="handleChangeModelValue">
    <option :value="item.id" v-for="item in items" :key="item.id">
      {{ item.address }}
    </option>
  </select>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PremisesRequestSelect',
  props: ['modelValue'],
  emits: ['update:modelValue', 'change'],
  computed: {
    ...mapState('premises', {
      items: state => state.items
    })
  },
  methods: {
    handleChangeModelValue(event) {
      this.$emit('update:modelValue', event.target.value)
      this.$emit('change', event.target.value)
    }
  },
  mounted() {
    this.$store.dispatch('premises/getAll')
  }
}
</script>

<style lang="scss" scoped></style>