<template>
  <div class="highestNo">
    <HeaderTitle line1="All city points" line2="Having the Highest in 2011" />
    <MapSetting

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
              ref="blocknanimation"
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
        <div
          class="block-transparent-shadow"
          v-animate-css="animateMapResult"
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
import MapSetting from "../components/visualize/MapSetting";
export default {
  name: "HighestNo",
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
      listMapStyle: ["dark-gray-vector", "streets-vector"],
      mapStyle: "dark-gray-vector",
      animateMapResult: {},
      animateMapSetting: {},
    };
  },
  created() {
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
        })
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
