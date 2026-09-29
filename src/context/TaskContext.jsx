import { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

const INITIAL_TASKS = [
  {
    id: '1',
    judul: 'Membuat ERD Database Perpustakaan',
    deskripsi: 'Rancang Entity Relationship Diagram untuk modul peminjaman dan pengembalian buku.',
    deadline: '2026-10-05',
    mataPelajaran: 'Basis Data',
    selesai: false,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    judul: 'Slicing UI Dashboard TugasRPL',
    deskripsi: 'Implementasi komponen React dan Tailwind CSS sesuai prototipe.',
    deadline: '2026-10-01',
    mataPelajaran: 'Pemrograman Web',
    selesai: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    judul: 'Laporan Praktikum OOP Java',
    deskripsi: 'Buat laporan analisa konsep Polymorphism dan Inheritance beserta contoh kode.',
    deadline: '2026-10-10',
    mataPelajaran: 'PBO',
    selesai: false,
    createdAt: new Date().toISOString()
  }
];

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tugasrpl_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  useEffect(() => {
    localStorage.setItem('tugasrpl_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    const task = {
      ...newTask,
      id: Date.now().toString(),
      selesai: false,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [task, ...prev]);
  };

  const updateTask = (id, updatedData) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updatedData } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleStatus = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, selesai: !t.selesai } : t));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleStatus }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
