<template>
  <div v-if="invoicesLoaded">
    <div v-if="!mobile" class="app flex flex-column">
      <Navigation />
      <div class="app-content flex flex-column">
        <Modal v-if="modalActive" />
        <transition name="invoice">
          <InvoiceModal v-if="invoiceModal" />
        </transition>
        <router-view />
      </div>
    </div>
    <div v-else class="mobile-message flex flex-column">
      <h2>Sorry this app is not supported on mobile devices</h2>
      <p>To use the application, please use a computer or a tablet</p>
    </div>
  </div>
  <div v-if="!invoicesLoaded">
    <div id="loader">
      <div id="shadow"></div>
      <div id="box"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Navigation from "./components/Navigation.vue";
import InvoiceModal from "./components/InvoiceModal.vue";
import Modal from "./components/Modal.vue";

export default {
  data() {
    return {
      mobile: null,
    };
  },
  components: {
    Navigation,
    InvoiceModal,
    Modal,
  },
  created() {
    this.GET_INVOICES();
    this.checkScreen();
    window.addEventListener("resize", this.checkScreen);
  },
  methods: {
    ...mapActions(["GET_INVOICES"]),
    checkScreen() {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 750) {
        this.mobile = true;
        return;
      }

      this.mobile = false;
    },
  },
  computed: {
    ...mapState(["invoiceModal", "modalActive", "invoicesLoaded"]),
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.app {
  background-color: #141625;
  min-height: 100vh;
  flex-direction: column;

  @media (min-width: 900px) {
    flex-direction: row !important;
  }

  .app-content {
    flex: 1;
    padding: 0 20px;
    position: relative;
  }
}

.mobile-message {
  text-align: center;
  padding: 40px;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #141625;
  color: white;

  p {
    margin-top: 20px;
  }
}

// animate invoice modal
.invoice-enter-active,
.invoice-leave-active {
  transition: 0.8s ease all;
}

.invoice-enter-from,
.invoice-leave-to {
  transform: translateX(-700px);
}

button,
.button {
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 30px;
  border: none;
  font-size: 12px;
  margin-right: 8px;
  color: #fff;
}

.dark-purple {
  background-color: #252945;
}

.red {
  background-color: #ec5757;
}

.purple {
  background-color: #7c5dfa;
}

.green {
  background-color: #33d69f;
}

.orange {
  background-color: #ff8f00;
}

// utility classes

.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.container {
  width: 100%;
  padding: 40px 10px;
  max-width: 850px;
  margin: 0 auto;

  @media (min-width: 900px) {
    padding-top: 72px;
  }
}

.nav-link {
  text-decoration: none;
  color: initial;
}

// Status Button Styling

.status-button {
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
  }
  font-size: 12px;
  margin-right: 30px;
  align-items: center;
  padding: 8px 30px;
  border-radius: 10px;
}

.paid {
  &::before {
    background-color: #33d69f;
  }
  color: #33d69f;
  background-color: rgba(51, 214, 160, 0.1);
}

.pending {
  &::before {
    background-color: #ff8f00;
  }
  color: #ff8f00;
  background-color: rgba(255, 145, 0, 0.1);
}

.draft {
  &::before {
    background-color: #dfe3fa;
  }
  color: #dfe3fa;
  background-color: rgba(223, 227, 250, 0.1);
}

#loader {
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
}
@keyframes loader {
  0% {
    left: -100px;
  }
  100% {
    left: 110%;
  }
}
#box {
  width: 50px;
  height: 50px;
  background: #fff;
  animation: animate 0.5s linear infinite;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 3px;
}
@keyframes animate {
  17% {
    border-bottom-right-radius: 3px;
  }
  25% {
    transform: translateY(9px) rotate(22.5deg);
  }
  50% {
    transform: translateY(18px) scale(1, 0.9) rotate(45deg);
    border-bottom-right-radius: 40px;
  }
  75% {
    transform: translateY(9px) rotate(67.5deg);
  }
  100% {
    transform: translateY(0) rotate(90deg);
  }
}
#shadow {
  width: 50px;
  height: 5px;
  background: #000;
  opacity: 0.1;
  position: absolute;
  top: 59px;
  left: 0;
  border-radius: 50%;
  animation: shadow 0.5s linear infinite;
}
@keyframes shadow {
  50% {
    transform: scale(1.2, 1);
  }
}

body {
  background: #252945;
  overflow: hidden;
}
</style>
