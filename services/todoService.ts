import { ref } from "vue";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFcLUWjDkAk7IDM3Q3Yv3T_86FtLlciLg",
  authDomain: "nuxt-back-28fe6.firebaseapp.com",
  projectId: "nuxt-back-28fe6",
  storageBucket: "nuxt-back-28fe6.firebasestorage.app",
  messagingSenderId: "315538127937",
  appId: "1:315538127937:web:fadb80711d5a0c6dd49ac0",
};

export const useTodos = () => {
  const todos = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const fetchTodos = async () => {
    loading.value = true;
    try {
      const querySnapshot = await getDocs(collection(db, "todos"));
      todos.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  const addTodo = async (title) => {
    try {
      await addDoc(collection(db, "todos"), {
        title,
        completed: false,
        createdAt: new Date(),
      });
      await fetchTodos();
    } catch (e) {
      error.value = e.message;
    }
  };

  return {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
  };
};
