<template>
  <div class="expansionDetail">
    <div>
      <v-container v-if="project.length > 0">
        <!-- <div class="mb-12" v-animate-css="animate"> -->
        <div :class="{ 'mb-5': last }" class="mb-2" v-animate-css="animate">
          <v-expansion-panels focusable inset>
            <v-expansion-panel v-for="(item, i) in project" :key="i">
              <v-expansion-panel-header
                >{{ item.title }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="detail-space">
                  {{ item.detail }}
                  <v-icon
                    class="icon-launch"
                    @click="handleNavigation(item.path)"
                    >mdi-launch</v-icon
                  >
                </p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpansionDetail",
  props: {
    project: {
      type: Array,
      default: () => [],
    },
    animate: [Object, Array],
    last: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleNavigation(path) {
      this.$router.push({ path: path });
    },
  },
};
</script>

<style scoped>
.expansionDetail .detail-space {
  margin-top: 32px !important;
}
.expansionDetail .icon-launch {
  color: #037ffc;
  cursor: pointer;
}
.expansionDetail .icon-launch:hover {
  color: #005fa3;
  cursor: pointer;
}
</style>
