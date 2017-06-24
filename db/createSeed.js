const fs = require('fs');

const openingString = `INSERT INTO
  cars (id, make, model, year)
VALUES
`

const data = fs.readFileSync('../cars.csv', { encoding: 'utf-8'})

const sqlFormattedDataArray = data.split('\n').slice(1)
  .map(line => {
    const newLine = line.split(",").map(value => `"${value}"`)
      .join(", ")
      console.log( `(${newLine}),`)
    return `(${newLine}),`
})
sqlFormattedDataArray.unshift(openingString)

fs.writeFile('./cars.sql', sqlFormattedDataArray.join("\n"), (err) => {
  if (err) throw err;
});
