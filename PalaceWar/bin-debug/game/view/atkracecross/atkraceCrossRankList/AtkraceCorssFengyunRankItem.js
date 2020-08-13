var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AtkraceCorssFengyunRankItem = /** @class */ (function (_super) {
    __extends(AtkraceCorssFengyunRankItem, _super);
    function AtkraceCorssFengyunRankItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    AtkraceCorssFengyunRankItem.prototype.initItem = function (index, data) {
        this.width = 520;
        this.height = 75;
        this._data = data;
        if (index < 3) {
            var rankbg = BaseBitmap.create("rankbgs_" + String(index + 1));
            rankbg.width = 520;
            rankbg.height = 75;
            this.addChild(rankbg);
            var rankImg = BaseBitmap.create("rankinglist_rankn" + String(index + 1));
            rankImg.x = 62 - rankImg.width / 2;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
        }
        else {
            var rankbg = BaseBitmap.create("rankbgs_4");
            rankbg.width = 520;
            rankbg.height = 75;
            this.addChild(rankbg);
            var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
            rankTxt.text = String(index + 1);
            rankTxt.x = 62 - rankTxt.width / 2;
            rankTxt.y = this.height / 2 - rankTxt.height / 2;
            this.addChild(rankTxt);
        }
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (data.uid) {
            if (data.uid == Api.playerVoApi.getPlayerID()) {
                tarColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }
        var nameTxt = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        nameTxt.x = 220 - nameTxt.width / 2 - 40;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        this.addChild(nameTxt);
        var servername = Api.mergeServerVoApi.getAfterMergeSeverName(data.uid);
        var serverTxt = ComponentManager.getTextField(servername, TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        serverTxt.x = 277; ////220 - nameTxt.width/2+90;
        serverTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(serverTxt);
        var scoreTxt = ComponentManager.getTextField(data.point, TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
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
        var lineImg = BaseBitmap.create("rank_line");
        lineImg.x = 520 / 2 - lineImg.width / 2;
        lineImg.y = this.height;
        this.addChild(lineImg);
        // if(Api.playerVoApi.getPlayerName()==data.name)
        // {
        //     nameTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        //     serverTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        //     scoreTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW; 
        // } 
        this.addTouchTap(this.clickItemHandler, this, []);
    };
    AtkraceCorssFengyunRankItem.prototype.clickItemHandler = function (event) {
        this.showUserInfo();
    };
    AtkraceCorssFengyunRankItem.prototype.showUserInfo = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_USERSHOT), this.userShotCallback, this);
        NetManager.request(NetRequestConst.REQUEST_ATKRACE_USERSHOT, { ruid: this._data.uid });
    };
    AtkraceCorssFengyunRankItem.prototype.userShotCallback = function (event) {
        var data = event.data.data.data;
        // if(String(data.ruid) == this._chatData.sender)
        // {
        ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
        // }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_USERSHOT), this.userShotCallback, this);
    };
    AtkraceCorssFengyunRankItem.prototype.dispose = function () {
        var view = this;
        view.removeTouchTap();
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_USERSHOT), this.userShotCallback, this);
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        _super.prototype.dispose.call(this);
    };
    return AtkraceCorssFengyunRankItem;
}(ScrollListItem));
//# sourceMappingURL=AtkraceCorssFengyunRankItem.js.map