<template>
  <div class="countryArea">
    <HeaderTitle line1="Calculate Country Area" line2="by Country Name" />

    <div>
      <v-form @submit.prevent="validate" id="input-country">
        <v-container>
          <div class="block-transparent-shadow" v-animate-css="animateinput">
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
        <div
          class="block-transparent-shadow"
          v-animate-css="'bounce'"
          ref="blocknanimation"
        >
          <v-row>
            <v-col cols="12" sm="10" offset-sm="1">
              <div class="block-center">
                <span class="title">{{ resultcountryname }}</span>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="10" offset-sm="1">
              <span>The area is</span>
              <v-text-field v-model="area" disabled></v-text-field>
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
  name: "CountryArea",
  components: {
    HeaderTitle,
  },
  data: () => ({
    result: false,
    notfound: false,
    countryname: "",
    resultcountryname: "",
    isLoading: false,
    area: "",
    countryRules: [(v) => !!v || "Country name is required"],
    animateinput: {
      classes: "flipInX",
      delay: 800,
    },
  }),
  watch: {
    countryname() {
      if (this.result || this.notfound) {
        this.handleClear();
      }
    },
  },
  computed: {
    ...mapState(["country"]),
  },
  methods: {
    validate() {
      if (this.countryname === "" || !this.countryname) {
        this.$refs.countrynameinput.focus();
      } else {
        this.handleSubmitCalculate();
      }
    },
    handleSubmitCalculate() {
      // let loader = this.$loading.show({
      //   color: "#ffffff",
      //   loader: "bars",
      //   backgroundColor: "#000000"
      // });
      this.isLoading = true;
      this.$store
        .dispatch("getAreaFromName", this.countryname)
        .then((country) => {
          if (country.length > 0) {
            this.resultcountryname = country[0].Name;
            this.area = country[0].Area;
            this.result = true;
            this.notfound = false;
          } else {
            this.resultcountryname = "";
            this.area = "";
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
          // loader.hide();
          this.isLoading = false;
        });
    },
    handleClear() {
      this.resultcountryname = "";
      this.area = "";
      this.result = false;
      this.notfound = false;
    },
  },
};
</script>

<style scoped>
.countryArea .block-btn {
  height: 100%;
}
</style>
