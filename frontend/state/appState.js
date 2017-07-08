import Rx                      from 'rxjs';
import $                       from 'jquery'
import { Map, List }           from 'immutable';
import * as Nav                from './tableNavigation'
import carRequestStreams       from './carRequestStreams'
import chartState              from './chartState'


const initializeAppState = () => {
  const { chartStreams, toggleChart } = chartState()
  const actions = { nextPage: Nav.nextPage, lastPage: Nav.lastPage, toggleChart }

  const initialState = new Map({
    isAdding: false,
    totalPages: 0,
    currentPage: window.localStorage.getItem('currentPage') || 0,
    cars: new List(),
    chart: new Map({ show: false, data: new List() }),
  })

  const requestStreams = carRequestStreams()

  const state = Rx.Observable.merge(
      chartStreams,
      Nav.streams,
      requestStreams
  ).scan((state, stateChangeFn) => stateChangeFn(state), initialState)

  return {
      state,
      actions
  }
}

export default initializeAppState
