import Rx                      from 'rxjs';
import $                       from 'jquery'
import { Map, List }           from 'immutable';
import * as Nav                from './tableNavigation'
import carRequestStreams       from './carRequestStreams'


const initializeAppState = () => {
  const initialState = new Map({
    nextPage: Nav.nextPage,
    lastPage: Nav.lastPage,
    totalPages: 0,
    isAdding: false,
    cars: new List(),
    chart: new Map({ show: false, data: new List() }),
    currentPage: window.localStorage.getItem('currentPage') || 0
  })

  const {
    formSubmissionStream,
    refreshCarsStream,
    inputRequiredStream,
    requestingStream
  } = carRequestStreams()

  const exitTableStream = Rx.Observable.fromEvent($('table'), 'mouseleave')
  const chartDataRequests = Rx.Observable.fromEvent($('table'), 'mouseenter')
    .flatMap(() =>
      Rx.Observable.fromEvent($('.price-cell'), 'mouseenter').takeUntil(exitTableStream))
    .map(e => `http://localhost:3000/prices?id=${e.currentTarget.id}`)
    .distinctUntilChanged()
    .auditTime(50)
    .switchMap(url => $.ajax(url))
    .map(res => state => state.set('chart', res.data))

  formSubmissionStream.forEach(e => e.preventDefault())
  inputRequiredStream.forEach(e => $(e.currentTarget).attr('required', true))


  return Rx.Observable.merge(
    chartDataRequests,
    Nav.lastPageClickStream,
    Nav.nextPageClickStream,
    requestingStream,
    refreshCarsStream
  )
  .scan((state, stateChangeFn) => stateChangeFn(state), initialState)
}

export default initializeAppState
