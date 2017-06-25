import Rx from 'rxjs';
import $ from 'jquery'
import { List } from 'immutable'

const chartStateStreams = () => {
  const toggleChartSubject = new Rx.Subject()

  const toggleChartStream = toggleChartSubject
    .merge(
      Rx.Observable.fromEvent($(document), 'keydown')
        .filter(e => e.which === 27)
    )
    .map(() => state =>
      state.setIn(['chart', 'show'], !state.getIn(['chart'], 'show')))

  const toggleChart = () => toggleChartSubject.next()

  const exitTableStream = Rx.Observable.fromEvent($('table'), 'mouseleave')
  const chartDataRequests = Rx.Observable.fromEvent($('table'), 'mouseenter')
    .flatMap(() =>
      Rx.Observable.fromEvent($('.price-cell'), 'mouseenter').takeUntil(exitTableStream))
    .map(e => `http://localhost:3000/prices?id=${e.currentTarget.id}`)
    .distinctUntilChanged()
    .auditTime(50)
    .switchMap(url => $.ajax(url))
    .map(res => state => state.setIn(['chart', 'data'], new List(res.data)))

  const showChartStream = Rx.Observable.fromEvent($('table'), 'mouseenter')
    .flatMap(() => Rx.Observable.fromEvent($('img'), 'click'))
    .mapTo(state => state.setIn(['chart', 'show'], true))

  return {
    chartStreams: Rx.Observable.merge(
      toggleChartStream,
      showChartStream,
      chartDataRequests,
    ),
    toggleChart
  }
}

export default chartStateStreams;
