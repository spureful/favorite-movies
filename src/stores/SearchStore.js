import { defineStore} from "pinia";
import { ref, computed } from "vue";
import { useMovieStore} from "./MovieStore.js";



export const useSearchStore = defineStore('searchStore', () => {
    const isLoading = ref(false);
    const movies = ref([]);

    const getMovies = async(string) => {
        const url = 'https://imdb8.p.rapidapi.com/auto-complete?q='
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'b663f95f4fmshe65ad71eaafcc6dp15a41bjsne0f79a7e3e02',
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
            }
        };
        try {
            isLoading.value = true;
            const res = await fetch(`${url}${string}`, options);
            const data = await res.json();
            movies.value = data.d;
        } finally {
            isLoading.value = false;
        }
    }

    const hasFavorite = id => {
        const movieStore = useMovieStore();
        const favoriteIdList = movieStore.movies.map(x => x.id);
        return favoriteIdList.includes(id)
    }

    const addToFavorite = (obj) => {
        const movieStore = useMovieStore();
        if (hasFavorite(obj.id)) {
            movieStore.movies = movieStore.movies.filter( x => x.id !== obj.id);

        } else {
            movieStore.movies.push({...obj, isWatched: false });
        }
      localStorage.setItem('storedMovies',  JSON.stringify(movieStore.movies))

    }

    return {
        isLoading,
        movies,
        getMovies,
        addToFavorite,
        hasFavorite
    }
})