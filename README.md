# microbit-badapple-audio

Native unsigned 8-bit PCM playback for **micro:bit V2** MakeCode projects.

This version intentionally follows the same CODAL audio architecture used by the proven `pxt-billy` MakeCode C++ extension: a `MemorySource` is connected to the micro:bit V2 audio mixer and PCM is queued asynchronously.

## MakeCode API

```typescript
const audio = hex`808182838485...`
badappleAudio.playPCM(audio, 4000)
```

Input format:

- mono
- unsigned 8-bit PCM
- `128` is silence / zero amplitude
- sample rate from 1000 to 22050 Hz

There is also a hardware test that requires no audio file:

```typescript
basic.pause(1000)
badappleAudio.playTestTone()
```

On a physical V2/V2.1 this should produce a one-second 440 Hz PCM square-wave tone through the built-in speaker.

## Why this build is different

The extension is explicitly V2-only (`mbdal` is disabled), includes the same style of C++ shim structure used by established MakeCode native extensions, and keeps a native `ManagedBuffer` copy alive during asynchronous playback.

The eventual Bad Apple pipeline is:

`MP4/WAV -> mono unsigned 8-bit PCM -> compression/storage -> decode chunks -> playPCM()`
