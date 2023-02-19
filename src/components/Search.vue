<template>
  <form @submit.prevent="searchStore.getMovies(searchMovie)">
    <input    type="text"
              class="search-input"
              placeholder="Input movie"
              v-model="searchMovie" />
  </form>
  <Loader v-if="searchStore.isLoading"/>
  <div v-else-if="!searchStore.movies.length"> Not found any item </div>
  <Movie
      v-else
      v-for="movie of searchStore.movies"
      :key="movie.id"
      :movie="movie"
      :isSearch="true"
  />
</template>

<script setup>
import { ref } from "vue";
import { useSearchStore} from "../stores/SearchStore.js";
const searchStore = useSearchStore();

import Loader from './Loader.vue'
import Movie from  './Movie.vue'

const searchMovie = ref('');
</script>

<style scoped>
.search-input {
  border: 1px solid #e7e7e7;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  margin-bottom: 20px;
  border-radius: 10px;
}
</style>