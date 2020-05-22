<template>
  <v-app class="bg-app">
    <Header />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Header from "@/components/layout/Header";

export default {
  name: "App",

  components: {
    Header,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
.block-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.bg-app {
  background-color: mintcream !important;
}
.block-transparent-shadow {
  padding: 16px;
  box-shadow: inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255),
    0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
}
.v-skeleton-loader__image{
  height: inherit !important;
}
</style>
