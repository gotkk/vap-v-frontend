<template>
  <div class="closestBangkok">
    <HeaderTitle line1="Visualize 50 City Point" line2="Closest to Bangkok" />
    <MapSetting
      v-if="result"
      @setstyle="handleSetMapStyle"
      :animate="animateMapSetting"
    />
    <div>
      <v-container v-if="result">
        <div
          class="block-transparent-shadow block-map"
          v-animate-css="animateMapResult"
          v-if="visualizeResult.length > 0"
        >
          <MapVisualize :pointlocation="visualizeResult" :mapstyle="mapStyle" />
        </div>
      </v-container>
      <v-container v-if="notfound">
        <div class="block-transparent-shadow" v-animate-css="animateResult">
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
import MapSetting from "../components/visualize/MapSetting";

export default {
  name: "ClosestBangkok",
  components: {
    HeaderTitle,
    MapVisualize,
    MapSetting,
  },
  data() {
    return {
      result: false,
      notfound: false,
      visualizeResult: [],
      mapStyle: "",
      animateResult: {},
      animateMapResult: {},
      animateMapSetting: {},
    };
  },
  created() {
    this.animateResult = this.$store.getters.a_result;
    this.animateMapResult = this.$store.getters.a_mapresult;
    this.animateMapSetting = this.$store.getters.a_mapsetting;
  },
  mounted() {
    this.handleMap();
  },
  methods: {
    handleMap() {
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
          setTimeout(() => {
            loader.hide();
          }, [3600]);
        })
        .catch(() => {
          this.$fire({
            title: "Error",
            text: "Database Connection Failed!!",
            type: "error",
          });
        });
    },
    handleSetMapStyle(value) {
      this.mapStyle = value;
    },
  },
};
</script>

<style scoped>
.closestBangkok .block-map {
  height: 90vh;
  width: 100%;
}
</style>
