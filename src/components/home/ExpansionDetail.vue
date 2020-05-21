<template>
  <div class="expansionDetail">
    <div>
      <v-container v-if="project.length > 0">
        <div class="mb-12" v-animate-css="animate">
          <v-expansion-panels focusable>
            <v-expansion-panel v-for="(item, i) in project" :key="i">
              <v-expansion-panel-header
                >{{ item.title }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="detail-space">
                  {{ item.detail }}
                  <v-icon class="icon-launch" @click="handleNavigation(i)">mdi-launch</v-icon>
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
  props: ["project", "animate"],
  methods: {
      handleNavigation(index) {
          console.log(index);
      }
  },
};
</script>

<style lang="scss" scoped></style>
