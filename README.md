# pmcode
Backend for Primor
---------
### API Documentation Command:

* To generate API documentation:
	```
	api-doc -i pmserver/ -o api-doc/ -e node_modules/
	```

### In repo command:

* Local overall lint test:\
   in pmcode directory:
	```
	npm run lint
	```

* Local js lint test:\
   in pmcode directory:
	```
	npm run js-lint
	```

* If there is some js lints, auto fix by using:\
   in pmcode directory:
	```
	npm run js-lint-fix
	```

* Local css lint test:\
   in pmcode directory:
	```
	npm run css-lint
	```

* If there is some css lints, auto fix by using:\
   in pmcode directory:
	```
	npm run css-lint-fix
	```

* Local html lint test:\
   in pmcode directory:
	```
	npm run html-lint
	```

* Install git pre-push hook:\
   in pmcode directory:
	```
	./scripts/install-hooks.bash
	```
