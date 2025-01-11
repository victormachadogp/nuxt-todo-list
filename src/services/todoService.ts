import { ref } from "vue";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  type Firestore,
} from "firebase/firestore";
import type { Todo } from "../types/todo";
import { useToast } from "vue-toastification";
import { initializeFirebase } from "./firebase";

export const useTodos = () => {
  const todos = ref<Todo[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const toast = useToast();

  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: "nuxt-back-28fe6.firebaseapp.com",
    projectId: "nuxt-back-28fe6",
    storageBucket: "nuxt-back-28fe6.firebasestorage.app",
    messagingSenderId: "315538127937",
    appId: "1:315538127937:web:fadb80711d5a0c6dd49ac0",
  };

  const { db } = initializeFirebase(firebaseConfig);

  const getDb = (): Firestore => {
    if (!db) {
      throw new Error("Firestore não foi inicializado corretamente");
    }
    return db;
  };

  const fetchTodos = async (): Promise<void> => {
    loading.value = true;
    try {
      const querySnapshot = await getDocs(collection(getDb(), "todos"));
      todos.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Todo, "id">),
        createdAt: doc.data().createdAt?.toDate(),
      }));
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Erro desconhecido";
      error.value = errorMessage;
      toast.error("Erro ao carregar as tarefas");
    } finally {
      loading.value = false;
    }
  };

  const addTodo = async (title: string): Promise<void> => {
    try {
      const docRef = await addDoc(collection(getDb(), "todos"), {
        title,
        completed: false,
        createdAt: new Date(),
      });

      todos.value.unshift({
        id: docRef.id,
        title,
        completed: false,
        createdAt: new Date(),
      });

      toast.success("Tarefa criada com sucesso!");
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Erro desconhecido";
      error.value = errorMessage;
      toast.error("Erro ao criar a tarefa");
    }
  };

  const updateTodo = async (todoId: string, title: string): Promise<void> => {
    try {
      await updateDoc(doc(getDb(), "todos", todoId), { title });
      const todoIndex = todos.value.findIndex((todo) => todo.id === todoId);
      if (todoIndex !== -1) {
        todos.value[todoIndex] = {
          ...todos.value[todoIndex],
          title,
        };
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Erro desconhecido";
      error.value = errorMessage;
      toast.error("Erro ao atualizar a tarefa");
    }
  };

  const toggleTodo = async (todoId: string): Promise<void> => {
    const todo = todos.value.find((t) => t.id === todoId);
    if (!todo) return;

    try {
      todo.completed = !todo.completed;
      await updateDoc(doc(getDb(), "todos", todoId), {
        completed: todo.completed,
      });
    } catch (e) {
      todo.completed = !todo.completed;
      const errorMessage = e instanceof Error ? e.message : "Erro desconhecido";
      error.value = errorMessage;
      toast.error("Erro ao atualizar o status da tarefa");
    }
  };

  const deleteTodo = async (todoId: string): Promise<void> => {
    try {
      await deleteDoc(doc(getDb(), "todos", todoId));
      todos.value = todos.value.filter((todo) => todo.id !== todoId);
      toast.info("Tarefa excluída com sucesso!");
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Erro desconhecido";
      error.value = errorMessage;
      toast.error("Erro ao excluir a tarefa");
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
