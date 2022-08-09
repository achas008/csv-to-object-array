# Convert a CSV string into an array of Objects

This package takes a CSV string and converts it to an array of objects. Each row of the CSV data becomes an object in the array, and each column in the CSV data will become a property of each object.

## Usage
```
import * as CSV from 'csv-to-object-array';

const raw_csv = `
First Name, Last Name, Country of Origin, Date of Birth
James, Smith, US, 12/15/99
Santosh, Khatri, India, 2006-06-04
Márcia, Herrera, Brazil, 22/4/91
`

const object_array = CSV.parse(raw_csv);

console.log(object_array);

```

Will output:
```
[
    {
        "First Name": "James",
        "Last Name": "Smith",
        "Country of Origin": "US",
        "Date of Birth": "12/15/99"
    },
    {
        "First Name": "Santosh",
        "Last Name": "Khatri",
        "Country of Origin": "India",
        "Date of Birth": "2006-06-04"
    },
    {
        "First Name": "Márcia",
        "Last Name": "Herrera",
        "Country of Origin": "Brazil",
        "Date of Birth": "22/4/91"
    }
]
```