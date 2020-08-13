/**
 * 剧情播放
 * author shaoliang
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
var AcEnjoyNightAVGView = (function (_super) {
    __extends(AcEnjoyNightAVGView, _super);
    function AcEnjoyNightAVGView() {
        var _this = _super.call(this) || this;
        _this._curIdx = "";
        _this._curConfig = null;
        _this._curBgId = 0;
        _this._isCodon = false;
        _this._codonLength = 0;
        _this._iconList = [];
        _this._isPlayMySound = false;
        _this._fogBg = null;
        _this._rightAnswers = null;
        _this._branchInfo = [];
        _this._allianceInfo = {};
        _this._mapId = null;
        _this._key = 0;
        _this.AVGDialog = {
            //太学
            "1": {
                "1": { "nextId": "2", "descId": 1, "personPic": 'servant_full_1030', "nameId": "servant_name1030", "clickContinue": true },
                "2": { "nextTab": ["3", "4", "5", "6",], "descId": 2, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                "3": { "descId": 3, "nameId": "servant_name1030", branchInfo: ["7", "8"], "branch": { "1": [0], "2": [1], "3": [0], }, },
                "4": { "descId": 4, "nameId": "servant_name1030", branchInfo: ["7", "8"], "branch": { "4": [1], "5": [0], "6": [0], }, },
                "5": { "descId": 5, "nameId": "servant_name1030", branchInfo: ["7", "8"], "branch": { "7": [0], "8": [0], "9": [1], }, },
                "6": { "descId": 6, "nameId": "servant_name1030", branchInfo: ["7", "8"], "branch": { "10": [1], "11": [0], "12": [0], }, },
                "7": { "win": 1, "nextId": null, "descId": 7, "personPic": 'servant_full_1030', "nameId": "servant_name1030", "clickContinue": true },
                "8": { "win": 2, "nextId": null, "descId": 8, "personPic": 'servant_full_1030', "nameId": "servant_name1030", "clickContinue": true },
            },
            //皇宫
            "4": {
                "1": { "nextId": "2", "descId": 1, "clickContinue": true },
                "2": { "nextId": "3", "descId": 2, "personPic": 'empshopman', "nameId": "acEnjoyNightStoryNpcName1", "clickContinue": true, "parmstype": 3 },
                "3": { "nextId": "4", "descId": 3, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true, parmstype: 4 },
                "4": { "nextId": "5", "descId": 4, "personPic": 'empshopman', "nameId": "acEnjoyNightStoryNpcName1", "clickContinue": true },
                "5": { "nextId": null, "descId": 5, "clickContinue": true },
                "6": { "nextId": "7", "descId": 6, "clickContinue": true },
                "7": { "nextId": "8", "descId": 7, "personPic": 'empshopman', "nameId": "acEnjoyNightStoryNpcName1", "clickContinue": true, },
                "8": { "nextId": "9", "descId": 8, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                "9": { "nextId": "10", "descId": 9, "personPic": 'empshopman', "nameId": "acEnjoyNightStoryNpcName1", "clickContinue": true },
                "10": { "nextId": null, "descId": 10, "clickContinue": true },
            },
            //擂台
            "7": {
                "1": { "nextId": "2", "descId": 1, "clickContinue": true },
                "2": { "nextId": "3", "descId": 2, "clickContinue": true },
                "3": { "nextId": "4", "descId": 3, "personPic": 'servant_full_1002', "nameId": "servant_name1002", "clickContinue": true },
                "4": { "nextId": "5", "descId": 4, "personPic": 'servant_full_1003', "nameId": "servant_name1003", "clickContinue": true },
                "5": { "nextId": "6", "descId": 5, "personPic": 'servant_full_1003', "nameId": "servant_name1003", "clickContinue": true },
                "6": { "nextId": "7", "descId": 6, "personPic": 'servant_full_1002', "nameId": "servant_name1002", "clickContinue": true },
                "7": { "nextId": "8", "descId": 7, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                "8": { "nextId": "9", "descId": 8, "personPic": 'servant_full_1002', "nameId": "servant_name1002", "clickContinue": true },
                "9": { "nextId": "10", "descId": 9, "clickContinue": true },
                "10": { "nextId": "11", "descId": 10, "personPic": 'dailyboss_lv_3', "nameId": "acEnjoyNightStoryNcname1", "clickContinue": true },
                "11": { branchInfo: ["12", "12"], "needFight": true, "nextId": "12", "descId": 11, "personPic": 'servant_full_1002', "nameId": "servant_name1002", "clickContinue": true },
                //战斗
                "12": { "nextId": "13", "descId": 12, "clickContinue": true },
                "13": { "nextId": "14", "descId": 13, "clickContinue": true },
                "14": { "nextId": "15", "descId": 14, "personPic": 'servant_full_1002', "nameId": "servant_name1002", "clickContinue": true },
                "15": { "nextId": "16", "descId": 15, "personPic": 'dailyboss_lv_3', "nameId": "acEnjoyNightStoryNcname1", "clickContinue": true },
                "16": { "nextId": "17", "descId": 16, "personPic": 'servant_full_1002', "nameId": "servant_name1002", "clickContinue": true, parmstype: 1
                },
                "17": { "nextId": null, "descId": 17, "clickContinue": true },
            },
            //寻访
            "10": {
                "1": { "nextId": "2", "descId": 1, "clickContinue": true },
                "2": { "nextId": "3", "descId": 2, "personPic": 'wife_full_204', "nameId": "wifeName_204", "clickContinue": true },
                "3": { "nextTab": ["4", "5", "6", "7",], "descId": 3, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                "4": { "descId": 4, "nameId": "wifeName_204", branchInfo: ["8", "9"], "branch": { "1": [1], "2": [0] }, },
                "5": { "descId": 5, "nameId": "wifeName_204", branchInfo: ["8", "9"], "branch": { "3": [1], "4": [0] }, },
                "6": { "descId": 6, "nameId": "wifeName_204", branchInfo: ["8", "9"], "branch": { "5": [1], "6": [0] }, },
                "7": { "descId": 7, "nameId": "wifeName_204", branchInfo: ["8", "9"], "branch": { "7": [1], "8": [0] }, },
                "8": { "win": 1, "nextId": null, "descId": 8, "personPic": 'wife_full_204', "nameId": "wifeName_204", "clickContinue": true },
                "9": { "win": 2, "nextId": null, "descId": 9, "personPic": 'wife_full_204', "nameId": "wifeName_204", "clickContinue": true },
            },
            //演武场
            "13": {
                "1": { "nextId": "2", "descId": 1, "clickContinue": true },
                "2": { "nextId": "3", "descId": 2, "clickContinue": true },
                "3": { "nextId": "4", "descId": 3, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                "4": { "nextId": "5", "descId": 4, "personPic": 'story_npc_7', "nameId": "storyNPCName10", "clickContinue": true },
                "5": { "nextId": "6", "descId": 5, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                "6": { "nextId": "7", "descId": 6, "personPic": 'story_npc_7', "nameId": "storyNPCName10", "clickContinue": true },
                "7": { "nextId": "8", "descId": 7, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                "8": { branchInfo: ["9", "9"], "nextId": "9", "descId": 8, "personPic": 'story_npc_7', "nameId": "storyNPCName10", "clickContinue": true, "needFight": true },
                //战斗
                "9": { "nextId": "10", "descId": 9, "clickContinue": true },
                "10": { "nextId": "11", "descId": 10, "personPic": 'story_npc_7', "nameId": "storyNPCName10", "clickContinue": true },
                "11": { "nextId": "12", "descId": 11, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                "12": { "nextId": "13", "descId": 12, "personPic": 'story_npc_7', "nameId": "storyNPCName10", "clickContinue": true },
                "13": { "nextId": null, "descId": 13, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
            },
            //帮会
            "16": {
                "1": { "nextId": "2", "descId": 1, "clickContinue": true },
                "2": { "nextId": "3", "descId": 2, "clickContinue": true },
                "3": { "nextId": "4", "descId": 3, "personPic": 2, "nameId": "allianceMemberPopupViewTitle", "clickContinue": true, "parmstype": 1 },
                "4": { branchInfo: ["5", "5"], "nextId": "5", "descId": 4, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true, "needFight": true },
                //战斗
                "5": { "nextId": "6", "descId": 5, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                "6": { "nextId": "7", "descId": 6, "personPic": 'servant_full_1031', "nameId": "servant_name1031", "clickContinue": true },
                "7": { "nextId": "8", "descId": 7, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                "8": { "nextId": null, "descId": 8, "personPic": 'servant_full_1031', "nameId": "servant_name1031", "clickContinue": true },
                "9": { "nextId": "10", "descId": 9, "clickContinue": true },
                "10": { "nextId": "11", "descId": 10, "personPic": 'servant_full_1031', "nameId": "servant_name1031", "clickContinue": true },
                "11": { "nextId": "12", "descId": 11, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                "12": { "nextId": "13", "descId": 12, "personPic": 'servant_full_1031', "nameId": "servant_name1031", "clickContinue": true },
                "13": { "nextId": "14", "descId": 13, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                "14": { "nextId": "15", "descId": 14, "personPic": 'servant_full_1031', "nameId": "servant_name1031", "clickContinue": true },
                "15": { "nextId": "16", "descId": 15, "personPic": 'servant_full_1001', "nameId": "servant_name1001", "clickContinue": true },
                "16": { "nextId": null, "descId": 16, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
            },
            //酒楼
            "19": {
                "1": { "nextId": "2", "descId": 1, "clickContinue": true },
                "2": { "nextId": "3", "descId": 2, "clickContinue": true },
                "3": { "nextId": "4", "descId": 3, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                "4": { "nextId": "5", "descId": 4, "personPic": 'story_npc_2', "nameId": "npcName2", "clickContinue": true },
                "5": { "nextId": "6", "descId": 5, "personPic": 'story_npc_2', "nameId": "npcName2", "clickContinue": true },
                "6": { "nextId": "7", "descId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                "7": { "nextId": "8", "descId": 7, "clickContinue": true },
                "8": { "nextId": "9", "descId": 8, "personPic": 'story_npc_2', "nameId": "npcName2", "clickContinue": true },
                "9": { "nextId": "10", "descId": 9, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                "10": { branchInfo: ["11", "11"], "needGame": true, "nextId": "11", "descId": 10, "clickContinue": true },
                "11": { "nextId": null, "descId": 11, "clickContinue": true },
            },
            //排行榜
            "22": {
                "1": { "nextId": "2", "descId": 1, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                "2": { "nextId": "3", "descId": 2, "personPic": 'servant_full_1002', "nameId": "servant_name1002", "clickContinue": true },
                "3": { "nextId": "4", "descId": 3, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                "4": { "nextId": "5", "descId": 4, "clickContinue": true, "parmstype": 1 },
                "5": { "nextId": "request", "descId": 5, "clickContinue": true, "parmstype": 1, branchInfo: ["6", "11"], },
                "6": { "nextId": "7", "descId": 6, "personPic": 'searchnpc_full41', "nameId": "searchPersonName41", "clickContinue": true },
                "7": { "nextId": "8", "descId": 7, "clickContinue": true, "parmstype": 1 },
                "8": { "nextId": "9", "descId": 8, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                "9": { "nextId": "10", "descId": 9, "personPic": 'searchnpc_full41', "nameId": "searchPersonName41", "clickContinue": true },
                "10": { "nextId": null, "descId": 10, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                "11": { "nextId": "12", "descId": 11, "personPic": 'searchnpc_full41', "nameId": "searchPersonName41", "clickContinue": true },
                "12": { "nextId": "13", "descId": 12, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                "13": { "nextId": "10", "descId": 13, "personPic": 'searchnpc_full41', "nameId": "searchPersonName41", "clickContinue": true },
            },
        };
        _this._shakeOffset = 0;
        return _this;
    }
    AcEnjoyNightAVGView.prototype.getResourceList = function () {
        var view = this;
        view._mapId = String(view.param.data.mapId);
        view._key = view.param.data.key;
        var guidePic = [];
        return guidePic.concat([
            "guideNameBg",
            "skip_btn1", "skip_btn2", "guide_circle", "guide_hand", "guide_rect", "guideGrayBg", "story_fog",
        ]);
    };
    Object.defineProperty(AcEnjoyNightAVGView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcEnjoyNightAVGView.prototype.getRequestData = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTPLAY), view.rewardCallback, view);
        view._curIdx = '1';
        if (String(this.param.data.mapId) == "4") {
            var pType = Api.itemVoApi.getMaxTitleLv(); //Api.playerVoApi.getTitleOfficerType();
            var v = pType > 0 ? 1 : 0;
            return { requestType: NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTPLAY, requestData: {
                    activeId: this.acTivityId,
                    victory: v
                } };
            // test code
            // return {requestType:NetRequestConst.REQUEST_DINNER_HISTORY,requestData:{
            // }};
        }
        else if (String(this.param.data.mapId) == "16") {
            return { requestType: NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTPLAY, requestData: {
                    activeId: this.acTivityId,
                    victory: 1
                } };
        }
        else {
            return null;
        }
    };
    AcEnjoyNightAVGView.prototype.getTitleBgName = function () {
        return null;
    };
    AcEnjoyNightAVGView.prototype.getTitleStr = function () {
        return null;
    };
    AcEnjoyNightAVGView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcEnjoyNightAVGView.prototype.getBgName = function () {
        return null;
    };
    AcEnjoyNightAVGView.prototype.isShowMask = function () {
        return true;
    };
    AcEnjoyNightAVGView.prototype.preInit = function () {
        if (this._iconList.length > 0) {
            ResourceManager.loadItem(this._iconList.shift(), this.preInit, this);
        }
        else {
            _super.prototype.preInit.call(this);
        }
    };
    AcEnjoyNightAVGView.prototype.init = function () {
        _super.prototype.init.call(this);
        var view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ROOKIE_NEXT_STEP, this.noticeNextStep, this);
        this._blackBg = BaseBitmap.create("public_9_black");
        this._blackBg.height = GameConfig.stageHeigth;
        this._blackBg.width = GameConfig.stageWidth;
        this.addChild(this._blackBg);
        this._blackBg.touchEnabled = true;
        this._blackBg.visible = false;
        this.container = new BaseDisplayObjectContainer();
        this.addChild(this.container);
        this.width = GameConfig.stageWidth;
        this.height = GameConfig.stageHeigth;
        var titleId = Api.playerVoApi.getTitleid(2);
        this._myBg = BaseBitmap.create("public_9_viewmask");
        this._myBg.width = GameConfig.stageWidth;
        this._myBg.height = GameConfig.stageHeigth;
        this.addChildToContainer(this._myBg);
        this._myBg.addTouchTap(view.clickPage, view);
        this._guideTipContainer = new BaseDisplayObjectContainer();
        this._guideTipContainer.addTouchTap(view.clickPage, view);
        this.addChildToContainer(this._guideTipContainer);
        this._tipBB = BaseBitmap.create("public_9_wordbg");
        this._tipBB.height = 170;
        this._tipBB.setPosition(GameConfig.stageWidth / 2 - this._tipBB.width / 2, GameConfig.stageHeigth - this._tipBB.height - 0);
        this._guideTipContainer.addChild(this._tipBB);
        this._continueText = ComponentManager.getTextField(LanguageManager.getlocal("clickContinue"), 20);
        this._continueText.setPosition(this._tipBB.x + this._tipBB.width - this._continueText.width - 50, this._tipBB.y + this._tipBB.height - this._continueText.height - 20);
        this._continueText.textColor = TextFieldConst.COLOR_WARN_GREEN;
        this._guideTipContainer.addChild(this._continueText);
        this.textAnim(this._continueText);
        this._titleBg = BaseBitmap.create("guideNameBg");
        this._titleBg.setPosition(25, this._tipBB.y - 50);
        this._guideTipContainer.addChild(this._titleBg);
        this._titleBg.visible = false;
        this._titleText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._titleText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        this._titleText.setPosition(30, this._tipBB.y - 42);
        this._guideTipContainer.addChild(this._titleText);
        this._descText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._descText.width = GameConfig.stageWidth - 60;
        this._descText.lineSpacing = 8;
        this._descText.setPosition(30, this._tipBB.y + 38);
        this._guideTipContainer.addChild(this._descText);
        this._curConfig = view.AVGDialog[view._mapId][this._curIdx];
        this.showPage();
    };
    AcEnjoyNightAVGView.prototype.clickPage = function (evt) {
        if (this._curConfig && (this._curConfig.clickRect || this._curConfig.branch) && !this._curConfig.touchAll) {
            return;
        }
        if (this._isCodon == true) {
            this._isCodon = false;
            this._descText.text = this._descContent;
        }
        else {
            if (this.nextId == "request") {
                this.playRequest(1);
            }
            else if (this._curConfig.needFight && this._mapId != "16") {
                var view_1 = this;
                ViewController.getInstance().openView(ViewConst.COMMON.ACENJOYNIGHTFIGHTVIEW, {
                    aid: this.param.data.aid,
                    code: this.param.data.code,
                    mapId: this._mapId,
                    callBack: function () {
                        view_1.visible = true;
                        view_1.playRequest(1);
                    },
                    obj: view_1
                });
                view_1.visible = false;
            }
            else if (this._curConfig.needGame) {
                var view_2 = this;
                ViewController.getInstance().openView(ViewConst.COMMON.ACENJOYNIGHTGAMEVIEW, {
                    aid: this.param.data.aid,
                    code: this.param.data.code,
                    uicode: this.param.data.uicode,
                    mapId: this._mapId,
                    callBack: function () {
                        view_2.visible = true;
                        view_2.playRequest(1);
                    },
                    obj: view_2
                });
                view_2.visible = false;
            }
            else {
                this.doNextStep();
            }
        }
    };
    Object.defineProperty(AcEnjoyNightAVGView.prototype, "nextId", {
        get: function () {
            if (this._curConfig && this._curConfig.nextId) {
                return this._curConfig.nextId;
            }
            if (this._curConfig && this._curConfig.nextTab) {
                return this._curConfig.nextTab[this._key - 1];
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    AcEnjoyNightAVGView.prototype.doNextStep = function (step) {
        var view = this;
        var nextId = null;
        if (step) {
            nextId = step;
        }
        else if (this.nextId) {
            nextId = this.nextId;
        }
        if (this._curConfig && nextId == null) {
            this.hide();
        }
        else {
            var allAvg = view.AVGDialog;
            this._curIdx = nextId;
            this._curConfig = view.AVGDialog[view._mapId][this._curIdx];
            this.showPage();
        }
    };
    AcEnjoyNightAVGView.prototype.showPage = function () {
        if (this._showManTab) {
            this._guideTipContainer.removeChild(this._showManTab);
            this._showManTab = null;
        }
        var needShoot = false;
        this._continueText.visible = false;
        //底部 描述
        if (this._curConfig.descId) {
            //描述 
            if (this._curConfig.clickContinue) {
                this._continueText.visible = true;
            }
            this._isCodon = true;
            this._codonLength = 0;
            this._descText.text = "";
            var str = "acEnjoyNightStoryDesc_" + this._mapId + "_" + this._curConfig.descId;
            if (this._curConfig.win == 2) {
                this._descContent = LanguageManager.getlocal(str, [this._rightAnswers]);
            }
            else if (this._curConfig.parmstype == 1) {
                this._descContent = LanguageManager.getlocal(str, [Api.playerVoApi.getPlayerName()]);
            }
            else if (this._curConfig.parmstype == 3) {
                var maxLv = Api.itemVoApi.getMaxTitleLv();
                var titleLv = Api.playerVoApi.getTitleOfficerType();
                var title = Api.playerVoApi.getTitleid(2);
                if ((maxLv > 0 && titleLv > maxLv) || title == 0) {
                    title = Api.itemVoApi.getMaxTitleId();
                    titleLv = maxLv;
                }
                var titleName = LanguageManager.getlocal("palace_titleName" + title);
                if (titleLv < 3) {
                    this._descContent = LanguageManager.getlocal("acEnjoyNightStoryDesc_4_2_1", [titleName]);
                }
                else {
                    this._descContent = LanguageManager.getlocal("acEnjoyNightStoryDesc_4_2_2", [titleName]);
                }
            }
            else if (this._curConfig.parmstype == 4) {
                var maxLv = Api.itemVoApi.getMaxTitleLv();
                var titleLv = Api.playerVoApi.getTitleOfficerType();
                var title = Api.playerVoApi.getTitleid(2);
                if ((maxLv > 0 && titleLv > maxLv) || title == 0) {
                    title = Api.itemVoApi.getMaxTitleId();
                    titleLv = maxLv;
                }
                if (titleLv < 3) {
                    this._descContent = LanguageManager.getlocal(str, [LanguageManager.getlocal("acEnjoyNightStoryMyName1")]);
                }
                else {
                    this._descContent = LanguageManager.getlocal(str, [LanguageManager.getlocal("acEnjoyNightStoryMyName2")]);
                }
            }
            else {
                this._descContent = LanguageManager.getlocal(str);
            }
            needShoot = true;
            // 人物形象
            if (this._curConfig.personPic == 1 || this._curConfig.personPic == 2) {
                var playerLv = void 0;
                var pic = Api.playerVoApi.getPlayePicId();
                if (this._curConfig.personPic == 2) {
                    playerLv = this._allianceInfo.level;
                    pic = this._allianceInfo.pic;
                    var titleinfo = App.CommonUtil.getTitleData(this._allianceInfo.title);
                    var titleId = titleinfo.title;
                    //自己说话						
                    if (titleId != "") {
                        var title = Config.TitleCfg.getTitleCfgById(titleId);
                        if (title && title.isTitle == 1 && title.titleType) {
                            if (title.titleType == 1 || title.titleType == 2) {
                                playerLv = Number(titleId);
                            }
                        }
                    }
                }
                else {
                    playerLv = Api.playerVoApi.getPlayerLevel();
                    var titleId = Api.playerVoApi.getTitleid(2);
                    //自己说话						
                    if (titleId) {
                        var title = Config.TitleCfg.getTitleCfgById(titleId);
                        if (title && title.isTitle == 1 && title.titleType) {
                            if (title.titleType == 1 || title.titleType == 2) {
                                playerLv = titleId;
                            }
                        }
                    }
                }
                if (this._curConfig.parmstype == 4) {
                    //切换到最高等级称号
                    var maxLv = Api.itemVoApi.getMaxTitleLv();
                    var titleLv = Api.playerVoApi.getTitleOfficerType();
                    var title = Api.playerVoApi.getTitleid(2);
                    if ((maxLv > 0 && titleLv > maxLv) || title == 0) {
                        title = Api.itemVoApi.getMaxTitleId();
                    }
                    if (title) {
                        playerLv = title;
                    }
                }
                var myBody = Api.playerVoApi.getPlayerPortrait(playerLv, pic);
                myBody.x = (GameConfig.stageWidth - myBody.width) / 2;
                myBody.y = GameConfig.stageHeigth - myBody.height - 10 + 110;
                var maskRect = new egret.Rectangle();
                maskRect.setTo(0, 0, myBody.width, 430);
                this._guideTipContainer.addChildAt(myBody, 0);
                this._showManTab = myBody;
            }
            else if (this._curConfig.personPic) {
                var npcBody = new BaseDisplayObjectContainer();
                this._guideTipContainer.addChild(npcBody);
                var rect1 = egret.Rectangle.create();
                rect1.setTo(0, 0, 405, 467);
                if (this._curConfig.personPic.substring(0, 4) == "wife") {
                    rect1.setTo(0, 0, 355, 467);
                }
                else if (this._curConfig.personPic == "empshopman") {
                    rect1.setTo(0, 0, 282 * 0.9, 866 * 0.9);
                }
                var npcMan = BaseLoadBitmap.create(this._curConfig.personPic, rect1);
                npcMan.setPosition(GameConfig.stageWidth - npcMan.width * npcMan.scaleX - 120, GameConfig.stageHeigth - npcMan.height * npcMan.scaleY - 272 + 50 + 80);
                npcBody.addChild(npcMan);
                if (this._curConfig.personPic == "empshopman") {
                    npcMan.x -= 120;
                }
                if (this._curConfig.personPic == "empshopman") {
                    npcMan.y = GameConfig.stageHeigth - 600;
                }
                this._guideTipContainer.addChildAt(npcBody, 0);
                this._showManTab = npcBody;
            }
            //名字
            if (this._curConfig.nameId) {
                this._titleText.text = LanguageManager.getlocal(this._curConfig.nameId);
                this._titleText.x = this._titleBg.x + this._titleBg.width / 2 - this._titleText.width / 2;
                this._titleBg.visible = true;
            }
            else {
                this._titleText.text = "";
                this._titleBg.visible = false;
            }
            if (this._curConfig.personPic == 2) {
                this._titleText.text = this._allianceInfo.name;
            }
            this._titleText.x = this._titleBg.x + this._titleBg.width / 2 - this._titleText.width / 2;
            this._guideTipContainer.visible = true;
        }
        else {
            this._guideTipContainer.visible = false;
        }
        //背景图
        var changeTime = 0;
        if (this._curConfig.bgId) {
            this.container.alpha = 1;
            if (this._curConfig.bgId != this._curBgId) {
                var turnTime = 350;
                egret.Tween.removeTweens(this.container);
                this._descText.visible = false;
                this._titleText.visible = false;
                this._titleBg.visible = false;
                if (this._curBgId == 0) {
                    this.container.alpha = 1;
                    this._curBgId = this._curConfig.bgId;
                    this.changeBgCallBack();
                    changeTime = 0;
                }
                else {
                    if (this._showManTab) {
                        this._showManTab.alpha = 0;
                    }
                    this._curBgId = this._curConfig.bgId;
                    egret.Tween.get(this.container).to({ alpha: 0 }, turnTime).call(this.changeBgCallBack, this).to({ alpha: 1 }, turnTime);
                    changeTime = turnTime * 2;
                }
            }
        }
        else {
            this._myBg.texture = null;
            this._curBgId = 0;
        }
        if (needShoot) {
            egret.Tween.get(this).wait(changeTime).call(this.textShootAnim, this);
        }
        if (this._branchContainer) {
            this._guideTipContainer.removeChild(this._branchContainer);
            this._branchContainer = null;
        }
        if (this._curConfig.branchInfo) {
            this._branchInfo = this._curConfig.branchInfo;
        }
        if (this._curConfig.branch) {
            this._branchContainer = new BaseDisplayObjectContainer();
            this._guideTipContainer.addChild(this._branchContainer);
            var allKey = Object.keys(this._curConfig.branch);
            var totalHeight = allKey.length * 110;
            for (var i = 0; i < allKey.length; i++) {
                var textstr = LanguageManager.getlocal("rookieStoryBranch" + allKey[i]);
                var branchBtn = BaseBitmap.create("loginres_9_serverbg");
                branchBtn.width = 440;
                var binfo = this._curConfig.branch[allKey[i]];
                this._branchContainer.addChild(branchBtn);
                branchBtn.addTouch(this.clickSelectedHandler, this, [branchBtn, binfo[0]]);
                var timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightStoryBranch" + this._mapId + "_" + allKey[i]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
                if (binfo[0] == 1) {
                    this._rightAnswers = timeDesc.text;
                }
                if (PlatformManager.checkIsEnLang()) {
                    if (branchBtn.width < timeDesc.width + 60) {
                        branchBtn.width = timeDesc.width + 60;
                    }
                    branchBtn.setPosition(GameConfig.stageWidth / 2 - branchBtn.width / 2, GameConfig.stageHeigth / 2 - totalHeight / 2 + i * 110 + branchBtn.height / 2);
                    timeDesc.setPosition(branchBtn.x + branchBtn.width / 2 - timeDesc.width / 2, branchBtn.y + branchBtn.height / 2 - timeDesc.height / 2);
                }
                else {
                    branchBtn.setPosition(GameConfig.stageWidth / 2 - branchBtn.width / 2, GameConfig.stageHeigth / 2 - totalHeight / 2 + i * 110 + branchBtn.height / 2);
                    timeDesc.setPosition(branchBtn.x + branchBtn.width / 2 - timeDesc.width / 2 + 15, branchBtn.y + branchBtn.height / 2 - timeDesc.height / 2);
                }
                this._branchContainer.addChild(timeDesc);
            }
        }
    };
    AcEnjoyNightAVGView.prototype.clickSelectedHandler = function (event, branchBtn, binfo) {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                branchBtn.texture = ResourceManager.getRes("loginres_9_serverbg_down");
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                branchBtn.texture = ResourceManager.getRes("loginres_9_serverbg");
                break;
            case egret.TouchEvent.TOUCH_END:
                branchBtn.texture = ResourceManager.getRes("loginres_9_serverbg");
                this.playRequest(binfo);
                break;
        }
    };
    AcEnjoyNightAVGView.prototype.playRequest = function (win) {
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTPLAY, {
            activeId: this.acTivityId,
            victory: win
        });
    };
    AcEnjoyNightAVGView.prototype.changeBgCallBack = function () {
        this._descText.visible = true;
        this._titleText.visible = true;
        if (this._titleText.text == "") {
            this._titleBg.visible = false;
        }
        else {
            this._titleBg.visible = true;
        }
        if (this._fogBg) {
            this.removeChildFromContainer(this._fogBg);
            this._fogBg = null;
        }
        if (this._showManTab) {
            this._showManTab.alpha = 1;
        }
        //背景位置
        this._myBg.y = GameConfig.stageHeigth - this._myBg.height;
        this._myBg.x = 0;
        this._myBg.anchorOffsetX = 0;
        this._myBg.setScale(1);
    };
    AcEnjoyNightAVGView.prototype.showShakeAnim = function () {
        this._myBg.setScale((this._myBg.width + 40) / this._myBg.width);
        this._myBg.x = -20;
        this._myBg.y = GameConfig.stageHeigth - this._myBg.height - 30;
        this._shakeOffset = 16;
        this.shakeScreen();
    };
    AcEnjoyNightAVGView.prototype.shakeScreen = function () {
        if (this._shakeOffset > 0) {
            var setX = -this._shakeOffset / 2 - App.MathUtil.getRandom(0, this._shakeOffset);
            var setY = GameConfig.stageHeigth - this._myBg.height - this._shakeOffset / 2 - App.MathUtil.getRandom(0, this._shakeOffset);
            setY *= 1.5;
            this._myBg.setPosition(setX, setY);
            egret.Tween.get(this._myBg).wait(50).call(this.shakeScreen, this);
            this._shakeOffset -= 1;
        }
    };
    AcEnjoyNightAVGView.prototype.textShootAnim = function () {
        if (this._isCodon == false) {
            return;
        }
        this._codonLength += 1;
        if (this._codonLength > this._descContent.length) {
            this._isCodon = false;
            this._descText.text = this._descContent;
        }
        else {
            this._descText.text = this._descContent.substr(0, this._codonLength);
            egret.Tween.get(this._descText).wait(100).call(this.textShootAnim, this);
        }
    };
    AcEnjoyNightAVGView.prototype.textAnim = function (t) {
        egret.Tween.removeTweens(t);
        var oldx = t.x;
        var oldy = t.y;
        var newx = t.x - t.width * 0.1;
        var newy = t.y - t.height * 0.1;
        egret.Tween.get(t).to({ scaleX: 1.2, scaleY: 1.2, x: newx, y: newy }, 600).to({ scaleX: 1, scaleY: 1, x: oldx, y: oldy }, 600).to({ scaleX: 1.2, scaleY: 1.2, x: newx, y: newy }, 600).to({ scaleX: 1, scaleY: 1, x: oldx, y: oldy }, 600).call(this.textAnim, this, [t]);
    };
    AcEnjoyNightAVGView.prototype.skipAnim = function () {
        this.hide();
    };
    /**
     * 收到通知 下一步
     */
    AcEnjoyNightAVGView.prototype.noticeNextStep = function () {
        this.doNextStep();
    };
    AcEnjoyNightAVGView.prototype.initView = function () {
    };
    AcEnjoyNightAVGView.prototype.getParent = function () {
        return LayerManager.maskLayer;
    };
    AcEnjoyNightAVGView.prototype.hide = function (isDispose) {
        var view = this;
        if (this.param.data.callBack) {
            this.param.data.callBack.apply(this.param.data.obj);
        }
        _super.prototype.hide.call(this);
    };
    AcEnjoyNightAVGView.prototype.doStepHandle = function () {
        if (this._curIdx == "1") {
            SoundManager.playBg(SoundConst.MUSIC_PALACE);
        }
        else if (this._curIdx == RookieCfg.getRookieCfg("storyMusicStart")) {
            SoundManager.playBg(SoundConst.MUSIC_ROOKIE_STORY);
        }
        else if (this._curIdx == RookieCfg.getRookieCfg("storyMusicEnd")) {
            SoundManager.playBg(SoundConst.MUSIC_HOME);
        }
    };
    AcEnjoyNightAVGView.prototype.rewardCallback = function (event) {
        var data = event.data;
        if (data.data.ret == 0) {
            var addValue = data.data.data.addValue;
            var str = LanguageManager.getlocal("acEnjoyNightAddValueTip", [String(addValue)]);
            App.CommonUtil.showTip(str);
        }
        var nextid;
        if (String(this.param.data.mapId) == "4") {
            if (data.data.data.victory) {
                this._curIdx = "1";
            }
            else {
                this._curIdx = "6";
            }
        }
        else if (String(this.param.data.mapId) == "16") {
            this._allianceInfo = data.data.data.fuinfo;
            if (data.data.data.victory) {
                this._curIdx = "1";
            }
            else {
                this._curIdx = "9";
            }
        }
        else {
            if (data.data && data.data.data.victory) {
                nextid = this._branchInfo[0];
            }
            else {
                nextid = this._branchInfo[1];
            }
            this.doNextStep(nextid);
        }
    };
    AcEnjoyNightAVGView.prototype.dispose = function () {
        if (this._curConfig && this._curConfig.showCloseHand) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND);
        }
        if (this._guideTipContainer) {
            this._guideTipContainer.removeTouch();
        }
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ROOKIE_NEXT_STEP, this.noticeNextStep, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTPLAY), this.rewardCallback, this);
        if (this._continueText) {
            egret.Tween.removeTweens(this._continueText);
        }
        this._continueText = null;
        this._curIdx = "";
        this._showManTab = null;
        this._curBgId = 0;
        this._tipBB = null;
        this._descContent = null;
        this._isCodon = false;
        this._codonLength = 0;
        if (this._descText) {
            egret.Tween.removeTweens(this._descText);
        }
        this._descText = null;
        this._myBg = null;
        this._blackBg = null;
        this._iconList.length = 0;
        this._isPlayMySound = false;
        egret.Tween.removeTweens(this.container);
        egret.Tween.removeTweens(this);
        this.visible = true;
        this._titleBg = null;
        this._fogBg = null;
        this._shakeOffset = 0;
        this._rightAnswers = null;
        _super.prototype.dispose.call(this);
    };
    return AcEnjoyNightAVGView;
}(CommonView));
__reflect(AcEnjoyNightAVGView.prototype, "AcEnjoyNightAVGView");
//# sourceMappingURL=AcEnjoyNightAVGView.js.map