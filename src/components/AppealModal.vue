<template>
  <BaseModal :is-visible="isVisible" @close="$emit('close')">
    <template #body>
      <label>
        Дом
        <PremisesRequestSelect
          :value="formData.premises_id"
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
        <input v-model="formData.applicant.last_name" type="text" />
      </label>

      <label>
        Имя
        <input v-model="formData.applicant.first_name" type="text" />
      </label>

      <label>
        Отчество
        <input v-model="formData.applicant.patronymic_name" type="text" />
      </label>

      <label>
        Телефон
        <BaseInput
          v-model="formData.applicant.username"
          v-mask="'+7 ### ### ## ##'"
        />
        <!-- <input
          v-model="formData.applicant.username"
          v-mask="'+7 ### ### ## ##'"
          type="text"
        /> -->
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
import BaseInput from "./BaseInput.vue";

export default {
  components: {
    BaseModal,
    ApartmentsRequestSelect,
    PremisesRequestSelect,
    BaseInput,
  },
  name: "AppealModal",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    appeal: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      formData: this.prepareFormData(),
    };
  },
  computed: {
    ...mapState("appeal", {
      isLoading: (state) => state.isLoading,
      error: (state) => state.error,
    }),
  },
  methods: {
    prepareFormData() {
      return {
        premises_id: this.appeal?.premise?.id || "",
        applicant: {
          last_name: this.appeal?.applicant?.last_name || "",
          first_name: this.appeal?.applicant?.first_name || "",
          patronymic_name: this.appeal?.applicant?.patronymic_name || "",
          username: this.appeal?.applicant?.username || "",
        },
        apartment_id: this.appeal?.appartment?.id || "",
        due_date: this.appeal?.due_date
          ? this.$moment(this.appeal?.due_date).format("YYYY-MM-DD HH:mm:ss")
          : "",
        description: this.appeal?.description || "",
        status_id: this.appeal?.state?.id || 1,
      };
    },
    handleChangePremises(value) {
      console.log(this.formData.premises_id, value);
      console.log(value);
    },
    handleChangeApartment(value) {
      console.log(value);
    },
    async handleSave() {
      if (!this.appeal)
        await this.$store.dispatch("appeal/create", this.formData);
      else {
        delete this.formData.status_id;
        await this.$store.dispatch("appeal/update", {
          id: this.appeal.id,
          data: this.formData,
        });
      }

      if (this.error) return;
      this.$emit("close");
      this.$store.dispatch("appeal/getAll");
    },
  },
  watch: {
    appeal: {
      handler() {
        this.formData = this.prepareFormData();
      },
      immediate: true,
    },
  },
};
</script>
