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
* 仇人 item
* date 2020.5.13
* author ycg
* @name SixSection1SeatInfoScrollItem3
*/
var SixSection1SeatInfoScrollItem3 = (function (_super) {
    __extends(SixSection1SeatInfoScrollItem3, _super);
    function SixSection1SeatInfoScrollItem3() {
        return _super.call(this) || this;
    }
    SixSection1SeatInfoScrollItem3.prototype.initItem = function (index, data, param) {
        this.width = 530;
        var bg = BaseBitmap.create("public_popupscrollitembg");
        bg.x = this.width / 2 - bg.width / 2;
        this.addChild(bg);
        var titleBg = BaseBitmap.create("sixsection1_spointresult_titlebg");
        titleBg.setPosition(bg.x + 5, bg.y + 5);
        this.addChild(titleBg);
        titleBg.width = bg.width - 45;
        var eInfo = null;
        var defenInfo = null;
        var buildName = null;
        if (data.data[0].type == "director") {
            eInfo = data.data[0].uinfo;
            var buildCfg = Api.sixsection1VoApi.getTitleCfgByLine(data.data[0].x);
            buildName = LanguageManager.getlocal("sixSection1TitlePopupItemName" + (buildCfg.baseCfg.index + 1));
        }
        else {
            // eInfo = data.data[0].pklogs[0][3];
            eInfo = data.data[0].minfo;
            var buildCfg = Api.sixsection1VoApi.getBuildCfgByLine(data.data[0].x);
            buildName = LanguageManager.getlocal("sixSection1BuildName" + (buildCfg.baseCfg.index + 1));
        }
        //仇人
        var svNameStr = Api.mergeServerVoApi.getAfterMergeSeverName(eInfo.uid);
        var titleNameStr = (index + 1) + "." + eInfo.name + "(" + svNameStr + ", " + eInfo.uid + ")";
        var titleName = ComponentManager.getTextField(titleNameStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleName.setPosition(titleBg.x + 5, titleBg.y + titleBg.height / 2 - titleName.height / 2);
        this.addChild(titleName);
        var timeDownStr = App.DateUtil.getFormatBySecond(GameData.serverTime - data.data[0].fightst, 4);
        var timeDown = ComponentManager.getTextField(timeDownStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeDown.setPosition(titleBg.x + titleBg.width - timeDown.width - 35, titleBg.y + titleBg.height / 2 - timeDown.height / 2);
        this.addChild(timeDown);
        //官品
        var levelNum = eInfo.level;
        var level = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SeatInfoEnemyLv", [LanguageManager.getlocal("officialTitle" + levelNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        level.setPosition(bg.x + 20, titleBg.y + titleBg.height + 10);
        this.addChild(level);
        //势力
        var powerNum = 0;
        if (eInfo.power) {
            powerNum = eInfo.power;
        }
        var power = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SeatInfoEnemyPower", ["" + App.StringUtil.changeIntToText(powerNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        power.setPosition(level.x, level.y + level.height + 10);
        this.addChild(power);
        //抢夺数
        var holdNum = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SeatInfoEnemyHoldNum", ["" + data.data.length]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        holdNum.setPosition(power.x, power.y + power.height + 10);
        this.addChild(holdNum);
        //最近抢夺
        var holdInfoStr = LanguageManager.getlocal("sixSection1SeatInfoEnemyCurrHold", ["" + buildName, "" + data.data[0].x, "" + data.data[0].y]);
        var holdInfo = ComponentManager.getTextField(holdInfoStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        holdInfo.setPosition(holdNum.x, holdNum.y + holdNum.height + 10);
        this.addChild(holdInfo);
        var infoBg = BaseBitmap.create("sixsection1_spointinfobg");
        infoBg.width = bg.width - 10;
        infoBg.height = 42;
        infoBg.x = bg.x + bg.width / 2 - infoBg.width / 2;
        infoBg.y = holdInfo.y + holdInfo.height + 10;
        this.addChild(infoBg);
        var arrowContainer = new BaseDisplayObjectContainer();
        this.addChild(arrowContainer);
        arrowContainer.height = 42;
        var arrow = BaseBitmap.create("sixsectionmainui_downflag");
        arrowContainer.addChild(arrow);
        var arrowTxt = BaseBitmap.create("sixsection1_downtxt");
        arrowContainer.addChild(arrowTxt);
        arrow.y = arrowContainer.height / 2 - arrow.height / 2;
        arrowTxt.x = arrow.x + arrow.width - 10;
        arrowContainer.x = infoBg.x + infoBg.width / 2 - (arrow.width + arrowTxt.width - 10) / 2;
        arrowContainer.y = infoBg.y + infoBg.height / 2 - arrowContainer.height / 2;
        var isShowAll = data.isShowAll;
        arrowContainer.addTouchTap(function () {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SIXSECTION1_SEATINFO_REFRESH, { index: index, isShowAll: !isShowAll });
        }, this);
        if (isShowAll) {
            holdInfo.text = LanguageManager.getlocal("sixSection1SeatInfoEnemyHoldDetail");
            //添加 具体数据
            for (var i = 0; i < data.data.length; i++) {
                var bNameStr = "";
                if (data.data[i].type == "build") {
                    var buildTmpCfg = Api.sixsection1VoApi.getBuildCfgByLine(data.data[i].x);
                    bNameStr = LanguageManager.getlocal("sixSection1BuildName" + (buildTmpCfg.baseCfg.index + 1));
                }
                else {
                    var buildTmpCfg = Api.sixsection1VoApi.getTitleCfgByLine(data.data[i].x);
                    bNameStr = LanguageManager.getlocal("sixSection1TitlePopupItemName" + (buildTmpCfg.baseCfg.index + 1));
                }
                var timeStr = App.DateUtil.getFormatBySecond(data.data[i].fightst, 2);
                var time = ComponentManager.getTextField(timeStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
                time.setPosition(infoBg.x + 35, infoBg.y + 15 + i * (time.height + 10));
                this.addChild(time);
                var bName = ComponentManager.getTextField(bNameStr + "(" + data.data[i].x + ", " + data.data[i].y + ")", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
                bName.setPosition(infoBg.x + infoBg.width / 2 + 20, time.y);
                this.addChild(bName);
            }
            infoBg.height = 15 + data.data.length * 30 + 45;
            arrow.setRes("sixsectionmainui_upflag");
            arrowTxt.setRes("sixsection1_uptxt");
            arrowContainer.y = infoBg.y + infoBg.height - arrowContainer.height;
        }
        bg.height = infoBg.y + infoBg.height + 5;
    };
    SixSection1SeatInfoScrollItem3.prototype.getSpaceX = function () {
        return 5;
    };
    SixSection1SeatInfoScrollItem3.prototype.getSpaceY = function () {
        return 5;
    };
    SixSection1SeatInfoScrollItem3.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return SixSection1SeatInfoScrollItem3;
}(ScrollListItem));
__reflect(SixSection1SeatInfoScrollItem3.prototype, "SixSection1SeatInfoScrollItem3");
//# sourceMappingURL=SixSection1SeatInfoScrollItem3.js.map