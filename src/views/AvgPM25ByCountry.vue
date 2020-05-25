<template>
  <div class="avgPM25ByCountry">
    <HeaderTitle
      line1="Average PM 2.5 Each Country"
      line2="Decreasing Order By Average"
    />
    <DownloadExcel
      file="AvgPm25ByCountry.xls"
      :animate="animateInput"
      @download="handleDownload"
    />
  </div>
</template>

<script>
import HeaderTitle from "../components/home/HeaderTitle";
import DownloadExcel from "../components/download/DownloadExcel";
export default {
  name: "AvgPM25ByCountry",
  components: {
    HeaderTitle,
    DownloadExcel,
  },
  data() {
    return {
      animateInput: {},
    };
  },
  created() {
    this.animateInput = this.$store.getters.a_input;
  },
  methods: {
    handleDownload() {
      this.loadingDownload = true;
      this.$store
        .dispatch("getAvgPm25ByCountry")
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

<style scoped>
</style>
