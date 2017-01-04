(function($){
    $(function(){

        // Side Navbar Menu Width
        $('.button-collapse').sideNav({
            menuWidth: 245
        });

        var modal_cfg_center_small = {
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .5, // Opacity of modal background
            in_duration: 300, // Transition in duration
            out_duration: 200, // Transition out duration
            starting_top: '30%', // Starting top style attribute
            ending_top: '30%', // Ending top style attribute

        };

        var modal_cfg_big_window = {
            dismissible: false, // Modal can be dismissed by clicking outside of the modal
            opacity: .5, // Opacity of modal background
            in_duration: 300, // Transition in duration
            out_duration: 200, // Transition out duration
            starting_top: '95%', // Starting top style attribute
            //ending_top: '100%' // Ending top style attribute

        };

        $('.modal').modal();

        $('#ams-userlogin-window').modal(modal_cfg_center_small);
        $('#ams-userlogout-window').modal(modal_cfg_center_small);
        $('#ams-apisettings-window').modal(modal_cfg_center_small);

        $('#ams-firmwareupgrade-window').modal(modal_cfg_big_window);
        $('#ams-nodesmanage-window').modal(modal_cfg_big_window);
        $('#ams-poolmanage-window').modal(modal_cfg_big_window);

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


        $("#ams-apisettings-window-form-url").val($.jStorage.get("ams_api_url", "/api/"));

        AMS_Chart_FoundBlocks();
        AMS_Chart_HashRate();
        AMS_Chart_NormalNodes();


        AMS_NavBar_IP_Selector_AppendEntry("192.168.1.0/24");
        AMS_NavBar_IP_Selector_AppendEntry("192.168.2.0/24");
        AMS_NavBar_IP_Selector_AppendEntry("192.168.3.0/24");
        AMS_NavBar_IP_Selector_AppendEntry("192.168.4.0/24");

        AMS_StartupTask_ProcessLoggedInUser();

        //AMS_Map();
        AMSNavBarClock();
        AMS_NavBar_MiscInfo_UpdateText();
        AMS_Issues_Update();
        AMS_Map_Update();

    }); // end of document ready
})(jQuery); // end of jQuery name space