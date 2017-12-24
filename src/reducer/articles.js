import { normalizedArticles as defaultArticles } from '../fixtures'
import { DELETE_ARTICLE, ADD_COMMENT, LOAD_ALL_ARTICLES, START, SUCCESS } from '../constance'
import { arrToMap } from '../helpers'
import {Map, Record, OrderedMap} from 'immutable'

const articleRecord = Record({
    text: undefined,
    title: '',
    id: undefined,
    comments: []
})

const ReducerState = Record({
    loading: false,
    loaded: false,
    entities: new OrderedMap({})
})

const defaultState = new ReducerState()

export default (articlesState = defaultState, action) => {
    const { type, payload, response, randomId } = action

    switch(type){
        case DELETE_ARTICLE:
           return articlesState.deleteIn(['entities', payload.id])

        case ADD_COMMENT:
            return articlesState.updateIn(
                [
                    'entities',
                     payload.articleId, 
                     'comments'
                ], 
                     comments =>  comments.concat(randomId))

        case LOAD_ALL_ARTICLES + START:
                return articlesState.set('loading', true)

        case LOAD_ALL_ARTICLES + SUCCESS:
            return articlesState
                .set('entities', arrToMap(response, articleRecord))
                .set('loading', false)
                .set('loaded', true)
    }

    return articlesState
}