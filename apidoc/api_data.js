define({ "api": [
	{
		"type": "get",
		"url": "/",
		"title": "Get the index page",
		"version": "0.1.0",
		"name": "GetIndex",
		"group": "IndexPages",
		"success": {
			"fields": {
				"Success 200": [
					{
						"group": "Success 200",
						"type": "String",
						"optional": false,
						"field": "status",
						"description": "<p>Welcome to Primor.</p>"
					}
				]
			},
			"examples": [
				{
					"title": "Success-Response:",
					"content": "HTTP/1.1 200 OK\n{\n  \"status\": \"Welcome to Primor.\"\n}",
					"type": "json"
				}
			]
		},
		"error": {
			"fields": {
				"Error 4xx": [
					{
						"group": "Error 4xx",
						"optional": false,
						"field": "GetError",
						"description": "<p>Unable to get the index pages</p>"
					}
				]
			},
			"examples": [
				{
					"title": "Error-Response:",
					"content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"GetError\"\n}",
					"type": "json"
				}
			]
		},
		"filename": "pmserver/routes/index.js",
		"groupTitle": "IndexPages"
	}
] });
