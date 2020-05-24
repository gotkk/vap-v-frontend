<template>
  <div class="highestNo">
    <HeaderTitle line1="All city points" line2="Having the Highest in 2011" />
    <MapSetting
      v-if="result"
      @setstyle="handleSetMapStyle"
      :animate="animateMapSetting"
    />
    <!-- <div>
      <v-container>
        <div class="block-transparent-shadow">
          <v-row>
            <v-col cols="10" offset="1">
              <v-select
                v-model="mapStyle"
                :items="listMapStyle"
                label="Select Map Visualize Style"
                prepend-icon="map"
                menu-props="auto"
                hide-details
                outlined
              ></v-select>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </div> -->
    <div>
      <v-container v-if="result">
        <v-row>
          <v-col>
            <div
              class="block-transparent-shadow block-map"
              v-animate-css="animateMapResult"
              v-if="visualizeResult.length > 0"
            >
              <MapVisualize
                :pointlocation="visualizeResult"
                :mapstyle="mapStyle"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="notfound">
        <ResultNotfound :animate="animateResult" />
      </v-container>
    </div>
  </div>
</template>

<script>
import HeaderTitle from "../components/home/HeaderTitle";
import MapVisualize from "../components/visualize/MapVisualize";
import MapSetting from "../components/visualize/MapSetting";
import ResultNotfound from "../components/mock/ResultNotfound";

export default {
  name: "HighestNo",
  components: {
    HeaderTitle,
    MapVisualize,
    MapSetting,
    ResultNotfound,
  },
  data() {
    return {
      result: false,
      notfound: false,
      visualizeResult: [],
      listMapStyle: ["dark-gray-vector", "streets-vector"],
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
    this.handleGetHighestPoint();
  },
  methods: {
    handleGetHighestPoint() {
      let loader = this.$loading.show({
        color: "#ffffff",
        loader: "bars",
        backgroundColor: "#000000",
      });
      this.$store
        .dispatch("getHighestPoint")
        .then((highest) => {
          let { result } = highest;
          if (result?.[0]?.length > 0) {
            this.visualizeResult = [...result[0]];
            this.result = true;
            this.notfound = false;
            setTimeout(() => {
              loader.hide();
            }, [3600]);
          } else {
            this.result = false;
            this.notfound = true;
            loader.hide();
          }
        })
        .catch((err) => {
          loader.hide();
          this.$fire({
            title: "Error",
            text: err.message,
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
.highestNo .block-map {
  height: 90vh;
  width: 100%;
}
</style>
