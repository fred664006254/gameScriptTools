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
var RoyalPassView = (function (_super) {
    __extends(RoyalPassView, _super);
    function RoyalPassView() {
        var _this = _super.call(this) || this;
        _this._haveBuyGroup = null;
        _this._crown = null;
        _this._list = null;
        _this._bigrewardGroup = null;
        _this._progressbar = null;
        _this._bottomid = -1;
        _this._curReward = null;
        return _this;
    }
    RoyalPassView.prototype.getResourceList = function () {
        return [
            "progress27_bg", "progress27", "royalpassview"
        ];
    };
    RoyalPassView.prototype.getTitleStr = function () {
        return null;
    };
    RoyalPassView.prototype.getBgName = function () {
        return "public_white";
    };
    RoyalPassView.prototype.getMsgConstEventArr = function () {
        return [
            MsgConst.MODEL_GAMEINFO,
        ];
    };
    RoyalPassView.prototype.getNetConstEventArr = function () {
        return [
            NetConst.ROYALPASS_GETREWARDS
        ];
    };
    RoyalPassView.prototype.msgEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case MsgConst.MODEL_GAMEINFO:
                view.freshView();
                break;
        }
    };
    RoyalPassView.prototype.netEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case NetConst.ROYALPASS_GETREWARDS:
                view.getRewardback(evt);
                break;
        }
    };
    RoyalPassView.prototype.initView = function () {
        var view = this;
        view.name = "RoyalPassView";
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var topbg = BaseBitmap.create("royalpasstopbg");
        view.addChildToContainer(topbg);
        // let titleTF = ComponentMgr.getTextField(LangMger.getlocal(`royalpasstitle`),TextFieldConst.SIZE_BIG_VIEWTITLE,ColorEnums.white);
        // view.addChildToContainer(titleTF);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titleTF, topbg, [0,20]);
        var titleBit = BaseBitmap.create("royaltitle");
        view.addChildToContainer(titleBit);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titleBit, topbg, [0, 20]);
        var descTxt = ComponentMgr.getTextField(LangMger.getlocal("royalpassdesc"), TextFieldConst.SIZE_CONTENT_NORMAL_POPUP);
        descTxt.lineSpacing = 10;
        descTxt.textAlign = egret.HorizontalAlign.CENTER;
        view.addChildToContainer(descTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, descTxt, topbg, [27, 44]);
        //trophy_icon
        var progressbar = ComponentMgr.getProgressBar("royalview_progress", "royalview_bar", 342);
        progressbar.setProgressMode();
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressbar, descTxt, [0,descTxt.height+45]);
        var score = Api.UserinfoVoApi.getScore();
        var prevNeed = Config.RoyalpassCfg.getPrevNeedByScore(score);
        var nextNeed = Api.GameinfoVoApi.getRoyalFirstNotReward(Api.UserinfoVoApi.getMaxScore()); // Config.RoyalpassCfg.getNextNeedByScore(score);
        var maxlevel = !nextNeed;
        var isgetall = Api.GameinfoVoApi.isGetAllRoyalPassReard();
        var isgetRoyalpass = Api.GameinfoVoApi.getIsBuyRoyalPass();
        var str = "";
        var per = 0;
        if (isgetall) {
            str = score.toString(); //LangMger.getlocal(isgetRoyalpass ? `royalpassgetall` : ``);
            per = 1;
        }
        else {
            str = score + "/" + nextNeed;
            per = score / nextNeed;
            // str = `${score - prevNeed}/${nextNeed - prevNeed}`;
            // per =  score >= prevNeed ? ((score - prevNeed)/(nextNeed - prevNeed)) : 0;
        }
        progressbar.setPercentage(per);
        progressbar.setText(str);
        progressbar.setTextSize(TextFieldConst.SIZE_24);
        progressbar.setTextColor(ColorEnums.white);
        view._progressbar = progressbar;
        progressbar._textLb.stroke = 2;
        var icon = BaseBitmap.create("trophy_icon");
        icon.setScale(0.42);
        // let topnamebg = BaseBitmap.create(`royalpassnamebg`);
        // view.addChildToContainer(topnamebg);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, topnamebg, topbg, [30,20]);
        // let nameTxt = ComponentMgr.getTextField(LangMger.getlocal(`royal_token`), TextFieldConst.SIZE_CONTENT_NORMAL, ColorEnums.white);
        // view.addChildToContainer(nameTxt);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, nameTxt, topnamebg, [0,10]);
        var crown = BaseBitmap.create("crown");
        view.addChildToContainer(crown);
        view._crown = crown;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, crown, topbg, [49, 35]);
        var titlebit = BaseBitmap.create("royalreadyname");
        view.addChildToContainer(titlebit);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, titlebit, topbg, [42, 18]);
        var group = new BaseDisplayObjectContainer();
        view.addChildToContainer(group);
        view._haveBuyGroup = group;
        // let haveTxt = ComponentMgr.getTextField(LangMger.getlocal(`royalpasshaveget`), TextFieldConst.SIZE_CONTENT_COMMON);
        // group.addChild(haveTxt);
        // let flag = BaseBitmap.create(`royalgouhao`);
        // group.addChild(flag);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, flag, haveTxt, [haveTxt.width,0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, group, crown, [0, 5]);
        group.visible = isgetRoyalpass;
        // crown.visible = !group.visible;
        if (!isgetRoyalpass) {
            var button = ComponentMgr.getButton("royalopencard", LangMger.getlocal("royalpassgoshop"), view.goShop, view);
            view.addChildToContainer(button);
            button.setTextSize(TextFieldConst.SIZE_CONTENT_NORMAL_POPUP);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, button, topbg, [41, 117]);
            var txt = button.getChildByName("btnTxt");
            txt.y = 10;
            var tween = egret.Tween.get(button, { loop: true });
            tween.to({ y: button.y + 10 }, 500, egret.Ease.circInOut)
                .wait(200)
                .to({ y: button.y }, 500)
                .wait(200);
            crown.addTouchTap(view.goShop, view);
        }
        view.closeBtn.y = 10;
        // 微信中关闭按钮左上角
        view.closeBtn.x = PlatMgr.checkIsWxSp() ? 10 : view.closeBtn.x;
        //底部彩色背景图
        var colorbg = BaseBitmap.create("royalpasslistbg");
        colorbg.height = GameConfig.stageHeigth - 320; //(1136 - 814);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, colorbg, topbg, [0, topbg.height + 80]);
        view.addChildToContainer(colorbg);
        var colorbg1 = BaseBitmap.create("royalpasslistbg1");
        this.addChildToContainer(colorbg1);
        colorbg1.width = GameConfig.stageWidth / 2;
        var colorbg2 = BaseBitmap.create("royalpasslistbg2");
        this.addChildToContainer(colorbg2);
        colorbg2.width = GameConfig.stageWidth / 2;
        colorbg2.x = colorbg1.x + colorbg1.width;
        colorbg1.height = colorbg2.height = colorbg.height;
        colorbg1.y = colorbg2.y = colorbg.y = 322;
        colorbg1.smoothing = true;
        //中柱子
        var midline = BaseBitmap.create("royalpassmidline"); // "royalpassmidline":{"scale9grid":"8,25,1,1"},
        view.addChildToContainer(midline);
        midline.fillMode = egret.BitmapFillMode.REPEAT;
        var bottomBg = BaseBitmap.create("royalpassbottombg");
        view.addChildToContainer(bottomBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, colorbg);
        bottomBg.addTouchTap(this.bottomBgOnclick, this);
        midline.height = colorbg.height - bottomBg.height + 10;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midline, colorbg);
        var height = colorbg.height - bottomBg.height - 90;
        var num = Math.ceil(height / 241);
        var scrollist = ComponentMgr.getScrollList(RoyalPassItem, Config.RoyalpassCfg.getRoyalPassCfgList(), new egret.Rectangle(0, 0, view.width, height), null, num); // - 25 不需要间隔
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollist, colorbg, [0, 85]);
        view.addChildToContainer(scrollist);
        scrollist.bounces = false;
        view._list = scrollist;
        scrollist.bindMoveCompleteCallback(function () {
            var top = scrollist.scrollTop;
            var topIdx = Math.ceil(top / 241);
            var curIdx = topIdx + Math.ceil(scrollist.height / 241);
            view.freshBigReward(curIdx);
        }, view);
        // let mask1 = BaseBitmap.create("royalmask1");
        // this.addChildToContainer(mask1);
        // mask1.width = colorbg1.width;
        // mask1.setPosition(colorbg1.x, colorbg1.y);
        // let mask2 = BaseBitmap.create("royalmask2");
        // this.addChildToContainer(mask2);
        // mask2.width = colorbg2.width;
        // mask2.setPosition(colorbg2.x, colorbg2.y);
        // 新的tab
        var royaltab = BaseBitmap.create("royaltab");
        this.addChildToContainer(royaltab);
        royaltab.x = 0;
        royaltab.y = topbg.y + topbg.height - 10;
        view.addChildToContainer(progressbar);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressbar, royaltab, [0, 26]);
        view.addChildToContainer(icon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, progressbar, [-icon.width / 2, 0]);
        var freetab = ComponentMgr.getButton("public_alphabg", LangMger.getlocal("sysfree"), function () { console.log("免费"); }, view);
        freetab.setBtnSize(270, 70);
        freetab.setTextSize(TextFieldConst.SIZE_30);
        freetab.setTextStrokeColor(0x3a3a3a, 2);
        // freetab.setEnable(false);
        view.addChildToContainer(freetab);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, freetab, royaltab, [20, 10]);
        var viptab = ComponentMgr.getButton("public_alphabg", LangMger.getlocal("royal_token"), view.goShop, view);
        viptab.setBtnSize(270, 70);
        viptab.setTextSize(TextFieldConst.SIZE_30);
        viptab.setTextStrokeColor(ColorEnums.strokeOrange, 2);
        view.addChildToContainer(viptab);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, viptab, royaltab, [20, 10]);
        var bigRewardGroup = new BaseDisplayObjectContainer();
        view.addChildToContainer(bigRewardGroup);
        bigRewardGroup.width = 600;
        bigRewardGroup.height = 90;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bigRewardGroup, bottomBg);
        view.addChildToContainer(bigRewardGroup);
        view._bigrewardGroup = bigRewardGroup;
        var curid = Config.RoyalpassCfg.getNowProgressId(null, true);
        if (Api.GameinfoVoApi.getIsFinishNewGuide()) {
            scrollist.setScrollTopByIndex(curid, 300);
        }
        view.freshBigReward(curid);
        view.freshView();
    };
    RoyalPassView.prototype.preInit = function () {
        var view = this;
        _super.prototype.preInit.call(this);
        if (Api.GameinfoVoApi.checlIsInGuideId(16)) {
            App.CommonUtil.sendNewGuideId(16);
            Api.GameinfoVoApi.setCurGudingId(17);
            view._curReward = view._list.getItemByIndex(0);
            view._list.scrollTop = 25;
            view._list.verticalScrollPolicy = "off";
            App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
        }
    };
    RoyalPassView.prototype.bottomBgOnclick = function (event, params) {
        event.stopPropagation();
        if (!this._bottomid && this._bottomid < 0) {
            return;
        }
        var data = Config.RoyalpassCfg.getRoyalPassCfgById(this._bottomid);
        var freerewardvo = GameData.formatRewardItem(data.primary)[0];
        ViewController.getInstance().openView(ViewConst.BOXREWARDDETAILPOPUPVIEW, {
            title: freerewardvo.name,
            needCancel: false,
            needClose: 1,
            boxId: freerewardvo.id,
        });
    };
    RoyalPassView.prototype.getCloseBtnName = function () {
        return "commonclosebtn";
    };
    RoyalPassView.prototype.freshBigReward = function (start) {
        var view = this;
        var maxlevel = Config.RoyalpassCfg.getRoyalPassMaxLevel();
        var bigid = -1;
        var end = maxlevel;
        if (start > end) {
            start = end;
        }
        for (var i = start; i <= end; ++i) {
            var unit = Config.RoyalpassCfg.getRoyalPassCfgById(i);
            if (unit && unit.show && unit.show == 1) {
                bigid = i;
                break;
            }
        }
        this._bottomid = bigid;
        if (bigid > -1) {
            view._bigrewardGroup.removeChildren();
            var data = Config.RoyalpassCfg.getRoyalPassCfgById(bigid);
            var freerewardvo = GameData.formatRewardItem(data.primary)[0];
            var freeicon = GameData.getItemIcon(freerewardvo, 0);
            freeicon.setScale(1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, freeicon, view._bigrewardGroup, [25, -25], true);
            view._bigrewardGroup.addChild(freeicon);
            var haveGetGroup = new BaseDisplayObjectContainer();
            view._bigrewardGroup.addChild(haveGetGroup);
            haveGetGroup.width = freeicon.width;
            haveGetGroup.height = freeicon.height;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, haveGetGroup, freeicon);
            // let maskbg = BaseBitmap.create(`public_9_bg8`);
            // maskbg.width = freeicon.width;
            // maskbg.height = freeicon.height;
            // maskbg.alpha = 0.3;
            // haveGetGroup.addChild(maskbg);
            var flag = BaseBitmap.create("royalgouhao");
            haveGetGroup.addChild(flag);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, flag, haveGetGroup, [0, 0], true);
            haveGetGroup.visible = Api.GameinfoVoApi.isGetRoyalPassReward(bigid);
            var tipTxt = ComponentMgr.getTextField(LangMger.getlocal("royalpassbigrewardtip", [data.needScore.toString(), freerewardvo.name]), TextFieldConst.SIZE_30, 0xC5D4F7);
            view._bigrewardGroup.addChild(tipTxt);
            tipTxt.stroke = 2;
            tipTxt.strokeColor = 0x0C2C77;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tipTxt, view._bigrewardGroup, [freeicon.x + freeicon.width * freeicon.scaleX, 0], true);
        }
    };
    RoyalPassView.prototype.goShop = function () {
        if (Api.GameinfoVoApi.getIsBuyRoyalPass()) {
            return;
        }
        var view = this;
        view.hide();
        Api.ShopVoApi.setisbuyRoyal(true);
        App.MsgHelper.dispEvt(MsgConst.ROYAL_GOSHOP);
    };
    RoyalPassView.prototype.freshView = function () {
        var view = this;
        var isgetRoyalpass = Api.GameinfoVoApi.getIsBuyRoyalPass();
        view._haveBuyGroup.visible = isgetRoyalpass;
        // view._crown.visible = !view._haveBuyGroup.visible;
        var id = Config.RoyalpassCfg.getNowProgressId();
        if (id == 0) {
            var item = view._list.getItemByIndex(0);
            if (item) {
                item.setCurProgress();
            }
        }
        else {
            for (var i = 0; i < Config.RoyalpassCfg.getRoyalPassMaxLevel(); ++i) {
                var item = view._list.getItemByIndex(i);
                if (item) {
                    item.freshInfo();
                }
            }
        }
        var score = Api.UserinfoVoApi.getScore();
        var curid = Config.RoyalpassCfg.getNowProgressId(score);
        var prevNeed = Config.RoyalpassCfg.getPrevNeedByScore(score);
        var nextNeed = Api.GameinfoVoApi.getRoyalFirstNotReward(Api.UserinfoVoApi.getMaxScore()); // Config.RoyalpassCfg.getNextNeedByScore(score);
        var maxlevel = !nextNeed;
        var isgetall = Api.GameinfoVoApi.isGetAllRoyalPassReard();
        var str = "";
        var per = 0;
        if (isgetall || maxlevel) {
            str = score + "/" + nextNeed; //LangMger.getlocal(isgetRoyalpass ? `royalpassgetall` : ``);
            per = 1;
        }
        else {
            str = score + "/" + nextNeed;
            per = score / nextNeed;
            // str = `${score - prevNeed}/${nextNeed - prevNeed}`;
            // per =  score >= prevNeed ? ((score - prevNeed)/(nextNeed - prevNeed)) : 0;
        }
        view._progressbar.setPercentage(per);
        view._progressbar.setText(str);
    };
    RoyalPassView.prototype.getRewardback = function (evt) {
        var view = this;
        if (evt.data.ret) {
            //弹出
            var rewards = evt.data.data.data.rewards;
            if (rewards && rewards != "") {
                if (Api.ShopVoApi.getIsBox()) {
                    ViewController.getInstance().openView(ViewConst.GETREWARDPOPUPVIEW, {
                        rewards: rewards,
                        title: LangMger.getlocal("sysGetReward"),
                        isBoxBuy: false,
                        specialBoxId: Api.ShopVoApi.getBoxId(),
                        handler: view,
                        needCancel: true,
                        closecallback: function () {
                            App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                        },
                    });
                    Api.ShopVoApi.setIsBox(false, "");
                }
                else {
                    ViewController.getInstance().openView(ViewConst.COMMONREWARDPOPUPVIEW, {
                        rewards: rewards,
                        title: LangMger.getlocal("sysGetReward"),
                        handler: view,
                        callback: function () {
                            if (Api.GameinfoVoApi.checlIsInGuideId(18)) {
                                App.CommonUtil.sendNewGuideId(18);
                                Api.GameinfoVoApi.setCurGudingId(19);
                                view.hide();
                                App.MsgHelper.dispEvt(MsgConst.ROYAL_GODICE);
                            }
                        },
                    });
                }
                if (Api.GameinfoVoApi.checlIsInGuideId(17)) {
                    App.CommonUtil.sendNewGuideId(17);
                    Api.GameinfoVoApi.setCurGudingId(18);
                }
                // let rewardsArr = GameData.formatRewardItem(rewards);
                // if(rewardsArr.length > 1 || (rewardsArr[0].type == 100)){
                //     ViewController.getInstance().openView(ViewConst.COMMONREWARDPOPUPVIEW,{
                //         rewards : rewards,
                //         title : LangMger.getlocal(`sysGetReward`),
                //         handler : view,
                //         callback : ()=>{
                //             App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                //         },
                //         closecallback : ()=>{
                //             App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                //         },
                //     });
                // }
                // else if(rewardsArr[0].type == 1 || rewardsArr[0].type == 2){
                //     App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                // }
            }
        }
    };
    RoyalPassView.prototype.dispose = function () {
        var view = this;
        this._bottomid = -1;
        view._haveBuyGroup = null;
        view._crown = null;
        view._list = null;
        view._bigrewardGroup = null;
        view._progressbar = null;
        view._curReward = null;
        _super.prototype.dispose.call(this);
    };
    return RoyalPassView;
}(CommonView));
__reflect(RoyalPassView.prototype, "RoyalPassView");
//# sourceMappingURL=RoyalPassView.js.map