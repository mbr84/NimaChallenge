import Rx from 'rxjs';
import { Map, List } from 'immutable';
import $ from 'jquery'


const initializeAppState = () => {
  const initialState = new Map({ adding: false, cars: new List() })
  const addCarClickStream = Rx.Observable.fromEvent($('form'), 'submit')
  const formSubmissionStream = addCarClickStream.share()
    .forEach(e => e.preventDefault())

  const requestingStream = addCarClickStream.share()
    .map(() => state => state.set('adding', true))

  const requestStream = addCarClickStream.mapTo('http://localhost:3000/cars')

  const responseStream = requestStream.flatMap(requestUrl => {
    const make = $('#make').val()
    const model = $('#model').val()
    const year = $('#year').val()
    const data = { make, model, year }
    return Rx.Observable.fromPromise($.ajax({url: requestUrl, method: 'post', data: data }))
  })

  const refreshCarListStream = responseStream
    .startWith("")
    .flatMap(() => {
      return Rx.Observable.fromPromise($.ajax('http://localhost:3000/cars'))
    })
    .map(res => state => state.set('cars', new List(res.data)).set('adding', false))

    return Rx.Observable.merge(
        requestingStream,
        refreshCarListStream
      )
      .scan((acc, curr) => curr(acc), initialState)
}

export default initializeAppState
