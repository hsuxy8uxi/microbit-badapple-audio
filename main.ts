/** Raw PCM playback for micro:bit V2. */
//% block="Bad Apple Audio" weight=100 color=#7b1fa2 icon="\uf028"
namespace badappleAudio {
    // 0:00.000–0:15.000 of the uploaded Bad Apple MP4.
    // 1-bit, 1000 Hz packed waveform; expanded to unsigned 8-bit PCM at runtime.
    const badApple15 = hex`ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff271bc3c3c707f07f01fc03f803fc01ff007fe01ff803fe00ffc01ff007fe01ff803fe01f958fe1ffbd4eaed19f7df77d59671e6ca6db2ce3f870f8e0fc0fe03f80ff00ff803fe00ff803ff007fc01ff803fe00ff807fe00ffc03beea6f39cde647392c6731ce67398ce73398d3987e1e1f1c1f81fc0ff01fe01ff00ffc01ff007fe01ff803ff00ffc03ff00ffe01ff803b9de6733bcee319c67399ce7319ce7319cce2e70bc3c3c703f03f01fc03fc03f9381e1e1e3c1f01f80fe01fe01fd9c4e0e1f1c1f81fc07f01fe01fb8c270f0f0e0fc0fe03f00ff00fcce0787878e07c07e03f807f807fc03fe00ffc03ff007fe01ff803ff00ffc03ff007fc03ffffdefcfeab956a57ffffffff7f7fffffff2d9c6f0f1f1c1f81fc07f01fe01ff007fc01ff807fe00ff803ff007fc01ff003fe01ff807bd9cc67399cdce7359ce739cc67319ce67318b38dc1c3e383f03f80fe03fc03fe00ff803fe00ffc03ff007fe01ff803fe01ffc03ff8077b98ce7739ce6339ce7319ce6319ce6739cccc63387878707e07e01f807f807fc03ff00ffc01ff807fe00ff803fb381c1e3e383f03f80fe03fc03fe00ff803fe00ffc01ff007fe00fb8c770f0f0e0fc0fc07f00ff00ff807fe01ff803fe00ffc03ff007fe00ff807fe00ff807ffdfffdffdb55e96ab6bedefbafefef7fffe9b38fe1e1e1c3f01f80fe01fe01ff00ff803ff00ffc01ff807fe00ff801ff007fc03ff04f7b3d8cf733958ce6b3deef398ce6b39ecf731671fc3c7c707e07f01fc07f807fc01ff007fc01ff803fe00ffc01ff007fe03ff807ff00fe73b9cce73dce6319ce7319ce6339cce73199ce77070f0e0fc0fe03f80ff00fdce0787878f07e07e03f807f807f2703c3c3c703e03f01fc03fc03fb399c1c1e383f03f80fe03fc03f7185e1e1e1c1f81f80fe01fe01ff00ffc03ff007fc01ff803fe00ffc01ff007fc01ff007ffff7fffff56ab55b4dbdb9f7fffffffffffa670fc3c3c783f03f01fc03fc03fe01ff807fe01ff803ff00ffc01ff003fe00ff807ff09eff7b19ce672bb9ed77bcd67319cf67bd9ee76ce3787878e0fc07e03f807f807f803fe00ff803ff007fc01ff803fe00ffc03ff00ffe03dce7319cce7b9ce6339ce7339ce73398ce63359cce0e0f1c1f81fc07f01fe01ff007fc01ff007fe00ff803ff00fe4e0f87878e07c07e03f807f807fc03fe00ffc03ff007fe01ff803fe30dc1c3e383f03f81fe03fc03fe01ff807fe00ffc03ff007fc01ff003fe00ff803ffe0019ffffffffab77ab6bb6b67cfffdffffffbd1c61f87878707e07e03f807f807fc03ff00ffc01ff007fe00ff803ff007fc01ff007fe320a6f77bdecf7773da6f398ce633dcef71bdced9c6f0f0f0e1f80fc07f00ff00ff807fc01ff807fe00ffc03ff007fc01ff807fe01fee7318cf7739dce739ce6339ce6339ce67399ce62b389e1e3e383f03f80fe01fc01f318ce1e1f1c1f81fc07f01fe01fb9c2f0f0f1c0fc0fc07f00ff00fece27878f8e0fc0fe03f807f807de7138387c707e07f01fc07f807fc01ff007fc01ff807fe00ffc03ff007fc01ff007ffe2027dfffff7ab55b7fbf6bfefffb7fffdfff7abcc1f0f0f8e0fc0fc07f00ff00ff807fe01ff803ff00ffc01ff007fe00ff803fe01ffc6014deef3bdce4ee3b4ce7319cc67b9ce63799c738de1e1e1c1f81f80fe01fe01ff00ffc03ff00ffc01ff807fe00ff801ff00ffc01ffc42319eef73b9c6739cc6339ce6339cc67319ccf2713c3c3c787e03f01fc03fc03fc01ff007fe01ff803ff00ffc01f7384e1e1e1c1f81f80fe01fe01ff00ffc03ff007fc01ff803fe00fece37878f8e0fc0fe03f80ff00ff803fe00ff803ff007fc01ff803fe00ff803ff00fffa400bd7cbe63558a55ef7fb7fbddffffc773cbd39c3e0e1f1c1f81fc07f01fe01ff00ffc01ff007fe01ff803ff00ffc01ff007fc03ffce90194ceb2794a8c765bce633986f318cd4639ce31fc3c3c383f03f01fc03fc03fe01ff803fe00ff803ff007fc01ff003fe01ffc03fd0cc6328ce67ffcc6331ee6739cec3318ce7329cc4e1f87878f07c07e03f807f80ff670383c7c707e07f01fc03f803e6309c1c3c383f03f01fe03fc03f7381e1e1e3c1f01f80fe01fe01fd9c0f0f1f1c1f80fc07f00fe01ff007fc01ff807fe01ff803ff007fe01ff807fe01ffb9840972285295232131bdfdfe7bdfffaacc5268b385c1c3e383f03f80fe03fc03fe00ff003fe007f803ff007fe00ff803fe017f803fbcc4cd7f1fab20991c44219ac66511a3ff9bceff1c6178787c707e07e03fc07f807fc03fe007fc03ff807fc01ffc03ff007fc03ff0067b1184e754993d339866819c63b9a8c6739c5d5d239c7f0f0f0e0fc0fc07f00ff00ff807fe01ff803fe0`

