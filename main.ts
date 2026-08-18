/**
 * Raw PCM playback for micro:bit V2.
 * Input format: mono, unsigned 8-bit PCM. 128 = silence.
 */
//% block="Bad Apple Audio"
//% weight=100 color=#7b1fa2 icon="\uf028"
namespace badappleAudio {
    //% block="play PCM $samples at $sampleRate Hz"
    //% sampleRate.min=1000 sampleRate.max=22050 sampleRate.defl=4000
    //% group="micro:bit V2"
    export function playPCM(samples: Buffer, sampleRate: number): void {
        playPCMShim(samples, sampleRate)
    }

    //% block="PCM is playing"
    //% group="micro:bit V2"
    export function isPlaying(): boolean { return isPlayingShim() }

    //% block="stop PCM"
    //% group="micro:bit V2"
    export function stop(): void { stopShim() }

    //% block="play PCM test tone"
    //% group="micro:bit V2"
    export function playTestTone(): void {
        const rate = 4000
        const b = pins.createBuffer(rate)
        for (let i = 0; i < b.length; i++) {
            const phase = (i * 440) % rate
            b[i] = phase < rate / 2 ? 224 : 32
        }
        playPCMShim(b, rate)
    }

    //% shim=badappleAudio::playPCMShim
    function playPCMShim(samples: Buffer, sampleRate: number): void {
        console.log("PCM playback is available on physical micro:bit V2 hardware")
    }
    //% shim=badappleAudio::isPlayingShim
    function isPlayingShim(): boolean { return false }
    //% shim=badappleAudio::stopShim
    function stopShim(): void {}
}
