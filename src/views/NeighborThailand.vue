<template>
  <div class="neighborThailand">
    <HeaderTitle line1="Visualize Neighbor" line2="of Thailand 2018" />
    <div>
      <v-container>
        <p v-animate-css="animateNote">
          <span class="font-weight-bold">Note :</span> No data for this in the
          year 2018
        </p>
      </v-container>
    </div>
    <MapDataSetting
      v-if="result"
      @setstyle="handleSetMapStyle"
      @setyear="handleSetYear"
      :animate="animateMapSetting"
      :yearselected="year"
    />
    <div>
      <v-container v-if="result">
        <div
          class="block-transparent-shadow block-map"
          v-animate-css="animateMapResult"
          v-if="visualizeResultAll.length > 0"
        >
          <MapVisualize
            v-if="year === 'All Year'"
            :pointlocation="visualizeResultAll"
            :mapstyle="mapStyle"
            :year="year"
          />
          <MapVisualize
            v-else
            :pointlocation="visualizeResult"
            :mapstyle="mapStyle"
            :year="year"
          />
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
import MapDataSetting from "../components/visualize/MapDataSetting";

export default {
  name: "NeighborThailand",
  components: {
    HeaderTitle,
    MapVisualize,
    MapDataSetting,
  },
  data() {
    return {
      result: false,
      notfound: false,
      year: "",
      mapStyle: "",
      visualizeResult: [],
      visualizeResultAll: [],
      animateNote: {},
      animateResult: {},
      animateMapResult: {},
      animateMapSetting: {},
    };
  },
  created() {
    this.animateNote = this.$store.getters.a_note_map;
    this.animateResult = this.$store.getters.a_result;
    this.animateMapResult = this.$store.getters.a_mapresult;
    this.animateMapSetting = this.$store.getters.a_mapsetting;
    this.year = "2018";
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
        .dispatch("getNeighborBangkok")
        .then((closest) => {
          let { result, result_all } = closest;
          if (result_all) {
            this.visualizeResult = [...result[0]];
            this.visualizeResultAll = [...result_all[0]];
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
        .catch((err) => {
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
    handleSetYear(value) {
      this.year = value;
    },
  },
};
</script>

<style scoped>
.neighborThailand .block-map {
  height: 90vh;
  width: 100%;
}
</style>
