// utils/playSound.js
import { Audio } from "expo-av";

let soundObject = null;

export async function reproducirSonido() {
  try {
    if (soundObject) {
      await soundObject.stopAsync();
      await soundObject.unloadAsync();
      soundObject = null;
    }

    const { sound } = await Audio.Sound.createAsync(
      require("../assets/calm.mp3"),
      { shouldPlay: true, isLooping: true } 
    );

    soundObject = sound;
  } catch (error) {
    console.log("Error al reproducir sonido:", error);
  }
}

export async function detenerSonido() {
  try {
    if (soundObject) {
      await soundObject.stopAsync();
      await soundObject.unloadAsync();
      soundObject = null;
    }
  } catch (error) {
    console.log("Error al detener sonido:", error);
  }
}
