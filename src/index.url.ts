export const Url = 'https://demo.farasi.com.gt/ROOT/';

export const Apis = {
    login: '/API/API_login.php?request=login',
    getPlayers: '/API/API_jugador.php?request=get&codigo=',
    getPosicion: '/API/API_util.php?request=posiciones',
    postJugador:'/API/API_jugador.php?request=grabar',
    deleteJugador:'/API/API_jugador.php?request=situacion',
    updateJugador:'/API/API_jugador.php?request=modificar',
    getPlayer: '/API/API_jugador.php?request=get&codigo=',
    getEquipos: '/API/API_util.php?request=equipos',
    getPosiciones: '/API/API_util.php?request=posiciones',
    getPerfil:'/API/API_ajustes.php?request=get_perfil',
    getAjustes: '/API/API_ajustes.php?request=get_ajustes&usuario=',
    getPassword: '/API/API_ajustes.php?request=get_pasword&usuario=',
    getFoto: '/API/API_ajustes.php?request=get_foto&usuario=',
    putPerfil:'/API/API_ajustes.php?request=set_perfil'
};