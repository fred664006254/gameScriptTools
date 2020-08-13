/**
 * 帝位升级
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
var TitleUpgradeLevelUpView = (function (_super) {
    __extends(TitleUpgradeLevelUpView, _super);
    function TitleUpgradeLevelUpView() {
        var _this = _super.call(this) || this;
        _this._progress = null;
        _this._leveltxtbg = null;
        _this._leveltxt = null;
        _this._culvTxt = null;
        _this._prevlvTxt = null;
        _this._nextlvTxt = null;
        _this._curLevel = 1;
        _this._leftbtn = null;
        _this._rightbtn = null;
        _this._tiptxt = null;
        _this._bottombg = null;
        _this._collectflag = null;
        _this._nameBg = null;
        _this._nameTxt = null;
        _this._titleImg = null;
        _this._prevbg = null;
        _this._nextbg = null;
        _this._curlvbg = null;
        _this._stopTouch = false;
        _this._attr1Txt = null;
        _this._attr2Txt = null;
        _this._attr3Txt = null;
        _this._attr4Txt = null;
        _this._upgradeGroup = null;
        return _this;
    }
    TitleUpgradeLevelUpView.prototype.initView = function () {
        var _this = this;
        this._stopTouch = false;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TITLEUPGRADE), this.upgradeCallback, this);
        this.width = GameConfig.stageWidth;
        this.height = GameConfig.stageHeigth;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._curTitleId = this.param.data.titleid;
        var info = Api.titleupgradeVoApi.getTitleInfo(this._curTitleId);
        var titleconfig = Config.TitleCfg.getTitleCfgById(this._curTitleId);
        var arr = [];
        switch (titleconfig.titleType) {
            case 1:
                arr = Config.TitleupgradeCfg.diList;
                break;
            case 2:
                arr = Config.TitleupgradeCfg.wangList;
                break;
            case 7:
                arr = Config.TitleupgradeCfg.huangList;
                break;
        }
        this._curLevel = Math.min(info.level + 1, arr.length);
        if (this._curLevel == 0) {
            this._curLevel = 1;
        }
        var bgPath = "palace_bg";
        var imgH = 1096;
        if (Config.TitleCfg.isTheKingTitleId(this._curTitleId)) {
            bgPath = "palace_bg4";
            imgH = 1136;
        }
        var palace_bg = BaseLoadBitmap.create(bgPath);
        palace_bg.width = 640;
        palace_bg.height = imgH;
        palace_bg.y = GameConfig.stageHeigth - this.container.y - palace_bg.height;
        this._nodeContainer.addChild(palace_bg);
        var role = null;
        var tcfg = Config.TitleCfg.getTitleCfgById(this._curTitleId);
        if ((!Api.switchVoApi.checkCloseBone()) && App.CommonUtil.check_dragon() && Api.playerVoApi.checkHasDragonBones(this._curTitleId)) {
            role = App.CommonUtil.getPlayerDragonRole(this._curTitleId, Api.playerVoApi.getPlayePicId(), this._curLevel);
            role.x = 320;
            role.y = 175;
        }
        else {
            role = Api.playerVoApi.getPlayerPortrait(Number(this._curTitleId), Api.playerVoApi.getPlayePicId(), 0, false, null, null, this._curLevel);
            this._nodeContainer.addChild(role);
            role.x = GameConfig.stageWidth / 2 - role.width / 2;
            role.y = titleconfig.titleType == 7 ? 100 : 140;
        }
        var titleImg = App.CommonUtil.getTitlePic(this._curTitleId, this._curLevel);
        titleImg.width = 155;
        titleImg.height = 59;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titleImg, this, [0, role.y - titleImg.height - (Api.playerVoApi.checkHasDragonBones(this._curTitleId) ? 45 : 25)]);
        // this._nodeContainer.addChild(titleImg);
        this.addChild(titleImg);
        this._titleImg = titleImg;
        this._titleImg.y += this.container.y;
        this._curRoleImg = role;
        var nameBg = BaseLoadBitmap.create("servant_attributemap");
        this.addChild(nameBg);
        this._nameBg = nameBg;
        var nameTxt = ComponentManager.getTextField(LanguageManager.getlocal("palace_titleTip_" + this._curTitleId), 20, TextFieldConst.COLOR_WARN_YELLOW);
        nameBg.width = nameTxt.width + 100;
        nameBg.height = 51;
        nameBg.anchorOffsetX = nameBg.width / 2;
        nameBg.x = GameConfig.stageWidth / 2;
        nameBg.y = 115;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, nameBg);
        this.addChild(nameTxt);
        this._nameTxt = nameTxt;
        /**
         * 考虑层级问题
         */
        var bottombg = BaseBitmap.create("arena_bottom");
        bottombg.width = GameConfig.stageWidth;
        bottombg.height = 100;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, this);
        this.addChild(bottombg);
        this._bottombg = bottombg;
        var tipTxtStr = "titleupgradeleveltip1";
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(tipTxtStr), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, bottombg, [0, 10]);
        this.addChild(tipTxt);
        this._tiptxt = tipTxt;
        for (var i = 1; i < 5; ++i) {
            var txt_1 = ComponentManager.getTextField(LanguageManager.getlocal("titleupgradeattrtip" + i, [""]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            txt_1.x = i % 2 == 1 ? 95 : 400;
            txt_1.y = tipTxt.y + tipTxt.textHeight + 8 + (i < 3 ? 0 : 28);
            this["_attr" + i + "Txt"] = txt_1;
            this.addChild(txt_1);
        }
        var collectflag = BaseBitmap.create("titleupgradeget");
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, collectflag, bottombg);
        this.addChild(collectflag);
        collectflag.visible = false;
        this._collectflag = collectflag;
        var progressGroup = new BaseDisplayObjectContainer();
        progressGroup.width = GameConfig.stageWidth;
        progressGroup.height = 118;
        this.addChild(progressGroup);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressGroup, progressgroupbg, [0,5]);
        this._progressGroup = progressGroup;
        var progressgroupbg = BaseBitmap.create("titleupgradebottombg2");
        progressGroup.addChild(progressgroupbg);
        // let line1 = BaseBitmap.create(`titleupgradeline`);
        // progressGroup.addChild(line1);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, line1, progressgroupbg, [35,-27]);
        // let line2 = BaseBitmap.create(`titleupgradeline`);
        // progressGroup.addChild(line2);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, line2, progressgroupbg, [35,-27]);
        var progress = ComponentManager.getProgressBar("progress16", "progress16_bg", 490);
        progress.setPercentage(0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, progress, progressgroupbg, [0, 15]);
        progressGroup.addChild(progress);
        this._progress = progress;
        var progressbg = BaseBitmap.create("titleupgradeprogressbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, progressbg, progress);
        progressGroup.addChild(progressbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressGroup, bottombg, [0, -progressGroup.height]);
        var leveltxtbg = BaseBitmap.create("specialview_commoni_namebg");
        leveltxtbg.width = 370;
        this.addChild(leveltxtbg);
        this._leveltxtbg = leveltxtbg;
        var leveltxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WHITE);
        this.addChild(leveltxt);
        this._leveltxt = leveltxt;
        var curlvbg = BaseBitmap.create("public_itemtipbg2");
        curlvbg.width = 400;
        this.addChild(curlvbg);
        this._curlvbg = curlvbg;
        var culvTxt = ComponentManager.getBitmapText("", "socre_fnt");
        culvTxt.letterSpacing = -10;
        this.addChild(culvTxt);
        this._culvTxt = culvTxt;
        var prevbg = BaseBitmap.create("public_9_bg72");
        prevbg.width = 55;
        progressGroup.addChild(prevbg);
        this._prevbg = prevbg;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, prevbg, progressGroup, [15, 15], true);
        var prevlvTxt = ComponentManager.getTextField(LanguageManager.getlocal(""), 18, TextFieldConst.COLOR_WARN_YELLOW);
        progressGroup.addChild(prevlvTxt);
        this._prevlvTxt = prevlvTxt;
        var nextbg = BaseBitmap.create("public_9_bg72");
        nextbg.width = 55;
        progressGroup.addChild(nextbg);
        this._nextbg = nextbg;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, nextbg, progressGroup, [15, 15], true);
        var nextlvTxt = ComponentManager.getTextField(LanguageManager.getlocal(""), 18, TextFieldConst.COLOR_WARN_YELLOW);
        progressGroup.addChild(nextlvTxt);
        this._nextlvTxt = nextlvTxt;
        var upgradeGroup = new BaseDisplayObjectContainer();
        upgradeGroup.width = 119;
        upgradeGroup.height = 137;
        this._upgradeGroup = upgradeGroup;
        this.addChild(upgradeGroup);
        var upgradeBtn = ComponentManager.getButton("titleupgradebtn", '', function () {
            //升级
            if (_this._stopTouch) {
                return;
            }
            var titleconfig = Config.TitleCfg.getTitleCfgById(_this._curTitleId);
            var isdi = titleconfig.isTitle == 1 && titleconfig.titleType == 1;
            var arr = [];
            switch (titleconfig.titleType) {
                case 1:
                    arr = Config.TitleupgradeCfg.diList;
                    break;
                case 2:
                    arr = Config.TitleupgradeCfg.wangList;
                    break;
                case 7:
                    arr = Config.TitleupgradeCfg.huangList;
                    break;
            }
            var info = Api.titleupgradeVoApi.getTitleInfo(_this._curTitleId);
            var curlv = info.level;
            if (curlv < arr.length) {
                _this._stopTouch = true;
                NetManager.request(NetRequestConst.REQUEST_TITLEUPGRADE, {
                    titleId: _this._curTitleId
                });
            }
            //
        }, this);
        upgradeGroup.addChild(upgradeBtn);
        var txt = BaseBitmap.create("titleupgradebtntxt");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt, upgradeBtn);
        var upgradeclip = ComponentManager.getCustomMovieClip("titlelevelbtn", 12);
        upgradeclip.playWithTime(-1);
        upgradeGroup.addChild(upgradeclip);
        upgradeclip.x = -30;
        upgradeclip.y = -110;
        upgradeGroup.addChild(txt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, upgradeGroup, bottombg, [0, -upgradeGroup.height - 280]);
        var roleinfo = {
            titleId: this._curTitleId,
            uid: Api.playerVoApi.getPlayerID(),
            pic: Api.playerVoApi.getPlayePicId(),
            name: Api.playerVoApi.getPlayerName(),
        };
        var leftgroup = new BaseDisplayObjectContainer();
        leftgroup.width = 37;
        leftgroup.height = 55;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, leftgroup, this, [37, 0]);
        this.addChild(leftgroup);
        this._leftbtn = leftgroup;
        var leftbtn = ComponentManager.getButton("titleupgradearrow", "", function () {
            var page = Math.max(1, _this._curLevel - 1);
            if (page != _this._curLevel) {
                _this._curLevel = page;
                _this.freshView();
                _this.removeChild(_this._titleImg);
                _this.addChild(_this._titleImg);
            }
        }, this);
        leftbtn.anchorOffsetX = leftbtn.width / 2;
        leftbtn.anchorOffsetY = leftbtn.height / 2;
        leftbtn.scaleX = -1;
        egret.Tween.get(leftbtn, { loop: true }).to({ scaleX: -1.05, scaleY: 1.05 }, 400).to({ scaleX: -1, scaleY: 1 }, 400);
        leftgroup.addChild(leftbtn);
        // let leftbtn2 = BaseBitmap.create("titleupgradearrow");
        // leftbtn2.anchorOffsetX = leftbtn2.width / 2;
        // leftbtn2.anchorOffsetY = leftbtn2.height / 2;
        // leftbtn2.scaleX = -1;
        // leftbtn2.setPosition(leftbtn.x, leftbtn.y);
        // leftgroup.addChild(leftbtn2);
        // leftbtn2.blendMode = egret.BlendMode.ADD;
        // leftbtn2.alpha = 0;
        // egret.Tween.get(leftbtn2, { loop: true }).to({ alpha: 0.7, scaleX: -1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: -1, scaleY: 1 }, 400);
        var riightgroup = new BaseDisplayObjectContainer();
        riightgroup.width = 37;
        riightgroup.height = 55;
        riightgroup.x = GameConfig.stageWidth - 37;
        riightgroup.y = leftgroup.y;
        this.addChild(riightgroup);
        this._rightbtn = riightgroup;
        var rightbtn = ComponentManager.getButton("titleupgradearrow", "", function () {
            var page = Math.min(arr.length, _this._curLevel + 1);
            if (page != _this._curLevel) {
                _this._curLevel = page;
                _this.freshView();
                _this.removeChild(_this._titleImg);
                _this.addChild(_this._titleImg);
            }
        }, this);
        rightbtn.anchorOffsetX = rightbtn.width / 2;
        rightbtn.anchorOffsetY = rightbtn.height / 2;
        egret.Tween.get(rightbtn, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        //特效
        riightgroup.addChild(rightbtn);
        // let rightbtn2 = BaseBitmap.create("titleupgradearrow");
        // rightbtn2.anchorOffsetX = rightbtn2.width / 2;
        // rightbtn2.anchorOffsetY = rightbtn2.height / 2;
        // rightbtn2.setPosition(rightbtn.x, rightbtn.y);
        // riightgroup.addChild(rightbtn2);
        // rightbtn2.blendMode = egret.BlendMode.ADD;
        // rightbtn2.alpha = 0;
        // egret.Tween.get(rightbtn2, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        this.freshView();
        this.removeChild(this._titleImg);
        this.addChild(this._titleImg);
    };
    TitleUpgradeLevelUpView.prototype.freshView = function () {
        var view = this;
        var api = Api.titleupgradeVoApi;
        var info = api.getTitleInfo(view._curTitleId);
        var curlv = info.level;
        var titleconfig = Config.TitleCfg.getTitleCfgById(this._curTitleId);
        var isdi = titleconfig.isTitle == 1 && titleconfig.titleType == 1;
        var arr = [];
        switch (titleconfig.titleType) {
            case 1:
                arr = Config.TitleupgradeCfg.diList;
                break;
            case 2:
                arr = Config.TitleupgradeCfg.wangList;
                break;
            case 7:
                arr = Config.TitleupgradeCfg.huangList;
                break;
        }
        //升级按钮显示
        if (curlv == arr.length) {
            view._upgradeGroup.visible = false;
        }
        else {
            view._upgradeGroup.visible = (curlv + 1 == view._curLevel && api.canTitleLevelUp(view._curTitleId));
        }
        view._culvTxt.text = LanguageManager.getlocal("servant_lv", [view._curLevel.toString()]);
        view._curlvbg.width = view._culvTxt.textWidth + 60;
        var leftred = false;
        for (var i = 2; i < view._curLevel; ++i) {
            if (Api.titleupgradeVoApi.canTitleLevelUp(view._curTitleId, i)) {
                leftred = true;
                break;
            }
        }
        var rightred = false;
        for (var i = (view._curLevel + 1); i <= arr.length; ++i) {
            if (Api.titleupgradeVoApi.canTitleLevelUp(view._curTitleId, i)) {
                rightred = true;
                break;
            }
        }
        if (curlv < view._curLevel) {
            rightred = false;
        }
        if (leftred) {
            App.CommonUtil.addIconToBDOC(view._leftbtn);
            var redpoint = view._leftbtn.getChildByName("reddot");
            if (redpoint) {
                redpoint.x = -15;
                redpoint.y = -30;
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._leftbtn);
        }
        if (rightred) {
            App.CommonUtil.addIconToBDOC(view._rightbtn);
            var redpoint = view._rightbtn.getChildByName("reddot");
            if (redpoint) {
                redpoint.x = -7;
                redpoint.y = -30;
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(view._rightbtn);
        }
        if (curlv == 0) {
            view._nameBg.visible = view._nameTxt.visible = true;
            view._upgradeGroup.visible = view._progressGroup.visible = view._leveltxt.visible = view._leveltxtbg.visible = false;
        }
        else {
            view._nameBg.visible = view._nameTxt.visible = false;
            //特效变化
            //对应文本
            view._prevlvTxt.text = LanguageManager.getlocal("servant_lv", [curlv.toString()]);
            view._nextlvTxt.text = LanguageManager.getlocal("servant_lv", [(curlv + 1).toString()]);
            view._nextlvTxt.visible = view._nextbg.visible = curlv < arr.length;
            //进度
            var need = curlv == arr.length ? 1 : arr[curlv].timesNeed;
            view._progress.setPercentage(info.num / need);
            view._collectflag.visible = curlv >= view._curLevel;
            if (curlv >= view._curLevel) {
                view._leveltxt.text = LanguageManager.getlocal("titleupgradetip2");
            }
            else {
                if (curlv == arr.length) {
                    view._leveltxt.text = LanguageManager.getlocal("acBattlePassMaxLevel-1");
                    view._progress.setText(LanguageManager.getlocal("acBattlePassMaxLevel-1"));
                }
                else {
                    view._leveltxt.text = LanguageManager.getlocal("titleupgradetip1", [String(curlv + 1), titleconfig.titleName, String(Math.max(0, need - info.num))]);
                    view._progress.setText((info.num + "/" + need));
                }
            }
            //进度
        }
        //特效变化
        if (view._titleImg) {
            var posx = view._titleImg.x;
            var posy = view._titleImg.y;
            view._titleImg.dispose();
            view._titleImg = null;
            var titleImg = App.CommonUtil.getTitlePic(view._curTitleId, view._curLevel);
            titleImg.width = 155;
            titleImg.height = 59;
            titleImg.setPosition(posx, posy);
            // view._nodeContainer.addChild(titleImg);
            this.addChild(titleImg);
            view._titleImg = titleImg;
        }
        //身体特效
        view.refreshDBDragons();
        var tipTxtStr = "titleupgradeleveltip" + view._curLevel + (titleconfig.titleType == 7 ? "_huang" : '');
        view._tiptxt.text = LanguageManager.getlocal(tipTxtStr);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._tiptxt, view._bottombg, [0, 10]);
        var cfg = arr[view._curLevel - 1];
        var strarr = ["strength", "intelligence", "politics", "charm"];
        for (var i = 1; i < 5; ++i) {
            var num = cfg[strarr[i - 1]];
            //--type:加成类型；1：固定值，2：百分比  注：加的属性是修身的！！！
            var str = cfg.type == 1 ? (num.toString()) : ((num * 100).toFixed(0) + "%");
            this["_attr" + i + "Txt"].text = LanguageManager.getlocal("titleupgradeattrtip" + i, [str]);
        }
        view._leveltxtbg.width = Math.max(370, view._leveltxt.textWidth + 100);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._leveltxtbg, view._progressGroup, [0, -view._leveltxtbg.height - 25]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._leveltxt, view._leveltxtbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._curlvbg, view._leveltxtbg, [0, -view._curlvbg.height - 10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._culvTxt, view._curlvbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._prevlvTxt, view._prevbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._nextlvTxt, view._nextbg);
        view._leftbtn.visible = view._curLevel > 1;
        view._rightbtn.visible = view._curLevel < arr.length;
    };
    TitleUpgradeLevelUpView.prototype.refreshDBDragons = function () {
        var view = this;
        var tcfg = Config.TitleCfg.getTitleCfgById(this._curTitleId);
        view._curRoleImg.dispose();
        view._curRoleImg = null;
        var resPath = "palace_db_" + this._curTitleId + (tcfg.titleType == 7 ? "_" + Api.playerVoApi.getUserSex(Api.playerVoApi.getPlayePicId()) : "");
        if ((!Api.switchVoApi.checkCloseBone()) && App.CommonUtil.check_dragon() && Api.playerVoApi.checkHasDragonBones(this._curTitleId)) {
            view._curRoleImg = App.CommonUtil.getPlayerDragonRole(this._curTitleId, Api.playerVoApi.getPlayePicId(), this._curLevel);
            view._curRoleImg.x = 320;
            view._curRoleImg.y = 175;
        }
        else {
            view._curRoleImg = Api.playerVoApi.getPlayerPortrait(Number(this._curTitleId), Api.playerVoApi.getPlayePicId(), 0, false, null, null, this._curLevel);
            view._curRoleImg.x = GameConfig.stageWidth / 2 - view._curRoleImg.width / 2;
            view._curRoleImg.y = tcfg.titleType == 7 ? 100 : 140;
        }
        view._nodeContainer.addChild(view._curRoleImg);
    };
    TitleUpgradeLevelUpView.prototype.collectBtnClickHandler = function () {
        NetManager.request(NetRequestConst.REQUEST_PALACE_GETSALARY, {});
    };
    TitleUpgradeLevelUpView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "titleupgradebtn", "titleupgradebtntxt", "servant_attributemap",
            "arena_bottom", "progress16_bg", "progress16", "specialview_commoni_namebg", "palace_collectflag",
            "titleupgradeprogressbg", "battlelvup", "titleupgradeget", "titleupgradearrow", "titleupgradeline", "titleupgradebottombg", "titleupgradebottombg2"
        ]);
    };
    // protected receiveData(data: { ret: boolean, data: any }): void
    // {
    //     let rData = data.data;
    //     if(rData.ret == 0)
    //     {
    //         this._kingsList = rData.data.kinglist;
    //         this._kingsSign = rData.data.sign;
    //         this._kingsInfo = rData.data.info;
    //     }
    // }
    // protected tick()
    // {
    //     let titleId =  this.param.data.titleId;
    //     if(!this.isGotoKingsHouse && titleId && Config.TitleCfg.isTheKingTitleId(titleId) && Api.promoteVoApi.isKing())
    //     {
    //         this.isGotoKingsHouse = true;
    //         let msg = LanguageManager.getlocal("decree_tobeNewKingTip");
    //         ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
    //             title:"itemUseConstPopupViewTitle",
    //             msg:msg,
    //             callback:this.gotoHKingsHouse,
    //             handler:this,
    //             needCancel:false
    //         });
    //     }
    //     return true;
    // }
    // protected getRequestData():{requestType:string,requestData:any}
    // { 
    //    let titleId =  this.param.data.titleId;
    //    if(titleId && Config.TitleCfg.isTheKingTitleId(titleId))
    //    {
    //         return {requestType:NetRequestConst.REQUEST_POLICY_INDEX,requestData:{}};
    //    }
    //     // return {requestType:NetRequestConst.REQUEST_PALACE_GETPALACEINFO,requestData:{}};
    // }
    TitleUpgradeLevelUpView.prototype.upgradeCallback = function (evt) {
        var _this = this;
        var view = this;
        if (evt && evt.data && evt.data.ret && evt.data.data.data) {
            var upgradeclick = ComponentManager.getCustomMovieClip("tilelevelbtnclick", 12);
            upgradeclick.playWithTime(1);
            view._upgradeGroup.addChild(upgradeclick);
            upgradeclick.x = -105;
            upgradeclick.y = -105;
            upgradeclick.setEndCallBack(function () {
                _this.showUpgradeEffect();
                var titleconfig = Config.TitleCfg.getTitleCfgById(_this._curTitleId);
                var isdi = titleconfig.isTitle == 1 && titleconfig.titleType == 1;
                var arr = [];
                switch (titleconfig.titleType) {
                    case 1:
                        arr = Config.TitleupgradeCfg.diList;
                        break;
                    case 2:
                        arr = Config.TitleupgradeCfg.wangList;
                        break;
                    case 7:
                        arr = Config.TitleupgradeCfg.huangList;
                        break;
                }
                view._curLevel = Math.min(view._curLevel + 1, arr.length);
                view.freshView();
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_TITLEUPGRADE_MODEL, evt.data.data.data.titleId);
            }, view);
        }
    };
    TitleUpgradeLevelUpView.prototype.showUpgradeEffect = function () {
        SoundManager.playEffect(SoundConst.EFFECT_UPD);
        var upgradeClip = ComponentManager.getCustomMovieClip("servant_upgrade_frame", 5, 100);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, upgradeClip, this._upgradeGroup, [-40, -40]);
        this.addChild(upgradeClip);
        upgradeClip.playWithTime(-1);
        var upBg = BaseBitmap.create("battlelvup");
        this.addChild(upBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, upBg, this._upgradeGroup, [0, 20]);
        egret.Tween.get(upBg).to({ y: this._upgradeGroup.y - 30 }, 700).call(function (upBg) {
            BaseBitmap.release(upBg);
            upBg = null;
            this._stopTouch = false;
        }, this, [upBg]);
        var tmpthis = this;
        egret.Tween.get(this, { loop: false }).wait(500).call(function () {
            //字体刷新加个延时
            tmpthis.removeChild(upgradeClip);
            upgradeClip = null;
        });
    };
    TitleUpgradeLevelUpView.prototype.getTitleStr = function () {
        return "titleupgradetitle";
    };
    TitleUpgradeLevelUpView.prototype.getRuleInfo = function () {
        return "titleupgraderule";
    };
    TitleUpgradeLevelUpView.prototype.dispose = function () {
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_GETSALARY),this.collectBtnClickHandlerCallback,this);
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_GETPALACEINFO),this.palaceInfoHandlerCallback,this);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SERVANTBONE);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TITLEUPGRADE), this.upgradeCallback, this);
        this._nodeContainer = null;
        this._nameBg = null;
        this._curRoleImg = null;
        this._curTitleId = null;
        this._progress = null;
        this._leveltxtbg = null;
        this._leveltxt = null;
        this._culvTxt = null;
        this._curLevel = 0;
        this._rightbtn = null;
        this._leftbtn = null;
        this._tiptxt = null;
        this._collectflag = null;
        this._nextlvTxt = null;
        this._prevlvTxt = null;
        this._nameTxt = null;
        this._titleImg = null;
        this._prevbg = null;
        this._nextbg = null;
        this._curlvbg = null;
        this._bottombg = null;
        this._stopTouch = false;
        this._attr1Txt = null;
        this._attr2Txt = null;
        this._attr3Txt = null;
        this._attr4Txt = null;
        _super.prototype.dispose.call(this);
    };
    return TitleUpgradeLevelUpView;
}(CommonView));
__reflect(TitleUpgradeLevelUpView.prototype, "TitleUpgradeLevelUpView");
//# sourceMappingURL=TitleUpgradeLevelUpView.js.map