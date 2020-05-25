<template>
  <div class="allPointAllCountry">
    <HeaderTitle
      line1="Visualize All the City Points"
      line2="of all countries by Year"
    />

    <div>
      <v-form @submit.prevent="validate" id="visual-input" ref="visual-input">
        <v-container>
          <div class="block-transparent-shadow" v-animate-css="animateInput">
            <v-row>
              <v-col cols="12" sm="7" offset-sm="1">
                <v-text-field
                  v-model="year"
                  :rules="yearRules"
                  ref="yearinput"
                  label="Year"
                  clearable
                  autocomplete="off"
                  counter="4"
                  required
                  :loading="isLoading"
                  @click:clear="handleClear()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <div class="block-center block-btn">
                  <v-btn
                    type="submit"
                    form="visual-input"
                    color="grey lighten-1"
                    block
                    >Search</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-form>
    </div>

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
  name: "AllPointAllCountry",
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
      isLoading: false,
      year: "",
      visualizeResult: [],
      yearRules: [
        (v) => !!v || "Year is required",
        (v) => /^\d+$/.test(v) || "Year is only positive integer",
        (v) => (v && v.length === 4) || "Year length must be 4",
      ],
      mapStyle: "",
    };
  },
  watch: {
    year() {
      if (this.result || this.notfound) {
        this.handleClear();
      }
    },
  },
  computed: {
       // ...mapState(["Animated"])
    ...mapState({
      animateInput: state => state?.animated?.a_input,
      animateResult: state => state?.animated?.a_result,
      animateMapResult: state => state?.animated?.a_mapresult,
      animateMapSetting: state => state?.animated?.a_mapsetting,
    })
  },
  methods: {
    validate() {
      if (!this.$refs.yearinput.validate()) {
        this.$refs.yearinput.focus();
      } else {
        this.handleSubmitVisualize();
      }
    },
    handleSubmitVisualize() {
      this.isLoading = true;
      this.$store
        .dispatch("getAllCityPointAllCountrybyYear", this.year)
        .then((visualize) => {
          const { result } = visualize;
          if (result?.[0]?.length > 0) {
            this.visualizeResult = [...result[0]];
            this.result = true;
            this.notfound = false;
            setTimeout(() => {
              this.isLoading = false;
            }, [3600]);
          } else {
            this.result = false;
            this.notfound = true;
            this.isLoading = false;
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.$fire({
            title: "Error",
            text: err.message,
            type: "error",
          });
        });
    },
    handleClear() {
      this.visualizeResult = [];
      this.result = false;
      this.notfound = false;
    },
    handleSetMapStyle(value) {
      this.mapStyle = value;
    },
  },
};
</script>

<style scoped>
.allPointAllCountry .block-btn {
  height: 100%;
}

.allPointAllCountry .block-map {
  height: 90vh;
  width: 100%;
}
</style>
