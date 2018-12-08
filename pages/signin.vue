<template lang="pug">
app-container
  div(class="login-page__modal")
    span(class="login-page__modal-title") {{ $t('signinPage.title')}}
    a-form(
      style="text-align: center; width: 400px;"
      @submit="handleSubmit"
      :autoFormCreate="(form) => { this.form = form }")
      template(v-if="form = form")
        a-form-item(fieldDecoratorId="email" :fieldDecoratorOptions="{}")
          a-input(placeholder="example@email.com")
            a-icon(slot="prefix" type="user" style="color:rgba(0,0,0,.25)")
        a-form-item(fieldDecoratorId="password" :fieldDecoratorOptions="{}")
          a-input(type="password" placeholder="Your Password")
            a-icon(slot="prefix" type="lock" style="color:rgba(0,0,0,.25)")

          a-button(type="primary" htmlType="submit") {{ $t('signinPage.basicSignInAction')}}
    div(style="margin-top: 40px;")
</template>

<script>
import { mapActions } from 'vuex';
import { Firebase } from '~/plugins/firebase';
import AppContainer from '~/components/AppContainer';

export default {
  components: { AppContainer },
  data() {
    return {
      form: null,
    };
  },
  methods: {
    ...mapActions('auth', ['login']),
    async handleGithub() {
      try {
        // Handle Here
        // TODO: Firebase is not working here. We should use auth module.
        // Doc: https://auth.nuxtjs.org/getting-started/setup
      } catch {
        // Handle Error
      }
    },
    async handleSubmit(e) {
      e.preventDefault();
      try {
        const values = this.form.getFieldsValue();
        const result = await Firebase.auth().signInWithEmailAndPassword(
          values.email,
          values.password,
        );
        await this.login(result.user);
        this.$router.push(this.localePath({ name: 'authenticated' }));
      } catch {
        // handle error
      }
    },
  },
};
</script>

<style lang="stylus">
.login-page__modal
  position: relative;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #dadfe2;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0 200px;

.login-page__modal-title
  font-size: 2em;
  color: #354147;
  padding: 20px 0 30px;
  text-align: center;
</style>
