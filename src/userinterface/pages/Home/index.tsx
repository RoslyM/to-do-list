import TaskList from '../../components/Task/TaskList';
import { useTaskNotifications } from '../../../hooks/useTaskNotifications';

function HomePage() {
  useTaskNotifications();
  return (
    <div className="container mx-auto px-4 py-7">
      <h1 className="text-4xl text-white text-center font-bold mb-4">Gestion de Tâches</h1>
      <TaskList/>
    </div>
  );
}

export default HomePage;
