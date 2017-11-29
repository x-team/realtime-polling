<template>
  <div class="hello">
    This is a change proposed in PR but not yet merged
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
