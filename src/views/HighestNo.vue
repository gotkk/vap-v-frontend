<template>
  <div class="highestNo">
    <HeaderTitle line1="All city points" line2="Having the Highest in 2011" />
     <div>
      <v-container v-if="result">
        <div
          class="block-transparent-shadow block-map"
          v-animate-css="'bounce'"
          ref="blocknanimation"
          v-if="visualizeResult.length > 0"
        >
          <MapVisualize :pointlocation="visualizeResult" />
        </div>
      </v-container>
      <v-container v-if="notfound">
        <div
          class="block-transparent-shadow"
          v-animate-css="'bounce'"
          ref="blocknanimation"
        >
          <v-row>
            <v-col cols="12">
              <div class="block-center">
                <span>Notfound</span>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import HeaderTitle from "../components/home/HeaderTitle";
import MapVisualize from "../components/visualize/MapVisualize";
export default {
  name: "HighestNo",
  components: {
    HeaderTitle,
    MapVisualize,
  },
  data() {
    return {
      result: false,
      notfound: false,
      visualizeResult: [],
      animateTextInfo: {
        classes: "fadeInUp",
        delay: 1200,
      },
    };
  },
  mounted() {
    let loader = this.$loading.show({
      color: "#ffffff",
      loader: "bars",
      backgroundColor: "#000000",
    });
    this.$store
      .dispatch("getHighestPoint")
      .then((highest) => {
        let { result } = highest;
        if (result && result[0].length > 0) {
          this.visualizeResult = [...result[0]];
          this.result = true;
          this.notfound = false;
        } else {
          this.result = false;
          this.notfound = true;
        }
        if (this.$refs.blocknanimation) {
          this.$refs.blocknanimation.classList.add("animated", "bounce");
          setTimeout(() => {
            this.$refs.blocknanimation.classList.remove("animated", "bounce");
          }, [1000]);
        }
      })
      .catch(() => {
        this.$fire({
          title: "Error",
          text: "Database Connection Failed!!",
          type: "error",
        });
      })
      .finally(() => {
        loader.hide();
      });
  },
};
</script>

<style scoped>
.highestNo .block-map {
  height: 90vh;
  width: 100%;
}
</style>
