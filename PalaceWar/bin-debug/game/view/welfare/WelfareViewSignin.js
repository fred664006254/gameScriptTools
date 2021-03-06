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
var WelfareViewSignin = (function (_super) {
    __extends(WelfareViewSignin, _super);
    function WelfareViewSignin() {
        var _this = _super.call(this) || this;
        _this._mainTaskHandKey = null;
        return _this;
    }
    WelfareViewSignin.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        var totalSignDay = Api.arrivalVoApi.getTotalSignDay();
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_WELFARE_SIGNIN, this.clickItemHandler, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_ARRIVAL), this.useCallback, this);
        var totalDayTF = ComponentManager.getTextField(totalSignDay + "", TextFieldConst.FONTSIZE_TITLE_SMALL);
        totalDayTF.x = 105 - totalDayTF.width / 2;
        totalDayTF.y = 205 - totalDayTF.height / 2;
        this.addChild(totalDayTF);
        if (PlatformManager.checkIsKRSp()) {
            totalDayTF.x = 130 - totalDayTF.width / 2;
        }
        if (PlatformManager.checkIsEnLang()) {
            totalDayTF.x = 130 - totalDayTF.width / 2;
        }
        this._signRewardList = Api.arrivalVoApi.getSignRewardList();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 492, GameConfig.stageHeigth - 312 - 40);
        this._scrollList = ComponentManager.getScrollList(WelfareViewSignScrollItem, this._signRewardList, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(0, 223 + 20);
        var showIndex = Api.arrivalVoApi.getIndexByCurday();
        showIndex = showIndex > 2 ? showIndex - 1 : 1;
        this._scrollList.setScrollTopByIndex(showIndex);
        var rewardIndex = -1;
        for (var i = 0; i < this._signRewardList.length; i++) {
            if (this._signRewardList[i].flag == 0) {
                rewardIndex = i;
                break;
            }
        }
        App.LogUtil.log("rewardIndex " + rewardIndex);
        // let mp = BaseBitmap.create("guide_hand");
        // let rewardItem = <WelfareViewSignScrollItem>this._scrollList.getItemByIndex(rewardIndex);
        // rewardItem.addChild(mp);
        // mp.setPosition(rewardItem.width/2, 0);
        if (rewardIndex != -1) {
            var rewardItem_1 = this._scrollList.getItemByIndex(rewardIndex);
            if (rewardItem_1) {
                egret.callLater(function () {
                    _this._scrollList.setScrollTopByIndex(rewardIndex);
                    _this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(rewardItem_1, rewardItem_1.width / 2 + 110, 60, [rewardItem_1], 113, true, function () {
                        return true;
                    }, _this, 0.6);
                }, this);
            }
        }
        if (totalSignDay > Config.GameprojectCfg.sign100Day && totalSignDay <= Config.GameprojectCfg.sign365Day) {
            this.showChoshesPreview(3);
        }
        else if (totalSignDay > Config.GameprojectCfg.sign365Day && totalSignDay <= Config.Signup500dayCfg.showDay) {
            for (var i = 1; i <= 3; i++) {
                var btn = ComponentManager.getButton("sign_500_icon" + i, null, this.btnClick, this, [i]);
                btn.setPosition(-55 + i * 80, 70);
                this.addChild(btn);
            }
            this.showChoshesPreview(1);
        }
        else if (totalSignDay > Config.Signup500dayCfg.showDay && totalSignDay <= Config.Signup500dayCfg.showLastDay()) {
            this.showChoshesPreview(2);
        }
    };
    WelfareViewSignin.prototype.showChoshesPreview = function (type) {
        //衣装预览
        var view = this;
        var topBg = { x: 300, y: 40 };
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        // this._effect.setScale(2);
        var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
        skinTxtEffect.setPosition(topBg.x + 103 - skinTxtEffectBM.width / 2, topBg.y + 160 - skinTxtEffectBM.height / 2);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChild(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        skinTxt.setPosition(topBg.x + 103, topBg.y + 160);
        this.addChild(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxteffect_ = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxteffect_.anchorOffsetX = skinTxteffect_.width / 2;
        skinTxteffect_.anchorOffsetY = skinTxteffect_.height / 2;
        skinTxteffect_.setPosition(topBg.x + 103, topBg.y + 160);
        this.addChild(skinTxteffect_);
        skinTxteffect_.blendMode = egret.BlendMode.ADD;
        skinTxteffect_.alpha = 0;
        egret.Tween.get(skinTxteffect_, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        if (type == 3) {
            skinTxtEffect.x -= 20;
            skinTxt.x -= 20;
            skinTxteffect_.x -= 20;
        }
        //透明点击区域
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 180;
        touchPos.height = 176;
        touchPos.setPosition(topBg.x, topBg.y);
        view.addChild(touchPos);
        touchPos.addTouchTap(function () {
            if (type == 1) {
                ViewController.getInstance().openView(ViewConst.POPUP.CLOSHESPREVIEWWIFEINFOPOPUPVIEW, { wid: "221" });
                // ViewController.getInstance().openView(ViewConst.POPUP.CLOSHESPREVIEWSKINPOPUPVIEW,{sid:"2211"});
            }
            else if (type == 2) {
                var titleStr = LanguageManager.getlocal("clothespreviewTip", ["560", Config.WifeskinCfg.getWifeCfgById("2211").name]);
                ViewController.getInstance().openView(ViewConst.POPUP.CLOSHESPREVIEWSKINPOPUPVIEW, { sid: "2211", title: titleStr });
            }
            else if (type == 3) {
                var titleStr = Config.GameprojectCfg.sign365DayReward;
                var titleId = titleStr.split("_")[1];
                var topMsg = LanguageManager.getlocal("acSingleDay365_1");
                ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONTITLEREWARDPOPUPVIEW, { titleIds: [titleId], bgType: 3, topMsg: topMsg });
            }
        }, ViewController);
    };
    WelfareViewSignin.prototype.btnClick = function (idx) {
        var itemvo;
        switch (idx) {
            case 1:
                itemvo = GameData.getRewardItemVoByIdAndType("10", "221");
                break;
            case 2:
                itemvo = GameData.getRewardItemVoByIdAndType("11", "4020");
                break;
            case 3:
                itemvo = GameData.getRewardItemVoByIdAndType("1010", "5025");
                break;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, itemvo);
    };
    WelfareViewSignin.prototype.useCallback = function (event) {
        var welfareViewSignScrollItem = this._scrollList.getItemByIndex(this._index);
        if (welfareViewSignScrollItem) {
            welfareViewSignScrollItem.updateButtonState();
        }
        // let rewardList = this._signRewardList[this._index].rewardList;
        // if(rewardList)
        // {
        // 	let runPos =  new egret.Point(this._collectFlag.x,this._collectFlag.y - 40) ;
        // 	App.CommonUtil.playRewardFlyAction(rewardVoList,runPos);
        // }
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
    };
    WelfareViewSignin.prototype.clickItemHandler = function (event) {
        this._index = Number(event.data.index);
        // let welfareViewSignScrollItem = <WelfareViewSignScrollItem>this._scrollList.getItemByIndex(this._index);
        // if(welfareViewSignScrollItem)
        // {
        // 	welfareViewSignScrollItem.updateButtonState();
        // }
        NetManager.request(NetRequestConst.REQUEST_USER_ARRIVAL, null);
    };
    WelfareViewSignin.prototype.getResourceList = function () {
        var arr = [];
        if (Api.switchVoApi.checkOpenNewSignIn()) {
            arr = ["signin5_bg", "signin6_bg", "signin4_bg"];
            var totalSignDay = Api.arrivalVoApi.getTotalSignDay();
            if (totalSignDay > Config.GameprojectCfg.sign365Day && totalSignDay <= Config.Signup500dayCfg.showDay) {
                arr.push(Api.switchVoApi.checkOpenBlueWife() ? "sign_bg_500_blueType" : "sign_bg_500", "sign_500_icon1", "sign_500_icon1_down", "sign_500_icon2", "sign_500_icon2_down", "sign_500_icon3", "acwealthcarpview_skineffect1", "acwealthcarpview_servantskintxt", "sign_500_icon3_down");
            }
            else if (totalSignDay > Config.Signup500dayCfg.showDay && totalSignDay <= Config.Signup500dayCfg.showLastDay()) {
                arr.push("sign_bg_560", "acwealthcarpview_skineffect1", "acwealthcarpview_servantskintxt");
            }
            else if (totalSignDay > Config.Signup500dayCfg.showLastDay()) {
                arr.push("sign_bg_600", "sign_bg_700", "sign_bg_800", "sign_bg_900");
            }
            else {
                arr.push("acwealthcarpview_skineffect1", "acwealthcarpview_servantskintxt");
            }
        }
        return _super.prototype.getResourceList.call(this).concat([
            "augustsignin_btn", "augustsignin_btn_down",
            "signin2_bg", "signin3_bg", "guide_hand"
        ]).concat(arr);
    };
    WelfareViewSignin.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_WELFARE_SIGNIN, this.clickItemHandler, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_ARRIVAL), this.useCallback, this);
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    return WelfareViewSignin;
}(WelfareViewTab));
__reflect(WelfareViewSignin.prototype, "WelfareViewSignin");
//# sourceMappingURL=WelfareViewSignin.js.map