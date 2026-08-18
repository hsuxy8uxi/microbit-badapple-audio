// Minimal public MakeCode extension test.
// No native C++, no internal target packages, no audio dependencies.

//% color=#7b1fa2 icon="\uf028" block="Bad Apple Audio"
namespace badappleAudio {
    /** Return a number so we can prove the extension itself compiles. */
    //% block="audio test value"
    export function testValue(): number {
        return 42
    }
}
