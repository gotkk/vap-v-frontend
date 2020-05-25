<template>
  <div class="MBRThailand">
    <HeaderTitle line1="MBR Covering Thailand" line2="in 2009" />
    <div>
      <v-container v-if="result&&nodata">
        <p v-animate-css="animateNote">
          <span class="font-weight-bold">Note :</span> No data for Thailand in
          2009
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
          v-if="visualizeMBRPoint.length > 0"
        >
          <MapVisualize2
            v-if="year === 'All Year'"
            :pointlocation1="visualizePMPointAll"
            :pointlocation2="visualizeMBRPointAll"
            :polygonlocation="visualizeRingAll"
            :mapstyle="mapStyle"
            :year="year"
          />
          <MapVisualize2
            v-else
            :pointlocation1="visualizePMPoint"
            :pointlocation2="visualizeMBRPoint"
            :polygonlocation="visualizeRing"
            :mapstyle="mapStyle"
            :year="year"
          />
        </div>
      </v-container>
      <v-container v-if="notfound">
        <ResultNotfound :animate="animateResult" />
      </v-container>
    </div>
  </div>
</template>

<script>
import HeaderTitle from "../components/home/HeaderTitle";
import MapVisualize2 from "../components/visualize/MapVisualize2";
import MapDataSetting from "../components/visualize/MapDataSetting";
import ResultNotfound from "../components/mock/ResultNotfound";

export default {
  name: "MBRThailand",
  components: {
    HeaderTitle,
    MapVisualize2,
    MapDataSetting,
    ResultNotfound,
  },
  data() {
    return {
      result: false,
      notfound: false,
      nodata: false,
      year: "",
      mapStyle: "",
      visualizeMBRPoint: [],
      visualizePMPoint: [],
      visualizeRing: [],
      visualizeMBRPointAll: [],
      visualizePMPointAll: [],
      visualizeRingAll: [],
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
    this.year = "2009";
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
        .dispatch("getMinMaxLatLnThaiForMBR")
        .then((mbr) => {
          let { result, result_all } = mbr;
          if (result_all?.pmpoint?.length > 0) {
            if(result?.pmpoint?.length === 0){
              this.nodata = true;
            }
            this.visualizeMBRPoint = [...result.mbrpoint];
            this.visualizePMPoint = [...result.pmpoint];
            this.visualizeRing = [...result.ring];

            this.visualizeMBRPointAll = [...result_all.mbrpoint];
            this.visualizePMPointAll = [...result_all.pmpoint];
            this.visualizeRingAll = [...result_all.ring];

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
            // text: "Database Connection Failed!!",
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
.MBRThailand .block-map {
  height: 90vh;
  width: 100%;
}
</style>
