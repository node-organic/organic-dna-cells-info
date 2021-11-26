# organic-dna-cells-info

extract cells info from dna branch based on `cellInfo: v1` schema

## usage

```js
// given dna branch

const dnaBranch = {
  'apis': {
    'v1': {
      'name': 'legacy-v1',
      'cellKind': 'test',
      'cellInfo': 'v1'
    },
    'v2': {
      'cellKind': 'test',
      'cellInfo': 'v1'
    },
    'cellKind': 'test',
    'cellInfo': 'v1'
  },
  'webapps': {
    '2018': {
      'client': {
        'cellKind': 'test',
        'cellInfo': 'v1'
      }
    }
  },
  'supervisor': {
    'cellKind': 'test',
    'cellInfo': 'v1'
  }
}

const {getAllCells, getCell} = require('organic-dna-cells-info')
console.log(getAllCells(dnaBranch)) // will print Array of CellInfo structures
console.log(getCell(dnaBranch, 'supervisor')) // will pring only supervisor CellInfo
```

## CellInfo

```
{
  dna: DNA, // cell's dna
  name: String, // cell's name
  groups: Array[String], // cell's groups
  dnaBranchPath: String // dot notated dna branch path
}
```

### CellInfo v1 schema

Cells to be found should follow the schema as their cell DNA:

```
{
  cellKind: String,
  cellInfo: "v1"
}
```

## notes

Cells are deep searched within given dna branch structure:

* cell's groups are formed by their (deep) nesting level path concatenated with their implicit `groups` or `group` values
