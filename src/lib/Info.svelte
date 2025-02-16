<dialog id="info-dialog">
    <button onclick={() => document.getElementById("info-dialog").close()}>X</button>
    <h6>Normal:</h6>
    <p>
        Guess the mystery 5-letter word in 6 guesses!
        If you guess a letter correctly and it's in the correct spot, the square will turn green.
        If you guess a letter correctly but it's in a different spot in the word, the square will turn yellow.
        If the letter is not in the word, the square will turn grey.
    </p>
    <h6>Infinite:</h6>
    <p>
        The same rules apply as Normal, however after finishing the first round,
        the second round automatically populates the first guess with the previous round's answer leaving the player with 5 more guesses.
        This continues infinitely (or until the player stops playing).
    </p>
    <h6>Mystery:</h6>
    <p>
        The same rules apply as Normal, however the colors are no longer green and yellow.
        Two new colors are randomly picked from a list, but the player needs to figure out which of the new colors indicates a correct guess in the correct spot (green)
        and which of the new colors indicates a correct guess in an incorrect spot (yellow).
        Be careful! Green and yellow are still possibly colors, but may not have the same meanings!
    </p>
</dialog>

<style>
    #info-dialog {
        position: absolute;
        width: 85%;
        max-width: 600px;
        height: 100%;
        overflow: auto;
        border-radius: 8px;
    }

    h6 {
        font-size: 16px;
        margin-bottom: 0;
    }

    button {
        position: absolute;
        right: 16px;
        top: 16px;
    }
</style>