echo "Deleting release folder"
rm -rf build/release
echo "Building"
echo "Linux"
npm run dist:linux
echo "Windows"
npm run dist:win
