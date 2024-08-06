<template>
  <BaseModal :is-visible="isVisible" @close="$emit('close')">
    <template #body>
      Create/Update appeal
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue';

export default {
  components: {
    BaseModal
  },
  name: 'AppealModal',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    }
  },
}
</script>
