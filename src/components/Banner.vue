<template>
    <div id="main-banner">
        <transition name="appear">
            <h1 :class="{ 'animated': true }" v-if="visivel">Point dos Amigos</h1>
        </transition>
    </div>
</template>
  
<script>
import { ref } from 'vue'

export default {
    name: "Banner",
    setup() {
        let visivel = ref(false)

        setTimeout(() => (visivel.value = true), 200);

        return {
            visivel,
        }
    }
}
</script>
  
<style scoped>
.animated {
    animation: pulse 5s infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
.appear-enter-active,
.appear-leave-active {
    transition: transform 0.4s, opacity 0.4s;
}

.appear-enter-from,
.appear-leave-to {
    transform: translateX(200%);
    opacity: 0;
}

.appear-enter-to,
.appear-leave-from {
    transform: translateX(0);
    opacity: 1;
}

#main-banner {
    background-image: url('/public/img/burger.jpg');
    background-position: 0 -250px;
    background-size: cover;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

#main-banner h1 {
    color: rgba(209, 21, 113, 255);
    text-align: center;
    font-size: 60px;
    background-color: #222;
    padding: 20px 40px;
    border-radius: 5px;
}
</style>
  