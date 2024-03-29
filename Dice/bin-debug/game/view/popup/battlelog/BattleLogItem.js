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
var BattleLogItem = (function (_super) {
    __extends(BattleLogItem, _super);
    function BattleLogItem() {
        var _this = _super.call(this) || this;
        _this._cheatBtn = null;
        return _this;
    }
    BattleLogItem.prototype.initItem = function (index, data, param) {
        var view = this;
        var iswave = data.battleType == 2;
        view.width = 520;
        view.height = 284 + 5;
        var bg = BaseBitmap.create("battlelogbg" + (iswave ? "_wave" : (data.winFlag == 1 ? "1" : "2")));
        view.addChild(bg);
        bg.x = 5;
        bg.y = 4;
        // bg.width = 550;
        // bg.height = 284;
        var tropBg = BaseBitmap.create("battle_log_cap_bg_" + (iswave ? "wave" : (data.winFlag == 1 ? "1" : "2")));
        this.addChild(tropBg);
        tropBg.x = 158;
        tropBg.y = 9;
        tropBg.width = 287;
        var titleBg = BaseBitmap.create("battle_log_item_title_" + (iswave ? "wave" : (data.winFlag == 1 ? "1" : "2")));
        this.addChild(titleBg);
        titleBg.x = 0;
        titleBg.y = 0;
        var icon = BaseBitmap.create("battlelogicon" + (iswave ? "_wave" : ""));
        view.addChild(icon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, titleBg, [15, -4]);
        var titleTxt = ComponentMgr.getTextField(LangMger.getlocal("battlelogtitle" + (iswave ? "_wave" : ""), [iswave ? (data.turns.toString()) : (LangMger.getlocal("userinfo" + (data.winFlag == 1 ? "_win" : "_loss")))]), TextFieldConst.SIZE_30, ColorEnums.white);
        view.addChild(titleTxt);
        titleTxt.stroke = 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, titleTxt, icon, [icon.width + 5, 0]);
        // if(!iswave){
        var trophyImg = BaseBitmap.create("trophy_icon");
        view.addChild(trophyImg);
        trophyImg.setScale(0.336);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, trophyImg, tropBg, [156, 0]);
        var trophyNumTxt = ComponentMgr.getTextField("" + (data.changeScore <= 0 ? "" : "+") + data.changeScore, TextFieldConst.SIZE_24, ColorEnums.white);
        view.addChild(trophyNumTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, trophyNumTxt, trophyImg, [trophyImg.width * trophyImg.scaleX + 12, 0]);
        // }
        var cheatbtn = ComponentMgr.getButton("battlelogcheat", "", function () {
            Api.BattlelogVoApi.setlastindex(index);
            //举报
            ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                title: LangMger.getlocal("battlelogcheatplayer"),
                msg: LangMger.getlocal("battlelogtip1"),
                handler: view,
                needCancel: true,
                callback: function () {
                    //发消息
                    NetManager.request(NetConst.BATTLE_COMPLAIN, {
                        logKey: index + 1
                    });
                },
                needClose: 1,
            });
        }, view);
        view.addChild(cheatbtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, cheatbtn, bg, [20, 6]);
        // cheatbtn.addTextIcon(`battlelogcheat`);
        cheatbtn.visible = data.complain == 0;
        view._cheatBtn = cheatbtn;
        // let levelbg = BaseBitmap.create(`public_level_${data.level}`);
        var levelbg = BaseLoadBitmap.create("levelicon" + data.level);
        view.addChild(levelbg);
        levelbg.setScale(0.175);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, levelbg, bg, [15, 80]);
        var infobg = BaseBitmap.create("battlelognamebg");
        infobg.width = 403;
        // infobg.height = 72;
        view.addChild(infobg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, infobg, levelbg, [levelbg.width * levelbg.scaleX + 10, 0]);
        var name = this.getAiName(data);
        var nameTxt = ComponentMgr.getTextField(name, TextFieldConst.SIZE_22, ColorEnums.white);
        view.addChild(nameTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, nameTxt, infobg, [22, 10]);
        var levelTxt = ComponentMgr.getTextField(LangMger.getlocal("sysLevel", [data.level.toString()]), TextFieldConst.SIZE_CONTENT_NORMAL_POPUP, ColorEnums.black);
        view.addChild(levelTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, levelTxt, nameTxt, [0, nameTxt.textHeight + 5]);
        var scoreImg = BaseBitmap.create("trophy_icon");
        scoreImg.setScale(0.42);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, scoreImg, infobg, [269, 0]);
        // let scoreBg = BaseBitmap.create(`diceattr_icon1`);
        // scoreBg.width = 150;
        // scoreBg.height = 40;
        // view.addChild(scoreBg);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, scoreBg, scoreImg, [scoreImg.width/2, 0]);
        view.addChild(scoreImg);
        var scoreTxt = ComponentMgr.getTextField("" + data.score, TextFieldConst.SIZE_24, ColorEnums.white);
        view.addChild(scoreTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, scoreTxt, scoreImg, [scoreImg.width * scoreImg.scaleX + 5, 0]);
        var diceList = ComponentMgr.getScrollList(BattleLogDiceItem, data.line, new egret.Rectangle(0, 0, 564, 140));
        view.addChild(diceList);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, diceList, bg, [-2, -5]);
    };
    BattleLogItem.prototype.getAiName = function (data) {
        return Config.NamesCfg.getEnemyName(data);
    };
    BattleLogItem.prototype.getSpaceY = function () {
        return 0;
    };
    BattleLogItem.prototype.getSpaceX = function () {
        return 0;
    };
    BattleLogItem.prototype.freshInfo = function () {
        var view = this;
        view._cheatBtn.visible = false;
    };
    BattleLogItem.prototype.dispose = function () {
        var view = this;
        view._cheatBtn = null;
        _super.prototype.dispose.call(this);
    };
    return BattleLogItem;
}(ScrollListItem));
__reflect(BattleLogItem.prototype, "BattleLogItem");
//# sourceMappingURL=BattleLogItem.js.map