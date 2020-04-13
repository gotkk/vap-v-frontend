<template>
  <v-app class="bg-app">
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
};
</script>

<style>
.t1 {
  background-color: cadetblue;
}
.t2 {
  background-color: coral;
}
.block-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.bg-app{
  background-color: mintcream !important;
}
</style>
