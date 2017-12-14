<template>
  <div class="poll" v-loading="isLoading">
    <h2>Add question to "{{ poll.name }}" poll</h2>
    <el-form :inline="true" :model="question" class="demo-form-inline" v-if="!this.isLoading">
      <el-form-item>
        <el-input :disabled="!poll.isActive" v-model="question.first.value" placeholder="Option A"></el-input>
      </el-form-item>
      <el-form-item>OR</el-form-item>
       <el-form-item>
        <el-input :disabled="!poll.isActive" v-model="question.second.value" placeholder="Option B"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="!poll.isActive" type="primary" @click="addQuestion">Publish</el-button>
        <el-button v-if="poll.isActive" type="danger" @click="closePoll">Close Poll</el-button>
        <el-button v-else type="success" @click="reopenPoll">Re-open Poll</el-button>
      </el-form-item>
    </el-form>
    <ul class="polls" v-loading="isLoading" v-if="poll.hasQuestions">
      <li v-for="question in reverseItems">
        <el-card class="box-card" v-bind:class="{ active: question.isActive }">
          <el-row>
            <Results :question="question"></Results>
          </el-row>
        </el-card>

      </li>
    </ul>
  </div>
</template>
<script>


import uuidv1 from 'uuid/v1';
import db from '../services/firebase';
import Results from './Results';

const polls = db.ref('/');

export default {
  name: 'ManagePoll',
  data() {
    return {
      isLoading: true,
      question: {
        id: uuidv1(),
        isActive: true,
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
    },
  },
  components: {
    Results,
  },
  methods: {
    addQuestion() {
      if (!this.poll.hasQuestions) {
        this.poll.hasQuestions = true;
        this.poll.questions = [];
      }
      for (let i = 0; i < this.poll.questions.length; i += 1) {
        this.poll.questions[i].isActive = false;
      }
      this.poll.questions.push(this.question);
      polls.child(this.poll.id).set({
        id: this.poll.id,
        name: this.poll.name,
        isActive: this.poll.isActive,
        hasQuestions: this.poll.hasQuestions,
        questions: this.poll.questions,
        backgroundImageUrl: this.poll.backgroundImageUrl,
      });

      this.question = {
        id: uuidv1(),
        isActive: true,
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
    closePoll() {
      polls.child(this.poll.id).update({
        isActive: false,
      });
    },
    reopenPoll() {
      polls.child(this.poll.id).update({
        isActive: true,
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
.polls {
  max-width: 700px;
  margin: 0px -10px 0px -50px;
  list-style: none;
}
.box-card {
  margin: 10px;
}

.active {
  background-color: lightGreen;
  color: white;
  font-weight: bold;
}
</style>
