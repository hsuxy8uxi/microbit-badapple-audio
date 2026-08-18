/** Raw PCM playback for micro:bit V2. */
//% block="Bad Apple Audio" weight=100 color=#7b1fa2 icon="\uf028"
namespace badappleAudio {
    //% block="play PCM $samples at $sampleRate Hz"
    export function playPCM(samples: Buffer, sampleRate: number): void {
        playPCMShim(samples, sampleRate)
    }

    // The packed Bad Apple waveform now lives entirely in native C++ flash.
    // No giant MakeCode Buffer is constructed when the program starts.
    //% block="play Bad Apple first 15 seconds"
    export function playBadApple15s(): void {
        playBadApple15sShim()
    }

    //% block="play PCM test tone"
    export function playTestTone(): void {
        const rate = 4000
        const b = pins.createBuffer(rate)
        for (let i = 0; i < b.length; i++)
            b[i] = ((i * 440) % rate) < rate / 2 ? 224 : 32
        playPCMShim(b, rate)
    }

    //% block="PCM is playing"
    export function isPlaying(): boolean { return isPlayingShim() }
    //% block="stop PCM"
    export function stop(): void { stopShim() }

    //% shim=badappleAudio::playPCMShim
    function playPCMShim(samples: Buffer, sampleRate: number): void {}
    //% shim=badappleAudio::playBadApple15sShim
    function playBadApple15sShim(): void {}
    //% shim=badappleAudio::isPlayingShim
    function isPlayingShim(): boolean { return false }
    //% shim=badappleAudio::stopShim
    function stopShim(): void {}
}
