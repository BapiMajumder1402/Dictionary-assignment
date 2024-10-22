import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL;

export const wordsApi = createApi({
    reducerPath: 'wordsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Word', 'Search'], // Added 'Search' tag type
    endpoints: (builder) => ({
        getWords: builder.query({
            query: () => '/words',
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Word', id })), 'Word'] 
                    : ['Word'],
        }),
        addWord: builder.mutation({
            query: (newWord) => ({
                url: '/words',
                method: 'POST',
                body: newWord,
            }),
            invalidatesTags: ['Word'], 
        }),
        deleteWord: builder.mutation({
            query: (id) => ({
                url: `/words/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Word', id }],
        }),
        addMeaning: builder.mutation({
            query: ({ id, meaning }) => ({
                url: `/words/${id}/meanings`,
                method: 'POST',
                body: { meaning },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Word', id },  // Invalidate the individual word
                'Word',                // Invalidate the word list
                { type: 'Search', id }, // Invalidate searchWords cache
            ],
        }),
        updateMeaning: builder.mutation({
            query: ({ id, meaningId, meaning }) => ({
                url: `/words/${id}/meanings/${meaningId}`,
                method: 'PUT',
                body: { meaning },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Word', id }],
        }),
        deleteMeaning: builder.mutation({
            query: ({ id, meaningId }) => ({
                url: `/words/${id}/meanings/${meaningId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Word', id }], 
        }),
        updateWordName: builder.mutation({
            query: ({ id, wordName }) => ({
                url: `/words/${id}`,
                method: 'PUT',
                body: { wordName },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Word', id }], 
        }),
        searchWords: builder.query({
            query: (searchQuery) => `/words/search?query=${searchQuery}`,
            providesTags: (result, error, id) => [{ type: 'Search', id}], 
        }),
        getWordById: builder.query({
            query: (id) => `/words/${id}`,
            providesTags: (result, error, id) => [{ type: 'Word', id }],
        }),
        getAllWords: builder.query({
            query: ({ page = 1, limit = 10 }) => `/words?page=${page}&limit=${limit}`,
            providesTags: (result) => {
                if (!result || !Array.isArray(result)) return ['Word'];
                return [...result.map(({ id }) => ({ type: 'Word', id })), 'Word'];
            },
        }),
        
    }),
});

export const {
    useGetWordsQuery,
    useAddWordMutation,
    useDeleteWordMutation,
    useAddMeaningMutation,
    useUpdateMeaningMutation,
    useDeleteMeaningMutation,
    useUpdateWordNameMutation,
    useSearchWordsQuery,
    useGetWordByIdQuery,
    useGetAllWordsQuery, 
} = wordsApi;

export default wordsApi;
