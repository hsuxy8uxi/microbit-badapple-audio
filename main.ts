//% color=#7b1fa2 icon="\uf001" block="Bad Apple Audio"
namespace badappleAudio {
    // Generated from the uploaded Bad Apple MIDI. Each pair is MIDI note + duration in 10ms ticks.
    const events = hex`00 a7 5e ff 5e ff 00 a2 3f ff 3f 4e 00 01 4b ff 4b 25 58 02 56 01 54 01 5f 02 5d 01 5b 01 59 01 58 01 56 01 54 01 53 01 51 01 4f 01 4d 01 4c 01 4b 06 43 01 41 01 40 01 3e 01 3c 01 3b 01 39 01 38 01 36 01 34 01 33 01 31 01 2f 01 2d 01 2b 01 2a 01 28 01 26 01 24 01 00 10 4b 19 4a 1a 48 1a 46 19 48 1a 4a 1a 4b 33 4f 19 4d 1a 4b 1a 4a 19 48 1a 46 1a 48 33 4a 19 4b 1a 4a 1a 48 19 46 1a 44 1a 43 33 44 19 46 1a 48 1a 46 19 44 1a 43 1a 41 33 43 19 44 1a 46 1a 48 19 4a 1a 4b 1a 4d 33 4b 19 4a 1a 48 1a 46 19 48 1a 4a 1a 4b 33 4f 19 4d 1a 4b 1a 4a 19 48 1a 46 1a 48 33 4a 19 4b 1a 4a 1a 48 19 46 1a 44 1a 43 33 44 19 46 1a 48 1a 46 19 44 1a 43 1a 41 33 43 19 44 1a 46 1a 48 19 4a 1a 4b 1a 4d 33 4b 19 4a 1a 48 1a 46 19 48 1a 4a 1a 4b 33 4f 19 4d 1a 4b 1a 4a 19 48 1a 46 1a 48 33 4a 19 4b 1a 4a 1a 48 19 46 1a 44 1a 43 33 44 19 46 1a 48 1a 46 19 44 1a 43 1a 41 33 43 19 44 1a 46 1a 48 19 4a 1a 4b 1a 4d 33 4b 19 4a 1a 48 1a 46 19 48 1a 4a 1a 4b 33 4f 19 4d 1a 4b 1a 4a 19 48 1a 46 1a 48 33 4a 19 4b 1a 4a 1a 48 19 46 1a 44 1a 43 33 44 19 46 1a 48 1a 46 19 44 1a 43 1a 41 33 43 19 44 1a 46 1a 48 19 4a 1a 4b 1a 4d 33`
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
                let note = events[i]
                let ms = events[i + 1] * 10
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
