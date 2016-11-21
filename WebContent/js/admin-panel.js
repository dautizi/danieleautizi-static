// on ready
$(document).ready(function() {
    UtilityPanel.main();
});

//on load
$(window).load(function() {
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
        PageDecorator.setMenuRedirect();
    },

    setMenuRedirect: function() {
        var anchorElement = $(PageDecorator.properties["redirectSelector"]);
        if (anchorElement != null) {
            var navMenuElement = $(PageDecorator.properties["navMenuSelector"]);
            var redirect = $(navMenuElement).attr(PageDecorator.properties["homepageRedirect"]);
            if (navMenuElement != null) {
                for (var i=0; i<anchorElement.length; i++) {
                    var iElement = anchorElement[i];
                    var originalHref = $(iElement).attr("href");
                    var end = originalHref.length;
                    var urlFinalToken = originalHref.substring(2, end);
                    var url = redirect;
                    if (urlFinalToken != "home") {
                        url = redirect + urlFinalToken;
                    }
                    $(iElement).attr("href", url);
                }
            }
        }
    }
}

/* ------ Class UtilityPanel ----- */
UtilityPanel = {
    properties: {
        "blogFormSelector"              : "#blog-form",
        "blogFormSubmitSelector"        : "#blog-form-submit",
        "adventureFormSelector"         : "#adventure-form",
        "adventureFormSubmitSelector"   : "#adventure-form-submit",
        "blogNormalizedSelector"        : "#blogNormalized",
        "adventureNormalizedSelector"   : "#adventureNormalized"
    },

    main: function() {
        UtilityPanel.initAdventureForm();
        UtilityPanel.initBlogForm();
    },

    initAdventureForm: function() {
        var adventureForm = UtilityPanel.properties["adventureFormSelector"];
        var adventureFormSubmit = UtilityPanel.properties["adventureFormSubmitSelector"];
        // $(adventureFormSubmit).click(function(e) {
        $(adventureForm).on("submit", function(e) {
            var data = FormUtil.serialize($(adventureForm));
            if (data != null && data.action != null && data.action != "") {
                var url = data.action;
                UtilityPanel.normalize(url, data);
            }
        });
    },

    initBlogForm: function() {
        var blogForm = UtilityPanel.properties["blogFormSelector"];
        var blogFormSubmit = UtilityPanel.properties["blogFormSubmitSelector"];
        // $(blogFormSubmit).click(function(e) {
        $(blogForm).on("submit", function(e) {
            var data = FormUtil.serialize($(blogForm));
            if (data != null && data.action != null && data.action != "") {
                var url = data.action;
                UtilityPanel.normalize(url, data);
            }
        });
    },

    normalize: function(url, data) {
        $.ajax({
            url: url,
            data: data,
            success: function(result) {
                if (result != null && result.type != null && result.type != "") {
                    var containerSelector = null;
                    if (result.type == "blog") {
                        containerSelector = UtilityPanel.properties["blogNormalizedSelector"];
                    } else {
                        containerSelector = UtilityPanel.properties["adventureNormalizedSelector"];
                    }
                    UtilityPanel.showResultData(result, containerSelector);
                }
                console.log("Success "+result);
            },
            error: function(result) {
                console.log("Error "+result);
            }
        });
    },

    showResultData: function(resultData, containerSelector) {
        var resultText = resultData.result;
        $(containerSelector).val(resultText);
    }

}