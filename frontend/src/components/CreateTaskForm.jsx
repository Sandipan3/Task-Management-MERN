import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const CreateTaskForm = () => {
  const initialState = {
    title: "",
    completed: "false",
    // deadline: Date.now(),
    // remindAt: Date.now(),
    deadline: new Date(),
    remindAt: new Date(),
  };
  const [formData, setFormData] = useState(initialState);
  const [checked, setChecked] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const changeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    //check all fields completed if not toast error
    //post task on backend api
    //manage error is catch and finally clean

    // in post req for the body spread existing form data, with checked useState   e.g. ...formData, Completed:checked
    // then create post request with the updated formdata and send to backend
  };
  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col mx-auto items-center space-y-6 bg-white p-6 rounded-lg max-w-md w-full"
    >
      <div className="w-full">
        <label
          htmlFor="title"
          className="block text-2xl font-medium text-gray-700 mb-1"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={changeHandler}
          placeholder="Title"
          className="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>

      <div className="w-full relative">
        <label
          htmlFor="completed"
          className="block  font-medium text-gray-700 mb-1 text-2xl"
        >
          Completed
        </label>
        <input
          type="checkbox"
          id="completed"
          name="completed"
          value={formData.completed}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked())}
          className="w-full border border-gray-300 rounded-lg p-2 absolute"
        />
      </div>

      <div className="w-full">
        <label
          htmlFor="deadline"
          className="block text-2xl font-medium text-gray-700 mb-1 "
        >
          Deadline
        </label>
        <DatePicker
          selectedDate={formData.deadline}
          onChange={(date) => setFormData({ ...formData, deadline: date })}
          minDate={today}
          placeholder="Select from Today onwards"
        ></DatePicker>
        {/* <input
          type="date"
          id="deadline"
          name="deadline"
          value={formData.deadline}
          onChange={changeHandler}
          className="w-full border border-gray-300 rounded-lg p-2 "
           min={}
        /> */}
      </div>

      <div className="w-full">
        <label
          htmlFor="remindAt"
          className="block text-2xl font-medium text-gray-700 mb-1"
        >
          Remind At
        </label>
        <input
          type="date"
          id="remindAt"
          name="remindAt"
          alue={formData.deadline}
          onChange={changeHandler}
          className="w-full border border-gray-300 rounded-lg p-2 "
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium rounded-lg py-2 hover:bg-blue-700"
      >
        Create
      </button>
    </form>
  );
};

export default CreateTaskForm;
