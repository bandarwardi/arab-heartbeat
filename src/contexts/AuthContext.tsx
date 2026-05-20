import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { getFirebaseAuth, getDb, googleProvider } from "@/lib/firebase";

export type UserProfile = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phone?: string | null;
  country?: string | null;
  role: "user" | "admin";
  subscriptionStatus: "none" | "active" | "trialing" | "canceled" | "past_due";
  createdAt?: unknown;
  planId?: string;
  planTitle?: string;
  connections?: number;
  price?: number;
  paddleTransactionId?: string | null;
  paddleSubscriptionId?: string | null;
  paddleCustomerId?: string | null;
};

type AuthContextValue = {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  reloadProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function ensureUserDoc(user: User, extra?: Partial<UserProfile>) {
  const db = getDb();
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    const data: UserProfile = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName ?? extra?.displayName ?? null,
      photoURL: user.photoURL ?? null,
      phone: user.phoneNumber ?? null,
      country: null,
      role: "user",
      subscriptionStatus: "none",
      createdAt: serverTimestamp(),
      ...extra,
    };
    await setDoc(ref, data);
    return data;
  }
  return snap.data() as UserProfile;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const auth = getFirebaseAuth();
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          const p = await ensureUserDoc(u);
          setProfile(p);
        } catch (e) {
          console.error("Failed to load profile:", e);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const value: AuthContextValue = {
    user,
    profile,
    loading,
    async signUpWithEmail(email, password, displayName) {
      const auth = getFirebaseAuth();
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) await updateProfile(cred.user, { displayName });
      await ensureUserDoc(cred.user, { displayName });
    },
    async signInWithEmail(email, password) {
      const auth = getFirebaseAuth();
      await signInWithEmailAndPassword(auth, email, password);
    },
    async signInWithGoogle() {
      const auth = getFirebaseAuth();
      const cred = await signInWithPopup(auth, googleProvider);
      await ensureUserDoc(cred.user);
    },
    async resetPassword(email) {
      const auth = getFirebaseAuth();
      await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/login`,
      });
    },
    async logout() {
      const auth = getFirebaseAuth();
      await signOut(auth);
    },
    async reloadProfile() {
      if (!user) return;
      const db = getDb();
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        setProfile(snap.data() as UserProfile);
      }
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}