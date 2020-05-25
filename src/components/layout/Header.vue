<template>
  <div id="header">
    <v-navigation-drawer v-model="drawer" app temporary width="290">
      <v-list dense>
        <v-list-item
          link
          v-for="(item, index) in menu"
          :key="index"
          :to="item.path"
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
      <div class="d-flex justify-center align-center btn-nav-menu" @click.stop="drawer = !drawer">
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
    menu: [],
  }),
  created() {
    this.initMenu();
    // this.$vuetify.theme.dark = true;
  },
  methods: {
    initMenu(){
      this.$store.dispatch("getMenu");
      this.menu = this.$store.getters.allmenu;
    }
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