    //% block="play PCM $samples at $sampleRate Hz"
    export function playPCM(samples: Buffer, sampleRate: number): void { playPCMShim(samples, sampleRate) }

    //% block="play Bad Apple first 15 seconds"
    export function playBadApple15s(): void {
        const pcm = pins.createBuffer(badApple15.length * 8)
        let o = 0
        for (let i = 0; i < badApple15.length; i++) {
            const x = badApple15[i]
            for (let bit = 7; bit >= 0; bit--) pcm[o++] = ((x >> bit) & 1) ? 224 : 32
        }
        playPCMShim(pcm, 1000)
    }

    //% block="play PCM test tone"
    export function playTestTone(): void {
        const rate = 4000
        const b = pins.createBuffer(rate)
        for (let i = 0; i < b.length; i++) b[i] = ((i * 440) % rate) < rate / 2 ? 224 : 32
        playPCMShim(b, rate)
    }

    //% block="PCM is playing"
    export function isPlaying(): boolean { return isPlayingShim() }
    //% block="stop PCM"
    export function stop(): void { stopShim() }
    //% shim=badappleAudio::playPCMShim
    function playPCMShim(samples: Buffer, sampleRate: number): void {}
    //% shim=badappleAudio::isPlayingShim
    function isPlayingShim(): boolean { return false }
    //% shim=badappleAudio::stopShim
    function stopShim(): void {}
}
