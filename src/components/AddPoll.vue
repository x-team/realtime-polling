<template>
  <div class="hello">
    <h1>Add new poll!</h1>
    <input
      v-model.trim="pollFirstOption"
      placeholder="First Option"
    >
    <input
      v-model.trim="pollSecondOption"
      placeholder="Second Option"
    >
    <ul>
      <li v-for="poll in polls">
        <button @click="removePoll(poll)">X</button>
      </li>
    </ul>
  </div>
</template>
<script>
import db from '../services/firebase';

const polls = db.ref('/');

export default {
  name: 'AddPoll',
  data() {
    return {
      pollFirstOption: '',
      pollSecondOption: '',
    };
  },
  firebase: {
    polls,
  },
  methods: {
    addPoll: () => {
      if (this.pollFirstOption && this.pollSecondOption) {
        polls.push({
          firstOption: this.pollFirstOption,
          secondOption: this.pollSecondOption,
        });
        this.pollFirstOption = '';
        this.pollSecondOption = '';
      }
    },
    removePoll: (poll) => {
      polls.child(poll['.key']).remove();
    },
  },
};
</script>
