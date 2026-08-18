//% color=#7b1fa2 icon="\uf028" block="Bad Apple Audio"
namespace badappleAudio {
    // Native implementation is in badappleaudio.cpp.
    //% shim=badappleAudio::playPCMNative
    function playPCMNative(buf: Buffer, sampleRate: number): void {
        // simulator fallback only
    }

    /** Play unsigned 8-bit mono PCM asynchronously on micro:bit V2. */
    //% block="play PCM $buf at $sampleRate Hz"
    export function playPCM(buf: Buffer, sampleRate: number): void {
        playPCMNative(buf, sampleRate)
    }

    /** Tiny generated waveform used only to prove native audio playback. */
    //% block="play audio engine test"
    export function playEngineTest(): void {
        const b = hex`80 98 ad bb c0 bb ad 98 80 68 53 45 40 45 53 68 80 98 ad bb c0 bb ad 98 80 68 53 45 40 45 53 68`
        playPCMNative(b, 4000)
    }
}
