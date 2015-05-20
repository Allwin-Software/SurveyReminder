'use strict';

var clientContext = SP.ClientContext.get_current();
var user = clientContext.get_web().get_currentUser();
var SPHostUrl;
var SPAppWebUrl;
var GroupUsers = [];
var SurveyUsers = [];
var UserTable;
var EmailBody;
var EmailSubject;
var CurrentUserEmail;
// This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
$(document).ready(function () {
    $("#titleAreaBox").remove();
    $("#s4-titlerow").remove();

    $(document).foundation();
    $('#UserListfieldset').hide();
    UserTable = $('#example').DataTable({
        "bFilter": false,
        "ordering": false,
        "info": false,
        "lengthChange": false

    });
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', sharePointReady);
});


function sharePointReady() {
     clientContext = SP.ClientContext.get_current();
     user = clientContext.get_web().get_currentUser();

    clientContext.load(user);
    clientContext.executeQueryAsync(onQuerySucceeded, onQueryFailed);
}
function onQuerySucceeded() {
    CurrentUserEmail= user.get_email();
    FetchSurveyList();
    FetchSiteGroup();
}
function onQueryFailed(sender, args) {
    alert('Error: ' + args.get_message());
}

//function retrieveQueryStringParameter(param) {
//    var params = document.URL.split("?")[1].split("&");
//    var strParams = "";
//    for (var i = 0; i < params.length; i = i + 1) {
//        var singleParam = params[i].split("=");
//        if (singleParam[0] == param) {
//            return singleParam[1];
//        }
//    }
//}
function FetchSurveyList() {
    $.ajax({
        url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists?$filter=BaseTemplate  eq 102",
        type: "GET",
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data) {
            $.each(data.d.results, function (key, value) {
                var $select = $('#SurveyList');
                $select.append('<option value=' + encodeURI(value.Id) + '>' + value.Title + '</option>');
            });
        },
        error: function (data) {
        }
    });
}
function FetchSiteGroup() {
    $.ajax({
        url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/sitegroups",
        type: "GET",
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data) {
            $.each(data.d.results, function (key, value) {
                var $select = $('#GroupList');
                $select.append('<option value=' + value.Id + '>' + value.Title + '</option>');
            });
        },
        error: function (data) {
        }
    });
}
function FetchUnrespondedUsers() {
    $('#FetchUnResUsers').attr('disabled', 'disabled');
    FetchGroupUsers(function (GroupUserData) {
        $.each(GroupUserData.d.results, function (key, value) {
            GroupUsers.push(value.Id);
        });
        FetchSurveyResponance(function (SurveyUserData) {
            $.each(SurveyUserData.d.results, function (key, value) {
                SurveyUsers.push(value.AuthorId);
            });
            var diffArray = $(GroupUsers).not(SurveyUsers).get();
            FetchUserDetails(diffArray);
        });
    });

}
function FetchGroupUsers(callback) {
    var GroupID = $("#GroupList").val();
    $.ajax({
        url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/sitegroups(" + GroupID + ")/users?$filter=Title ne 'System Account'",
        type: "GET",
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data) {
            callback(data);
        },
        error: function (data) {
        }
    });
}
function FetchSurveyResponance(callback) {
    var ListGUID = $("#SurveyList").val();
    $.ajax({
        url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists(guid'" + ListGUID + "')/items",
        type: "GET",
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data) {
            callback(data);
        },
        error: function (data) {
        }
    });
}
function FetchUserDetails(UserIDArray) {
    $.each(UserIDArray, function (key, value) {
        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/getuserbyid(" + value + ")",
            type: "GET",
            headers: { "Accept": "application/json;odata=verbose" },
            success: function (data) {
                if (data.d.Email != "") {
                    UserTable.row.add([
                        data.d.Title,
                        data.d.Email,
                    ]).draw();
                }
            },
            error: function (data) {
            }
        });
    });
    $('#UserListfieldset').show();
}
function OpenEmailTemplateModel() {
    $('#Email').foundation('reveal', 'open');
}
function UpdateEmailTemplate() {
    EmailBody = $('#EmailBody').val();
    EmailSubject = $('#EmailSubject').val();
    FetchUserdetailsfromTable();
}
function FetchUserdetailsfromTable() {
    var oTable = $('#example').dataTable();
    var NotResUsers = oTable.fnGetData();
    $.each(NotResUsers, function (key, value) {
        SendEmail(value[1]);
    });
    $('#Email').foundation('reveal', 'close');
}
function SendEmail(to) {
    var from = CurrentUserEmail;
    var body = 'test';
    var subject = 'test';
    var urlTemplate = _spPageContextInfo.webServerRelativeUrl + "/_api/SP.Utilities.Utility.SendEmail";
    $.ajax({
        contentType: 'application/json',
        url: urlTemplate,
        type: "POST",
        data: JSON.stringify({
            'properties': {
                '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
                'From': from,
                'To': { 'results': [to] },
                'Body': EmailBody,
                'Subject': EmailSubject,
            }
        }
	  ),
        headers: {
            "Accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            
        },
        error: function (err) {
            alert(err.responseText);
            debugger;
        }
    });

}

function Reset() {
    $('#example').dataTable().fnClearTable();
    $('#UserListfieldset').hide();
    $("#FetchUnResUsers").removeAttr('disabled');
    GroupUsers = [];
    SurveyUsers = [];
    EmailBody = "";
    EmailSubject = "";
}

