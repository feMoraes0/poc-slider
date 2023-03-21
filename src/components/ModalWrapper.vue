<template>
  <Slider
    class="slider"
    :show-back-button="isBackButtonVisible"
    :dark="isDarkMode"
    :block-click-outside="sliderLoading"
    @close="close"
    @back="actionBack"
  >
    <template slot="content">
      <router-view
        @close="close"
        @setReturnRoute="setReturnRoute"
        @setBackButton="setBackButton"
        @setDarkMode="setDarkMode"
      />
    </template>
  </Slider>
</template>

<script>
  import VSlider from './modal/VSlider.vue';

  export default {
    name: 'ModalWrapper',
    components: {
      Slider: VSlider,
    },
    data: () => ({
      isDarkMode: false,
      sliderLoading: false,
      isBackButtonVisible: false,
      returnRoute: null,
    }),
    mounted() {
      const routeName = 'firstinternal';
      if(this.$route.name !== routeName) {
        console.log('triggered');
        this.$router.push({ name: routeName });
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      actionBack() {
        this.$router.push(this.returnRoute);
      },
      setReturnRoute(route) {
        this.returnRoute = route;
      },
      setBackButton(backButtonState) {
        this.isBackButtonVisible = backButtonState;
      },
      setDarkMode(darkModeState) {
        this.isDarkMode = darkModeState;
      }
    }
  }
</script>

<style lang="scss" scoped>
.slider {
  border: 1px solid red;
  width: 630px;
}
</style>
