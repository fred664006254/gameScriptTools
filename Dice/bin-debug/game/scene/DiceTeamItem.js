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
var DiceTeamItem = (function (_super) {
    __extends(DiceTeamItem, _super);
    function DiceTeamItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._icon = null;
        _this._levelTxt = null;
        _this._teamid = 0;
        _this._bg = null;
        _this.clip = null;
        _this.tipgruop = null;
        /**item 的状态， 1 默认状态， 2 编辑状态 */
        _this.status = 1;
        return _this;
    }
    DiceTeamItem.prototype.initItem = function (index, data, param) {
        var view = this;
        view._teamid = param;
        view.width = 108 + 7;
        view.height = 140;
        view._data = data;
        // Config.DiceCfg.getCfgById(data.id).quality;
        var bg = BaseBitmap.create("bird_team_item_" + Config.DiceCfg.getCfgById(data.id).quality);
        bg.height = BattleStatus.diceSize.width * DiceScaleEnum.scale_54;
        bg.width = BattleStatus.diceSize.height * DiceScaleEnum.scale_54;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bg, view, [0, 5], true);
        view.addChild(bg);
        view._bg = bg;
        bg.touchEnabled = true;
        bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bgOnclick, this);
        // if(Config.DiceCfg.getCfgById(data.id).quality === 4){
        var clip = ComponentMgr.getCustomMovieClip("guangxiao", 10);
        clip.width = bg.width;
        clip.height = bg.height;
        this.addChild(clip);
        clip.blendMode = egret.BlendMode.ADD;
        clip.setEndCallBack(function () {
            clip.dispose();
            clip = null;
        }, this);
        clip.playWithTime(0);
        clip.visible = Config.DiceCfg.getCfgById(data.id).quality === 4;
        this.clip = clip;
        // clip.setPosition(20,10);
        // }
        var group = new BaseDisplayObjectContainer();
        view.addChild(group);
        view._icon = group;
        group.width = BattleStatus.diceSize.width * DiceScaleEnum.scale_54;
        group.height = BattleStatus.diceSize.height * DiceScaleEnum.scale_54;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, group, bg);
        var iconGroup = App.CommonUtil.getDiceIconById(data.id, DiceScaleEnum.scale_team);
        group.addChild(iconGroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconGroup, group);
        var tipgruop = new BaseDisplayObjectContainer();
        this.addChild(tipgruop);
        tipgruop.visible = false;
        this.tipgruop = tipgruop;
        var tipbg = BaseBitmap.create("publicclickchangebg");
        tipgruop.addChild(tipbg);
        var tiptxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_16, ColorEnums.white);
        tipgruop.addChild(tiptxt);
        tiptxt.text = LangMger.getlocal("sysclicktochange");
        tipgruop.alpha = 0;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tiptxt, tipgruop, [0, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipgruop, bg, [0, 0]);
        var level = Api.DiceVoApi.getDiceLvById(data.id);
        var levelTxt = ComponentMgr.getTextField(LangMger.getlocal("sysLevel", [level.toString()]), TextFieldConst.SIZE_30, ColorEnums.white);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, levelTxt, bg, [0, bg.height + 15]);
        view.addChild(levelTxt);
        view._levelTxt = levelTxt;
        levelTxt.bold = true;
        levelTxt.stroke = 1.5;
        data.showLevel = data.showLevel || 1;
        if (data.showLevel == 2) {
            levelTxt.visible = false;
        }
        if (view._teamid == 0) {
            levelTxt.visible = false;
        }
    };
    DiceTeamItem.prototype.bgOnclick = function (obj, evt) {
        if (this.status === 2) {
            return;
        }
        ViewController.getInstance().openView(ViewConst.DICEDETAILINFOVIEW, {
            dice: this._data.id,
            check: true,
        });
        App.MsgHelper.dispEvt(MsgConst.DICE_INFOCLICK, {
            idx: -1,
            dice: ""
        });
    };
    /**
     * setTween
     */
    DiceTeamItem.prototype.setTween = function () {
        this.tipgruop.visible = true;
        var tw = egret.Tween.get(this.tipgruop, { loop: true });
        tw.to({ alpha: 1 }, 1500).wait(1500)
            .to({ alpha: 0 }, 1500).wait(1500);
    };
    /**
     * rmTween
     */
    DiceTeamItem.prototype.rmTween = function () {
        this.tipgruop.visible = false;
        egret.Tween.removeTweens(this.tipgruop);
    };
    DiceTeamItem.prototype.freshInfo = function () {
        var view = this;
        var line = Api.LineVoApi.getLineInfoById(view._teamid);
        var diceinfo = line[view._index];
        var dice = diceinfo.id;
        this._data.id = dice;
        view._icon.removeChildren();
        var iconGroup = App.CommonUtil.getDiceIconById(dice, DiceScaleEnum.scale_team);
        view._icon.addChild(iconGroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconGroup, view._icon);
        view._bg.setRes("bird_team_item_" + Config.DiceCfg.getCfgById(dice).quality);
        this.clip.visible = Config.DiceCfg.getCfgById(dice).quality === 4;
        var level = Api.DiceVoApi.getDiceLvById(dice);
        view._levelTxt.text = LangMger.getlocal("sysLevel", [level.toString()]);
    };
    DiceTeamItem.prototype.openChangeTeam = function (dice, teamid) {
        var view = this;
        view.removeTouchTap();
        this.status = 2;
        this._bg.touchEnabled = false;
        //打开替换队列模式
        view.addTouchTap(function () {
            NetManager.request(NetConst.DICE_USE, {
                diceId: dice,
                lineNo: teamid,
                upPos: view._index + 1
            });
        }, view);
    };
    DiceTeamItem.prototype.sendClick = function (dice, teamid) {
        var view = this;
        NetManager.request(NetConst.DICE_USE, {
            diceId: dice,
            lineNo: teamid,
            upPos: view._index + 1
        });
    };
    DiceTeamItem.prototype.closeChangeTeam = function () {
        var view = this;
        this.status = 1;
        this._bg.touchEnabled = true;
        //关闭替换队列模式
        view.removeTouchTap();
    };
    DiceTeamItem.prototype.getSpaceY = function () {
        return 0;
    };
    DiceTeamItem.prototype.getSpaceX = function () {
        return 0;
    };
    DiceTeamItem.prototype.dispose = function () {
        var view = this;
        view.tipgruop = null;
        view._data = null;
        view._icon = null;
        view._levelTxt = null;
        view._teamid = 0;
        view._bg = null;
        this.clip = null;
        _super.prototype.dispose.call(this);
    };
    return DiceTeamItem;
}(ScrollListItem));
__reflect(DiceTeamItem.prototype, "DiceTeamItem");
//# sourceMappingURL=DiceTeamItem.js.map