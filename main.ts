//% color=#7b1fa2 icon="\uf001" block="Bad Apple Audio"
namespace badappleAudio {
    // Compact note events: MIDI note, duration in 50ms ticks.
    // This route deliberately uses only stock MakeCode music APIs.
    const events = hex`
45 04 47 02 48 06 00 02 4a 04 48 04 47 04 45 08
40 04 45 04 47 04 48 08 4a 04 4c 04 4a 04 48 08
47 04 45 08 00 04 45 04 47 04 48 04 4a 04 4c 08
4d 04 4c 04 4a 08 48 04 47 04 45 08 40 08 00 04
`

    function midiToHz(note: number): number {
        return Math.round(440 * Math.pow(2, (note - 69) / 12))
    }

    /** Play the generated note-event stream. */
    //% block="play Bad Apple notes"
    export function play(): void {
        for (let i = 0; i + 1 < events.length; i += 2) {
            const note = events[i]
            const ms = events[i + 1] * 50
            if (note == 0) {
                music.stopAllSounds()
                basic.pause(ms)
            } else {
                music.playTone(midiToHz(note), ms)
            }
        }
        music.stopAllSounds()
    }
}
