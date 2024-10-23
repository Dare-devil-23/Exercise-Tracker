import React, { Component } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = { 
      exerciseList: [],
      baseUri : "https://exercise-tracker-bew6.onrender.com"
    };
  }
  componentDidMount() {
    axios
      .get(`${this.state.baseUri}/exercises/`)
      .then((res) => {
        this.setState({
          exerciseList: res.data.map((e) => e),
        });
      })
      .catch((err) => console.log(err));
  }
  deleteExercise(e) {
    axios.delete(`${this.state.baseUri}/exercises/${e}`)
      .then(() => window.alert("deleted"))
      .catch(err => console.log(err))
    window.location = "/";
  }
  render() {
    return (
      <div className="w-screen h-auto">
        <div className="w-[80%] flex mx-auto overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="py-3 px-6">
                  User Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Description
                </th>
                <th scope="col" className="py-3 px-6">
                  Duration ( in min )
                </th>
                <th scope="col" className="py-3 px-6">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.exerciseList.length > 0 &&
                this.state.exerciseList.map((exercise) => {
                  return (
                    <tr key={exercise._id} className="bg-white border-b ">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {exercise.username}
                      </th>
                      <td className="py-4 px-6">{exercise.description}</td>
                      <td className="py-4 px-6">{exercise.duration}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-between">
                          <div>{exercise.date.substring(0, 10)}</div>
                          <div>
                            <MdDelete className="text-lg cursor-pointer" 
                              onClick={()=>{
                                this.deleteExercise(exercise._id)
                              }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
