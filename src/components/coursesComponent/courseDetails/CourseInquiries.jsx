import React from 'react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { useDeleteCommentMutation } from '@/redux/api/endPoints/commentsApiSlice';
import { Trash2, MessageSquareReply } from 'lucide-react';
import DeleteModal from '@/components/shared/DeleteModal';

const CourseInquiries = ({ comments = [], teacherId }) => {
    const { userInfo } = useSelector(state => state.auth);
    const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();
    const [deletingId, setDeletingId] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);

    const onDeleteClick = (commentId, targetId) => {
        setSelectedComment({ id: commentId, targetId });
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!selectedComment) return;

        try {
            await deleteComment({ id: selectedComment.id, targetId: selectedComment.targetId }).unwrap();
            setShowDeleteModal(false);
            setSelectedComment(null);
        } catch (err) {
            console.error("Failed to delete comment:", err);
            setShowDeleteModal(false);
            // Optional: Show toast or alert error
        }
    };

    if (!comments.length) {
        return (
            <div className='p-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-200'>
                <p className="text-gray-500 mb-2">No inquiries yet.</p>
                <p className="text-sm text-gray-400">Have a question? Ask the instructor!</p>
            </div>
        )
    }

    return (
        <div className='max-h-[600px] overflow-y-auto pr-2'>
            <ul className='space-y-6'>
                {comments.map(comment => {
                    const isInstructor = teacherId && comment.user?._id === teacherId;
                    const isAuthor = userInfo?.user?._id === comment.user?._id;

                    return (
                        <li key={comment._id} className='flex gap-4 items-start group'>
                            <Avatar className={`w-10 h-10 border ${isInstructor ? 'border-pink-500 ring-2 ring-pink-100' : 'border-gray-200'} mt-1 shrink-0`}>
                                <AvatarImage src={comment.user?.avatar?.url || comment.user?.avatar} />
                                <AvatarFallback>{comment.user?.name?.charAt(0) || 'U'}</AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                {/* Inquiry Header */}
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-gray-900 text-sm">{comment.user?.name || "Unknown"}</h4>

                                        {isInstructor && (
                                            <Badge className="text-[10px] px-1.5 py-0 h-5 bg-pink-100 text-pink-700 hover:bg-pink-200 border-none shadow-none">
                                                Author
                                            </Badge>
                                        )}

                                        <span className="text-xs text-gray-400">• {new Date(comment.createdAt).toLocaleDateString()}</span>
                                    </div>

                                    {isAuthor && (
                                        <button
                                            onClick={() => onDeleteClick(comment._id, comment.target)}
                                            className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-1"
                                            title="Delete comment"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                {/* Inquiry Content */}
                                <p className="text-gray-700 text-sm leading-relaxed mb-2">
                                    {comment.content}
                                </p>

                            </div>
                        </li>
                    )
                })}
            </ul>

            <DeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                title="Delete Comment"
                description="Are you sure you want to delete this comment? This action cannot be undone."
                isLoading={isDeleting}
            />
        </div>
    )
}

export default CourseInquiries;
