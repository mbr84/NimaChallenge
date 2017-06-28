import Rx                      from 'rxjs';
import $                       from 'jquery'
import { Map, List }           from 'immutable';
import * as Nav                from './tableNavigation'
import carRequestStreams       from './carRequestStreams'
import chartStateStreams       from './chartState'


const initializeAppState = () => {
  const { chartStreams, toggleChart } = chartStateStreams()

  const initialState = new Map({
    pageNavActions: { nextPage: Nav.nextPage, lastPage: Nav.lastPage },
    isAdding: false,
    totalPages: 0,
    currentPage: window.localStorage.getItem('currentPage') || 0,
    cars: new List(),
    chart: new Map({ show: false, data: new List(),  toggleChart }),
  })

  const requestStreams = carRequestStreams()

  return Rx.Observable.merge(
    chartStreams,
    Nav.streams,
    requestStreams
  ).scan((state, stateChangeFn) => stateChangeFn(state), initialState)
}

export default initializeAppState
