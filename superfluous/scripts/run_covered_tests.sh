UNIT_TESTS=`find components/ ./core/ ./app/ -path "*/test/*.js"` 
CONTROLLER_TESTS=`find app/controllers/ -path "*/test/*.js"`
COMPONENT_TESTS=`find components/ -name "test.js" | grep -v template`

mocha --require blanket $CONTROLLER_TESTS $COMPONENT_TESTS $UNIT_TESTS -R html-cov --exit > app/static/coverage.html
