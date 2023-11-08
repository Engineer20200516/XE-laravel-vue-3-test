<script setup>
import router from "@/router";
import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
  store.dispatch("auth/logout").then(() => {
    setTimeout(() => {
      router.replace("/login");
    }, 1500);
  });
});
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Notification"> You're logging out... </VCard>
    </VCol>
  </VRow>
</template>
