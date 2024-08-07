<template>
  <BaseModal :is-visible="isVisible" @close="$emit('close')">
    <template #body>
      <label>
        Дом
        <PremisesRequestSelect
          v-model="formData.premises_id"
          @change="handleChangePremises"
        />
      </label>

      <label>
        Квартира
        <ApartmentsRequestSelect
          v-model="formData.apartment_id"
          :premises_id="formData.premises_id"
          @change="handleChangeApartment"
        />
      </label>

      <label>
        Срок
        <input v-model="formData.due_date" type="datetime-local" />
      </label>
      <label>
        Фамилия
        <input v-model="formData.last_name" type="text" />
      </label>

      <label>
        Имя
        <input v-model="formData.first_name" type="text" />
      </label>

      <label>
        Отчество
        <input v-model="formData.patronymic_name" type="text" />
      </label>

      <label>
        Телефон
        <input v-model="formData.username" type="text" />
      </label>

      <label>
        Описание заявки
        <textarea v-model="formData.description" />
      </label>
    </template>
    <template #footer>
      <button @click="handleSave">Save</button>
      <div v-show="isLoading">Loading...</div>
    </template>
  </BaseModal>
</template>

<script>
import { mapState } from "vuex";
import ApartmentsRequestSelect from "./ApartmentsRequestSelect.vue";
import BaseModal from "./BaseModal.vue";
import PremisesRequestSelect from "./PremisesRequestSelect.vue";

export default {
  components: {
    BaseModal,
    ApartmentsRequestSelect,
    PremisesRequestSelect,
  },
  name: "AppealModal",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        premises_id: "",
        last_name: "",
        first_name: "",
        patronymic_name: "",
        username: "",
        apartment_id: "",
        due_date: "",
        description: "",
        status_id: 1,
      },
    };
  },
  computed: {
    ...mapState("appeal", {
      isLoading: (state) => state.isLoading,
      error: (state) => state.error,
    }),
  },
  methods: {
    handleChangePremises(value) {
      this.formData.premises_id = value;
      console.log(value);
    },
    handleChangeApartment(value) {
      console.log(value);
    },
    async handleSave() {
      await this.$store.dispatch("appeal/create", this.formData);
      if (this.error) return;
      this.$emit("close");
      this.$store.dispatch("appeal/getAll");
    },
  },
};
</script>
