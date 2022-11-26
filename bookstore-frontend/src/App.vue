<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  components: {
    AppHeader,
    AppFooter
  },
};
</script>

<template>
    <AppHeader />
    <div class="container-fluid">
      <main class="page">
        <aside class="l"></aside>
        <div class="article">
          <router-view />
        </div>
        <aside class="r"></aside>
      </main>
    </div>
    <AppFooter />
</template>