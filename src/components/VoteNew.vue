<template>
  <div class="poll" v-loading="isLoading">
    <el-card class="box-card" v-if="!this.isLoading">
      <div v-if="!this.isVoted">
        <el-button type="text" @click="vote(activeQuestion, 'first')">{{activeQuestion.first.value}}</el-button>
        <span>or</span>
        <el-button type="text" @click="vote(activeQuestion, 'second')">{{activeQuestion.second.value}}</el-button>
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
/* eslint-disable */
export default {
  name: 'VoteNew',
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
  computed: {
    activeQuestion() {
      return this.poll.questions.filter(question => (question.isActive))[0];
    },
  },
  methods: {
    vote(question, choice) {
      const pollRef = db.ref().child(`/${this.$route.params.id}`);
      this.isVoted = true;
      pollRef.transaction((poll) => {
        if (poll) {
          const results = poll.questions.map((question) => {
            if (question.isActive) {
              question[choice].votes += 1;
            }
            return question;
          });
          poll.questions = results;
        }
        return poll;
      });
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
