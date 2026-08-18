#include "pxt.h"
#include "pcmplayer.h"

namespace badappleAudio {

PCMPlayer::PCMPlayer() : source(NULL), channel(NULL), currentBuffer(), currentRate(0) {
}

void PCMPlayer::init(int sampleRate) {
    if (sampleRate < 1000) sampleRate = 1000;
    if (sampleRate > 22050) sampleRate = 22050;

    // Same CODAL route used by the proven Billy MakeCode native extension:
    // activate audio, attach a MemorySource to the mixer, then stream u8 PCM.
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
    if (data == NULL || length <= 0)
        return;

    init(sampleRate);
    if (source == NULL)
        return;

    // ManagedBuffer copies the MakeCode bytes and keeps them alive while the
    // async MemorySource is still reading them.
    currentBuffer = ManagedBuffer((uint8_t *) data, length);
    source->playAsync(currentBuffer, 1);
}

bool PCMPlayer::isPlaying() {
    uBit.audio.requestActivation();
    return uBit.audio.isPlaying();
}

void PCMPlayer::stop() {
    uBit.audio.disable();
}

}
