import { tr, th, td, table, thead } from 'snabbdom-helpers';

const carsView = state => {
  const cars = state.map(car =>
    tr({
      inner: [
        td({inner: car.make}),
        td({inner: car.model}),
        td({inner: car.year}),
      ]
    })
  )

  return table({
    inner: [
      thead({
        inner: [
          th({inner: ["MAKE"]}),
          th({inner: ["MODEL"]}),
          th({inner: ["YEAR"]}),
        ]
      }),
      ...cars
    ]
  })
}
module.exports = carsView
