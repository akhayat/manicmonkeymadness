# Introduction #

In m3, the sound effects are all created using the new HTML5 `<audio>` tag.  No flash! (It only works in browsers that support the audio tag, of course, i.e. any _real_ browser).

This wiki tells a little bit about how sound is done in our project, and, more importantly, how to add and reference your own sound effects and music in the code.

# How Sound Is Created in M3 #

Instead of flooding our index.html file with a lot of `<audio>` <src=... I created the audio tags dynamically with jQuery, which is essentially the same concept. Originally I used the javascript Audio object, but cross-browser compatibility is annoying when canPlayType returns either "probably", "maybe", or "".

# How to Add A Sound to M3 #

Like images, sounds are added in assets.js, through a hidden method that takes a path to the source and a boolean that tells it whether to loop or not.  You can call it like this:

` monkeys: soundFromSource("music/monkeys", true)`

The file extension should either be .ogg, or .mp3.  If you want the sound to be able to play in all major browsers, you should include both the .ogg and .mp3 file in the audio/effects and audio/music directories. _Don't include the file extension in the string containing the source, though.  The soundFromSource method automatically adds the .ogg or .mp3 extension, depending on the browser.  For example, I committed a monkeys.ogg AND a monkeys.mp3 to the audio/music directory. So in the code above, it creates an audio tag with two sources, the .ogg and the .mp3.  If the browser can't play the ogg, it will play the mp3 instead (or nothing if it can't play either)._

**CAREFUL  If you type the extension incorrectly or the source file doesn't exist, there won't be any errors in the console, the sound simply won't play.**

# Referencing a Sound #

soundFromSource actually returns a wrapper around an javscript audio file so that I could add an extra method called toggle(), which does exactly what you'd think--plays the sound if its paused or vice versa.  In addition, it still has the same play() and pause() functions.  An example call might be

`m3.assets.sfx.monkeyGrunt.play();`

# Sound Module #

I also added a module that has two methods for sound: toggleSound and soundOn.  The first one toggles ALL sound, effects as well as music.  The second returns true if the sound is currently on or false if not.

For music, instead of trying to find out what song is currently playing, pausing it, and playing your own song, you easily do this in one line with m3.sound.changeMusic.  This method pauses the old song, stores the current song, and plays it if true is passed in.  For example, when the main menu state is loaded, I want the current song to be monkeys:

`m3.sound.changeMusic(m3.assets.music.monkeys, true);`

Then, when the first shot is taken:

```
if(!this.first) {
    m3.sound.changeMusic(m3.assets.music.rideTheLightning, true);
    this.first = true;
} 
```

**It is better to use changeMusic then to just use m3.assets.music.your\_song.play(), since changeMusic only keeps track of the song it was passed.** If you use m3.assets.music.your\_song.play(), you will have to worry out playing and pausing it yourself, as well as pausing whatever song is currently playing.

If you want to just play or pause the current song and not change it, use playMusic and pauseMusic.

Lastly, toggleMusic acts as a master switch for all music.  As long as the music is off, it won't play at all.