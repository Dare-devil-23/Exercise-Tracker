import React, { Component } from "react";
import axios from "axios";
export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      baseUri : import.meta.env.VITE_BASE_URI
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
    };

    console.log(user);

    axios.post(`${this.state.baseUri}/users/add` , user)
      .then(res => console.log(res.data));

    this.setState({
      username: "",
    });
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
            <input
                type="text"
                required
                className="bg-slate-200   p-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
          </div>
          <div className="w-full my-6">
            <input
              type="submit"
              value="Create User"
              className="border-black p-4 w-full bg-sky-600 rounded-lg cursor-pointer"
            />
          </div>
        </form>
      </div>
    );
  }
}
