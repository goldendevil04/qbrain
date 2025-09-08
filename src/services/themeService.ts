import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc 
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface ThemeConfig {
  id?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  animations: {
    duration: string;
    easing: string;
  };
  layout: {
    maxWidth: string;
    headerHeight: string;
    footerHeight: string;
  };
}

const defaultTheme: ThemeConfig = {
  colors: {
    primary: '#00D4FF',
    secondary: '#39FF14',
    accent: '#8B5CF6',
    background: '#0F172A',
    surface: '#1E293B',
    text: '#FFFFFF',
    textSecondary: '#94A3B8'
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif'
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem'
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem'
  },
  animations: {
    duration: '300ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },
  layout: {
    maxWidth: '1200px',
    headerHeight: '80px',
    footerHeight: '200px'
  }
};

export const getThemeConfig = async (): Promise<ThemeConfig> => {
  try {
    const docRef = doc(db, 'settings', 'theme');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as ThemeConfig;
    } else {
      // Create default theme if it doesn't exist
      await setDoc(docRef, defaultTheme);
      return defaultTheme;
    }
  } catch (error) {
    console.error('Error fetching theme config:', error);
    return defaultTheme;
  }
};

export const updateThemeConfig = async (themeConfig: Partial<ThemeConfig>) => {
  try {
    const docRef = doc(db, 'settings', 'theme');
    await updateDoc(docRef, themeConfig);
    return { success: true };
  } catch (error) {
    console.error('Error updating theme config:', error);
    return { success: false, error };
  }
};

export const applyThemeToDOM = (theme: ThemeConfig) => {
  const root = document.documentElement;
  
  // Apply CSS custom properties
  root.style.setProperty('--color-primary', theme.colors.primary);
  root.style.setProperty('--color-secondary', theme.colors.secondary);
  root.style.setProperty('--color-accent', theme.colors.accent);
  root.style.setProperty('--color-background', theme.colors.background);
  root.style.setProperty('--color-surface', theme.colors.surface);
  root.style.setProperty('--color-text', theme.colors.text);
  root.style.setProperty('--color-text-secondary', theme.colors.textSecondary);
  
  root.style.setProperty('--font-heading', theme.fonts.heading);
  root.style.setProperty('--font-body', theme.fonts.body);
  
  root.style.setProperty('--spacing-xs', theme.spacing.xs);
  root.style.setProperty('--spacing-sm', theme.spacing.sm);
  root.style.setProperty('--spacing-md', theme.spacing.md);
  root.style.setProperty('--spacing-lg', theme.spacing.lg);
  root.style.setProperty('--spacing-xl', theme.spacing.xl);
  
  root.style.setProperty('--border-radius-sm', theme.borderRadius.sm);
  root.style.setProperty('--border-radius-md', theme.borderRadius.md);
  root.style.setProperty('--border-radius-lg', theme.borderRadius.lg);
  root.style.setProperty('--border-radius-xl', theme.borderRadius.xl);
  
  root.style.setProperty('--animation-duration', theme.animations.duration);
  root.style.setProperty('--animation-easing', theme.animations.easing);
  
  root.style.setProperty('--layout-max-width', theme.layout.maxWidth);
  root.style.setProperty('--layout-header-height', theme.layout.headerHeight);
  root.style.setProperty('--layout-footer-height', theme.layout.footerHeight);
};