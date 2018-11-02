
$('#run-search').on('click', function () {
    var q = $('#search-term').val();
    var articleCount = $('#article-count').val();
    var startYear = $('#start-year').val();
    var endYear = $('#end-year').val();
    var param, articles = [], url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

    param = {
        'api-key': "77a49d61d13c4107b293ba9466f3ed1a",
        'sort': "newest",
        'page': 1
    };

    if (q) {
        param['q'] = q ;
    }
    if (startYear) {
        param['begin_date'] = `${startYear}0101` ;
    }
    if (endYear) {
        param['end_date'] = `${endYear}1231` ;
    }
    url += '?' + $.param(param);

    $.ajax({
        url: url,
        method: 'GET',
    }).done(function (result) {
        var cards = '';
        articles = result.response.docs;
        for(let i = 0; i < articleCount; i++){
            cards += '<div class="card my-2">';
            cards += `<div class="card-header"><h3>${articles[i].headline.main}</h3></div>`;
            cards += `<div class="card-body"><p>Source: ${articles[i].source}<br>`;
            cards += `Date: ${articles[i].pub_date}</p></div>`;
            cards += `<div class="card-footer"><a href="${articles[i].web_url}" target="_blank">Read more</a></div>`;
            cards += '</div>'
        }
        $('#article-section').html(cards);
    }).fail(function (err) {
        throw err;
    });

});



