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
        if (data.title && data.title.title) {
            var titleinfo = null;
            if (index == -1) {
                titleinfo = Api.playerVoApi.getTitleInfo();
            }
            else {
                titleinfo = App.CommonUtil.getTitleData(data.title);
            }
            if (titleinfo.title != '') {
                var titleIcon = App.CommonUtil.getTitlePic(data.title);
                titleIcon.setScale(0.6);
                titleIcon.setPosition(nameTxt.x + nameTxt.width + 10, nameTxt.y - 7);
                this.addChild(titleIcon);
                this._titleIcon = titleIcon;
            }
        }
        else {
            if (data.level) {
                var officerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, color);
                officerTxt.text = LanguageManager.getlocal("officialTitle" + data.level);
                officerTxt.x = nameTxt.x + nameTxt.width + 22;
                officerTxt.y = nameTxt.y;
                this.addChild(officerTxt);
            }
        }
        this.width = 500;
        this.height = 36;
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
                this._titleIcon.dispose();
                this._titleIcon = null;
            }
            var titleinfo = App.CommonUtil.getTitleData(data.title);
            if (titleinfo.title != '') {
                var titleIcon = App.CommonUtil.getTitlePic(data.title);
                titleIcon.setScale(0.6);
                titleIcon.setPosition(this._nameTxt.x + this._nameTxt.width + 10, this._nameTxt.y - 7);
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
//# sourceMappingURL=DailybossRewardListItem.js.map