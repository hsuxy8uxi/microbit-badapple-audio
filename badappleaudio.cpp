#include "pxt.h"
#include "MicroBitAudio.h"
#include "SampleSource.h"

using namespace pxt;
using namespace codal;

namespace badappleAudio {
    static ManagedBuffer pcm;
    static bool playing = false;

    static SampleSource *source() {
        MicroBitAudio::requestActivation();
        if (!MicroBitAudio::instance)
            return NULL;
        return MicroBitAudio::instance->sampleSource[0];
    }

    //% shim=badappleAudio::playPCM
    void playPCM(Buffer samples, int sampleRate) {
        if (!samples || samples->length <= 0)
            return;
        if (sampleRate < 1000) sampleRate = 1000;
        if (sampleRate > 22050) sampleRate = 22050;

        SampleSource *s = source();
        if (!s)
            return;

        // Keep a native managed copy alive after returning to MakeCode.
        pcm = ManagedBuffer(samples->data, samples->length);

        // Standard unsigned 8-bit PCM: 128 is silence.
        s->setFormat(DATASTREAM_FORMAT_8BIT_UNSIGNED);
        s->setSampleRate((float)sampleRate);
        s->setVolume(1.0f);

        MicroBitAudio::instance->setSpeakerEnabled(true);
        playing = true;

        // CODAL MemorySource -> SampleSource -> Mixer2 -> NRF52PWM -> speaker.
        // Async playback leaves the MakeCode fiber free for OLED rendering.
        s->playAsync(pcm, 1);
    }

    //% shim=badappleAudio::stop
    void stop() {
        // MemorySource does not expose a public cancel method. A subsequent
        // playPCM replaces its pending playout; this flag controls our API.
        playing = false;
    }

    //% shim=badappleAudio::isPlaying
    bool isPlaying() {
        if (!playing || !MicroBitAudio::instance)
            return false;
        bool active = MicroBitAudio::instance->isPlaying();
        if (!active)
            playing = false;
        return active;
    }
}
