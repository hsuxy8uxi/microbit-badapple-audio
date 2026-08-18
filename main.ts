//% color=#7b1fa2 icon="\uf001" block="Bad Apple Audio"
namespace badappleAudio {
    // Real events parsed from the uploaded MIDI, starting where the musical note stream begins.
    // Format: MIDI note, duration in 10 ms units. Chords are reduced to their top active voice.
    const events = hex`4c 02 4a 02 53 02 51 01 4f 01 4d 01 4c 01 4a 01 48 01 53 01 51 01 4f 01 4d 01 4c 01 4a 01 48 01 47 01 45 01 43 01 41 01 40 01 3e 01 3c 01 3b 01 39 01 37 01 35 01 34 01 32 01 30 02 33 1f 3a 05 33 1b 31 0a 33 0b 33 1f 3a 05 33 1b 31 0a 33 0b 33 1f 3a 05 33 1b 31 0a 33 0b 33 15 33 0a 36 0a 38 15 36 0a 38 0b 33 1f 3a 05 33 1b 31 0a 33 0b 33 1f 3a 05 33 1b 31 0a 33 0b 33 1f 3a 05 33 1b 31 0a 33 0b 38 15 36 0a 38 0b 36 15 33 0a 36 0b 33 1f 3a 05 33 1b 31 0a 33 0b 33 1f 3a 05 33 1b 31 0a 33 0b 33 1f 3a 05 33 1b 31 0a 33 0b 33 15 33 0a 36 0a 38 15 36 0a 38 0b 33 1f 3a 05 33 1b 31 0a 33 0b 33 1f 3a 05 33 1b 31 0a 33 0b 33 1f 3a 05 33 1b 31 0a 33 0b 38 10 36 10 38 0a 36 10 33 10 36 0a 3f 15 3f 0a 3f 0a 33 0b 3f 0a 3d 0a 3f 0a 3f 15 3f 0a 3f 0a 33 0b 3f 0a 3d 0a 3f 0a 3f 15 3f 0a 3f 0a 33 0b 3f 0a 3d 0a 3f 0a 33 15 33 0a 36 0a 38 15 36 0a 38 0b 3f 15 3f 0a 3f 0a 33 0b 3f 0a 3d 0a 3f 0a 3f 15 3f 0a 3f 0a 33 0b 3f 0a 3d 0a 3f 0a 3f 15 3f 0a 3f 0a 33 0b 3f 0a 3d 0a 3f 0a 38 15 36 0a 38 0b 36 15 33 0a 36 0b 3f 15 3f 0a 3f 0a 33 0b 3f 0a 3d 0a 3f 0a 3f 15 3f 0a 3f 0a 33 0b 3f 0a 3d 0a 3f 0a 3f 15 3f 0a 3f 0a 33 0b 3f 0a 3d 0a 3f 0a 33 15 33 0a 36 0a 38 15 36 0a 38 0b 3f 15 3f 0a 3f 0a 33 0b 3f 0a 3d 0a 3f 0a 3f 15 3f 0a 3f 0a 33 0b 3f 0a 3d 0a 3f 0a 3f 15 3f 0a 3f 0a 33 0b 3f 0a 3d 0a 3f 0a 38 10 36 10 38 0a 36 10 33 10 36 0a 33 2a 3f 2a 4b 54 3f 2a 4b 2a 4b 54`

    let playing = false

    function midiToHz(note: number): number {
        return Math.round(440 * Math.pow(2, (note - 69) / 12))
    }

    //% block="play Bad Apple MIDI"
    export function play(): void {
        if (playing) return
        playing = true
        control.inBackground(function () {
            for (let i = 0; i + 1 < events.length; i += 2) {
                const note = events[i]
                const ms = events[i + 1] * 10
                if (note == 0) {
                    music.stopAllSounds()
                    basic.pause(ms)
                } else {
                    music.playTone(midiToHz(note), ms)
                }
            }
            music.stopAllSounds()
            playing = false
        })
    }
}
