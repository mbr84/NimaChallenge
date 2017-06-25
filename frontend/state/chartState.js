import Rx from 'rxjs';
import $ from 'jquery'
import { List } from 'immutable'

const chartStateStreams = () => {
  const toggleChartSubject = new Rx.Subject()

  const toggleChartStream = toggleChartSubject.merge(
    Rx.Observable.fromEvent($(document), 'keydown').filter(e => e.which === 27)
  )
    .map(() => state =>
      state.setIn(['chart', 'show'], !state.getIn(['chart'], 'show')))

  const toggleChart = () => toggleChartSubject.next()


  const chartDataRequests = Rx.Observable.fromEvent($('table'), 'mouseenter')
    .switchMap(() => Rx.Observable.fromEvent($('img'), 'click'))
    .map(e => `http://localhost:3000/prices?id=${e.currentTarget.id}`)
    .switchMap(url => $.ajax(url))
    .map(res => state =>
      state.setIn(['chart', 'data'], new List(res.data)).setIn(['chart', 'show'], true))

  Rx.Observable.fromEvent($('.chart-container'), 'click').forEach(e => e.stopPropagation())
  return {
    chartStreams: Rx.Observable.merge(
      toggleChartStream,
      chartDataRequests,
    ),
    toggleChart
  }
}

export default chartStateStreams;
