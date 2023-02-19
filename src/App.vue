<template>
  <main>
    <header class="header">
      <img src="/logo.svg" alt="logo" class="header-logo">
      <h2>My favorite movies</h2>
    </header>
    <div class="tabs">
      <button :class="['btn', { btn_green: movieStore.activeTab === 1 }]" @click="setTab(1)">
        Favorites ({{movieStore.movies.length}})
      </button>
      <button :class="['btn', { btn_green: movieStore.activeTab === 2 }]" @click="setTab(2)">
        Search
      </button>
    </div>
    <div v-if="movieStore.activeTab === 1" class="movies">
      <h3 v-if="movieStore.watchedMovies.length">watched movies: {{movieStore.watchedMovies.length}}</h3>
      <Movie
          v-for="movie in movieStore.watchedMovies"
          :key="movie.id"
          :movie="movie"
      />
      <h3>All movies: {{ movieStore.moviesTotalCount }}</h3>
      <Movie
          v-for="movie in movieStore.movies"
          :key="movie.id"
          :movie="movie"
      />
    </div>
    <Search v-else/>
  </main>

</template>
<script setup>
import { useMovieStore } from "./stores/MovieStore.js";
import Movie from "./components/Movie.vue";
import Search from "./components/Search.vue";

const movieStore = useMovieStore();

const setTab = id =>  movieStore.setActiveTab(id);
</script>

<style lang="css">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.header-logo {
  max-width: 50px;
  margin-right: 10px;
}
.btn {
  border: none;
  max-width: 140px;
  height: 40px;
  font-size: 14px;
  margin: 0 10px;
  border-radius: 10px;
  cursor: pointer;
  background: #efefef;
}
.btn:hover {
  opacity: 0.7;
}
.btn_green {
  background: #37df5c;
}
.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
</style>
