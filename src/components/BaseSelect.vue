<template>
  <select :value="value" @change="handleChange">
    <slot />
  </select>
</template>

<script>
export default {
  name: "BaseSelect",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  emits: ["input", "change"],
  methods: {
    handleChange(event) {
      const value = event.target.value;
      this.$emit("change", value);
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
