<template>
  <div class="headertitle">
    <div class="block-center">
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="block-center block-column">
              <span class="text-head" v-animate-css="'fadeInDown'">{{line1}}</span>
              <span class="text-head" v-animate-css="'fadeInUp'">{{line2}}</span>
            </div>
          </v-col>
          </v-row>
        </v-container>
    </div>
  </div>
</template>

<script>
export default {
    name: 'HeaderTitle',
    props: [
      "line1",
      "line2"
    ]
};
</script>

<style scoped>
.headertitle .block-column{
    flex-direction: column;
}
.headertitle .text-head {
  font-size: 22px;
  font-weight: bold;
}
</style>