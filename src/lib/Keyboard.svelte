<script>
    let {letterBank, updateCurrentGuess, colors} = $props();

    function getBackgroundColor(letter) {
        let bankedLetter = letterBank.find(l => l.letter.toLowerCase() === letter.toLowerCase());

        if (!bankedLetter) {
            return 'black';
        }

        if (bankedLetter.result === '+')
            return colors.g;
        else if (bankedLetter.result === '-')
            return colors.y;
        else
            return 'grey';
    }
</script>

<div style:margin="16px">
    <div class="container">
        {#each ['q','w','e','r','t','y','u','i','o','p'] as letter}
            <div style:background-color={getBackgroundColor(letter)} onclick={() => updateCurrentGuess(letter)}>{letter.toUpperCase()}</div>
        {/each}
    </div>
    <div class="container">
        {#each ['a','s','d','f','g','h','j','k','l'] as letter}
            <div style:background-color={getBackgroundColor(letter)} onclick={() => updateCurrentGuess(letter)}>{letter.toUpperCase()}</div>
        {/each}
    </div>
    <div class="container">
        <div style:background-color="black" style:font-size="16px" style:line-height="48px" onclick={() => updateCurrentGuess("Enter")}>Enter</div>
        {#each ['z','x','c','v','b','n','m'] as letter}
            <div style:background-color={getBackgroundColor(letter)} onclick={() => updateCurrentGuess(letter)}>{letter.toUpperCase()}</div>
        {/each}
        <div style:background-color="black" style:font-size="16px" style:line-height="48px" onclick={() => updateCurrentGuess("Backspace")}>Back</div>
    </div>
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .container div {
        border: solid 1px white;
        height: 48px;
        width: 48px;
        font-size: 32px;
        display: inline-block;
    }
</style>