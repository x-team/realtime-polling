<template>
  <div>
    <el-col :span="12">
      <h2 class="grid-content">
        {{ poll.first.value }}
      </h2>
      <h3 class="grid-content">
        {{ poll.first.votes }} votes
      </h3>
    </el-col>
    <el-col :span="12">
      <h2 class="grid-content">
        {{ poll.second.value }}
      </h2>
      <h3 class="grid-content">
        {{ poll.second.votes }} votes
      </h3>
    </el-col>
    <el-col :span="24" class="bar-container">
      <div v-bind:style="{width: poll.first.votes / (poll.first.votes + poll.second.votes) * 100 + '%' }" class="bar bg-red"/>
      <div v-bind:style="{width: poll.second.votes / (poll.first.votes + poll.second.votes) * 100 + '%' }" class="bar bg-blue"/>
    </el-col>
  </div>
</template>
<script>
export default {
  name: 'results',
  props: ['poll'],
};
</script>
<style scoped>
.polls {
  max-width: 600px;
  margin: auto;
  list-style: none;
}
.bg-red {
  background-color: #409EFF;
}
.bg-blue {
  background-color: #67C23A;
}
.bar {
  height: 20px;
  margin-top: 5px;
}
.bar-container {
  display: flex;
  margin: 10px 0 30px;
}
</style>