<template>
  <div class="poll" v-loading="isLoading">
    <h1>Add question</h1>

    <el-form :inline="true" :model="question" class="demo-form-inline" v-if="!this.isLoading">
      <el-form-item>
        <el-input v-model="question.first.value" placeholder="Option A"></el-input>
      </el-form-item>
      <el-form-item>OR</el-form-item>
       <el-form-item>
        <el-input v-model="question.second.value" placeholder="Option B"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addQuestion">Publish</el-button>
      </el-form-item>
    </el-form>
    <ul class="polls" v-loading="isLoading" v-if="poll.hasQuestions">
      <li v-for="question in reverseItems">
        <el-card class="box-card">
          <el-row>
            {{ question.first.value }} or {{ question.second.value }}
          </el-row>
        </el-card>
      </li>
    </ul>
  </div>
</template>
<script>

/* eslint-disable */
import db from '../services/firebase';
import ResultsNew from './ResultsNew';

const polls = db.ref('/');

export default {
  name: 'ManagePoll',
  data() {
    return {
      isLoading: true,
      question: {
        first: {
          value: '',
          votes: 0,
        },
        second: {
          value: '',
          votes: 0,
        },
      },
    };
  },
  components: {
    ResultsNew,
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
    reverseItems() {
      return this.poll.questions.slice().reverse();
    }
  },
  methods: {
    addQuestion() {
      if (!this.poll.hasQuestions) {
        this.poll.hasQuestions = true;
        this.poll.questions = [];
      }
      this.poll.questions.push(this.question);
      polls.child(this.poll.id).set({
        id: this.poll.id,
        name: this.poll.name,
        url: this.poll.url,
        isActive: this.poll.isActive,
        hasQuestions: this.poll.hasQuestions,
        questions: this.poll.questions,
      });

      this.question = {
        first: {
          value: '',
          votes: 0,
        },
        second: {
          value: '',
          votes: 0,
        },
      };
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
.polls {
  max-width: 600px;
  margin: auto;
  list-style: none;
}
.box-card {
  margin: 10px;
}
</style>
