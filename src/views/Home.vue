<template>
  <div class="home">
    <HeaderTitle line1="Spatial Databases and" line2="GIS Applications" />

    <HeaderProject head="Project2" name="Querying Geospatial Data in RDBMS" :animate="amimateSeq[0]"/>

    <div>
      <v-container v-if="project2.length > 0">
        <div class="mb-12" v-animate-css="amimateSeq[1]">
          <v-expansion-panels focusable>
            <v-expansion-panel v-for="(item, i) in project2" :key="i">
              <v-expansion-panel-header
                >{{ item.title }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="detail-space">{{ item.detail }} <v-icon class="icon-launch">mdi-launch</v-icon></p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-container>
    </div>

    <ExpansionDetail :project="project2" :animate="amimateSeq[1]"/>

    <HeaderProject head="Course Project (as Final Exam)" name="Visualizing Air Pollution on a Map" :animate="amimateSeq[2]"/>

    <div>
      <v-container>
        <div class="mb-5" v-animate-css="amimateSeq[3]">
          <v-expansion-panels focusable>
            <v-expansion-panel v-for="(item, i) in projectfinal1" :key="i">
              <v-expansion-panel-header>{{
                item.title
              }}</v-expansion-panel-header>
              <!-- <v-divider></v-divider> -->
              <v-expansion-panel-content>
                <p class="detail-space">{{ item.detail }} <v-icon class="icon-launch">mdi-launch</v-icon></p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-container>
    </div>

    <div>
      <v-container>
        <div class="mb-5" v-animate-css="amimateSeq[4]">
          <v-expansion-panels focusable inset>
            <v-expansion-panel v-for="(item, i) in projectfinal2" :key="i">
              <v-expansion-panel-header>{{
                item.title
              }}</v-expansion-panel-header>
              <!-- <v-divider></v-divider> -->
              <v-expansion-panel-content>
                <p class="detail-space">{{ item.detail }} <v-icon class="icon-launch">mdi-launch</v-icon></p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-container>
    </div>

    <div>
      <v-container>
        <div class="mb-12" v-animate-css="amimateSeq[5]">
          <v-expansion-panels focusable inset>
            <v-expansion-panel v-for="(item, i) in projectfinal3" :key="i">
              <v-expansion-panel-header>{{
                item.title
              }}</v-expansion-panel-header>
              <!-- <v-divider></v-divider> -->
              <v-expansion-panel-content>
                <p class="detail-space">{{ item.detail }} <v-icon class="icon-launch">mdi-launch</v-icon></p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import HeaderTitle from '../components/home/HeaderTitle';
import HeaderProject from '../components/home/HeaderProject';
import ExpansionDetail from '../components/home/ExpansionDetail';
export default {
  name: "Home",
  components: {
    HeaderTitle,
    HeaderProject,
    ExpansionDetail,
  },
  data() {
    return {
      amimateSeq: [
        {
          classes: "fadeInUp",
          delay: 300,
        },
        {
          classes: "fadeInUp",
          delay: 600,
        },
        {
          classes: "fadeInUp",
          delay: 900,
        },
        {
          classes: "fadeInUp",
          delay: 1200,
        },
        {
          classes: "fadeInUp",
          delay: 1500,
        },
        {
          classes: "fadeInUp",
          delay: 1800,
        },
      ],
      project2: [],
      projectfinal1: [],
      projectfinal2: [],
      projectfinal3: [],
    };
  },
  mounted() {
    this.$store.dispatch("getMenu");
    this.project2 = this.$store.getters.menuproject2;
    this.projectfinal1 = this.$store.getters.menufinal1;
    this.projectfinal2 = this.$store.getters.menufinal2;
    this.projectfinal3 = this.$store.getters.menufinal3;
  },
};
</script>

<style scoped>
.home .detail-space {
  margin-top: 32px !important;
}
.home .icon-launch:hover{
  color: #037ffc;
  cursor: pointer;
}
</style>
