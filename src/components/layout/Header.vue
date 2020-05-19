<template>
  <div id="header">
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list dense>
        <v-list-item
          link
          v-for="(item, index) in menu"
          :key="index"
          :to="item.path"
          @click="setActiveTitle(item.title)"
        >
          <v-list-item-action>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <div>
      <div class="block-center btn-nav-menu" @click.stop="drawer = !drawer">
        <v-icon size="34">mdi-menu</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    source: String,
  },
  data: () => ({
    drawer: false,
    activeTitle: "Application",
    menu: [
      {
        path: "/",
        icon: "mdi-home-circle",
        title: "Home",
      },
      {
        path: "/country_area",
        icon: "mdi-map",
        title: "Country Area (Project2)",
      },
      {
        path: "/insert_airpollution",
        icon: "mdi-arrow-collapse-down",
        title: "Insert AirPollutionPM25",
      },
      {
        path: "/history_pm25_country",
        icon: "mdi-file-document",
        title: "Historical PM25 by Country",
      },
      {
        path: "/total_population",
        icon: "mdi-file-document",
        title: "Total of Population",
      },
      {
        path: "/all_point_all_country",
        icon: "mdi-file-document",
        title: "All City Point of All Country",
      },
    ],
  }),
  mounted() {
    this.initActiveTitle();
  },
  created() {
    // this.$vuetify.theme.dark = true;
  },
  methods: {
    initActiveTitle() {
      let pathtemp = this.$router.currentRoute.path;
      for (let i = 0, arri = this.menu.length; i < arri; ++i) {
        if (this.menu[i].path === pathtemp) {
          this.setActiveTitle(this.menu[i].title);
          break;
        }
      }
    },
    setActiveTitle(title) {
      this.activeTitle = title;
    },
  },
};
</script>

<style scoped>
.btn-nav-menu {
  width: 50px;
  height: 50px;
  position: absolute;
  z-index: 1;
  cursor: pointer;
}
.btn-nav-menu:hover {
  background-color: #c7c7c7;
}
</style>
