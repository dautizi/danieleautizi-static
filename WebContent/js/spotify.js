// on ready
$(document).ready(function() {
    Spotify.main();
});

/* ------ Class Spotify ----- */
Spotify = {
    properties: {
        "spotifyElementId": "#spotifyElement",
        "spotifyDataUrl" : "data-url",
        "spotifyDataRound": "data-round",
        "spotifyIsp": "spotify"
    },

    main: function() {
        Spotify.callSpotify();
    },

    callSpotify: function() {
        var spotifyElement = $(Spotify.properties["spotifyElementId"]);
        if (spotifyElement != null) {
            var dataUrl = $(spotifyElement).attr(Spotify.properties["spotifyDataUrl"]);
            var dataRound = $(spotifyElement).attr(Spotify.properties["spotifyDataRound"]);
            if (dataUrl != null && dataUrl != "" && dataRound == 1) {
                // call spotify 
                document.location.href = dataUrl;
            }
        }
    }
}