<template>
  <!-- <div class="MapVisualize"></div> -->
  <v-skeleton-loader class="MapVisualize" type="image"></v-skeleton-loader>
</template>

<script>
import { loadModules } from "esri-loader";

export default {
  name: "MapVisualize",
  props: ["pointlocation", "mapstyle"],
  mounted() {
    this.handleLoadMap();
  },
  beforeDestroy() {
    if (this.view) {
      this.view.container = null;
    }
  },
  watch: {
    mapstyle() {
      this.handleLoadMap();
    },
  },
  methods: {
    mapColorRGB(color_pm25) {
      let color;
      switch (color_pm25) {
        case "green":
          color = [11, 252, 3];
          break;
        case "darkred":
          color = [179, 0, 0];
          break;
        case "red":
          color = [255, 0, 0];
          break;
        case "yellow":
          color = [255, 255, 0];
          break;
        case "darkorange":
          color = [212, 106, 0];
          break;
        case "orange":
          color = [255, 123, 0];
          break;
        default:
          color = [156, 156, 156];
          break;
      }
      return color;
    },
    handleLoadMap() {
      loadModules(
        [
          "esri/Map",
          "esri/views/MapView",
          "esri/Graphic",
          "esri/layers/GraphicsLayer",
        ],
        { css: true }
      )
        .then(([ArcGISMap, MapView, Graphic, GraphicsLayer]) => {
          console.log(this.mapstyle);
          const map = new ArcGISMap({
            basemap: this.mapstyle || "topo-vector",
          });
          this.view = new MapView({
            container: this.$el,
            map: map,
            center: [100.3529072, 13.7251088],
            zoom: 5,
          });

          let graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);

          for (let i = 0; i < this.pointlocation.length; i++) {
            let point = {
              type: "point",
              longitude: this.pointlocation[i].longitude,
              latitude: this.pointlocation[i].latitude,
            };

            let simpleMarkerSymbol = {
              type: "simple-marker",
              size: 4,
              color: this.mapColorRGB(this.pointlocation[i].color_pm25),
              outline: {
                color: [0, 0, 0],
                width: 1,
              },
            };

            let pointGraphic = new Graphic({
              geometry: point,
              symbol: simpleMarkerSymbol,
            });

            graphicsLayer.add(pointGraphic);
          }
        })
        .catch((err) => {
          this.$fire({
            title: "Error",
            text: err.message,
            type: "error",
          });
        });
    },
  },
};
</script>

<style scoped>
.MapVisualize {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
