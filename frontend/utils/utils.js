import Chart from 'chart.js';
import $ from 'jquery';

export const localStorageAsync = (page) =>
  setTimeout(() => window.localStorage.setItem('currentPage', page), 0)

export const config = (data, years) => ({
  type: 'line',
  data: {
    labels: years,
    datasets: [{
      label: "Your Car's Value Over Time",
      backgroundColor: 'blue',
      borderColor: 'blue',
      data,
      fill: false,
    }],
    options: {
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Year'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }]
      }
    }
  }
});

const cleanData = data => {
  const uniqueYears = new Set()
  return state.get('data').filter(el => {
    const isFirstOfYear = !uniqueYears.has(el.year)
    uniqueYears.add(el.year)
    return isFirstOfYear
  })
}

const cleanCanvas = () => {
  const chartRoot = $('#myChart').parent()
  chartRoot.children().remove()
  chartRoot.append('<canvas id="myChart"></canvas>')
}
const renderChart = data => {
  const years = Array.from(data.map(el => el.year))
  const prices = Array.from(data.map(el => el.price))

  new Chart($('#myChart'), config(prices, years))
}

export const renderCanvas = state => {
  cleanCanvas()
  if (state.get('show')) renderChart(cleanData(state))
}
