function createViewCharacters(app,nav,modal) {
    
    nav.html(`
        <ul>
            <a href="/"><li id="actualPage">Characters</li></a>
            <a href="#/episodes"><li>Episodes</li></a>
            <a href="#/locations"><li>Locations</li></a>
        </ul>
    `);

    if (window.screen.width >= 960) {

        app.html(`
            <div class="appSection__listDiv">
                <input id="inputQuery" type="text" placeholder="Search a character">
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
                <h3>Status</h3>
                <label class="checkContainer">All
                    <input checked="checked" name="status" type="radio" value="all" id="all">
                    <span class="checkmark"></span>
                </label>
                <label class="checkContainer">Alive
                    <input name="status" type="radio" value="alive" id="alive">
                    <span class="checkmark"></span>
                </label>
                <label class="checkContainer">Dead
                    <input name="status" type="radio" value="dead" id="dead">
                    <span class="checkmark"></span>
                </label>
                <label class="checkContainer">Unknown
                    <input name="status" type="radio" value="unknown" id="unknown">
                    <span class="checkmark"></span>
                </label>
                <h3>Species</h3>
                <label class="checkContainer">All
                    <input checked="checked" name="species" type="radio" value="all" id="all">
                    <span class="checkmark"></span>
                </label>
                <label class="checkContainer">Human
                    <input name="species" type="radio" value="human" id="human">
                    <span class="checkmark"></span>
                </label>
                <label class="checkContainer">Alien
                    <input name="species" type="radio" value="alien" id="alien">
                    <span class="checkmark"></span>
                </label>
                <label class="checkContainer">Humanoid
                    <input name="species" type="radio" value="humanoid" id="humanoid">
                    <span class="checkmark"></span>
                </label>
                <label class="checkContainer">Poopybutthole
                    <input name="species" type="radio" value="poopybutthole" id="poopybutthole">
                    <span class="checkmark"></span>
                </label>
                <label class="checkContainer">Mythological Creature
                    <input name="species" type="radio" value="mythological+creature" id="mythological+creature">
                    <span class="checkmark"></span>
                </label>
                <label class="checkContainer">Animal
                    <input name="species" type="radio" value="animal" id="animal">
                    <span class="checkmark"></span>
                </label>
                <label class="checkContainer">Robot
                    <input name="species" type="radio" value="robot" id="robot">
                    <span class="checkmark"></span>
                </label>
                <label class="checkContainer">Disease
                    <input name="species" type="radio" value="disease" id="disease">
                    <span class="checkmark"></span>
                </label>
                <label class="checkContainer">Cronenberg
                    <input name="species" type="radio" value="cronenberg" id="cronenberg">
                    <span class="checkmark"></span>
                </label>
                <label class="checkContainer">Unknown
                    <input name="species" type="radio" value="unknown" id="unknown">
                    <span class="checkmark"></span>
                </label>
                <label class="checkContainer">Planet
                    <input name="species" type="radio" value="planet" id="planet">
                    <span class="checkmark"></span>
                </label>
                <h3>Gender</h3>
                <label class="checkContainer">All
                    <input checked="checked" name="gender" type="radio" value="all" id="all">
                    <span class="checkmark"></span>
                </label>
                <label class="checkContainer">Female
                    <input name="gender" type="radio" value="female" id="female">
                    <span class="checkmark"></span>
                </label>
                <label class="checkContainer">Male
                    <input name="gender" type="radio" value="male" id="male">
                    <span class="checkmark"></span>
                </label>
                <label class="checkContainer">Unknown
                    <input name="gender" type="radio" value="unknown" id="unknown">
                    <span class="checkmark"></span>
                </label>
                <label class="checkContainer">Genderless
                    <input name="gender" type="radio" value="genderless" id="genderless">
                    <span class="checkmark"></span>
                </label>
            </div>
        `);

    } else {

        app.html(`
            <div class="appSection__listDiv">
                <input id="inputQuery" type="text" placeholder="Search a character">
                <nav id="navMini">
                    <ul>
                        <a href="/"><li id="actualPage">Characters</li></a>
                        <a href="#/episodes"><li>Episodes</li></a>
                        <a href="#/locations"><li>Locations</li></a>
                    </ul>
                </nav>
                <select id="statusSelect" name="status">
                    <option value="all">All status</option>
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </select>
                <select id="speciesSelect" name="species">
                    <option value="all">All species</option>
                    <option value="human">Human</option>
                    <option value="alien">Alien</option>
                    <option value="humanoid">Humanoid</option>
                    <option value="poopybutthole">Poopybutthole</option>
                    <option value="mythological+creature">Mythological Creature</option>
                    <option value="animal">Animal</option>
                    <option value="robot">Robot</option>
                    <option value="disease">Disease</option>
                    <option value="cronenberg">Cronenberg</option>
                    <option value="unknown">Unknown</option>
                    <option value="planet">Planet</option>
                </select>
                <select id="genderSelect" name="gender">
                    <option value="all">All genders</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="unknown">Unknown</option>
                    <option value="genderless">Genderless</option>
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
    let checkboxStatus = $( "input[name=status]:radio" );
    let checkboxSpecies = $( "input[name=species]:radio" );
    let checkboxGender = $( "input[name=gender]:radio" );
    let selectStatus = $('#statusSelect');
    let selectSpecies = $('#speciesSelect');
    let selectGender = $('#genderSelect');
    let inputQuery = $('#inputQuery');

    inputQuery.on('input', changeQuery);
    checkboxStatus.on('change', changeQuery);
    checkboxSpecies.on('change', changeQuery);
    checkboxGender.on('change', changeQuery);
    selectStatus.on('change', changeQuery);
    selectSpecies.on('change', changeQuery);
    selectGender.on('change', changeQuery);

    fetch('https://rickandmortyapi.com/api/character')
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
        
        const characters = json['results'];

        for (const i in characters) {
            listItems.append(`
                <div class="appSection__listDiv__listItems__item ${i}">
                    <img class="appSection__listDiv__listItems__item__img ${i}" src="${characters[i].image}" alt="">
                    <div class="appSection__listDiv__listItems__item__flex ${i}">
                        <p class="${i}">${characters[i].name}</p>
                        <p class="${i}">Status: ${characters[i].status}</p>
                        <p class="${i}">Species: ${characters[i].species}</p>
                    </div>
                </div>
            `);
        }

        $('.appSection__listDiv__listItems__item').click( function(event) {

            showModalView(event,characters,modal);

        });

    });

    function showModalView(event,characters,modal) {
        
        let id = parseInt(event.target.className.slice(-2));
        let character = characters[id];
        let episodes = character.episode;
        let modalContent = $('.modalContent');

        let date = new Date(character.created);
        console.log(date)
        let created = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`

        modalContent.html(`
            <div class="modalContent__1">
                <img src="${character.image}" alt="image of character">
                <div>
                    <p>${character.name}</p>
                    <p>Status: ${character.status}</p>
                    <p>Species: ${character.species}</p>
                    <p>Gender: ${character.gender}</p>
                </div>
            </div>
            <div class="modalContent__2">
                <p>Type: ${character.type}</p>
                <p>Created in the database: ${created}</p>
                <p>Origin: ${character.origin.name}</p>
                <p>Location: ${character.location.name}</p>
            </div>
            <div class="modalContent__episodes">
                <h4>Episodes</h4>
                <div class="modalContent__episodes__flex">
                </div>
            </div>
            <button id="btnCloseModal">Close</button>
        `);
        
        modalContent.css({'grid-template-areas':'"div1 div2" "episodes episodes" "btn btn"'});
        
        let divEpisodes = $('.modalContent__episodes__flex');

        for (const episode of episodes) {
            
            fetch(episode)
            .then(response => response.json())
            .then( function(json) {
                    
                divEpisodes.append(`
                    <div class="modalContent__episodes__flex__item">
                        <p>${json.name}</p>
                        <p>Episode: ${json.episode}</p>
                        <p>Air date: ${json.air_date}</p>
                    </div>
                `);

            });

        }

        modal.css({'display':'flex'});

        $('#btnCloseModal').click( function() {

            modal.css({'display':'none'});

        });

        $('#modalView').click( function(event) {

            if(event.target.id == 'modalView') {

                modal.css({'display':'none'});
            
            }

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
            
            const characters = json['results'];

            listItems.empty();

            for (const i in characters) {
                listItems.append(`
                    <div class="appSection__listDiv__listItems__item ${i}">
                        <img class="appSection__listDiv__listItems__item__img ${i}" src="${characters[i].image}" alt="">
                        <div class="appSection__listDiv__listItems__item__flex ${i}">
                            <p class="${i}">${characters[i].name}</p>
                            <p class="${i}">Status: ${characters[i].status}</p>
                            <p class="${i}">Species: ${characters[i].species}</p>
                        </div>
                    </div>
                `);
            }

            $('.appSection__listDiv__listItems__item').click( function(event) {

                showModalView(event,characters,modal);

            });

        });
    }

    function changeQuery(event) {

        event.preventDefault();

        query = inputQuery.val();
        let status = '';
        let species = '';
        let gender = '';
        
        if (window.screen.width >= 960) {

            status = $("input[name='status']:checked").val();
            species = $("input[name='species']:checked").val();
            gender = $("input[name='gender']:checked").val();

        } else {
            // Vista celu
            status = selectStatus.val();
            species = selectSpecies.val();
            gender = selectGender.val();

        }

        if (status == 'all') {
            status = '';
        }
        if (species == 'all') {
            species = '';
        }
        if (gender == 'all') {
            gender = '';
        }

        for( i in query) {
            query = query.replace(' ','+');
        }

        filterCharacters(query, status, species, gender);

    }

    function filterCharacters(query,status,species,gender) {
        let url = 'https://rickandmortyapi.com/api/character/';
        let queryString = '';
        let statusString = '';
        let speciesString = '';
        let genderString = '';
        if (query != null && query != '') {
            queryString = `name=${query}&`;
        }
        if (status != null && status != '') {
            statusString = `status=${status}&`; 
        }
        if (species != null && species != '') {
            speciesString = `species=${species}&`; 
        }
        if (gender != null && gender != '') {
            genderString = `gender=${gender}`;
        }

        url = `${url}?${queryString}${statusString}${speciesString}${genderString}`;
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
            
            const characters = json['results'];

            listItems.empty();

            for (const i in characters) {
                listItems.append(`
                    <div class="appSection__listDiv__listItems__item ${i}">
                        <img class="appSection__listDiv__listItems__item__img ${i}" src="${characters[i].image}" alt="">
                        <div class="appSection__listDiv__listItems__item__flex ${i}">
                            <p class="${i}">${characters[i].name}</p>
                            <p class="${i}">Status: ${characters[i].status}</p>
                            <p class="${i}">Species: ${characters[i].species}</p>
                        </div>
                    </div>
                `);
            }

            $('.appSection__listDiv__listItems__item').click( function(event) {

                showModalView(event,characters,modal);

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