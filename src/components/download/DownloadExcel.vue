<template>
  <div class="downloadExcel">
    <v-container>
      <div class="block-transparent-shadow" v-animate-css="animate">
        <v-row>
          <v-col cols="12">
            <div
              class="d-flex justify-center align-center flex-column btn-upload-download"
              @click="handleDownload"
            >
              <v-icon size="60">mdi-cloud-download</v-icon>
              <br />
              <div>
                <span class="font-weight-bold">Download Excel File : </span>
                <span>{{ file }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "DownloadExcel",
  props: {
    file: {
      type: String,
      default: "file name is not available",
    },
    animate: [Object, Array],
  },
  methods: {
    handleDownload() {
      this.$emit("download");
    },
  },
};
</script>

<style scoped></style>
