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
var AcThreeKingdomsCityWarPrankItem = (function (_super) {
    __extends(AcThreeKingdomsCityWarPrankItem, _super);
    function AcThreeKingdomsCityWarPrankItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    AcThreeKingdomsCityWarPrankItem.prototype.initItem = function (index, data, itemparam) {
        this._data = data;
        var tarColor = TextFieldConst.COLOR_BROWN;
        var rankbg;
        this.width = 610;
        this.height = 80;
        rankbg = BaseBitmap.create("threekingdomsranklistbg");
        rankbg.width = 610;
        rankbg.height = 80;
        rankbg.x = 0;
        rankbg.y = 0;
        this.addChild(rankbg);
        // let shuiyin = BaseBitmap.create(`threekingdomspranklistshuiyin${data.kingdom}`);
        // this.addChild(shuiyin);
        // shuiyin.setScale(index < 3 ? 1 : 0.8)
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            tarColor = 0xa77c38;
        }
        //42 115 275 400 475
        if (index < 3) {
            var rankImg = BaseBitmap.create("threekingdomsprank" + String(index + 1));
            rankImg.x = 27 + (40 / 2 - rankImg.width / 2);
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
        }
        else {
            this.height = rankbg.height = 66;
            var rankTxt = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
            rankTxt.text = String(index + 1);
            rankTxt.x = 27 + (40 / 2 - rankTxt.width / 2);
            rankTxt.y = this.height / 2 - rankTxt.height / 2;
            this.addChild(rankTxt);
        }
        // App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, shuiyin, rankbg);
        var nameTxt = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        nameTxt.x = 100 + (80 / 2 - nameTxt.width / 2);
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        this.addChild(nameTxt);
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            // let flag = BaseBitmap.create(`threekingdomsrankmyflag`);
            // this.addChild(flag);
            // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, flag, rankbg);
        }
        if (data.title && data.title.title && data.title.title != "") {
            var officerImg = App.CommonUtil.getTitlePic(data.title);
            var deltaV = 0.8;
            officerImg.setScale(deltaV);
            officerImg.x = 260 + (80 / 2 - officerImg.width * deltaV / 2);
            officerImg.y = nameTxt.y + nameTxt.height / 2 - officerImg.height * officerImg.scaleY / 2;
            this.addChild(officerImg);
        }
        else {
            var officerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
            officerTxt.text = LanguageManager.getlocal("officialTitle" + data.level);
            officerTxt.x = 260 + (80 / 2 - officerTxt.width / 2);
            officerTxt.y = nameTxt.y;
            this.addChild(officerTxt);
        }
        var server = "";
        if (Api.mergeServerVoApi.getQuByZid(data.zid) > 0) {
            // server = LanguageManager.getlocal("mergeServer",[String(data.qu),String(data.zid)]);
            server = LanguageManager.getlocal("mergeServerOnlyqu", [String(Api.mergeServerVoApi.getQuByZid(data.zid))]);
        }
        else {
            // "ranserver2":"{1}服",
            server = LanguageManager.getlocal("ranserver2", [String(data.zid)]);
        }
        var serverTxt = ComponentManager.getTextField(server, TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        serverTxt.x = 385 + (40 / 2 - serverTxt.width / 2);
        serverTxt.y = nameTxt.y;
        this.addChild(serverTxt);
        var scoreTxt = ComponentManager.getTextField(App.StringUtil.changeIntToText(data.value), TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        scoreTxt.x = 460 + (80 / 2 - scoreTxt.width / 2);
        scoreTxt.y = nameTxt.y;
        this.addChild(scoreTxt);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
        this.addTouchTap(function () {
            NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT, {
                ruid: data.uid,
                rzid: Api.mergeServerVoApi.getTrueZid(data.uid)
            });
        }, this);
    };
    AcThreeKingdomsCityWarPrankItem.prototype.userShotCallback = function (event) {
        var data = event.data.data.data;
        if (String(data.ruid) == this._data.uid) {
            if (event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT) {
                data["crossZone"] = 1;
                data['zid'] = Api.mergeServerVoApi.getTrueZid(this._data.uid);
            }
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
        }
    };
    AcThreeKingdomsCityWarPrankItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
        this._data = null;
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsCityWarPrankItem;
}(ScrollListItem));
__reflect(AcThreeKingdomsCityWarPrankItem.prototype, "AcThreeKingdomsCityWarPrankItem");
//# sourceMappingURL=AcThreeKingdomsCityWarPrankItem.js.map