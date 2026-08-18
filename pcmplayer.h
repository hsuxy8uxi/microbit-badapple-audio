#ifndef BADAPPLE_PCMPLAYER_H
#define BADAPPLE_PCMPLAYER_H

#include "MicroBit.h"
#include "MicroBitConfig.h"
#include "MemorySource.h"
#include "Mixer2.h"

namespace badappleAudio {

class PCMPlayer {
    MemorySource *source;
    MixerChannel *channel;
    ManagedBuffer currentBuffer;
    int currentRate;

public:
    PCMPlayer();
    void init(int sampleRate);
    void play(const uint8_t *data, int length, int sampleRate);
    bool isPlaying();
    void stop();
};

}

#endif
