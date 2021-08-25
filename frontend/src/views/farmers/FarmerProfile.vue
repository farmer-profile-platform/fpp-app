<template>
  <div>
    <div id="magnify">
      <h1 onclick="closemagnify()"><i class="fas fa-times"></i></h1>
      <div id="img_here"></div>
    </div>
    <div v-if="loading" style="text-align:center;">
      <i class="el-icon-loading" style="font-size:50px; color:#2fa512;"> </i>
    </div>

    <el-card v-else>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="10" class="d-flex">
          <div>
            <img
              :src="getImageFile(farmer.photo)"
              alt="photo"
              style="width:130px; margin-right: 20px"
            />
          </div>

          <div>
            <h4 id="FarmerName" class="mb-0">{{ farmer.name }}</h4>
            <p style="font-size:12px;">
              <b style="font-size:12px;">ID:</b> {{ farmer.farmerId }}
            </p>
            <p style="font-size:12px;">
              <b style="font-size:12px;">Location:</b> {{ farmer.hometown }}
            </p>
            <p style="font-size: 12px;">
              <b style="font-size:12px;">Phone:</b> {{ farmer.phone }}
            </p>
            <p style="font-size: 12px;">
              <b style="font-size:12px;">Added on:</b>
              {{ getDateFormat(farmer.created) }}
            </p>
            <el-button type="text" size="mini">
              <i class="el-icon-star-on" style="color:gold; font-size:18px"></i>
              4.3</el-button
            >
          </div>
        </el-col>
        <el-col :span="7">
          <el-button size="mini" @click="goBack">
            Back
          </el-button>
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="success"
            @click="showEditModal"
          >
            Edit
          </el-button>
          <el-button
            size="mini"
            icon="el-icon-delete"
            type="danger"
            @click="confirmDelete(farmer._id)"
          >
            Delete
          </el-button>
        </el-col>
      </el-row>
      <el-collapse v-model="activeTab" accordion class="mt-5">
        <el-collapse-item title="Personal Bio" name="personal">
          <el-row
            type="flex"
            class="profile-tab-bg pt-1"
            justify="space-between"
          >
            <el-col :span="5">
              <p>Title</p>
              <h5>{{ farmer.title }}</h5>
            </el-col>
            <el-col :span="6">
              <p>First Name</p>
              <h5>{{ farmer.firstName }}</h5>
            </el-col>
            <el-col :span="6">
              <p>Last Name</p>
              <h5>{{ farmer.lastName }}</h5>
            </el-col>
            <el-col :span="6">
              <p>AKA</p>
              <h5>{{ farmer.aka }}</h5>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            class="profile-tab-bg pt-1"
            justify="space-between"
          >
            <el-col :span="5">
              <p>Age</p>
              <h5>{{ getuserAge(farmer.dob) }} years</h5>
            </el-col>
            <el-col :span="6">
              <p>Phone Number</p>
              <h5>{{ farmer.phone }}</h5>
            </el-col>
            <el-col :span="6">
              <p>Email Address</p>
              <h5>{{ farmer.e_address }}</h5>
            </el-col>
            <el-col :span="6">
              <p>Home Town</p>
              <h5>{{ farmer.hometown }}</h5>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            class="profile-tab-bg pt-1"
            justify="space-between"
          >
            <el-col :span="5">
              <p>Nationality</p>
              <h5>{{ farmer.nationality }}</h5>
            </el-col>
            <el-col :span="6">
              <p>Community of Residence</p>
              <h5>{{ farmer.townOfResidence }}</h5>
            </el-col>
            <el-col :span="6">
              <p>Residential Address</p>
              <h5>{{ farmer.res_address }}</h5>
            </el-col>
            <el-col :span="6">
              <p>Education</p>
              <h5>{{ farmer.education }}</h5>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            class="profile-tab-bg pt-1"
            justify="space-between"
          >
            <el-col :span="5">
              <p>FBO Membership Position</p>
              <h5>{{ farmer.fbo_position }}</h5>
              <br />
              <p>National ID Type</p>
              <h5>{{ farmer.national_id }}</h5>
            </el-col>
            <el-col :span="6">
              <p>Name of FBO Membership</p>
              <h5>{{ farmer.fboMember_name }}</h5>
              <br />
              <p>ID Number</p>
              <h5>{{ farmer.id_number }}</h5>
            </el-col>
            <el-col :span="6">
              <p>Signature/Thumbprint</p>
              <img
                :src="getImageFile(farmer.fingerprint)"
                alt="finger print"
                style="width:100px; border:1px solid white; padding:5px;"
              />
            </el-col>
            <el-col :span="6">
              <p>Id Card</p>
              <img
                :src="getImageFile(farmer.idCard)"
                alt="id card"
                style="width:100px; border:1px solid white; padding:5px;"
              />
            </el-col>
          </el-row>
        </el-collapse-item>

        <el-collapse-item title="Household Info" name="2">
          <div class="profile-tab-bg pt-0">
            <h5 class="mb-1">
              Marital Status: <el-tag>{{ farmer.marital_status }}</el-tag>
            </h5>

            <!-- Spouse Information -->
            <div v-if="farmer.marital_status == 'Married'">
              <h3 class="mb-1">Spouse</h3>
              <div v-for="(spouse, index) in farmer.spouse" :key="index">
                <el-row type="flex" justify="space-between">
                  <el-col :span="5">
                    <p>Spouse Name</p>
                    <h5>{{ spouse.firstName + ' ' + spouse.lastName }}</h5>
                  </el-col>
                  <el-col :span="6">
                    <p>Phone Number</p>
                    <h5>{{ spouse.phone }}</h5>
                  </el-col>
                  <el-col :span="6">
                    <p>Age</p>
                    <h5>{{ getuserAge(spouse.dob) }} years</h5>
                  </el-col>
                  <el-col :span="6"> </el-col> </el-row
                ><br />
              </div>
            </div>

            <br />
            <hr />

            <!-- Children Information -->
            <h3 class="mb-1 mt-1">Children</h3>
            <div v-if="farmer.num_children > 0">
              <p>Number of Children</p>
              <h5>{{ farmer.num_children }}</h5>

              <div v-for="children in farmer.children" :key="children.name">
                <el-row type="flex" justify="space-between" class="mt-1">
                  <el-col :span="5">
                    <p>Child Name</p>
                    <h5>{{ children.name }}</h5>
                  </el-col>
                  <el-col :span="6">
                    <p>Year of Birth</p>
                    <h5>
                      {{ new Date(children.dob).getFullYear() }} (
                      {{ getAgeFromYear(children.dob) }} years )
                    </h5>
                  </el-col>
                  <el-col :span="6"> </el-col>
                  <el-col :span="6"> </el-col>
                </el-row>
                <hr />
              </div>
            </div>
            <div v-else>
              <span>Has no children</span>
            </div>
          </div>
        </el-collapse-item>

        <!-- Farm History -->
        <el-collapse-item title="Farm Info" name="3">
          <div class="profile-tab-bg pt-0">
            <h3 class="mb-1">Farm History</h3>
            <el-row type="flex" justify="space-between">
              <el-col :span="5">
                <p>Years of Farming</p>
                <h5>{{ farmer.years_farming }} years</h5>
              </el-col>
              <el-col :span="5">
                <p>Type of Farmland Ownership</p>
                <h5>{{ farmer.farmLandOwnershipType }}</h5>
              </el-col>
              <el-col :span="8">
                <p>Total Num. of Farmland Cultivated</p>
                <h5>{{ farmer.num_farmLands }} acres</h5>
              </el-col>
              <el-col :span="5">
                <p>GEO Location</p>
                <h5 id="geo">{{ farmer.farm_location }}</h5>
              </el-col>
            </el-row>
            <br />
            <hr />
            <h3 class="mb-1 mt-1">
              Harvest Yield
            </h3>
            <div v-for="(harvest, index) in farmer.harvestYield" :key="index">
              <el-row type="flex" justify="space-between" class="mt-1">
                <el-col :span="5">
                  <p>Crop Name</p>
                  <h5>{{ harvest.crop_name }}</h5>
                </el-col>
                <el-col :span="6">
                  <p>Acres</p>
                  <h5>{{ harvest.acres }} acres</h5>
                </el-col>
                <el-col :span="6"> </el-col>
                <el-col :span="6"> </el-col>
              </el-row>
              <el-row
                type="flex"
                justify="space-between"
                class="mt-1"
                v-for="years in harvest.years"
                :key="years.year"
              >
                <el-col :span="5">
                  <p>Year</p>
                  <h5>{{ years.year }}</h5>
                </el-col>
                <el-col :span="6">
                  <p>Major Season</p>
                  <h5>{{ years.major_season_harvest }} bags</h5>
                </el-col>
                <el-col :span="6">
                  <p>Minor Season</p>
                  <h5>{{ years.minor_season_harvest }} bags</h5>
                </el-col>
                <el-col :span="6">
                  <p>Yearly</p>
                  <h5>{{ years.yearly_harvest }} bags</h5>
                </el-col>
              </el-row>
              <br />
              <hr />
            </div>
            <br />
            <hr />
          </div>
        </el-collapse-item>

        <!-- Farm Yield Income -->
        <el-collapse-item title="Farm Yield Income" name="4">
          <div class="profile-tab-bg pt-0">
            <div
              v-for="(yieldIncome, index) in farmer.harvestYield"
              :key="index"
            >
              <el-row type="flex" justify="space-between" class="mt-1">
                <el-col :span="5">
                  <p>Crop Name</p>
                  <h5 style="color:green;">{{ yieldIncome.crop_name }}</h5>
                </el-col>
                <el-col :span="6">
                  <p>Acres</p>
                  <h5 style="color:green;">{{ yieldIncome.acres }} acres</h5>
                </el-col>
                <el-col :span="6"> </el-col>
                <el-col :span="6"> </el-col>
              </el-row>
              <h3 class="mb-1 mt-1">Yield Income</h3>
              <el-row
                type="flex"
                justify="space-between"
                class="mt-1"
                v-for="year in yieldIncome.years"
                :key="year.year"
              >
                <el-col :span="5">
                  <p>Year</p>
                  <h5>{{ year.year }}</h5>
                </el-col>
                <el-col :span="6">
                  <p>Major Season Income</p>
                  <h5>GH₵ {{ year.major_season_income }}</h5>
                </el-col>
                <el-col :span="6">
                  <p>Minor Season Income</p>
                  <h5>GH₵{{ year.minor_season_income }}</h5>
                </el-col>
                <el-col :span="6">
                  <p>Yearly Income</p>
                  <h5>GH₵{{ year.yearly_income }}</h5>
                </el-col>
              </el-row>
              <hr />
            </div>
          </div>
        </el-collapse-item>

        <!-- Analytics -->
        <el-collapse-item title="Analytics" name="5">
          <div class="profile-tab-bg pt-0">
            <el-row type="flex" justify="space-between">
              <el-col :span="24">
                <div style="text-align:center; margin-bottom: 15px;">
                  <el-button
                    @click="showBarChart = true"
                    size="mini"
                    icon="el-icon-view"
                    >See Farm Income and Input Analysis</el-button
                  >
                </div>
                <el-dialog
                  title="Yearly Farm Yield Income (GH₵)"
                  :visible.sync="showBarChart"
                  width="50%"
                >
                  <div>
                    <DoubleChart :chartData="chartData" v-if="showBarChart" />
                  </div>
                </el-dialog>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>

        <!-- Weather Deatails -->
        <el-collapse-item title="Weather" name="6">
          <div
            id="weather-row"
            class="profile-tab-bg pt-0"
            style="text-align:center;"
          >
            <el-row type="flex" justify="space-between">
              <el-col :span="1">
                <img style="width:150%" src="" id="weathericon" />&nbsp;
              </el-col>
              <el-col :span="7">
                <p>Weather State</p>
                <h5 id="weather"></h5>
              </el-col>
              <el-col :span="8">
                <p>Weather Condition</p>
                <h5 id="condition"></h5>
              </el-col>
              <el-col :span="8">
                <p>Humidity</p>
                <h5 id="humidity"></h5>
              </el-col>
            </el-row>
            <el-row id="sattellite-row">
              <el-col :span="8">
                <p>True Color</p>
                <div class="sattellite">
                  <img style="width:100%" src="" id="truecolor" />
                </div>
              </el-col>
              <el-col :span="8">
                <p>Soil Moisture</p>
                <div class="sattellite">
                  <img style="width:100%" src="" id="falsecolor" />
                </div>
              </el-col>
              <el-col :span="8">
                <p>NDVI</p>
                <div class="sattellite">
                  <img style="width:100%" src="" id="ndvi" />
                </div>
              </el-col>
              <el-col :span="12">
                <p>EVI</p>
                <div class="sattellite">
                  <img style="width:100%" src="" id="evi" />
                </div>
              </el-col>
              <el-col :span="12">
                <p>EVI2</p>
                <div class="sattellite">
                  <img style="width:100%" src="" id="evi2" />
                </div>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>

        <!-- Farm input support -->
        <el-collapse-item title="Farm Input Support" name="7">
          <div
            class="profile-tab-bg pt-0"
            v-if="hasInputSupport(farmer.inputSupports)"
          >
            <div v-for="(support, index) in farmer.inputSupports" :key="index">
              <h4 class="mb-1 mt-1" style="color:green;">{{ support.year }}</h4>
              <el-row
                type="flex"
                justify="space-between"
                class="mt-1"
                v-for="(input, idx) in support.inputs"
                :key="idx"
              >
                <el-col :span="5">
                  <p>Input Type</p>
                  <h5>{{ input.type }}</h5>
                </el-col>
                <el-col :span="5">
                  <p>Input Name</p>
                  <h5>{{ input.name }}</h5>
                </el-col>
                <el-col :span="5">
                  <p>Unit Price</p>
                  <h5>{{ input.unit_price }}</h5>
                </el-col>
                <el-col :span="5">
                  <p>Quantity</p>
                  <h5>{{ input.quantity }}</h5>
                </el-col>
                <el-col :span="5">
                  <p>Total Amount</p>
                  <h5>GH₵ {{ input.total }}</h5>
                </el-col>
              </el-row>
              <el-row type="flex" justify="end" class="mt-1">
                <div>
                  <h5>
                    Grand Total:
                    <span style="color:green;"
                      >GH₵ {{ support.grand_total }}</span
                    >
                  </h5>
                </div> </el-row
              ><br />
              <hr />
            </div>
          </div>
          <div v-else>
            <span>No Input Support Added</span>
          </div>
        </el-collapse-item>

        <!-- Bank Information -->
        <el-collapse-item title="Bank Details" name="8">
          <div class="profile-tab-bg pt-0">
            <div v-for="(bank, index) in farmer.bank" :key="index">
              <h5 class="mb-1 mt-1">
                Bank: <span style="color:green;">{{ bank.name }}</span>
              </h5>
              <h5 class="mb-1 mt-1">
                Branch: <span style="color:green;">{{ bank.branch }}</span>
              </h5>
              <el-row type="flex" justify="space-between" class="mt-1">
                <el-col :span="6">
                  <p>Account Name</p>
                  <h5>{{ bank.acc_name }}</h5>
                </el-col>
                <el-col :span="6">
                  <p>Account Number</p>
                  <h5>{{ bank.acc_number }}</h5>
                </el-col>
                <el-col :span="6">
                  <p>Swift Code</p>
                  <h5>{{ bank.swift_code }}</h5>
                </el-col>
                <el-col :span="3"> </el-col>
              </el-row>
              <br />
              <hr />
            </div>

            <!-- Mobile Money -->
            <h5 class="mb-1 mt-1">Mobile Money</h5>
            <el-row
              type="flex"
              justify="space-between"
              class="mt-1"
              v-for="momo in farmer.momo"
              :key="momo.phone"
            >
              <el-col :span="6">
                <p>MoMo Number</p>
                <h5>{{ momo.phone }}</h5>
              </el-col>
              <el-col :span="6">
                <p>Account Name</p>
                <h5>{{ momo.name }}</h5>
              </el-col>
              <el-col :span="6">
                <p>Network</p>
                <h5>MTN</h5>
              </el-col>
              <el-col :span="3"> </el-col>
            </el-row>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>

    <!-- Edit farmer details -->
    <el-dialog :visible.sync="showEditFarmerModal" fullscreen>
      <template slot="title">
        <h3>{{ editTitle }}</h3>
        <p>Edit field and make sure all required fields has data.</p>
      </template>
      <EditFarmerDetails
        v-if="showEditFarmerModal"
        :farmer.sync="farmer"
        v-on:editedFarmer="farmerEdited"
      />
    </el-dialog>
  </div>
