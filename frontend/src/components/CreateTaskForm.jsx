import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateTaskForm = () => {
  const initialState = {
    title: "",
    completed: false,
    deadline: new Date(),
    remindAt: new Date(),
  };
  const [formData, setFormData] = useState(initialState);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const changeHandler = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
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
      className="flex flex-col mx-auto items-center space-y-6 bg-slate-100 p-6 rounded-lg max-w-md w-full"
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

      <div className="w-full">
        <label
          htmlFor="completed"
          className="block font-medium text-gray-700 mb-1 text-2xl"
        >
          Completed
        </label>
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={formData.completed}
          onChange={changeHandler}
          className="mr-2"
        />
        <span>{formData.completed ? "Yes" : "No"}</span>
      </div>

      <div className="w-full">
        <label
          htmlFor="deadline"
          className="block text-2xl font-medium text-gray-700 mb-1"
        >
          Deadline
        </label>
        <DatePicker
          selected={formData.deadline}
          onChange={(date) =>
            setFormData((prevState) => ({ ...prevState, deadline: date }))
          }
          minDate={today}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>

      <div className="w-full">
        <label
          htmlFor="remindAt"
          className="block text-2xl font-medium text-gray-700 mb-1"
        >
          Remind At
        </label>
        <DatePicker
          selected={formData.remindAt}
          onChange={(date) =>
            setFormData((prevState) => ({ ...prevState, remindAt: date }))
          }
          minDate={today}
          className="w-full border border-gray-300 rounded-lg p-2"
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

/*
<DatePicker
          selectedDate={formData.deadline}
          onChange={(date) => setFormData({ ...formData, deadline: date })}
          minDate={today}
          placeholder="Select from Today onwards"
        ></DatePicker> */
