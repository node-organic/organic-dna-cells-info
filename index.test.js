const extract = require('./index')
test('extract cells info', () => {
  const dnaBranch = {
    'apis': {
      'v1': {
        'name': 'legacy-v1',
        'cwd': './v1',
        'groups': ['legacy'],
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
    }
  }
  let cells = extract(dnaBranch)
  expect(cells.length).toBe(4)
  expect(cells[0].name).toBe('apis')
  expect(cells[0].cwd).toBe('./apis')
  expect(cells[0].groups).toEqual([])
  expect(cells[1].name).toBe('legacy-v1')
  expect(cells[1].groups).toEqual(['apis', 'legacy'])
  expect(cells[2].cwd).toBe('./v2')
  expect(cells[2].groups).toEqual(['apis'])
  expect(cells[3].cwd).toBe('./client')
  expect(cells[3].groups).toEqual(['webapps', '2018'])
})