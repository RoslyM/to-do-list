import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTasks } from '../domain/usecases/taskSlice';
import dayjs from 'dayjs';
import {getSuccess} from "./toast"

export const useTaskNotifications = () => {
  const tasks = useSelector(selectTasks);

  useEffect(() => {
    const now = dayjs();
    tasks.forEach((task) => {
      if (task.dueDate && dayjs(task.dueDate).isBefore(now.add(1, 'day')) && task.status == 'en cours') {
        const message: string = `La tâche ${task.libelle} approche de sa date limite !`
        getSuccess(message)
      }
    });
  }, [tasks]);
};
