<template>
  <div class="neighborThailand">
    <HeaderTitle line1="Visualize Neighbor" line2="of Thailand 2018" />
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
    <div>
      <v-container  v-if="result">
        <p v-animate-css="animateTextInfo">
          <span class="font-weight-bold">Note :</span> No data for this in the year 2018
        </p>
      </v-container>
    </div>
  </div>
</template>

<script>
import HeaderTitle from "../components/home/HeaderTitle";
import MapVisualize from "../components/visualize/MapVisualize";
export default {
  name: "NeighborThailand",
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
      .dispatch("getNeighborBangkok")
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
.neighborThailand .block-map {
  height: 90vh;
  width: 100%;
}
</style>
