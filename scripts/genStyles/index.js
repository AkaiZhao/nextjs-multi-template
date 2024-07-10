const fs = require('fs')
const path = require('path')

const themes = require('../configs/css-variables')

const genVariablesFile = () => {
  const variablesPath = path.join(__dirname, '../../styles/variables.css')

  const data = Object.entries(themes).map(([theme, colors]) => {
    const c = Object.entries(colors).reduce((acc, [cur, value]) => `${acc}\n  --${cur}: ${value};`, '')
    return `.${theme} {${c}\n}\n`
  })

  fs.writeFileSync(variablesPath, data.join('\n'))
}



const genTailwindConfig = () => {
  const tailwindConfigPath = path.join(__dirname, '../../tailwind.theme.config.ts')

  const config = Object.keys(themes.light)

  const colors = config.reduce((acc, cur) => {
    acc[cur] = `var(--${cur})`
    return acc
  }, {})



  fs.writeFileSync(tailwindConfigPath,
    `// auto generated by genTailwindConfig.ts\nconst theme = ${JSON.stringify({ colors }, null, 2)}\nexport default theme`)
}

genVariablesFile()
genTailwindConfig()