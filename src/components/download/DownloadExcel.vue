<template>
  <div class="downloadExcel">
    <v-container>
      <div class="block-transparent-shadow" v-animate-css="animate">
        <v-row>
          <v-col cols="12">
            <div class="block-center btn-upload" @click="handleDownload">
              <v-icon size="60">mdi-cloud-download</v-icon>
              <br />
              <div>
                <span style="fontWeight: bold">Download Excel File : </span>
                <span>{{file}}</span>
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
  props: ["file", "animate"],
  methods: {
      handleDownload() {
          this.$emit("download")
      }
  },
};
</script>

<style scoped>
.downloadExcel .btn-upload {
  background-color: #209f62;
  flex-direction: column;
  width: 100%;
  height: 240px;
  border: solid;
  border-width: 2px;
  border-color: #bdbdbd;
  cursor: pointer;
}
.downloadExcel .btn-upload:hover {
  background-color: #0e723b;
}
</style>
