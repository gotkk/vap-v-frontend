<template>
  <div class="MBRThailand">
    <HeaderTitle line1="MBR Covering Thailand" line2="in 2009" />
    <div>
      <v-container>
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
          ref="blocknanimation"
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
        <div
          class="block-transparent-shadow"
          v-animate-css="animateResult"
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
import MapVisualize2 from "../components/visualize/MapVisualize2";
import MapDataSetting from "../components/visualize/MapDataSetting";

export default {
  name: "MBRThailand",
  components: {
    HeaderTitle,
    MapVisualize2,
    MapDataSetting,
  },
  data() {
    return {
      result: false,
      notfound: false,
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
    this.animateNote = this.$store.getters.a_note;
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
          if (result && result_all) {
            this.visualizeMBRPoint = [...result.mbrpoint];
            this.visualizePMPoint = [...result.pmpoint];
            this.visualizeRing = [...result.ring];

            this.visualizeMBRPointAll = [...result_all.mbrpoint];
            this.visualizePMPointAll = [...result_all.pmpoint];
            this.visualizeRingAll = [...result_all.ring];

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
