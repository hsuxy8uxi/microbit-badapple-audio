//% color=#7b1fa2 icon="\uf028" block="Bad Apple Audio"
namespace badappleAudio {
    /**
     * Starts native playback of unsigned 8-bit PCM samples.
     * The native implementation runs independently of the MakeCode video loop.
     */
    //% shim=badappleAudio::playPCM
    //% block="play PCM $samples at $sampleRate Hz"
    export function playPCM(samples: Buffer, sampleRate: number): void {
        // Simulator fallback only. Hardware uses the C++ shim.
    }

    /** Stop audio playback. */
    //% shim=badappleAudio::stop
    //% block="stop PCM"
    export function stop(): void {
    }

    /** Returns true while the native player is active. */
    //% shim=badappleAudio::isPlaying
    //% block="PCM is playing"
    export function isPlaying(): boolean {
        return false
    }
}
