// If you are using ES6 imports or TypeScript:
// import * as firebase from 'firebase/app';
// import 'firebase/auth';
// import * as firebaseui from 'firebaseui'

// Your web app's Firebase configuration.
var firebaseConfig = {
  apiKey: '',
  authDomain: '',
};

var signInSuccessUrl = '/';
var termsOfServiceUrl = '/terms';
var privacyPolicyUrl = '/privacy';

// FirebaseUI config.
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // var user = authResult.user;
      // var credential = authResult.credential;
      // var isNewUser = authResult.additionalUserInfo.isNewUser;
      // var providerId = authResult.additionalUserInfo.providerId;
      // var operationType = authResult.operationType;

      // Do something with the returned AuthResult.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },

    signInFailure: function(error) {
      // Some unrecoverable error occurred during sign-in.
      // Return a promise when error handling is completed and FirebaseUI
      // will reset, clearing any UI. This commonly occurs for error code
      // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
      // occurs. Check below for more details on this.
      return handleUIError(error);
    },

    uiShown: function() {
      // The widget is rendered. Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Whether to upgrade anonymous users should be explicitly provided.
  // The user must already be signed in anonymously before FirebaseUI is
  // rendered.
  autoUpgradeAnonymousUsers: true,
  // The Credential Helper to use.
  // https://github.com/firebase/firebaseui-web#credential-helper
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  // URL query parameter name for FirebaseUI widget modes.
  // https://github.com/firebase/firebaseui-web#firebaseui-widget-modes
  queryParameterForWidgetMode: 'mode',
  // URL query parameter name for sign in success url.
  queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  // The URL where to redirect the user after a successful sign-in.
  signInSuccessUrl,
  // The list of providers enabled for signing into your app.
  // The order you specify them will be the order they are displayed on the sign-in provider selection screen.
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // Use email link authentication and do not require password.
      // Note this setting affects new users only.
      // For pre-existing users, they will still be prompted to provide their
      // passwords on sign-in.
      signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
      // Allow the user the ability to complete sign-in cross device, including
      // the mobile apps specified in the ActionCodeSettings object below.
      forceSameDevice: false,
      // Used to define the optional firebase.auth.ActionCodeSettings if
      // additional state needs to be passed along request and whether to open
      // the link in a mobile app if it is installed.
      emailLinkSignIn: function() {
        var url = window.location.origin + '/signin.html';

        return {
          // URL you want to redirect back to.
          // URL must be whitelisted in the Firebase Console.
          url,
          // Always true for email link sign-in.
          handleCodeInApp: true,
          // Custom FDL domain.
          // dynamicLinkDomain: 'example.page.link',
          // Whether to handle link in iOS app if installed.
          // iOS: {
          //   bundleId: 'com.example.ios'
          // },
          // Whether to handle link in Android app if opened in an Android
          // device.
          // android: {
          //   packageName: 'com.example.android',
          //   installApp: true,
          //   minimumVersion: '12'
          // }
        };
      }
    },
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: [
        'https://www.googleapis.com/auth/contacts.readonly',
      ],
      // customParameters: {
      //   // Forces account selection even when one account
      //   // is available.
      //   prompt: 'select_account',
      // }
    },
    {
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      scopes: [
        'public_profile',
        'email',
      ],
      // customParameters: {
      //   // Forces password re-entry.
      //   auth_type: 'reauthenticate',
      // }
    },
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
    // {
    //   provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    //   // Invisible reCAPTCHA with image challenge and bottom left badge.
    //   recaptchaParameters: {
    //     type: 'image',
    //     size: 'invisible',
    //     badge: 'bottomleft'
    //   }
    // }
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback function.
  // Terms of service url/callback.
  tosUrl: termsOfServiceUrl,
  // Privacy policy url/callback.
  privacyPolicyUrl,
};

function handleUIError(error) {
  console.error(error);
}

function start() {
  // Initialize Firebase.
  firebase.initializeApp(firebaseConfig);
  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);
}

start();
