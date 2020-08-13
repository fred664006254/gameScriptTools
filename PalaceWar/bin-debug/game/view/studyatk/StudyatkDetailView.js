/**
 * 练武场
 * author yanyuling
 * date 2017/11/28
 * @class StudyatkDetailView
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
var StudyatkDetailView = (function (_super) {
    __extends(StudyatkDetailView, _super);
    function StudyatkDetailView() {
        var _this = _super.call(this) || this;
        _this._atkData = undefined;
        _this._detailData = undefined;
        _this._lastLogPosY = 0;
        _this._logNum = 0;
        _this._willGetRate = 0;
        _this._shareBtn = null;
        _this._canShare = true;
        //场次分享的时间戳
        _this._shareTime = 0;
        //武穆遗书相关
        _this._bookBtnRed = null;
        _this._forpeople_bottom = null;
        _this._bookBtn = null;
        _this._studyatk_book_name = null;
        _this._curTitleId = '';
        _this._curLevel = 1;
        _this._isend = false;
        return _this;
    }
    StudyatkDetailView.prototype.initView = function () {
        // this._atkData = this.param.data;
        this._isend = false;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_GOAWAY), this.pkBtnHandlerCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_GETATKDETAIL), this.refreshUiAfrerEnter, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_JOIN), this.pkBtnHandlerCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_INDEX), this.finishCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_STUDYATK_FINISH, this.finishCloseCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_USEARMOR), this.shieldHandlerCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_UPGRADE), this.refreshBookRed, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.y = -15;
        this.addChildToContainer(this._nodeContainer);
        var bg = BaseBitmap.create("studyatk_bg2");
        bg.y = GameConfig.stageHeigth - this._nodeContainer.y - this.container.y - bg.height; // - 60;
        this._nodeContainer.addChild(bg);
        var maskBmp = BaseBitmap.create("public_9_viewmask");
        maskBmp.width = GameConfig.stageWidth;
        maskBmp.height = 70;
        this._nodeContainer.addChild(maskBmp);
        var logBg = BaseBitmap.create("public_9_wordbg");
        logBg.width = GameConfig.stageWidth;
        logBg.height = 150;
        logBg.y = GameConfig.stageHeigth - this.container.y - logBg.height - this._nodeContainer.y;
        // this._nodeContainer.addChild(logBg);
        this._logBg = logBg;
        //武穆遗书
        this._forpeople_bottom = BaseBitmap.create("forpeople_bottom");
        this._forpeople_bottom.x = GameConfig.stageWidth - this._forpeople_bottom.width - 30;
        this._forpeople_bottom.y = this._logBg.y - this._forpeople_bottom.height - 75;
        this._nodeContainer.addChild(this._forpeople_bottom);
        this._bookBtn = BaseBitmap.create("studyatk_book");
        this._bookBtn.setPosition(this._forpeople_bottom.x + this._forpeople_bottom.width / 2 - this._bookBtn.width / 2, this._forpeople_bottom.y + this._forpeople_bottom.height / 2 - this._bookBtn.height / 2);
        this._bookBtn.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.STUDYATKBOOKPOPUPVIEW);
        }, this);
        this._nodeContainer.addChild(this._bookBtn);
        this._studyatk_book_name = BaseBitmap.create("studyatk_book_name");
        this._studyatk_book_name.x = this._bookBtn.x + this._bookBtn.width / 2 - this._studyatk_book_name.width / 2;
        this._studyatk_book_name.y = this._bookBtn.y + this._bookBtn.height - this._studyatk_book_name.height;
        this._nodeContainer.addChild(this._studyatk_book_name);
        this._bookBtnRed = BaseBitmap.create("public_dot2");
        this._bookBtnRed.x = this._bookBtn.x + this._bookBtn.width - this._bookBtnRed.width;
        this._bookBtnRed.y = this._bookBtn.y;
        this._bookBtnRed.name = "reddot";
        this._bookBtnRed.setVisible(false);
        this._nodeContainer.addChild(this._bookBtnRed);
        this.refreshBookRed();
        NetManager.request(NetRequestConst.REQUEST_STUDYATK_INDEX, {});
        //test code
        // this.finishCloseCallback();
    };
    StudyatkDetailView.prototype.refreshBookRed = function () {
        if (Api.studyatkVoApi.checkCanUpBook()) {
            this._bookBtnRed.visible = true;
        }
        else {
            this._bookBtnRed.visible = false;
        }
    };
    StudyatkDetailView.prototype.shareToChat = function () {
        if (Api.playerVoApi.getPlayerLevel() < GameData.chatlevel && Api.playerVoApi.getPlayerVipLevel() < 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("reachLvelUnlockDesc2", [Api.playerVoApi.getPlayerOfficeByLevel(GameData.chatlevel)]));
            return;
        }
        var lastShareTime = this._shareTime;
        if (GameData.serverTime - lastShareTime >= GameData.sharechatcd) {
            var snum = Object.keys(this._detailData.minfo).length;
            var studyAtkBaseCfg = GameConfig.config.studyatkbaseCfg;
            var lasttime = studyAtkBaseCfg.lastTime;
            if (this._detailData && this._detailData.skillinfo && this._detailData.skillinfo.lastTime) {
                lasttime = this._detailData.skillinfo.lastTime;
            }
            var endSec = this._detailData.create_time + lasttime;
            ViewController.getInstance().openView(ViewConst.POPUP.DINNERSHAREPOPUPVIEW, { f: this.shareCallback, o: this, stype: 2, exp: this._detailData.skillrate, num: snum, et: endSec });
        }
        else {
            var timeStr = App.DateUtil.getFormatBySecond(GameData.sharechatcd - GameData.serverTime + lastShareTime, 8);
            App.CommonUtil.showTip(LanguageManager.getlocal("dinner_share_time2", [timeStr]));
        }
    };
    StudyatkDetailView.prototype.shareCallback = function () {
        this._shareTime = GameData.serverTime;
        this.tick();
    };
    StudyatkDetailView.prototype.shieldHandlerCallBack = function (event) {
        if (event.data.ret) {
            var rData = event.data.data;
            if (rData.ret != 0) {
                var errcode = rData.data.errcode;
                if (errcode) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_armor_errcode_" + errcode));
                    if (errcode == 5) {
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUEST_STUDYATK_INDEX, {});
                }
            }
        }
        else {
            //兼容
        }
    };
    StudyatkDetailView.prototype.refreshUiAfrerEnter = function (event) {
        if (event.data.ret) {
            var rdata = event.data.data;
            if (rdata.ret == 0) {
                this._detailData = rdata.data.getatkdetail;
                var studyAtkBaseCfg = GameConfig.config.studyatkbaseCfg;
                var lasttime = studyAtkBaseCfg.lastTime;
                if (this._detailData && this._detailData.skillinfo && this._detailData.skillinfo.lastTime) {
                    lasttime = this._detailData.skillinfo.lastTime;
                }
                this._cdEndSec = this._detailData.create_time + lasttime;
                var rate = this._detailData.skillrate;
                // if (Api.playerVoApi.getPlayerID() == this._detailData.uid)
                {
                    var addExp = GameConfig.config.studyatkbaseCfg.addExp;
                    if (Api.switchVoApi.checkOpenStudyatkExp() && this._detailData.mystkRate && this._detailData.mystkRate > 0) {
                        addExp += this._detailData.mystkRate;
                    }
                    if (Api.switchVoApi.checkIsSceneState("202") && this._detailData.mysceneRate && this._detailData.mysceneRate > 0) {
                        addExp += this._detailData.mysceneRate;
                    }
                    this._willGetRate = rate * (1 + addExp);
                }
                var willgetV = this._willGetRate * Math.floor((GameData.serverTime - this._detailData.create_time) / 60);
                // let willGet = Math.floor(rate);
                // this._willGetRate = rate;
                var studyAddTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
                this._studyAddTxt = studyAddTxt;
                this._studyAddTxt.text = LanguageManager.getlocal("study_table_willGet", [String(Math.floor(rate))]);
                studyAddTxt.x = 10;
                studyAddTxt.y = 10;
                this._nodeContainer.addChild(studyAddTxt);
                this._cdTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
                var leftTimt = this._cdEndSec - GameData.serverTime;
                this._cdTxt.text = LanguageManager.getlocal("study_table_lastt", [App.DateUtil.getFormatBySecond(leftTimt, 3)]);
                this._cdTxt.x = studyAddTxt.x;
                this._cdTxt.y = studyAddTxt.y + 30;
                this._nodeContainer.addChild(this._cdTxt);
                var posCfg = (_a = {},
                    _a["1"] = {
                        x: 120,
                        y: GameConfig.stageHeigth - 560,
                    },
                    _a["2"] = {
                        x: 320,
                        y: GameConfig.stageHeigth - 520,
                    },
                    _a["3"] = {
                        x: 520,
                        y: GameConfig.stageHeigth - 560,
                    },
                    _a);
                var minfo = this._detailData.minfo;
                for (var index = 1; index <= 3; index++) {
                    //    for (var key in minfo) {
                    var key = String(index);
                    var role = new StudyatkDetailRoleInfoItem();
                    role.init(minfo[key], key, this._detailData);
                    role.x = posCfg[key].x;
                    role.y = posCfg[key].y;
                    this._nodeContainer.addChild(role);
                }
                //房主形象
                var curLv = this._detailData.level;
                var titleinfo = App.CommonUtil.getTitleData(this._detailData.title);
                var pic = this._detailData.pic;
                if (titleinfo.clothes != "") {
                    if (!Config.TitleCfg.getIsTitleOnly(titleinfo.clothes)) {
                        curLv = titleinfo.clothes;
                    }
                    var titleCfg = Config.TitleCfg;
                    var titleconfig = titleCfg.getTitleCfgById(titleinfo.clothes);
                    if (titleconfig && titleconfig.isTitle == 1 && (titleconfig.titleType == 1 || titleconfig.titleType == 2 || titleconfig.titleType == 7)) {
                        this._curTitleId = titleinfo.clothes;
                        this._curLevel = titleinfo.clv;
                        if (this._curLevel == 0) {
                            this._curLevel = 1;
                        }
                    }
                    // if (Config.TitleCfg.checkHasSpecialHead(titleinfo.clothes))
                    // {
                    //     pic= Config.TitleCfg.getSpecialHead(titleinfo.clothes,pic);
                    // }
                }
                var isnew = Api.playerVoApi.getNewPalaceRole(curLv) || Config.TitleCfg.isTheKingTitleId(this._curTitleId);
                var roleImg = null;
                if (this._curTitleId) {
                    roleImg = new BaseDisplayObjectContainer();
                    this._nodeContainer.addChild(roleImg);
                    var deltaS = 1.0;
                    roleImg.setScale(deltaS);
                    roleImg.x = isnew ? -160 : -10;
                    ;
                    roleImg.y = this._logBg.y - 321;
                    roleImg.name = "roleImg";
                    var role = null;
                    var myHair = null;
                    var tcfg = Config.TitleCfg.getTitleCfgById(this._curTitleId);
                    var resPath = "palace_db_" + this._curTitleId + (tcfg.titleType == 7 ? "_" + Api.playerVoApi.getUserSex(pic) : "");
                    if (App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes(resPath + "_ske")) {
                        var loadIdx = 0;
                        role = App.CommonUtil.getPlayerDragonRole(this._curTitleId, pic, this._curLevel);
                        role.x = 340;
                        role.y = 35;
                        roleImg.addChild(role);
                        role.name = 'role';
                        // role.getChildByName("dbNode1").visible = false;
                        // role.getChildByName("dbNode2").visible = false;
                        // role.getChildByName("dbNode3").visible = false;
                    }
                    else {
                        role = Api.playerVoApi.getPlayerPortrait(Number(this._curTitleId), pic, 0, false, null, null, this._curLevel);
                        roleImg.addChild(role);
                        if (Config.TitleCfg.isTheKingTitleId(this._curTitleId)) {
                            roleImg.x = -10;
                        }
                        // role.getChildByName("dbNode1").visible = false;
                        // role.getChildByName("dbNode2").visible = false;
                        // role.getChildByName("dbNode3").visible = false;
                    }
                }
                else {
                    roleImg = Api.playerVoApi.getPlayerPortrait(curLv, pic);
                    var deltaS = 1.0;
                    roleImg.setScale(deltaS);
                    roleImg.x = isnew ? -160 : -10;
                    ;
                    roleImg.y = this._logBg.y - roleImg.height / 2 * deltaS + 45;
                    this._nodeContainer.addChild(roleImg);
                    // roleImg.getChildByName("dbNode1").visible = false;
                    // roleImg.getChildByName("dbNode2").visible = false;
                    // roleImg.getChildByName("dbNode3").visible = false;
                }
                var masterBg = BaseBitmap.create("studyatk_master_bg");
                masterBg.width = 250;
                masterBg.height = 60;
                masterBg.x = 0;
                masterBg.y = this._logBg.y - masterBg.height;
                this._nodeContainer.addChild(masterBg);
                var studyatk_upbg = BaseBitmap.create("studyatk_upbg");
                studyatk_upbg.x = masterBg.x + masterBg.width / 2 - studyatk_upbg.width / 2;
                studyatk_upbg.y = masterBg.y - studyatk_upbg.height - 2;
                this._nodeContainer.addChild(studyatk_upbg);
                var studyatk_uparrow = BaseBitmap.create("studyatk_uparrow");
                studyatk_uparrow.x = studyatk_upbg.x + studyatk_upbg.width / 2 + 20;
                studyatk_uparrow.y = studyatk_upbg.y + studyatk_upbg.height / 2 - studyatk_uparrow.height / 2;
                this._nodeContainer.addChild(studyatk_uparrow);
                var addV = GameConfig.config.studyatkbaseCfg.addExp;
                if (Api.switchVoApi.checkOpenStudyatkExp() && this._detailData.mystkRate && this._detailData.mystkRate > 0) {
                    addV += this._detailData.mystkRate;
                }
                if (Api.switchVoApi.checkIsSceneState("202") && this._detailData.mysceneRate && this._detailData.mysceneRate > 0) {
                    addV += this._detailData.mysceneRate;
                }
                var addvStr = (100 + addV * 100).toFixed(0) + "%";
                var upBF = ComponentManager.getBitmapText(addvStr, "studyatk_upfnt");
                upBF.x = studyatk_uparrow.x - upBF.width - 5;
                upBF.y = studyatk_upbg.y + studyatk_upbg.height / 2 - upBF.height / 2;
                this._nodeContainer.addChild(upBF);
                //英文版教头标识位置不同
                if (PlatformManager.checkIsTextHorizontal()) {
                    var master = BaseBitmap.create("studyatk_master");
                    master.x = masterBg.x;
                    master.y = masterBg.y + masterBg.height / 2 - master.height / 2 - 36;
                    if (PlatformManager.checkIsThSp()) {
                        master.x += 35;
                        master.y -= 20;
                    }
                    this._nodeContainer.addChild(master);
                    var nameTxt = ComponentManager.getTextField(this._detailData.name, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
                    nameTxt.x = masterBg.x + 40 - 25;
                    nameTxt.y = masterBg.y + 8;
                    this._nodeContainer.addChild(nameTxt);
                    var officerTxt = ComponentManager.getTextField("", 20);
                    officerTxt.text = LanguageManager.getlocal("officialTitle" + this._detailData.level);
                    officerTxt.x = nameTxt.x + nameTxt.width + 20;
                    officerTxt.y = nameTxt.y;
                    this._nodeContainer.addChild(officerTxt);
                    var getTxt = ComponentManager.getTextField("", 20);
                    this._getTxt = getTxt;
                    this._getTxt.text = LanguageManager.getlocal("study_table_get", [String(Math.floor(willgetV))]);
                    getTxt.x = nameTxt.x;
                    getTxt.y = officerTxt.y + 25;
                    this._nodeContainer.addChild(getTxt);
                }
                else {
                    var master = BaseBitmap.create("studyatk_master");
                    master.x = masterBg.x + 7;
                    master.y = masterBg.y + masterBg.height / 2 - master.height / 2;
                    this._nodeContainer.addChild(master);
                    var nameTxt = ComponentManager.getTextField(this._detailData.name, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
                    nameTxt.x = masterBg.x + 40;
                    nameTxt.y = masterBg.y + 8;
                    this._nodeContainer.addChild(nameTxt);
                    var officerTxt = ComponentManager.getTextField("", 20);
                    officerTxt.text = LanguageManager.getlocal("officialTitle" + this._detailData.level);
                    officerTxt.x = nameTxt.x + nameTxt.width + 20;
                    officerTxt.y = nameTxt.y;
                    this._nodeContainer.addChild(officerTxt);
                    var getTxt = ComponentManager.getTextField("", 20);
                    this._getTxt = getTxt;
                    this._getTxt.text = LanguageManager.getlocal("study_table_get", [String(Math.floor(willgetV))]);
                    getTxt.x = nameTxt.x;
                    getTxt.y = officerTxt.y + 25;
                    this._nodeContainer.addChild(getTxt);
                }
                //房间log
                this._nodeContainer.addChild(this._logBg);
                var atkinfo = this._detailData.atkinfo;
                var rect = new egret.Rectangle(0, 0, this._logBg.width, this._logBg.height - 20);
                var tmpNode = new BaseDisplayObjectContainer();
                this._logTmpNode = tmpNode;
                this._lastLogPosY = 5;
                var scrollList = ComponentManager.getScrollView(tmpNode, rect);
                scrollList.x = this._logBg.x;
                scrollList.y = this._logBg.y + 15;
                this._nodeContainer.addChild(scrollList);
                for (var index = 0; index < atkinfo.length; index++) {
                    var tmpLog = atkinfo[index];
                    this.updateLog(tmpLog);
                }
                if (Api.switchVoApi.checkOpenStudyatkShare() && this.param.data.uid == Api.playerVoApi.getPlayerID()) {
                    if (atkinfo[0].shareCd) {
                        this._shareTime = atkinfo[0].shareCd;
                    }
                    this._shareBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE, "sharePopupViewTitle", this.shareToChat, this);
                    this._shareBtn.setPosition(GameConfig.stageWidth - this._shareBtn.width - 40, this._logBg.y - this._shareBtn.height - 10);
                    this._nodeContainer.addChild(this._shareBtn);
                    this.tick();
                }
            }
            else 
            // if(rdata.ret == -3)
            {
                // if(this.param.data.uid != Api.playerVoApi.getPlayerID() && Api.studyatkVoApi.getJoinId() != 0 )
                // {
                //     App.CommonUtil.showTip( LanguageManager.getlocal("studyatk_pk_goawaycode-3"));
                // }
                this.hide();
                ViewController.getInstance().openView(ViewConst.COMMON.STUDYATKVIEW);
            }
        }
        else {
            //错误兼容
        }
        if (this._forpeople_bottom) {
            if (this._shareBtn) {
                this._forpeople_bottom.setPosition(GameConfig.stageWidth - this._forpeople_bottom.width - 30, this._logBg.y - this._forpeople_bottom.height - this._shareBtn.height - 10);
            }
            else {
                this._forpeople_bottom.setPosition(GameConfig.stageWidth - this._forpeople_bottom.width - 30, this._logBg.y - this._forpeople_bottom.height - 10);
            }
        }
        if (this._bookBtn && this._forpeople_bottom) {
            this._bookBtn.setPosition(this._forpeople_bottom.x + this._forpeople_bottom.width / 2 - this._bookBtn.width / 2, this._forpeople_bottom.y + this._forpeople_bottom.height / 2 - this._bookBtn.height / 2);
        }
        if (this._studyatk_book_name && this._bookBtn) {
            this._studyatk_book_name.setPosition(this._bookBtn.x + this._bookBtn.width / 2 - this._studyatk_book_name.width / 2, this._bookBtn.y + this._bookBtn.height - this._studyatk_book_name.height);
        }
        if (this._bookBtn && this._bookBtnRed) {
            this._bookBtnRed.setPosition(this._bookBtn.x + this._bookBtn.width - this._bookBtnRed.width, this._bookBtn.y);
        }
        var _a;
    };
    StudyatkDetailView.prototype.updateLog = function (tmpLog) {
        this._logNum++;
        var logTxt = ComponentManager.getTextField("", 20);
        var tStr = App.DateUtil.getFormatBySecond(tmpLog.st - App.DateUtil.getWeeTs(tmpLog.st), 1);
        if (tmpLog.dtype == 3) {
            var tmpName = Api.playerVoApi.getPlayerName();
            if (tmpLog.ret == 1) {
                logTxt.text = LanguageManager.getlocal("studyatk_logtxt4", [tmpLog.name2]);
            }
            else {
                logTxt.text = LanguageManager.getlocal("studyatk_logtxt3", [tmpLog.name2]);
            }
        }
        else if (tmpLog.dtype == 4) {
            logTxt.text = LanguageManager.getlocal("studyatk_logtxt5");
        }
        else {
            logTxt.text = LanguageManager.getlocal("studyatk_logtxt" + tmpLog.dtype);
        }
        logTxt.multiline = true;
        logTxt.lineSpacing = 5;
        logTxt.width = 300;
        var nameTxt = ComponentManager.getTextField("【" + tmpLog.name1 + "】", 20);
        nameTxt.x = 30;
        nameTxt.y = this._lastLogPosY;
        this._logTmpNode.addChild(nameTxt);
        logTxt.x = 180;
        logTxt.y = nameTxt.y;
        var timeTxt = ComponentManager.getTextField(tStr, 20);
        timeTxt.x = 510;
        timeTxt.y = logTxt.y;
        this._logTmpNode.addChild(timeTxt);
        this._lastLogPosY += logTxt.height + 5;
        this._logTmpNode.addChild(logTxt);
        this._logTmpNode.height = this._lastLogPosY + 30;
    };
    StudyatkDetailView.prototype.pkBtnHandlerCallBack = function (event) {
        if (event.data.ret) {
            var rData = event.data.data;
            if (rData.ret == 0) {
                if (rData.cmd == NetRequestConst.REQUEST_STUDYATK_JOIN) {
                    var joincode = rData.data.joincode;
                    if (joincode && joincode == -2) {
                        var self_1 = this;
                        egret.setTimeout(function () {
                            self_1.hide();
                        }, this, 1000);
                    }
                }
                var atkinfo = rData.data.getatkdetail.atkinfo;
                if (atkinfo) {
                    var infoLen = atkinfo.length;
                    if (infoLen == this._logNum) {
                        return;
                    }
                    for (var index = this._logNum; index < infoLen; index++) {
                        this.updateLog(atkinfo[index]);
                    }
                }
            }
        }
        else {
            //容错处理
        }
    };
    StudyatkDetailView.prototype.finishCallback = function (event) {
        if (event.data.ret) {
            var rdata = event.data.data;
            if (rdata.ret == 0) {
                var finishinfo = rdata.data.finishinfo;
                if (finishinfo) {
                    this._isend = true;
                    var studyRet = finishinfo.ret;
                    if (studyRet == 1) {
                        ViewController.getInstance().openView(ViewConst.BASE.STUDYATKSUCCESSVIEW, finishinfo);
                    }
                    else if (studyRet == -1) {
                        ViewController.getInstance().openView(ViewConst.POPUP.STUDYATKFAILEDPOPUPVIEW, finishinfo);
                    }
                }
                else {
                    if (!this._studyAddTxt) {
                        var tmpFuid = this.param.data.uid;
                        NetManager.request(NetRequestConst.REQUEST_STUDYATK_GETATKDETAIL, { fuid: tmpFuid });
                    }
                }
            }
        }
        else {
            //兼容处理
        }
        this.refreshBookRed();
    };
    StudyatkDetailView.prototype.finishCloseCallback = function () {
        if (this.isInHome()) {
            this.hide();
            ViewController.getInstance().openView(ViewConst.COMMON.STUDYATKVIEW, {});
        }
    };
    StudyatkDetailView.prototype.isInHome = function () {
        /**
         * 房主，
         */
        if (this._detailData && Api.playerVoApi.getPlayerID() == this._detailData.uid) {
            return true;
        }
        if (this._detailData) {
            for (var key in this._detailData.minfo) {
                var element = this._detailData.minfo[key];
                if (element.uid == Api.playerVoApi.getPlayerID()) {
                    return true;
                }
            }
        }
        else {
            this.hide();
            ViewController.getInstance().openView(ViewConst.COMMON.STUDYATKVIEW, {});
        }
        return false;
    };
    StudyatkDetailView.prototype.tick = function () {
        if (this.param.data.uid == Api.playerVoApi.getPlayerID() && this._shareBtn) {
            if (GameData.serverTime - this._shareTime >= GameData.sharechatcd) {
                if (this._canShare == false) {
                    this._canShare = true;
                    App.DisplayUtil.changeToNormal(this._shareBtn);
                }
            }
            else {
                if (this._canShare == true) {
                    this._canShare = false;
                    App.DisplayUtil.changeToGray(this._shareBtn);
                }
            }
        }
        if (this._cdEndSec) {
            var leftTimt = this._cdEndSec - GameData.serverTime;
            if (leftTimt >= 0) {
                var studyAtkBaseCfg = GameConfig.config.studyatkbaseCfg;
                this._cdTxt.text = LanguageManager.getlocal("study_table_lastt", [App.DateUtil.getFormatBySecond(leftTimt, 3)]);
                var willgetV = this._willGetRate * Math.floor((GameData.serverTime - this._detailData.create_time) / 60);
                this._getTxt.text = LanguageManager.getlocal("study_table_get", [String(Math.floor(willgetV))]);
                if (leftTimt == 0 && this.isInHome()) {
                    // 是否需要关闭此界面？
                    NetManager.request(NetRequestConst.REQUEST_STUDYATK_INDEX, {});
                }
                return true;
            }
            else {
                this.hide();
                ViewController.getInstance().openView(ViewConst.COMMON.STUDYATKVIEW, {});
                // ViewController.getInstance().getView("StudyatkDetailView").hide();
            }
        }
        return false;
    };
    StudyatkDetailView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "studyatk_table", "studyatk_master_bg",
            "studyatk_bg2", "studyatk_master",
            "studyatk_frame", "studyatk_arrow", "studyatk_frame_light", "atkrace_name_bg", "studyatk_armorBtn",
            "studyatkArmor_smoke",
            "studyatkArmor_xuan", "studyatk_pkBtn", "studyatk_pkBtn_down",
            "studyatkArmor", "studyatk_upfnt", "studyatk_upbg", "studyatk_uparrow", "studyatk_book", "studyatk_book_name", "forpeople_bottom", "alliance_memicon",
        ]);
    };
    StudyatkDetailView.prototype.getRuleInfoParam = function () {
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
    StudyatkDetailView.prototype.getRuleInfo = function () {
        if (Api.switchVoApi.checkOpenStudyatkNewRule()) {
            if (Api.switchVoApi.checkOpenStudyatkExp()) {
                if (Api.switchVoApi.checkIsSceneState("202")) {
                    return "studyatk_description_new_Exp_withHouseSkin";
                }
                else {
                    return "studyatk_description_new_Exp";
                }
            }
            else {
                return "studyatk_description_new";
            }
        }
        else {
            if (Api.switchVoApi.checkOpenStudyatkExp()) {
                return "studyatk_description_Exp";
            }
            else {
                return "studyatk_description";
            }
        }
    };
    StudyatkDetailView.prototype.getExtraRuleInfo = function () {
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
    StudyatkDetailView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_GETATKDETAIL), this.refreshUiAfrerEnter, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_GOAWAY), this.pkBtnHandlerCallBack, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_JOIN), this.pkBtnHandlerCallBack, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_INDEX), this.finishCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_STUDYATK_FINISH, this.finishCloseCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_USEARMOR), this.shieldHandlerCallBack, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_UPGRADE), this.refreshBookRed, this);
        this._nodeContainer = null;
        this._cdTxt = null;
        this._cdEndSec = null;
        this._atkData = null;
        this._detailData = null;
        this._logBg = null;
        this._lastLogPosY = null;
        this._logTmpNode = null;
        this._studyAddTxt = null;
        this._getTxt = null;
        this._logNum = 0;
        this._willGetRate = 0;
        if (this._shareBtn) {
            App.DisplayUtil.changeToNormal(this._shareBtn);
        }
        this._shareBtn = null;
        this._shareTime = 0;
        this._canShare = true;
        this._bookBtnRed = null;
        this._forpeople_bottom = null;
        this._bookBtn = null;
        this._studyatk_book_name = null;
        this._curTitleId = '';
        this._curLevel = 1;
        this._isend = false;
        _super.prototype.dispose.call(this);
    };
    return StudyatkDetailView;
}(CommonView));
__reflect(StudyatkDetailView.prototype, "StudyatkDetailView");
//# sourceMappingURL=StudyatkDetailView.js.map