/**
 * 练武场
 * author yanyuling
 * date 2017/11/28
 * @class StudyatkView
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
var StudyatkView = (function (_super) {
    __extends(StudyatkView, _super);
    function StudyatkView() {
        var _this = _super.call(this) || this;
        _this._studyTableIdx = 0;
        _this._studyTableList = [];
        _this._numbg = null;
        _this._numtext = null;
        return _this;
        // this.visible = false;
    }
    Object.defineProperty(StudyatkView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    StudyatkView.prototype.getContainerY = function () {
        return 14;
    };
    StudyatkView.prototype.getBigFrame = function () {
        return null;
    };
    StudyatkView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_INDEX), this.refreshUiAfrerEnter, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_CREATE), this.studyBtnHandlerCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_JOIN), this.joinBtnHandlerCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_GOAWAY), this.GoAwayHandler, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_UPGRADE), this.refreshBookRed, this);
        NetManager.request(NetRequestConst.REQUEST_STUDYATK_INDEX, {});
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.y = -15;
        this.addChildToContainer(this._nodeContainer);
        var bg = BaseBitmap.create("studyatk_bg1");
        var rect = new egret.Rectangle(0, 0, bg.width, GameConfig.stageHeigth - 80 - 100);
        this._tableNodeContainer = new BaseDisplayObjectContainer();
        this._tableNodeContainer.height = bg.height;
        this._tableNodeContainer.addChild(bg);
        var scrollV = ComponentManager.getScrollView(this._tableNodeContainer, rect);
        scrollV.bounces = false;
        this._nodeContainer.addChild(scrollV);
        var bottombg = BaseBitmap.create("wifeview_bottombg");
        bottombg.y = GameConfig.stageHeigth - this.container.y - bottombg.height - this._nodeContainer.y;
        this._nodeContainer.addChild(bottombg);
        this._numbg = BaseBitmap.create("public_9_bg77");
        this._numbg.height = 26;
        this._numbg.y = bottombg.y - this._numbg.height + 2;
        this._nodeContainer.addChild(this._numbg);
        this._numtext = ComponentManager.getTextField("0", 18, TextFieldConst.COLOR_WHITE);
        this._numtext.y = this._numbg.y + this._numbg.height / 2 - this._numtext.height / 2;
        this._nodeContainer.addChild(this._numtext);
        this._numtext.text = LanguageManager.getlocal("studyatk_open_count", ["0"]);
        this._numbg.width = this._numtext.width + 30;
        this._numbg.x = GameConfig.stageWidth - this._numbg.width;
        this._numtext.x = this._numbg.x + 15;
        var studyBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "studyBtn_txt", this.studyBtnHandler, this);
        studyBtn.x = 100;
        studyBtn.y = bottombg.y + bottombg.height / 2 - studyBtn.height / 2 + 5;
        this._nodeContainer.addChild(studyBtn);
        var joinBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "study_joinBtn_txt", this.joinBtnHandler, this);
        joinBtn.x = GameConfig.stageWidth - studyBtn.width - studyBtn.x;
        joinBtn.y = studyBtn.y;
        this._nodeContainer.addChild(joinBtn);
        var forpeople_bottom = BaseBitmap.create("forpeople_bottom");
        forpeople_bottom.x = 5;
        forpeople_bottom.y = 5;
        this._nodeContainer.addChild(forpeople_bottom);
        var bookBtn = BaseBitmap.create("studyatk_book");
        bookBtn.x = 5;
        bookBtn.y = 5;
        bookBtn.addTouchTap(this.bookBtnHandler, this);
        this._nodeContainer.addChild(bookBtn);
        var studyatk_book_name = BaseBitmap.create("studyatk_book_name");
        studyatk_book_name.x = bookBtn.x + bookBtn.width / 2 - studyatk_book_name.width / 2;
        studyatk_book_name.y = bookBtn.y + bookBtn.height - studyatk_book_name.height;
        this._nodeContainer.addChild(studyatk_book_name);
        this._bookBtnRed = BaseBitmap.create("public_dot2");
        this._bookBtnRed.x = bookBtn.x + bookBtn.width - this._bookBtnRed.width;
        this._bookBtnRed.y = bookBtn.y;
        this._bookBtnRed.name = "reddot";
        this._nodeContainer.addChild(this._bookBtnRed);
        this._bookBtnRed.visible = Api.studyatkVoApi.checkCanUpBook();
        this._nextEntime = Api.studyatkVoApi.getNextEnterTime();
        if (this._nextEntime >= GameData.serverTime) {
            this._nextEnBg = BaseBitmap.create("public_numbg");
            this._nextEnBg.width = 250;
            this._nextEnBg.x = GameConfig.stageWidth / 2 - this._nextEnBg.width / 2;
            this._nextEnBg.y = 100;
            this._nodeContainer.addChild(this._nextEnBg);
            this._nextEnTxt = ComponentManager.getTextField("0", 20, TextFieldConst.COLOR_WARN_YELLOW);
            this._nextEnTxt.y = this._nextEnBg.y + this._nextEnBg.height / 2 - this._nextEnTxt.height / 2;
            this._nodeContainer.addChild(this._nextEnTxt);
        }
        this.tick();
    };
    StudyatkView.prototype.tick = function () {
        if (!this._nextEnBg) {
            return true;
        }
        if (this._nextEntime >= GameData.serverTime) {
            var cdStr = App.DateUtil.getFormatBySecond(this._nextEntime - GameData.serverTime, 1);
            this._nextEnTxt.text = LanguageManager.getlocal("studyatkCdTxt1", [cdStr]);
            this._nextEnTxt.x = this._nextEnBg.x + this._nextEnBg.width / 2 - this._nextEnTxt.width / 2;
            this._nextEnTxt.visible = true;
            this._nextEnBg.visible = true;
            return true;
        }
        else {
            this._nextEnTxt.visible = false;
            this._nextEnBg.visible = false;
            return false;
        }
    };
    StudyatkView.prototype.createTableItem = function (data) {
        var index = this._studyTableIdx;
        var atkItem = this._studyTableList[index];
        if (!atkItem) {
            atkItem = new StudyatkTableItem();
            this._studyTableList.push(atkItem);
            this._tableNodeContainer.addChild(atkItem);
        }
        atkItem.refreshUI(data);
        atkItem.visible = true;
        var posX = 20 + (index % 2) * 395;
        var posY = 200 + Math.floor(index / 2) * 240;
        atkItem.x = posX;
        atkItem.y = posY;
        this._studyTableIdx++;
    };
    StudyatkView.prototype.studyBtnHandlerCallback = function (event) {
        if (event.data.ret) {
            var rdata = event.data.data;
            if (rdata.ret == 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_createSuccess"));
                // 刷新房间数，如果需要的话 
                var studyroom = rdata.data.studyroom;
                this.createTableItem(studyroom);
                ViewController.getInstance().openView(ViewConst.COMMON.STUDYATKDETAILVIEW, studyroom);
                this.hide();
                // this.showNoTableNpc(false);
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_createFailed"));
            }
        }
        else {
            //错误代码兼容处理
            App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_createFailed"));
        }
    };
    StudyatkView.prototype.GoAwayHandler = function (event) {
        if (event.data.ret) {
            var rData = event.data.data;
            if (rData.ret == 0 && rData.data.goawaycode == 1) {
                this.hide();
            }
        }
        else {
            //报错兼容
        }
    };
    StudyatkView.prototype.bookBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.STUDYATKBOOKPOPUPVIEW);
    };
    StudyatkView.prototype.joinBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.STUDYATKFINDPOPUPVIEW);
    };
    StudyatkView.prototype.studyBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.STUDYATKCREATEPOPUPVIEW);
    };
    StudyatkView.prototype.showNoTableNpc = function (isVisible) {
        if (!this._npcNodeContainer) {
            this._npcNodeContainer = new BaseDisplayObjectContainer();
            this._npcNodeContainer.y = GameConfig.stageHeigth - this.container.y;
            this._nodeContainer.addChildAt(this._npcNodeContainer, 1);
            var Npc = BaseLoadBitmap.create("story_npc_7");
            Npc.width = 405;
            Npc.height = 467;
            // Npc.anchorOffsetX = Npc.width;
            Npc.anchorOffsetY = Npc.height;
            // Npc.x = 10;
            Npc.y = -70;
            var deltaSca = 0.7;
            Npc.setScale(deltaSca);
            this._npcNodeContainer.addChild(Npc);
            //对话框
            var wordsBg = BaseBitmap.create("public_9_bg25");
            wordsBg.width = 260;
            wordsBg.height = 78;
            wordsBg.setPosition(Npc.x + Npc.width * deltaSca - 90, Npc.y - Npc.height * deltaSca);
            this._npcNodeContainer.addChild(wordsBg);
            var wordsCornerBg = BaseBitmap.create("public_9_bg25_tail");
            wordsCornerBg.x = wordsBg.x + 20;
            wordsCornerBg.y = wordsBg.y + wordsBg.height - 3;
            this._npcNodeContainer.addChild(wordsCornerBg);
            var wordTxt = ComponentManager.getTextField(LanguageManager.getlocal("studyatk_listemptyTip"), 20, TextFieldConst.COLOR_BROWN);
            wordTxt.multiline = true;
            wordTxt.width = wordsBg.width - 30;
            wordTxt.x = wordsBg.x + 15;
            wordTxt.y = wordsBg.y + wordsBg.height / 2 - wordTxt.height / 2;
            this._npcNodeContainer.addChild(wordTxt);
            // let wordsbg = 
        }
        this._npcNodeContainer.visible = isVisible;
        // 
    };
    StudyatkView.prototype.refreshUiAfrerEnter = function (event) {
        if (event.data.ret) {
            var rdata = event.data.data;
            if (rdata.ret == 0) {
                this._studyTableIdx = 0;
                var atkList = rdata.data.atklist;
                // for (var index = 0; index < atkList.length; index++) {
                //     let tmpUid = atkList[index].uid
                //     if (Api.studyatkVoApi.getJoinId() == tmpUid ||tmpUid == Api.playerVoApi.getPlayerID())
                //     {
                //         //自己在房间中，直接打开详情
                //         ViewController.getInstance().openView(ViewConst.COMMON.STUDYATKDETAILVIEW,atkList[index]);
                //         this.hide();
                //         return;
                //     }
                // }
                // this.visible = true;
                for (var index = 0; index < this._studyTableList.length; index++) {
                    this._studyTableList[index].visible = false;
                }
                for (var index = 0; index < atkList.length; index++) {
                    this.createTableItem(atkList[index]);
                }
                var num = 0;
                if (rdata.data.atkNum != null) {
                    num = rdata.data.atkNum;
                }
                else {
                    num = this._studyTableList.length;
                }
                this._numtext.text = LanguageManager.getlocal("studyatk_open_count", [String(num)]);
                this._numbg.width = this._numtext.width + 30;
                this._numbg.x = GameConfig.stageWidth - this._numbg.width;
                this._numtext.x = this._numbg.x + 15;
                this.showNoTableNpc(Object.keys(atkList).length == 0);
                /**
                 * 需要检测当前习武状态
                 */
                var finishinfo = rdata.data.finishinfo;
                if (finishinfo && !this.param) {
                    var studyRet = finishinfo.ret;
                    if (studyRet == 1) {
                        ViewController.getInstance().openView(ViewConst.BASE.STUDYATKSUCCESSVIEW, finishinfo);
                    }
                    else if (studyRet == -1) {
                        ViewController.getInstance().openView(ViewConst.POPUP.STUDYATKFAILEDPOPUPVIEW, finishinfo);
                    }
                }
            }
        }
        this.refreshBookRed();
    };
    StudyatkView.prototype.refreshBookRed = function () {
        if (Api.studyatkVoApi.checkCanUpBook()) {
            this._bookBtnRed.visible = true;
        }
        else {
            this._bookBtnRed.visible = false;
        }
    };
    StudyatkView.prototype.joinBtnHandlerCallback = function (evt) {
        if (evt.data.ret) {
            this.hide();
        }
        else {
            //报错兼容
        }
    };
    StudyatkView.prototype.getRuleInfoParam = function () {
        if (Api.switchVoApi.checkOpenStudyatkNewRule()) {
            if (Api.switchVoApi.checkOpenStudyatkExp()) {
                if (Api.switchVoApi.checkIsSceneState("202")) {
                    var buff = Config.SceneCfg.getSceneCfgBySceneName("cityScene", "202").personalityCfg.buffValue;
                    var addvStr = (buff * 100).toFixed(0) + "%";
                    return [addvStr];
                }
            }
        }
        return [];
    };
    StudyatkView.prototype.getRuleInfo = function () {
        if (Api.switchVoApi.checkOpenStudyatkNewRule()) {
            if (Api.switchVoApi.checkOpenStudyatkExp()) {
                if (Api.switchVoApi.checkIsSceneState("202")) {
                    return "studyatkRuleInfo_new_Exp_withHouseSkin";
                }
                else {
                    return "studyatkRuleInfo_new_Exp";
                }
            }
            else {
                return "studyatkRuleInfo_new";
            }
        }
        else {
            if (Api.switchVoApi.checkOpenStudyatkExp()) {
                return "studyatkRuleInfo_Exp";
            }
            else {
                return "studyatkRuleInfo";
            }
        }
    };
    StudyatkView.prototype.getExtraRuleInfo = function () {
        var params = [];
        if (Api.switchVoApi.checkOpenStudyatkNewRule()) {
            if (Api.switchVoApi.checkIsTitleState("3501")) {
                params.push(LanguageManager.getlocal("studyatkRule_Part1", [LanguageManager.getlocal("studyatkRule_Part1_2"), LanguageManager.getlocal("studyatkRule_Part1_4")]));
            }
            else {
                params.push(LanguageManager.getlocal("studyatkRule_Part1", [LanguageManager.getlocal("studyatkRule_Part1_1"), LanguageManager.getlocal("studyatkRule_Part1_3")]));
            }
        }
        else {
            params.push("");
        }
        if (Api.switchVoApi.checkOpenStudyatkExp()) {
            if (Api.switchVoApi.checkIsTitleState("3501")) {
                params.push(LanguageManager.getlocal("studyatkRule_Part2", [LanguageManager.getlocal("studyatkRule_Part1_2"), LanguageManager.getlocal("studyatkRule_Part2_2")]));
            }
            else {
                params.push(LanguageManager.getlocal("studyatkRule_Part2", [LanguageManager.getlocal("studyatkRule_Part1_1"), ""]));
            }
        }
        else {
            params.push("");
        }
        if (Api.switchVoApi.checkIsSceneState("202")) {
            var buff = Config.SceneCfg.getSceneCfgBySceneName("cityScene", "202").personalityCfg.buffValue;
            var addvStr = (buff * 100).toFixed(0) + "%";
            params.push(LanguageManager.getlocal("studyatkRule_Part3", [addvStr]));
        }
        else {
            params.push("");
        }
        if (Api.switchVoApi.checkOpenStudyAtkProtectNewRule()) {
            return LanguageManager.getlocal("studyatkRuleInfoSpell_noProtect", params);
        }
        return LanguageManager.getlocal("studyatkRuleInfoSpell", params);
    };
    StudyatkView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "studyatk_table", "studyatk_bg1", "wifeview_bottombg", "studyatk_book",
            "forpeople_bottom", "studyatk_master_bg", "studyatk_master", "studyatk_pkBtn", "studyatk_pkBtn_down",
            "studyatk_table_npc", "studyatk_book_name",
        ]);
    };
    StudyatkView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_INDEX), this.refreshUiAfrerEnter, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_CREATE), this.studyBtnHandlerCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_JOIN), this.joinBtnHandlerCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_GOAWAY), this.GoAwayHandler, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_UPGRADE), this.refreshBookRed, this);
        this._studyTableIdx = 0;
        this._studyTableList = [];
        this._nodeContainer = null;
        this._npcNodeContainer = null;
        this._nextEnTxt = null;
        this._nextEnBg = null;
        this._numbg = null;
        this._numtext = null;
        _super.prototype.dispose.call(this);
    };
    return StudyatkView;
}(CommonView));
__reflect(StudyatkView.prototype, "StudyatkView");
//# sourceMappingURL=StudyatkView.js.map