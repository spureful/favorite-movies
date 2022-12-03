<template>
<div class="movie">
  <img
      :src="movie.i.imageUrl"
       alt="movie.original_title"
      class="movie-img"
  >
  <div>
    <div class="movie-name">
      {{ movie.l }}
      <span v-if="movie.q"> {{ movie.q }}</span>
    </div>
    <span class="movie-overview"> {{ movie.s}}</span>
    <div v-if="!isSearch" class="movie-buttons">
      <button
          class="btn movie-buttons-watched"
          @click="movieStore.toggleWatched(movie.id)"
      >
        <span v-if="!movie.isWatched"> Watched </span>
        <span v-else> Unwatched</span>
      </button>
      <button class="btn movie-buttons-delete" @click="movieStore.deleteMovies(movie.id)">Delete</button>
    </div>
    <div v-else class="movie-buttons">
      <button
          class="btn movie-buttons-watched"
          :class="{'movie-buttons-delete': searchStore.hasFavorite(movie.id)}"
          @click="searchStore.addToFavorite(movie)"
      >
        <span v-if="!searchStore.hasFavorite(movie.id)"> Add to favorites </span>
        <span v-else> Delete from favorites </span>
      </button>

    </div>
  </div>
</div>
</template>

<script setup>
import { useMovieStore} from "../stores/MovieStore.js";
import { useSearchStore} from "../stores/SearchStore.js";

const movieStore = useMovieStore();
const searchStore = useSearchStore();

const props = defineProps({
  movie: {
    type: Object,
    required: true,
    default: () => {}
  },
  isSearch: {
    type: Boolean,
    required: false,
    default: () => false
  }
})
// export default {
//   name: "Movie"
// }
</script>

<style scoped>
.movie {
  display: grid;
  grid-template-columns: 200px 1fr;
  column-gap: 30px;
  margin-bottom: 20px;
  border: 2px solid #efefef;
  padding: 10px;
  border-radius: 10px;
}
.movie-accept {
  margin-right: 10px;
}
.movie-img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
}
.movie-name {
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: 20px;
}
.movie-overview {
  display: block;
  margin-bottom: 20px;
}
.movie-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}
.movie-buttons-watched {
  color: #fff;
  background: #1eb4c3;
}
.movie-buttons-watched__icon {
  width: 15px;
  margin-left: 10px;
}
.movie-buttons-delete {
  color: #fff;
  background: #ff2a2a;
}
</style>