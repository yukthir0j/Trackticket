 Step 1️⃣: Completely Remove Corrupted Gradle Files
Deletes all Gradle caches and builds to ensure a fresh setup

# rm -rf ~/.gradle/caches  # Remove Gradle cache
# rm -rf ~/.gradle/wrapper  # Remove Gradle wrapper
# rm -rf android/.gradle  # Remove Android-specific Gradle files
# rm -rf android/app/build  # Remove the app's build directory
# rm -rf android/build  # Remove the overall build directory

Step 2️⃣: Delete and Reinstall Node Modules
Ensures all dependencies are installed cleanly

# rm -rf node_modules  # Remove all installed node modules
# rm -rf package-lock.json  # Remove package lock to avoid conflicts
npm install  # Reinstall all dependencies

# Step 3️⃣: Reinstall Gradle & Dependencies
# Refreshes Gradle dependencies and ensures a clean build
cd android
./gradlew --stop  # Stop any running Gradle daemons
./gradlew --refresh-dependencies  # Refresh all dependencies
./gradlew clean  # Clean the Gradle build
cd ..

# npx react-native start --reset-cache

