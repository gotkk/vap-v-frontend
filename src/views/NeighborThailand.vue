<template>
  <div class="neighborThailand">
    <HeaderTitle line1="Visualize Neighbor" line2="of Thailand 2018" />

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
          v-if="visualizeResultAll.length > 0"
        >
          <MapVisualize
            v-if="year === 'All Year'"
            :point-location="visualizeResultAll"
            :map-style="mapStyle"
            :year="year"
          />
          <MapVisualize
            v-else
            :point-location="visualizeResult"
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
import MapVisualize from "../components/visualize/MapVisualize";
import MapDataSetting from "../components/visualize/MapDataSetting";
import ResultNotfound from "../components/mock/ResultNotfound";
import Note from "../components/mock/Note";

export default {
  name: "NeighborThailand",
  components: {
    HeaderTitle,
    MapVisualize,
    MapDataSetting,
    ResultNotfound,
    Note,
  },
  data() {
    return {
      result: false,
      notfound: false,
      nodata: false,
      note: "No data of Thailand neighbor in 2018",
      year: "2018",
      mapStyle: "",
      visualizeResult: [],
      visualizeResultAll: [],
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
        .dispatch("getNeighborBangkok")
        .then((closest) => {
          let { result, result_all } = closest;
          if (result_all?.[0]?.length > 0) {
            if (result?.[0]?.length === 0) {
              this.nodata = true;
            }
            this.visualizeResult = [...result[0]];
            this.visualizeResultAll = [...result_all[0]];
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
    handleSetYear(value) {
      this.year = value;
    },
  },
};
</script>

<style scoped></style>
