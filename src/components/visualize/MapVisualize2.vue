<template>
  <!-- <div class="MapVisualize2"></div> -->
  <v-skeleton-loader class="MapVisualize2" type="image"></v-skeleton-loader>
</template>

<script>
import { loadModules } from "esri-loader";

export default {
  name: "MapVisualize2",
  props: {
    pointLocation1: Array,
    pointLocation2: Array,
    polygonLocation: Array,
    mapStyle: {
      type: String,
      default: "dark-gray-vector",
    },
    year: {
      type: String,
      default: "0",
    },
  },
  mounted() {
    this.handleLoadMap();
  },
  beforeDestroy() {
    if (this.view) {
      this.view.container = null;
    }
  },
  watch: {
    mapStyle() {
      this.handleLoadMap();
    },
    year() {
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
          color = [156, 156, 156, 0.7];
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
      ).then(([ArcGISMap, MapView, Graphic, GraphicsLayer]) => {
        const map = new ArcGISMap({
          basemap: this.mapStyle || "topo-vector",
        });
        this.view = new MapView({
          container: this.$el,
          map: map,
          center: [100.3529072, 13.7251088],
          zoom: 5,
        });

        let graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);

        this.addPoint(this.pointLocation1, Graphic, graphicsLayer);

        this.polygonLocation?.[0]?.[0] &&
          this.addPolygon(Graphic, graphicsLayer);

        this.addPoint(this.pointLocation2, Graphic, graphicsLayer);
      });
    },
    addPoint(pointlocation, Graphic, graphicsLayer) {
      for (let i = 0; i < pointlocation.length; i++) {
        let point = {
          type: "point",
          longitude: pointlocation[i].longitude,
          latitude: pointlocation[i].latitude,
        };

        let simpleMarkerSymbol = {
          type: "simple-marker",
          size: 4,
          color: this.mapColorRGB(pointlocation[i].color_pm25),
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
    },
    addPolygon(Graphic, graphicsLayer) {
      let polygon = {
        type: "polygon",
        rings: this.polygonLocation,
      };

      let simpleFillSymbol = {
        type: "simple-fill",
        color: [0, 0, 0, 0.7],
      };

      let polygonGraphic = new Graphic({
        geometry: polygon,
        symbol: simpleFillSymbol,
      });
      graphicsLayer.add(polygonGraphic);
    },
  },
};
</script>

<style scoped>
.MapVisualize2 {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
