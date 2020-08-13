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
 *帮会任务开启
 */
var AllianceTaskOpenView = (function (_super) {
    __extends(AllianceTaskOpenView, _super);
    function AllianceTaskOpenView() {
        return _super.call(this) || this;
    }
    AllianceTaskOpenView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_OPENALLIANCETASK), this.openBtnHandlerCallBack, this);
        this._taskId = this.param.data.taskId;
        var cfg = Config.AlliancetaskCfg.getAllianceTaskById(this._taskId);
        var bg1 = BaseBitmap.create("public_tc_bg01");
        bg1.width = 540;
        bg1.height = 238;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = 10;
        this.addChildToContainer(bg1);
        var txt1 = ComponentManager.getTextField("", 20);
        var taskNameStr = LanguageManager.getlocal("allianceTaskName" + cfg.id);
        txt1.text = LanguageManager.getlocal("allianceTaskOpen_txt1", [taskNameStr]);
        txt1.x = bg1.x + 20;
        txt1.y = bg1.y + 15;
        this.addChildToContainer(txt1);
        var txt2 = ComponentManager.getTextField("政绩奖励", 20);
        txt2.text = LanguageManager.getlocal("allianceTaskOpen_txt2", ["" + cfg.totalNum]);
        txt2.x = txt1.x;
        txt2.y = txt1.y + 30;
        this.addChildToContainer(txt2);
        var rewardbg = BaseBitmap.create("public_listbg");
        rewardbg.width = bg1.width - 20;
        rewardbg.height = 150;
        rewardbg.x = bg1.x + 10;
        rewardbg.y = txt2.y + 30;
        this.addChildToContainer(rewardbg);
        var attrbg = BaseBitmap.create("alliance_taskAttrbg" + cfg.type);
        attrbg.x = rewardbg.x;
        attrbg.y = rewardbg.y + 5;
        this.addChildToContainer(attrbg);
        var txt3 = ComponentManager.getTextField("完成任务奖励", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt3.text = LanguageManager.getlocal("allianceTaskOpen_txt3");
        txt3.x = attrbg.x + 10;
        txt3.y = attrbg.y + attrbg.height / 2 - txt3.height / 2;
        this.addChildToContainer(txt3);
        var rewardIcons = GameData.getRewardItemIcons(cfg.completeReward, true);
        for (var index = 0; index < rewardIcons.length; index++) {
            var element = rewardIcons[index];
            element.setScale(0.8);
            element.x = rewardbg.x + 15 + 90 * index;
            element.y = attrbg.y + attrbg.height + 5;
            this.addChildToContainer(element);
        }
        var bg2 = BaseBitmap.create("public_tc_bg01");
        bg2.width = bg1.width;
        bg2.height = 270;
        bg2.x = bg1.x;
        bg2.y = bg1.y + bg1.height + 10;
        this.addChildToContainer(bg2);
        var txtCfg = [
            {
                iconStr: "1_0_0",
                txt1: LanguageManager.getlocal("allianceBossOpen_txt1"),
                txt2: LanguageManager.getlocal("allianceBossOpen_txt2", [String(cfg.costAsset)]),
                txt3: LanguageManager.getlocal("allianceBossOpen_txt3", [String(Api.allianceVoApi.getAllianceVo().wealth)]),
            },
            {
                iconStr: "1_0_0",
                txt1: LanguageManager.getlocal("allianceBossOpen_txt4"),
                txt2: LanguageManager.getlocal("allianceBossOpen_txt5", [String(cfg.costGem)]),
                txt3: LanguageManager.getlocal("allianceBossOpen_txt6", [String(Api.playerVoApi.getPlayerGem())]),
            },
        ];
        var startX = bg2.x + 10;
        var startY = bg2.y + 15;
        for (var index = 0; index < txtCfg.length; index++) {
            var element_1 = txtCfg[index];
            var bg = BaseBitmap.create("public_listbg");
            bg.width = rewardbg.width;
            bg.height = 120;
            bg.y = startY;
            bg.x = startX;
            this.addChildToContainer(bg);
            startY += bg.height + 5;
            var leftBg = BaseBitmap.create("public_left");
            leftBg.width = 110;
            leftBg.height = 106;
            leftBg.x = bg.x + 5;
            leftBg.y = bg.y + 5.5;
            this.addChildToContainer(leftBg);
            var icon = GameData.getRewardItemIcons(element_1.iconStr, true)[0];
            // let icon:BaseBitmap|BaseDisplayObjectContainer;
            // if(index == 0)
            // {
            //
            // 	icon = BaseBitmap.create("allianceview_treasure");
            // }
            // else
            // {
            // 	icon = GameData.getRewardItemIcons(element.iconStr)[0];
            // }
            icon.setScale(0.8);
            icon.x = bg.x + 18;
            icon.y = bg.y + 15;
            this.addChildToContainer(icon);
            var openBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceBtnOpen", this.openBtnHandler, this, [index + 1]);
            openBtn.x = bg.x + bg.width - openBtn.width - 20;
            openBtn.y = bg.y + bg.height / 2 - openBtn.height / 2;
            this.addChildToContainer(openBtn);
            var tmpX = leftBg.x + leftBg.width + 10;
            var tmpY = icon.y + 5;
            for (var index2 = 1; index2 <= 3; index2++) {
                var txt = ComponentManager.getTextField(element_1["txt" + index2], 20);
                txt.setColor(TextFieldConst.COLOR_BROWN);
                txt.x = tmpX;
                txt.y = tmpY;
                tmpY += txt.height + 10;
                this.addChildToContainer(txt);
                if (index2 == 2) {
                    if (index == 0 && cfg.costAsset > Api.allianceVoApi.getAllianceVo().wealth) {
                        txt.text = LanguageManager.getlocal("allianceBossOpen_txt2_1", [String(cfg.costAsset)]);
                    }
                    if (index == 1 && cfg.costGem > Api.playerVoApi.getPlayerGem()) {
                        txt.text = LanguageManager.getlocal("allianceBossOpen_txt5_1", [String(cfg.costGem)]);
                    }
                }
            }
        }
        var tipbg = BaseBitmap.create("public_searchdescbg");
        tipbg.width = 500;
        tipbg.x = this.viewBg.width / 2 - tipbg.width / 2;
        tipbg.y = 590;
        this.addChildToContainer(tipbg);
        var tipTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.text = LanguageManager.getlocal("alliancetask_rewardTip1");
        tipTxt.x = this.viewBg.width / 2 - tipTxt.width / 2;
        tipTxt.y = tipbg.y + tipbg.height / 2 - tipTxt.height / 2;
        this.addChildToContainer(tipTxt);
        // let open1Btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "allianceBtnOpen", this.open1Click, this);
        // open1Btn.x = GameConfig.stageWidth - 140 - open1Btn.width;
        // open1Btn.y = 360;
        // this.addChildToContainer(open1Btn);
        // let open2Btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "allianceBtnOpen", this.open2Click, this);
        // open2Btn.x = GameConfig.stageWidth - 140 - open2Btn.width;
        // open2Btn.y = 510;
        // this.addChildToContainer(open2Btn);
    };
    AllianceTaskOpenView.prototype.openBtnHandler = function (params) {
        var myAllVo = Api.allianceVoApi.getMyAllianceVo();
        var allVo = Api.allianceVoApi.getAllianceVo();
        var cfg = Config.AlliancetaskCfg.getAllianceTaskById(this._taskId);
        if (myAllVo.po > 2) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip2"));
            return;
        }
        if (params == 2) {
            if (cfg.costGem > Api.playerVoApi.getPlayerGem()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip5"));
                return;
            }
            var rewardStr = LanguageManager.getlocal("allianceTaskOpen_costTip1", ["" + cfg.costGem]);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: rewardStr,
                callback: this.open1Click,
                handler: this,
                needCancel: true
            });
            // this.open1Click();
        }
        else {
            if (cfg.costAsset > allVo.wealth) {
                App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip3"));
                return;
            }
            var rewardStr = LanguageManager.getlocal("allianceTaskOpen_costTip2", ["" + cfg.costAsset]);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: rewardStr,
                callback: this.open2Click,
                handler: this,
                needCancel: true
            });
            // this.open2Click();
        }
    };
    AllianceTaskOpenView.prototype.open2Click = function () {
        this.request(NetRequestConst.REQUEST_ALLIANCETASK_OPENALLIANCETASK, { tid: this.param.data.taskId, openType: 1 });
    };
    AllianceTaskOpenView.prototype.open1Click = function () {
        this.request(NetRequestConst.REQUEST_ALLIANCETASK_OPENALLIANCETASK, { tid: this.param.data.taskId, openType: 2 });
    };
    AllianceTaskOpenView.prototype.openBtnHandlerCallBack = function (event) {
        var rdata = event.data.data;
        if (rdata.data.taskOpenFlag == 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg1"));
            this.hide();
            return;
        }
        if (rdata.ret == 0) {
            var cfg = Config.AlliancetaskCfg.getAllianceTaskById(this._taskId);
            var taskNameStr = LanguageManager.getlocal("allianceTaskName" + cfg.id);
            var txtStr = LanguageManager.getlocal("allinaceChatMsg3", [taskNameStr]);
            var chatData = {};
            chatData.channel = Api.playerVoApi.getPlayerAllianceId();
            chatData.message = txtStr;
            NetManager.requestChat(chatData);
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceTaskOpen_openTip1"));
            this.hide();
        }
    };
    AllianceTaskOpenView.prototype.receiveData = function (data) {
        this.hide();
    };
    AllianceTaskOpenView.prototype.getRequestData = function () {
        // return {requestType:NetRequestConst.REQUEST_ALLIANCE_INITALLIANCE,requestData:{}};
        return null;
    };
    AllianceTaskOpenView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AllianceTaskOpenView.prototype.getShowHeight = function () {
        return 630;
    };
    AllianceTaskOpenView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_OPENALLIANCETASK), this.openBtnHandlerCallBack, this);
        this._taskId = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceTaskOpenView;
}(PopupView));
__reflect(AllianceTaskOpenView.prototype, "AllianceTaskOpenView");
