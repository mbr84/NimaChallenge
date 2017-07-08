import Rx               from 'rxjs';
import $                from 'jquery'
import { List }         from 'immutable'
import { priceUrl }     from '../utils/utils'

const chartState = () => {
  const toggleChartSubject = new Rx.Subject()

  const toggleChartStream = toggleChartSubject
    .do(el => console.log(el))
    .merge(
    Rx.Observable.fromEvent($(document), 'keydown')
      .filter(e => e.which === 27)
    )
    .map(() => state =>
      state.setIn(['chart', 'show'], !state.getIn(['chart'], 'show')))

  const chartDataRequests = toggleChartSubject/*Rx.Observable.fromEvent($('table'), 'mouseenter')
    .switchMap(() => Rx.Observable.fromEvent($('img'), 'click'))*/
    .flatMap(id => Rx.Observable.fromPromise($.ajax(priceUrl(id))))
    .map(res => state =>
      state.setIn(['chart', 'data'], new List(res.data)).setIn(['chart', 'show'], true))

  Rx.Observable.fromEvent($('.chart-container'), 'click').forEach(e => e.stopPropagation())

  return {
    toggleChart: id => toggleChartSubject.next(id),
    chartStreams: Rx.Observable.merge(
      toggleChartStream,
      chartDataRequests,
    )
  }
}

export default chartState;
