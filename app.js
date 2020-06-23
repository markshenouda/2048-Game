document.addEventListener('DOMContentLoaded', () =>  {
	const gridDisplay = document.querySelector('.grid')
	const scoreDisplay = document.getElementById('score')
	const resultDisplay = document.getElementById('result')
	const newGame = document.getElementById('new-game')
	let squares = []
	const width = 4
	let score = 0
	let touchOn = true
  
	//create the playing board
	function createBoard() {
	  for (let i=0; i < width*width; i++) {
		square = document.createElement('div')
		
		gridDisplay.appendChild(square)
		squares.push(square)
	  }
	  generate()
	  generate()
	}
	createBoard()

	function getValue(i) {
		if(squares[i].innerHTML == ''){
			return 0
		} else return squares[i].innerHTML
	}

	function setValue(s, v) {
		if(v == 0){
			squares[s].innerHTML = ''
		} else squares[s].innerHTML = v
	}
  
	//generate a new number
	function generate() {
	  randomNumber = Math.floor(Math.random() * squares.length)
	  if (getValue(randomNumber) == 0) {
		setValue(randomNumber, 2)
		checkForGameOver()
	  } else generate()
	}
  
	function moveRight() {
	  for (let i=0; i < 16; i++) {
		if (i % 4 === 0) {
		  let totalOne = getValue(i)
		  let totalTwo = getValue(i+1)
		  let totalThree = getValue(i+2)
		  let totalFour = getValue(i+3)
		  let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
  
		  let filteredRow = row.filter(num => num)
		  let missing = 4 - filteredRow.length
		  let zeros = Array(missing).fill(0)
		  let newRow = zeros.concat(filteredRow)
  
		  setValue(i, newRow[0])
		  setValue(i+1, newRow[1])
		  setValue(i+2, newRow[2])
		  setValue(i+3, newRow[3])
		}
	  }
	}
  
	function moveLeft() {
	  for (let i=0; i < 16; i++) {
		if (i % 4 === 0) {
			let totalOne = getValue(i)
			let totalTwo = getValue(i+1)
			let totalThree = getValue(i+2)
			let totalFour = getValue(i+3)
		  	let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
  
		  let filteredRow = row.filter(num => num)
		  let missing = 4 - filteredRow.length
		  let zeros = Array(missing).fill(0)
		  let newRow = filteredRow.concat(zeros)
  
		  setValue(i, newRow[0])
		  setValue(i+1, newRow[1])
		  setValue(i+2, newRow[2])
		  setValue(i+3, newRow[3])
		}
	  }
	}
  
  
	function moveUp() {
	  for (let i=0; i < 4; i++) {
		let totalOne = getValue(i)
		let totalTwo = getValue(i+width)
		let totalThree = getValue(i+(width*2))
		let totalFour = getValue(i+(width*3))
		let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
  
		let filteredColumn = column.filter(num => num)
		let missing = 4 - filteredColumn.length
		let zeros = Array(missing).fill(0)
		let newColumn = filteredColumn.concat(zeros)

		setValue(i, newColumn[0])
		setValue(i+width, newColumn[1])
		setValue(i+(width*2), newColumn[2])
		setValue(i+(width*3), newColumn[3])
	  }
	}
  
	function moveDown() {
	  for (let i=0; i < 4; i++) {
		let totalOne = getValue(i)
		let totalTwo = getValue(i+width)
		let totalThree = getValue(i+(width*2))
		let totalFour = getValue(i+(width*3))
		let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
  
		let filteredColumn = column.filter(num => num)
		let missing = 4 - filteredColumn.length
		let zeros = Array(missing).fill(0)
		let newColumn = zeros.concat(filteredColumn)
  
		setValue(i, newColumn[0])
		setValue(i+width, newColumn[1])
		setValue(i+(width*2), newColumn[2])
		setValue(i+(width*3), newColumn[3])
	  }
	}
  
	function combineRow() {
	  for (let i =0; i < 15; i++) {
		if (getValue(i) === getValue(i+1)) {
		  let combinedTotal = parseInt(getValue(i)) + parseInt(getValue(i+1))
		  setValue(i, combinedTotal)
		  setValue(i+1, 0)
		  score += combinedTotal
		  scoreDisplay.innerHTML = score
		}
	  }
	  checkForWin()
	}
  
	function combineColumn() {
	  for (let i =0; i < 12; i++) {
		if (getValue(i) === getValue(i+width)) {
		  let combinedTotal = parseInt(getValue(i)) + parseInt(getValue(i+width))
		  setValue(i, combinedTotal)
		  setValue(i+width, 0)
		  score += combinedTotal
		  scoreDisplay.innerHTML = score
		}
	  }
	  checkForWin()
	}
  
	//assign functions to keyCodes
	function control(e) {
	  if(e.keyCode === 37) {
		keyLeft()
	  } else if (e.keyCode === 38) {
		keyUp()
	  } else if (e.keyCode === 39) {
		keyRight()
	  } else if (e.keyCode === 40) {
		keyDown()
	  }
	}
	document.addEventListener('keyup', control)
  
	function keyRight() {
	  moveRight()
	  combineRow()
	  moveRight()
	  generate()
	}
  
	function keyLeft() {
	  moveLeft()
	  combineRow()
	  moveLeft()
	  generate()
	}
  
	function keyUp() {
	  moveUp()
	  combineColumn()
	  moveUp()
	  generate()
	}
  
	function keyDown() {
	  moveDown()
	  combineColumn()
	  moveDown()
	  generate()
	}

	function checkForWin() {
	  for (let i=0; i < squares.length; i++) {
		if (getValue(i) == 2048) {
		  resultDisplay.innerHTML = 'You WIN!'
		  document.removeEventListener('keyup', control)
		  touchOn = false
		  setTimeout(() => clear(), 3000)
		}
	  }
	}
  
	function checkForGameOver() {
	  if(!squares.some(s => s.innerHTML == '')){
		  resultDisplay.innerHTML = 'You LOSE'
		document.removeEventListener('keyup', control)
		touchOn = false
	  }
	}
  
	function clear() {
	  clearInterval(myTimer)
	}
  
  
	function addColours() {
	  for (let i=0; i < squares.length; i++) {
		if (getValue(i) == 0) {
			squares[i].style.backgroundColor = 'rgba(238, 228, 218, 0.35)'
		} else if (getValue(i) == 2) {
			squares[i].style.backgroundColor = '#eee4da'
			squares[i].style.color = '#776e65'
		} else if (getValue(i)  == 4) {
			squares[i].style.backgroundColor = '#ede0c8'
			squares[i].style.color = '#776e65'
		} else if (getValue(i)  == 8) {
			squares[i].style.backgroundColor = '#f2b179'
			squares[i].style.color = '#f9f6f2'
		} else if (getValue(i)  == 16) {
			squares[i].style.backgroundColor = '#f59563'
			squares[i].style.color = '#f9f6f2'
		} else if (getValue(i)  == 32) {
			squares[i].style.backgroundColor = '#f67c5f'
			squares[i].style.color = '#f9f6f2'
		} else if (getValue(i) == 64) {
			squares[i].style.backgroundColor = '#f65e3b'
			squares[i].style.color = '#f9f6f2'
		} else if (getValue(i) == 128) {
			squares[i].style.backgroundColor = '#edcf72'
			squares[i].style.color = '#f9f6f2'
		} else if (getValue(i) == 256) {
			squares[i].style.backgroundColor = '#edcc61'
			squares[i].style.color = '#f9f6f2'
		} else if (getValue(i) == 512) {
			squares[i].style.backgroundColor = '#edc850'
			squares[i].style.color = '#f9f6f2'
		} else if (getValue(i) == 1024) {
			squares[i].style.backgroundColor = '#edc53f'
			squares[i].style.color = '#f9f6f2'
		} else if (getValue(i) == 2048) {
			squares[i].style.backgroundColor = '#edc22e'
			squares[i].style.color = '#f9f6f2'
		}
	  }
  }
  addColours()
  
  var myTimer = setInterval(addColours, 50)

let tsx,tsy

document.addEventListener('touchstart', (e) => {
	tsx = e.touches[0].clientX
	tsy = e.touches[0].clientY
})


function touch(e) {
	let tex = e.changedTouches[0].clientX
	let tey = e.changedTouches[0].clientY

	x = Math.abs(tsx - tex)
	y = Math.abs(tsy - tey)
	if(touchOn && (x > 5 || y > 5)){
		if(x > y){
			if(tsx > tex){
				keyLeft()
			} else {
				keyRight()
			}
		} else {
			if(tsy > tey){
				keyUp()
			}else {
				keyDown()
			}
		}
	}
}


document.addEventListener('touchend', (e) => {
	touch(e)
})




  newGame.addEventListener('click', () => {
	location.reload()
  })
  
  })
  
