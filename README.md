/**\*** ENVIRONMENT INSTALLATION PROCEDURES **\***\

# npm req

npm install @react-navigation/native @react-navigation/native-stack

# npm req

npm install react-native-gesture-handler react-native-safe-area-context react-native-screens

# npm req

npm install react-native-linear-gradient

# npm req

npm install react-native-sound

# npm req

npm install react-native-async-storage/async-storage

# npm

npm start -- --reset-cache

# CLI

npx react-native start --reset-cache

// For better termination of audio state insert this into android MainApplication java file (keep this as a reference)

override fun onCreate() {
super.onCreate()

    reactHost.reactInstanceManager?.addReactInstanceEventListener(object : ReactInstanceManager.ReactInstanceEventListener {
      override fun onHostResume() {}
      override fun onHostPause() {}
      override fun onHostDestroy() {
        try {
          val audioManager = getSystemService(Context.AUDIO_SERVICE) as AudioManager
          audioManager.mode = AudioManager.MODE_NORMAL
        } catch (e: Exception) {
          android.media.AudioManager::class.java.getMethod("stopAllSounds").invoke(null)
        }
      }
    })



    loadReactNative(this)

}
