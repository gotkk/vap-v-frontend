<template>
  <div class="insert-air-pollution">
    <HeaderTitle line1="Insert the Air Pollution Data" line2="by Excel File" />

    <div>
      <v-form
        @submit.prevent="validate"
        id="input-excel-file"
        enctype="multipart/form-data"
      >
        <v-container>
          <div class="block-transparent-shadow" v-animate-css="animateInput">
            <v-row>
              <v-col cols="12">
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  ref="excel_file"
                  hidden="hidden"
                  @change="handleSelectFile"
                />
                <div
                  class="block-center btn-upload-download"
                  @click="handleChoose"
                >
                  <v-icon size="60">mdi-file-excel</v-icon>
                  <br />
                  <div>
                    <span class="font-weight-bold">Upload Excel File : </span>
                    <span ref="file">No File Chosen</span>
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
                      class="white--text"
                      color="teal"
                      width="200"
                    >
                      <v-icon dark>mdi-cloud-upload</v-icon>
                      <span class="pl-3">Upload File</span>
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-form>
    </div>

    <Note :animate="animateNote" :text="note" />

    <div>
      <v-container>
        <v-row>
          <v-col class="d-flex justify-center pb-10">
            <div v-animate-css="animateDownload">
              <v-btn
                color="green darken-3"
                class="ma-2 white--text"
                :loading="loadingDownload"
                @click="handleDownload"
              >
                <v-icon dark>mdi-cloud-download</v-icon>
                <span class="pl-3">Download Template</span>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HeaderTitle from "../components/home/HeaderTitle";
import Note from "../components/mock/Note";

export default {
  name: "InsertAirPollution",
  components: {
    HeaderTitle,
    Note,
  },
  data() {
    return {
      excelfile: "",
      note: `Please make sure that the excel file contains columns that match 
      the AirPollutionPM25 table as follow the template and use data only first sheet.`,
      choosed: false,
      loadingDownload: false,
    };
  },
  computed: {
    ...mapState({
      animateNote: (state) => state?.animated?.a_note,
      animateInput: (state) => state?.animated?.a_input,
      animateResult: (state) => state?.animated?.a_result,
      animateDownload: (state) => state?.animated?.a_download,
    }),
  },
  methods: {
    handleSelectFile() {
      this.excelfile = this.$refs.excel_file.files[0];
      this.$refs.file.innerHTML = this.$refs.excel_file.files[0].name;
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
          loader.hide();
          this.$fire({
            title: "Error",
            text: err.response.data.message,
            type: "error",
          });
        });
    },
    handleDownload() {
      this.loadingDownload = true;
      this.$store
        .dispatch("getInsertTemplate")
        .catch((err) => {
          this.$fire({
            title: "Error",
            text: err.message,
            type: "error",
          });
        })
        .finally(() => {
          this.loadingDownload = false;
        });
    },
  },
};
</script>

<style scoped></style>
