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
 * 出站骰子队列2
 * author qianjun
 */
var MyCardTeamTypeTab2 = (function (_super) {
    __extends(MyCardTeamTypeTab2, _super);
    function MyCardTeamTypeTab2() {
        var _this = _super.call(this) || this;
        _this._teamid = 2;
        _this._curdice = "";
        _this._tipTxt = null;
        _this._btn = null;
        _this._iconbg = null;
        _this._levelTxt = null;
        _this._nameTxt = null;
        _this._iconGroup = null;
        _this._progressbar = null;
        _this._arrow = null;
        _this._maxlevel = null;
        _this._isBeginning = false;
        _this._selectLinePos = -1;
        _this._point = null;
        _this.initView();
        return _this;
    }
    MyCardTeamTypeTab2.prototype.refreshWhenSwitchBack = function () {
        var view = this;
        view.setUseInfoShow(false);
        var line = Api.LineVoApi.getLineInfoById(view._teamid);
        view._scrollList.refreshData(line, view._teamid);
    };
    MyCardTeamTypeTab2.prototype.initView = function () {
        var view = this;
        view.initEventListener();
        view.width = 560;
        view.height = 145;
        var rectH1 = view.height - 10;
        var rect = new egret.Rectangle(0, 0, 575, 160);
        var line = Api.LineVoApi.getLineInfoById(view._teamid);
        // for(let index = 0; index < line.length; index++){
        //     line[index]["tip"] = true;
        // }
        var list = ComponentMgr.getScrollList(DiceTeamItem, line, rect, view._teamid);
        list.verticalScrollPolicy = "off";
        list.horizontalScrollPolicy = "off";
        view.addChild(list);
        view._scrollList = list;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, list, view, [-3, 15]);
        // view.refreshRankList();
        //使用信息部分
        var tipTxt = ComponentMgr.getTextField(LangMger.getlocal("dicemovetip"), TextFieldConst.SIZE_30, ColorEnums.white);
        tipTxt.stroke = 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, list, [0, list.height + 85]);
        view.addChild(tipTxt);
        view._tipTxt = tipTxt;
        var btn = ComponentMgr.getButton(ButtonConst.BTN_COMMON_YELLOW, LangMger.getlocal("canelStr"), function () {
            view.setUseInfoShow(false);
            App.MsgHelper.dispEvt(MsgConst.DICE_CHANGETOTEAM, {
                show: true
            });
        }, view);
        view.addChild(btn);
        view._btn = btn;
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, btn, list, [0, list.height + 125]);
        var bg = BaseBitmap.create("");
        view._iconbg = bg;
        view.addChild(bg);
        var nameTxt = ComponentMgr.getTextField("", TextFieldConst.SIZE_CONTENT_NORMAL_POPUP);
        view._nameTxt = nameTxt;
        view.addChild(nameTxt);
        var iconGroup = new BaseDisplayObjectContainer();
        view._iconGroup = iconGroup;
        iconGroup.width = 110; //BattleStatus.diceSize.width * DiceScaleEnum.scale_53;
        iconGroup.height = 110; //BattleStatus.diceSize.height * DiceScaleEnum.scale_53;;
        iconGroup.anchorOffsetX = iconGroup.width / 2;
        iconGroup.anchorOffsetY = iconGroup.height / 2;
        view.addChild(iconGroup);
        iconGroup.addTouch(view.touchHandler, view);
        var levelTxt = ComponentMgr.getTextField("", TextFieldConst.SIZE_18);
        view._levelTxt = levelTxt;
        view.addChild(levelTxt);
        //最大等级
        var maxlevel = BaseBitmap.create("dicelevelmax");
        view.addChild(maxlevel);
        view._maxlevel = maxlevel;
        //进度条
        var progressbg = "progress24";
        var arrowres = "public_arrowblue";
        var progressbar = ComponentMgr.getProgressBar(progressbg, "progress_bg_1", 120);
        progressbar.setTextSize(TextFieldConst.SIZE_18);
        view.addChild(progressbar);
        view._progressbar = progressbar;
        var arrow = BaseBitmap.create(arrowres);
        arrow.setScale(0.55);
        view.addChild(arrow);
        view._arrow = arrow;
        arrow.visible = false;
        view.setUseInfoShow(false);
    };
    MyCardTeamTypeTab2.prototype.openChangeTeam = function (dice, width, height) {
        var view = this;
        view._curdice = dice;
        //打开编辑模式
        var line = Api.LineVoApi.getLineInfoById(view._teamid);
        for (var i = 0; i < line.length; ++i) {
            var item = view._scrollList.getItemByIndex(i);
            item.openChangeTeam(dice, view._teamid);
            item.setTween();
        }
        view.createChangeTeamGroup(dice);
        view.setUseInfoShow(true);
    };
    MyCardTeamTypeTab2.prototype.useBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var line = Api.LineVoApi.getLineInfoById(view._teamid);
            for (var i = 0; i < line.length; ++i) {
                var item = view._scrollList.getItemByIndex(i);
                item.freshInfo();
                item.closeChangeTeam();
                item.rmTween();
            }
            view.setUseInfoShow(false);
        }
        view._curdice = "";
    };
    MyCardTeamTypeTab2.prototype.setUseInfoShow = function (flag) {
        var view = this;
        view._tipTxt.visible = view._btn.visible = view._nameTxt.visible = view._iconbg.visible = view._iconGroup.visible = view._levelTxt.visible = view._progressbar.visible = flag;
        if (!flag) {
            view._maxlevel.visible = false;
            view._arrow.visible = false;
            view._curdice = "";
            var clip = view.getChildByName("guangxiao");
            if (clip)
                clip.visible = false;
            var glow = view.getChildByName("glow");
            if (glow)
                glow.visible = false;
            var line = Api.LineVoApi.getLineInfoById(view._teamid);
            for (var i = 0; i < line.length; ++i) {
                var item = view._scrollList.getItemByIndex(i);
                item.freshInfo();
                item.closeChangeTeam();
                item.rmTween();
            }
        }
    };
    MyCardTeamTypeTab2.prototype.createChangeTeamGroup = function (dice) {
        var view = this;
        var dicecfg = Config.DiceCfg.getCfgById(dice);
        var bg = view._iconbg;
        bg.setRes("bird_item_" + dicecfg.quality);
        // if(dicecfg.quality != 4){
        //     bg.width = 142;
        //     bg.height = 182;
        // }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view._tipTxt, [0, view._tipTxt.height + 85]);
        var nameTxt = view._nameTxt;
        nameTxt.text = dicecfg.name;
        nameTxt.setColor(GameConfig.getQualityColor(dicecfg.quality));
        nameTxt.stroke = 2;
        nameTxt.strokeColor = 0x000000;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, nameTxt, bg, [0, 8]);
        if (dicecfg.quality == 4) {
            // 传奇卡牌的特效
            var clip_1 = view.getChildByName("guangxiao");
            if (!clip_1) {
                clip_1 = ComponentMgr.getCustomMovieClip("guangxiao", 10);
                view.addChild(clip_1);
                this.setChildIndex(clip_1, this.getChildIndex(view._iconGroup));
            }
            clip_1.name = "guangxiao";
            clip_1.blendMode = egret.BlendMode.ADD;
            clip_1.setEndCallBack(function () {
                clip_1.dispose();
                clip_1 = null;
            }, this);
            clip_1.visible = true;
            clip_1.playWithTime(0);
            clip_1.setPosition(bg.x + 20, bg.y + 20);
            var glow = view.getChildByName("glow");
            if (!glow) {
                glow = ComponentMgr.getCustomMovieClip("glow");
                view.addChild(glow);
                this.setChildIndex(glow, this.getChildIndex(view._nameTxt));
            }
            glow.visible = true;
            glow.name = "glow";
            glow.playWithTime(0);
            glow.blendMode = egret.BlendMode.ADD;
            glow.x = bg.x;
            glow.y = bg.y - 15;
            nameTxt.y = nameTxt.y + 10;
        }
        else {
            var clip = view.getChildByName("guangxiao");
            if (clip)
                clip.visible = false;
            var glow = view.getChildByName("glow");
            if (glow)
                glow.visible = false;
        }
        if (view._iconGroup) {
            view._iconGroup.removeChildren();
        }
        var iconGroup = App.CommonUtil.getDiceIconById(dice, 1);
        view._iconGroup.addChild(iconGroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._iconGroup, bg);
        view._point = new egret.Point(view._iconGroup.x, view._iconGroup.y);
        var level = Api.DiceVoApi.getDiceLvById(dice);
        var levelTxt = view._levelTxt;
        levelTxt.text = LangMger.getlocal("sysLevel", [level.toString()]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, levelTxt, bg, [9, 15]);
        var ismaxlevel = level == dicecfg.maxGrade;
        //最大等级
        var maxlevel = view._maxlevel;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, maxlevel, bg, [7, 40]);
        maxlevel.visible = ismaxlevel;
        //已获得
        var havenum = Api.DiceVoApi.getDiceNumById(dice);
        var neednum = dicecfg.getNextLvCostNumByLv(level + 1);
        var ishave = Api.DiceVoApi.isHaveDiceById(dice);
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
        var progressbar = view._progressbar;
        progressbar.changeRes(progressbg, "progress_bg_1");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressbar, bg, [0, bg.height + 10]);
        progressbar.setPercentage(ismaxlevel ? 1 : Math.min(1, havenum / neednum));
        progressbar.setText(ismaxlevel ? "" + havenum : havenum + "/" + neednum);
        progressbar.setTextColor(ColorEnums.white);
        if (arrowres != "") {
            view._arrow.setRes(arrowres);
            view._arrow.visible = true;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._arrow, progressbar, [-9, 0]);
        }
        else {
            view._arrow.visible = false;
        }
    };
    MyCardTeamTypeTab2.prototype.touchHandler = function (e) {
        var view = this;
        var diceList = view._scrollList;
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                if (view._isBeginning == false) {
                    view._isBeginning = true;
                }
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                if (view._isBeginning) {
                    var x = e.stageX - 40;
                    var y = e.stageY - 72 - 81 - 90;
                    view._iconGroup.setPosition(x, y);
                }
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                if (view._isBeginning) {
                    view._iconGroup.setPosition(view._point.x, view._point.y);
                    view._isBeginning = false;
                }
            case egret.TouchEvent.TOUCH_END:
                if (view._isBeginning) {
                    view.checkCanUse();
                    view._isBeginning = false;
                    view._iconGroup.setPosition(view._point.x, view._point.y);
                }
            default:
                break;
        }
    };
    MyCardTeamTypeTab2.prototype.checkCanUse = function () {
        var view = this;
        var line = Api.LineVoApi.getLineInfoById(view._teamid);
        for (var i = 0; i < line.length; ++i) {
            var item = view._scrollList.getItemByIndex(i);
            var point = new egret.Point(item.x + view._scrollList.x + (103 / 2), item.y + view._scrollList.y + 5 + (103 / 2));
            //检测是否 圆心重合即可
            if (view.getDistance(point, new egret.Point(view._iconGroup.x, view._iconGroup.y)) <= (view._iconGroup.width / 2)) {
                item.sendClick(view._curdice, view._teamid);
                //item.dispatchEvent(new egret.Event(egret.TouchEvent.TOUCH_TAP));
                break;
            }
        }
    };
    MyCardTeamTypeTab2.prototype.getDistance = function (point1, point2) {
        return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
    };
    MyCardTeamTypeTab2.prototype.upgardeBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            //App.CommonUtil.showTip(LangMger.getlocal(`sysUpgardeSucc`));
            var line = Api.LineVoApi.getLineInfoById(view._teamid);
            view._scrollList.refreshData(line, view._teamid);
        }
    };
    MyCardTeamTypeTab2.prototype.getNetConstEventArr = function () {
        return [
            NetConst.DICE_USE, NetConst.DICE_UPGRADE
        ];
    };
    MyCardTeamTypeTab2.prototype.netEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case NetConst.DICE_USE:
                view.useBack(evt);
                break;
            case NetConst.DICE_UPGRADE:
                view.upgardeBack(evt);
                break;
        }
    };
    MyCardTeamTypeTab2.prototype.dispose = function () {
        var view = this;
        view._tipTxt = null;
        view._btn = null;
        view._iconbg = null;
        view._levelTxt = null;
        view._nameTxt = null;
        view._iconGroup = null;
        view._progressbar = null;
        view._arrow = null;
        view._scrollList = null;
        view._teamid = 1;
        view._maxlevel = null;
        view._isBeginning = false;
        view._selectLinePos = -1;
        view._point = null;
        view._curdice = "";
        _super.prototype.dispose.call(this);
    };
    return MyCardTeamTypeTab2;
}(CommonViewTab));
__reflect(MyCardTeamTypeTab2.prototype, "MyCardTeamTypeTab2");
//# sourceMappingURL=MyCardTeamTypeTab2.js.map