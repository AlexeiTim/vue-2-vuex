<template>
  <BaseModal :is-visible="isVisible" @close="$emit('close')">
    <template #header>
      <div class="header">
        <p>{{ title }}</p>
        <p>{{ appeal ? appeal.status.name : "Новая" }}</p>
      </div>
    </template>
    <template #body>
      <div class="body">
        <div class="grid-3">
          <label>
            <PremisesRequestSelect
              label="Дом"
              :success="!!formData.premises_id"
              :value="formData.premises_id"
              @change="handleChangePremises"
            />
          </label>

          <label>
            <ApartmentsRequestSelect
              label="Квартира"
              v-model="formData.apartment_id"
              :premises_id="formData.premises_id"
              @change="handleChangeApartment"
            />
          </label>

          <BaseInput
            type="datetime-local"
            label="Срок"
            :error="!!fieldErrors['due_date']"
            :error-message="fieldErrors['due_date']?.join(' ')"
            :success="!!formData.due_date"
            v-model="formData.due_date"
          />
        </div>
        <div class="grid-4">
          <BaseInput
            label="Фамилия"
            :success="!!formData.applicant.last_name"
            v-model="formData.applicant.last_name"
          />

          <BaseInput
            label="Имя"
            :success="!!formData.applicant.first_name"
            v-model="formData.applicant.first_name"
          />

          <BaseInput
            label="Отчество"
            :success="!!formData.applicant.patronymic_name"
            v-model="formData.applicant.patronymic_name"
          />

          <BaseInput
            label="Телефон"
            :success="!!formData.applicant.username"
            v-model="formData.applicant.username"
            v-mask="'+7 ### ### ## ##'"
          />
        </div>

        <BaseTextarea
          :success="!!formData.description"
          class="textarea"
          label="Описание заявки"
          v-model="formData.description"
        />
      </div>
    </template>
    <template #footer>
      <div class="footer">
        <BaseButton @click="handleSave" class="save-btn">
          <span>{{ appeal ? "Сохранить" : "Создать" }}</span>
          <BaseLoadingSpinner v-show="isLoading" small />
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { mapState } from "vuex";
import ApartmentsRequestSelect from "./ApartmentsRequestSelect.vue";
import BaseModal from "./BaseModal.vue";
import PremisesRequestSelect from "./PremisesRequestSelect.vue";
import BaseInput from "./BaseInput.vue";
import BaseTextarea from "./BaseTextarea.vue";
import BaseButton from "./BaseButton.vue";
import BaseLoadingSpinner from "./BaseLoadingSpinner.vue";
import { defineErrors } from "@/utils/defineErrors";

export default {
  components: {
    BaseModal,
    ApartmentsRequestSelect,
    PremisesRequestSelect,
    BaseInput,
    BaseTextarea,
    BaseButton,
    BaseLoadingSpinner,
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
      fieldErrors: {},
    };
  },
  computed: {
    ...mapState("appeal", {
      isLoading: (state) => state.isLoading,
      error: (state) => state.error,
    }),
    title() {
      return !this.appeal
        ? "Создание заявки"
        : `Заявка № ${this.appeal.number}
          (от ${
            this.appeal.due_date
              ? this.$moment(this.appeal.due_date).format("DD.MM.YYYY")
              : "Неизвестная дата"
          })`;
    },
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
      this.formData.premises_id = value;
    },
    handleChangeApartment(value) {
      //** С бэка не смог получить ниодной квартиры */
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

      if (this.error) {
        const { fieldErrors } = defineErrors(this.error);
        this.fieldErrors = fieldErrors;
        return;
      }
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

<style scoped lang="scss">
.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer {
  display: flex;
  justify-content: end;
  align-items: center;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
  flex-grow: 1;
}
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.textarea {
  flex-grow: 1;
}

.save-btn {
  display: flex;
  align-items: center;
  gap: 2px;
}
</style>
