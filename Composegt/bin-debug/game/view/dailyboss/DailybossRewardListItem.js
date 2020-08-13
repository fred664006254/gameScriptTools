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
var DailybossRewardListItem = (function (_super) {
    __extends(DailybossRewardListItem, _super);
    function DailybossRewardListItem() {
        return _super.call(this) || this;
    }
    DailybossRewardListItem.prototype.initItem = function (index, data) {
        var color = (data.myrank == null ? TextFieldConst.COLOR_WHITE : TextFieldConst.COLOR_LIGHT_YELLOW);
        var nameTxt = ComponentManager.getTextField((data.myrank != null ? data.myrank : String(index + 1)) + "." + data.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, color);
        this.addChild(nameTxt);
        this._nameTxt = nameTxt;
        nameTxt.y = 5;
        var rewardvo = GameData.formatRewardItem(data.rewards)[0];
        var rewardStr = rewardvo.name + "*" + rewardvo.num;
        var valueTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossRankReward", [data.bossLv.toString(), rewardStr]), TextFieldConst.FONTSIZE_CONTENT_SMALL, color);
        valueTxt.setPosition(230, 0);
        this.addChild(valueTxt);
        this._valueTxt = valueTxt;
        valueTxt.y = 5;
        // if (data.uid == Api.playerVoApi.getPlayerID()) {
        //     nameTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        //     valueTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        // }
        // if(data.title)
        // {
        // 	let titleIcon:BaseLoadBitmap = BaseLoadBitmap.create(Config.TitleCfg.getTitleCfgById(data.title).titleIcon3);
        // 	titleIcon.setScale(0.6);
        // 	titleIcon.setPosition(nameTxt.x + nameTxt.width + 10,3);
        // 	this.addChild(titleIcon);
        // 	this._titleIcon=titleIcon;
        // }
        this.width = 500;
    };
    DailybossRewardListItem.prototype.refresh = function (index, data) {
        if (this._nameTxt) {
            this._nameTxt.text = (data.myrank != null ? data.myrank : String(index + 1)) + "." + data.name;
        }
        if (this._valueTxt) {
            this._valueTxt.text = LanguageManager.getlocal("dailybossDamageValueDesc", [data.value.toString()]);
        }
        if (data.title) {
            if (this._titleIcon) {
                this._titleIcon.setload(Config.TitleCfg.getTitleCfgById(data.title).titleIcon3);
            }
            else {
                var titleIcon = BaseLoadBitmap.create(Config.TitleCfg.getTitleCfgById(data.title).titleIcon3);
                titleIcon.setScale(0.6);
                titleIcon.setPosition(220, 3);
                this.addChild(titleIcon);
                this._titleIcon = titleIcon;
            }
        }
    };
    DailybossRewardListItem.prototype.dipose = function () {
        this._nameTxt = null;
        this._titleIcon = null;
        this._valueTxt = null;
        _super.prototype.dispose.call(this);
    };
    return DailybossRewardListItem;
}(ScrollListItem));
__reflect(DailybossRewardListItem.prototype, "DailybossRewardListItem");
