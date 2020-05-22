<template>
  <div class="mapSetting">
    <v-container>
      <div class="block-transparent-shadow" v-animate-css="animate">
        <v-row>
          <v-col cols="12" sm="6" lg="5" offset-lg="1">
            <v-select
              v-model="year"
              :items="yearList"
              @change="handleSelectYear"
              label="Select Visualize Other Years"
              prepend-icon="mdi-map"
              menu-props="auto"
              hide-details
              outlined
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" lg="5">
            <v-select
              v-model="mapStyle"
              :items="mapStyleList"
              @change="handleSelectMapStyle"
              label="Select Visualize Map Style"
              prepend-icon="mdi-map"
              menu-props="auto"
              hide-details
              outlined
            ></v-select>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "MapDataSetting",
  data() {
    return {
      mapStyle: "",
      mapStyleList: [],
      year: "",
      yearList: [],
    };
  },
  props: ["animate", "yearlist"],
  created() {
    this.handleGetMapStyle();
  },
  methods: {
    handleGetMapStyle() {
      let data_year = this.yearlist;
      let data_style = this.$store.getters.mapstyle;
      this.mapStyle = data_style[0];
      this.mapStyleList = [...data_style];
      this.year = data_year[0];
      this.yearList = [...data_year];
      this.$emit("setstyle", data_year[0]);
    },
    handleSelectMapStyle(value) {
      this.$emit("setstyle", value);
    },
    handleSelectYear(value) {
      this.$emit("setyear", value);
    },
  },
};
</script>

<style scoped></style>
