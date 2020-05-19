<template>
  <div class="insert-air-pollution">
    <HeaderTitle
      line1="Insert the Air Pollution Data"
      line2="by Excel File"
    />
    <div>
      <v-form
        @submit.prevent="validate"
        id="input-excel-file"
        enctype="multipart/form-data"
      >
        <v-container>
          <div class="block-transparent-shadow" v-animate-css="animateinput">
            <v-row>
              <v-col cols="12">
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  ref="excel_file"
                  hidden="hidden"
                  @change="handleSelectFile"
                />
                <div class="block-center btn-upload" @click="handleChoose">
                  <v-icon size="60">mdi-file-excel</v-icon>
                  <br />
                  <div>
                    <span style="fontWeight: bold">Upload Excel File : </span>
                    <span ref="ddd">No File Chosen</span>
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-row v-if="choosed">
              <v-col cols="12">
                <div class="block-center">
                  <div ref="btnupload">
                    <v-btn
                      type="submit"
                      form="input-excel-file"
                      color="grey lighten-1"
                      width="200"
                      >Upload File
                      <v-icon right dark>mdi-cloud-upload</v-icon></v-btn
                    >
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-form>
    </div>
    <div>
      <v-container>
        <p v-animate-css="animateTextInfo">
          <span class="font-weight-bold">Note :</span> Please make sure that the excel file contains columns that match
          the database AirPollutionPM25 table.
        </p>
      </v-container>
    </div>
  </div>
</template>

<script>
import HeaderTitle from "../components/home/HeaderTitle";

export default {
  name: "InsertAirPollution",
  components: {
    HeaderTitle,
  },
  data() {
    return {
      animateinput: {
        classes: "fadeInUp",
        delay: 400,
      },
      animateTextInfo: {
        classes: "fadeInUp",
        delay: 1200,
      },
      excelfile: "",
      choosed: false,
    };
  },
  methods: {
    handleSelectFile() {
      this.excelfile = this.$refs.excel_file.files[0];
      // console.log("selected");
      this.$refs.ddd.innerHTML = this.$refs.excel_file.files[0].name;
      this.choosed = true;
      setTimeout(() => {
        this.$refs.btnupload.classList.add("animated", "pulse");
        setTimeout(() => {
          this.$refs.btnupload.classList.remove("animated", "pulse");
        }, [1000]);
      }, [100]);
    },
    handleChoose() {
      this.$refs.excel_file.click();
    },
    validate() {
      let type = this.excelfile.type;
      if (
        type === "application/vnd.ms-excel" ||
        type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        this.handleUpload();
      } else {
        this.$fire({
          title: "Invalid File Type",
          text: "Please upload only excel file (*.xlsx, *.xls)",
          type: "error",
        });
      }
    },
    handleUpload() {
      let loader = this.$loading.show({
        color: "#ffffff",
        loader: "bars",
        backgroundColor: "#000000",
        // canCancel: true,
      });
      this.$store
        .dispatch("uploadExceltoInsert", this.excelfile)
        .then((result) => {
          loader.hide();
          this.$fire({
            title: "Insert Success",
            text: `${result.message} and then will be update Geom column to point using latitude and longitude data`,
            type: "success",
          }).then(() => {
            loader = this.$loading.show({
              color: "#ffffff",
              loader: "bars",
              backgroundColor: "#000000",
            });
            this.$store
              .dispatch("updateColumGeom")
              .then((result) => {
                this.$fire({
                  title: "Update Success",
                  text: result.message,
                  type: "success",
                });
              })
              .catch((err) => {
                this.$fire({
                  title: "Error",
                  text: err.response.data.message,
                  type: "error",
                });
              })
              .finally(() => {
                loader.hide();
              });
          });
        })
        .catch((err) => {
          this.$fire({
            title: "Error",
            text: err.response.data.message,
            type: "error",
          });
        })
        .finally(() => {
          loader.hide();
        });
    },
  },
};
</script>

<style scoped>
.insert-air-pollution .btn-upload {
  background-color: #209f62;
  flex-direction: column;
  width: 100%;
  height: 240px;
  border: solid;
  border-width: 2px;
  border-color: #bdbdbd;
  cursor: pointer;
}
.insert-air-pollution .btn-upload:hover {
  background-color: #0e723b;
}
</style>