</template>

<script>
import DoubleChart from '@/components/charts/DoubleChart';
import dashboardService from '@/api/reports';
import farmersService from '@/api/farmers';
import EditFarmerDetails from './EditFarmerDetails';
import jQuery from '../../../node_modules/jquery';
var $ = jQuery;
window.$ = $;
const weather = require('@/api/weather');

export default {
  name: 'FarmerProfile',
  components: {
    EditFarmerDetails,
    DoubleChart,
  },
  data() {
    return {
      weatherContent: { data: 'test' },
      showBarChart: false,
      showEditFarmerModal: false,
      editTitle: '',
      activeTab: 'personal',
      loading: true,
      farmer: {},
      chartData: {},
      chartLoaded: false,
    };
  },
  created() {
    this.getFarmer();
  },
  methods: {
    getFarmer() {
      farmersService
        .getFarmer(this.$route.query.farmer)
        .then(response => {
          this.farmer = response.data;
          this.farmer.name = this.farmer.firstName + ' ' + this.farmer.lastName;
          this.farmer.created = this.farmer.createdAt
            ? this.farmer.createdAt
            : Date.now();
          this.getFarmerAnalysis(this.farmer._id);
          this.weatherData();
          this.loading = false;
        })
        .catch(errors => {
          this.loading = false;
          this.errorMessage(errors.error);
          this.errorMessage('Farmer data failed to fetch');
        });
    },
    magnify() {
      (function($) {
        $(document).ready(function() {
          $('#magnify').fadeIn();
          var imglink = $('#truecolor').attr('src');
          $('#img_here').css('background', `url('${imglink}') center center`);
          $('#magnify').css('display', 'flex');
          console.log('Magnified');
        })(jQuery);
      });
    },
    closemagnify() {
      $('#magnify').fadeOut();
      setTimeout(function() {
        $('#magnify').css('display', 'none');
        $('#img_here').css('background', `url('') center center`);
      }, 800);
    },
    weatherData() {
      (function($) {
        $(document).ready(function() {
          $('#weather-row').hide();
          console.log($('#geo').html());
          var gps = $('#geo').html();
          if (gps != '') {
            var geo = String($('#geo').html()).split(',');
            var lat = geo[0];
            var lon = geo[1];
            var BK_URL;
            let hn = window.location.hostname;
            if (hn === 'localhost') {
              BK_URL = 'http://127.0.0.1:5000/';
            } else if (hn == 'fppghana.com') {
              BK_URL = 'https://api.fppghana.com/';
            } else {
              BK_URL = 'https://api.fppghana.com/';
            }
            var Httpreq = new XMLHttpRequest();
            Httpreq.open('GET', BK_URL + 'coordinates.json', false);
            Httpreq.setRequestHeader('Access-Control-Allow-Origin', '*');
            Httpreq.setRequestHeader('Content-type', 'application/json');
            Httpreq.withCredentials = false;
            Httpreq.send(null);
            var farmer = $('#FarmerName').html();
            var coordinates = null;
            let json = JSON.parse(Httpreq.responseText);
            for (let i = 0; i < json.length; i++) {
              if (json[i].name == farmer) {
                coordinates = json[i].coordinates;
                break;
              }
            }
            console.log(farmer);
            console.log(coordinates);
            //var coordinates = [[-121.1958,37.6683],[-121.1779,37.6687],[-121.1773,37.6792],[-121.1958,37.6792],[-121.1958,37.6683]];
            if (coordinates != null) {
              weather.getFarmWeather(coordinates, lat, lon, function(data) {
                $('#weather').html(data.weather);
                $('#condition').html(data.condition);
                $('#weathericon').attr(
                  'src',
                  'http://openweathermap.org/img/wn/' + data.icon + '@2x.png'
                );
                $('#humidity').html(data.humidity);
                $('#truecolor').attr('src', data.truecolor);
                $('#falsecolor').attr('src', data.falsecolor);
                $('#ndvi').attr('src', data.ndvi);
                $('#evi').attr('src', data.evi);
                $('#evi2').attr('src', data.evi2);
                $('.sattellite').attr(
                  'style',
                  'margin: 10px;border: 1px solid black;background: white;border-radius: 5px;'
                );
                $('#weather-row').show();
              });
            } else {
              weather.getweather(lat, lon, function(data) {
                var forcast = data;
                var weth = JSON.stringify(data.weather);
                var w = weth.substr(1, weth.length);
                var j = JSON.parse(w.substr(0, w.length - 1));
                console.log(j.main);
                $('#weather').html(j.main);
                $('#condition').html(j.description);
                $('#weathericon').attr(
                  'src',
                  'http://openweathermap.org/img/wn/' + j.icon + '@2x.png'
                );
                $('#humidity').html(forcast.main.humidity);
                $('#weather-row').show();
                $('#sattellite-row').hide();
              });
            }
          } else {
            $('#weather-row').html('No GEO Location found');
          }
        });
      })(jQuery);
    },
    getFarmerAnalysis(farmerId) {
      dashboardService
        .getFarmerReports(farmerId)
        .then(response => {
          let inputTotal = response.data.inputSupport;

          let harvestYieldIncome = response.data.harvestIncome.map(element => {
            delete element._id;
            return element;
          });

          let harvestedBags = response.data.harvestedBags.map(element => {
            delete element._id;
            return element;
          });

          if (Array.isArray(inputTotal) && inputTotal.length) {
            let inputInfo = inputTotal.map(element => {
              delete element._id;
              return element;
            });

            if (inputInfo.length !== harvestYieldIncome.length) {
              inputInfo.unshift({ label: '', y: 0 });
            }

            this.chartData.inputInfo = inputInfo;
          } else {
            this.chartData.inputInfo = [{ label: '', y: 0 }];
          }

          this.chartData.harvestIncome = harvestYieldIncome;
          this.chartData.harvestedBags = harvestedBags;
        })
        .catch(errors => {
          this.errorMessage(errors.error);
        });
    },
    showEditModal() {
      this.editTitle = 'Edit Farmer Details for ' + this.farmer.name;
      this.showEditFarmerModal = true;
    },
    farmerEdited() {
      this.showEditFarmerModal = false;
      this.getFarmer();
    },
    confirmDelete(id) {
      this.$confirm('This will permanently delete farmer data', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(() => {
          this.deleteFarmer(id);
        })
        .catch(() => {
          this.errorMessage('Delete cancelled');
        });
    },
    deleteFarmer(id) {
      farmersService
        .deleteFarmer(id)
        .then(() => {
          this.successNotification('Success', 'Farmer deleted successfully');
          this.$router.go(-1);
        })
        .catch(errors => {
          this.errorMessage(errors.error);
        });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
