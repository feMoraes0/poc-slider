<template>
  <div>
    <p>My First route</p>
    <button @click="openModal">open modal</button>
    <ModalWrapper v-if="isSliderOpen" @close="closeSlider" />
  </div>
</template>

<script>
  import ModalWrapper from './ModalWrapper.vue';

  export default {
    name: 'FirstRoute',
    components: {
      ModalWrapper
    },
    data: () => ({
      isSliderOpen: true,
    }),
    methods: {
      openModal() {
        this.isSliderOpen = true;
      },
      closeSlider() {
        this.isSliderOpen = false;
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
