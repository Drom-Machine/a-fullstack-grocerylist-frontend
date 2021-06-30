import React, { Component } from "react";
// import { v4 as uuidv4 } from "uuid";
import axios from "axios";


import Button from "../common/Button";
import GroceryList from "./GroceryList";

import "./Grocery.css";
// console.log(process.env.NODE_ENV);
//const URL = process.env.NODE_ENV === "product" ? "DEPLOYED ADDRESS" : "http://localhost:3001"
const URL = "http://localhost:3001";

export class Grocery extends Component {
  state = {
    groceryList: [],
    groceryListInput: "",
    error: "null",
    errorMessage: "",
  };

  async componentDidMount() {
    try {
      //making a get request to the server
      let groceryList = await axios.get('${URL}/api/groceries/get-all-groceries');

      // console.log(allGroceries);
      // console.log(allGroceries.data);
      // console.log(allGroceries.data.payload);

      this.setState({
        groceryList: groceryList.data.payload,
      });
    } catch (e) {
      console.log(e);
    }
  }

  handleGroceryOnChange = (event) => {
    this.setState({
      groceryListInput: event.target.value,
      error: null,
      errorMessage: "",
    });
  };

  

  //---------------------------------------------------------------- 

  handleOnSubmit = async (event) => {
    event.preventDefault();

    if (this.state.groceryListInput.length === 0) {
      this.setState({
        error: true,
        errorMessage: "No grocery info for you",
      });
    } else {
      let checkIfGroceryListAlreadyExists = this.state.groceryList.findIndex(
        (item) =>
          item.grocery.toLocaleLowerCase() ===
          this.state.groceryListInput.toLocaleLowerCase()
      );

      if (checkIfGroceryListAlreadyExists > -1) {
        this.setState({
          error: true,
          errorMessage: "Grocery list already exists",
        });
      } else {
        try {
          let createdGroceryList = await axios.post(`${URL}/api/groceries/create-groceries`, {
            grocery: this.state.groceryListInput,
          });

          console.log(createdGroceryList);

          let newArray = [...this.state.groceryList, createdGroceryList.data.payload];

          this.setState({
            todoList: newArray,
            todoInput: "",
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  handleDeleteByID = async (_id) => {
    try {
      let deletedGroceryList = await axios.delete(
        `${URL}/api/groceries/delete-grocery-by-id/${_id}`
      );

      let filteredGroceryList = this.state.groceryList.filter(
        (item) => item._id !== deletedGroceryList.data.payload._id
      );
      this.setState({
        groceryList: filteredGroceryList,
      });
      console.log(deletedGroceryList)  
    } catch (e) {
      console.log(e);
    }
  };

  handlePurchasedByID = async (id, purchased) => {
    //console.log(id, isDone);
    try {
      let purchasedUpdated = await axios.put(
        `${URL}/api/groceries/update-grocery-by-id/${id}`,
        {
          purchased: !purchased,
        }
      );

      let updatedArray = this.state.groceryList.map((item) => {
        if (item._id === purchasedUpdated.data.payload._id) {
          item.purchased = purchasedUpdated.data.payload.purchased;
        }
        return item;
      });
      this.setState({
        groceryList: updatedArray,
      });
      console.log(purchasedUpdated)
    } catch (e) {
      console.log(e);
    }
  };

  handleEditByID = async (id, editInput) => {
    try {
      let editedGroceryList = await axios.put(
        `${URL}/api/groceries/update-groceries-by-id/${id}`,
        {
          grocery: editInput,
        }
      );

      console.log(editedGroceryList);

      let updatedGroceryList = this.state.groceryList.map((item) => {
        if (item._id === id) {
          item.grocery = editedGroceryList.data.payload.grocery;
        }
        return item;
      });

      this.setState({
        groceryList: updatedGroceryList,
      });

    } catch (e) {
      console.log(e);
    }
  };


  sortByDate = async (sortOrder) => {
    console.log(sortOrder);
    try {
      let sortedList = await axios.get(
        `${URL}/api/groceries/get-groceries-by-sort?sort=${sortOrder}`
      );

      this.setState({
        groceryList: sortedList.data.payload,
      });
    } catch (e) {
      console.log(e);
    }
  };

  sortByPurchased = async (purchased) => {
    try {
      let purchasedArray = await axios.get(
        `${URL}/api/groceries/get-groceries-by-purchased?purchased=${purchased}`
      );
      this.setState({
        groceryList: purchasedArray.data.payload,
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div>
        <div className="form-div">
          <form onSubmit={this.handleOnSubmit}>
            <input
              name="groceryInput"
              type="text"
              onChange={this.handleGroceryOnChange}
              value={this.state.groceryListInput}
              autoFocus
              id="inputList"
            />
            <button type="submit">Submit</button>
            <br />
            <span style={{ color: "red" }}>
              {this.state.error && this.state.errorMessage}
            </span>
          </form>
        </div>
        <div className="sorting">
          <ul>
            <li>
              <button onClick={() => this.sortByDate("desc")}>
                Sort by Date - Newest to Oldest
              </button>
              <Button
                buttonName="Sort by Date - Newest to oldest"
                clickFunc={() => this.sortByDate("desc")}
              />
            </li>
            <li>
              <button onClick={() => this.sortByDate("asc")}>
                Sort by Date - Oldest to newest
              </button>
              <Button
                buttonName="Sort by Date - Oldest to newest"
                clickFunc={() => this.sortByDate("asc")}
              />
            </li>
            <li>
              <button onClick={() => this.sortByDone("true")}>
                Sort by Purchased
              </button>
              <Button
                buttonName=" Sort by Done"
                clickFunc={() => this.sortByDone("true")}
              />
            </li>
            <li>
              <button onClick={() => this.sortByDone("false")}>
                Sort By Not Purchased
              </button>
              <Button
                buttonName="Sort by Not Done"
                clickFunc={() => this.sortByDone("false")}
              />
            </li>
          </ul>
        </div>{" "}
        <div className="groceryList-div">
          <ul>
            {this.state.groceryList.map((item, index) => {
              return (
                <GroceryList
                  key={item._id}
                  item={item}
                  handleDeleteByID={this.handleDeleteByID}
                  handlePurchasedByID={this.handlePurchasedByID}
                  handleEditByID={this.handleEditByID}
                  inputID={item._id}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Grocery;
