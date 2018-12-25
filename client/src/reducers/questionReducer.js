import * as types from '../constants/index';

let initialState = {
    questions: [],
    questionItem: null,
    isVote: false,
    isUnVote: false,
    topQuestions: [],
    questionFollowers: {}
};

const question = (state = initialState, action) => {

    switch(action.type) {
        case types.GET_ALL_QUETIONS:
        {
            return {
                ...state,
                questions: action.questions
            };
        }

        case types.ADD_NEW_QUESTION:
        {
            let {questions} = state;
            return {
                ...state,
                questions: [action.questionItem, ...questions]
            }
        }

        case types.GET_QUESTION:
        {
            let {question} = action;
            return {
                ...state,
                questionItem: question
            }
        }

        case types.UPDATE_QUESTION:
        {
            let {question} = action;

            return {
                ...state,
                questionItem: {...question}
            }
        }

        case types.DELETE_QUESTION:
        {
            let {questionID} = action;
            return {
                ...state,
                questions: [...state.questions.filter(question => question.questionID !== questionID)]
            }
        }

        case types.VOTE_QUESTION: 
        {
            return {
                ...state,
                questionItem: {
                    ...state.questionItem,
                    votes: state.questionItem.votes + 1
                }
            }
        }

        case types.UNVOTE_QUESTION: 
        {
            return {
                ...state,
                questionItem: {
                    ...state.questionItem,
                    votes: state.questionItem.votes - 1
                }
            }
        }

        case types.FOLLOW_QUESTION:
        {
            let {questionID} = action;
            let followers = state.questionFollowers[action.questionID];
            followers.push(action.userFollowID);
            
            return {
                ...state,
                questionFollowers: {
                    ...state.questionFollowers,
                    [questionID]: [...followers]
                }
            }
        }

        case types.GET_QUESTION_FOLLOWERS: {
            let index = state.questions.map(question => question.questionID)
            .indexOf(action.questionID);
            
            let questionFollowers = state.questionFollowers;
            questionFollowers[action.questionID] = state.questions[index].userFollows;

            return {
                ...state,
                questionFollowers
            }
        }

        case types.CHECK_VOTE_QUESTION:
        {
            console.log(action);
            return {
                ...state,
                isVote: action.check.isVote,
                isUnVote: action.check.isUnvote
            }
        }

        case types.UPDATE_VIEW_QUESTION: 
        {
            console.log(action);
            return {
                ...state,
                questionItem: {
                    ...action.question
                    
                }
            }
        }

        case types.GET_TOP_QUESTIONS: 
        {
            return {
                ...state,
                topQuestions: action.questions
            }
        }

        default:
            return state;
    }

}

export default question;