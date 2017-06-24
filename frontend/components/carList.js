import { tr, th, td, table, thead } from 'snabbdom-helpers';
import carRow from './carRow'

const carsView = state => {
  const currentPage = +state.get('currentPage')
  const cars = state.get('cars')
    .slice(currentPage * 15, (currentPage + 1) * 15)
    .map((car, i) => carRow(car))

  return table({
    inner: [
      thead({
        inner: [
          th({inner: ["MAKE"]}),
          th({inner: ["MODEL"]}),
          th({inner: ["YEAR"]}),
          th({inner: ["PRICE"]}),
        ]
      }),
      ...cars
    ]
  })
}
module.exports = carsView
