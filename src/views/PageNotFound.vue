<template>
  <div class="pageNotFound">
    <div class="d-flex flex-column justify-center align-center block-not-found" v-animate-css="animateResult">
      <span class="display-2 mb-8">404 Page Not Found</span>
      <span class="headline">Path : {{path}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "PageNotFound",
  computed: {
      path() {
          return this.$router.currentRoute.fullPath; 
      },
      ...mapState({
          animateResult: state => state.animated.a_notfound
      })
  },
};
</script>

<style scoped>
.pageNotFound .block-not-found {
  height: 90vh;
}
</style>
