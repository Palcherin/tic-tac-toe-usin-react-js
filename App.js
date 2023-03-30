
import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}





















// import  { useState } from 'react'
// import firebase, { initializeApp } from "firebase/app";
// import './App.css'
//  import { initializeApp } from "firebase/app";
// import {getAuth, GoogleAuthProvider } from "firebase/auth";
// import { User } from 'firebase/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
// import { useRef } from 'react';
// import { Firestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyDSyYLRATSpzAcurx3yAXSlmtTXlp1uJIk",
//   authDomain: "my-app-9cfcb.firebaseapp.com",
//   projectId: "my-app-9cfcb",
//   storageBucket: "my-app-9cfcb.appspot.com",
//   messagingSenderId: "628280825492",
//   appId: "1:628280825492:web:e4d6b91ba5aa442e59c681"
// };
// const app=initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const firestoreDB = Firestore(app);

// function App() {
//   const[user]=useAuthState(auth);    
//  return (
//     <>
//     <div className='app'>
//       <header>

//       </header>
//       <section>
//         {user ? <Chatroom/>: <signIn/>}
//       </section>

//     </div>
    
//     </>
//   )
// }

    
// function signIn(){
//   const signInWithGoogle=()=>{
//     const provider =new firebase.auth.GoogleAuthProvider();
//     auth.signInWithPopup(provider)
//   }

//   return(
//     <button onClick={signInWithGoogle}>Sign In With Google</button>
//   )
// }
// function signOut(){
  
//   return auth.currentUser &&(
//     <button onClick={()=> auth.signOut}>Sign Out</button>
//   )
// }

// function Chatroom(){


//   const dummy=useRef();

//   const messageRef= firestoreDB.collection('message');

//   const query=messageRef.orderBy('collectedAt').limit(25);

//   const [messages]=useCollectionData(query, {idField: "id"}); 

//   const [formValue,setFormValue]=useState(""); 



//   const sendMessage=async(e)=>{
//     e.preventDefault();

//     const {uid,photoURL}=auth.currentUser;

//     await messagesRef.add({
//       text: formValue, 
//       createAt: firebase.firestore.fieldValue.serverTimestamp(),
//       uid,
//       photoURL
//     }); 
//     setFormValue('');
//     dummy.current.scrollIntoView({behaviour: 'smooth'});
//   }


//   return(
//     <>
//     <div className='chatroom'>
//       {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}

//     </div>
//     <div ref={dummy}> </div>
//     <form className='text-input' onSubmit={sendMessage}>
//             <input  value={formValue} onChange={(e)=>setFormValue(e.target.value)}/>
//             <button type='submit'>send</button>
            

//         </form>
//     </>
//   )
// }
// function ChatMessage(props){
// const {text, uid, photoURL}=props.message;


// const messageClass=uid===auth.currentUser.uid? 'sent' :'received'; 

// return(
//   <div className={`message ${messageClass}`}>
//      <img src={ photoURL}/>
//      <p>{text}</p>
     
//   </div>
// )
  
// }
// export default App