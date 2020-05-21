<template>
  <div class="historyPM25byCountry">
    <HeaderTitle line1="Historical PM 2.5 Values" line2="by Country" />

    <div>
      <v-form @submit.prevent="validate" id="input-country">
        <v-container>
          <div class="block-transparent-shadow" v-animate-css="animateInput">
            <v-row>
              <v-col cols="12" sm="7" offset-sm="1">
                <v-text-field
                  v-model="countryname"
                  :rules="countryRules"
                  ref="countrynameinput"
                  label="Country Name"
                  clearable
                  autocomplete="off"
                  required
                  :loading="isLoading"
                  @click:clear="handleClear()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <div class="block-center block-btn">
                  <v-btn
                    type="submit"
                    form="input-country"
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
        <div v-animate-css="'bounce'" ref="blocknanimation">
          <v-row>
            <v-col cols="12">
              <v-card class="block-transparent-shadow">
                <div class="block-center">
                  <span class="font-weight-bold">Historical PM 2.5</span>
                </div>
                <!-- v-model="historypm25" -->
                <v-card-title>
                  <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search result"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                  :search="search"
                  :headers="tableheaders"
                  :items="historyitems"
                  v-if="historyitems"
                >
                  <v-alert
                    slot="no-results"
                    :value="true"
                    color="error"
                    icon="warning"
                    >"{{ search }}" Not Found</v-alert
                  >
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
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
// @ is an alias to /src
import { mapState } from "vuex";
import HeaderTitle from "../components/home/HeaderTitle";

export default {
  name: "HistoryPM25byCountry",
  components: {
    HeaderTitle,
  },
  data: () => ({
    search: "",
    result: false,
    notfound: false,
    countryname: "",
    isLoading: false,
    countryRules: [(v) => !!v || "Country name is required"],
    tableheaders: [
      { text: "Country", value: "country", class: "font-weight-bold" },
      { text: "City", value: "city" },
      { text: "Year", value: "Year" },
      { text: "PM25", value: "pm25" },
    ],
    historyitems: [],
    animateInput: {},
    animateResult: {},
  }),
  created() {
    this.animateInput = this.$store.getters.a_input;
    this.animateResult = this.$store.getters.a_result;
  },
  watch: {
    countryname() {
      if (this.result || this.notfound) {
        this.handleClear();
      }
    },
  },
  computed: {
    ...mapState(["historypm25"]),
  },
  methods: {
    validate() {
      if (this.countryname === "" || !this.countryname) {
        this.$refs.countrynameinput.focus();
      } else {
        this.handleSubmitFind();
      }
    },
    handleSubmitFind() {
      this.isLoading = true;
      this.$store
        .dispatch("getHistorypm25byCountry", this.countryname)
        .then((history) => {
          let { result } = history;
          if (history.result && history.result[0].length > 0) {
            this.historyitems = [...result[0]];
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
      this.result = false;
      this.notfound = false;
      this.historyitems = [];
    },
  },
};
</script>

<style scoped>
.historyPM25byCountry .block-btn {
  height: 100%;
}
</style>
