#include "pxt.h"
#include "pcmplayer.h"

namespace badappleAudio {

PCMPlayer player;

/** Play unsigned 8-bit PCM asynchronously on the V2 audio mixer. */
//%
void playPCMShim(Buffer samples, int sampleRate) {
    if (!samples || samples->length <= 0)
        return;
    player.play(samples->data, samples->length, sampleRate);
}

/** Return true while the V2 audio pipeline is producing audio. */
//%
bool isPlayingShim() {
    return player.isPlaying();
}

/** Stop the audio pipeline. */
//%
void stopShim() {
    player.stop();
}

}
