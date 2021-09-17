$(window).ready(function() {
    // Creo una variable para la raíz de la app y otra para el header
    let app = $('#app');
    let nav = $('#navPC');
    let header = $('header');
    let logo = $('#imgHeader');
    let main = $('main');
    let body = $('body');
    let modal = $('#modalView');
    // Almaceno las rutas
    const routes = [
            { path: '/', page: 'characters' },
            { path: '/episodes', page: 'episodes' },
            { path: '/locations', page: 'locations' },
            
        ];
    // Función que obtiene la ruta actual
    const parseLocation = () => location.hash.slice(1).toLocaleLowerCase() || '/';
    // Función que obtiene la página según la ruta
    const findPageByPath = (path, routes) => routes.find(route => route.path == path);

    const router = () => {
        const path = parseLocation();
        const page = findPageByPath(path, routes).page;
        switch(page) {
            case 'characters':
                createViewCharacters(app,nav,modal);
                break;
            
            case 'episodes':
                createViewEpisodes(app,nav,modal);
                break;
            
            case 'locations':
                createViewLocations(app,nav,modal);
                break;
            
            default:
                console.log('Página no encontrada');
                break;
        }
    }

    router();

    $(window).on('hashchange', function(){
        router();
    });

    if (window.screen.width >= 960) {

        body.css({'height':`${$(window).height()+100}px`});
        main.css({'height':`${$(window).height()-240}px`});

        $(window).on('scroll', function(){
            if (document.body.scrollTop >= 100 || document.documentElement.scrollTop >= 100) {
                header.css({'background-color':'#1D1D41'});
                logo.css({'height':'20px'});
                main.css({'top':'60px','height':`${$(window).height()-60}px`,'overflow':'auto'});
            } else {
                header.css({'background-color':'transparent'});
                logo.css({'height':'200px'});
                main.css({'top':'240px','height':`${$(window).height()-240}px`,'overflow':'hidden'});
            }
        });

    }

});