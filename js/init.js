(function($){
    $(function(){

        jQuery.fn.extend({
            disable: function(state) {
                return this.each(function() {
                    this.disabled = state;
                });
            }
        });

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

        var modal_cfg_med_window = {
            dismissible: false,
            opacity: .5,
            in_duration: 300,
            out_duration: 200,
            starting_top: '10%',
            ending_top: '10%'
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
        $('#ams-fwupgrade-new-window').modal(modal_cfg_center_small);

        $('#ams-supertac-window').modal({
            ready: function(modal, trigger) {
                AMS_SuperRTAC_UpdateStatus();
            },
            complete: function() {
                clearTimeout(t_supertac_UpdateStatus);
            }
        });

        $('#ams-supertac-new-window').modal({
            dismissible: true,
            opacity: .5,
            in_duration: 300,
            out_duration: 200,
            starting_top: '20%',
            ending_top: '20%'
        });
        $('#ams-supertac-scripts-window').modal(modal_cfg_center_small);
        $('#ams-supertac-editor-window').modal(modal_cfg_big_window_dismissible);

        $('#ams-fwupgrade-window').modal({
            dismissible: false,
            opacity: .5,
            in_duration: 300,
            out_duration: 200,
            starting_top: '10%',
            ending_top: '10%',
            ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                t_FwUpd_UpdateStatus = setTimeout(AMS_FwUpd_UpdateStatus,1000);
            },
            complete: function() {
                clearTimeout(t_FwUpd_UpdateStatus);
            }
        });

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

        Chart.defaults.global.tooltips.mode = 'index';
        // Load saved API URL
        __AMS_API_URL = $.jStorage.get("AMS_3_1_Config_API_URL", "/ams/api/ams_cgi.moe");

        // Set API URL of the API settings window
        $("#ams-apisettings-window-form-url").val(__AMS_API_URL);

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