var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * FQ游戏策略
 * author 张朝阳
 * date 2018/7/23
 * @class FqStrategyView
 */
var FqStrategyView = (function (_super) {
    __extends(FqStrategyView, _super);
    function FqStrategyView() {
        return _super.call(this) || this;
    }
    FqStrategyView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["fqstrategyview_bg", "fqstrategyview_titlebg"]);
    };
    FqStrategyView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_REFRESH_MODE, this.checkRedPoint, this);
        var bottomBg = BaseLoadBitmap.create("servant_bottombg");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth - 75;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - this.getTitleButtomY();
        this.addChildToContainer(bottomBg);
        //检测第三个红点
        this.checkRedPoint();
    };
    FqStrategyView.prototype.checkRedPoint = function () {
        if (Api.switchVoApi.checkOpenStrengthen() && Config.GameprojectCfg.closeFunction && Api.playerVoApi.getPlayerLevel() < Config.GameprojectCfg.closeFunction) {
            var fqSwitch = LocalStorageManager.get(LocalStorageConst.LOCAL_FQSTRATEGY_SWITCH);
            if (Api.strengthenVoApi.checkNpcMessage() && fqSwitch != "OFF") {
                this.tabbarGroup.addRedPoint(2);
            }
            else {
                this.tabbarGroup.removeRedPoint(2);
            }
        }
    };
    FqStrategyView.prototype.getTabbarTextArr = function () {
        var tabArr = [
            "fqStrategyViewTab1",
            "fqStrategyViewTab2",
        ];
        if (Api.switchVoApi.checkOpenStrengthen() && Config.GameprojectCfg.closeFunction && Api.playerVoApi.getPlayerLevel() < Config.GameprojectCfg.closeFunction) {
            tabArr.push("fqStrategyViewTab3");
        }
        return tabArr;
    };
    FqStrategyView.prototype.getRequestData = function () {
        if (GameData.fqGameStrategyData == null) {
            return;
        }
        return { requestType: NetRequestConst.REQUST_FAQ_GETFAQCONTENT, requestData: {} };
    };
    FqStrategyView.prototype.receiveData = function (data) {
        if (data.ret == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("resLoadErrorTip"));
            return;
        }
        GameData.fqGameStrategyData.intro = data.data.data.intro;
        if (data.data.data.rcontent) {
            GameData.fqGameStrategyData.rcontent = data.data.data.rcontent;
        }
        else {
            GameData.fqGameStrategyData.rcontent = [];
        }
        if (data.data.data.faqcontent) {
            GameData.fqGameStrategyData.faqcontent = data.data.data.faqcontent;
        }
        else {
            GameData.fqGameStrategyData.faqcontent = [];
        }
    };
    FqStrategyView.prototype.getTitleStr = function () {
        return "fqStrategyViewTitle";
    };
    FqStrategyView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_REFRESH_MODE, this.checkRedPoint, this);
        _super.prototype.dispose.call(this);
    };
    return FqStrategyView;
}(CommonView));
__reflect(FqStrategyView.prototype, "FqStrategyView");
//# sourceMappingURL=FqStrategyView.js.map