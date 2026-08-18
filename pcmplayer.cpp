#include "pcmplayer.h"

namespace badappleAudio {

PCMPlayer::PCMPlayer() : source(NULL), channel(NULL), currentBuffer(), currentRate(0) {
}

void PCMPlayer::init(int sampleRate) {
    if (sampleRate < 1000) sampleRate = 1000;
    if (sampleRate > 22050) sampleRate = 22050;

    // This is the same high-level CODAL route used by the proven Billy
    // MakeCode C++ extension: activate audio, attach a MemorySource to the
    // micro:bit V2 mixer, then stream unsigned 8-bit samples into it.
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

    // Copy the MakeCode Buffer into a CODAL ManagedBuffer. Keeping this as a
    // member guarantees the bytes remain alive for the entire async playout.
    currentBuffer = ManagedBuffer((uint8_t *) data, length);
    source->playAsync(currentBuffer, 1);
}

bool PCMPlayer::isPlaying() {
    uBit.audio.requestActivation();
    return uBit.audio.isPlaying();
}

void PCMPlayer::stop() {
    // CODAL MemorySource has no public cancel method. Disabling the audio
    // pipeline is the reliable way to stop current output; the next play()
    // call requests activation again.
    uBit.audio.disable();
}

}
