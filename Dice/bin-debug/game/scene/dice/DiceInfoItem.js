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
var DiceInfoItem = (function (_super) {
    __extends(DiceInfoItem, _super);
    function DiceInfoItem() {
        var _this = _super.call(this) || this;
        _this._infoGroup = null;
        _this._inuse = null;
        _this._data = null;
        _this._levelTxt = null;
        _this._bg = null;
        _this._maxlevel = null;
        _this._progressbar = null;
        _this._arrow = null;
        _this._teamid = 1;
        return _this;
    }
    DiceInfoItem.prototype.initItem = function (index, data, param) {
        var view = this;
        view._teamid = param;
        view._data = data;
        var islock = !Api.DiceVoApi.isHaveDiceById(data);
        view.width = 152 + 3;
        view.height = 293; //islock ? 198 : 293;
        var group = new BaseDisplayObjectContainer();
        group.width = view.width;
        group.height = view.height;
        view.addChild(group);
        var dicecfg = Config.DiceCfg.getCfgById(data);
        var bg = BaseBitmap.create("bird_item_" + dicecfg.quality);
        // let bg = BaseBitmap.create(`bird_item_bg_${dicecfg.quality}`);
        // if(dicecfg.quality != 4){
        // bg.width = 144;
        // bg.height = 198;
        // }
        var dy = dicecfg.quality == 4 ? -10 : 0;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view, [0, 7 + dy], true);
        // bg.x = view.width/2 - bg.width/2;
        // bg.y = dy+7;
        group.addChild(bg);
        view._bg = bg;
        if (dicecfg.quality == 4) {
            // 传奇卡牌的特效
            var clip_1 = ComponentMgr.getCustomMovieClip("guangxiao", 10);
            group.addChild(clip_1);
            clip_1.blendMode = egret.BlendMode.ADD;
            clip_1.setEndCallBack(function () {
                clip_1.dispose();
                clip_1 = null;
            }, this);
            clip_1.playWithTime(0);
            clip_1.setPosition(10, 10);
            var glow = ComponentMgr.getCustomMovieClip("glow");
            view.addChild(glow);
            glow.playWithTime(0);
            glow.blendMode = egret.BlendMode.ADD;
            glow.y = -15;
        }
        var nameTxt = ComponentMgr.getTextField(dicecfg.name, TextFieldConst.SIZE_CONTENT_NORMAL_POPUP, GameConfig.getQualityColor(dicecfg.quality));
        nameTxt.bold = true;
        nameTxt.stroke = 1;
        // nameTxt.x = bg.x + bg.width/2 - nameTxt.width/2;
        // nameTxt.y = bg.y + 10 - dy;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, nameTxt, bg, [0, 10 - dy]);
        this.addChild(nameTxt);
        var icon = App.CommonUtil.getDiceIconById(data, 1);
        // icon.x = bg.x + bg.width/2 - icon.width/2;
        // icon.y = bg.y + bg.height/2 - icon.width/2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, bg);
        group.addChild(icon);
        var level = Api.DiceVoApi.getDiceLvById(data);
        var levelTxt = ComponentMgr.getTextField(LangMger.getlocal("sysLevel", [level.toString()]), TextFieldConst.SIZE_18);
        levelTxt.bold = true;
        if (dicecfg.quality == 4) {
            // levelTxt.x = bg.x + bg.width - levelTxt.width - 22;
            // levelTxt.y = bg.y + bg.height - levelTxt.height - 17;
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, levelTxt, bg, [22, 17]);
        }
        else {
            // levelTxt.x = bg.x + bg.width - levelTxt.width - 9;
            // levelTxt.y = bg.y + bg.height - levelTxt.height - 14;
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, levelTxt, bg, [9, 14]);
        }
        group.addChild(levelTxt);
        view._levelTxt = levelTxt;
        if (islock) {
            //未获得
            levelTxt.visible = false;
            //App.DisplayUtil.changeToGray(view);
            //无论解锁与否名字都不置灰
            var lock = BaseBitmap.create("royalpasslock");
            group.addChild(lock);
            // if(dicecfg.quality == 4){
            //     lock.x = bg.x + bg.width - lock.width - 10;
            //     lock.y = bg.y + bg.height - lock.height - 4;
            // }
            // else{
            //     lock.x = bg.x + bg.width - lock.width;
            //     lock.y = bg.y + bg.height - lock.height;
            // }
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, lock, bg, dicecfg.quality == 4 ? [10, 4] : [0, 0]);
            // App.DisplayUtil.changeToGray(group);
            group.addTouchTap(function () {
                ViewController.getInstance().openView(ViewConst.DICEDETAILINFOVIEW, {
                    dice: data,
                    islock: true
                });
            }, view);
        }
        else {
            var ismaxlevel = level == dicecfg.maxGrade;
            //使用中
            var inuse = BaseBitmap.create("diceinuse");
            if (dicecfg.quality == 4) {
                // inuse.x = bg.x + bg.width - inuse.width - 1;
                // inuse.y = bg.y - 2;
                App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, inuse, bg, [1, -2]);
            }
            else {
                // inuse.x = bg.x + bg.width - inuse.width - 7;
                // inuse.y = bg.y - 6; 
                App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, inuse, bg, [-7, -6]);
            }
            var usedCon = new BaseDisplayObjectContainer();
            usedCon.addChild(inuse);
            var isinuse = Api.LineVoApi.getDiceIsInLineById(data, view._teamid);
            usedCon.visible = isinuse;
            view._inuse = usedCon;
            //最大等级
            var maxlevel = BaseBitmap.create("dicelevelmax");
            // maxlevel.x = bg.x + bg.width - maxlevel.width - 7;
            // maxlevel.y = bg.y + bg.height - maxlevel.height - 40;
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, maxlevel, bg, [7, 40]);
            group.addChild(maxlevel);
            maxlevel.visible = ismaxlevel;
            view._maxlevel = maxlevel;
            //已获得
            var havenum = Api.DiceVoApi.getDiceNumById(data);
            var neednum = dicecfg.getNextLvCostNumByLv(level + 1);
            var ishave = Api.DiceVoApi.isHaveDiceById(data);
            var canlevelup = ishave && havenum >= neednum && !ismaxlevel;
            //进度条
            var progressbg = "progress24";
            var arrowres = "public_arrowblue";
            if (ismaxlevel) {
                progressbg = "progress26";
                arrowres = "";
            }
            else if (canlevelup) {
                arrowres = "public_arrowgreen";
                progressbg = "progress25";
            }
            var progressbar = ComponentMgr.getProgressBar(progressbg, "progress_bg_1", 120);
            progressbar.setTextSize(TextFieldConst.SIZE_18);
            if (dicecfg.quality == 4) {
                // progressbar.x = bg.x + (bg.width - progressbar.width)/2;
                // progressbar.y = bg.y + bg.height + 6;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressbar, bg, [0, bg.height + 6]);
            }
            else {
                // progressbar.x = bg.x + (bg.width - progressbar.width)/2;
                // progressbar.y = bg.y + bg.height + 10;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressbar, bg, [0, bg.height + 10]);
            }
            group.addChild(progressbar);
            progressbar.setPercentage(ismaxlevel ? 1 : Math.min(1, havenum / neednum));
            progressbar.setText(ismaxlevel ? "" + havenum : havenum + "/" + neednum);
            progressbar.setTextColor(ColorEnums.white);
            view._progressbar = progressbar;
            if (arrowres != "") {
                var arrow = BaseBitmap.create(arrowres);
                arrow.setScale(0.55);
                // arrow.x = progressbar.x + (progressbar.width - arrow.width)/2 - 9;
                // arrow.y = progressbar.y + (progressbar.height - arrow.height)/2;
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, arrow, progressbar, [-9, 0]);
                group.addChild(arrow);
                view._arrow = arrow;
            }
            else {
                if (view._arrow) {
                    view._arrow.visible = false;
                }
            }
            //信息弹窗
            var infogroup = new BaseDisplayObjectContainer();
            infogroup.width = 152;
            infogroup.height = 293;
            infogroup.y = 7;
            view.addChild(infogroup);
            infogroup.visible = false;
            view._infoGroup = infogroup;
            this.addChild(this._inuse);
            //是新获得的
            var newState_1 = BaseBitmap.create("dicenewget");
            newState_1.setScale(0.7);
            newState_1.setPosition(-6, 0);
            this.addChild(newState_1);
            newState_1.visible = Api.DiceVoApi.isNewGet(data);
            group.addTouchTap(function () {
                if (Api.GameinfoVoApi.checlIsInGuideId(19)) {
                    App.CommonUtil.sendNewGuideId(19);
                    Api.GameinfoVoApi.setCurGudingId(20);
                    App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
                }
                view._infoGroup.removeChildren();
                view.createInfoGroup();
                SoundMgr.playEffect(SoundConst.EFFECT_CLICK);
                newState_1.visible = newState_1.visible = false;
                Api.DiceVoApi.deleteNew(data);
                App.MsgHelper.dispEvt(MsgConst.MODEL_DICE, {});
                App.MsgHelper.dispEvt(MsgConst.DICE_INFOCLICK, {
                    idx: index,
                    dice: data
                });
                view._infoGroup.visible = true;
                view._bg.visible = false;
                view._progressbar.visible = false;
                view._arrow && (view._arrow.visible = false);
                view._levelTxt.visible = false;
                view._maxlevel.visible = false;
            }, view);
        }
    };
    DiceInfoItem.prototype.initBg = function () {
        var bg = BaseBitmap.create("public_alphabg");
        var rect = this.getBounds();
        bg.width = this.width + this.getSpaceX();
        bg.height = this.height + this.getSpaceY();
        this.addChildAt(bg, 0);
        bg.alpha = 0;
        bg.touchEnabled = true;
        bg.addTouchTap(function () {
            App.MsgHelper.dispEvt(MsgConst.DICE_INFOCLICK, {
                idx: -1,
                dice: ""
            });
        }, this);
    };
    DiceInfoItem.prototype.checkBounds = function () {
        return false;
    };
    DiceInfoItem.prototype.hideInfo = function () {
        var view = this;
        view._infoGroup.visible = false;
        this._bg.visible = true;
        this._progressbar.visible = true;
        var level = Api.DiceVoApi.getDiceLvById(view._data);
        var dicecfg = Config.DiceCfg.getCfgById(view._data);
        var ismaxlevel = level == dicecfg.maxGrade;
        view._arrow && (view._arrow.visible = !ismaxlevel);
        this._levelTxt.visible = true;
        this._maxlevel.visible = ismaxlevel;
    };
    DiceInfoItem.prototype.checkInUse = function (teamid) {
        var view = this;
        view._teamid = teamid;
        view._infoGroup.visible = false;
        view._bg.visible = true;
        view._progressbar.visible = true;
        var level = Api.DiceVoApi.getDiceLvById(view._data);
        var dicecfg = Config.DiceCfg.getCfgById(view._data);
        var ismaxlevel = level == dicecfg.maxGrade;
        view._arrow && (view._arrow.visible = !ismaxlevel);
        view._inuse.visible = Api.LineVoApi.getDiceIsInLineById(view._data, teamid);
        view.freshInfo();
    };
    DiceInfoItem.prototype.freshInfo = function () {
        var view = this;
        var data = view._data;
        var level = Api.DiceVoApi.getDiceLvById(data);
        view._levelTxt.text = LangMger.getlocal("sysLevel", [level.toString()]);
        var dicecfg = Config.DiceCfg.getCfgById(data);
        var ismaxlevel = level == dicecfg.maxGrade;
        view._maxlevel.visible = ismaxlevel;
        //已获得
        var havenum = Api.DiceVoApi.getDiceNumById(data);
        var neednum = dicecfg.getNextLvCostNumByLv(level + 1);
        var ishave = Api.DiceVoApi.isHaveDiceById(data);
        var canlevelup = ishave && havenum >= neednum && !ismaxlevel;
        //进度条
        var progressbg = "progress24";
        var arrowres = "public_arrowblue";
        if (ismaxlevel) {
            progressbg = "progress26";
            arrowres = "";
        }
        else if (canlevelup) {
            arrowres = "public_arrowgreen";
            progressbg = "progress25";
        }
        view._progressbar.changeRes(progressbg, "progress_bg_1");
        view._progressbar.setPercentage(ismaxlevel ? 1 : Math.min(1, havenum / neednum));
        view._progressbar.setText(ismaxlevel ? "" + havenum : havenum + "/" + neednum);
        if (arrowres != "" && view._arrow) {
            view._arrow.setRes(arrowres);
        }
        else {
            if (view._arrow) {
                view._arrow.visible = false;
            }
        }
        var isinuse = Api.LineVoApi.getDiceIsInLineById(data, view._teamid);
        view._inuse.visible = isinuse;
        this.setChildIndex(this._inuse, 9999);
    };
    DiceInfoItem.prototype.createInfoGroup = function () {
        var view = this;
        var data = view._data;
        var level = Api.DiceVoApi.getDiceLvById(data);
        var dicecfg = Config.DiceCfg.getCfgById(data);
        var havenum = Api.DiceVoApi.getDiceNumById(data);
        var neednum = dicecfg.getNextLvCostNumByLv(level + 1);
        var ismaxlevel = level == dicecfg.maxGrade;
        var ishave = Api.DiceVoApi.isHaveDiceById(data);
        var canlevelup = ishave && havenum >= neednum && !ismaxlevel;
        var isinuse = Api.LineVoApi.getDiceIsInLineById(data, view._teamid);
        var infogroup = view._infoGroup;
        var infobg = BaseBitmap.create(isinuse ? "diceselectbg" + (canlevelup ? 4 : 3) : "diceselectbg" + (canlevelup ? 1 : 2));
        infogroup.addChild(infobg);
        var infonameTxt = ComponentMgr.getTextField(dicecfg.name, TextFieldConst.SIZE_CONTENT_NORMAL_POPUP, GameConfig.getQualityColor(dicecfg.quality));
        infonameTxt.stroke = 1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, infonameTxt, infobg, [0, 10]);
        infogroup.addChild(infonameTxt);
        var infoicon = App.CommonUtil.getDiceIconById(data, 1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, infoicon, infonameTxt, [0, infonameTxt.height + (105 - infoicon.height * infoicon.scaleY) / 2]);
        infogroup.addChild(infoicon);
        var btn1 = null;
        if (canlevelup) {
            btn1 = ComponentMgr.getButton(ButtonConst.BTN_COMMON_GREEN, "", function () {
                //详细信息弹窗
                App.MsgHelper.dispEvt(MsgConst.CLOSE_GUIDE);
                ViewController.getInstance().openView(ViewConst.DICEDETAILINFOVIEW, {
                    dice: data,
                    callback: function () {
                        if (Api.GameinfoVoApi.checlIsInStepId(30)) {
                            App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
                        }
                        else {
                            App.MsgHelper.dispEvt(MsgConst.DICE_CHANGETOTEAM, {
                                idx: view._index,
                                dice: data,
                            });
                        }
                    },
                    handle: view,
                    isinuse: isinuse,
                    closecallback: function () {
                        if (Api.GameinfoVoApi.checlIsInStepId(30)) {
                            App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
                        }
                    },
                    handler: view
                });
                view.hideInfo();
            }, view, null, 0, TextFieldConst.SIZE_20);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn1, infobg, [0, 170]);
            infogroup.addChild(btn1);
            var costGruop = new BaseDisplayObjectContainer();
            costGruop.width = btn1.width;
            costGruop.height = btn1.height;
            var levelupTxt = ComponentMgr.getTextField(LangMger.getlocal("syslevel"), TextFieldConst.SIZE_18);
            costGruop.addChild(levelupTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, levelupTxt, costGruop, [0, -8], true);
            levelupTxt.strokeColor = ColorEnums.black;
            var costicon = BaseBitmap.create("ab_mainui_gold");
            costicon.setScale(0.7);
            costGruop.addChild(costicon);
            var costTxt = ComponentMgr.getTextField(dicecfg.getNextLvCostGoldByLv(level + 1).toString(), TextFieldConst.SIZE_18);
            costGruop.addChild(costTxt);
            costTxt.strokeColor = ColorEnums.black;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, costicon, costGruop, [(costGruop.width - costicon.width * costicon.scaleX - costTxt.width) / 2 - 3, 10], true);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costTxt, costicon, [costicon.width * costicon.scaleX, 0]);
            btn1.addGroup(costGruop);
        }
        else {
            btn1 = ComponentMgr.getButton(ButtonConst.BTN_COMMON_BLUE, LangMger.getlocal("sysinfo"), function () {
                //详细信息弹窗
                if (Api.GameinfoVoApi.checlIsInGuideId(20)) {
                    return;
                }
                App.MsgHelper.dispEvt(MsgConst.CLOSE_GUIDE);
                ViewController.getInstance().openView(ViewConst.DICEDETAILINFOVIEW, {
                    dice: data,
                    callback: function () {
                        App.MsgHelper.dispEvt(MsgConst.DICE_CHANGETOTEAM, {
                            idx: view._index,
                            dice: data
                        });
                    },
                    handle: view,
                    isinuse: isinuse
                });
                view.hideInfo();
            }, view, null, 0, TextFieldConst.SIZE_20);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn1, infobg, [0, 170]);
            infogroup.addChild(btn1);
        }
        if (!isinuse) {
            var btn2 = ComponentMgr.getButton(ButtonConst.BTN_COMMON_YELLOW, LangMger.getlocal("sysuse"), function () {
                if (Api.GameinfoVoApi.checlIsInStepId(28) && Api.DiceVoApi.getDiceCanLevelUpNum()) {
                    return;
                }
                if (Api.GameinfoVoApi.checlIsInGuideId(20)) {
                    App.CommonUtil.sendNewGuideId(20);
                    Api.GameinfoVoApi.setCurGudingId(21);
                    App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
                }
                //使用
                App.MsgHelper.dispEvt(MsgConst.DICE_CHANGETOTEAM, {
                    idx: view._index,
                    dice: data
                });
                view.hideInfo();
            }, view, null, 0, TextFieldConst.SIZE_20);
            infogroup.addChild(btn2);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn2, btn1, [0, 59]);
        }
    };
    DiceInfoItem.prototype.getSpaceY = function () {
        return 0;
    };
    DiceInfoItem.prototype.getSpaceX = function () {
        return 0;
    };
    DiceInfoItem.prototype.dispose = function () {
        var view = this;
        view._inuse = null;
        view._infoGroup = null;
        view._data = null;
        view._levelTxt = null;
        view._bg = null;
        view._maxlevel = null;
        view._progressbar = null;
        view._arrow = null;
        view._teamid = 1;
        _super.prototype.dispose.call(this);
    };
    return DiceInfoItem;
}(ScrollListItem));
__reflect(DiceInfoItem.prototype, "DiceInfoItem");
//# sourceMappingURL=DiceInfoItem.js.map