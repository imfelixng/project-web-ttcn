import React, { Component } from 'react'
import Tag from './Tag';

export default class Tags extends Component {

  onShowTag = (tags) => {
    return tags.map((tag, index) => {
      return <Tag key = {index} tag = {tag}/>
    })
  }

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        {this.onShowTag(this.props.tags)}
      </React.Fragment>
    )
  }
}
