import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Task } from "../../../domain/entities/task";
import { selectTasks } from '../../../domain/usecases/taskSlice';
import { Button } from "@/userinterface/components/ui/button";
import TaskItem from './TaskItem';
import { Dialog, DialogTrigger, DialogTitle, DialogContent, DialogDescription } from "@/userinterface/components/ui/dialog";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/userinterface/components/ui/table";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "@/userinterface/components/ui/select";
import TaskForm from './TaskForm';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../../domain/usecases/taskSlice';


const TaskList: React.FC = () => {
  const tasks = useSelector(selectTasks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const dispatch = useDispatch();
  const [isDialogOpenDelete, setIsDialogOpenDelete] = useState(false)
 
  const handleEditTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  const handleDeleteTaskClick = (task: Task) => {
    setIsDialogOpenDelete(true)
    setSelectedTask(task)
  };

  const handleDeleteTask = (id : string) =>{
    dispatch(deleteTask(id));
    setIsDialogOpenDelete(false)
  }
  
  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedTask(null);
  };

  const openDialog = () => {
    setIsDialogOpen(true);
    setSelectedTask(null);
  };
  const [filter, setFilter] = useState<'en cours' | 'terminé' | 'annulé' | 'all'>('all');
  const filteredTasks = filter === 'all' ? tasks : tasks.filter((task: { status: string }) => task.status === filter);

  return (
    <div>

    <div className='flex items-center justify-between mb-5 w-full'>
      <Dialog open={isDialogOpen} onOpenChange={(isOpen) => setIsDialogOpen(isOpen)}>
          <DialogTrigger asChild>
            <Button onClick={openDialog} variant="outline">Ajouter une tâche</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogDescription>
              {selectedTask ? "Modifier la tâche" : "Ajouter une nouvelle tâche"}
            </DialogDescription>
            {isDialogOpen && <TaskForm task={selectedTask} onClose={closeDialog} />}
          </DialogContent>
        </Dialog>

      <div className='flex space-x-5 items-center flex-1 justify-end'>
        <h3 className='text-xl text-white font-semibold'>Filtrer par statut</h3>
        <Select onValueChange={(value) => setFilter(value as 'en cours' | 'terminé' | 'annulé' | 'all')}>
          <SelectTrigger filter={true} className='max-w-[225px]'>
            <SelectValue placeholder="Sélectionner un filtre" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filtres</SelectLabel>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="en cours">En cours</SelectItem>
              <SelectItem value="terminé">Terminés</SelectItem>
              <SelectItem value="annulé">Annulés</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>


      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Libellé</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date d'échéance</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task: Task) => (
              <TaskItem onDeleteTaskClick={(task)=>handleDeleteTaskClick(task)} onEditTaskClick={(task)=>handleEditTaskClick(task)} key={task.id} task={task} />
            ))}
          </TableBody>
        </Table>
      </div>


      <Dialog open={isDialogOpenDelete} onOpenChange={(isOpen) => setIsDialogOpenDelete(isOpen)}>
        <DialogContent>
       <DialogTitle className='hidden'>Hidden Title for Screen Readers</DialogTitle>
       <DialogDescription>
           Suppression d'une tâche
       </DialogDescription>
         <p>Voulez vous vraiment supprimer la tâche <span className='font-bold'>{selectedTask?.libelle} ??? </span></p>
         <div className='mt-5 flex items-center space-x-5 w-full'>
              <Button onClick={()=>setIsDialogOpenDelete(false)} className='w-full'>Annuler</Button>
              <Button onClick={() => selectedTask?.id && handleDeleteTask(selectedTask.id)} className='w-full bg-red-500 hover:bg-red-400'>Supprimer</Button>
         </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskList;
