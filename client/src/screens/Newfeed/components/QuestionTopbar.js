import React, { Component } from 'react'

import { convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import DropzoneComponent from 'react-dropzone-component';

import { WithContext as ReactTags } from 'react-tag-input';

const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
export default class QuestionTopbar extends Component {

    constructor(props) {
        super(props);
        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg,image/png,image/gif",
            autoProcessQueue: false
        };

        this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            postUrl: 'no-url'
        };

        this.contentState = convertFromRaw(content);
        this.state = {
            contentState: this.contentState,
            images: [],
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

    handleFileAdded = (file) => {
        this.setState({
            images: [...this.state.images, file]
        });
    }

    handleFileRemoved = (file) => {
        console.log(file);
        let imgID = file.upload.uuid;
        this.setState({
            images: this.state.images.filter(img => img.upload.uuid !== imgID)
        });
    }

    onAddNewQuestion = () => {

        if(this.state.categoryID === "none") {
            alert("Vui lòng chọn chuyên mục cho câu hỏi!");
            return false;
        }

        let questionItem = {
            questionID: "q_" + new Date().getTime(),
            content: this.state.contentState,
            images: this.state.images,
            topComment: {},
            categoryID: this.state.categoryID,
            userID: this.props.currentUser.userID,
            tags: this.state.tags
        }
        this.props.addNewQuestion(questionItem);


    }
    
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
        
        if(!tag.tagID) {
            tag.id = "t_" + new Date().getTime();
            tag.tagID = tag.id;
        }

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
            suggestions: props.suggestions
        };
    }

  render() {
    const config = this.componentConfig;
    const djsConfig = this.djsConfig;
    const eventHandlers = {
        addedfile: this.handleFileAdded,
        removedfile: this.handleFileRemoved
    }
    const { tags, suggestions } = this.state;
    return (
      <React.Fragment>
            <div className="post-topbar">
                <div className="user-picy">
                    <img src = {this.props.currentUser ? this.props.currentUser.avatar : '/images/users/img_avatar_default.png'} />
                </div>
                <div className="post-st">
                    <div className = "post-content">
                        <Editor
                            placeholder = "Bạn có câu hỏi gì không ?"
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    onContentStateChange={this.onContentStateChange}
                        />
                    </div>
                    
                    <div className = "post-img">
                        <h4 className= "mt-4">Chọn ảnh của bạn:</h4>
                        <DropzoneComponent config={config}
                        eventHandlers={eventHandlers}
                        djsConfig={djsConfig} />
                    </div>
                    <div className= "post-relation">
                        <div className = "post-category">
                            <span> Chuyên mục: </span>
                            <select className = "post-category__select" onChange = {this.handleChange} value = {this.state.categoryID}>
                                <option value = "none">Chọn Chuyên Mục</option>
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
                    <ul className="text-right">
                        <li><a className="post-jb active" onClick = {this.onAddNewQuestion}>Post this question</a></li>
                    </ul>
                </div>{/*post-st end*/}
            </div>{/*post-topbar end*/}
      </React.Fragment>
    )
  }
}
