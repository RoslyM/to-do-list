import React from 'react';
import { Task } from "../../../domain/entities/task";
import { Pencil, Trash2 } from 'lucide-react';
import { TableRow, TableCell } from "@/userinterface/components/ui/table";
import {formatedDate} from "@/utils/formatedDate"


interface TaskItemProps {
  task: Task;
  onEditTaskClick: (task: Task) => void;
  onDeleteTaskClick: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEditTaskClick,onDeleteTaskClick}) => {;


  return (
    <TableRow>
      <TableCell className="font-medium">{task.libelle}</TableCell>
      <TableCell>{task.description}</TableCell>
      <TableCell>{task.status.charAt(0).toUpperCase() + task.status.slice(1)}</TableCell>
      <TableCell>{task.dueDate ? formatedDate(task.dueDate) : 'Non renseigné'}</TableCell>
      <TableCell className="text-right">
        <div className="flex space-x-4 justify-end">
          <Pencil onClick={() => onEditTaskClick(task)} className="cursor-pointer" />
          <Trash2 onClick={() => onDeleteTaskClick(task)} className="cursor-pointer" />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TaskItem;
