/**
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
var AcJarukaiView = (function (_super) {
    __extends(AcJarukaiView, _super);
    function AcJarukaiView() {
        var _this = _super.call(this) || this;
        _this._timeCD = null;
        _this._numTxt = null;
        _this._curHaveTxt = null;
        _this._icon = null;
        _this._dbDragon = null;
        _this._npc = null;
        _this._npcTxt = null;
        _this._leftTxt = null;
        _this._npcNameTxt = null;
        return _this;
    }
    Object.defineProperty(AcJarukaiView.prototype, "vo", {
        // private aid:string;
        // private code:string;
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcJarukaiView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcJarukaiView.prototype.getUiCode = function () {
        return this.code;
    };
    AcJarukaiView.prototype.initView = function () {
        var view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var uicode = this.getUiCode();
        var titleName = BaseBitmap.create(App.CommonUtil.getResByCode("jurakudaititlename", uicode));
        view.addChild(titleName);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, titleName, view.titleBg);
        var topbg = BaseBitmap.create(App.CommonUtil.getResByCode("jurakudaibottombg", uicode));
        view.addChild(topbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.titleBg, [0, view.titleBg.height]);
        var bottombg = BaseBitmap.create(App.CommonUtil.getResByCode("jurakudaidesk", uicode));
        view.addChild(bottombg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view);
        var timeDateTxt = ComponentManager.getTextField(LanguageManager.getlocal("acJadeView_acttimer", ["4\u67081\u65E5", "4\u67082\u65E5"]), 18, 0xFDF3B5);
        view.addChild(timeDateTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeDateTxt, topbg, [27, 8]);
        var acDescTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acJarukaidesc", uicode)), 18, 0xFDF3B5);
        view.addChild(acDescTxt);
        acDescTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, acDescTxt, timeDateTxt, [0, timeDateTxt.height + 8]);
        var end = App.DateUtil.getWeeTs(GameData.serverTime) + 86400;
        var str = LanguageManager.getlocal("acFanliReviewReward_acCD", [App.DateUtil.getFormatBySecond(end - GameData.serverTime)]);
        if (end == 0) {
            str = LanguageManager.getlocal("acSurprisedGiftViewTimeNotEnough");
        }
        var timeCDTxt = ComponentManager.getTextField(str, 18, 0xFDF3B5);
        view.addChild(timeCDTxt);
        view._timeCD = timeCDTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, timeCDTxt, topbg, [36, 8]);
        var lamp1 = ComponentManager.getButton(App.CommonUtil.getResByCode("jurakudailamp", uicode), "", function () {
            //充值奖励
            ViewController.getInstance().openView(ViewConst.POPUP.ACJARUKAICHARGEVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view);
        view.addChild(lamp1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, lamp1, topbg, [13, topbg.height]);
        var dailychargeTxt = BaseBitmap.create(App.CommonUtil.getResByCode("jurakudaicharge_fnt", uicode));
        view.addChild(dailychargeTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dailychargeTxt, lamp1, [0, 26]);
        var lamp2 = ComponentManager.getButton(App.CommonUtil.getResByCode("jurakudailamp", uicode), "", function () {
            //任务
            ViewController.getInstance().openView(ViewConst.POPUP.ACJARUKAITASKVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view);
        view.addChild(lamp2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, lamp2, topbg, [13, topbg.height]);
        var taskTxt = BaseBitmap.create(App.CommonUtil.getResByCode("jurakudaitask_fnt", uicode));
        view.addChild(taskTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, taskTxt, lamp2, [0, 25]);
        var sid = 1;
        var arr = [2015, 2016, 2017, 2018, 2014];
        var cfg = Config.ServantCfg.getServantItemById(arr[sid - 1]);
        var npc = BaseLoadBitmap.create(cfg.body);
        npc.setScale(0.5);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, npc, topbg, [0, topbg.height + 8]);
        view.addChild(npc);
        view._npc = npc;
        npc.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACJARUKAIDETAILINFOVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view);
        var tag = BaseLoadBitmap.create("servant_qualitytag" + cfg.quality);
        tag.width = 148;
        tag.height = 230;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tag, npc, [-17, -12]);
        view.addChild(tag);
        var npcbg = BaseBitmap.create(App.CommonUtil.getResByCode("jurakudainumbg", uicode));
        view.addChild(npcbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, npcbg, npc);
        var npcTxt = BaseBitmap.create(App.CommonUtil.getResByCode("jurakudaitxt", uicode));
        view.addChild(npcTxt);
        view._npcTxt = npcTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, npcTxt, npcbg, [55, 21]);
        var leftnum = 999;
        var leftTxt = ComponentManager.getBitmapText("" + leftnum, "jarukai_fnt");
        view.addChild(leftTxt);
        view._leftTxt = leftTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, leftTxt, npcTxt, [75, 0]);
        var npcNameTxt = BaseBitmap.create(App.CommonUtil.getResByCode("jurakudaiservantname" + sid, uicode));
        view.addChild(npcNameTxt);
        view._npcNameTxt = npcNameTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, npcNameTxt, npcTxt, [npcTxt.width, 0]);
        var curHaveTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acJarukaicurhave", uicode)), 22, 0xFBD88D);
        view.addChild(curHaveTxt);
        view._curHaveTxt = curHaveTxt;
        var icon = BaseBitmap.create(App.CommonUtil.getResByCode("jurakudaiicon2", uicode));
        view.addChild(icon);
        view._icon = icon;
        var num = 0;
        var numTxt = ComponentManager.getTextField("" + num, 22, 0xFBD88D);
        view.addChild(numTxt);
        view._numTxt = numTxt;
        var tmpx = (bottombg.width - curHaveTxt.textWidth - icon.width - numTxt.width - 7) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, curHaveTxt, bottombg, [tmpx, 13]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, curHaveTxt, [curHaveTxt.width, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, numTxt, icon, [icon.width + 7, 0]);
        var jiubei1 = BaseBitmap.create(App.CommonUtil.getResByCode("jurakudaijiubei1", uicode));
        view.addChild(jiubei1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, jiubei1, bottombg, [97, 114]);
        var numbg1 = BaseBitmap.create(App.CommonUtil.getResByCode("jurakudaiqunyanbg", uicode));
        view.addChild(numbg1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, numbg1, jiubei1, [0, 115]);
        var txt1 = ComponentManager.getButton(App.CommonUtil.getResByCode("jurakudaiplay1", uicode), '', function () {
            //宴请
            if (view._dbDragon) {
                view._dbDragon.visible = true;
                view._dbDragon.playDragonMovie("idle1ci", 1);
            }
        }, view);
        view.addChild(txt1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, txt1, numbg1, [0, 5]);
        var useicon1 = BaseBitmap.create(App.CommonUtil.getResByCode("jurakudaiicon2", uicode));
        view.addChild(useicon1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, useicon1, numbg1, [48, 46]);
        var usebg1 = BaseBitmap.create(App.CommonUtil.getResByCode("jurakudaijiubeinumbg", uicode));
        view.addChild(usebg1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, usebg1, useicon1);
        var useTxt1 = ComponentManager.getTextField("1", 22, 0xffffff);
        view.addChild(useTxt1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, useTxt1, usebg1);
        var jiubei2 = BaseBitmap.create(App.CommonUtil.getResByCode("jurakudaijiubei10", uicode));
        view.addChild(jiubei2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, jiubei2, bottombg, [97, 114]);
        var numbg2 = BaseBitmap.create(App.CommonUtil.getResByCode("jurakudaiqunyanbg", uicode));
        view.addChild(numbg2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, numbg2, jiubei2, [0, 115]);
        var txt2 = ComponentManager.getButton(App.CommonUtil.getResByCode("jurakudaiplay1", uicode), '', function () {
            //宴请
            if (view._dbDragon) {
                view._dbDragon.visible = true;
                view._dbDragon.playDragonMovie("idle10ci", 1);
            }
        }, view);
        view.addChild(txt2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, txt2, numbg2, [0, 5]);
        var useicon2 = BaseBitmap.create(App.CommonUtil.getResByCode("jurakudaiicon2", uicode));
        view.addChild(useicon2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, useicon2, numbg2, [48, 46]);
        var usebg2 = BaseBitmap.create(App.CommonUtil.getResByCode("jurakudaijiubeinumbg", uicode));
        view.addChild(usebg2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, usebg2, useicon2);
        var useTxt2 = ComponentManager.getTextField("10", 22, 0xffffff);
        view.addChild(useTxt2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, useTxt2, usebg2);
        if (App.CommonUtil.check_dragon()) {
            var dbDragon_1 = App.DragonBonesUtil.getLoadDragonBones("qunyan_penbei");
            view.addChild(dbDragon_1);
            dbDragon_1.width = 307;
            dbDragon_1.height = 416;
            dbDragon_1.visible = false;
            dbDragon_1.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function () {
                dbDragon_1.stop();
                dbDragon_1.visible = false;
            }, this);
            view._dbDragon = dbDragon_1;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, dbDragon_1, view, [340, 0]);
        }
    };
    AcJarukaiView.prototype.tick = function () {
        var view = this;
        var end = App.DateUtil.getWeeTs(GameData.serverTime) + 86400;
        var str = LanguageManager.getlocal("acFanliReviewReward_acCD", [App.DateUtil.getFormatBySecond(end - GameData.serverTime)]);
        if (end == 0) {
            str = LanguageManager.getlocal("acSurprisedGiftViewTimeNotEnough");
        }
        view._timeCD.text = str;
    };
    AcJarukaiView.prototype.freshView = function () {
        var view = this;
        var uicode = view.getUiCode();
        var num = 0;
        view._numTxt.text = num + '';
        var tmpx = (view.width - view._curHaveTxt.textWidth - view._icon.width - view._numTxt.width - 7) / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, view._curHaveTxt, view, [tmpx, 13]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._icon, view._curHaveTxt, [view._curHaveTxt.width, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._numTxt, view._icon, [view._icon.width + 7, 0]);
        var sid = 1;
        var arr = [2015, 2016, 2017, 2018, 2014];
        var cfg = Config.ServantCfg.getServantItemById(arr[0]);
        view._npc.setload(cfg.body);
        view._npcNameTxt.setRes(App.CommonUtil.getResByCode("jurakudaiservantname" + sid, uicode));
        var leftnum = 999;
        view._leftTxt.text = "" + leftnum;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, leftTxt, npcTxt, [55,0]);
    };
    AcJarukaiView.prototype.getRuleInfo = function () {
        return App.CommonUtil.getCnByCode("acjarukairuleinfo", this.getUiCode());
    };
    AcJarukaiView.prototype.getBgName = function () {
        return App.CommonUtil.getResByCode("jurakudaibg", this.getUiCode());
    };
    AcJarukaiView.prototype.getTitleBgName = function () {
        return App.CommonUtil.getResByCode("jurakudaititlebg", this.getUiCode());
    };
    AcJarukaiView.prototype.getTitleStr = function () {
        return null;
    };
    AcJarukaiView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat("acjurakudaiview", "jarukai_fnt");
    };
    AcJarukaiView.prototype.dispose = function () {
        var view = this;
        view._timeCD = null;
        view._numTxt = null;
        view._curHaveTxt = null;
        view._icon = null;
        view._dbDragon = null;
        _super.prototype.dispose.call(this);
    };
    return AcJarukaiView;
}(AcCommonView));
__reflect(AcJarukaiView.prototype, "AcJarukaiView");
