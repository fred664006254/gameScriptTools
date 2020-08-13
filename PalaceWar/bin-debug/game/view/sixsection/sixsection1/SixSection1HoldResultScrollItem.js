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
* 据点结算 item
* date 2020.5.14
* author ycg
* @name SixSection1HoldResultScrollItem
*/
var SixSection1HoldResultScrollItem = (function (_super) {
    __extends(SixSection1HoldResultScrollItem, _super);
    function SixSection1HoldResultScrollItem() {
        return _super.call(this) || this;
    }
    SixSection1HoldResultScrollItem.prototype.initItem = function (index, data, param) {
        this.width = 640;
        var bg = BaseBitmap.create("sixsection1_spointresult_itembg");
        // bg.width = 620;
        bg.x = this.width / 2 - bg.width / 2;
        this.addChild(bg);
        // let titleBg = BaseBitmap.create("sixsection1_spointresult_titlebg");
        // titleBg.setPosition(bg.x + 5, bg.y + 5);
        // this.addChild(titleBg);
        // titleBg.width = bg.width - 45;
        var numBg = BaseBitmap.create("sixsection1_spointresult_itemnumbg");
        numBg.setPosition(bg.x + 5, bg.y + 3);
        this.addChild(numBg);
        var itemNum = ComponentManager.getTextField("" + (index + 1), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        itemNum.setPosition(numBg.x + numBg.width / 2 - itemNum.width / 2, numBg.y + numBg.height / 2 - itemNum.height / 2);
        this.addChild(itemNum);
        if (data.type == "build") {
            var getStatusStr = LanguageManager.getlocal("sixSection1HoldResultGet");
            if (data.status == 1) {
                getStatusStr = LanguageManager.getlocal("sixSection1HoldResultNotGet");
            }
            var buildCfg = Api.sixsection1VoApi.getBuildCfgByLine(data.data.x);
            var buildName = LanguageManager.getlocal("sixSection1BuildName" + (buildCfg.baseCfg.index + 1));
            var titleName = ComponentManager.getTextField(buildName + getStatusStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            // titleName.setPosition(titleBg.x + 5, titleBg.y + titleBg.height/2 - titleName.height/2);
            titleName.setPosition(numBg.x + numBg.width + 5, itemNum.y + itemNum.height / 2 - titleName.height / 2);
            this.addChild(titleName);
            var timeDownStr = App.DateUtil.getFormatBySecond(GameData.serverTime - data.data.et, 4);
            var timeDown = ComponentManager.getTextField(timeDownStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            // timeDown.setPosition(titleBg.x + titleBg.width - timeDown.width - 35, titleBg.y + titleBg.height/2 - timeDown.height/2);
            timeDown.setPosition(bg.x + bg.width - timeDown.width - 35, titleName.y + titleName.height / 2 - timeDown.height / 2);
            this.addChild(timeDown);
            //获得
            var getInfoStr = LanguageManager.getlocal("sixSection1HoldSeatResName1") + "*" + data.data.res;
            var getInfo = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldResultItemGet") + getInfoStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            getInfo.setPosition(titleName.x, titleName.y + titleName.height + 10);
            this.addChild(getInfo);
            //损失
            if (data.data.fname || data.data.fres) {
                var loseInfoStr = LanguageManager.getlocal("sixSection1HoldSeatResName1") + "*" + data.data.fres;
                var loseInfo = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldResultItemNotGet") + loseInfoStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
                loseInfo.setPosition(getInfo.x, getInfo.y + getInfo.height + 10);
                this.addChild(loseInfo);
                //抢夺者
                var player = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldResultItemPlayerInfo") + data.data.fname, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
                player.setPosition(loseInfo.x, loseInfo.y + loseInfo.height + 10);
                this.addChild(player);
                // bg.height = player.y + player.height + 20;
            }
            // else{
            //     bg.height = bg.height > getInfo.height + getInfo.y + 20 ? bg.height : getInfo.height + getInfo.y + 20;
            // } 
        }
        else {
            var buildCfg = Api.sixsection1VoApi.getTitleCfgByLine(data.data.x);
            var buildName = LanguageManager.getlocal("sixSection1TitlePopupItemName" + (buildCfg.baseCfg.index + 1));
            var holdStr = LanguageManager.getlocal("sixSection1HoldResultTitleNotGet");
            var titleName = ComponentManager.getTextField(buildName + holdStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            // titleName.setPosition(titleBg.x + 5, titleBg.y + titleBg.height/2 - titleName.height/2);
            titleName.setPosition(numBg.x + numBg.width + 5, itemNum.y + itemNum.height / 2 - titleName.height / 2);
            this.addChild(titleName);
            var timeDownStr = App.DateUtil.getFormatBySecond(GameData.serverTime - data.data.fightst, 4);
            var timeDown = ComponentManager.getTextField(timeDownStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            // timeDown.setPosition(titleBg.x + titleBg.width - timeDown.width - 35, titleBg.y + titleBg.height/2 - timeDown.height/2);
            timeDown.setPosition(bg.x + bg.width - timeDown.width - 35, titleName.y + titleName.height / 2 - timeDown.height / 2);
            this.addChild(timeDown);
            //抢夺者
            var sv = Api.mergeServerVoApi.getAfterMergeSeverName(data.data.fuid);
            var player = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldResultItemPlayerInfo") + data.data.fname + "(" + sv + ")", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            // player.setPosition(bg.x + 15, titleBg.y + titleBg.height + 30);
            player.setPosition(titleName.x, titleName.y + titleName.height + 10);
            this.addChild(player);
            // bg.height = player.y + player.height + 20 > bg.height ? player.y + player.height + 20 : bg.height;
        }
    };
    SixSection1HoldResultScrollItem.prototype.getSpaceX = function () {
        return 5;
    };
    SixSection1HoldResultScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    SixSection1HoldResultScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return SixSection1HoldResultScrollItem;
}(ScrollListItem));
__reflect(SixSection1HoldResultScrollItem.prototype, "SixSection1HoldResultScrollItem");
//# sourceMappingURL=SixSection1HoldResultScrollItem.js.map