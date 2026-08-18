#include "pxt.h"
#include "MicroBit.h"

#if MICROBIT_CODAL
#include "SampleSource.h"
#endif

using namespace pxt;

namespace badappleAudio {
    //% shim=badappleAudio::playPCMNative
    void playPCMNative(Buffer buf, int sampleRate) {
#if MICROBIT_CODAL
        if (!buf || buf->length <= 0) return;
        uBit.audio.enable();
        uBit.audio.setSpeakerEnabled(true);
        uBit.audio.sampleSource[0]->setSampleRate(sampleRate);
        uBit.audio.sampleSource[0]->playAsync(buf->data, buf->length);
#else
        target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
    }
}
