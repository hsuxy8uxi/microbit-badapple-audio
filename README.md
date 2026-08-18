# microbit-badapple-audio

Experimental MakeCode extension for playing precomputed sampled audio on micro:bit V2 while a TypeScript program drives an OLED.

## Intended API

```typescript
const audio = hex`808182...`
badappleAudio.playPCM(audio, 2000)
```

The TypeScript API and native shim are now in place. The native backend is intentionally marked experimental: `badappleaudio.cpp` still needs its buffer connected to the micro:bit V2 CODAL mixer/SoundOutputPin pipeline before it will produce audio.

This repository is being developed specifically for the Bad Apple OLED + recorded-audio experiment.
