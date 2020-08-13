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
 * 国策列表UI
 * author yanyuling
 * date 2018/05/28
 * @class DecreePolicyChangePopupView
 */
var DecreePolicyChangePopupView = (function (_super) {
    __extends(DecreePolicyChangePopupView, _super);
    function DecreePolicyChangePopupView() {
        return _super.call(this) || this;
    }
    DecreePolicyChangePopupView.prototype.initView = function () {
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var newSpid = Api.promoteVoApi.getSinfo().nextinfo.spid;
        // this.param.data.spid;
        var startY = 70;
        var spidList = [
            Api.promoteVoApi.getSpid(), newSpid,
        ];
        for (var index = 0; index <= 1; index++) {
            var tmpSpid = spidList[index];
            var policyCfg = Config.PolicyCfg.getPolicyById(tmpSpid);
            var policybg = BaseBitmap.create("decree_policy_bg" + tmpSpid);
            policybg.x = this.viewBg.width / 2 - policybg.width / 2;
            policybg.y = startY;
            this._nodeContainer.addChild(policybg);
            policybg.touchEnabled = true;
            var iconbg = BaseBitmap.create("decree_bookbg");
            iconbg.x = policybg.x + 15;
            iconbg.y = policybg.y + policybg.height / 2 - iconbg.height / 2;
            this._nodeContainer.addChild(iconbg);
            var policyIcon = BaseBitmap.create("decree_policy_icon" + tmpSpid);
            policyIcon.x = iconbg.x + iconbg.width / 2 - policyIcon.width / 2;
            policyIcon.y = iconbg.y + iconbg.height / 2 - policyIcon.height / 2;
            this._nodeContainer.addChild(policyIcon);
            var nameTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN);
            nameTxt.text = LanguageManager.getlocal("decreePolicy_Name" + tmpSpid);
            nameTxt.x = policybg.x + 110;
            nameTxt.y = policyIcon.y + 6;
            this._nodeContainer.addChild(nameTxt);
            var descTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
            descTxt.multiline = true;
            descTxt.lineSpacing = 1;
            descTxt.width = policybg.width - 165;
            var addaddExtent = "" + (policyCfg.addExtent * 100);
            var addaddExtent2 = policyCfg.emAddExtent * 100;
            if (policyCfg.id == "2") {
                descTxt.text = LanguageManager.getlocal("decreePolicy_Desc" + policyCfg.id, ["" + policyCfg.addTimes, "" + policyCfg.emAddTimes]);
            }
            else {
                descTxt.text = LanguageManager.getlocal("decreePolicy_Desc" + policyCfg.id, ["" + policyCfg.addTimes, "" + addaddExtent, "" + addaddExtent2]);
            }
            descTxt.x = nameTxt.x;
            descTxt.y = nameTxt.y + nameTxt.height + 3;
            this._nodeContainer.addChild(descTxt);
            if (index == 0) {
                var arrow = BaseBitmap.create("decree_arrow1");
                arrow.x = this.viewBg.width / 2 - arrow.width / 2;
                arrow.y = policybg.y + policybg.height;
                this._nodeContainer.addChild(arrow);
                startY = startY + arrow.height + 20;
                var stampImg = BaseBitmap.create("decree_policy_stamp");
                stampImg.x = policybg.x + +policybg.width - stampImg.width - 15;
                stampImg.y = policybg.y + policybg.height / 2 - stampImg.height / 2;
                ;
                this._nodeContainer.addChild(stampImg);
            }
            startY += 100;
        }
        var tipTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WARN_YELLOW);
        tipTxt.x = this.viewBg.width / 2;
        tipTxt.y = startY + 50;
        this._nodeContainer.addChild(tipTxt);
        this._tipTxt = tipTxt;
        this.tick();
    };
    DecreePolicyChangePopupView.prototype.tick = function () {
        var zeroSec = App.DateUtil.getWeeTs(GameData.serverTime);
        var lastSec = zeroSec + 60 * 60 * 24;
        var str = App.DateUtil.getFormatBySecond(lastSec - GameData.serverTime, 1);
        this._tipTxt.text = LanguageManager.getlocal("decreePolicyTipTxt", [str]);
        this._tipTxt.anchorOffsetX = this._tipTxt.width / 2;
        return true;
    };
    DecreePolicyChangePopupView.prototype.getShowHeight = function () {
        return 380;
    };
    // 背景图名称
    DecreePolicyChangePopupView.prototype.getBgName = function () {
        return "decree_popbg";
    };
    DecreePolicyChangePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "decree_policy_detailbg", "decree_policy_bg1", "decree_policy_bg2", "decree_policy_bg3", "decree_policy_bg4", "decree_arrow1",
            "decree_popbg", "decree_policy_icon1", "decree_policy_stamp", "decree_policy_icon2", "decree_policy_icon3", "decree_policy_icon4",
            "decree_bookbg",
        ]);
    };
    DecreePolicyChangePopupView.prototype.dispose = function () {
        this._nodeContainer = null;
        this._tipTxt = null;
        _super.prototype.dispose.call(this);
    };
    return DecreePolicyChangePopupView;
}(PopupView));
__reflect(DecreePolicyChangePopupView.prototype, "DecreePolicyChangePopupView");
//# sourceMappingURL=DecreePolicyChangePopupView.js.map