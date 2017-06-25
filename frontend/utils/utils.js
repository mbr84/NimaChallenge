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

export const renderChart = state => {
  const uniqueYears = new Set()
  const dedupedData = state.get('data').filter(el => {
    const isFirstOfYear = !uniqueYears.has(el.year)
    uniqueYears.add(el.year)
    return isFirstOfYear
  })
  const years = Array.from(dedupedData.map(el => el.year))
  const data = Array.from(dedupedData.map(el => el.price))

  $('#myChart').siblings().remove()
  new Chart($('#myChart'), config(data, years))
}
