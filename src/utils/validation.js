// src/utils/validation.js

/**
 * أدوات التحقق من صحة البيانات والإدخالات
 */

// التحقق من صحة بيانات الكومنت
export const validateComment = (commentData) => {
  const errors = {};
  
  // التحقق من الاسم
  if (!commentData.name?.trim()) {
    errors.name = 'Name is required';
  } else if (commentData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  // التحقق من البريد الإلكتروني
  if (!commentData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(commentData.email)) {
    errors.email = 'Email address is invalid';
  }
  
  // التحقق من محتوى الكومنت
  if (!commentData.comment?.trim()) {
    errors.comment = 'Comment is required';
  } else if (commentData.comment.trim().length < 10) {
    errors.comment = 'Comment must be at least 10 characters';
  } else if (commentData.comment.trim().length > 500) {
    errors.comment = 'Comment must be less than 500 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// التحقق من صحة البريد الإلكتروني
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// تقصير النص مع إضافة نقاط
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength).trim() + '...';
};