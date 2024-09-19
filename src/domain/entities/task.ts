export interface Task {
  id:string;
  libelle: string;
  description: string;
  status: 'en cours' | 'terminé' | 'annulé';
  dueDate?: string;
}


