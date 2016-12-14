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
                var hp = $(navMenuElement).attr(PageDecorator.properties["homepageRedirect"]);
                $(PageDecorator.properties["redirectSelector"]).each(function(i, obj) {
                    var hrefOriginal = $(obj).attr("href");
                    var redirect = hp + hrefOriginal;
                    $(obj).attr("href", redirect);
                });
            }
        }
    },

    highlight: function(element) {
        if (element != null) {
            var opacity = 100;
            var color = "0, 255, 0" // lime rgba
            var interval = setInterval(function() {
                opacity -= 3;
                if (opacity <= 0) clearInterval(interval);
                $(element).css({background: "rgba("+color+", "+opacity/100+")"});
            }, 150);
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

/* ------ Class RequestUtil ----- */
RequestUtil = {
    getUrlParameter: function(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
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
        "logIspAttr"    : "data-log-isp",
        "logUrlAttr"    : "data-log-url",
        // "ispHook"       : "nav#primary-navigation div.nav-menu ul",
        "ispHook"       : "nav#primary-navigation div.nav-menu ul li#blogli",
        "ispParameter"  : "isp"
    },

    main: function() {
        Logger.getUserDetails();
    },

    // email flip
    getUserDetails: function() {
        var ws = Logger.properties["ipApiWs"];
        var loggerDiv = $(Logger.properties["logSelector"]);
        var logIpAttr = $(loggerDiv).attr(Logger.properties["logIpAttr"]);
        var logIspAttr = $(loggerDiv).attr(Logger.properties["logIspAttr"]);
        var pageTypeAttr = $(loggerDiv).attr(Logger.properties["logTypeAttr"]);
        console.log("ip: "+logIpAttr+", page type: "+pageTypeAttr);

        // spotify checker
        var ispParameter = RequestUtil.getUrlParameter(Logger.properties["ispParameter"]);
        if (ispParameter != null && ispParameter == "spotify") {
            logIpAttr = "194.14.177.0";
        }

        if (logIpAttr != null && logIpAttr != "" && logIpAttr != "127.0.0.1") {
            if ($(Logger.properties["logSelector"]) != null) {
                // set the sender ip to email form
                $(Logger.properties["logSelector"]).val(logIpAttr);
            };
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
            var isp = data.isp;
            var as = data.as;

            $.ajax({
                url: url,
                data: data,
                success: function(result) {
                    console.log("Success "+result);
                    Logger.checkIsp(isp, as);
                },
                error: function(result) {
                    console.log("Error "+result);
                }
            });
        }
    },

    checkIsp: function(isp, as) {
        var loggerDiv = $(Logger.properties["logSelector"]);
        var ispHook = Logger.properties["ispHook"];
        try {
            var valueCheckeable = false;
            if ((isp != null && isp != "") && (as != null && as != "")) {
                var ispLower = isp.toLowerCase();
                var asLower = as.toLowerCase();
                if ((ispLower.indexOf("spotify") !== -1) || asLower.indexOf("spotify") !== -1) {
                    valueCheckeable = true;
                }
            }

            if ($(ispHook) != null && valueCheckeable) {
                var htmlElement = '<li id="spotify"><a id="highlightElement" href="http://www.danieleautizi.com/blog/it/social_network_rest_api_comparison-1.html" '+
                    'title="No worries, I just check your ISP. Click and try how I consume your Web API">' +
                    '<i class="spotify"></i>Welcome Spotify Employee!</a></li>';

                var htmlReplace = '<a id="highlightElement" href="http://www.danieleautizi.com/blog/it/social_network_rest_api_comparison-1.html" '+
                'title="No worries, I just check your ISP. Click and try how I consume your Web API">' +
                '<i class="spotify"></i>Welcome Spotify Employee!</a>';

                // $(ispHook).append(htmlElement);
                $(ispHook).replaceWith(htmlReplace);

                // highlight
                var highlightElementselector = "#highlightElement";
                // apply the tooltip
                $(highlightElementselector).tooltip(); 
                PageDecorator.highlight($(highlightElementselector));
            }
        } catch(e) {console.log("Error: "+e)}
    }
}