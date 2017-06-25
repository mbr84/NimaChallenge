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
        props: { id: car.id },
        inner: img({ props: {src: "./images/data-icon.png"} })
      }),
    ]
  })

export default carRow
