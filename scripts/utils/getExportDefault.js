function getExportDefault(content) {
  const pattern = /export default (\w* )*(?<default>\w+)/
  const exec = pattern.exec(content)
  if (!exec) return null
  return exec.groups.default
}

module.exports = getExportDefault
