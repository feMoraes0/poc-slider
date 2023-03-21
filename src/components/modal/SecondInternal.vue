<template>
  <div>
    <p>Second Internal</p>
    <button @click="backButton">Back Button Trigger</button>
    <button @click="darkMode">Dark Mode Trigger</button>
  </div>
</template>

<script>
  export default {
    name: 'SecondInternal',
    methods: {
      backButton() {
        this.$router.replace('/first-route/first-internal');
      },
      darkMode() {
        this.$emit('setDarkMode', true);
      }
    },
    mounted() {
      this.$emit('setReturnRoute', '/first-route/first-internal');
      this.$emit('setBackButton', true);
    }
  }
</script>
