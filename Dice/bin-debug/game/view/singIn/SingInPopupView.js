/*
 *@description: 每日签到
 *@author: yangtao
 *@update date: 2020-06-4 09:46:37
 *@version
 */
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
var SingInPopupView = (function (_super) {
    __extends(SingInPopupView, _super);
    function SingInPopupView() {
        var _this = _super.call(this) || this;
        _this.signInfoList = [];
        _this._dbxq = null;
        return _this;
    }
    SingInPopupView.prototype.getNetConstEventArr = function () {
        return [
            NetConst.SIGNINFO_SIGN
        ];
    };
    SingInPopupView.prototype.netEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case NetConst.SIGNINFO_SIGN:
                view.signCom(evt);
                break;
        }
    };
    SingInPopupView.prototype.initView = function () {
        this.initsignInfo();
        //App.MsgHelper.addEvt(NetConst.SIGNINFO_SIGN, this.refreshList, this);
        this.listView = ComponentMgr.getScrollList(SingInItem, this.signInfoList, new egret.Rectangle(0, 0, 522, 402), 6);
        this.listView.bounces = false;
        this.listView.horizontalScrollPolicy = "off";
        this.listView.verticalScrollPolicy = "off";
        this.listView.width = 522;
        this.listView.height = 402;
        this.addChildToContainer(this.listView);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this.listView, this.viewBg, [6, 91]);
        this.treasureBox = BaseBitmap.create(Api.SigninfoVoApi.getSignWeek() ? "singin_14" : "singin_7");
        this.addChildToContainer(this.treasureBox);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.treasureBox, this.viewBg, [0, 123]);
        this.treasureBox.touchEnabled = true;
        this.treasureBox.addTouchTap(this.signBox, this);
        this.signMask = BaseBitmap.create("singin_mask_2");
        this.addChildToContainer(this.signMask);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.signMask, this.viewBg, [0, 123]);
        this.signMask.visible = false;
        this.signGet = BaseBitmap.create("singin_seven_get");
        this.addChildToContainer(this.signGet);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, this.signGet, this.treasureBox);
        this.signGet.visible = false;
        this.dbxqGroup = new BaseDisplayObjectContainer();
        this.dbxqGroup.width = 520;
        this.dbxqGroup.height = 217;
        this.addChildToContainer(this.dbxqGroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.dbxqGroup, this.viewBg, [0, 113]);
        this.dbxqGroup.mask = new egret.Rectangle(0, 0, this.dbxqGroup.width, this.dbxqGroup.height);
        //if(Api.SigninfoVoApi.isSignWeek()&&(Api.SigninfoVoApi.getSignHsa())){
        this._dbxq = App.DragonBonesUtil.getLoadDragonBones("royalpass_lb_2");
        this._dbxq.scaleX = 0.65;
        this._dbxq.scaleY = 0.85;
        this._dbxq.blendMode = egret.BlendMode.ADD;
        this.dbxqGroup.addChild(this._dbxq);
        this._dbxq.setPosition(280, 100);
        this._dbxq.visible = true;
        //}
        this.buyBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, LangMger.getlocal("menu_sing_in"), this.signBtn, this.viewBg);
        this.addChildToContainer(this.buyBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.buyBtn, this.viewBg, [0, 38]);
        this.reSignBtn();
    };
    SingInPopupView.prototype.reSignBtn = function () {
        if (Api.SigninfoVoApi.gethasSign()) {
            App.DisplayUtil.changeToGray(this.buyBtn);
            this.buyBtn.touchEnabled = false;
        }
        else {
            this.buyBtn.touchEnabled = true;
        }
        if (Api.SigninfoVoApi.getSignSeven()) {
            this.signMask.visible = true;
            this.signGet.visible = true;
            this.treasureBox.touchEnabled = false;
            if (this._dbxq) {
                this._dbxq.visible = false;
            }
        }
    };
    SingInPopupView.prototype.initBg = function () {
        _super.prototype.initBg.call(this);
        //this.viewBg.width = this.getShowWidth();
    };
    SingInPopupView.prototype.refreshList = function () {
        this.signInfoList = Api.SigninfoVoApi.getSignData();
        if (this.listView != null) {
            this.listView.refreshData(this.signInfoList);
        }
    };
    SingInPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["singin_bg",
            "singin_tittle", "singin_get_bg",
            "singin_geting_bg", "singin_get",
            "singin_14", "singin_7",
            "singin_light", "singin_seven_get",
            "singin_mask_1", "singin_mask_2"]);
    };
    SingInPopupView.prototype.signBox = function () {
        if (Api.SigninfoVoApi.isSignWeek() && Api.SigninfoVoApi.getSignHsa()) {
            NetManager.request(NetConst.SIGNINFO_SIGN, {});
        }
        else {
            var freerewardvo = GameData.formatRewardItem(Api.SigninfoVoApi.getShowWordData())[0];
            ViewController.getInstance().openView(ViewConst.BOXREWARDDETAILPOPUPVIEW, {
                title: LangMger.getlocal(Api.SigninfoVoApi.getSignWeek() ? "boxname_1003" : "boxname_1004"),
                handler: this,
                needCancel: true,
                needClose: 1,
                boxId: freerewardvo.id,
                isbuy: false,
            });
        }
    };
    SingInPopupView.prototype.getRequestData = function () {
        return null;
    };
    SingInPopupView.prototype.initsignInfo = function () {
        this.signInfoList = Api.SigninfoVoApi.getSignData();
    };
    SingInPopupView.prototype.getShowHeight = function () {
        return 838;
    };
    SingInPopupView.prototype.getshowwidth = function () {
        return 565;
    };
    // 背景图名称
    SingInPopupView.prototype.getBgName = function () {
        return "singin_bg";
    };
    SingInPopupView.prototype.initTitle = function () {
    };
    SingInPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.titleCon = new BaseDisplayObjectContainer();
        this.addChild(this.titleCon);
        var timeBg = BaseBitmap.create("singin_tittle");
        this.titleCon.addChild(timeBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, timeBg, this.viewBg, [0, 5]);
        var titleText = ComponentMgr.getTextField('11', TextFieldConst.SIZE_32, ColorEnums.white);
        titleText.text = LangMger.getlocal("menu_sing_in_title");
        titleText.stroke = 2;
        titleText.strokeColor = 0x890F0F;
        this.titleCon.addChild(titleText);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, titleText, timeBg, [0, -5]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, this.closeBtn, this.viewBg, [-2, -2]);
    };
    SingInPopupView.prototype.signBtn = function () {
        Api.UserinfoVoApi.setFreshInfo(false, new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2));
        NetManager.request(NetConst.SIGNINFO_SIGN, {});
    };
    SingInPopupView.prototype.signCom = function (event) {
        var view = this;
        var data = event.data.data.data;
        var rewards = data.rewards;
        var ret = event.data.ret;
        this.refreshList();
        this.reSignBtn();
        var freerewardvo = GameData.formatRewardItem(Api.SigninfoVoApi.getReWordData())[0];
        if (freerewardvo.type == 50) {
            ViewController.getInstance().openView(ViewConst.GETREWARDPOPUPVIEW, {
                rewards: rewards,
                title: LangMger.getlocal("sysGetReward"),
                isBoxBuy: false,
                specialBoxId: freerewardvo.id,
                handler: this,
                needCancel: true,
                closecallback: function () {
                    App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                },
            });
        }
        else {
            ViewController.getInstance().openView(ViewConst.COMMONREWARDPOPUPVIEW, {
                rewards: rewards,
                title: LangMger.getlocal("sysGetReward"),
                handler: view,
                callback: function () {
                    App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                },
                closecallback: function () {
                    App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                },
            });
        }
    };
    SingInPopupView.prototype.dispose = function () {
        //App.MsgHelper.removeEvt(NetConst.SIGNINFO_SIGN, this.refreshList, this);
        this.listView = null;
        this.signInfoList = [];
        if (this._dbxq) {
            this._dbxq.dispose();
            this._dbxq = null;
        }
        _super.prototype.dispose.call(this);
    };
    return SingInPopupView;
}(PopupView));
__reflect(SingInPopupView.prototype, "SingInPopupView");
//# sourceMappingURL=SingInPopupView.js.map