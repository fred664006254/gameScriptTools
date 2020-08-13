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
* 据点 item
* date 2020.5.13
* author ycg
* @name SixSection1SeatInfoScrollItem2
*/
var SixSection1SeatInfoScrollItem2 = (function (_super) {
    __extends(SixSection1SeatInfoScrollItem2, _super);
    function SixSection1SeatInfoScrollItem2() {
        return _super.call(this) || this;
    }
    SixSection1SeatInfoScrollItem2.prototype.initItem = function (index, data, param) {
        this.width = 530;
        var bg = BaseBitmap.create("public_popupscrollitembg");
        bg.x = this.width / 2 - bg.width / 2;
        this.addChild(bg);
        var titleBg = BaseBitmap.create("sixsection1_spointresult_titlebg");
        titleBg.setPosition(bg.x + 5, bg.y + 5);
        this.addChild(titleBg);
        titleBg.width = bg.width - 45;
        var atkInfo = null;
        var defenInfo = null;
        var buildName = null;
        if (data.type == "director") {
            atkInfo = data.uinfo;
            defenInfo = data.fuinfo;
            var buildCfg = Api.sixsection1VoApi.getTitleCfgByLine(data.x);
            buildName = LanguageManager.getlocal("sixSection1TitlePopupItemName" + (buildCfg.baseCfg.index + 1));
        }
        else if (data.type == "build") {
            // atkInfo = data.pklogs[0][3];
            // defenInfo = data.pklogs[0][4];
            atkInfo = data.minfo;
            defenInfo = data.finfo;
            var buildCfg = Api.sixsection1VoApi.getBuildCfgByLine(data.x);
            buildName = LanguageManager.getlocal("sixSection1BuildName" + (buildCfg.baseCfg.index + 1));
        }
        else if (data.type == "investigate") {
            //侦查
            atkInfo = data.minfo;
            var buildCfg = Api.sixsection1VoApi.getBuildCfgByLine(data.x);
            buildName = LanguageManager.getlocal("sixSection1BuildName" + (buildCfg.baseCfg.index + 1));
        }
        else if (data.type == "search") {
            //编号查询
            atkInfo = data.minfo;
        }
        //攻击方
        var svNameStr = Api.mergeServerVoApi.getAfterMergeSeverName(atkInfo.uid);
        var titleNameStr = (index + 1) + "." + atkInfo.name + "(" + svNameStr + ", " + atkInfo.uid + ")";
        var titleName = ComponentManager.getTextField(titleNameStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleName.setPosition(titleBg.x + 5, titleBg.y + titleBg.height / 2 - titleName.height / 2);
        this.addChild(titleName);
        var timeDownStr = App.DateUtil.getFormatBySecond(GameData.serverTime - data.fightst, 4);
        var timeDown = ComponentManager.getTextField(timeDownStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeDown.setPosition(titleBg.x + titleBg.width - timeDown.width - 35, titleBg.y + titleBg.height / 2 - timeDown.height / 2);
        this.addChild(timeDown);
        var isWin = false;
        var defendInfoStr = "";
        if (data.type == "build" || data.type == "director") {
            if (data.winuid == Api.playerVoApi.getPlayerID()) {
                isWin = true;
            }
            var defendKey = "sixSection1SeatInfoDefendInfo1";
            if (isWin) {
                defendKey = "sixSection1SeatInfoDefendInfo2";
            }
            if (data.type == "director") {
                defendKey = "sixSection1SeatInfoDefendInfo3";
                if (isWin) {
                    defendKey = "sixSection1SeatInfoDefendInfo4";
                }
            }
            defendInfoStr = LanguageManager.getlocal(defendKey, [buildName]);
        }
        else if (data.type == "investigate") {
            //阵容
            // defendInfoStr = "sixSection1SeatInfoDefendInfo5";
            defendInfoStr = LanguageManager.getlocal("sixSection1SeatInfoDefendInfo5", [buildName, "" + data.x, "" + data.y]);
        }
        else if (data.type == "search") {
            //编号查询
            // defendInfoStr = "sixSection1SeatInfoDefendInfo6";
            defendInfoStr = LanguageManager.getlocal("sixSection1SeatInfoDefendInfo6");
        }
        //防守信息
        var defendInfo = ComponentManager.getTextField(defendInfoStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        defendInfo.setPosition(bg.x + 15, titleBg.y + titleBg.height + 10);
        this.addChild(defendInfo);
        defendInfo.width = 480;
        defendInfo.lineSpacing = 5;
        if (data.type == "investigate" || data.type == "search") {
            defendInfo.y = titleBg.y + titleBg.height + 20;
            bg.height = defendInfo.y + defendInfo.height + 20 > bg.height ? defendInfo.y + defendInfo.height + 20 : bg.height;
        }
        else if (data.type == "director" || data.type == "build") {
            var batleInfoStr = LanguageManager.getlocal("sixSection1SeatInfoDefendBattleInfo2");
            if (!isWin) {
                batleInfoStr = LanguageManager.getlocal("sixSection1SeatInfoDefendBattleInfo1", ["" + buildName, "" + data.getResource]);
            }
            if (data.type == "director") {
                if (!isWin) {
                    batleInfoStr = LanguageManager.getlocal("sixSection1SeatInfoDefendBattleInfo3", ["" + buildName]);
                }
                else {
                    batleInfoStr = "";
                }
            }
            //战斗信息
            var battleInfo = ComponentManager.getTextField(batleInfoStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED2);
            battleInfo.setPosition(defendInfo.x, defendInfo.y + defendInfo.height + 10);
            this.addChild(battleInfo);
            bg.height = battleInfo.y + battleInfo.height + 15;
        }
    };
    SixSection1SeatInfoScrollItem2.prototype.getSpaceX = function () {
        return 5;
    };
    SixSection1SeatInfoScrollItem2.prototype.getSpaceY = function () {
        return 5;
    };
    SixSection1SeatInfoScrollItem2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return SixSection1SeatInfoScrollItem2;
}(ScrollListItem));
__reflect(SixSection1SeatInfoScrollItem2.prototype, "SixSection1SeatInfoScrollItem2");
//# sourceMappingURL=SixSection1SeatInfoScrollItem2.js.map