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
 * 更新有礼
 * @author weixiaozhe  2020.6.1
 */
var AcNewPackView = (function (_super) {
    __extends(AcNewPackView, _super);
    function AcNewPackView() {
        var _this = _super.call(this) || this;
        _this._detailBtn = null;
        _this.aid = App.StringUtil.firstCharToLower(_this.getClassName().replace("Ac", "").replace("View", ""));
        return _this;
    }
    AcNewPackView.prototype.getTitleStr = function () {
        return null;
    };
    AcNewPackView.prototype.getTitleBgName = function () {
        return null;
    };
    AcNewPackView.prototype.getBgName = function () {
        return null;
    };
    AcNewPackView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcNewPackView.prototype.getRwdCallback = function (event) {
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if (rData.rewards) {
            // let rewardVoList = GameData.formatRewardItem(rData.rewards);
            // App.CommonUtil.playRewardFlyAction(rewardVoList);
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rData.rewards, "isPlayAni": true, "callback": null, "handler": null });
        }
    };
    AcNewPackView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_NEWPACK_GETREWARDS, this.getRwdCallback, this);
        var botbg = BaseBitmap.create("ac_newpackbg");
        botbg.x = GameConfig.stageWidth / 2 - botbg.width / 2;
        botbg.y = GameConfig.stageHeigth / 2 - botbg.height / 2 - 30;
        this.addChild(botbg);
        var wife = BaseBitmap.create("wife_skin_2071");
        wife.setScale(0.5);
        wife.x = -20;
        wife.y = botbg.y + 70;
        this.addChild(wife);
        var circle = new egret.Shape();
        circle.graphics.beginFill(0x542020, 1);
        circle.graphics.drawRect(wife.x + 20, wife.y, wife.width * wife.scaleX, wife.height * wife.scaleY - 55);
        circle.graphics.endFill();
        this.addChild(circle);
        wife.mask = circle;
        var nameImg = BaseBitmap.create("ac_newpacktitle");
        this.setLayoutPosition(LayoutConst.lefttop, nameImg, botbg, [50, -7]);
        this.addChild(nameImg);
        var descImg = BaseBitmap.create("ac_newpacktxt");
        this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descImg, botbg, [70, 10]);
        this.addChild(descImg);
        var deskImg = BaseBitmap.create("ac_newpackdesk");
        this.setLayoutPosition(LayoutConst.horizontalCenterbottom, deskImg, botbg, [0, -30]);
        this.addChild(deskImg);
        var itembg = BaseBitmap.create("ac_newpackitembg");
        this.addChild(itembg);
        var rewards = this.cfg.getReward;
        var rewardIconList = GameData.getRewardItemIcons(rewards, true, false);
        var container = new BaseDisplayObjectContainer();
        var space = 5;
        var scale = 0.63;
        var right = itembg.x + itembg.width;
        for (var i = 0; i < rewardIconList.length; i++) {
            rewardIconList[i].setScale(scale);
            rewardIconList[i].x = i * rewardIconList[i].width * scale + i * space;
            container.addChild(rewardIconList[i]);
        }
        itembg.width = container.width + 10;
        this.setLayoutPosition(LayoutConst.rightbottom, itembg, deskImg, [60, 45]);
        container.x = itembg.x + itembg.width / 2 - container.width / 2;
        container.y = itembg.y + itembg.height / 2 - container.height / 2;
        this.addChild(container);
        var botTxt = ComponentManager.getTextField(LanguageManager.getlocal("acNewPackDesc1"), 20);
        botTxt.setPosition(270, itembg.y - botTxt.height - 5);
        this.addChild(botTxt);
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal("acNewPackDesc3"), 18);
        descTxt.width = 300;
        descTxt.textAlign = egret.HorizontalAlign.CENTER;
        descTxt.lineSpacing = 20;
        descTxt.x = botTxt.x + botTxt.width / 2 - descTxt.width / 2;
        descTxt.y = descImg.y + 40;
        this.addChild(descTxt);
        descTxt.visible = this.vo.isGetReward() == 0;
        descImg.visible = !descTxt.visible;
        var closebtn = ComponentManager.getButton("ac_newpackclose", "", function () {
            _this.hide();
        }, this);
        closebtn.x = botbg.x + botbg.width - 52;
        closebtn.y = botbg.y + 53;
        this.addChild(closebtn);
        var rulebtn = ComponentManager.getButton(ButtonConst.BTN2_RULE, "", function () {
            var msg = LanguageManager.getlocal("acNewPackRule");
            ViewController.getInstance().openView(ViewConst.POPUP.RULEINFOPOPUPVIEW, msg);
        }, this);
        rulebtn.x = 15;
        rulebtn.y = nameImg.y + 20;
        this.addChild(rulebtn);
        var detailBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "", function () {
            var num = _this.vo.isGetReward();
            if (_this.vo.checkIsInEndShowTime() && num == -1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (num == 1) {
                _this.request(NetRequestConst.REQUEST_NEWPACK_GETREWARDS, { activeId: _this.vo.aidAndCode });
            }
            else if (num == 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acNewPackTips"));
            }
        }, this);
        this.setLayoutPosition(LayoutConst.horizontalCenterbottom, detailBtn, deskImg, [0, -70]);
        this.addChild(detailBtn);
        this._detailBtn = detailBtn;
        this.refreshView();
        var botTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acNewPackDesc2"), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        botTxt2.x = deskImg.x + deskImg.width / 2 + 5;
        botTxt2.y = deskImg.y + deskImg.height - 20;
        this.addChild(botTxt2);
    };
    AcNewPackView.prototype.avgendCallback = function () {
    };
    //请求回调
    AcNewPackView.prototype.receiveData = function (data) {
        if (!data.ret) {
            App.CommonUtil.showTip(data.data.ret);
        }
        if (data.ret && data.data.cmd == NetRequestConst.REQUEST_AGGREGATION_GETINFO) {
        }
    };
    AcNewPackView.prototype.getResourceList = function () {
        var baseList = [
            "ac_newpacktitle",
            "ac_newpacktxt",
            "ac_newpackdesk",
            "ac_newpackbg",
            "ac_newpackclose",
            "ac_newpackitembg",
            "wife_skin_2071"
        ];
        return _super.prototype.getResourceList.call(this).concat(baseList);
    };
    AcNewPackView.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        var num = this.vo.isGetReward();
        this._detailBtn.setText("acNewPackBtn1");
        if (num == 2) {
            this._detailBtn.setEnable(false);
            this._detailBtn.setText("acNewPackBtn2");
        }
        else if (num == 0) {
            this._detailBtn.setGray(true);
        }
    };
    Object.defineProperty(AcNewPackView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewPackView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewPackView.prototype, "code", {
        get: function () {
            return this.param ? this.param.data : "";
        },
        enumerable: true,
        configurable: true
    });
    AcNewPackView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_NEWPACK_GETREWARDS, this.getRwdCallback, this);
    };
    return AcNewPackView;
}(PopupView));
__reflect(AcNewPackView.prototype, "AcNewPackView");
//# sourceMappingURL=AcNewPackView.js.map