<template>
  <div class="highestNo">
    <HeaderTitle line1="All city points" line2="Having the Highest in 2011" />
    <MapSetting
      v-if="result"
      @setstyle="handleSetMapStyle"
      :animate="animateMapSetting"
    />
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
                :point-location="visualizeResult"
                :map-style="mapStyle"
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
import { mapState } from "vuex";
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
    };
  },
  computed: {
    ...mapState({
      animateResult: (state) => state?.animated?.a_result,
      animateMapResult: (state) => state?.animated?.a_mapresult,
      animateMapSetting: (state) => state?.animated?.a_mapsetting,
    }),
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

<style scoped></style>
