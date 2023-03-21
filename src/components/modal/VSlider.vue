<template>
  <transition name="fade-slide">
    <div
      v-if="startTransition"
      class="transition-wrapper"
    >
      <div
        class="slider-backdrop"
        data-test-slider-backdrop
        @click.self="close"
      ></div>
      <div
        class="slider"
        :class="dark ? 'dark-slider' : 'light-slider'"
        role="dialog"
      >
        <header class="slider-header">
          <i
            v-if="showBackButton"
            class="icon-arrow-left back"
            @click.self="back"
          />
          <i
            class="close"
            aria-label="Close slider"
            data-test-slider-close-button
            @click.self="close"
          ></i>
        </header>
        <section class="slider-content">
          <div
            v-show="showOverlay"
            class="scroll-overlay"
          ></div>
          <vue-custom-scrollbar
            class="slider-scroll-area"
            data-test-slider-scroll-area
            @ps-scroll-down="showOverlay = true"
            @ps-y-reach-start="showOverlay = false"
            @ps-y-reach-end="shouldHideOverlay"
          >
            <slot name="content"></slot>
          </vue-custom-scrollbar>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
  import vueCustomScrollbar from 'vue-custom-scrollbar';

  const ESC = 27;

  export default {

    components: {
      vueCustomScrollbar,
    },

    props: {
      dark: {
        type: Boolean,
        default: false,
      },
      showBackButton: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      startTransition: false,
      showOverlay: false,
    }),

    mounted() {
      document.body.classList.add('mve-slider-open');
      document.addEventListener('keyup', this.escKeyHandler);
      this.startTransition = true;
    },

    beforeDestroy() {
      setTimeout(() => {
        document.body.classList.remove('mve-slider-open');
      }, 100);
      document.removeEventListener('keyup', this.escKeyHandler);
    },

    methods: {
      escKeyHandler(event) {
        if (event.keyCode === ESC) {
          this.close();
        }
      },

      shouldHideOverlay() {
        this.showOverlay = document.querySelector('.slider-scroll-area').scrollHeight > document.querySelector('.slider-content').clientHeight;
      },

      close() {
        this.$emit('close');
      },

      back() {
        this.$emit('back');
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "~@b2b-canaisdigitais/meuvivoempresas-designsystem/theme-responsive/icons";

  $animation-duration: .5s;
  $font-default-regular: 'Arial';
  $primary-color: purple;
  $lighten-gray: #ccc;
  $black-color: #000;
  $light-color: #eee;
  $light-gray: #999;

  .fade-slide-enter-active {
    transition-duration: $animation-duration;

    .slider-backdrop {
      transition: opacity $animation-duration;
    }

    .slider {
      transition: right $animation-duration;
    }
  }

  .fade-slide-leave-active {
    transition-duration: $animation-duration;

    .slider-backdrop {
      transition: none;
    }

    .slider {
      transition: right $animation-duration;
    }
  }

  .fade-slide-enter {
    .slider-backdrop {
      opacity: 0;
    }

    .slider {
      right: -100vw;
    }
  }

  .fade-slide-leave-to {
    .slider-backdrop {
      opacity: 0;
    }

    .slider {
      right: -100vw;
    }
  }

  .slider {
    bottom: 0;
    padding-right: 28px;
    position: fixed;
    right: 0;
    top: 0;
    width: 630px;
    z-index: 51;

    .slider-header {
      .back {
        cursor: pointer;
        display: block;
        height: 24px;
        left: 31px;
        opacity: .55;
        position: absolute;
        top: 28px;
        width: 24px;
        z-index: 53;

        &:hover {
          opacity: .45;
        }
      }

      .close {
        cursor: pointer;
        display: block;
        height: 20px;
        position: absolute;
        right: 26px;
        top: 26px;
        width: 20px;
        z-index: 53;

        &:hover {
          opacity: .8;
        }
      }
    }

    .slider-content {
      font-family: $font-default-regular;
      font-size: 16px;
      line-height: 24px;
      margin-top: 120px;

      .slider-scroll-area {
        height: calc(100vh - 156px);
        padding: 0 42px 0 64px;
      }

      h1,
      ::v-deep {
        h1 {
          font-family: 'Arial';
          font-size: 36px;
          font-stretch: normal;
          font-style: normal;
          font-weight: 300;
          letter-spacing: -1px;
          line-height: 1.11;
          margin-bottom: 32px;
      }
      }

      h2,
      ::v-deep {
        h2 {
          font-family: 'Arial';
          font-size: 24px;
          font-stretch: normal;
          font-style: normal;
          font-weight: 300;
          letter-spacing: -1.2px;
          line-height: 1.33;
          margin-bottom: 16px;
      }
      }

      p,
      ::v-deep {
        p {
          font-family: 'Arial';
          font-size: 20px;
          font-stretch: normal;
          font-style: normal;
          font-weight: 300;
          letter-spacing: normal;
          line-height: 1.4;

          &.highlight-text {
            font-family: 'Arial';
          }
      }
      }

      .scroll-overlay {
        height: 200px;
        left: 0;
        position: absolute;
        top: 0;
        width: 636px;
        z-index: 52;
      }
    }
  }

  .dark-slider {
    background: $primary-color;

    .slider-header {
      .close {
        background: url("~@b2b-canaisdigitais/meuvivoempresas-designsystem/"
        + "theme/assets/images/closeWhite.svg") center no-repeat;
      }
    }

    .slider-content {
      color: $light-color;

      h1,
      ::v-deep {
        h1 {
          color: $light-color;
      }
      }

      h2,
      ::v-deep {
        h2 {
          color: $light-color;
      }
      }

      p,
      ::v-deep {
        p {
          color: $black-color;
      }
      }

      .scroll-overlay {
        // sass-lint:disable no-color-literals
        background-image: linear-gradient(
          to bottom,
          $primary-color 0%,
          rgba(102, 0, 153, .95) 75%,
          rgba(102, 0, 153, 0) 100%
        );
      }
    }
  }

  .light-slider {
    background: $light-color;

    .slider-header {
      .close {
        background: url("~@b2b-canaisdigitais/meuvivoempresas-designsystem/"
        + "theme/assets/images/close.svg") center no-repeat;
      }
    }

    .slider-content {
      color: $light-gray;

      h1,
      ::v-deep {
        h1 {
          color: $black-color;
      }
      }

      h2,
      ::v-deep {
        h2 {
          color: $black-color;
      }
      }

      p,
      ::v-deep {
        p {
          color: $black-color;
      }
      }

      .scroll-overlay {
        background-image: linear-gradient(
          to bottom,
          $light-color 0%,
          rgba(255, 255, 255, .95) 75%,
          rgba(255, 255, 255, 0) 100%
        );
      }
    }
  }

  .slider-backdrop {
    background-color: rgba(0, 0, 0, .6);
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 50;
  }

  ::v-deep {
    .ps__rail-x,
    .ps__rail-y {
      // sass-lint:disable no-important
      background-color: transparent !important;
      opacity: 1 !important;
      z-index: 53 !important;

      .ps__thumb-x,
      .ps__thumb-y {
        // sass-lint:disable no-important
        background-color: $lighten-gray !important;
        width: 6px !important;
      }
    }
  }
</style>

<style lang="scss">
  .mve-slider-open {
    overflow-y: hidden;
  }
</style>
