import { form, input }

const newCarForm = form({
  inner: [
    input({
      attrs: { type: text, placeholder: "Make"}
    }),
    input({
      attrs: { type: text, placeholder: "Model"}
    }),
    input({
      attrs: { type: text, placeholder: "Year"}
    }),
    input({
      attrs: { type: submit } ,
      inner: ["ADD"]
    })
  ]
})
