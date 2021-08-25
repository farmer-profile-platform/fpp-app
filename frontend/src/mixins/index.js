import is from 'is_js';
import authService from "@/api/auth";
import activityService from '@/api/activities';
import farmersService from '../api/farmers';
import { mapGetters } from "vuex"

export default {
  data() {
    return {
      photo: 'no-photo',
      fingerPrint: 'no-photo',
      idCard: 'no-photo'
    }
  },
  computed: {
    ...mapGetters({
      newFarmersOffline: 'getNewFarmersOffline',
    })
  },
  methods: {
    getGreetings() {
      let today = new Date()
      let curHr = today.getHours()

      if (curHr < 12) {
        return 'Good Morning'
      } else if (curHr < 18) {
        return 'Good Afternoon'
      } else {
        return 'Good Evening'
      }
    },
    getAgeFromYear(date) {
      let newdate = new Date(date);
      let year = newdate.getFullYear();
      let age = 2021 - year
      return age;
    },
    hasInputSupport(inputSupports) {
      let s = inputSupports;
      return Array.isArray(s) && s.length;
    },
    syncOfflineFarmersData() {
      let self = this;
      if (this.newFarmersOffline.length > 0) {
        this.newFarmersOffline.forEach(function (farmer) {
          if (farmer.fingerprint !== "no-photo.jpg" && farmer.photo !== "no-photo.jpg") {

            self.dataURLtoFile(farmer.fingerprint, farmer.fingerprintFileName, 'fingerPrint')
            self.dataURLtoFile(farmer.photo, farmer.photoFileName, 'photo')

            self.dataURLtoFile(farmer.idCard, farmer.idCardFileName, 'idCard')

            farmer.photo = 'img_' + farmer.photoFileName;
            farmer.fingerprint = 'img_' + farmer.fingerprintFileName;
            farmer.idCard = 'img_' + farmer.idCardFileName;
          }
          self.addNewData(farmer)
          return farmer;
        })
      } else {
        this.$store.dispatch('emptyFarmerData')
      }
    },
    dataURLtoFile(base64Url, fileName, type) {
      let self = this;
      const imageType = fileName.split('.')[1];

      fetch(base64Url)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], fileName, {
            type: `image/${imageType}`,
          });

          const formData = new FormData();
          formData.append('file', file);

          farmersService.uploadFarmerFiles(formData)
            .then((response) => {
              if (type == 'photo') {
                base64Url = response.data;
              } else if (type == 'idCard') {
                base64Url = response.data;
              } else if (type == 'fingerPrint') {
                base64Url = response.data;
              }
              self.successNotification(`${type} Uploaded Successfully`);
            })
            .catch(() => {
              self.errorMessage(`${type} failed to upload`);
            });
        });
      // return new Promise(function (resolve) {
      //   resolve(userFiles.fingerPrint);
      // })
    },
    addNewData(farmerData) {
      farmersService
        .addFarmer(farmerData)
        .then(() => {
          this.$store.dispatch('emptyFarmerData')
        })
        .catch(() => {
          this.$store.dispatch('emptyFarmerData')
          this.errorMessage('Failed to save farmer offline, some information may be invalid.');
        });
    },
    checkInternet() {
      if (navigator.onLine) {
        this.$store.dispatch('update_internet_status', navigator.onLine);
      } else {
        alert(
          'Hey! Looks like there is no connection which will retrict you in performing some tasks. Its advisable to not logout from system untill you have connection back.'
        );
        this.$store.dispatch('update_internet_status', navigator.onLine);
      }
      return navigator.onLine;
    },
    ucwords: function (str) {
      if (typeof str !== 'undefined') {
        return str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
          return letter.toUpperCase()
        })
      } else {
        return str
      }
    },
    getDateFormat(currentDate) {
      if (currentDate) {
        const date = new Date(currentDate)
        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
        const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(date)

        return `${day}-${month}-${year}`
      } else {
        return 'None';
      }
    },
    getActivityColor(action) {
      let color;
      switch (action) {
        case 'Support Added':
          color = "#f7ba2a;"
          break;
        case 'Edited':
          color = "#044b74"
          break;
        case 'Added':
          color = "#2fa512"
          break;
        case 'Deleted':
          color = "#ff4949"
          break;
        case 'Support Deleted':
          color = "red"
          break;
        case 'Support Updated':
          color = "blue"
          break;
      }
      return color
    },
    getIssueType(type) {
      let color;
      switch (type) {
        case 'App Malfunction':
          color = "danger"
          break;
        case 'Offline Issue':
          color = "warning"
          break;
        case 'Dashboard Issue':
          color = "info"
          break;
        case 'Can\'t query data':
          color = "danger"
          break;
        case 'Other':
          color = "primary"
          break;
      }
      return color
    },
    addActivity(farmer, action) {
      let activity = {}
      activity.action = action
      activity.name = farmer.name;
      activity.farmerId = farmer._id;
      activity.user = "";

      activityService.addActivity(activity)
        .then(() => { })
        .catch((errors) => this.errorMessage(errors.error));
    },
    getPercentageData(data, total) {
      let percentage = data / total * 100
      percentage = Math.round(percentage)
      return percentage;
    },
    getHostName() {
      let hn = window.location.hostname
      let uploadUrl = hn == 'localhost' ? "http://127.0.0.1:5000/uploads/" : "https://fppapi.icu/uploads/"
      return uploadUrl;
    },
    checkEmptyArray(data) {
      return is.empty(data)
    },
    getImageFile(pic) {
      const url = this.getHostName()
      if (pic == "no-photo.jpg") {
        return url + 'photo_default.png'
      } else if (pic.includes('blob:')) {
        return pic
      } else if (pic.includes('data:')) {
        return pic
      } else {
        return url + pic
      }
    },
    userProfile(userId, name) {
      this.$router.push({
        name: 'User Profile',
        params: { id: userId, name: name },
      });
    },
    successMessage(message) {
      this.$message({
        showClose: true,
        message: message,
        type: 'success',
        duration: 2000
      });
    },
    successNotification(title, message) {
      this.$notify({
        title: title,
        message: message,
        type: 'success'
      });
    },
    errorMessage(message) {
      this.$message({
        showClose: true,
        message: message,
        type: 'error',
        duration: 3000
      });
    },
    infoMessage(message) {
      this.$message({
        showClose: true,
        message: message,
        duration: 2000
      });
    },
    addDuplicateField(dataArray, type) {
      dataArray.push({});
      this.infoMessage(`Added another ${type}`);
    },
    getuserAge(dob) {
      var diff_ms = Date.now() - new Date(dob).getTime();
      var age_dt = new Date(diff_ms);

      return Math.abs(age_dt.getUTCFullYear() - 1970);
    },
    capitalize(word) {
      if (typeof word !== 'string') return ''
      return word.charAt(0).toUpperCase() + word.slice(1)
    },
    logout() {
      let self = this
      self.$store.dispatch('logout');
      self.$router.push("/login")
      authService.logout()
        .then(() => { this.successMessage('User Logout') }).catch((errors) => {
          this.errorMessage(errors.error)
        })
    }
  }
}