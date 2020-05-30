<template>
  <div class="headerProject">
    <v-container>
      <div class="block-transparent-shadow" v-animate-css="animate">
        <span class="font-weight-bold">{{ head }}: </span>
        <span>{{ name }}</span>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "HearderProject",
  props: {
    head: {
      type: String,
      default: "project",
    },
    name: {
      type: String,
      default: "project name",
    },
    animate: [Object, Array],
  },
};
</script>

<style scoped></style>
