import Rx               from 'rxjs';
import $                from 'jquery'
import { List }         from 'immutable'
import { priceUrl }     from '../utils/utils'

const chartState = () => {
    const toggleChartSubject = new Rx.Subject()

    const toggleChartOff = toggleChartSubject.merge(
        Rx.Observable.fromEvent($(document), 'keydown').filter(e => e.which === 27)
    )
        .map(() => state =>
            state.setIn(['chart', 'show'], !state.getIn(['chart'], 'show')))

    const chartDataRequests = toggleChartSubject
        .filter(data => typeof data === "number")
        .flatMap(id => Rx.Observable.fromPromise($.ajax(priceUrl(id))))
        .map(res => state =>
            state.setIn(['chart', 'data'], new List(res.data)).setIn(['chart', 'show'], true))

    Rx.Observable.fromEvent($('.chart-container'), 'click').forEach(e => e.stopPropagation())

    return {
        toggleChart: id => toggleChartSubject.next(id),
        chartStreams: Rx.Observable.merge(
            toggleChartOff,
            chartDataRequests,
        )
    }
}

export default chartState;
