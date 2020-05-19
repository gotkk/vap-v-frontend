<template>
  <v-container>
    <div class="xx"></div>
  </v-container>
</template>

<script>
import { loadModules } from "esri-loader";

export default {
  name: "web-map",
  props: ["pointlocation"],
  mounted() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(
      [
        "esri/Map",
        "esri/views/MapView",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
      ],
      { css: true }
    ).then(([ArcGISMap, MapView, Graphic, GraphicsLayer]) => {
      let pointlocation = [
        {
          latitude: 14.12,
          longitude: 101,
          color_pm25: "green",
        },
        {
          latitude: 14.13,
          longitude: 101,
          color_pm25: "darkred",
        },
        {
          latitude: 14.14,
          longitude: 101,
          color_pm25: "red",
        },
        {
          latitude: 14.15,
          longitude: 101,
          color_pm25: "yellow",
        },
        {
          latitude: 14.16,
          longitude: 101,
          color_pm25: "darkorange",
        },
        {
          latitude: 14.17,
          longitude: 101,
          color_pm25: "orange",
        },
      ];

      var map = new ArcGISMap({
        basemap: "topo-vector",
      });

      this.view = new MapView({
        container: this.$el,
        map: map,
        center: [101, 14.2],
        // center: [-118.805, 34.027],
        zoom: 10,
      });

      var graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);

      for (let i = 0; i < pointlocation.length; i++) {
        let point = {
          type: "point",
          longitude: pointlocation[i].longitude,
          latitude: pointlocation[i].latitude,
        };
        let color;
        switch (pointlocation[i].color_pm25) {
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

        var simpleMarkerSymbol = {
          type: "simple-marker",
          color: color,
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
    });
  },
  beforeDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  },
};
</script>

<style scoped>
.xx {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
