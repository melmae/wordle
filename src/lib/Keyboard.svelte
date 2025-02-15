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
        <div id="enter" onclick={() => updateCurrentGuess("Enter")}>Enter</div>
        {#each ['z','x','c','v','b','n','m'] as letter}
            <div style:background-color={getBackgroundColor(letter)} onclick={() => updateCurrentGuess(letter)}>{letter.toUpperCase()}</div>
        {/each}
        <div id="back" onclick={() => updateCurrentGuess("Backspace")}>Back</div>
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
        border-radius: 4px;
        margin: 2px;
        height: 48px;
        width: 48px;
        font-size: 32px;
        display: inline-block;
    }

    #enter, #back {
        font-size: 16px;
        line-height: 48px;
        background-color: black;
    }

    @media only screen and (max-device-width: 480px) {
        .container div {
            height: 36px;
            width: 36px;
            font-size: 24px;
        }

        #enter, #back {
            width: 48px;
            font-size: 14px;
            line-height: 36px;
        }
    }
</style>