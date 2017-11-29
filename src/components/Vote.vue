<template>
  <div class="hello">
    <p>Test for app preview on PR.</p>
  </div>
</template>
<script>
import db from '../services/firebase';

const polls = db.ref('/');

export default {
  name: 'Vote',
  data() {
    return {
      poll: {},
    };
  },
  firebase: {
    polls,
  },
  methods: {
    vote: () => {

    },
  },
};
</script>
