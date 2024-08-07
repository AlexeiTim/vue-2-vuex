<template>
  <div class="root">
    <input :value="value" @input="handleInput" />
    <slot name="prefix"> </slot>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  emits: ["input"],
  methods: {
    handleInput(event) {
      const value = event.target.value;
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.root {
  position: relative;
}
</style>
