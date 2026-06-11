import { auth } from "@/firebase/firebase";
import { getProfile } from "@/firebase/profile";
import useAuthStore from "@/store/authStore";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect } from "react";

const useAuth = () => {
  const { setUser, setProfile, user, setLoading } = useAuthStore();

  useEffect(() => {
    if (!auth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser: User | null) => {
        if (currentUser) {
          setUser(currentUser);

          try {
            const profileData = await getProfile();
            setProfile(profileData);
          } catch (err) {
            console.error("Failed to fetch profile:", err);
            setProfile(null);
          } finally {
            setLoading(false);
          }
          // console.log("User logged in:", currentUser);
        } else {
          setUser(null);
          setProfile(null);
          setLoading(false);
          console.log("User logged out");
        }
      },
    );

    return () => unsubscribe();
  }, []);
  return { user };
};

export default useAuth;
