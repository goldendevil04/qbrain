import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  Timestamp,
  getDoc 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: string;
  tags: string[];
  category: string;
  status: 'draft' | 'published';
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    canonicalUrl?: string;
  };
  faq?: {
    question: string;
    answer: string;
  }[];
  readTime: number;
  createdAt?: any;
  updatedAt?: any;
  publishedAt?: any;
}

export const createBlogPost = async (postData: BlogPost, featuredImageFile?: File) => {
  try {
    let featuredImage = '';
    
    if (featuredImageFile) {
      const imageRef = ref(storage, `blog-images/${uuidv4()}-${featuredImageFile.name}`);
      const snapshot = await uploadBytes(imageRef, featuredImageFile);
      featuredImage = await getDownloadURL(snapshot.ref);
    }

    const docRef = await addDoc(collection(db, 'blogPosts'), {
      ...postData,
      featuredImage,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      publishedAt: postData.status === 'published' ? Timestamp.now() : null
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating blog post:', error);
    return { success: false, error };
  }
};

export const updateBlogPost = async (id: string, postData: BlogPost, featuredImageFile?: File) => {
  try {
    let updateData = { ...postData };
    
    if (featuredImageFile) {
      const imageRef = ref(storage, `blog-images/${uuidv4()}-${featuredImageFile.name}`);
      const snapshot = await uploadBytes(imageRef, featuredImageFile);
      updateData.featuredImage = await getDownloadURL(snapshot.ref);
    }

    updateData.updatedAt = Timestamp.now();
    
    if (postData.status === 'published' && !postData.publishedAt) {
      updateData.publishedAt = Timestamp.now();
    }

    await updateDoc(doc(db, 'blogPosts', id), updateData);
    return { success: true };
  } catch (error) {
    console.error('Error updating blog post:', error);
    return { success: false, error };
  }
};

export const deleteBlogPost = async (id: string, featuredImage?: string) => {
  try {
    if (featuredImage) {
      const imageRef = ref(storage, featuredImage);
      await deleteObject(imageRef);
    }
    
    await deleteDoc(doc(db, 'blogPosts', id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return { success: false, error };
  }
};

export const getBlogPosts = async (status?: 'draft' | 'published') => {
  try {
    let q;
    if (status) {
      q = query(
        collection(db, 'blogPosts'), 
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(collection(db, 'blogPosts'), orderBy('createdAt', 'desc'));
    }
    
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, data: posts };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { success: false, error };
  }
};

export const getBlogPostBySlug = async (slug: string) => {
  try {
    const q = query(collection(db, 'blogPosts'), where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return { success: false, error: 'Post not found' };
    }
    
    const post = {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data()
    };
    
    return { success: true, data: post };
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return { success: false, error };
  }
};

export const getBlogPostById = async (id: string) => {
  try {
    const docRef = doc(db, 'blogPosts', id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return { success: false, error: 'Post not found' };
    }
    
    const post = {
      id: docSnap.id,
      ...docSnap.data()
    };
    
    return { success: true, data: post };
  } catch (error) {
    console.error('Error fetching blog post by ID:', error);
    return { success: false, error };
  }
};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};