
/** Функция обработчик, результата авторизации */
function handleAuth(data) {
    //alert(data);return;
    document.currentUser =  eval ('(' + data + ')');
    processCurrentUser();

}

/** Обработка юзера после авторизации */
function processCurrentUser() {
    if (!document.currentUser)
	return;
    var cu = document.currentUser;
    $("#adminMenuItem").css("display", cu.type <= 2?"list-item":"none");
}

var authPanelVisible = true;
function toggleAuthPanel() {
    $("#authPanel").animate({ top: (authPanelVisible?"-=44px":"+=44px"), }, 'slow' );
    authPanelVisible = !authPanelVisible;
    $("body").css("padding-top", authPanelVisible?"55px":"10px");
    $("div#toggleAuth img").attr("src", authPanelVisible?"static/img/up.png":"static/img/down.png");
    
}


