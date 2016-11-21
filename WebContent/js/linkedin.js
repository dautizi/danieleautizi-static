// on ready
$(document).ready(function() {
    Linkedin.main();
});

/* ------ Class Linkedin ----- */
Linkedin = {
    properties: {
        "linkedinElementId": "#linkedinElement",
        "linkedinDataUrl" : "data-url",
        "linkedinDataRound": "data-round"
    },

    main: function() {
        Linkedin.callLinkedin();
    },

    callLinkedin: function() {
        var linkedinElement = $(Linkedin.properties["linkedinElementId"]);
        if (linkedinElement != null) {
            var dataUrl = $(linkedinElement).attr(Linkedin.properties["linkedinDataUrl"]);
            var dataRound = $(linkedinElement).attr(Linkedin.properties["linkedinDataRound"]);
            if (dataUrl != null && dataUrl != "" && dataRound == 1) {
                // call linkedin 
                document.location.href = dataUrl;
            }
        }
    }
}