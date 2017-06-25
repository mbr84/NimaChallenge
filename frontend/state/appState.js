import Rx from 'rxjs';
import { Map, List } from 'immutable';
import { localStorageAsync } from '../utils/utils'
import $ from 'jquery'


const initializeAppState = () => {
  // Setup subjects and functions for navigating results pages
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

  // Add Car form
  const addCarClickStream = Rx.Observable.fromEvent($('form'), 'submit')
  const formSubmissionStream = addCarClickStream.share()
    .forEach(e => e.preventDefault())

  // don't start validating input fields until they've been focused and unfocused
  const inputBlurStream = Rx.Observable.fromEvent($('input'), 'blur')
  inputBlurStream.merge(Rx.Observable.fromEvent($('button'), 'mousedown'))
    .forEach(e => $(e.currentTarget).attr('required', true))

  // stream of submit button clicks -> stream of functions to change state.isAdding to true
  const requestingStream = addCarClickStream.share()
    .map(() => state => state.set('isAdding', true))

  const requestStream = addCarClickStream.mapTo('http://localhost:3000/cars')

  const responseStream = requestStream.flatMap(requestUrl =>
    Rx.Observable.fromPromise($.ajax({
      url: requestUrl,
      method: 'post',
      data: {
        make: $('#make').val(),
        model: $('#model').val(),
        year: $('#year').val()
      }
    }))
  )

  // stream of responses to POSTs to /cars -> stream of GET requests to /cars
  const refreshCarListStream = responseStream
    .startWith('initial GET cars request')
    .flatMap(() => Rx.Observable.fromPromise($.ajax('http://localhost:3000/cars')))
    .map(res => state =>  // stream of GET requests to /cars -> stream of fn's updating state
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
