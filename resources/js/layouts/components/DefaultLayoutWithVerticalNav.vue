<script setup>
import VerticalNavLayout from "@layouts/components/VerticalNavLayout.vue";
import VerticalNavLink from "@layouts/components/VerticalNavLink.vue";

// Components
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->

    <template #vertical-nav-content>
      <VerticalNavLink
        :item="{
          title: 'Companies',
          icon: 'mdi-office-building',
          to: '/companies',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Employees',
          icon: 'mdi-account-group',
          to: '/employees',
        }"
      />
    </template>
    <!-- 👉 Pages -->
    <slot />
  </VerticalNavLayout>
</template>
