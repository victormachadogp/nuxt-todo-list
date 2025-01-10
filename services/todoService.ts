import { ref } from "vue";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const useTodos = () => {
  const todos = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: "nuxt-back-28fe6.firebaseapp.com",
    projectId: "nuxt-back-28fe6",
    storageBucket: "nuxt-back-28fe6.firebasestorage.app",
    messagingSenderId: "315538127937",
    appId: "1:315538127937:web:fadb80711d5a0c6dd49ac0",
  };

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

  const updateTodo = async (todoId, title) => {
    try {
      await updateDoc(doc(db, "todos", todoId), { title });
      await fetchTodos();
    } catch (e) {
      error.value = e.message;
    }
  };

  const toggleTodo = async (todoId) => {
    const todo = todos.value.find((t) => t.id === todoId);
    try {
      await updateDoc(doc(db, "todos", todoId), {
        completed: !todo.completed,
      });
      await fetchTodos();
    } catch (e) {
      error.value = e.message;
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await deleteDoc(doc(db, "todos", todoId));
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
    updateTodo,
    toggleTodo,
    deleteTodo,
  };
};
