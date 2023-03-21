<template>
  <div>
    <p>First Internal</p>
    <button @click="goToSecond">Go To Second</button>
    <button @click="close">Close Trigger</button>
    <button @click="darkMode">Dark Mode Trigger</button>
  </div>
</template>

<script>
  export default {
    name: 'FirstInternal',
    methods: {
      close() {
        this.$emit('close');
      },
      goToSecond() {
        this.$router.replace('/first-route/second-internal')
      },
      darkMode() {
        this.$emit('setDarkMode', false);
      }
    },
    mounted() {
      this.$emit('setBackButton', false);
    }
  }
</script>

<style lang="scss" scoped>

</style>
