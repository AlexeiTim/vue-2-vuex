<template>
  <div :class="{ small }" class="spinner">
    <div class="double-bounce1"></div>
    <div class="double-bounce2"></div>
  </div>
</template>

<script>
export default {
  name: "BaseLoadingSpinner",
  props: {
    small: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.spinner {
  width: 40px;
  height: 40px;
  margin: 100px auto;
  &.small {
    width: 10px;
    height: 10px;
    margin: 2px;
  }
  position: relative;
}

.double-bounce1,
.double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #2ecc71; /* Зеленый цвет */
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: bounce 2s infinite ease-in-out;
}

.double-bounce2 {
  animation-delay: -1s;
}

@keyframes bounce {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
</style>
