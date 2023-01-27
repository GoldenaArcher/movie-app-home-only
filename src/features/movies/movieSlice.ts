import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

//action
export const getMovies = createAsyncThunk(
  'movies/getMovies',
  async (data, thunkApi) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MOVIE_KEY}`
      );

      return await response.json();
    } catch (error: unknown) {
      if (error instanceof Error)
        return thunkApi.rejectWithValue(error.message);
      else if (typeof error === 'string')
        return thunkApi.rejectWithValue(error);
    }
  }
);

interface MovieState {
  loading: boolean;
  error: null | string;
  data: null | { results: any[] };
}

const initialState: MovieState = {
  loading: false,
  error: null,
  data: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getMovies.fulfilled,
      (state, action: PayloadAction<{ results: any[] }>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(
      getMovies.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        if (typeof action.payload === 'string') state.error = action.payload;
      }
    );
  },
});

export const movieReducer = movieSlice.reducer;

export default movieSlice.reducer;
