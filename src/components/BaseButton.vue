<template>
  <button
    :class="{ circle }"
    :size="size"
    :type="type"
    class="root"
    @click="$emit('click')"
  >
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
    size: {
      type: String,
      default: "default",
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

  &[size="default"] {
    padding: 7px 16px;
  }

  &[size="small"] {
    padding: 4px 14.5px;
    border-radius: 4px;
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
