import { defineStore } from 'pinia';
import { ref, computed } from "vue";

export const useMovieStore = defineStore('movieStore', () => {
    let storedMovies = JSON.parse(localStorage.getItem('storedMovies'));

    const movies = ref(storedMovies || []);

    const activeTab = ref(2);

    const watchedMovies = computed(() => {
        return movies.value.filter(x => x.isWatched)
    });

    const moviesTotalCount =  computed(() => {
        return movies.value.length;
    })

    const setActiveTab = id => {
        activeTab.value = id;
    }
     const toggleWatched = id => {
            const indx = movies.value.findIndex(x => x.id === id);
            movies.value[indx].isWatched = !movies.value[indx].isWatched;
     }

     const deleteMovies = id => {
         movies.value = movies.value.filter(x => x.id !== id);
         localStorage.setItem('storedMovies',  JSON.stringify(movies.value))
     }
     return {
         movies,
         activeTab,
         watchedMovies,
         moviesTotalCount,
         setActiveTab,
         toggleWatched,
         deleteMovies
     }
})