<script>
  import Guess from './lib/Guess.svelte'
  import Keyboard from "./lib/Keyboard.svelte";
  import {allWords} from "./all-words.js";
  import {answers} from "./possible-answers.js";
  import {getColors} from "./colors.js";
  import Info from "./lib/Info.svelte";

  let mode = $state('normal');

  let message = $state('');
  let turn = $state(0);
  let guesses = $state([
    {word: '', result: ''},
    {word: '', result: ''},
    {word: '', result: ''},
    {word: '', result: ''},
    {word: '', result: ''},
    {word: '', result: ''}
  ]);
  let currentGuess = $state("");
  let answer = $state('');
  let letterBank = $state([]);
  let colors = $state({});

  reset();

  function updateCurrentGuess(key) {
    if (message.includes('Answer:')) {
      reset();
      if (key.length !== 1)
        return;
    }
    message = '';

    if (key === "Enter") {
      checkGuess();
      return;
    }

    if (key === "Backspace") {
      guesses[turn].word = currentGuess = currentGuess.slice(0, -1);
      return;
    }

    if (key.length === 1)
      currentGuess += key;
    guesses[turn].word = currentGuess = currentGuess.replace(/[^a-zA-Z]/, '').slice(0, 5);
  }

  function checkGuess() {
    if (!allWords.includes(currentGuess)) {
      message = currentGuess.toUpperCase() + " is not a valid word."
      return;
    }

    if (currentGuess.length < 5) {
      message = currentGuess + " is not 5 letters";
      return;
    }

    let result = '';
    currentGuess.split('').forEach((letter, i) => {
      if (answer[i] === letter) {
        // Right letter, right place
        result += '+';
        updateLetterBank(letter, '+');
      } else if (answer.includes(letter)) {
        // Right letter, wrong place
        let answerInstances = answer.split('').filter((i) => i === letter).length;
        let guessInstances = currentGuess.split('').filter((i) => i === letter).length;

        if (answerInstances === 1 && guessInstances > 1) {
          // First one is yellow unless this letter has a match later in the word
          let futureMatch = currentGuess.split('').some((l, i) => l === letter && answer[i] === letter);

          result += (currentGuess.indexOf(letter) === i && !futureMatch) ? '-' : 'x';
        } else {
          result += '-';
        }
        updateLetterBank(letter, '-');
      } else {
        // Wrong letter
        result += 'x';
        updateLetterBank(letter, 'x');
      }
    });

    guesses[turn] = {
      word: currentGuess,
      result: result
    };

    if (turn === 5 || guesses[turn].result === '+++++') {
      endGame();
    } else {
      turn++;
      currentGuess = '';
    }

  }

  function updateLetterBank(letter, result) {
    let currentStatus = letterBank.findIndex(l => l.letter.toLowerCase() === letter.toLowerCase());
    if (currentStatus === -1) {
      letterBank.push({letter: letter, result: result})
    } else {
      let matchingLetter = letterBank[currentStatus];

      let newResult = 'x';
      if (matchingLetter.result === '+' || result === '+')
        newResult = '+';
      else if (matchingLetter.result === '-' || result === '-')
        newResult = '-';

      letterBank[currentStatus] = {letter: letter, result: newResult}
    }
  }

  function endGame() {
    message = "Answer: " + answer.toUpperCase();
  }

  function getNewWord() {
    answer = answers[Math.floor(Math.random() * answers.length)];
  }

  function reset() {
    turn = 0;
    currentGuess = '';
    guesses = [
      {word: '', result: ''},
      {word: '', result: ''},
      {word: '', result: ''},
      {word: '', result: ''},
      {word: '', result: ''},
      {word: '', result: ''}
    ];
    letterBank = [];
    message = '';

    colors = getColors(mode);

    if (mode === 'infinite') {
      currentGuess = answer;
      getNewWord();
      checkGuess();
    } else {
      getNewWord();
    }

  }
</script>

<svelte:document onkeydown={(e) => updateCurrentGuess(e.key)}/>
<div class="app">
  <div id="header">
    <h2 id="title">Wordle:</h2>
    <select id="mode-selection" onchange={(e) => {
    mode = e.target.value;
    reset();
  }}>
      <option value="normal">Normal</option>
      <option value="infinite">Infinite</option>
      <option value="mystery">Mystery</option>
    </select>
    <img id="info" src="info.svg" alt="info" onclick={() => document.getElementById("info-dialog").showModal()} />
    <Info />
  </div>

  <div>
    <span>{message}</span>
    {#if message.includes("Answer:")}
      <button style:margin-left="16px" style:border-color="grey" onclick={() => reset()}>Next</button>
    {/if}
  </div>

  <div class="guesses">
    {#each guesses as guess}
      <Guess guess={guess} colors={colors} />
    {/each}
  </div>

  <div class="keyboard">
    <Keyboard letterBank={letterBank} updateCurrentGuess={updateCurrentGuess} colors={colors} />
  </div>

</div>

<style>
  #header {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #title {
    display: inline-block;
    margin-block: 8px;
  }
  #mode-selection {
    background-color: #242424;
    color: rgba(255, 255, 255, 0.87);
    border: rgba(255, 255, 255, 0.87) 1px solid;
    border-radius: 5px;
    margin-left: 16px;
    height: 36px;
    font-size: 18px;
    font-weight: bold;
  }
  #info {
    height: 24px;
    margin-left: 16px;
  }
</style>
