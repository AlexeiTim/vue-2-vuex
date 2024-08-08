<template>
  <div class="root">
    <label :class="{ success }" class="label" v-if="label">{{ label }}</label>
    <textarea
      class="textarea"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "BaseTextarea",
  props: {
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    success: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["input"],
};
</script>

<style lang="scss" scoped>
.root {
  padding: 8px 12px 8px 0;
  border-bottom: 1px solid $secondary-color;
  display: flex;
  flex-direction: column;
  height: 100%;

  textarea {
    resize: none;
  }

  .label {
    color: $secondary-color-300;
    font-size: 12px;
    line-height: 18px;
    &.success {
      color: $success-color;
    }
  }

  .textarea {
    flex-grow: 1;
    width: 100%;
    line-height: 20px;
    padding: 2px 4px;
    &::placeholder {
      color: $secondary-color-300;
    }
    color: $main-text-color;
  }
}
</style>
