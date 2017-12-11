<template>
  <div class="poll" v-loading="isLoading">
    <el-card class="box-card" v-if="!this.isLoading">
      <div v-if="!this.isVoted">
        <el-button type="text" @click="vote(poll, 'first')">{{poll.first.value}}</el-button>
        <el-button type="text" @click="vote(poll, 'second')">{{poll.second.value}}</el-button>
      </div>
      <el-row v-else>
        <results :pollId="poll['.key']"></results>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import db from '../services/firebase';
import Results from './Results';

export default {
  name: 'Vote',
  data() {
    return {
      isLoading: true,
      isVoted: false,
    };
  },
  components: {
    Results,
  },
  firebase() {
    return {
      poll: {
        source: db.ref().child(`/${this.$route.params.id}`),
        asObject: true,
        readyCallback() {
          this.isLoading = false;
        },
      },
    };
  },
  methods: {
    vote(poll, choice) {
      const dbRef = db.ref().child(`/${this.$route.params.id}`);
      this.isVoted = true;

      dbRef.transaction(pollRef => ({
        ...pollRef,
        [choice]: {
          value: pollRef[choice].value,
          votes: pollRef[choice].votes + 1,
        },
      }));
    },
  },
};
</script>
<style scoped>
.poll {
  max-width: 600px;
  margin: auto;
  list-style: none;
}
</style>