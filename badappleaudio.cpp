#include "pxt.h"
#include "MicroBit.h"

#if MICROBIT_CODAL
#include "SampleSource.h"
#endif

using namespace pxt;

namespace badappleAudio {
    static bool playing = false;

    //% shim=badappleAudio::playPCM
    void playPCM(Buffer samples, int sampleRate) {
#if MICROBIT_CODAL
        if (!samples || samples->length <= 0)
            return;

        if (sampleRate < 1000) sampleRate = 1000;
        if (sampleRate > 22050) sampleRate = 22050;

        // Use the same native route as pxt-microbit's official audio-samples
        // package: uBit.audio.sampleSource[] -> Mixer2 -> PWM -> V2 speaker.
        uBit.audio.enable();
        uBit.audio.setSpeakerEnabled(true);
        uBit.audio.sampleSource[0]->setSampleRate(sampleRate);
        uBit.audio.sampleSource[0]->playAsync(samples->data, samples->length);
        playing = true;
#else
        target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
    }

    //% shim=badappleAudio::stop
    void stop() {
        // CODAL MemorySource has no public cancel operation. This state flag
        // is therefore advisory until the next sample finishes/replaces it.
        playing = false;
    }

    //% shim=badappleAudio::isPlaying
    bool isPlaying() {
#if MICROBIT_CODAL
        if (!playing)
            return false;
        if (!uBit.audio.isPlaying())
            playing = false;
        return playing;
#else
        return false;
#endif
    }
}
