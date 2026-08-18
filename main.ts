// Bad Apple Audio
// Thin wrapper around Microsoft's built-in micro:bit V2 audio-samples package.

//% color=#7b1fa2 icon="\uf028" block="Bad Apple Audio"
namespace badappleAudio {
    /** Play unsigned 8-bit PCM in the background on the V2 speaker. */
    //% block="play PCM $samples at $sampleRate Hz"
    export function playPCM(samplesBuffer: Buffer, sampleRate: number): void {
        samples.enable()
        samples.setSampleRate(0, sampleRate)
        samples.playAsync(0, samplesBuffer)
    }

    /** Disable sampled audio output. */
    //% block="stop PCM"
    export function stop(): void {
        samples.disable()
    }
}
