class Calculator {
  // Select DOM Elements
  constructor() {
    // this.calculator = document.querySelector('.calculator')
    this.keys = document.querySelector('.calculator__keys')
    this.currentDisplay = document.querySelector('.calculator__display .calculator__current')
    this.historyDisplay = document.querySelector('.calculator__display .calculator__history')
    this.currentValue = '0'
    this.previousValue = ''

    this.operatorValue = ''
    this.operatorString = ''
    this.historyValue = ''

    this.previousKeyType = ''

    this.display()
    this.events()
  }

  // Event
  events() {
    this.keys.addEventListener('click', e => this.handleKeyPress(e))
  }

  // Method
  handleKeyPress(e) {
    if (!e.target.matches('button')) return

    const key = e.target
    const action = key.dataset.action

    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))

    if (!action) {
      this.handleNumberPress(key.textContent)
      this.previousKeyType = 'number'
    }

    if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
      key.classList.add('is-depressed')
      this.handleOperator(action)
      this.previousKeyType = 'operator'
      this.previousValue = this.currentValue
    }

    if (action === 'decimal') {
      this.handleDecimal()
    }

    if (action === 'clearAll' || action === 'clearCurrent' || action === 'removeLastCharacter') {
      this.handleClearData(action)
    }

    if (action === 'calculate') {
      this.handleCalculate()
      this.previousKeyType = 'calculate'
    }

    this.display()
  }

  handleNumberPress(keyContent) {
    if (this.currentValue !== '0') {
      this.currentValue += keyContent
    }

    if (this.currentValue === '0') {
      this.currentValue = keyContent
    }

    if (this.previousKeyType === 'calculate') {
      this.currentValue = keyContent
      this.historyValue = ''
    }

    if (this.previousKeyType === 'operator') {
      this.currentValue = keyContent
    }
  }

  handleOperator(action) {
    switch (action) {
      case 'add':
        this.operatorString = ' + '
        this.operatorValue = action
        break
      case 'subtract':
        this.operatorString = ' - '
        this.operatorValue = action
        break
      case 'multiply':
        this.operatorString = ' x '
        this.operatorValue = action
        break
      case 'divide':
        this.operatorString = ' ÷ '
        this.operatorValue = action
        break
    }

    this.historyValue = `${this.currentValue} ${this.operatorString}`
  }

  handleDecimal() {
    if (this.currentValue.includes('.')) return

    this.currentValue += '.'
  }

  handleClearData(action) {
    switch (action) {
      case 'clearAll':
        this.previousValue = ''
        this.currentValue = '0'
        this.historyValue = ''
        this.operatorValue = ''
        this.previousKeyType = ''
        break
      case 'clearCurrent':
        this.currentValue = '0'
        break
      case 'removeLastCharacter':
        this.currentValue = this.currentValue.length > 1 ? this.currentValue.slice(0, -1) : '0'
        break
    }
  }

  handleCalculate() {
    let result = ''

    switch (this.operatorValue) {
      case 'add':
        result = parseFloat(this.previousValue) + parseFloat(this.currentValue)
        break
      case 'subtract':
        result = parseFloat(this.previousValue) - parseFloat(this.currentValue)
        break
      case 'multiply':
        result = parseFloat(this.previousValue) * parseFloat(this.currentValue)
        break
      case 'divide':
        result = parseFloat(this.previousValue) / parseFloat(this.currentValue)
        break
      default:
        result = this.currentValue
    }

    this.historyValue = `${this.previousValue} ${this.operatorString}  ${this.currentValue} =`
    this.currentValue = result
  }

  display() {
    this.currentDisplay.textContent = this.currentValue
    this.historyDisplay.textContent = this.historyValue
  }
}

if (document.querySelector('#calculator')) {
  new Calculator()
}
