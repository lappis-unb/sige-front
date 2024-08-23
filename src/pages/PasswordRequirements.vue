<template>
  <div class="password-requirements">
    <div class="balloon">
      <ul>
        <li :class="{ valid: passwordLengthValid }">{{ passwordLengthValid ? '✅' : '⚠️' }} Contenha no mínimo 8 caracteres.</li>
        <li :class="{ valid: passwordNumberValid }">{{ passwordNumberValid ? '✅' : '⚠️' }} Contenha pelo menos um número.</li>
        <li :class="{ valid: passwordLowercaseValid }">{{ passwordLowercaseValid ? '✅' : '⚠️' }} Contenha pelo menos uma letra minúscula.</li>
        <li :class="{ valid: passwordUppercaseValid }">{{ passwordUppercaseValid ? '✅' : '⚠️' }} Contenha pelo menos uma letra maiúscula.</li>
        <li :class="{ valid: passwordNotContainFullname }">{{ passwordNotContainFullname ? '✅' : '⚠️' }} Não contenha o nome de usuário.</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    password: {
      type: String,
      default: ''
    },
    fullname: {
      type: String,
      default: ''
    }
  },
  computed: {
    passwordLengthValid() {
      return this.password.length >= 8;
    },
    passwordNumberValid() {
      return /[0-9]/.test(this.password);
    },
    passwordLowercaseValid() {
      return /[a-z]/.test(this.password);
    },
    passwordUppercaseValid() {
      return /[A-Z]/.test(this.password);
    },
    passwordNotContainFullname() {
      return !this.password.includes(this.fullname);
    }
  }
}
</script>

<style scoped>
.password-requirements {
  margin-left: 20px; /* Adiciona margem à esquerda para espaçar do campo de entrada */
}

.balloon {
  position: relative;
  top: 0;
  left: 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 320px;
}

.balloon ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.balloon li {
  margin-bottom: 5px;
  color: red;
}

.balloon li.valid {
  color: green;
}
</style>
