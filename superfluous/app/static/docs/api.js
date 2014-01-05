YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "auth (server)",
        "bootloader (client)",
        "bridge (server)",
        "component (client)",
        "component (server)",
        "config (server)",
        "context (server)",
        "controller (client)",
        "controller (server)",
        "db (server)",
        "packager (server)",
        "page (server)",
        "readfile (server)",
        "router (server)",
        "routes (server)",
        "template (server)"
    ],
    "modules": [
        "Client",
        "Server",
        "Superfluous"
    ],
    "allModules": [
        {
            "displayName": "Client",
            "name": "Client",
            "description": "The core Client module contains code related to page delivery, asset\nmanagement, socket setup and controller management."
        },
        {
            "displayName": "Server",
            "name": "Server",
            "description": "The core Server module in superfluous contains code related to routing,\n authentication, page generation, template rendering and input handling."
        },
        {
            "displayName": "Superfluous",
            "name": "Superfluous"
        }
    ]
} };
});