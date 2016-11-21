// on ready
$(document).ready(function() {
    Instagram.main();
});

/* ------ Class Instagram ----- */
Instagram = {
    properties: {
        "instagramElementId": "#instagramElement",
        "instagramDataUrl"  : "data-url",
        "instagramDataRound": "data-round",
        "imgAnchorSelector" : ".instagramImgAnchor"
    },

    main: function() {
        var dataRound = $(instagramElement).attr(Instagram.properties["instagramDataRound"]);
        Instagram.callInstagram(dataRound);
    },

    callInstagram: function(dataRound) {
        var instagramElement = $(Instagram.properties["instagramElementId"]);
        if (instagramElement != null) {
            var dataUrl = $(instagramElement).attr(Instagram.properties["instagramDataUrl"]);
            if (dataUrl != null && dataUrl != "" && dataRound == 1) {
                // call instagram 
                document.location.href = dataUrl;
            }
        }
    },

    layout: function(dataRound) {
        var instagramElement = $(Instagram.properties["imgAnchorSelector"]);
        if (dataRound == 2) {
            for (var i=0; i<instagramElement.length; i++) {
                $(instagramElement[i]).on("click", function (e) {
                    e.preventDefault();
                });
            }
        }
    }
}