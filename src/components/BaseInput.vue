<template>
  <div class="root">
    <div class="root__input">
      <label v-if="label" :class="{ success }" class="label">{{ label }}</label>
      <div class="input-wrapper">
        <input
          :placeholder="placeholder"
          class="input"
          :value="value"
          @input="handleInput"
        />
        <slot name="prefix">
          <SearchIcon v-if="search" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import SearchIcon from "@/components/icons/SearchIcon.vue";
export default {
  components: {
    SearchIcon,
  },
  name: "BaseInput",
  props: {
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    success: {
      type: Boolean,
      default: false,
    },
    search: {
      type: Boolean,
      default: false,
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
  padding: 11px 0;
  border-bottom: 1px solid $secondary-color-200;
  display: flex;
  justify-content: space-between;

  .label {
    color: $secondary-color-300;
    &.success {
      color: $success-color;
    }
  }

  .input {
    flex-grow: 1;
    width: 100%;
    &::placeholder {
      color: $secondary-color-300;
    }
    color: $main-text-color;
  }
  &__input {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .input-wrapper {
    display: flex;
  }
}
</style>
