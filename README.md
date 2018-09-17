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

## notes

Cells are deep searched within given dna branch structure:

* once dna branch holds `cwd` and `build` properties it is considered a cell
* cell's groups are consolidated from their (deep) nesting level path concatenated with their implicit `groups` or `group` values
