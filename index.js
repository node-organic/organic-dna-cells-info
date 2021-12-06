/**
 * Scans `dnaBranch` and returns Array of
 *
 * CellInfo {
 *   name: String,
 *   dna: DNA,
 *   groups: Array[String],
 *   dnaBranchPath: String
 * }
 *
 * where properties are computed as follows:
 *
 * * `name` reflects to dna branch having both `cellKind` and `cellInfo` properties
 * * `dna` reflects to the dna branch itself
 * * `groups` reflects to the branch.groups concatinated with the branch's
 *  path split as single names
 * * `dnaBranchPath` contains dot notated dna branch path
 */
module.exports.getAllCells = function (dnaBranch, cellIdentifierFn) {
  const r = walk(dnaBranch, [], '', cellIdentifierFn || defaultCellIdentifierFn)
  return r
}

/**
 * Returns the first found cell using `getAllCells` matched by name
 */
module.exports.getCell = function (dnaBranch, cellName, cellIdentifierFn) {
  const cells = module.exports.getAllCells(dnaBranch, cellIdentifierFn)
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].name === cellName) {
      return cells[i]
    }
  }
}

const defaultCellIdentifierFn = function (branch) {
  return typeof branch.cellKind === 'string' &&
    branch.cellInfo === 'v1'
}

const walk = function (branch, branchRoots, branchName, cellIdentifierFn) {
  if (typeof branch !== 'object') throw new Error('can not walk ' + typeof branch + ' at ' + branchRoots.join('.') + '#' + branchName)
  if (branch === null) throw new Error('can not access null branch')
  let results = []
  const isCell = cellIdentifierFn(branch)
  if (isCell) {
    const cellInfo = {
      name: branch.name || branchName,
      dna: branch,
      groups: consolidateGroups(branchRoots, branch),
      dnaBranchPath: branchRoots.concat([branchName]).filter(v => v).join('.')
    }
    results.push(cellInfo)
  }
  if (branchName) {
    branchRoots = branchRoots.concat([branchName])
  }
  for (const key in branch) {
    if (!branch[key] || typeof branch[key] !== 'object') continue
    results = results.concat(walk(branch[key], branchRoots, key, cellIdentifierFn))
  }
  return results
}

const consolidateGroups = function (branchRoots, branch) {
  if (branch.group) {
    return branchRoots.concat([branch.group])
  }
  if (branch.groups) {
    return branchRoots.concat(branch.groups)
  }
  return branchRoots
}
