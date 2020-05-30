<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <p v-animate-css="animate">
            <span class="font-weight-bold">Note : </span>
            <span>{{ text }}</span>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Note",
  props: {
    animate: [Object, Array],
    text: {
      type: String,
      default: "note is not available"
    }
  },
};
</script>

<style scoped></style>
