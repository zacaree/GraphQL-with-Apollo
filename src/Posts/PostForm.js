import React, { Component } from 'react'

export default class PostForm extends Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Post title"/>
        <textarea type="text" placeholder="Post body"/>
        <button>Submit</button>
      </form>
    )
  }
}
