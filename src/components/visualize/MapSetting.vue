<template>
  <div class="mapSetting">
    <v-container>
      <div class="block-transparent-shadow"  v-animate-css="animate">
        <v-row>
          <v-col cols="10" offset="1">
            <v-select
              v-model="mapStyle"
              :items="listMapStyle"
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
  name: "MapSetting",
  data() {
    return {
      mapStyle: "",
      listMapStyle: [],
    };
  },
  props: ["animate"],
  created () {
      this.handleGetMapStyle();
  },
  methods: {
      handleGetMapStyle() {
          let list = this.$store.getters.mapstyle;
          this.listMapStyle = [...list]
          this.mapStyle = list[0];
          this.$emit("setstyle",list[0])
      },
      handleSelectMapStyle(value){
          this.$emit("setstyle",value)
      },
  },
};
</script>

<style scoped></style>
