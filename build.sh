echo "Deleting build folder"
rm -rf build
echo "Building typescript dependencies"
npm run rebuild
echo "Building"
npm run dist
