/**
 * Created by root on 17-3-17.
 */

AMS.Version = {
    Init: function () {
        let getverreq = new AMS.API.Request({
            Blocking: true,
            RawData: {
                operation: 'version',
                data: {

                }
            },
            DoneCallback: function (parsed) {
                AMS.Version.Backend = parsed.data.version.number.toString();
                if (parsed.data.version.type === 1)
                    AMS.Version.Backend += '-dev';
            }
        });

        getverreq.Dispatch();
    },

    WebClient: "4.0.0-dev",
    Backend: ""
};