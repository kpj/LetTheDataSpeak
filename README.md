# Let The Data Speak

Code and idea repository for the final project. Have some fun here: http://kpj.github.io/LetTheDataSpeak/frontend/.

## Story

Compare the sound of intergenic regions and open reading frames.

## Misc
* Add big option-pane which allows the user to adjust *everything*.
* Special formatting class which allows to format the DNA strand (e.g. look for ORFs).

## Frontend

### Languages

* html
* css
 * bootstrap
* javascript
* requires (any) static webserver to run

### Idea

Everyone can upload data and listen to awesome tunes! A possibility to modify parameters (e.g. factors for pace/volume/...) will be provided.

## Backend

### Languages

* javascript

### Idea

Sonification of DNA:

* Base codons will map to notes (similar to the codon sun)
* Search for ORFs, use different style inside/outside of ORF
* Determine additional information about smaller intervals
  * tetranucleotide frequency -> pace
  * mutual information of current codon -> volume

### Libraries

#### Music Generation
* pure wave modification: http://mohayonao.github.io/timbre.js
* musical instruments: https://github.com/mudcube/MIDI.js (https://github.com/gleitz/midi-js-soundfonts)
* midi ids: https://en.wikipedia.org/wiki/General_MIDI#Program_change_events

#### DNA Processing
* self written utils
