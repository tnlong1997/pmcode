# pmcode
Backend for Primor
---------
### API Documentation Command:

* To generate API documentation:
	```
	npm run apidoc
	```

* To deploy API documentation to domain (primor-api.surge.sh):
	```
	npm run apidoc-deploy
	```

### Repo initial setup:

* Require node and npm

* npm setup:
	+ In pmcode dir:
	```
	npm install
	```

	+ In pmserver dir:
	```
	npm install
	```

* Install git pre-push hooks:
	+ In pmcode dir:
	```
	./scripts/install-hooks.bash
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
