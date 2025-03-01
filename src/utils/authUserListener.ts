import { supbase } from "./supbaseClient";

export const listenAuthChanges = () => {
  supbase.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN" && session?.user) {
      console.log("Пользователь вошел в систему:", session.user);
      // Никакого insert тут не нужно!
    }
  });
};
