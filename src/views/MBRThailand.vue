<template>
  <div class="MBRThailand">
    <HeaderTitle line1="MBR Covering Thailand" line2="in 2009" />

    <Note v-if="result && nodata" :animate="animateNote" :text="note" />

    <MapDataSetting
      v-if="result"
      @setstyle="handleSetMapStyle"
      @setyear="handleSetYear"
      :animate="animateMapSetting"
      :year-selected="year"
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
            :point-location1="visualizePMPointAll"
            :point-location2="visualizeMBRPointAll"
            :polygon-location="visualizeRingAll"
            :map-style="mapStyle"
            :year="year"
          />
          <MapVisualize2
            v-else
            :point-location1="visualizePMPoint"
            :point-location2="visualizeMBRPoint"
            :polygon-location="visualizeRing"
            :map-style="mapStyle"
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
import { mapState } from "vuex";
import HeaderTitle from "../components/home/HeaderTitle";
import MapVisualize2 from "../components/visualize/MapVisualize2";
import MapDataSetting from "../components/visualize/MapDataSetting";
import ResultNotfound from "../components/mock/ResultNotfound";
import Note from "../components/mock/Note";

export default {
  name: "MBRThailand",
  components: {
    HeaderTitle,
    MapVisualize2,
    MapDataSetting,
    ResultNotfound,
    Note,
  },
  data() {
    return {
      result: false,
      notfound: false,
      nodata: false,
      note: "No data of Thailand in 2009",
      year: "2009",
      mapStyle: "",
      visualizeMBRPoint: [],
      visualizePMPoint: [],
      visualizeRing: [],
      visualizeMBRPointAll: [],
      visualizePMPointAll: [],
      visualizeRingAll: [],
    };
  },
  computed: {
    ...mapState({
      animateNote: (state) => state?.animated?.a_note_map,
      animateResult: (state) => state?.animated?.a_result,
      animateMapResult: (state) => state?.animated?.a_mapresult,
      animateMapSetting: (state) => state?.animated?.a_mapsetting,
    }),
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
            if (result?.pmpoint?.length === 0) {
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

<style scoped></style>
