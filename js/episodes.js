function createViewEpisodes(app,nav,modal) {
    
    nav.html(`
        <ul>
            <a href="/"><li>Characters</li></a>
            <a href="#/episodes"><li id="actualPage">Episodes</li></a>
            <a href="#/locations"><li>Locations</li></a>
        </ul>
    `);
    
    if (window.screen.width >= 960) {

        app.html(`
            <div class="appSection__listDiv">
                <input id="inputQuery" type="text" placeholder="Search an episode">
                <div id="listItems" class="appSection__listDiv__listItems">
                </div>
                <div id="btnsPages">
                    <button id="btnPrev" class="btnBlocked">Previous page</button>
                    <p id="pages">1</p>
                    <button id="btnNext" class="btnUnblocked">Next page</button>
                </div>
            </div>
            <div class="appSection__filtersDiv">
                <h2>Filters</h2>
                <h3>Season</h3>
                <label class="checkContainer">All seasons
                    <input checked="checked" name="season" type="radio" value="all" id="all">
                    <span class="checkmark"></span>
                </label>
                <label class="checkContainer">Season 1
                    <input name="season" type="radio" value="S01" id="S01">
                    <span class="checkmark"></span>
                </label>
                <label class="checkContainer">Season 2
                    <input name="season" type="radio" value="S02" id="S02">
                    <span class="checkmark"></span>
                </label>
                <label class="checkContainer">Season 3
                    <input name="season" type="radio" value="S03" id="S03">
                    <span class="checkmark"></span>
                </label>
                <label class="checkContainer">Season 4
                    <input name="season" type="radio" value="S04" id="S04">
                    <span class="checkmark"></span>
                </label>
            </div>
        `);

    } else {

        app.html(`
            <div class="appSection__listDiv">
                <input id="inputQuery" type="text" placeholder="Search an episode">
                <nav id="navMini">
                    <ul>
                        <a href="/"><li>Characters</li></a>
                        <a href="#/episodes"><li id="actualPage">Episodes</li></a>
                        <a href="#/locations"><li>Locations</li></a>
                    </ul>
                </nav>
                <select id="seasonSelect" name="season">
                    <option value="all">All seasons</option>
                    <option value="S01">Season 1</option>
                    <option value="S02">Season 2</option>
                    <option value="S03">Season 3</option>
                    <option value="S04">Season 4</option>
                </select>
                <div id="listItems" class="appSection__listDiv__listItems">
                </div>
                <div id="btnsPages">
                    <button id="btnPrev" class="btnBlocked">Previous page</button>
                    <p id="pages">1</p>
                    <button id="btnNext" class="btnUnblocked">Next page</button>
                </div>
            </div>
        `);

    }

    let listItems = $('#listItems');
    let btnNext = $('#btnNext');
    let btnPrev = $('#btnPrev');
    let numPages = $('#pages');
    let actualPage = 1;
    let checkboxSeason = $( "input[name=season]:radio" );
    let selectSeason = $('#seasonSelect');
    let inputQuery = $('#inputQuery');

    inputQuery.on('input', changeQuery);
    checkboxSeason.on('change', changeQuery);
    selectSeason.on('change', changeQuery);

    fetch('https://rickandmortyapi.com/api/episode')
    .then(response => response.json())
    .then( function(json) {

        let next = json.info.next;
        let prev = json.info.prev;

        if (next == null) {
            btnNext.removeClass('btnUnblocked').addClass('btnBlocked');
        } else {
            btnNext.removeClass('btnBlocked').addClass('btnUnblocked');
            btnNext.click( function() {  actualPage++; loadPage(next); } );
        }

        if (prev == null) {
            btnPrev.removeClass('btnUnblocked').addClass('btnBlocked');
        } else {
            btnPrev.removeClass('btnBlocked').addClass('btnUnblocked');
            btnPrev.click( function() {  actualPage--; loadPage(prev); } );
        }
        
        const episodes = json['results'];

        for (const i in episodes) {
            listItems.append(`
                <div class="appSection__listDiv__listItems__item ${i}">
                    <img class="appSection__listDiv__listItems__item__img ${i}" src="./img/episode.jpg" alt="">
                    <div class="appSection__listDiv__listItems__item__flex ${i}">
                        <p class="${i}">${episodes[i].name}</p>
                        <p class="${i}">Episode: ${episodes[i].episode}</p>
                        <p class="${i}">Air date: ${episodes[i].air_date}</p>
                    </div>
                </div>
            `);
        }

        $('.appSection__listDiv__listItems__item').click( function(event) {

            showModalView(event,episodes,modal);

        });

    });

    function showModalView(event,episodes,modal) {
        
        let id = parseInt(event.target.className.slice(-2));
        let episode = episodes[id];
        let characters = episode.characters;
        let modalContent = $('.modalContent');

        modalContent.html(`
            <div class="modalContent__episodeTop">
                <p>${episode.name}</p>
                <p>Episode: ${episode.episode}</p>
                <p>Air date: ${episode.air_date}</p>
            </div>
            <div class="modalContent__episodeCharacters">
                <h4>Characters</h4>
                <div class="modalContent__episodeCharacters__flex">
                </div>
            </div>
            <button id="btnCloseModal">Close</button>
        `);

        modalContent.css({'grid-template-areas':'"episodeTop" "episodeCharacters" "btn"'});
        
        let divCharacters = $('.modalContent__episodeCharacters__flex');

        for (const character of characters) {
            
            fetch(character)
            .then(response => response.json())
            .then( function(json) {
                    
                divCharacters.append(`
                    <div class="modalContent__episodeCharacters__flex__item">
                        <img src="${json.image}">
                        <div>
                            <p>${json.name}</p>
                            <p>Status: ${json.status}</p>
                            <p>Species: ${json.species}</p>
                        </div>
                    </div>
                `);

            });

        }

        modal.css({'display':'flex'});

        $('#btnCloseModal').click( function() {

            modal.css({'display':'none'});

        });

    }

    function loadPage(page) {
        fetch(page)
        .then(response => response.json())
        .then( function(json) {

            let next = json.info.next;
            let prev = json.info.prev;
            numPages.html(`${actualPage}`);

            btnNext.unbind('click');
            btnPrev.unbind('click');
            
            if (next == null) {
                btnNext.removeClass('btnUnblocked').addClass('btnBlocked');
            } else {
                btnNext.removeClass('btnBlocked').addClass('btnUnblocked');
                btnNext.click( function() {  actualPage++; loadPage(next); } );
            }

            if (prev == null) {
                btnPrev.removeClass('btnUnblocked').addClass('btnBlocked');
            } else {
                btnPrev.removeClass('btnBlocked').addClass('btnUnblocked');
                btnPrev.click( function() {  actualPage--; loadPage(prev); } );
            }
            
            listItems.empty();
            
            const episodes = json['results'];

            for (const i in episodes) {
                listItems.append(`
                    <div class="appSection__listDiv__listItems__item ${i}">
                        <img class="appSection__listDiv__listItems__item__img ${i}" src="./img/episode.jpg" alt="">
                        <div class="appSection__listDiv__listItems__item__flex ${i}">
                            <p class="${i}">${episodes[i].name}</p>
                            <p class="${i}">Episode: ${episodes[i].episode}</p>
                            <p class="${i}">Air date: ${episodes[i].air_date}</p>
                        </div>
                    </div>
                `);
            }

            $('.appSection__listDiv__listItems__item').click( function(event) {

                showModalView(event,episodes,modal);

            });

        });
    }

    function changeQuery(event) {

        event.preventDefault();

        query = inputQuery.val();
        let season = '';

        if (window.screen.width >= 960) {

            season = $("input[name='season']:checked").val();

        } else {
            // Vista celu
            season = selectSeason.val();

        }

        if (season == 'all') {
            season = '';
        }
        
        for( i in query) {
            query = query.replace(' ','+');
        }

        filterCharacters(query, season);

    }

    function filterCharacters(query,season) {
        let url = 'https://rickandmortyapi.com/api/episode/';
        let queryString = '';
        let seasonString = '';
        let speciesString = '';
        let genderString = '';
        if (query != null && query != '') {
            queryString = `name=${query}&`;
        }
        if (season != null && season != '') {
            seasonString = `episode=${season}`; 
        }

        url = `${url}?${queryString}${seasonString}`;
        if (url[url.length - 1] == '&' || url[url.length - 1] == '?') {
            url = url.slice(0, -1);
        }

        
        fetch(url)
        .then(response => response.json())
        .then( function(json) {

            actualPage = 1;
            let next = json.info.next;
            let prev = json.info.prev;
            numPages.html(`${actualPage}`);

            btnNext.unbind('click');
            btnPrev.unbind('click');
            
            if (next == null) {
                btnNext.removeClass('btnUnblocked').addClass('btnBlocked');
            } else {
                btnNext.removeClass('btnBlocked').addClass('btnUnblocked');
                btnNext.click( function() {  actualPage++; loadPage(next); } );
            }

            if (prev == null) {
                btnPrev.removeClass('btnUnblocked').addClass('btnBlocked');
            } else {
                btnPrev.removeClass('btnBlocked').addClass('btnUnblocked');
                btnPrev.click( function() {  actualPage--; loadPage(prev); } );
            }
            
            listItems.empty();
            
            const episodes = json['results'];

            for (const i in episodes) {
                listItems.append(`
                    <div class="appSection__listDiv__listItems__item ${i}">
                        <img class="appSection__listDiv__listItems__item__img ${i}" src="./img/episode.jpg" alt="">
                        <div class="appSection__listDiv__listItems__item__flex ${i}">
                            <p class="${i}">${episodes[i].name}</p>
                            <p class="${i}">Episode: ${episodes[i].episode}</p>
                            <p class="${i}">Air date: ${episodes[i].air_date}</p>
                        </div>
                    </div>
                `);
            }

            $('.appSection__listDiv__listItems__item').click( function(event) {

                showModalView(event,episodes,modal);

            });

        }).catch( function(error) {

            listItems.empty();

            btnNext.unbind('click');
            btnPrev.unbind('click');
            btnNext.removeClass('btnUnblocked').addClass('btnBlocked');
            btnPrev.removeClass('btnUnblocked').addClass('btnBlocked');
            
        });
    }

}