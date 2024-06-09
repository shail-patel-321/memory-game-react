// import './App.css';
// import { useState } from 'react'

// const cardImages = [
//   {"src":"/public/images/clubs_2.png"},
//   {"src":"/public/images/hearts_4.png"},
//   {"src":"/public/images/joker_red.png"},
//   {"src":"/public/images/spades_jack.png"},
//   {"src":"/public/images/diamonds_queen.png"},
//   {"src":"/public/images/abstract.png"}
// ]



// function App() {
//   const [cards,setCards] = useState([])
//   const [turns,setTurns] = useState(0)
//   const shuffleCards = () =>{
//     const shuffledCards = [...cardImages,...cardImages]
//     .sort(()=>Math.random()-0.5)
//     .map((card)=>({...card,id:Math.random()}))

//     setCards(shuffledCards)
//     setTurns(0)
//   }

//   console.log(cards, turns)

//   return (
//     <div className="App">
//       <h1>Memory Game</h1>
//       <button onClick={shuffleCards}>New Game</button>
//     </div>
//   );
// }

// export default App;





import { useState, useEffect } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

// const cardImages = [
//   { "src": "/img/helmet-1.png", matched: false },
//   { "src": "/img/potion-1.png", matched: false },
//   { "src": "/img/ring-1.png", matched: false },
//   { "src": "/img/scroll-1.png", matched: false },
//   { "src": "/img/shield-1.png", matched: false },
//   { "src": "/img/sword-1.png", matched: false },
// ]
const cardImages = [
  {"src":"/images/clubs_2.png", matched: false },
  {"src":"/images/hearts_4.png", matched: false },
  {"src":"/images/joker_red.png", matched: false },
  {"src":"/images/spades_jack.png", matched: false },
  {"src":"/images/diamonds_queen.png", matched: false },
  {"src":"/images/fish2.png", matched: false }
]

// const cardImages = [
//   {"src":"/images/fish2.png",matched:false},
//   {"src":"/images/fish2.png",matched:false},
//   {"src":"/images/fish2.png",matched:false},
//   {"src":"/images/fish2.png",matched:false},
//   {"src":"/images/fish2.png",matched:false},
//   {"src":"/images/fish2.png",matched:false}
// ]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [whoseTurn,setWhoseTurn] = useState(0)
  const [redScore,setRedScore] = useState(0)
  const [blueScore,setBlueScore] = useState(0)
  const [total,setTotal] = useState(0)

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
    setWhoseTurn(0)
    setRedScore(0)
    setBlueScore(0)
    setTotal(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  useEffect(()=>{
    if(total===6)
      {
        // alert("Game Over");
        if(blueScore>redScore)
          {
            alert("Blue Wins")
          }
        else if(redScore>blueScore)
          {
            alert("Red Wins")
          }
        else
          {
            alert("Game is Drawn")
          }
      }
  })
  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setWhoseTurn(whoseTurn);
        setTotal(total+1);
        if(whoseTurn===0)
          {
            setRedScore(redScore+1);
          }
        else
        {
          setBlueScore(blueScore+1);
        }
        if(total===6)
          {
            // alert("Game Over");
            if(blueScore>redScore)
              {
                alert("Blue Wins")
              }
            else if(redScore>blueScore)
              {
                alert("Red Wins")
              }
            else
              {
                alert("Game is Drawn")
              }
          }
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setWhoseTurn(1-whoseTurn);
        setTimeout(() => resetTurn(), 1000)
      }

    }
  }, [choiceOne, choiceTwo])

  useEffect(()=>{
    if(whoseTurn===0)
      {
        document.body.style.backgroundColor = "red";
      }
      else
      {
        document.body.style.backgroundColor = "blue";
      }
  },[turns])

  // reset choices & increase turn
  const resetTurn = () => {
    // if(choiceOne===choiceTwo)
    //   {
    //     setWhoseTurn(1-whoseTurn)
    //   }
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    // setWhoseTurn(1-whoseTurn)
    setDisabled(false)
  }

  // start new game automagically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Biscuit</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>

      {/* <p>Turns: {turns}</p>
      <p>Whose Turn: {whoseTurn}</p>
      <p>Red Score: {redScore}</p><t/><p>Blue Score: {blueScore}</p>
      <p>Total: {total}</p> */}
    </div>
  );
}

export default App