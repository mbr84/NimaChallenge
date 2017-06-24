import Rx from 'rxjs';
import { Map, List } from 'immutable';
import { localStorageAsync } from './utils'
import $ from 'jquery'


const initializeAppState = () => {
  const nextPageSubject = new Rx.Subject()
  const nextPageClickStream = nextPageSubject
    .map(() => state => {
      const newPage = +state.get('currentPage') + 1
      localStorageAsync(newPage)
      return state.set('currentPage', newPage)
    })

  const lastPageSubject = new Rx.Subject()
  const lastPageClickStream = lastPageSubject
    .map(() => state => {
      const newPage = state.get('currentPage') - 1
      localStorageAsync(newPage)
      return state.set('currentPage', newPage)
    })

  const initialState = new Map({
    nextPage: () => nextPageSubject.next(),
    lastPage: () => lastPageSubject.next(),
    totalPages: 0,
    isAdding: false,
    cars: new List(),
    currentPage: window.localStorage.getItem('currentPage') || 0
  })

  const addCarClickStream = Rx.Observable.fromEvent($('form'), 'submit')
  const formSubmissionStream = addCarClickStream.share()
    .forEach(e => e.preventDefault())

  const inputBlurStream = Rx.Observable.fromEvent($('input'), 'blur')
  inputBlurStream.merge(Rx.Observable.fromEvent($('button'), 'mousedown'))
    .forEach(e => $(e.currentTarget).attr('required', true))

  const requestingStream = addCarClickStream.share()
    .map(() => state => state.set('isAdding', true))

  const requestStream = addCarClickStream.mapTo('http://localhost:3000/cars')

  const responseStream = requestStream.flatMap(requestUrl => {
    const data = { make: $('#make').val(), model: $('#model').val(), year: $('#year').val() }
    return Rx.Observable.fromPromise($.ajax({url: requestUrl, method: 'post', data: data }))
  })

  const refreshCarListStream = responseStream
    .startWith(null)
    .flatMap(() => {
      return Rx.Observable.fromPromise($.ajax('http://localhost:3000/cars'))
    })
    .map(res => state =>
      state.set('cars', new List(res.data))
        .set('isAdding', false)
        .set('totalPages', Math.floor(res.data.length / 15)))

    return Rx.Observable.merge(
      lastPageClickStream,
      nextPageClickStream,
      requestingStream,
      refreshCarListStream
    )
    .scan((acc, curr) => curr(acc), initialState)
}

export default initializeAppState
