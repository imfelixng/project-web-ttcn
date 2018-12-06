import React, { Component } from 'react'

import { convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
export default class EditModal extends Component {

  constructor(props) {
      super(props);

      this.state = {
          contentState: this.props.question.content,
          categoryID: 'none',
          tags: [],
          suggestions: []
      }

  }

  onContentStateChange = (contentState) => {
      this.setState({
        contentState,
      });
    };

  showCategories  = (categories) => {
    if(categories.length > 0) {
        return categories.map((category, index) => {
            return <option key = {index} value = {category.categoryID}>{category.name}</option>
        });
    }
  }

  handleChange = (e) => {
      this.setState({
          categoryID: e.target.value    
      });
  }

  handleDelete = (i) => {
      const { tags } = this.state;
      this.setState({
      tags: tags.filter((tag, index) => index !== i),
      });
  }

  handleAddition = (tag) => {
      if(tag.text.length < 2) {
          alert("Tag quá ngắn, Vui lòng nhập tối thiểu 2 kí tự!");
          return false;
      }
      tag.id = "t_" + new Date().getTime();
      this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleDrag = (tag, currPos, newPos) => {
      const tags = [...this.state.tags];
      const newTags = tags.slice();

      newTags.splice(currPos, 1);
      newTags.splice(newPos, 0, tag);

      // re-render
      this.setState({ tags: newTags });
  }

  handleFilterSuggestions = (textInputValue, possibleSuggestionsArray) => {
      var lowerCaseQuery = textInputValue.toLowerCase()
      
      return possibleSuggestionsArray.filter((suggestion) => {
          return suggestion.text.toLowerCase().indexOf(lowerCaseQuery) === 0;
      });
  }

  static getDerivedStateFromProps(props, state) {
      return {
          suggestions: props.tags
      };
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getTags();
    this.setState({
      contentState: this.props.question.content,
      tags: this.props.question.tags,
      categoryID: this.props.question.categoryID
    });
  }

  onUpdate = () => {
    let questionItem = {
        questionID: this.props.question.questionID,
        content: this.state.contentState,
        images: this.props.question.images,
        topComment: this.props.question.topComment,
        categoryID: this.state.categoryID,
        userID: this.props.question.userID,
        tags: this.state.tags,
        votes: this.props.question.votes,
        unvotes: this.props.question.unvotes,
        views: this.props.question.views,
        comments: this.props.question.comments,
    }

    this.props.updateQuestion(questionItem);

  }


  render() {
    const { tags, suggestions, contentState } = this.state;
    return (
      <React.Fragment>
        <div className="modal fade" id="EditModal" tabIndex={-1} role="dialog" aria-labelledby="EditModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="EditModalLabel">Edit post</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
              <div className="post-st">
                    <div className = "post-content">
                        <Editor
                            placeholder = "Bạn có câu hỏi gì không ?"
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    onContentStateChange={this.onContentStateChange}
                                    initialContentState = {contentState}
                        />
                    </div>
                    
                    <div className= "post-relation">
                        <div className = "post-category">
                            <span> Chuyên mục: </span>
                            <select className = "post-category__select" onChange = {this.handleChange} value = {this.state.categoryID}>
                                {this.showCategories(this.props.categories)}
                            </select>
                        </div>
                        <div className = "post-tag">
                                <span>Thẻ </span>
                                <ReactTags tags={tags}
                                    suggestions={suggestions}
                                    handleDelete={this.handleDelete}
                                    handleAddition={this.handleAddition}
                                    handleDrag={this.handleDrag}
                                    delimiters={delimiters} 
                                    autocomplete = {1}
                                    handleFilterSuggestions = {this.handleFilterSuggestions}
                                    minQueryLength = {1}
                                />
                        </div>
                    </div>
                </div>{/*post-st end*/}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss= "modal" onClick = {this.onUpdate}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
