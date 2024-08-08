<template>
  <div class="root">
    <label :class="{ success }" class="label" v-if="label">{{ label }}</label>
    <div class="select">
      <select :value="value" @change="handleChange" :placeholder="placeholder">
        <slot />
      </select>
      <ArrowDownIcon />
    </div>
  </div>
</template>

<script>
import ArrowDownIcon from "./icons/ArrowDownIcon.vue";

export default {
  name: "BaseSelect",
  components: {
    ArrowDownIcon,
  },
  props: ["value", "label", "success", "placeholder"],
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

<style lang="scss" scoped>
.root {
  width: 100%;
  height: 100%;
  padding: 8px 12px 8px 0;
  border-bottom: 1px solid $secondary-color-200;
  display: flex;
  align-items: start;
  justify-content: space-between;
  flex-direction: column;
  .select {
    display: flex;
    align-items: start;
    justify-content: space-between;
    width: 100%;
  }

  .label {
    color: $secondary-color-300;
    font-size: 12px;
    line-height: 18px;
    &.success {
      color: $success-color;
    }
  }

  select {
    flex-grow: 1;
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    &::placeholder {
      color: $secondary-color-300;
    }
  }

  select:after {
    width: 14px;
    height: 8px;
    position: absolute;
    background: red;
  }
}
</style>
