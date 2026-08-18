/**
 * Raw PCM playback for micro:bit V2.
 * Input format: mono, unsigned 8-bit PCM. 128 = silence.
 */
//% block="Bad Apple Audio"
//% weight=100 color=#7b1fa2 icon="\uf028"
namespace badappleAudio {
    /**
     * Play an unsigned 8-bit mono PCM buffer in the background.
     * @param samples PCM bytes, where 128 is zero/silence
     * @param sampleRate samples per second, e.g. 4000 or 8000
     */
    //% block="play PCM $samples at $sampleRate Hz"
    //% sampleRate.min=1000 sampleRate.max=22050 sampleRate.defl=4000
    //% group="micro:bit V2"
    export function playPCM(samples: Buffer, sampleRate: number): void {
        playPCMShim(samples, sampleRate)
    }

    /** True while the micro:bit audio pipeline is playing. */
    //% block="PCM is playing"
    //% group="micro:bit V2"
    export function isPlaying(): boolean {
        return isPlayingShim()
    }

    /** Stop current PCM output. */
    //% block="stop PCM"
    //% group="micro:bit V2"
    export function stop(): void {
        stopShim()
    }

    /**
     * Play an unmistakable one-second 440 Hz test tone as generated PCM.
     * This verifies the native PCM bridge without needing an external file.
     */
    //% block="play PCM test tone"
    //% group="micro:bit V2"
    export function playTestTone(): void {
        const rate = 4000
        const b = pins.createBuffer(rate)
        // Square-wave PCM centered on 128. 440 Hz at 4000 samples/sec.
        for (let i = 0; i < b.length; i++) {
            const phase = (i * 440) % rate
            b[i] = phase < rate / 2 ? 224 : 32
        }
        playPCMShim(b, rate)
    }

    // Hardware implementations are provided by shim.cpp. These bodies run
    // only in the simulator.
    //% shim=badappleAudio::playPCMShim
    function playPCMShim(samples: Buffer, sampleRate: number): void {
        console.log("PCM playback is available on physical micro:bit V2 hardware")
    }

    //% shim=badappleAudio::isPlayingShim
    function isPlayingShim(): boolean {
        return false
    }

    //% shim=badappleAudio::stopShim
    function stopShim(): void {
    }
}
