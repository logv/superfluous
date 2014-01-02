all: package

test_coverage:
	cd superfluous; rm node_modules/superfluous || true
	cd superfluous; npm install
	cd superfluous; ln -s ../ node_modules/superfluous || true
	cd superfluous; bash scripts/run_covered_tests.sh || true
	cd superfluous; rm node_modules/superfluous || true
test:
	cd superfluous; rm node_modules/superfluous || true
	cd superfluous; npm install
	cd superfluous; ln -s ../ node_modules/superfluous || true
	cd superfluous; npm test
	cd superfluous; rm node_modules/superfluous || true

public:
	bash publish_pkg.sh

package:
	bash build_pkg.sh

unlink:
	sudo rm /usr/bin/superfluous /usr/lib/node_modules/superfluous

clean:
	rm -rf dist/
