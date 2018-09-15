/**
 Scans `dnaBranch` and returns Array of

 CellInfo {
   dna: DNA,
   name: String,
   groups: Array[String],
   cwd: String
 }

 where `dna`, `name`, `groups` and `cwd` are computed as follows:
 * * name reflects to dna branch having both `build` and `cwd` properties
 * * dna reflects to the dna branch
 * * groups reflects to the branch.groups concatinated with the branch's
     path split as single names
 * * cwd reflects to the branch.cwd
 */
module.exports = function (dnaBranch) {
  return walk(dnaBranch, [], '')
}

const walk = function (branch, branchRoots, branchName) {
  let results = []
  if (typeof branch.build === 'object' && typeof branch.cwd === 'string') {
    let cellInfo = {
      name: branch.name || branchName,
      dna: branch,
      groups: branchRoots.concat(branch.groups || []),
      cwd: branch.cwd
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
