import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const ReviewsSection = ({ reviews = [], averageRating = 0, totalReviews = 0 }) => {
    const currentRating = averageRating || 0;
    const count = totalReviews || 0;
    const finalReviews = reviews;

    // Calculate distribution
    const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    finalReviews.forEach(r => {
        const rounded = Math.round(r.rating);
        if (ratingCounts[rounded] !== undefined) ratingCounts[rounded]++;
    });

    return (
        <div className="bg-white rounded-b-xl shadow-sm border border-t-0 border-gray-100 p-5 h-full flex flex-col w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4 shrink-0">Reviews</h3>

            {/* Rating Summary */}
            <div className="flex items-center gap-4 mb-6 shrink-0">
                <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900">{currentRating.toFixed(1)}</div>
                    <div className="flex text-yellow-500 text-sm my-1 justify-center">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < Math.round(currentRating) ? "text-yellow-500" : "text-gray-300"} />
                        ))}
                    </div>
                    <div className="text-xs text-gray-500">{count} reviews</div>
                </div>

                <div className="flex-1 space-y-1">
                    {[5, 4, 3, 2, 1].map((star) => {
                        const starCount = ratingCounts[star] || 0;
                        const percentage = count > 0 ? (starCount / count) * 100 : 0;
                        return (
                            <div key={star} className="flex items-center gap-2 text-xs">
                                <span className="w-3 text-gray-600 font-medium">{star}</span>
                                <FaStar className="text-gray-300 w-3 h-3" />
                                <Progress value={percentage} className="h-1.5 flex-1" />
                                <span className="text-gray-500 w-6 text-right">({starCount})</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Review List */}
            <div className="space-y-4 overflow-y-auto pr-1">
                {finalReviews.length === 0 ? (
                    <div className="text-center text-gray-500 text-sm py-4">No reviews yet.</div>
                ) : (
                    finalReviews.map((review) => {
                        const avatarUrl = review.user?.avatar?.url || review.user?.avatar;
                        return (
                            <div key={review._id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <Avatar className="w-6 h-6">
                                        <AvatarImage src={avatarUrl} />
                                        <AvatarFallback>{review.user?.name?.charAt(0) || 'U'}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs font-semibold text-gray-900">{review.user?.name || "User"}</span>
                                    <span className="text-xs text-gray-400">• {new Date(review.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex text-yellow-500 text-xs mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"} />
                                    ))}
                                </div>
                                {review.comment && <p className="text-xs text-gray-600 leading-relaxed">{review.comment}</p>}
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    );
};

export default ReviewsSection;
