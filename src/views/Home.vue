<template>
  <div class="home">
    <div class="block-center">
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="block-center block-column">
              <span class="text-head" v-animate-css="'fadeInDown'">Calculate Country Area</span>
              <span class="text-head" v-animate-css="'fadeInUp'">by Country Name</span>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="block-content">
      <v-form @submit.prevent="validate" id="input-country">
        <v-container>
          <div class="block" v-animate-css="'flipInX'">
            <v-row>
              <v-col cols="12" md="7" offset-md="1">
                <v-text-field
                  v-model="countryname"
                  :rules="countryRules"
                  ref="countrynameinput"
                  label="Country Name"
                  clearable
                  autocomplete="false"
                  required
                  @click:clear="handleClear()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <div class="block-center block-btn">
                  <v-btn type="submit" form="input-country" color="grey lighten-1" block>Search</v-btn>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-form>
    </div>

    <div class="block-content">
      <v-container v-if="result">
        <div class="block" v-animate-css="'bounce'" ref="blocknanimation">
          <v-row>
            <v-col cols="12" md="10" offset-md="1">
              <span>Country is</span>
              <v-text-field v-model="resultcountryname" disabled></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="10" offset-md="1">
              <span>Area is</span>
              <v-text-field v-model="area" disabled></v-text-field>
            </v-col>
          </v-row>
        </div>
      </v-container>
      <v-container v-if="notfound">
        <div class="block" v-animate-css="'bounce'" ref="blocknanimation">
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

export default {
  name: "Home",
  components: {},
  data: () => ({
    result: false,
    notfound: false,
    countryname: "",
    resultcountryname: "",
    area: "",
    countryRules: [v => !!v || "Country name is required"]
  }),
  updated() {
    if(this.countryname === ""){
      if(this.result||this.notfound){
        this.handleClear();
      }
    }
  },
  computed: {
    ...mapState(["country"])
  },
  methods: {
    validate() {
      if (this.countryname === "") {
        this.$refs.countrynameinput.focus();
      } else {
        this.handleSubmitCalculate();
      }
    },
    handleSubmitCalculate() {
      this.$store
        .dispatch("getAreaFromName", this.countryname)
        .then(country => {
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
          if(this.$refs.blocknanimation){
            this.$refs.blocknanimation.classList.add("animated", "bounce");
            setTimeout(() => {
              this.$refs.blocknanimation.classList.remove("animated", "bounce");
            }, [1000]);
          }
        });
    },
    setResult() {
      if (this.$store.getters.country.length > 0) {
        this.resultcountryname = this.$store.getters.country[0].Name;
      } else {
        this.resultcountryname = "";
      }
    },
    handleClear(){
      this.result = false;
      this.notfound = false;
    }
  }
};
</script>

<style scoped>
.home .block-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.home .text-head {
  font-size: 24px;
  font-weight: bold;
}
.home .block {
  padding: 16px;
  box-shadow: inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255),
    0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
}
.home .block-btn {
  height: 100%;
}
.home .block-column {
  flex-direction: column;
}

.home .block-content {
  margin-bottom: 20px;
}
</style>
