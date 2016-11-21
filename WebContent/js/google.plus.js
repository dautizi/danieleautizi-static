// on ready
$(document).ready(function() {
    GooglePlus.main();
});

/* ------ Class Google+ ----- */
GooglePlus = {
    properties: {
        "googlePlusElementId": "#googlePlusElement",
        "googlePlusDataUrl"  : "data-url",
        "googlePlusDataRound": "data-round"
    },

    main: function() {
        GooglePlus.callGooglePlus();
    },

    callGooglePlus: function() {
        var googlePlusElement = $(GooglePlus.properties["googlePlusElementId"]);
        if (googlePlusElement != null) {
            var dataUrl = $(googlePlusElement).attr(GooglePlus.properties["googlePlusDataUrl"]);
            var dataRound = $(googlePlusElement).attr(GooglePlus.properties["googlePlusDataRound"]);
            if (dataUrl != null && dataUrl != "" && dataRound == 1) {
                // call google+
                document.location.href = dataUrl;
            }
        }
    }
}