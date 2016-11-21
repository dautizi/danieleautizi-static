$(document).ready(function() {
    Logger.main();
    ContactUtil.main();
});

/* ------ Class ContactUtil ----- */
ContactUtil = {
    properties: {
        "emailSelector": ".",
        "flipEmail": ".flip-mail"
    },

    main: function() {
        ContactUtil.findAndFlipEmails();
    },

    // email flip
    flipMail: function(element) {
        if ($(element).length) {
            var anchor = $(element);
            var text = anchor.text();
            var ltr = text.split("").reverse().join("");
            var substitution = "mailto:" + ltr;
            anchor.attr("href", substitution);
            anchor.text(ltr);
        }
    },

    // find emails
    findAndFlipEmails: function() {
        var emailSelector = ContactUtil.properties["flipEmail"];
        $(emailSelector).each(
            function() {
                ContactUtil.flipMail($(this));
            }
        );
    }
}

/* ------ Class Logger ----- */
Logger = {
    properties: {
        "ipApiWs"       : "http://ip-api.com/json/",
        "callback"      : "?callback=?",
        "loggerSelector": "#loggerDetails",
        "logIdAttr"     : "data-log-id",
        "logIpAttr"     : "data-log-ip",
        "logStatusAttr" : "data-log-status"
    },

    main: function() {
        Logger.getUserDetails();
    },

    // email flip
    getUserDetails: function() {
        var ws = Logger.properties["ipApiWs"];
        var loggerDiv = $(Logger.properties["loggerSelector"]);
        var logIdAttr = $(loggerDiv).attr(Logger.properties["logIdAttr"]);
        var logIpAttr = $(loggerDiv).attr(Logger.properties["logIpAttr"]);
        var logStatusAttr = $(loggerDiv).attr(Logger.properties["logStatusAttr"]);
        logIpAttr = "37.123.160.222";
        ws += logIpAttr;

        $.getJSON(ws, function(data) {
            $.each(data, function(k, v) {
                console.log("k: " + k + ", v: " + v);
            });
        })
    }

}