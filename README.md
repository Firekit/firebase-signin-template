# Firekit Sign in Template for Firebase

## How to use

1. Copy the files `signin.html` and `signin.js` to root of your web app.

2. Install this packages: `npm install firebase firebaseui --save`

3. Setup rewrite and redirect in the file `firebase.json`:

```json
"rewrites": [ {
  "source": "signin.html",
  "destination": "/signin.html"
} ],
"redirects": [ {
  "source" : "/signin",
  "destination" : "/signin.html",
  "type" : 301
} ],
```
