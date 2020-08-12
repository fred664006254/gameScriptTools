new window.Game(
    {
        onLoad: function (app) {
            if (GameStatusInfo) {
                window["LimiGameStatusInfo"] = GameStatusInfo;
                window["LimiBK"] = BK;
                console.log("=====>set GameStatusInfo into localStorage");
                window.localStorage.setItem("LimiGameStatusInfo", JSON.stringify(GameStatusInfo));
                window.localStorage.setItem("LimiBK", JSON.stringify(BK));
            } else if (window.localStorage.getItem("LimiGameStatusInfo")) {
                console.log("=====>get GameStatusInfo from localStorage");
                window["LimiGameStatusInfo"] = JSON.parse(window.localStorage.getItem("LimiGameStatusInfo"));
                window["LimiBK"] = window.localStorage.getItem("LimiBK") ? JSON.parse(window.localStorage.getItem("LimiBK")) : "";
            }

            if (BK && BK.QQ && BK.QQ.isOpenActivityPage && BK.QQ.isOpenActivityPage()) {
                BK.QQ.showRedPackageActivityPage();
            }

            if (window["LimiInitCallback"]) {
                console.log("call LimiInitCallback");
                window["LimiInitCallback"]();
            }
        },
        onShare: function (app) {
            return {
                summary: window["rsdkShareDesc"] ? window["rsdkShareDesc"] : "",
                picUrl: window["rsdkShareImgUrl"] ? window["rsdkShareImgUrl"] : "",
                gameId: GameStatusInfo.gameId,
                roomId: 0,
                isSelectFriend: 1,
                extendInfo: window["rsdkShareExt"] ? window["rsdkShareExt"] : ""
            };
        },
        onMaximize: function (app) {
            console.log("onMaximize");
        },
        onMinimize: function (app) {
            console.log("onMinimize");
        },
        onEnterBackground: function (app) {
            console.log("onEnterBackground");
            if (window["h5limiplugin"].AppForegroundStatusChangeCallback) {
                window["h5limiplugin"].AppForegroundStatusChangeCallback("0")
            }
        },
        onEnterForeground: function (app) {
            console.log("onEnterForeground");
            if (window["h5limiplugin"].AppForegroundStatusChangeCallback) {
                window["h5limiplugin"].AppForegroundStatusChangeCallback("1")
            }
        },
    })