<template>
  <div class="home">
    <HeaderTitle line1="Spatial Databases and" line2="GIS Applications" />

    <HeaderProject
      head="Project2"
      name="Querying Geospatial Data in RDBMS"
      :animate="animateHome[0]"
    />

    <ExpansionDetail
      :project="project2"
      :animate="animateHome[1]"
      :last="true"
    />

    <HeaderProject
      head="Course Project (as Final Exam)"
      name="Visualizing Air Pollution on a Map"
      :animate="animateHome[2]"
    />

    <ExpansionDetail
      :project="projectfinal1"
      :animate="animateHome[3]"
      :last="false"
    />

    <ExpansionDetail
      :project="projectfinal2"
      :animate="animateHome[4]"
      :last="false"
    />

    <ExpansionDetail
      :project="projectfinal3"
      :animate="animateHome[5]"
      :last="true"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
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
  computed: {
    ...mapState({
      animateHome: state => state?.animated?.a_home,
      project2: state => state?.menu?.menuproject2,
      projectfinal1: state => state?.menu?.menufinal1,
      projectfinal2: state => state?.menu?.menufinal2,
      projectfinal3: state => state?.menu?.menufinal3,
    })
  },
};
</script>

<style scoped></style>
