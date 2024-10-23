import React, { Component } from "react";
import axios from "axios";


export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
      baseUri : "https://exercise-tracker-bew6.onrender.com/"
    };
  }

  componentDidMount() {
    axios.get(`${this.state.baseUri}/users/`)
      .then(res =>{
        if(res.data.length > 0){
          this.setState({
            users : res.data.map(user => user.username),
            username: res.data[0].username
          })
        }
      })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }
  onChangeDate(e) {
    this.setState({
      date: new Date(e.target.value),
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };


    axios.post(`${this.state.baseUri}/exercises/add` , exercise)
      .then(res => console.log(res.data));
     window.location = "/";
  }

  render() {
    return (
      <div>
        <h3 className="text-2xl font-bold flex w-[80%] mx-auto">
          Create New Exercise Log
        </h3>
        <form onSubmit={this.onSubmit} className="mt-8 max-w-md mx-auto">
          <div className="flex items-center">
            <div>
              <label className="block text-xl mr-3">Username: </label>
            </div>
            <div className="flex flex-1">
              <select
                required
                className="bg-slate-200  p-4 block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={this.state.username}
                onChange={this.onChangeUsername}
              >
                {this.state.users.map(function (user) {
                  return (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <div className="flex flex-1">
                <label className="block text-xl mr-3">Description: </label>
              </div>
              <input
                type="text"
                required
                className="bg-slate-200   p-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <div className="flex ">
                <label className="text-xl mr-3">Duration (in minutes): </label>
              </div>
              <input
                type="text"
                className="flex flex-1 bg-slate-200  p-4 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={this.state.duration}
                onChange={this.onChangeDuration}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <div className="flex flex-1">
                <label className="text-xl w-[40%] mr-3">Date: </label>
              </div>
              <input
                type="date"
                className="bg-slate-200  p-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="w-full my-6">
            <input
              type="submit"
              value="Create Exercise Log"
              className="border-black p-4 w-full bg-sky-600 rounded-lg cursor-pointer"
            />
          </div>
        </form>
      </div>
    );
  }
}
