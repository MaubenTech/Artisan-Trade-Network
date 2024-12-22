import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Review {
	_id: string;
	userId: string;
	artisanId: string;
	jobId: string;
	rating: number;
	header: string;
	title: string;
	comment: string;
	createdAt: string; //TODO: Check if this property can use the Date type instead of string, to keep formatting, etc.
}

interface ArtisanReview {
	totalReviews: number;
	currentPage: number;
	totalPages: number;
	reviews: Review[];
}

const initialState: ArtisanReview = {
	totalReviews: 3,
	currentPage: 1,
	totalPages: 1,
	reviews: [
		{
			_id: "1",
			userId: "1",
			artisanId: "1",
			jobId: "1",
			header: 'Job Review',
			title: 'Need to repair my toilet',
			rating: 5,
			comment: "Nice job!",
			createdAt: new Date().toString(),
		},
		{
			_id: "2",
			userId: "1",
			artisanId: "1",
			jobId: "1",
			header: 'Job Review',
			title: 'You did a shitty work',
			rating: 3,
			comment: "You wasted my time, hence the 3 stars.",
			createdAt: new Date().toString(),
		},
		{
			_id: "3",
			userId: "1",
			artisanId: "1",
			jobId: "1",
			header: 'Job Review',
			title: 'Need to repair my kitchen',
			rating: 1,
			comment: "This was a total waste of money!!",
			createdAt: new Date().toString(),
		},
	],
};

const reviewSlice = createSlice({
	name: "reviews",
	initialState,
	reducers: {
		updateReviewRating: (state, action: PayloadAction<{ _id: string, rating: number }>) => {
			const review = state.reviews.find((review) => review._id === action.payload._id);
			if (review) review.rating = action.payload.rating;
		}
	},
	selectors: {
		selectReviews: (reviews: ArtisanReview) => reviews,

		selectAllReviews: (reviews: ArtisanReview)=> reviews.reviews,
	}
});

export const { updateReviewRating} = reviewSlice.actions;

export const { selectReviews, selectAllReviews } = reviewSlice.selectors;

export default reviewSlice.reducer;
