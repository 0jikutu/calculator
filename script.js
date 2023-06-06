class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement, currentAnswerTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.currentAnswerTextElement = currentAnswerTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    console.log(`this is computation ${this.computation}`)
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }
  
  getDisplayedNumber = (number) => {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  getDisplayedWord = (number) => {
    // const stringNumber = number.toString()
    // const integerDigits = parseFloat(stringNumber.split('.')[0])
    // const decimalDigits = stringNumber.split('.')[1]
    // let integerDisplay
    // if (isNaN(integerDigits)) {
    //   integerDisplay = ''
    // } else {
    //   integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    // }
    // if (decimalDigits != null) {
    //   return `${integerDisplay}.${decimalDigits}`
    // } else {
    //   return integerDisplay
    // }
    return convertNumberToWord(number);
  }

   updateDisplay = () => {
    this.currentOperandTextElement.innerText = this.getDisplayedNumber(this.currentOperand)
    this.currentAnswerTextElement.innerText = this.getDisplayedWord(this.currentOperand)
    console.log(`this is computation ${this.currentOperand}`)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayedNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const getDisplayNumber = document.querySelector('[getDisplayNumber]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const currentAnswerTextElement = document.querySelector('[data-current-answer]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement, currentAnswerTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})


const convertNumberToWord = (number) => {
  typeof number == 'number' ? console.log('it is a number') : console.log('it is not a number');

  let wordNumber;
  let stringValue = number.toString();
  let lengthOfNumber = stringValue.length

  console.log(`the length of number is ${lengthOfNumber}`)

  if (lengthOfNumber < 2) {
      switch (number) {
          case 0:
              wordNumber = 'zero'
              break;
          case 1:
              wordNumber = 'one'
              break;
          case 2:
              wordNumber = 'two'
              break;
          case 3:
              wordNumber = 'three'
              break;
          case 4:
              wordNumber = 'four'
              break;
          case 5:
              wordNumber = 'five'
              break;
          case 6:
              wordNumber = 'six'
              break;
          case 7:
              wordNumber = 'seven'
              break;
          case 8:
              wordNumber = 'eight'
              break;
          case 9:
              wordNumber = 'nine'
              break;
          default:
              break;
      }

      console.log(`word number is ${wordNumber}`)
  } else if (lengthOfNumber == 2) {

      let numberBreak = number.toString().split('')
      console.log(`word number is ${numberBreak}`)
      if (numberBreak[0] == 1) {
          numberBreak[1] == 0 ? wordNumber = 'ten' : numberBreak[1] == 1 ? wordNumber = 'eleven' : numberBreak[1] == 2 ? wordNumber = 'twelve' : numberBreak[1] == 3 ? wordNumber = 'thirteen' : numberBreak[1] == 4 ? wordNumber = 'fourteen' : numberBreak[1] == 5 ? wordNumber = 'fifteen' : numberBreak[1] == 6 ? wordNumber = 'sixteen' : numberBreak[1] == 7 ? wordNumber = 'seventeen' : numberBreak[1] == 8 ? wordNumber = 'eighteen' : numberBreak[1] == 9 ? wordNumber = 'nineteen' : wordNumber = 'unknown'
      } else if (numberBreak[0] == 2 || numberBreak[0] == 3 || numberBreak[0] == 4 || numberBreak[0] == 5 || numberBreak[0] == 6 || numberBreak[0] == 7 || numberBreak[0] == 8 || numberBreak[0] == 9) {
          wordNumber = 'twenty'
          numberBreak[0] == 2 ? wordNumber = 'twenty' : numberBreak[0] == 3 ? wordNumber = 'thirty' : numberBreak[0] == 4 ? wordNumber = 'forty' : numberBreak[0] == 5 ? wordNumber = 'fifty' : numberBreak[0] == 6 ? wordNumber = 'sixty' : numberBreak[0] == 7 ? wordNumber = 'seventy' : numberBreak[0] == 8 ? wordNumber = 'eighty' : numberBreak[0] == 9 ? wordNumber = 'ninety' : wordNumber = 'unknown'

          numberBreak[1] == 0 ? wordNumber += '' : numberBreak[1] == 1 ? wordNumber += ' one' : numberBreak[1] == 2 ? wordNumber += ' two' : numberBreak[1] == 3 ? wordNumber += ' three' : numberBreak[1] == 4 ? wordNumber += ' four' : numberBreak[1] == 5 ? wordNumber += ' five' : numberBreak[1] == 6 ? wordNumber += ' six' : numberBreak[1] == 7 ? wordNumber += ' seven' : numberBreak[1] == 8 ? wordNumber += ' eight' : numberBreak[1] == 9 ? wordNumber += ' nine' : wordNumber = 'unknown'
      }

      console.log(`word number is ${wordNumber}`)
  } else if (lengthOfNumber == 3) {

      let numberBreak = number.toString().split('')
      console.log(`word number is ${numberBreak}`)
      if (numberBreak[0] == 1 || numberBreak[0] == 2 || numberBreak[0] == 3 || numberBreak[0] == 4 || numberBreak[0] == 5 || numberBreak[0] == 6 || numberBreak[0] == 7 || numberBreak[0] == 8 || numberBreak[0] == 9) {
          // wordNumber = 'one hundred'
          numberBreak[0] == 1 ? wordNumber = 'one hundred' : numberBreak[0] == 2 ? wordNumber = 'two hundred' : numberBreak[0] == 3 ? wordNumber = 'three hundred' : numberBreak[0] == 4 ? wordNumber = 'four hundred' : numberBreak[0] == 5 ? wordNumber = 'five hundred' : numberBreak[0] == 6 ? wordNumber = 'six hundred' : numberBreak[0] == 7 ? wordNumber = 'seven hundred' : numberBreak[0] == 8 ? wordNumber = 'eight hundred' : numberBreak[0] == 9 ? wordNumber = 'nine hundred' : wordNumber = 'unknown min'

          if (numberBreak[1] == 0) {
              numberBreak[2] == 1 ? wordNumber += ' and one' : numberBreak[2] == 2 ? wordNumber += ' and two' : numberBreak[2] == 3 ? wordNumber += ' and three' : numberBreak[2] == 4 ? wordNumber += ' and four' : numberBreak[2] == 5 ? wordNumber += ' and five' : numberBreak[2] == 6 ? wordNumber += ' and six' : numberBreak[2] == 7 ? wordNumber += ' and seven' : numberBreak[2] == 8 ? wordNumber += ' and eight' : numberBreak[2] == 9 ? wordNumber += ' and nine' : wordNumber = 'unknown'
          } else if (numberBreak[1] == 1) {
              numberBreak[2] == 0 ? wordNumber += ' and ten' : numberBreak[2] == 1 ? wordNumber += ' and eleven' : numberBreak[2] == 2 ? wordNumber += ' and twelve' : numberBreak[2] == 3 ? wordNumber += ' and thirteen' : numberBreak[2] == 4 ? wordNumber += ' and fourteen' : numberBreak[2] == 5 ? wordNumber += ' and fifteen' : numberBreak[2] == 6 ? wordNumber += ' and sixteen' : numberBreak[2] == 7 ? wordNumber += ' and seventeen' : numberBreak[2] == 8 ? wordNumber += ' and eighteen' : numberBreak[2] == 9 ? wordNumber += ' and nineteen' : wordNumber = 'unknown'
          } else if (numberBreak[1] == 2 || numberBreak[1] == 3 || numberBreak[1] == 4 || numberBreak[1] == 5 || numberBreak[1] == 6 || numberBreak[1] == 7 || numberBreak[1] == 8 || numberBreak[1] == 9) {
              numberBreak[1] == 2 ? wordNumber += ' and twenty' : numberBreak[1] == 3 ? wordNumber += ' and thirty' : numberBreak[1] == 4 ? wordNumber += ' and forty' : numberBreak[1] == 5 ? wordNumber += ' and fifty' : numberBreak[1] == 6 ? wordNumber += ' and sixty' : numberBreak[1] == 7 ? wordNumber += ' and seventy' : numberBreak[1] == 8 ? wordNumber += ' and eighty' : numberBreak[1] == 9 ? wordNumber += ' and ninety' : wordNumber = 'unknown men'

              numberBreak[2] == 0 ? wordNumber += '' : numberBreak[2] == 1 ? wordNumber += ' one' : numberBreak[2] == 2 ? wordNumber += ' two' : numberBreak[2] == 3 ? wordNumber += ' three' : numberBreak[2] == 4 ? wordNumber += ' four' : numberBreak[2] == 5 ? wordNumber += ' five' : numberBreak[2] == 6 ? wordNumber += ' six' : numberBreak[2] == 7 ? wordNumber += ' seven' : numberBreak[2] == 8 ? wordNumber += ' eight' : numberBreak[2] == 9 ? wordNumber += ' nine' : wordNumber = 'unknown gan'
          }
      }

      console.log(`word number is ${wordNumber}`)
  } else if (lengthOfNumber == 4) {

      let numberBreak = number.toString().split('')
      console.log(`word number is ${numberBreak}`)
      if (numberBreak[0] == 1 || numberBreak[0] == 2 || numberBreak[0] == 3 || numberBreak[0] == 4 || numberBreak[0] == 5 || numberBreak[0] == 6 || numberBreak[0] == 7 || numberBreak[0] == 8 || numberBreak[0] == 9) {
          // wordNumber = 'one hundred'
          numberBreak[0] == 1 ? wordNumber = 'one thousand' : numberBreak[0] == 2 ? wordNumber = 'two thousand' : numberBreak[0] == 3 ? wordNumber = 'three thousand' : numberBreak[0] == 4 ? wordNumber = 'four thousand' : numberBreak[0] == 5 ? wordNumber = 'five thousand' : numberBreak[0] == 6 ? wordNumber = 'six thousand' : numberBreak[0] == 7 ? wordNumber = 'seven thousand' : numberBreak[0] == 8 ? wordNumber = 'eight thousand' : numberBreak[0] == 9 ? wordNumber = 'nine thousand' : wordNumber = 'unknown min'

          if (numberBreak[1] == 1 || numberBreak[1] == 2 || numberBreak[1] == 3 || numberBreak[1] == 4 || numberBreak[1] == 5 || numberBreak[1] == 6 || numberBreak[1] == 7 || numberBreak[1] == 8 || numberBreak[1] == 9) {
              numberBreak[1] == 1 ? wordNumber += ' one hundred' : numberBreak[1] == 2 ? wordNumber += ' two hundred' : numberBreak[1] == 3 ? wordNumber += ' three hundred' : numberBreak[1] == 4 ? wordNumber += ' four hundred' : numberBreak[1] == 5 ? wordNumber += ' five hundred' : numberBreak[1] == 6 ? wordNumber += ' six hundred' : numberBreak[1] == 7 ? wordNumber += ' seven hundred' : numberBreak[1] == 8 ? wordNumber += ' eight hundred' : numberBreak[1] == 9 ? wordNumber += ' nine hundred' : wordNumber = 'unknown min'
          }

          if (numberBreak[2] == 0) {
              console.log(`this is the number ${numberBreak[2]}`)
              numberBreak[3] == 0 ? wordNumber += '' : numberBreak[3] == 1 ? wordNumber += ' and one' : numberBreak[3] == 2 ? wordNumber += ' and two' : numberBreak[3] == 3 ? wordNumber += ' and three' : numberBreak[3] == 4 ? wordNumber += ' and four' : numberBreak[3] == 5 ? wordNumber += ' and five' : numberBreak[3] == 6 ? wordNumber += ' and six' : numberBreak[3] == 7 ? wordNumber += ' and seven' : numberBreak[3] == 8 ? wordNumber += ' and eight' : numberBreak[3] == 9 ? wordNumber += ' and nine' : wordNumber = 'unknown'
          } else if (numberBreak[2] == 1) {
              console.log(`this is the number ${numberBreak[2]}`)
              numberBreak[3] == 0 ? wordNumber += ' and ten' : numberBreak[3] == 1 ? wordNumber += ' and eleven' : numberBreak[3] == 2 ? wordNumber += ' and twelve' : numberBreak[3] == 3 ? wordNumber += ' and thirteen' : numberBreak[3] == 4 ? wordNumber += ' and fourteen' : numberBreak[3] == 5 ? wordNumber += ' and fifteen' : numberBreak[3] == 6 ? wordNumber += ' and sixteen' : numberBreak[3] == 7 ? wordNumber += ' and seventeen' : numberBreak[3] == 8 ? wordNumber += ' and eighteen' : numberBreak[3] == 9 ? wordNumber += ' and nineteen' : wordNumber = 'unknown'
          } else if (numberBreak[2] == 2 || numberBreak[2] == 3 || numberBreak[2] == 4 || numberBreak[2] == 5 || numberBreak[2] == 6 || numberBreak[2] == 7 || numberBreak[2] == 8 || numberBreak[2] == 9) {
              numberBreak[2] == 2 ? wordNumber += ' and twenty' : numberBreak[2] == 3 ? wordNumber += ' and thirty' : numberBreak[2] == 4 ? wordNumber += ' and forty' : numberBreak[2] == 5 ? wordNumber += ' and fifty' : numberBreak[2] == 6 ? wordNumber += ' and sixty' : numberBreak[2] == 7 ? wordNumber += ' and seventy' : numberBreak[2] == 8 ? wordNumber += ' and eighty' : numberBreak[2] == 9 ? wordNumber += ' and ninety' : wordNumber = 'unknown men'

              numberBreak[3] == 0 ? wordNumber += '' : numberBreak[3] == 1 ? wordNumber += ' one' : numberBreak[3] == 2 ? wordNumber += ' two' : numberBreak[3] == 3 ? wordNumber += ' three' : numberBreak[3] == 4 ? wordNumber += ' four' : numberBreak[3] == 5 ? wordNumber += ' five' : numberBreak[3] == 6 ? wordNumber += ' six' : numberBreak[3] == 7 ? wordNumber += ' seven' : numberBreak[3] == 8 ? wordNumber += ' eight' : numberBreak[3] == 9 ? wordNumber += ' nine' : wordNumber = 'unknown gan'
          }
      }

      console.log(`word number is ${wordNumber}`)
  }
  return wordNumber;
}

// convertNumberToWord(33)
