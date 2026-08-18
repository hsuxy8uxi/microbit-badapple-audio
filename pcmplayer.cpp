#include "pxt.h"
#include "pcmplayer.h"

namespace badappleAudio {

PCMPlayer::PCMPlayer() : source(NULL), channel(NULL), currentBuffer(), currentRate(0) {}

void PCMPlayer::init(int sampleRate) {
    if (sampleRate < 1000) sampleRate = 1000;
    if (sampleRate > 22050) sampleRate = 22050;

    uBit.audio.requestActivation();
    uBit.audio.setSpeakerEnabled(true);

    if (source == NULL) {
        source = new MemorySource();
        source->setFormat(DATASTREAM_FORMAT_8BIT_UNSIGNED);
        source->setBufferSize(512);
        channel = uBit.audio.mixer.addChannel(*source, sampleRate, 255);
        currentRate = sampleRate;
    } else if (channel != NULL && sampleRate != currentRate) {
        channel->setSampleRate(sampleRate);
        currentRate = sampleRate;
    }
}

void PCMPlayer::play(const uint8_t *data, int length, int sampleRate) {
    if (data == NULL || length <= 0) return;
    init(sampleRate);
    if (source == NULL) return;

    // Keep exactly one owned buffer at a time. play() is blocking, so CODAL
    // finishes consuming this buffer before it can be replaced by the caller.
    currentBuffer = ManagedBuffer((uint8_t *)data, length);
    source->play(currentBuffer, 1);
}

bool PCMPlayer::isPlaying() {
    uBit.audio.requestActivation();
    return uBit.audio.isPlaying();
}

void PCMPlayer::stop() {
    uBit.audio.disable();
}

}
