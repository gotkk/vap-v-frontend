<template>
  <div class="resultNotfound block-transparent-shadow" v-animate-css="animate">
    <v-row>
      <v-col cols="12">
        <div class="block-center">
          <span>Notfound</span>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ResultNotFound",
  props: ["animate"],
};
</script>

<style scoped></style>
