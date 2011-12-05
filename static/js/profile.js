function resetProfileFormTools() {
    createUploader();
}

function applyProfile() {
    var applyProfileConfig  = {
	url: "/apply-profile",
	type:"POST", success:profileHandler,
	data: {
	    "sms-comp-flag":$("#sms-comp-flag").attr('checked')?"on":false,
	    "sms-other-news-flag":$("#sms-other-news-flag").attr('checked')?"on":false,
	    "email-comp-flag":$("#email-comp-flag").attr('checked')?"on":false,
	    "email-other-news-flag":$("#email-other-news-flag").attr('checked')?"on":false,
	}
    };
    $("#edit-profile-form").ajaxSubmit(applyProfileConfig);
}
function handleUserChangedInProfile(event) {
    if (event.hasOwnProperty("user"))
    	fillEditProfileForm(event.user);
    resetProfileFormTools();
 }

function fillEditProfileForm(user) {
    if (!user) return;
    var directive = {
	'#email' : function(arg) {
	    var type = arg.context.type; 
	    return "Профиль - " + arg.context.email + ((type == 1)?" - суперюзер":(type == 2?" - администратор":""));
	},
	'#surname@value' : 'surname',
	'#patronimic@value' : 'patronimic',
	'#name@value' : 'name',
	'#birthDate@value' : 'birthDate',
	'#moder@checked' : 'moderRqst',
	'#city@value' : 'city',
	'#info' : 'info'
    };
    $('#editprofile').render(user, directive);
    $('#rank').val(user.rank);
    $('#club').val(user.club);
    $('#sms-comp-flag').attr('checked', user["sms-comp-flag"] == "false"?false:true);
    $('#email-comp-flag').attr('checked', user['email-comp-flag'] == "false"?false:true);
    $('#sms-other-news-flag').attr('checked', user['sms-other-news-flag'] == "false"?false:true);
    $('#email-other-news-flag').attr('checked', user['email-other-news-flag'] == "false"?false:true);

    if (user.hasOwnProperty("moderBan") || user.type < 3)
	$("#moder-form-label").hide();
    if (user.hasOwnProperty("photo"))
	$('#user-photo').attr("src", "static/photo/" + user.photo + "?" + (new Date()).getTime());
   
}

function createUploader(){            
    var uploader = new qq.FileUploader({
	    element: document.getElementById('file-uploader-demo1'),
	    action: 'set-photo-with-valums',
	    debug: true,

	    // validation    
	    // ex. ['jpg', 'jpeg', 'png', 'gif'] or []
	    allowedExtensions: ['jpg', 'jpeg', 'png'],        
	    // each file size limit in bytes
	    // this option isn't supported in all browsers
	    sizeLimit: 1000000, // max size   
	    minSizeLimit: 0, // min size

	    // set to true to output server response to console
	    //debug: false,

	    // events         
	    // you can return false to abort submit
	    onSubmit: function(id, fileName){
	    },
	    onProgress: function(id, fileName, loaded, total){ },
	    onComplete: function(id, fileName, responseJSON){ 
		handleUserChangedInProfile({user : responseJSON.user});
		//$('#edit-profile-form').trigger({type : 'userchanged', user : responseJSON.user});
	    },
	    onCancel: function(id, fileName){ },

	    messages: {
		typeError: "{file} Имеет неправильный тип. Допустимы типы {extensions}.",
		sizeError: "Размер файла {file} не должен превышать {sizeLimit}.",
		minSizeError: "{file} is too small, minimum file size is {minSizeLimit}.",
		emptyError: "{file} is empty, please select files again without it.",
		onLeave: "The files are being uploaded, if you leave now the upload will be cancelled."            
		// error messages, see qq.FileUploaderBasic for content            
	    }
        });           
}

function profileHandler(rawdata) {
    $("#profile-status").removeClass("error").removeClass("success");
    var resp = eval("(" + rawdata + ")");
    var allright = resp.status == "done";
    if (allright) {
	revertUser();
	$("#profile-status").text("Изменения профиля успешно применены");
    }else {
	$("#profile-status").text("Во время обработки запроса произошла ошибка");
    }
    var color =  allright?"green":"red";
    $("#profile-status").css("color", color);
    $("#profile-status").fadeIn(3000).fadeOut(3000);
}