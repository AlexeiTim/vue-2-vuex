<template>
  <div class="root">
    <div class="overlay">
      <form class="form" @submit.prevent="login">
        <div class="form__title">Авторизация</div>
        <div v-if="error" class="form__error">
          {{ errorMessage }}
        </div>
        <div class="form__main">
          <BaseInput
            label="Логин или Телефон"
            class="form__input"
            :success="!!username"
            v-model="username"
          >
            <template #append>
              <div class="icon">
                <PhoneIcon />
              </div>
            </template>
          </BaseInput>
          <BaseInput
            :success="!!password"
            class="form__input"
            :type="inputType"
            :error="!!fieldErors['password']"
            :error-message="fieldErors['password']?.join(', ') || ''"
            v-model="password"
            placeholder="Пароль"
          >
            <template #append>
              <div class="icon">
                <LockIcon />
              </div>
            </template>
            <template #prefix>
              <div @click="swapInputType" style="cursor: pointer">
                <EyeIcon v-if="inputType === 'password'" />
                <EyeShowIcon style="height: 15px" v-else />
              </div>
            </template>
          </BaseInput>
        </div>

        <div class="form__footer">
          <BaseButton class="form__button" type="success">
            <span>Войти</span>
            <BaseLoadingSpinner v-if="isLoading" small />
          </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseLoadingSpinner from "@/components/BaseLoadingSpinner.vue";
import EyeIcon from "@/components/icons/EyeIcon.vue";
import LockIcon from "@/components/icons/LockIcon.vue";
import PhoneIcon from "@/components/icons/PhoneIcon.vue";
import { mapState } from "vuex";
import { defineErrors } from "@/utils/defineErrors";
import EyeShowIcon from "@/components/icons/EyeShowIcon.vue";

export default {
  name: "LoginView",
  components: {
    BaseButton,
    BaseInput,
    PhoneIcon,
    LockIcon,
    EyeIcon,
    BaseLoadingSpinner,
    EyeShowIcon,
  },
  methods: {
    async login() {
      this.errorMessage = "";
      this.fieldErors = {};
      await this.$store.dispatch("auth/login", {
        username: this.username,
        password: this.password,
      });
      if (this.error) {
        const { errorMessage, fieldErrors } = defineErrors(this.error);
        this.errorMessage = errorMessage;
        this.fieldErors = fieldErrors;
        return;
      }
      this.$router.push({ name: "Appeals" });
    },
    swapInputType() {
      this.inputType = this.inputType === "text" ? "password" : "text";
    },
  },
  computed: {
    ...mapState("auth", {
      isLoading: (state) => state.isLoading,
      error: (state) => state.error,
    }),
  },
  data() {
    return {
      username: "79122333444",
      password: "",
      inputType: "password",
      errorMessage: "",
      fieldErors: {},
    };
  },
};
</script>

<style lang="scss" scoped>
.root {
  background: url("@/assets/auth.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  .overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    .icon {
      width: 24px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .form {
      position: relative;
      background: white;
      width: 340px;
      height: 290px;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      justify-content: end;
      gap: 28px;
      padding: 20px;

      &__title {
        position: absolute;
        background: $success-color;
        z-index: 10;
        width: 308px;
        height: 56px;
        border-radius: 5px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        top: -20px;
        left: 15px;
      }

      &__error {
        position: absolute;
        z-index: 10;
        color: red;
        width: auto;
        top: 50px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &__input {
        background: white;
        padding: 8.5px 0px;
      }

      &__button {
        width: 106px;
        padding: 8px 0;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2p;
      }

      &__footer {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
