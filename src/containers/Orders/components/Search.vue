<template>
  <div class="search-container">
    <input class="search" v-model="query" type="text" placeholder="Search for items to add..." />
    <div class="results" v-if="results.length">
      <div class="result" v-for="option in results" :key="option.value" @click="selectOption(option.value)">
        <span>{{ option.text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Fuse from 'fuse.js';

export default {
  props: ['options'],
  data() {
    return {
      query: '',
    };
  },
  methods: {
    selectOption(value) {
      this.query = '';
      this.$emit('selectItem', value);
    },
  },
  computed: {
    results() {
      const fuse = new Fuse(this.options, { keys: ['text'] });
      return fuse.search(this.query);
    },
  },
};
</script>

<style scoped>
.search-container {
  display: flex;
}

.search {
  flex-grow: 1;
  height: 30px;
  margin: 12px;
  padding: 4px 12px;
  border-radius: 4px;
  border: 1px solid #BDBDBD;
  font-size: 16px;
}

.results {
 position: absolute;
 min-height: 48px;
 left: 12px;
 right: 12px;
 margin-top: 56px;
 background: #fff;
 box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
 border-radius: 4px;
}

.result {
  height: 48px;
  padding: 0 12px;
}

.result > span {
  line-height: 48px;
}
</style>
