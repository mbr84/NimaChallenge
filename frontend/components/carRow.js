import { tr, td, img } from 'snabbdom-helpers'
import h from 'snabbdom/h'

const carRow = car =>
  tr({
    inner: [
      td({inner: car.make}),
      td({inner: car.model}),
      td({inner: car.year}),
      td({
        selector: ".price-cell",
        inner: img({ props: {src: "./images/data-icon.png", id: car.id } })
      }),
    ]
  })

export default carRow
