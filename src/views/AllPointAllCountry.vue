<template>
  <div class="allPointAllCountry">
    <HeaderTitle
      line1="Visualize All the City Points"
      line2="of all countries by Year"
    />

    <div>
      <v-form @submit.prevent="validate" id="visual-input" ref="visual-input">
        <v-container>
          <div class="block-transparent-shadow" v-animate-css="animateinput">
            <v-row>
              <v-col cols="12" md="7" offset-md="1">
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
              <v-col cols="12" md="3">
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

    <div>
      <v-container v-if="result">
        <div
          class="block-transparent-shadow block-map"
          v-animate-css="'bounce'"
          ref="blocknanimation"
          v-if="visualizeResult.length > 0"
        >
          <MapVisualize :pointlocation="visualizeResult"/>
        </div>
      </v-container>
      <v-container v-if="notfound">
        <div
          class="block-transparent-shadow"
          v-animate-css="'bounce'"
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
export default {
  name: "AllPointAllCountry",
  components: {
    HeaderTitle,
    MapVisualize,
  },
  data() {
    return {
      result: false,
      notfound: false,
      isLoading: false,
      year: "",
      visualizeResult: {},
      yearRules: [
        (v) => !!v || "Year is required",
        (v) => /^\d+$/.test(v) || "Year is only positive integer",
        (v) => (v && v.length === 4) || "Year length must be 4",
      ],
      animateinput: {
        classes: "flipInX",
        delay: 800,
      },
    };
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
          if (result && result[0].length > 0) {
            this.visualizeResult = [...result[0]];
            this.result = true;
            this.notfound = false;
          } else {
            this.result = false;
            this.notfound = true;
          }
          if (this.$refs.blocknanimation) {
            this.$refs.blocknanimation.classList.add("animated", "bounce");
            setTimeout(() => {
              this.$refs.blocknanimation.classList.remove("animated", "bounce");
            }, [1000]);
          }
        })
        .catch(() => {
          this.$fire({
            title: "Error",
            text: "Database Connection Failed!!",
            type: "error",
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    handleClear() {
      this.visualizeResult = {};
      this.result = false;
      this.notfound = false;
    },
  },
};
</script>

<style scoped>
.allPointAllCountry .block-btn {
  height: 100%;
}

.allPointAllCountry .block-map{
  height: 90vh;
  width: 100%;
}
</style>
