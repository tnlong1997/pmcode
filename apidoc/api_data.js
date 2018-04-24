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
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Status indicator.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Status code.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status description.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\tsuccess: true,\n\tcode: 200,\n\tstatus: \"Welcome to primor.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Status indicator.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Status code.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status description.</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "err",
            "description": "<p>Error objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tsuccess: false,\n\tcode: 400,\n\tstatus: \"Unable to get the index pages\",\n\terr: {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "pmserver/routes/index.js",
    "groupTitle": "IndexPages"
  },
  {
    "type": "post",
    "url": "/items",
    "title": "Create new Item.",
    "version": "0.1.0",
    "name": "CreateItem",
    "group": "Item",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Create new Item.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "item_name",
            "description": "<p>Name of the item.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "item_description",
            "description": "<p>Description of the item.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "item_price",
            "description": "<p>Price of the item.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Status indicator.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Status code.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status description.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\tsuccess: true,\n\tcode: 200,\n\tstatus: \"Item list received.\"\n}",
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
            "field": "DatabaseError",
            "description": "<p>Error with database.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RequiredFieldMissing",
            "description": "<p>Required to fill all fields.</p>"
          }
        ]
      }
    },
    "filename": "pmserver/routes/items.js",
    "groupTitle": "Item"
  },
  {
    "type": "get",
    "url": "/items",
    "title": "Get the list of all item.",
    "version": "0.1.0",
    "name": "GetItemList",
    "group": "Item",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>This will return the list of all items and can only be accessed by admin</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Status indicator.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Status code.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status description.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "items",
            "description": "<p>List of items.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\t\tHTTP/1.1 200 OK\n\t\t{\n\t\t\tsuccess: true,\n\t\t\tcode: 200,\n\t\t\tstatus: \"Item list received.\",\n\t\t\titems: {\n\t\t\t\t\t\"_id\": \"5adaa1a33ab44a3d18f41bd9\",\n            \t\t\"item_name\": \"New Item\",\n            \t\t\"item_description\": \"check\",\n            \t\t\"item_price\": 40\n\t\t\t\t\t}\n\t\t}",
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
            "field": "DatabaseError",
            "description": "<p>Unable to access to database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\tsuccess: false,\n\tcode: 400,\n\tstatus: \"Unable to access to database\",\n\terr: DatabaseError\n}",
          "type": "json"
        }
      ]
    },
    "filename": "pmserver/routes/items.js",
    "groupTitle": "Item"
  }
] });
