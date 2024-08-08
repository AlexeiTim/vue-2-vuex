<template>
  <button :class="{ circle }" :type="type" class="root" @click="$emit('click')">
    <slot />
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  emits: ["click"],
  props: {
    circle: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "success",
    },
  },
};
</script>

<style lang="scss" scoped>
.root {
  transition: background 0.3s ease;
  padding: 7px 16px;
  border: none;
  color: white;
  border-radius: 2px;

  &[type="success"] {
    background: $success-color;
    &:hover {
      background: $success-color-100;
    }
  }

  &[type="default"] {
    color: $secondary-text-color;
    background: $default-color;
    &:hover {
      background: $default-color-100;
    }

    &.active {
      color: white;
      background: $success-color;
      &:hover {
        background: $success-color-100;
      }
    }
  }
  &.circle {
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
