/**
 Scans `dnaBranch` and returns Array of

 CellInfo {
   dna: DNA,
   name: String,
   groups: Array[String],
   cwd: String,
   dnaBranchPath: String
 }

 where `dna`, `name`, `groups` and `cwd` are computed as follows:
 * * name reflects to dna branch having both `build` and `cwd` properties
 * * dna reflects to the dna branch
 * * groups reflects to the branch.groups concatinated with the branch's
     path split as single names
 * * cwd reflects to the branch.cwd
 * * dnaBranchPath contains dot notated dna branch path
 */
module.exports = function (dnaBranch) {
  return walk(dnaBranch, [], '')
}

const walk = function (branch, branchRoots, branchName) {
  let results = []
  let isCell = typeof branch.build === 'object' && typeof branch.cwd === 'string'
  if (isCell) {
    let cellInfo = {
      name: branch.name || branchName,
      dna: branch,
      groups: consolidateGroups(branchRoots, branch),
      cwd: branch.cwd,
      dnaBranchPath: branchRoots.concat([branchName]).filter(v => v).join('.')
    }
    results.push(cellInfo)
  }
  if (branchName) {
    branchRoots = branchRoots.concat([branchName])
  }
  for (let key in branch) {
    if (key === 'build' || typeof branch[key] !== 'object') continue
    results = results.concat(walk(branch[key], branchRoots, key))
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
