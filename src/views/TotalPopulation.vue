<template>
  <div class="totalPopulation">
    <HeaderTitle
      line1="Calculate Total Population"
      line2="by Year and color_pm25"
    />

    <div>
      <v-form
        @submit.prevent="validate"
        id="get-population"
        ref="get_population"
      >
        <v-container>
          <div class="block-transparent-shadow" v-animate-css="animateInput">
            <v-row>
              <v-col cols="12" sm="5" offset-sm="1">
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
              <v-col cols="12" sm="5">
                <v-text-field
                  v-model="colorpm25"
                  :rules="colorpm25Rules"
                  ref="colorpm25input"
                  label="Color of PM 2.5"
                  clearable
                  autocomplete="off"
                  required
                  number
                  :loading="isLoading"
                  @click:clear="handleClear()"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <div class="block-center block-btn">
                  <v-btn
                    type="submit"
                    form="get-population"
                    color="grey lighten-1"
                    width="200"
                    >Search</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-form>
    </div>

    <div>
      <v-container v-if="result">
        <div
          class="block-transparent-shadow"
          v-animate-css="animateResult"
          v-if="
            Object.keys(totalpopulation).length > 0 &&
              totalpopulation.constructor === Object
          "
        >
          <v-row>
            <v-col cols="12" sm="10" offset-sm="1">
              <span>The total of population is</span>
              <v-text-field
                v-model="totalpopulation.total_population"
                disabled
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
      </v-container>
      <v-container v-if="notfound">
        <ResultNotfound :animate="animateResult"/>
      </v-container>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderTitle from "../components/home/HeaderTitle";
import ResultNotfound from "../components/mock/ResultNotfound";

export default {
  name: "TotalPopulation",
  components: {
    HeaderTitle,
    ResultNotfound,
  },
  data: () => ({
    result: false,
    notfound: false,
    year: "",
    colorpm25: "",
    totalpopulation: {},
    isLoading: false,
    yearRules: [
      (v) => !!v || "Year is required",
      (v) => /^\d+$/.test(v) || "Year is only positive integer",
      (v) => (v && v.length === 4) || "Year length must be 4",
    ],
    colorpm25Rules: [(v) => !!v || "Color of PM 2.5 is required"],
    animateInput: {},
    animateResult: {},
  }),
  created() {
    this.animateInput = this.$store.getters.a_input;
    this.animateResult = this.$store.getters.a_result;
  },
  watch: {
    year() {
      if (this.result || this.notfound) {
        this.handleClear();
      }
    },
    colorpm25() {
      if (this.result || this.notfound) {
        this.handleClear();
      }
    },
  },
  methods: {
    validate() {
      if (!this.$refs.yearinput.validate()) {
        this.$refs.yearinput.focus();
      } else if (!this.$refs.colorpm25input.validate()) {
        this.$refs.colorpm25input.focus();
      } else {
        this.handleSubmitGetTotalPopulation();
      }
    },
    handleSubmitGetTotalPopulation() {
      this.isLoading = true;
      const forminput = {
        year: parseInt(this.year),
        colorpm25: this.colorpm25,
      };
      this.$store
        .dispatch("getTotalPopulationbyYearandColorPM25", forminput)
        .then((population) => {
          const { result } = population;
          if (result?.[0]?.length > 0) {
            this.totalpopulation = { ...result[0][0] };
            this.result = true;
            this.notfound = false;
          } else {
            this.result = false;
            this.notfound = true;
          }
        })
        .catch((err) => {
          this.$fire({
            title: "Error",
            text: err.message,
            type: "error",
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    handleClear() {
      this.totalpopulation = {};
      this.result = false;
      this.notfound = false;
    },
  },
};
</script>

<style scoped>
.totalPopulation .block-btn {
  height: 100%;
}
</style>
