import Vue from 'vue';
import Router from 'vue-router';
import Vote from '@/components/Vote';
import AddPoll from '@/components/AddPoll';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Vote',
      component: Vote,
    }, {
      path: '/add',
      name: 'AddPoll',
      component: AddPoll,
    },
  ],
});
