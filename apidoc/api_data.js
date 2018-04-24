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
    "type": "get",
    "url": "/public",
    "title": "Get the public route page",
    "version": "0.1.0",
    "name": "GetPublicIndex",
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
          "content": "HTTP/1.1 200 OK\n{\n\tsuccess: true,\n\tcode: 200,\n\tstatus: \"Welcome to primor public routes\"\n}",
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
          "content": "HTTP/1.1 400 Bad Request\n{\n\tsuccess: false,\n\tcode: 400,\n\tstatus: \"Unable to get the public index pages\",\n\terr: {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "pmserver/routes/public.js",
    "groupTitle": "IndexPages"
  },
  {
    "type": "post",
    "url": "/items",
    "title": "Create new Item",
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
    "type": "delete",
    "url": "/items/:id",
    "title": "Delete an Item",
    "version": "0.1.0",
    "name": "DeleteItem",
    "group": "Item",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>Delete an Item.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Item ID.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n\tsuccess: true,\n\tcode: 200,\n\tstatus: \"Successfully delete this item.\"\n}",
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
            "field": "ItemNotFound",
            "description": "<p>Cannot find item by ID.</p>"
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
    "title": "Get the list of all item",
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
  },
  {
    "type": "put",
    "url": "/items/:id",
    "title": "Update an Item",
    "version": "0.1.0",
    "name": "UpdateItem",
    "group": "Item",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Update an Item.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Item ID.</p>"
          },
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
          "content": "HTTP/1.1 200 OK\n{\n\tsuccess: true,\n\tcode: 200,\n\tstatus: \"Item update successful.\"\n}",
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
            "field": "ItemNotFound",
            "description": "<p>Cannot find item by ID.</p>"
          }
        ]
      }
    },
    "filename": "pmserver/routes/items.js",
    "groupTitle": "Item"
  },
  {
    "type": "post",
    "url": "/orders",
    "title": "Create new order",
    "version": "0.1.0",
    "name": "CreateOrder",
    "group": "Order",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Create new order.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "order_name",
            "description": "<p>Name of the order.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "traveler_fee",
            "description": "<p>Minimum fee for shipping (User's input)</p>"
          },
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
          "content": "HTTP/1.1 200 OK\n{\n\tsuccess: true,\n\tcode: 200,\n\tstatus: \"Order and Item Created.\"\n}",
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
    "filename": "pmserver/routes/orders.js",
    "groupTitle": "Order"
  },
  {
    "type": "delete",
    "url": "/orders/:id",
    "title": "Delete an Order",
    "version": "0.1.0",
    "name": "DeleteOrder",
    "group": "Order",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Delete an Order.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Order ID.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n\tsuccess: true,\n\tcode: 200,\n\tstatus: \"Successfully delete this order.\"\n}",
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
            "field": "OrderNotFound",
            "description": "<p>Cannot find item by ID.</p>"
          }
        ]
      }
    },
    "filename": "pmserver/routes/orders.js",
    "groupTitle": "Order"
  },
  {
    "type": "get",
    "url": "/orders",
    "title": "Get the list of all order",
    "version": "0.1.0",
    "name": "GetOrderList",
    "group": "Order",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>This will return the list of all order.</p>",
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
            "description": "<p>List of orders.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\t\tHTTP/1.1 200 OK\n\t\t{\n\t\t\tsuccess: true,\n\t\t\tcode: 200,\n\t\t\tstatus: \"Item list received.\",\n\t\t\torders: {\n\t\t\t\t\t\"created_date_time\": \"2018-04-24T18:36:46.138Z\",\n            \t\t\"_id\": \"5adf793e33a7f13becf102be\",\n            \t\t\"order_name\": \"Updated Name Check\",\n            \t\t\"item\": \"5adf793e33a7f13becf102bd\",\n            \t\t\"traveler_fee\": 300,\n            \t\t\"total_fee\": 0\n\t\t\t\t\t}\n\t\t}",
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
    "filename": "pmserver/routes/orders.js",
    "groupTitle": "Order"
  },
  {
    "type": "put",
    "url": "/orders/:id",
    "title": "Update an Order",
    "version": "0.1.0",
    "name": "UpdateOrder",
    "group": "Order",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Update an Order.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Order ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "order_name",
            "description": "<p>Name of the order.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "traveler_fee",
            "description": "<p>Minimum fee for shipping (User's input)</p>"
          },
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
          "content": "HTTP/1.1 200 OK\n{\n\tsuccess: true,\n\tcode: 200,\n\tstatus: \"Order update successful.\"\n}",
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
            "field": "OrderNotFound",
            "description": "<p>Cannot find order by ID.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ItemNotFound",
            "description": "<p>Cannot find item by ID.</p>"
          }
        ]
      }
    },
    "filename": "pmserver/routes/orders.js",
    "groupTitle": "Order"
  }
] });
