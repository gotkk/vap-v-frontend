<template>
  <div class="cityPM25than50">
    <HeaderTitle
      line1="Country and City of PM 2.5"
      line2="Greater than 50 in 2015"
    />

    <DownloadExcel
      file="CountryAndCityPMthan50.xls"
      :animate="animateInput"
      @download="handleDownload"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import HeaderTitle from "../components/home/HeaderTitle";
import DownloadExcel from "../components/download/DownloadExcel";
export default {
  name: "CityPM25than50",
  components: {
    HeaderTitle,
    DownloadExcel,
  },
  computed: {
    ...mapState({
      animateInput: (state) => state?.animated?.a_input,
    }),
  },
  methods: {
    handleDownload() {
      this.loadingDownload = true;
      this.$store
        .dispatch("getCountryAndCityPMthan50")
        .catch((err) => {
          this.$fire({
            title: "Error",
            text: err.message,
            type: "error",
          });
        })
        .finally(() => {
          this.loadingDownload = false;
        });
    },
  },
};
</script>

<style scoped></style>
