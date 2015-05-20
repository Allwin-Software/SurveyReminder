<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ page inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" masterpagefile="~masterurl/default.master" language="C#" %>

<%@ register tagprefix="Utilities" namespace="Microsoft.SharePoint.Utilities" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ register tagprefix="WebPartPages" namespace="Microsoft.SharePoint.WebPartPages" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:content contentplaceholderid="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
   
    
    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <link href="../css/foundation.min.css" type="text/css" rel="stylesheet" />
    <link href="../css/foundation-icons.css" rel="stylesheet" type="text/css" />
    <link href="../css/normalize.css" type="text/css" rel="stylesheet" />
    <link href="../css/jquery.dataTables.min.css" rel="stylesheet" />
<link href="../css/Survey.css" rel="stylesheet" />
    <!-- Add your JavaScript to the following file -->
    <script src="../js/foundation.min.js" type="text/javascript"></script>
    <script src="../js/jquery.dataTables.min.js" type="text/javascript" ></script>
    <script type="text/javascript" src="../Scripts/App.js"></script>
    
</asp:content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:content contentplaceholderid="PlaceHolderPageTitleInTitleArea" runat="server">
    Page Title
</asp:content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:content contentplaceholderid="PlaceHolderMain" runat="server">

    

    <div class="row">
        <div class="icon-bar five-up">
  <a class="item" onclick="Reset()">
    <i class="fi-home"></i>
    <label>Home</label>
  </a>
  <a class="item" href="https://surveyremainder.codeplex.com/documentation" target="_blank" >
      <i class="fi-page-multiple"></i>
    <label>Documentation</label>
  </a>
  <a class="item" href="https://surveyremainder.codeplex.com/discussions" target="_blank">
    <i class="fi-comments"></i>
    <label>Discussion</label>
  </a>
  <a class="item" href="https://surveyremainder.codeplex.com/workitem/list/basic" target="_blank">
    <i class="fi-flag"></i>
    <label>Report Bug</label>
  </a>
  <a class="item" href="https://surveyremainder.codeplex.com/" target="_blank">
    <i class="fi-info"></i>
    <label>About</label>
  </a>
</div>
        <br />
        <div>
            Select Survey <select id="SurveyList"></select>
        </div>
        <br />
        <div>
            Select Group <select id="GroupList"></select>
        </div>
        <br />
        <div class="text-center">
        <a href="#" class="button round" id="FetchUnResUsers" onclick="FetchUnrespondedUsers()">Fetch Not Responded User</a>
            </div>
        <br />
   <fieldset id="UserListfieldset">
<table width="100%" class="display" id="example" cellspacing="0">

        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
            </tr>
        </thead>
       
        <tbody>
        </tbody>
    </table>
        <div class="text-center">
            <a href="#" class="button round" onclick="OpenEmailTemplateModel()">SendEmail</a>
            </div>
       </fieldset>     
    </div>

    <div id="Email" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
  <div>
      <label>Subject
          <input type="text" id="EmailSubject" />
      </label>
  </div>
        <div>
            <label>Email Body
                <textarea id="EmailBody"></textarea>
            </label>
        </div>
        <br />
        <div class="text-center">
            <a href="#" class="button round" onclick="UpdateEmailTemplate()">Send</a>
        </div>
</div>
</asp:content>
