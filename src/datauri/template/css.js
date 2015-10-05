export default (data) => {
  return [
      "",
      `.${data.className.replace(/\s+/gi, '_')} {`,
      `    background-image: url('${data.background}');`,
      "}"
  ].join('\n');
}
