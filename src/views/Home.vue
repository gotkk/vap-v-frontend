<template>
  <div class="home">
    <HeaderTitle line1="Spatial Databases and" line2="GIS Applications" />

    <HeaderProject
      head="Project2"
      name="Querying Geospatial Data in RDBMS"
      :animate="amimateSeq[0]"
    />

    <ExpansionDetail
      :project="project2"
      :animate="amimateSeq[1]"
      :last="true"
    />

    <HeaderProject
      head="Course Project (as Final Exam)"
      name="Visualizing Air Pollution on a Map"
      :animate="amimateSeq[2]"
    />

    <ExpansionDetail
      :project="projectfinal1"
      :animate="amimateSeq[3]"
      :last="false"
    />

    <ExpansionDetail
      :project="projectfinal2"
      :animate="amimateSeq[4]"
      :last="false"
    />

    <ExpansionDetail
      :project="projectfinal3"
      :animate="amimateSeq[5]"
      :last="true"
    />
  </div>
</template>

<script>
import HeaderTitle from "../components/home/HeaderTitle";
import HeaderProject from "../components/home/HeaderProject";
import ExpansionDetail from "../components/home/ExpansionDetail";
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
          delay: 100,
        },
        {
          classes: "fadeInUp",
          delay: 300,
        },
        {
          classes: "fadeInUp",
          delay: 500,
        },
        {
          classes: "fadeInUp",
          delay: 700,
        },
        {
          classes: "fadeInUp",
          delay: 900,
        },
        {
          classes: "fadeInUp",
          delay: 1100,
        },
      ],
      project2: [],
      projectfinal1: [],
      projectfinal2: [],
      projectfinal3: [],
    };
  },
  mounted() {
    this.initialMenu();
  },
  methods: {
    initialMenu() {
      this.project2 = this.$store.getters.menuproject2;
      this.projectfinal1 = this.$store.getters.menufinal1;
      this.projectfinal2 = this.$store.getters.menufinal2;
      this.projectfinal3 = this.$store.getters.menufinal3;
    },
  },
};
</script>

<style scoped></style>
