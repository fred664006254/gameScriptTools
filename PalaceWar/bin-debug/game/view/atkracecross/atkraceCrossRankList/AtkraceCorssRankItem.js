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
var AtkraceCorssRankItem = (function (_super) {
    __extends(AtkraceCorssRankItem, _super);
    function AtkraceCorssRankItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    AtkraceCorssRankItem.prototype.initItem = function (index, data) {
        this.width = 502;
        this.height = 52;
        this._data = data;
        if (index < 3) {
            var rankImg = BaseBitmap.create("rankinglist_rank" + String(index + 1));
            rankImg.x = 62 - rankImg.width / 2;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
        }
        else {
            // let rankImg = BaseBitmap.create("rankinglist_rankbg")
            // rankImg.x = 62-rankImg.width/2;
            // rankImg.y = this.height/2 - rankImg.height/2;
            // this.addChild(rankImg);
            var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
            rankTxt.text = String(index + 1);
            rankTxt.x = 62 - rankTxt.width / 2;
            rankTxt.y = this.height / 2 - rankTxt.height / 2;
            this.addChild(rankTxt);
        }
        var nameTxt = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameTxt.x = 220 - nameTxt.width / 2 - 40;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        this.addChild(nameTxt);
        var servername = Api.mergeServerVoApi.getAfterMergeSeverName(data.uid);
        var serverTxt = ComponentManager.getTextField(servername, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        serverTxt.x = 277; ////220 - nameTxt.width/2+90;
        serverTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(serverTxt);
        var scoreTxt = ComponentManager.getTextField(data.point, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        // if(Api.switchVoApi.checkOpenAtkracegChangegpoint())
        // {
        //     if(data.point <= -2000)
        //     {
        //          scoreTxt.text = data.point + LanguageManager.getlocal("acRank_FloorTip");
        //     }
        // }
        scoreTxt.x = 404 - scoreTxt.width / 2 + 20;
        scoreTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(scoreTxt);
        var lineImg = BaseBitmap.create("dinner_line");
        lineImg.x = 520 / 2 - lineImg.width / 2;
        lineImg.y = this.height;
        this.addChild(lineImg);
        if (Api.playerVoApi.getPlayerName() == data.name) {
            nameTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
            serverTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
            scoreTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        }
        this.addTouchTap(this.clickItemHandler, this, []);
    };
    AtkraceCorssRankItem.prototype.clickItemHandler = function (event) {
        this.showUserInfo();
    };
    AtkraceCorssRankItem.prototype.showUserInfo = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_USERSHOT), this.userShotCallback, this);
        NetManager.request(NetRequestConst.REQUEST_ATKRACE_USERSHOT, { ruid: this._data.uid });
    };
    AtkraceCorssRankItem.prototype.userShotCallback = function (event) {
        var data = event.data.data.data;
        // if(String(data.ruid) == this._chatData.sender)
        // {
        ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
        // }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_USERSHOT), this.userShotCallback, this);
    };
    AtkraceCorssRankItem.prototype.dispose = function () {
        var view = this;
        view.removeTouchTap();
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_USERSHOT), this.userShotCallback, this);
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        _super.prototype.dispose.call(this);
    };
    return AtkraceCorssRankItem;
}(ScrollListItem));
__reflect(AtkraceCorssRankItem.prototype, "AtkraceCorssRankItem");
//# sourceMappingURL=AtkraceCorssRankItem.js.map