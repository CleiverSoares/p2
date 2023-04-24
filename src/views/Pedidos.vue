<template>
    <div class="main-container">
       
        <Dashboard/>
    </div>
</template>

<script>
import Dashboard from '@/components/Dashboard.vue'
export default {
  components: { Dashboard },
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Pedidos"
}
</script>

<style scoped></style>