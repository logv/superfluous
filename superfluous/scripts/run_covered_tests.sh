UNIT_TESTS=`find components/ ./core/ ./app/ -path "*/test/*.js"` 
CONTROLLER_TESTS=`find app/controllers/ -path "*/test/*.js"`
COMPONENT_TESTS=`find components/ -name "test.js" | grep -v template`

mocha --require blanket $UNIT_TESTS $CONTROLLER_TESTS $COMPONENT_TESTS -R html-cov > app/static/coverage.html
