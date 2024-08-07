<template>
  <textarea :value="value" @input="$emit('input', $event.target.value)" />
</template>

<script>
export default {
  name: "BaseTextarea",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  emits: ["input"],
};
</script>

<style lang="scss" scoped></style>
