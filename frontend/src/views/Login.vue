<template>
  <div>
    <el-row>
      <el-col :span="9">
        <div class="login_background">
          <div class="login_text">
            <h1>Farmer Profile Platform (FPP)</h1>
            <p>
              Farmer Profile Platform (FPP) is an innovative web- based platform
              for the provision of holistic solutions to rural smallholder
              farmers. The FPP collects, maintains and analyzes farming
              operational data (farm input, yield, and income) of individual
              rural smallholder farmers, enabling prudent farm management.
            </p>
          </div>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="login_signIn">
          <div id="login_logo">
            <img src="../assets/images/fpplogo.png" alt="logo" width="310px" />
          </div>
          <div>
            <h2 class="mt-4 mb-3">Authorized Log In</h2>

            <el-form :model="loginForm" :rules="rules" ref="loginForm">
              <el-form-item prop="email">
                <el-input
                  size="large"
                  clearable
                  v-model="loginForm.email"
                  placeholder="example@email.com"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="loginForm.password"
                  placeholder="Password"
                  type="password"
                ></el-input>
              </el-form-item>
              <span class="login_forgot_pass"
                ><a @click="changePasswordVisible = true"
                  >Don't remember your password?</a
                ></span
              >
              <br /><br />
              <el-form-item>
                <el-button
                  type="primary"
                  class="button_full"
                  :loading="btnLoading"
                  @click="login()"
                  >Login</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
        <br />
        <br />
        <p style="text-align:center;">
          Only authorized company staff will have access. Log In details is
          therefore 'Requested'. (v-2.2.7)
        </p>
      </el-col>
    </el-row>

    <!-- <el-dialog
      title="Forgot Passowrd"
      :visible.sync="changePasswordVisible"
      width="30%"
    >
      <span>Enter you email to set up a new password.</span>
      <el-input
        v-model="loginForm.email"
        type="email"
        placeholder="yourname@email.com"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changePasswordVisible = false">Cancel</el-button>
        <el-button type="primary" @click="changePasswordVisible = false"
          >Confirm</el-button
        >
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import authService from '../api/auth';

export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
      changePasswordVisible: false,
      rules: {
        email: [
          {
            required: true,
            type: 'email',
            message: 'Please enter valid email',
            trigger: ['blur', 'change'],
          },
          { min: 5, message: 'Length should be 5 or more', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Please enter password', trigger: 'blur' },
          {
            min: 6,
            message: 'Length should be 6 or more characters',
            trigger: 'change',
          },
        ],
      },
      btnLoading: false,
    };
  },
  methods: {
    login() {
      let self = this;
      this.btnLoading = true;
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          authService
            .login(this.loginForm)
            .then(response => {
              self.set_user(response);
            })
            .catch(errors => {
              console.log(errors);
              self.errorMessage('Error with authentication');
              self.btnLoading = false;
            });
        } else {
          self.btnLoading = false;
          return false;
        }
      });
    },
    set_user(res) {
      let self = this;
      this.$store
        .dispatch('login', res)
        .then(() => {
          authService
            .getLoggedInUser()
            .then(response => {
              self.$store.dispatch('get_user', response.data);
              self.btnLoading = false;
              self.$router.push('/dashboard');
            })
            .catch(errors => {
              self.errorMessage(errors.error);
              self.btnLoading = false;
            });
        })
        .catch(() =>
          this.errorMessage('Token unidentified, contact administrator')
        );
    },
  },
};
</script>
