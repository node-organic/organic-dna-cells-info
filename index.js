/**
  Scans `dnaBranch` and returns Array of

  CellInfo {
    name: String,
    dna: DNA,
    groups: Array[String],
    dnaBranchPath: String
  }

  where properties are computed as follows:

  * `name` reflects to dna branch having both `cellKind` and `cellInfo` properties
  * `dna` reflects to the dna branch itself
  * `groups` reflects to the branch.groups concatinated with the branch's
   path split as single names
  * `dnaBranchPath` contains dot notated dna branch path
*/
module.exports = function (dnaBranch, cellIdentifierFn) {
  let r = walk(dnaBranch, [], '', cellIdentifierFn || defaultCellIdentifierFn)
  return r
}

const defaultCellIdentifierFn = function (branch) {
  return typeof branch.cellKind === 'string' &&
    branch.cellInfo === 'v1'
}

const walk = function (branch, branchRoots, branchName, cellIdentifierFn) {
  if (typeof branch !== 'object') throw new Error('can not walk ' + typeof branch + ' at ' + branchRoots.join('.') + '#' + branchName)
  if (branch === null) throw new Error('can not access null branch')
  let results = []
  let isCell = cellIdentifierFn(branch)
  if (isCell) {
    let cellInfo = {
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
  for (let key in branch) {
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
