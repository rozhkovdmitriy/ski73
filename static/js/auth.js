
function refreshAuthPanel(cu) {
    if (!cu)
	$("#topPanelContent").load("static/auth-form.html");
    else
	$("#topPanelContent").html("<span id='email'>" + cu.email + "</span><span style='width:40px'></span>"
		    + "<a id='logoutlink' onclick='logout()'>Выйти</a>");
}


function getCurrentUser() {
    $.ajax({
	    url : "current-user",
	    type : "POST",
	    success: function(data) {
		var cu = eval("(" + data + ")");
		document.cu = cu;
		refreshUserDependencies(cu); },
	    error:function (XMLHttpRequest, textStatus, errorThrown) {alert(textStatus);}
	});

}


function refreshUserDependencies(user) {
    refreshAuthPanel(user);
}

/** Запрос панельки авторизации */
function getAuthPanel() {
    getCurrentUser();
}

/** Функция обработчик, результата авторизации */
function handleAuth(data) {
    //alert(data);return;
    var data = eval ('(' + data + ')');
    if (data.status == "done") {
	refreshUserDependencies(data.user);
    } else {
	alert(data.error);
    }

}

/** Обработка юзера после авторизации */
function processUser(cu) {
    $("#adminMenuItem").css("display", cu.type <= 2?"list-item":"none");
    refreshAuthPanel();
    //$(".username").html(cu.)
}

var authPanelVisible = true;
function toggleAuthPanel() {
    $("#topPanel").animate({ top: (authPanelVisible?"-=42px":"+=42px"), }, 'slow' );
    authPanelVisible = !authPanelVisible;
    $("body").css("padding-top", authPanelVisible?"55px":"10px");
    $("div#toggleAuth img").attr("src", authPanelVisible?"static/img/up.png":"static/img/down.png");
    
}

function logout() {
    $.ajax({
	    url : "logout-from-site",
	    type : "POST",
	    success: function(data) {
		getCurrentUser();
	    },
	    error:function (XMLHttpRequest, textStatus, errorThrown) {alert(textStatus);}
	});
}


