<template>

  <div class="skext-menu">
    <strong>{{welcomeMsg}}</strong>
    <el-row v-if="true || !isAuthenticated">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-button type="primary" size="small" icon="el-icon-d-arrow-right" @click="app">App</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="true || isAuthenticated">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-button type="primary" size="small" icon="el-icon-menu" @click="iframe">iFrame</el-button>
        </div>
      </el-col>
    </el-row>
    <div>cookies: {{cookies}}</div>
  </div>

</template>
<script>
  // import axios from 'axios'

  /* ⬇ CONSTANTS ⬇ */

  // const ax = axios.create({
  //   withCredentials: true
  // })

  const baseUrl = 'https://login.skedgitnow.com/'

  /* ⬇ GLOBAL FUNCTIONS ⬇ */

  /**
   * fetch cookies off
   * @param cb
   */
  function getCookies (cb) {
    // TODO: change this to just grab the _skedgit_session cookie?
    // chrome.cookies.get({'url': baseUrl, 'name': '_skedgit_session'}, cb)
    chrome.cookies.getAll({'url': baseUrl}, cb)
  }

  export default {
    data () {
      return {
        cookies: []
      }
    },
    computed: {
      isAuthenticated () {
        // TODO: just check for the valid session cookie?
        return this.cookies.length > 0
      },
      welcomeMsg () {
        const vm = this
        return vm.isAuthenticated ? 'Go To Your Skedgit Dashboard' : 'Sign In With Your Skedgit Account'
      }
    },
    created () { },
    mounted () {
      this.auth()
    },
    methods: {
      app () {
        chrome.tabs.create({ url: 'pages/app.html' })
      },
      iframe () {
        // send message command to load iframe
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            {
              loadIframe: {
                width: '100px',
                height: '100px',
                innerHTML: 'Hello'
              }
            },
            null,
            function (response) {
              console.log(response.confirmation)
            })
        })
      },
      devtools () {
        chrome.tabs.create({ url: 'pages/devtools.html' })
      },
      auth () {
        const vm = this
        getCookies(function (cookies) {
          vm.cookies = cookies
        })
      }
    }
  }
</script>
<style lang="scss">
  // globalize some of these (fonts/colors?)

  @font-face {
    font-family: IntroBlackAlt;
    src: url('/fonts/IntroBlackAlt.otf');
  }
  @font-face {
    font-family: IntroBlackItalic;
    src: url('/fonts/IntroBlackItalic.otf');
  }
  @font-face {
    font-family: IntroBold;
    src: url('/fonts/IntroBold.otf');
  }
  @font-face {
    font-family: IntroBoldItalic;
    src: url('/fonts/IntroBoldItalic.otf');
  }
  @font-face {
    font-family: IntroRegular;
    src: url('/fonts/IntroRegular.otf');
  }
  @font-face {
    font-family: IntroRegularAlt;
    src: url('/fonts/IntroRegularAlt.otf');
  }
  @font-face {
    font-family: IntroRegularItalic;
    src: url('/fonts/IntroRegularItalic.otf');
  }
  @font-face {
    font-family: IntroSemiBold;
    src: url('/fonts/IntroSemiBold.otf');
  }
  @font-face {
    font-family: IntroSemiBoldItalic;
    src: url('/fonts/IntroSemiBoldItalic.otf');
  }

  body {
    min-width: 226px;
    /*width: 700px;*/
    /*height: 580px;*/
    /*font-family: IntroRegular;*/
    /*font-size: 14pt;*/
    /*overflow-x: auto;*/
  }

  .skext-menu {
    text-align: center;
  }

  .el-row {
    margin: 8px 0;
  }

  .el-button {
    width: 100%;
  }

  .sign-in-action {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/images/loginbkg.png');
    background-size: cover;
    display: flex;
    flex-direction: column;
  }

  .sign-in-action > .sign-in-action-content {
    margin: auto;
    text-align: center;
  }

  .sign-in-action > .sign-in-action-content > h2 {
    font-family: IntroBlackItalic;
    font-size: 28px;
    color: #4E6571;
    letter-spacing: 0;
  }

  .sign-in-action > .sign-in-action-content > #sign_in {
    font-family: IntroSemiBold;
    font-size: 10pt;
    border-radius: 100px;
    transition: all 0.3s;
    width: 150px;
    background: #0081FF;
    color: #F0F8F8;
    border: none;
    height: 30px;
  }

  .sign-in-action > .sign-in-action-content > #sign_in:hover {
    cursor: pointer;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.50);
    background-color: #006FDC;
  }

  .sign-in-action > .sign-in-action-content > #sign_in:focus {
    outline: none;
  }
</style>