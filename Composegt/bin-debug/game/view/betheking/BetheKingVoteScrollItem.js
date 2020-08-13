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
var BetheKingVoteScrollItem = (function (_super) {
    __extends(BetheKingVoteScrollItem, _super);
    function BetheKingVoteScrollItem() {
        var _this = _super.call(this) || this;
        _this._rowIdx = 0;
        _this._uiData = undefined;
        _this._requsting = false;
        return _this;
    }
    BetheKingVoteScrollItem.prototype.initItem = function (index, data) {
        this._rowIdx = index;
        this._uiData = data;
        this.height = 52;
        this.width = 520;
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (index % 2 == 1) {
            var bg = BaseBitmap.create("public_tc_bg05");
            bg.width = this.width;
            bg.height = this.height;
            bg.x = this.width / 2 - bg.width / 2;
            bg.y = 0;
            this.addChild(bg);
        }
        if (this._uiData.uid == Api.playerVoApi.getPlayerID()) {
            tarColor = TextFieldConst.COLOR_WARN_GREEN;
        }
        if (this._rowIdx < 3) {
            var rankImg = BaseBitmap.create("rank_" + String(this._rowIdx + 1));
            rankImg.x = 60 - rankImg.width / 2;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
        }
        else {
            var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
            rankTxt.text = String(this._rowIdx + 1);
            rankTxt.x = 60 - rankTxt.width / 2;
            rankTxt.y = this.height / 2 - rankTxt.height / 2;
            this.addChild(rankTxt);
        }
        var titleTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        titleTxt2.text = this._uiData.name;
        titleTxt2.x = 173 - titleTxt2.width / 2;
        titleTxt2.y = this.height / 2 - titleTxt2.height / 2;
        this.addChild(titleTxt2);
        this._titleTxt3 = ComponentManager.getTextField("", titleTxt2.size, tarColor);
        this._titleTxt3.text = String(this._uiData.cheer_num);
        this._titleTxt3.x = 295 - this._titleTxt3.width / 2;
        this._titleTxt3.y = titleTxt2.y;
        this.addChild(this._titleTxt3);
        var voteBtn = ComponentManager.getButton("strengthen_button", "betheking_votebtntxt", this.voteHandler, this);
        this._voteBtn = voteBtn;
        if (BetheKingVoteScrollItem._ACVO.isVoteEnable(this._uiData.uid)) {
            var num = BetheKingVoteScrollItem._ACVO.getVoteNum(this._uiData.uid);
            if (num > 0) {
                var txt = LanguageManager.getlocal("betheking_votebtntxt2", ["" + num]);
                this._voteBtn.setText(txt, false);
            }
        }
        else {
            App.DisplayUtil.changeToGray(this._voteBtn);
        }
        voteBtn.x = 370;
        // voteBtn.setScale(0.7);
        voteBtn.y = this.height / 2 - voteBtn.height / 2;
        ;
        this.addChild(voteBtn);
    };
    BetheKingVoteScrollItem.prototype.voteCallBackHandler = function (event) {
        if (!this._requsting) {
            return;
        }
        this._requsting = false;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_KINGS_VOTE, this.voteCallBackHandler, this);
        var data = event.data;
        var ret = data.data.ret;
        if (ret == 0) {
            this._uiData.cheer_num += 1;
            this._titleTxt3.text = String(this._uiData.cheer_num);
            var rdata = data.data.data;
            App.CommonUtil.showTip(LanguageManager.getlocal("betheKing_vote_tip1"));
            var num = BetheKingVoteScrollItem._ACVO.getVoteNum(this._uiData.uid);
            var txt = LanguageManager.getlocal("betheking_votebtntxt2", ["" + num]);
            this._voteBtn.setText(txt, false);
        }
    };
    BetheKingVoteScrollItem.prototype.voteHandler = function () {
        if (BetheKingVoteScrollItem._ACVO.et - GameData.serverTime < 86400) {
            App.CommonUtil.showTip(LanguageManager.getlocal("betheKing_vote_tip4"));
            return;
        }
        if (!BetheKingVoteScrollItem._ACVO.isVoteEnable(this._uiData.uid)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("betheKing_vote_tip2"));
            return;
        }
        if (BetheKingVoteScrollItem._ACVO.cnum <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("betheKing_vote_tip3"));
            return;
        }
        this._requsting = true;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_KINGS_VOTE, this.voteCallBackHandler, this);
        NetManager.request(NetRequestConst.REQUEST_KINGS_VOTE, { activeId: BetheKingVoteScrollItem._ACVO.aidAndCode, fuid: this._uiData.uid });
    };
    BetheKingVoteScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    BetheKingVoteScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    BetheKingVoteScrollItem.prototype.dispose = function () {
        this._requsting = false;
        this._rowIdx = 0;
        this._uiData = null;
        this._voteBtn = null;
        this._titleTxt3 = null;
        _super.prototype.dispose.call(this);
    };
    return BetheKingVoteScrollItem;
}(ScrollListItem));
__reflect(BetheKingVoteScrollItem.prototype, "BetheKingVoteScrollItem");
