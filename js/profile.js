function getArtistPictureAndName(artist_id) {
    var link = 'https://api.spotify.com/v1/artists/' + artist_id;
    $.ajax({
        url: link,
        cache: true,
        type: "GET",
        success: function(response) {
            if(response && response.images && response.images.length > 0) {
                showArtistPicture(response.images[0].url);
            }
            showArtistName(response.name);
        }
    });
}

function showArtistPicture(url) {
    $("#profile-picture").attr("src", url);
}

function showArtistName(name) {
    $("#profile-name").text(name);
}

function getArtistNews(artist_id) {
	var link = 'http://developer.echonest.com/api/v4/artist/news';
	$.ajax({
        url: link,
        data: { 
            "api_key": api_key,
            "id": 'spotify:artist:' + artist_id,
            "format": 'json'
        },
        cache: true,
        type: "GET",
        success: function(response) {
            if(response && response.response && response.response.news) {
                showArtistNews(response.response.news);
            }
        }
    });
}

function showArtistNews(news) {
    $("#profile-timeline-tab-content-ul").empty();
    for(var i in news) {
        $("#profile-timeline-tab-content-ul").append(
            '<li>' + news[i].date_found + '<br>' + news[i].name + '</li>'
        );
    }
}

function getArtistInfo(artist_id) {
	var link = 'http://developer.echonest.com/api/v4/artist/profile';
	$.ajax({
        url: link,
        data: { 
            "api_key": api_key,
            "id": 'spotify:artist:' + artist_id,
            "format": 'json',
            "bucket": 'artist_location'
        },
        cache: true,
        type: "GET",
        success: function(response) {
            if(response && response.response && response.response.artist.artist_location) {
                showArtistInfo(response.response.artist.artist_location);
            }
        }
    });
}

function showArtistInfo(info) {
    $("#profile-about-tab-content-ul").empty();
    for(var att in info) {
        $("#profile-about-tab-content-ul").append(
            '<li>' + info[att] + '</li>'
        );
    }
}

function getArtistImage(artist_id) {
	var link = 'http://developer.echonest.com/api/v4/artist/images';
	$.ajax({
        url: link,
        dataType: 'jsonp',
        data: { 
            "api_key": api_key,
            "id": 'spotify:artist:' + artist_id,
            "format": 'jsonp'
        },
        cache: true,
        type: "GET",
        success: function(response) {
            if(response && response.response && response.response.images) {
                showArtistImage(response.response.images);
            }
        }
    });
}

function showArtistImage(images) {
    $("#profile-photos-tab-content-ul").empty();
    for(var i in images) {
        //var img = $("img").attr("url", images[i].url).error(function() {
        //    this.hide();
        //});
        $("#profile-photos-tab-content-ul").append('<li><img src="' + images[i].url + '"></img></li>');
    }   
}

function getTopTracks(artist_id) {
    var link = 'https://api.spotify.com/v1/artists/' + artist_id + '/top-tracks';
    $.ajax({
        url: link,
        data: { 
            "country": "US"
        },
        cache: true,
        type: "GET",
        success: function(response) {           
            if(response && response.tracks) {
                showTopTracks(response.tracks);
            }
        }
    });
}

function showTopTracks(tracks) {
    $("#profile-songs-tab-content-ul").empty();
    for(var i in tracks) {
        $("#profile-songs-tab-content-ul").append(
            '<li>' + tracks[i].name + '</li>'
        );
    }   
}

function getSimilarArtists(artist_id) {
    var link = 'http://developer.echonest.com/api/v4/artist/similar';
    $.ajax({
        url: link,
        dataType: 'jsonp',
        data: { 
            "api_key": api_key,
            "id": 'spotify:artist:' + artist_id,
            "format": 'jsonp',
            "bucket": 'id:spotify'
        },
        cache: true,
        type: "GET",
        success: function(response) {           
            if(response && response.response && response.response.artists) {
                showSimilarArtists(response.response.artists);
            }
        }
    });
}

function showSimilarArtists(artists) {
    var ids = "";
    for(var i in artists) {
        if(artists[i].foreign_ids && artists[i].foreign_ids.length > 0) {
            var id = artists[i].foreign_ids[0].foreign_id;
            ids += id.slice(15) + ','
        }   
    }
    ids = ids.slice(0, -1);
    var link = 'https://api.spotify.com/v1/artists';
    $.ajax({
        url: link,
        data: { 
            "ids": ids
        },
        cache: true,
        type: "GET",
        success: function(response) {    
            if(response && response.artists) {
                $("#profile-artists-tab-content-ul").empty();
                for(var i in response.artists) {
                    if(response.artists[i].images && response.artists[i].images.length > 0) {
                        var image = response.artists[i].images[0].url;
                        $("#profile-artists-tab-content-ul").append(
                            '<li><img src="' + image + '"><a href="javascript:loadProfile(\''+ response.artists[i].id + '\')">' + response.artists[i].name + '</a></li>');
                    }
                }
            }
        }
    });
}
