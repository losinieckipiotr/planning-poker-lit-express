export function loadStyleSheet() {
  const link = document.querySelector<HTMLLinkElement>('[rel="stylesheet"]')

  const ruleList = link!.sheet!.cssRules
  const globalStyles = new CSSStyleSheet()

  let cssTexts1: string[] = []
  for (let i = 0; i < ruleList.length; i++) {
    cssTexts1.push(ruleList[i].cssText)
  }

  const allCss = cssTexts1.join(' ')
  globalStyles.replace(allCss)

  const ruleList2 = globalStyles.cssRules
  let cssTexts2: string[] = []
  for (let i = 0; i < ruleList2.length; i++) {
    cssTexts2.push(ruleList[i].cssText)
  }

  window.globalStyles = globalStyles
}
