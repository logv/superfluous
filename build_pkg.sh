#!/usr/bin/env bash

DEST=dist/
echo "Building superfluous NPM package for publishing in ${DEST}"
sudo rm -fr ${DEST}
mkdir -p ${DEST}

# Figure out the details of the package to upload...
cp superfluous/components/template/ bin/default/components/ -R
cp superfluous/components/button/ bin/default/components/ -R

cp superfluous/package.json ${DEST}
cp superfluous/core ${DEST} -R
cp superfluous/node_modules ${DEST} -R
cp bin/ ${DEST} -R

cd ${DEST}
sudo npm link
