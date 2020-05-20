<template>
  <div class="closestBangkok">
    <HeaderTitle line1="Visualize 50 City Point" line2="Closest to Bangkok" />
    <div>
      <v-container>
        <div
          class="block-transparent-shadow block-map"
          v-animate-css="'bounce'"
          ref="blocknanimation"
          v-if="visualizeResult.length > 0"
        >
          <MapVisualize :pointlocation="visualizeResult" />
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import HeaderTitle from "../components/home/HeaderTitle";
import MapVisualize from "../components/visualize/MapVisualize";

export default {
  name: "ClosestBangkok",
  components: {
    HeaderTitle,
    MapVisualize,
  },
  data() {
    return {
      result: false,
      notfound: false,
      visualizeResult: [],
    };
  },
  mounted() {
    let loader = this.$loading.show({
      color: "#ffffff",
      loader: "bars",
      backgroundColor: "#000000",
    });
    this.$store
      .dispatch("get50ClosestBangkok")
      .then((closest) => {
        let { result } = closest;
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
.closestBangkok .block-map {
  height: 90vh;
  width: 100%;
}
</style>
