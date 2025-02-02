<script>
  let { guess, colors } = $props();

  let letters = $derived.by(() => {
    let letters = guess.word.split("")
    while (letters.length < 5) {
      letters.push("");
    }
    return letters;
  });

  function getBackground(i) {
    if (guess.result[i] === '+') {
      return colors.g;
    } else if (guess.result[i] === '-') {
      return colors.y;
    } else if (guess.result[i] === 'x') {
      return 'grey';
    } else {
      return 'black';
    }
  }

</script>

<div class="word">
  {#each letters as letter, i}
    <div class="letter" style:background-color={getBackground(i)}>{letter}</div>
  {/each}
</div>

<style>
  .word {
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .letter {
    border: solid 1px white;
    height: 64px;
    width: 64px;
    font-size: 48px;
    text-transform: capitalize;
    margin-right: 8px
  }
</style>
