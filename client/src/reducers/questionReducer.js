import * as types from '../constants/index';

let initialState = {
    questions: [],
    questionItem: null,
    isVote: false,
    isUnVote: false
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

        default:
            return state;
    }

}

export default question;