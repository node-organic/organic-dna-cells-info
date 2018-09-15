# organic-dna-cells-info

extract cells info from dna branch

## usage

```js
// given dna branch

const dnaBranch = {
  'apis': {
    'v1': {
      'name': 'legacy-v1',
      'cwd': './v1',
      'build': {}
    },
    'v2': {
      'cwd': './v2',
      'build': {}
    },
    'cwd': './apis',
    'build': {}
  },
  'webapps': {
    '2018': {
      'client': {
        'cwd': './client',
        'build': {}
      }
    }
  },
  'supervisor': {
    'cwd': './supervisor',
    'build': {}
  }
}

const cells = require('organic-dna-cells-info')(dnaBranch)
console.log(cells) // will print Array of CellInfo structures
```

## CellInfo

```
{
  dna: DNA, // cell's dna
  name: String, // cell's name
  groups: Array[String], // cell's groups
  cwd: String // cell working directory
}
```
