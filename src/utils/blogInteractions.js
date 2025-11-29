// src/utils/blogInteractions.js
export const getPostInteractions = (postId) => {
  if (typeof window === 'undefined') {
    return { likes: 0, comments: [], userLiked: false };
  }

  try {
    const interactions = JSON.parse(localStorage.getItem('blogInteractions') || '{}');
    return interactions[postId] || { likes: 0, comments: [], userLiked: false };
  } catch {
    return { likes: 0, comments: [], userLiked: false };
  }
};

export const toggleLike = (postId) => {
  if (typeof window === 'undefined') return;

  try {
    const interactions = JSON.parse(localStorage.getItem('blogInteractions') || '{}');
    const postInteractions = interactions[postId] || { likes: 0, comments: [], userLiked: false };
    
    if (postInteractions.userLiked) {
      postInteractions.likes = Math.max(0, postInteractions.likes - 1);
      postInteractions.userLiked = false;
    } else {
      postInteractions.likes += 1;
      postInteractions.userLiked = true;
    }
    
    interactions[postId] = postInteractions;
    localStorage.setItem('blogInteractions', JSON.stringify(interactions));
    
    return postInteractions;
  } catch (error) {
    console.error('Error toggling like:', error);
  }
};

export const addComment = (postId, commentData) => {
  if (typeof window === 'undefined') return;

  try {
    const interactions = JSON.parse(localStorage.getItem('blogInteractions') || '{}');
    const postInteractions = interactions[postId] || { likes: 0, comments: [], userLiked: false };
    
    const newComment = {
      id: Date.now(),
      ...commentData,
      date: new Date().toISOString(),
      likes: 0
    };
    
    postInteractions.comments.unshift(newComment);
    interactions[postId] = postInteractions;
    localStorage.setItem('blogInteractions', JSON.stringify(interactions));
    
    return newComment;
  } catch (error) {
    console.error('Error adding comment:', error);
  }
};

export const likeComment = (postId, commentId) => {
  if (typeof window === 'undefined') return;

  try {
    const interactions = JSON.parse(localStorage.getItem('blogInteractions') || '{}');
    const postInteractions = interactions[postId];
    
    if (postInteractions && postInteractions.comments) {
      const comment = postInteractions.comments.find(c => c.id === commentId);
      if (comment) {
        comment.likes = (comment.likes || 0) + 1;
        interactions[postId] = postInteractions;
        localStorage.setItem('blogInteractions', JSON.stringify(interactions));
      }
    }
  } catch (error) {
    console.error('Error liking comment:', error);
  }
};