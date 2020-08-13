/**
 * 抢夺记录 item
 * author ycg
 * date 2020.5.8
* @name SixSection1HoldLogItem
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
var SixSection1HoldLogItem = (function (_super) {
    __extends(SixSection1HoldLogItem, _super);
    function SixSection1HoldLogItem() {
        return _super.call(this) || this;
    }
    SixSection1HoldLogItem.prototype.initItem = function (index, data, param) {
        this.width = 620;
        // view.height = 120;
        //标号
        var numTf = ComponentManager.getTextField("" + (index + 1), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        numTf.setPosition(20 - numTf.width / 2, 15);
        this.addChild(numTf);
        var atkInfo = null;
        var defenInfo = null;
        var buildName = null;
        if (data.type == "director") {
            atkInfo = data.uinfo;
            defenInfo = data.fuinfo;
            var buildCfg = Api.sixsection1VoApi.getTitleCfgByLine(data.x);
            buildName = LanguageManager.getlocal("sixSection1TitlePopupItemName" + (buildCfg.baseCfg.index + 1));
        }
        else {
            // atkInfo = data.pklogs[0][3];
            // defenInfo = data.pklogs[0][4];
            atkInfo = data.minfo;
            defenInfo = data.finfo;
            var buildCfg = Api.sixsection1VoApi.getBuildCfgByLine(data.x);
            buildName = LanguageManager.getlocal("sixSection1BuildName" + (buildCfg.baseCfg.index + 1));
        }
        //名字
        // let atkInfo = data.pklogs[0][3];
        var atkSv = Api.mergeServerVoApi.getAfterMergeSeverName(atkInfo.uid);
        var name = ComponentManager.getTextField(atkInfo.name + "(" + atkSv + ")", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_ORANGE);
        name.setPosition(50, 15);
        this.addChild(name);
        //称号
        var titlePic = App.CommonUtil.getTitlePic(atkInfo.title);
        if (titlePic) {
            titlePic.setScale(0.85);
            titlePic.setPosition(name.x + name.width + 70, 0);
            this.addChild(titlePic);
        }
        //info
        var defenSv = Api.mergeServerVoApi.getAfterMergeSeverName(defenInfo.uid);
        var infoKey = "sixSection1HoldLogInfo1";
        if (data.type == "director") {
            infoKey = "sixSection1HoldLogInfo2";
        }
        var infoStr = LanguageManager.getlocal(infoKey, [defenInfo.name, defenSv, buildName]);
        var info = ComponentManager.getTextField(infoStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        info.setPosition(name.x, name.y + name.height + 15);
        info.width = 550;
        info.lineSpacing = 7;
        this.addChild(info);
        //time
        var timeStr = App.DateUtil.getFormatBySecond(data.fightst, 2);
        var time = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldLogTime", [timeStr]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        time.setPosition(info.x, info.y + info.height + 10);
        this.addChild(time);
        var line = BaseBitmap.create("public_line1");
        line.width = this.width;
        line.setPosition(this.width / 2 - line.width / 2, time.y + time.height + 10);
        this.addChild(line);
        this.height = line.y + line.height + 5;
    };
    SixSection1HoldLogItem.prototype.getSpaceX = function () {
        return 5;
    };
    SixSection1HoldLogItem.prototype.getSpaceY = function () {
        return 5;
    };
    SixSection1HoldLogItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return SixSection1HoldLogItem;
}(ScrollListItem));
__reflect(SixSection1HoldLogItem.prototype, "SixSection1HoldLogItem");
//# sourceMappingURL=SixSection1HoldLogItem.js.map