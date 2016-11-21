// on ready
$(document).ready(function() {
    ContactUtil.main();
});

// on load
$(window).load(function() {
    Logger.main();
    PageDecorator.main();
});

/* ------ Class PageDecorator ----- */
PageDecorator = {
    properties: {
        "redirectSelector": ".homepage-redirect",
        "navMenuSelector" : ".nav-menu",
        "homepageRedirect": "data-homepage-redirect"
    },

    main: function() {
        PageDecorator.setHPRedirect();
    },

    setHPRedirect: function() {
        var anchorElement = $(PageDecorator.properties["redirectSelector"]);
        if (anchorElement != null) {
            var navMenuElement = $(PageDecorator.properties["navMenuSelector"]);
            if (navMenuElement != null) {
                var redirect = $(navMenuElement).attr(PageDecorator.properties["homepageRedirect"]);
                $(anchorElement).attr("href", redirect);
            }
        }
    }
}

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

/* ------ Class ReCaptchaUtil ----- */
ReCaptchaUtil = {
    options: {
        "containerId"       : "g-recaptcha",
        "containerSelector" : "#g-recaptcha",
        "class"             : "g-recaptcha"
    },

    main: function(reCaptchaSiteKey) {
        ReCaptchaUtil.render(reCaptchaSiteKey);
    },

    // check if a ReCaptcha container exists
    containerExists: function () {
        var exists = false;
        var containerSelector = ReCaptchaUtil.options["containerSelector"];
        var containerClass = ReCaptchaUtil.options["class"];
        if ($(containerSelector) != null && $(containerSelector).hasClass(containerClass)) {
            exists = true;
        }
        return exists;
    },

    // render
    render: function(reCaptchaSiteKey) {
        var captchaWidgetId = null;
        var containerExists = ReCaptchaUtil.containerExists();
        if (containerExists) {
            try {
                captchaWidgetId = grecaptcha.render(ReCaptchaUtil.options["containerId"], {
                    sitekey: reCaptchaSiteKey,
                    callback: function (response) {
                        ReCaptchaUtil.writeResponse(response);
                    }
                });
            } catch (e) {}
        }
        return captchaWidgetId;
    },

    // write the response
    writeResponse: function(response) {
        console.log("g-recaptcha-response: " + response);
    },

    // reset
    reset: function() {
        var containerExists = ReCaptchaUtil.containerExists();
        if (containerExists) {
            try {
                grecaptcha.reset();
            } catch (e) {}
        }
    }
}

/* ------ Class FormUtil ----- */
FormUtil = {
    serialize: function(form) {
        var o = {};
        var a = form.serializeArray();
        $.each(a, function () {
            if (o[form.name]) {
                if (!o[form.name].push) {
                    o[form.name] = [o[form.name]];
                }
                o[form.name].push(form.value || '');
            } else {
                o[form.name] = form.value || '';
            }
        });
        return o;
    }
}

/* ------ Class Logger ----- */
Logger = {
    properties: {
        "ipApiWs"       : "http://ip-api.com/json/",
        "callback"      : "?callback=saveLog",
        "loggerSelector": "#loggerDetails",
        "logSelector"   : "#log",
        "emailSelector" : "#ipSender",
        "logIdAttr"     : "data-log-id",
        "logIpAttr"     : "data-log-ip",
        "logStatusAttr" : "data-log-status",
        "logTypeAttr"   : "data-log-type",
        "logUrlAttr"   : "data-log-url"
    },

    main: function() {
        Logger.getUserDetails();
    },

    // email flip
    getUserDetails: function() {
        var ws = Logger.properties["ipApiWs"];
        var loggerDiv = $(Logger.properties["logSelector"]);
        var logIpAttr = $(loggerDiv).attr(Logger.properties["logIpAttr"]);
        var pageTypeAttr = $(loggerDiv).attr(Logger.properties["logTypeAttr"]);
        console.log("ip: "+logIpAttr+", page type: "+pageTypeAttr);
        // if (logIpAttr != null && logIpAttr != "") {
        if (logIpAttr != null && logIpAttr != "" && logIpAttr != "127.0.0.1") {
            if ($(Logger.properties["logSelector"]) != null) {
                // set the sender ip to email form
                $(Logger.properties["logSelector"]).val(logIpAttr);
            };

            // logIpAttr = "37.123.160.222";
            ws += logIpAttr;

            try {
                $.getJSON(ws, function(data) {
                    Logger.saveLog(data);
                });
            } catch (e) {}
        }
    },

    saveLog: function(data) {
        var loggerDiv = $(Logger.properties["logSelector"]);
        var url = $(loggerDiv).attr(Logger.properties["logUrlAttr"]);
        var log = Logger.properties["logSelector"];
        if (data != null) {
            var pageTypeAttr = $(log).attr(Logger.properties["logTypeAttr"]);
            data.pageType = pageTypeAttr;

            var logIpAttr = $(log).attr(Logger.properties["logIpAttr"]);
            data.logIpAddress = logIpAttr;

            $.ajax({
                url: url,
                data: data,
                success: function(result) {
                    console.log("Success "+result);
                },
                error: function(result) {
                    console.log("Error "+result);
                }
            });
        }
    }
}