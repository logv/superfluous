all: package

test_coverage:
	cd superfluous; sudo rm app/static/coverage.html || true
	cd superfluous; bash scripts/run_covered_tests.sh || true

test:
	cd superfluous; sudo rm node_modules/superfluous || true
	cd superfluous; npm install
	cd superfluous; ln -s ../ node_modules/superfluous || true
	cd superfluous; npm test
	cd superfluous; sudo rm node_modules/superfluous || true

public:
	bash publish_pkg.sh

package:
	bash build_pkg.sh

unlink:
	sudo rm /usr/bin/superfluous /usr/lib/node_modules/superfluous

clean:
	sudo rm -rf dist/
