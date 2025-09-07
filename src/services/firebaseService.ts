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
  Timestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

// Team Members
export const addTeamMember = async (memberData: any, imageFile?: File) => {
  try {
    let imageUrl = '';
    
    if (imageFile) {
      const imageRef = ref(storage, `team-members/${uuidv4()}-${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const docRef = await addDoc(collection(db, 'teamMembers'), {
      ...memberData,
      imageUrl,
      createdAt: Timestamp.now()
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding team member:', error);
    return { success: false, error };
  }
};

export const getTeamMembers = async () => {
  try {
    const q = query(collection(db, 'teamMembers'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const members = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, data: members };
  } catch (error) {
    console.error('Error fetching team members:', error);
    return { success: false, error };
  }
};

export const updateTeamMember = async (id: string, memberData: any, imageFile?: File) => {
  try {
    let updateData = { ...memberData };
    
    if (imageFile) {
      const imageRef = ref(storage, `team-members/${uuidv4()}-${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      updateData.imageUrl = await getDownloadURL(snapshot.ref);
    }

    await updateDoc(doc(db, 'teamMembers', id), updateData);
    return { success: true };
  } catch (error) {
    console.error('Error updating team member:', error);
    return { success: false, error };
  }
};

export const deleteTeamMember = async (id: string, imageUrl?: string) => {
  try {
    if (imageUrl) {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    }
    
    await deleteDoc(doc(db, 'teamMembers', id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting team member:', error);
    return { success: false, error };
  }
};

// Hackathons
export const addHackathon = async (hackathonData: any, imageFile?: File) => {
  try {
    let imageUrl = '';
    
    if (imageFile) {
      const imageRef = ref(storage, `hackathons/${uuidv4()}-${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const docRef = await addDoc(collection(db, 'hackathons'), {
      ...hackathonData,
      imageUrl,
      createdAt: Timestamp.now()
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding hackathon:', error);
    return { success: false, error };
  }
};

export const getHackathons = async () => {
  try {
    const q = query(collection(db, 'hackathons'), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    const hackathons = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, data: hackathons };
  } catch (error) {
    console.error('Error fetching hackathons:', error);
    return { success: false, error };
  }
};

export const updateHackathon = async (id: string, hackathonData: any, imageFile?: File) => {
  try {
    let updateData = { ...hackathonData };
    
    if (imageFile) {
      const imageRef = ref(storage, `hackathons/${uuidv4()}-${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      updateData.imageUrl = await getDownloadURL(snapshot.ref);
    }

    await updateDoc(doc(db, 'hackathons', id), updateData);
    return { success: true };
  } catch (error) {
    console.error('Error updating hackathon:', error);
    return { success: false, error };
  }
};

export const deleteHackathon = async (id: string, imageUrl?: string) => {
  try {
    if (imageUrl) {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    }
    
    await deleteDoc(doc(db, 'hackathons', id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting hackathon:', error);
    return { success: false, error };
  }
};

// Applications
export const saveApplication = async (applicationData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'applications'), {
      ...applicationData,
      status: 'pending',
      createdAt: Timestamp.now()
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving application:', error);
    return { success: false, error };
  }
};

export const getApplications = async () => {
  try {
    const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const applications = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, data: applications };
  } catch (error) {
    console.error('Error fetching applications:', error);
    return { success: false, error };
  }
};

// Contact Messages
export const saveContactMessage = async (messageData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'contactMessages'), {
      ...messageData,
      status: 'unread',
      createdAt: Timestamp.now()
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving contact message:', error);
    return { success: false, error };
  }
};

export const getContactMessages = async () => {
  try {
    const q = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, data: messages };
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return { success: false, error };
  }
};