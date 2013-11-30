#!/usr/bin/env bash

DEST=dist/
echo "Building superfluous NPM package for publishing in ${DEST}"
rm -fr ${DEST}
mkdir -p ${DEST}
# Figure out the details of the package to upload...
cp superfluous/package.json ${DEST}
cp superfluous/core ${DEST} -R
cp superfluous/core ${DEST} -R
cp superfluous/node_modules ${DEST} -R
cp bin/ ${DEST} -R

cd ${DEST}
sudo npm link
