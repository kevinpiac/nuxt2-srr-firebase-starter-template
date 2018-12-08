# Nuxt + SSR + AppEngine + Gitlab + Firebase Auth

## What's included?

This project is based on [create-nuxt-app](https://github.com/nuxt/create-nuxt-app) template in Universal Mode (SSR) provided on top of [Express](https://github.com/expressjs/express).
It's made to be used on [Google Cloud Platform](https://cloud.google.com/) (especially with [AppEngine](https://cloud.google.com/appengine/)) as Server and [Gitlab](https://gitlab.com) as CI platform but you can still use it with any other platforms.

What's included:

- [x] Basic Sign-Up, Sign-In pages managed by firebase auth.
- [x] Firebase User AccessToken mapped to the state and persisted with Session
- [x] Module based state management
- [x] Environment variables configuration for dev, prod and CI.
- [x] Translation management configured with [Nuxt i18n](https://github.com/nuxt-community/nuxt-i18n)
- [x] [AntDesignVue](https://vuecomponent.github.io/ant-design-vue) (RIP Material Design)
- [x] Stylus, Pug, Prettier, Linter
- [x] Ready for testing with [Ava](https://github.com/avajs/ava) and [Vue Test Utils](https://vue-test-utils.vuejs.org/)
- [x] Configured API + Mock

## Getting Started

Before to start be sure you have a minimum of knowledge in [Vuejs](https://vuejs.org/) and [Nuxt](https://fr.nuxtjs.org/). Check out their docs !

__Heads up:__ Before to run this project don't forget you'll have to configure the environment variables. Have a look to the corresponding section is a good starting point.


1. Install your dependencies with `npm i`
2. Don't forget to manage your env variable
3. Run in dev using : `npm run dev`
4. Run test using : `npm run test`
4. Build and start in server mode with `npm run build && npm run start`
5. Configure the CI environment and push to the corresponding branch for auto deployment

## Setting up environment variables

### Environmental variables in development

The project uses [dotenv](https://www.npmjs.com/package/dotenv) for setting environmental variables during development. Simply copy `.env.example`, rename it to `.env` and add your env vars as you see fit.

**Never** add your .env file to version control. It should only include environment-specific values such as database passwords or API keys used in development. Your production env variables should be different and be set differently depending on your hosting solution. `dotenv` is only for development.

By the way, if your .env.example has more variables than your actual .env file, then an error will be triggered. If you want to add more env variables don't forget to update the .env.example file first and let it know to other developers.

Your .env config will be provided by your project manager (me) :P
You'll also need to use one or more credentials keys.
This keys must be added in src/credentials. This directory is gitignored.
**Never** store these key in github or any other versioning system.

### Environmental variables in CI

CI server needs more environment variables in order to perform actions on the project. For example deploying to production will require:

- `GCP_CREDENTIALS_PRODUCTION`
- `GCP_PROJECT_ID_PRODUCTION`

Check the .gitlab-ci.yml file and be sure all variables are set on the CI config.

### Environmental variables in app engine

The only way to set environmental variables on App Engine is to use the app.yaml file. Because we don't want to expose such variables in version control, we must keep app.yaml into the gitignore. However like for .env, we keep a app.example.json which contains the full required configuration.

__Head up__: We store a JSON version of the app.yml file on the Gitlab side as environment variable. This file is then transformed back on CI server in .yml format. This operation allows us to not expose sentive variable on the code and bypass a complex encryption / decryption process (PS: app engine sucks!).

This:

```json
{
  "runtime": "nodejs",
  "env": "flex",
  "api_version": 1,
  "skip_files": ["^node_modules$"],
  "env_variables": {
    "FIREBASE_API_KEY": "",
    "FIREBASE_AUTH_DOMAIN": "",
    "FIREBASE_PROJECT_ID": ""
  }
}
```

Become this:

```yml
runtime: nodejs
env: flex
api_version: 1
skip_files:
 - ^node_modules$
env_variables:
  - FIREBASE_API_KEY: ''
  - FIREBASE_AUTH_DOMAIN: ''
  - FIREBASE_PROJECT_ID: ''
```

**Important :** Some environment variables (such as `FIREBASE_API_KEY`) are also used on client side. To expose an environment variable into the client you'll have to edit the `env` value in `.nuxt.config.js` file.

Here is an extract of the current code exposing `FIREBASE_API_KEY`, `FIREBASE_PROJECT_ID` and `FIREBASE_AUTH_DOMAIN` either in the server side and the client side code.

```js
/*
** Nuxt environment variables shared with client / server
** docs: https://fr.nuxtjs.org/api/configuration-env/
*/
env: {
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
},
```

### Environmental variables in client side

Don't forget that to use an environment variable on client side you have to configure the 'env' object in .nuxt.config.

For example in Nuxt Config we expose `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_PROJECT_ID` to the client.

```js
// nuxt.config.js
...
env: {
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
},
...
```

Then we can use these variables in the firebase plugin running only on client side:

```js
// ~/plugins/firebase.js
...
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
};
...
```

## Deployment

You can build and deploy your app on the platform of your choice. Here we use Gitlab with a specific deployment pipeline which could be configurated depending your needs.

### Dos and Dont's

__Test / Comment first__

Try commenting each function before writing it. This will force you to define its behavior and to have a better idea of what you need to code / test.

__Solve tests one by one__

For each function's behavior you want to test, write your test first, check it fails, and implement the behavior then. Drink a coffee. Continue.

__Choose the right variables. Don't over comment__

Explaining a 'missingUserId' exception meaning is a waste of time.
Explaining what a 'userId' is, is a waste of time.
Explaining what a 'companyId' is, is a waste of time.

Drinking a coffee is always a good idea however.

__Lint before commit__

Lint your code before each commit. If you don't your collaborators will do it for you and it could create conflicts in git branches during merges.

__Avoid using the API outside a state action__

In almost all cases the API should fetch data and update the state. This will ensure all the app shares the same up to date data. So avoid calling API module directly from your pages / components. Use a state action instead. This state action will first call the API, then update the state with results and finally return the fresh results.

Usage will be as follow:
```js
// your component
methods: {
  async loadPosts() {
    const posts = await this.$store.dispatch('posts/fetchAllPosts');
    console.log(posts);
  },
},
```



__Add TODOs__
If you don't have time to implement something but you think it could be usefull,
write it down using a comment begining by `// TODO`.
```js
// TODO we should do this or that later...
```
