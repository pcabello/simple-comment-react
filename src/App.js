import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentList: []
    }

    this.addComment = this.addComment.bind(this);
    this.commentMap = this.commentMap.bind(this);
  }

  addComment(text) {
    var aux = this.state.commentList;
    aux.push(text);

    this.setState({commentList: aux})

    localStorage.setItem("comment",  JSON.stringify(aux));
  }

  commentMap(comment) {
    return <CommentShow comment={comment}/>
  }

  render() {
    const comment = JSON.parse(localStorage.getItem('comment') || '{}');

    return (
      <div>
        <CommentAdd addComment={this.addComment}/>
         {
           comment.map(this.commentMap)
         }
      </div>
    )
  }
}

class CommentAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    var commenttext = this.state.value.trim();
    if(!commenttext) {
      return
    } else {
      this.props.addComment(this.state.value);
    }
  }

  render() {
    return (
      <div>
        <div className="comment-box">
          <form onSubmit={this.handleSubmit}>
          <textarea value={this.state.value} onChange={this.handleChange}>

          </textarea>
          <input className="btn__submit" type="submit" value="Comment"/>
          </form>
        </div>
      </div>
    )
  }
}

class CommentShow extends React.Component {
  render() {
    return (
      <div className="comment-listing">
        <p>{this.props.comment}</p>
      </div>
    )
  }
}

export default App;
