(function($){
    $(function(){

        // Side Navbar Menu Width
        $('.button-collapse').sideNav({
            menuWidth: 245
        });

        var modal_cfg_center_small = {
            dismissible: true, 
            opacity: .5, 
            in_duration: 300,
            out_duration: 200,
            starting_top: '30%',
            ending_top: '30%'
        };

        var modal_cfg_big_window = {
            dismissible: false, 
            opacity: .5, 
            in_duration: 300,
            out_duration: 200,
            starting_top: '0%',
            ending_top: '1%'

        };

        var modal_cfg_big_window_dismissible = {
            dismissible: true, 
            opacity: .5, 
            in_duration: 300,
            out_duration: 200,
            starting_top: '0%',
            ending_top: '1%'
        };

        $('.modal').modal();

        $('#ams-userlogin-window').modal(modal_cfg_center_small);
        $('#ams-userlogout-window').modal(modal_cfg_center_small);
        $('#ams-apisettings-window').modal(modal_cfg_center_small);
        $('#ams-themesettings-window').modal(modal_cfg_center_small);

        $('#ams-firmwareupgrade-window').modal(modal_cfg_big_window);
        $('#ams-nodesmanage-window').modal();
        $('#ams-poolmanage-window').modal(modal_cfg_big_window);

        $('#ams-nodedetails-window').modal(modal_cfg_big_window_dismissible);

        $('.dropdown-button').dropdown({
                inDuration: 300,
                outDuration: 225,
                constrain_width: false, // Does not change width of dropdown to that of the activator
                hover: false, // Activate on hover
                gutter: 0, // Spacing from edge
                belowOrigin: true, // Displays dropdown below the button
                alignment: 'left' // Displays dropdown with edge aligned to the left of button
            }
        );

        // Load saved API URL
        __AMS_API_URL = $.jStorage.get("AMS_3_1_Config_API_URL", "/api/");

        // Set API URL of the API settings window
        $("#ams-apisettings-window-form-url").val(__AMS_API_URL);

        // Make all forms submit on enter
        Reimu_MakeAllFormSubmitOnEnter();

        // Load & auto refresh the charts
        AMS_Chart_HashRate();
        AMS_Chart_NormalNodes();

        // FIXME: Placeholder
        AMS_NavBar_IP_Selector_AppendEntry("192.168.1.0/24");

        // Detect logged in user on page load
        AMS_StartupTask_ProcessLoggedInUser();

        // Realtime clock on navbar
        AMSNavBarClock();

        // Realtime hashrate and alive nodes&modules count on navbar
        AMS_NavBar_MiscInfo_UpdateText();

        // Auto refreshes issues card
        AMS_Issues_Update();

        // Auto refreshes map card
        AMS_Map_Update();

    }); // end of document ready
})(jQuery); // end of jQuery name space 喵喵喵