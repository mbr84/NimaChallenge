import Rx               from 'rxjs';
import $                from 'jquery'
import { List }         from 'immutable'
import { priceUrl }     from '../utils/utils'

const chartState = () => {
  const toggleChartSubject = new Rx.Subject()

  const toggleChartStream = toggleChartSubject.merge(
    Rx.Observable.fromEvent($(document), 'keydown')
      .filter(e => e.which === 27)
    )
    .map(() => state =>
      state.setIn(['chart', 'show'], !state.getIn(['chart'], 'show')))

  const chartDataRequests = Rx.Observable.fromEvent($('table'), 'mouseenter')
    .switchMap(() => Rx.Observable.fromEvent($('img'), 'click'))
    .flatMap(e => Rx.Observable.fromPromise($.ajax(priceUrl(e.currentTarget.id))))
    .map(res => state =>
      state.setIn(['chart', 'data'], new List(res.data)).setIn(['chart', 'show'], true))

  Rx.Observable.fromEvent($('.chart-container'), 'click').forEach(e => e.stopPropagation())

  return {
    toggleChart: () => toggleChartSubject.next(),
    chartStreams: Rx.Observable.merge(
      toggleChartStream,
      chartDataRequests,
    )
  }
}

export default chartState;
