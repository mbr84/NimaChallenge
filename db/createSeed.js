const fs = require('fs');

const openingString = `INSERT INTO
  prices (carId, year, price)
VALUES
`

const data = fs.readFileSync('./prices.csv', { encoding: 'utf-8'})

const sqlFormattedDataArray = data.split('\n').slice(1)
  .map(line => {
    const newLine = line.split(",").map(value => `"${value}"`)
      .join(", ")
      console.log( `(${newLine}),`)
    return `(${newLine}),`
})
sqlFormattedDataArray.unshift(openingString)

fs.writeFile('./prices.sql', sqlFormattedDataArray.join("\n"), (err) => {
  if (err) throw err;
});
