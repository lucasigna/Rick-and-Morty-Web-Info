function createViewLocations(app,nav,modal) {
    
    nav.html(`
        <ul>
            <a href="/"><li>Characters</li></a>
            <a href="#/episodes"><li>Episodes</li></a>
            <a href="#/locations"><li id="actualPage">Locations</li></a>
        </ul>
    `);
    
    if (window.screen.width >= 960) {

        app.html(`
            <div class="appSection__listDiv">
                <input id="inputQuery" type="text" placeholder="Search a location">
                <div id="listItems" class="appSection__listDiv__listItems">
                </div>
                <div id="btnsPages">
                    <button id="btnPrev" class="btnBlocked">Previous page</button>
                    <p id="pages">1</p>
                    <button id="btnNext" class="btnUnblocked">Next page</button>
                </div>
            </div>
            <div class="appSection__filtersDiv">
                <h2>No filters</h2>
            </div>
        `);

    } else {

        app.html(`
            <div class="appSection__listDiv">
                <input id="inputQuery" type="text" placeholder="Search a location">
                <nav id="navMini">
                    <ul>
                        <a href="/"><li>Characters</li></a>
                        <a href="#/episodes"><li>Episodes</li></a>
                        <a href="#/locations"><li id="actualPage">Locations</li></a>
                    </ul>
                </nav>
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
    let inputQuery = $('#inputQuery');

    inputQuery.on('input', changeQuery);

    fetch('https://rickandmortyapi.com/api/location')
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
        
        const locations = json['results'];

        for (const i in locations) {
            listItems.append(`
                <div class="appSection__listDiv__listItems__item ${i}">
                    <img class="appSection__listDiv__listItems__item__img ${i}" src="./img/episode.jpg" alt="">
                    <div class="appSection__listDiv__listItems__item__flex ${i}">
                        <p class="${i}">${locations[i].name}</p>
                        <p class="${i}">Type: ${locations[i].type}</p>
                        <p class="${i}">Dimension: ${locations[i].dimension}</p>
                    </div>
                </div>
            `);
        }

        $('.appSection__listDiv__listItems__item').click( function(event) {

            showModalView(event,locations,modal);

        });

    });

    function showModalView(event,locations,modal) {
        
        let id = parseInt(event.target.className.slice(-2));
        let location = locations[id];
        let characters = location.residents;
        let modalContent = $('.modalContent');

        modalContent.html(`
            <div class="modalContent__episodeTop">
                <p>${location.name}</p>
                <p>Type: ${location.type}</p>
                <p>Dimension: ${location.dimension}</p>
            </div>
            <div class="modalContent__episodeCharacters">
                <h4>Residents</h4>
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
            
            const locations = json['results'];

            for (const i in locations) {
                listItems.append(`
                    <div class="appSection__listDiv__listItems__item ${i}">
                        <img class="appSection__listDiv__listItems__item__img ${i}" src="./img/episode.jpg" alt="">
                        <div class="appSection__listDiv__listItems__item__flex ${i}">
                            <p class="${i}">${locations[i].name}</p>
                            <p class="${i}">Type: ${locations[i].type}</p>
                            <p class="${i}">Dimension: ${locations[i].dimension}</p>
                        </div>
                    </div>
                `);
            }

            $('.appSection__listDiv__listItems__item').click( function(event) {

                showModalView(event,locations,modal);

            });

        });
    }

    function changeQuery(event) {

        event.preventDefault();

        query = inputQuery.val();
        
        for( i in query) {
            query = query.replace(' ','+');
        }

        filterCharacters(query);

    }

    function filterCharacters(query) {
        let url = 'https://rickandmortyapi.com/api/location/';
        let queryString = '';
        let seasonString = '';
        let speciesString = '';
        let genderString = '';
        if (query != null && query != '') {
            queryString = `name=${query}`;
        }

        url = `${url}?${queryString}`;
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
                            <p class="${i}">${locations[i].name}</p>
                            <p class="${i}">Type: ${locations[i].type}</p>
                            <p class="${i}">Dimension: ${locations[i].dimension}</p>
                        </div>
                    </div>
                `);
            }

            $('.appSection__listDiv__listItems__item').click( function(event) {

                showModalView(event,locations,modal);

            });

        }).catch( function(error) {

            console.error(error);

            listItems.empty();

            btnNext.unbind('click');
            btnPrev.unbind('click');
            btnNext.removeClass('btnUnblocked').addClass('btnBlocked');
            btnPrev.removeClass('btnUnblocked').addClass('btnBlocked');
            
        });
    }

}