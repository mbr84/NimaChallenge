import $ from 'jquery';
import { renderChart } from '../utils/utils'
import { canvas, div, i } from 'snabbdom-helpers'

const chartView = state => {
  const show = state.get('show')
  let visibility, =
     opacity,
     backgroundColor;
  if (show) {
    visibility = 'visible';
    opacity = '1';
    backgroundColor = 'white';
    renderChart(state)
  } else {
    visibility = 'hidden';
    opacity = '0';
    backgroundColor = 'rgba(0,0,0, .5)';
  }

  return div({
    selector: '.modal-outer',
    style: {
      opacity,
      backgroundColor: 'rgba(0, 0, 0, .5)',
      position: 'fixed',
      top: '0',
      left: '0',
      height: '100vh',
      width: '100vw',
      visibility: visibility
    },
    on: { click: state.get('toggleChart')},
    inner: div({
      selector: '.chart-container',
      style: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        visibility,
        backgroundColor,
        padding: '10px',
        boxSizing: 'border-box',
        opacity: 1,
      },
      inner: [
        div({
          style: { display: 'flex', justifyContent: "space-between", padding: '5px' },
          inner: [
          div({}),
          i({
            selector: ".material-icons",
            inner: "close",
            style: { cursor: 'pointer' },
            on: { click: state.get('toggleChart') }
          })
        ]}),
        div({
          inner: canvas({
            selector: '#myChart',
            style: {
              backgroundColor: 'white'
            }
          })
        })

      ]
    })
  })
}

export default chartView
