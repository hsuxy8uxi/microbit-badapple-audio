#include "pxt.h"

// Experimental native audio shim for micro:bit V2.
// This first revision intentionally uses CODAL's SoundOutputPin rather than
// bit-banging from TypeScript, so playback timing can be handled natively.

using namespace pxt;

namespace badappleAudio {
    static bool playing = false;
    static ManagedBuffer pcm;
    static int rate = 8000;

    //% shim=badappleAudio::playPCM
    void playPCM(Buffer samples, int sampleRate) {
        if (!samples || samples->length <= 0) return;
        if (sampleRate < 1000) sampleRate = 1000;
        if (sampleRate > 22050) sampleRate = 22050;

        pcm = ManagedBuffer(samples->data, samples->length);
        rate = sampleRate;
        playing = true;

        // TODO(native-v2): connect this ManagedBuffer to the CODAL mixer /
        // SoundOutputPin pipeline. Kept behind this shim so the TS/video API
        // will not change while the target-specific backend is refined.
    }

    //% shim=badappleAudio::stop
    void stop() {
        playing = false;
        pcm = ManagedBuffer();
    }

    //% shim=badappleAudio::isPlaying
    bool isPlaying() {
        return playing;
    }
}
