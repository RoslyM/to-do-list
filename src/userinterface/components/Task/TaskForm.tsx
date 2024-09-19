import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Task } from "../../../domain/entities/task";
import { addTask, updateTask } from '../../../domain/usecases/taskSlice';
import { v4 as uuidv4 } from 'uuid';
import { DialogHeader, DialogTitle } from "@/userinterface/components/ui/dialog";
import { Input } from "@/userinterface/components/ui/input";
import { Label } from "@/userinterface/components/ui/label";
import { Textarea } from "@/userinterface/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/userinterface/components/ui/select";
import { formatedDateIso } from "@/utils/formatedDate";

const schema = yup.object({
  libelle: yup
    .string()
    .required("Veuillez saisir un libellé."),
  description: yup
    .string()
    .required("Veuillez saisir une description."),
  status: yup.string().required("Veuillez sélectionner un statut."),
  dueDate: yup.string(),
});

interface TaskFormProps {
  task?: Task | null;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onClose }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      libelle: task?.libelle || '',
      description: task?.description || '',
      status: task?.status || '',
      dueDate: task?.dueDate ? formatedDateIso(task.dueDate) : '',
    }
  });

  const onSubmit = (data: any) => {
    const newTask: Task = {
      id: task?.id || uuidv4(),
      libelle: data.libelle,
      description: data.description,
      status: data.status,
      dueDate: data.dueDate,
    };

    if (task) {
      dispatch(updateTask(newTask));
    } else {
      dispatch(addTask(newTask));
    }
    onClose();
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{task ? 'Modifier une tâche' : 'Ajouter une tâche'}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5 mt-5">
        <div className='flex space-x-3'>
          <div className="flex flex-col space-y-2 w-full">
            <Label htmlFor="libelle">Libellé</Label>
            <Input
              {...register('libelle')}
              type="text"
              placeholder="Entrer le libellé"
              className={errors.libelle && 'border-red-500'}            />
            {errors.libelle && <span className="text-red-500 text-[.8rem]">{errors.libelle.message}</span>}
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <Label htmlFor="description">Description</Label>
            <Textarea
              {...register('description')}
              className={errors.description && 'border-red-500'}
              placeholder="Entrer la description"
            />
            {errors.description && <span className="text-red-500 text-[.8rem]">{errors.description.message}</span>}
          </div>
        </div>
        <div className='flex space-x-3'>
          <div className="flex flex-col space-y-3 w-full">
            <Label htmlFor="status">Statut</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className={errors.status && 'border-red-500'}>
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Statut</SelectLabel>
                      <SelectItem value="en cours">En cours</SelectItem>
                      <SelectItem value="terminé">Terminé</SelectItem>
                      <SelectItem value="annulé">Annulé</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && <span className="text-red-500 text-[.8rem]">{errors.status.message}</span>}
          </div>
          <div className="flex flex-col space-y-3 w-full">
            <Label htmlFor="dueDate">Date d'échéance</Label>
            <input
              {...register('dueDate')}
              type="date"
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>
        <button type="submit" className="bg-[#08080A] rounded-md text-white py-2 px-4">
          {task ? 'Modifier' : 'Ajouter'}
        </button>
      </form>
    </>
  );
};

export default TaskForm;
