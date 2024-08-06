<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeOnOverlay">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <slot name="header">
          <h3>Default Header</h3>
        </slot>
        <button class="close-button" @click="close">x</button>
      </div>
      <div class="modal-body">
        <slot name="body">
          <p>Default Body</p>
        </slot>
      </div>
      <div class="modal-footer">
        <slot name="footer">
          <button @click="close">Close</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    closeOnOverlay(e) {
      if (e.target === e.currentTarget) {
        this.close();
      }
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  width: 500px;
  max-width: 100%;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.modal-body {
  padding: 20px 0;
}

.modal-footer {
  border-top: 1px solid #eee;
  padding-top: 10px;
  text-align: right;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>