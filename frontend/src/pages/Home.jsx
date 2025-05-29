// header + task
import CreateTaskForm from "../components/CreateTaskForm";
import Header from "../components/Header";
import Tasks from "../components/Tasks";

const Home = () => {
  return (
    <div>
      Home
      <Header />
      <CreateTaskForm />
      <Tasks />
    </div>
  );
};

export default Home;
