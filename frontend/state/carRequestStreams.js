import Rx from 'rxjs';
import $ from 'jquery'
import { List } from 'immutable'

const carRequestStreams = () => {

  const addCarClickStream = Rx.Observable.fromEvent($('form'), 'submit')
  const formSubmissionStream = addCarClickStream.share()
    .forEach(e => e.preventDefault())

  // Don't start validating input fields until they've been focused and unfocused
  const inputBlurStream = Rx.Observable.fromEvent($('input'), 'blur')
  const inputRequiredStream = inputBlurStream
    .merge(
      Rx.Observable.fromEvent($('button'), 'mousedown'),
      Rx.Observable.fromEvent($('input'), 'keydown')
        .filter(e => e.which === 13)
    )
      .forEach(e => $(e.currentTarget).parent().children().attr('required', true))

  // stream of submit button clicks -> stream of functions to change state.isAdding to true
  const requestingStream = addCarClickStream.share()
    .map(() => state => state.set('isAdding', true))

  const requestStream = addCarClickStream.mapTo('https://nima-challenge.herokuapp.com/cars')

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
  const refreshCarsStream = responseStream
    .startWith('initial GET cars request')
    .flatMap(() => Rx.Observable.fromPromise($.ajax('https://nima-challenge.herokuapp.com/cars')))
    .map(res => state =>  // stream of GET requests to /cars -> stream of fn's updating state
      state.set('cars', new List(res.data))
        .set('isAdding', false)
        .set('totalPages', Math.floor(res.data.length / 15)))

  return Rx.Observable.merge(refreshCarsStream, requestingStream)
}

export default carRequestStreams
