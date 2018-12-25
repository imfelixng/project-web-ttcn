import React, { Component } from 'react'

import { convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import DropzoneComponent from 'react-dropzone-component';

import { WithContext as ReactTags } from 'react-tag-input';

const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

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

        this.questionDropzone = null;

        this.contentState = convertFromRaw(content);
        this.state = {
            contentState: content,
            images: [],
            categoryID: 'none',
            tags: [],
            suggestions: [],
            currentUserID: null,
            isLoading: false
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

    initCallback  = (dropzone) => {
        this.questionDropzone = dropzone;
    }

    removeFile = (files) => {
        if (this.questionDropzone && files.length > 0) {
            for(let i = 0 ; i < files.length ; i++) {
                this.questionDropzone.removeFile(files[i]);
            }
            
        }
        this.setState({
            images: [],
        });
    }

    onAddNewQuestion = () => {

        if(this.state.isLoading) {
            return;
        }

        this.setState({
            isLoading: true
        })

        if(this.state.categoryID === "none") {
            alert("Vui lòng chọn chuyên mục cho câu hỏi!");
            this.setState({
                isLoading: false
            })
            return false;
        }

        if(this.state.contentState.blocks[0].text === "") {
            alert("Vui lòng nhập nội dung câu hỏi!");
            this.setState({
                isLoading: false
            })
            return false;
        }

        let timesamp = new Date().getTime();

        let title = this.state.contentState.blocks[0].text.length > 50 ? this.state.contentState.blocks[0].text.slice(0,50) + "..." : this.state.contentState.blocks[0].text.slice(0,50);

        let summaryContent = '';

        for(let i = 0 ; i < this.state.contentState.blocks.length; i++) {
            summaryContent += this.state.contentState.blocks[i].text + '\n ';
        }

        summaryContent = summaryContent.length > 300 ? summaryContent.slice(0,300) + "..." : summaryContent.slice(0,300);

        let questionItem = {
            questionID: "q_" + timesamp + this.props.currentUser.userID,
            content: this.state.contentState,
            images: this.state.images,
            topComment: {},
            categoryID: this.state.categoryID,
            userID: this.props.currentUser.userID,
            tags: this.state.tags,
            votes: 0,
            unvotes: 0,
            views: 0,
            comments: 0,
            title,
            summaryContent,
            userFollows: [this.props.currentUser.userID]
        }
        this.props.addNewQuestion(questionItem).then(() => {
            this.removeFile(this.state.images);
            this.setState({
                isLoading: false,
                contentState: content,
                categoryID: 'none',
                tags: [],
            });

        })
        .catch(err => console.log(err));

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
        
        let index = this.state.tags.findIndex((tagItem) => tagItem.text.toLowerCase().trim() === tag.text.toLowerCase().trim());

        if(index !== -1) {
            alert("Tag này đã tồn tại!");
            return;
        }

        tag.text = tag.text.trim();

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
        init: this.initCallback,
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
                                    initialContentState  = {this.state.contentState}
                        />
                    </div>
                    <div className="row post">
                        <div className = "post-img">
                            <DropzoneComponent config={config}
                            eventHandlers={eventHandlers}
                            djsConfig={djsConfig} />
                        </div>
                        <div className= "post-relation row">
                            <div className = "col-sm-4 post-category">
                                <select className = "post-category__select" onChange = {this.handleChange} value = {this.state.categoryID}>
                                    <option value = "none">Chọn Chuyên Mục</option>
                                    {this.showCategories(this.props.categories)}
                                </select>
                            </div>
                            <div className = "col-sm-8 post-tag">
                                    <ReactTags tags={tags}
                                        suggestions={suggestions}
                                        handleDelete={this.handleDelete}
                                        handleAddition={this.handleAddition}
                                        handleDrag={this.handleDrag}
                                        delimiters={delimiters} 
                                        autocomplete = {0}
                                        handleFilterSuggestions = {this.handleFilterSuggestions}
                                        minQueryLength = {1}
                                    />
                            </div>
                        </div>
                    </div>
                    <ul className="text-right">
                        <li><a className="post-jb active_question" onClick = {this.onAddNewQuestion}>
                            {
                                this.state.isLoading ?
                                    <img className = "loading" src = "/images/ic_loading.gif"/>
                                :
                                <span>Post this question</span>
                            }
                        </a></li>
                    </ul>
                </div>{/*post-st end*/}
            </div>{/*post-topbar end*/}
      </React.Fragment>
    )
  }
}
