/**
 * Api管理类，统一通过这里调取Api,每次新增Api时，需要在init方法中new
 * author dmj
 * date 2017/9/16
 * @class PlayerVoApi
 */
var Api;
(function (Api) {
    function formatUserData(rData) {
        var mData = rData.model;
        var data = rData.data;
        if (mData) {
            for (var model in mData) {
                // 用户数据
                var apiName = model + "VoApi";
                apiName = App.StringUtil.firstCharToUper(apiName);
                if (Api[apiName]) {
                    if (Api[apiName].formatData) {
                        Api[apiName].formatData(mData[model]);
                    }
                    else {
                        App.LogUtil.log(apiName + " lost formatData");
                    }
                }
                else {
                    App.LogUtil.log("lost " + apiName);
                }
                App.MsgHelper.dispEvt(MsgConst.REFRESH_MODEl, model);
                App.MsgHelper.dispEvt("model_" + model, model);
            }
        }
        if (data) {
            data.initRedpoint && Api.RedpointVoApi.formatInitRedpoint(data.initRedpoint);
            data.switch && Api.SwitchVoApi.formatData(data.switch);
        }
        if (data.regdt) {
            GameData.regdt = data.regdt;
        }
        Config.RechargeCfg.moneyType = data.moneyType;
        // if(data.orderCfg)
        // {
        // 	Config.RechargeCfg.formatOrderid(data.orderCfg);
        // }
    }
    Api.formatUserData = formatUserData;
    function dispose() {
        for (var key in Api) {
            if (Api[key] && (key.indexOf("VoApi") > -1)) {
                if (Api[key] && Api[key].dispose) {
                    Api[key].dispose();
                }
                else {
                    if (true) {
                        alert("需要实现 " + key + ".dispose()" + "\n找" + key + ".ts文件对应功能负责人");
                    }
                }
            }
        }
    }
    Api.dispose = dispose;
})(Api || (Api = {}));
//# sourceMappingURL=Api.js.map