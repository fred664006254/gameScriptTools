/** 绝地擂台   帮会列表
 * anthor
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
var AcBattleHistoryPRankScrollItem = (function (_super) {
    __extends(AcBattleHistoryPRankScrollItem, _super);
    function AcBattleHistoryPRankScrollItem() {
        var _this = _super.call(this) || this;
        // 标题文本
        _this.titleText = null;
        //标题背景
        _this.titleBg = null;
        //内容背景
        _this.descBg = null;
        //内容图片
        _this.descImg = null;
        //内容购买按钮
        _this.descBtn = null;
        //内容时间文本
        _this.descTimeText = null;
        //数据
        _this._data = null;
        _this._itemIndex = null;
        _this._code = null;
        _this.need = 0;
        return _this;
    }
    AcBattleHistoryPRankScrollItem.prototype.initItem = function (index, data, code) {
        this.width = 640;
        this.height = 37;
        this._data = data;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
        this._code = code;
        var nameStr = "battlelistbg1";
        if (index % 2 == 0) {
            nameStr = 'battlelistbg2';
        }
        var bit = BaseBitmap.create(nameStr);
        bit.width = this.width;
        this.addChild(bit);
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            var bit2 = BaseBitmap.create("battlelisttouch");
            bit2.width = this.width;
            this.addChild(bit2);
        }
        //index 排名
        var tarColor = null;
        switch (data.status) {
            case 1:
                tarColor = TextFieldConst.COLOR_WARN_GREEN2;
                break;
            case 2:
                tarColor = TextFieldConst.COLOR_WARN_RED2;
                break;
            case 3:
                tarColor = TextFieldConst.COLOR_BLACK;
                break;
        }
        var pos = data.pos[0];
        var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        rankTxt.text = data.rankindex + data.myrank;
        rankTxt.x = pos.x + (pos.width - rankTxt.width) / 2;
        rankTxt.y = this.height / 2 - rankTxt.height / 2;
        this.addChild(rankTxt);
        pos = data.pos[1];
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        nameTxt.text = data.name;
        nameTxt.x = pos.x + (pos.width - nameTxt.width) / 2;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(nameTxt);
        pos = data.pos[2];
        var allinameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        allinameTxt.text = data.alliname;
        allinameTxt.x = pos.x + (pos.width - allinameTxt.width) / 2;
        allinameTxt.y = this.height / 2 - allinameTxt.height / 2;
        ;
        this.addChild(allinameTxt);
        pos = data.pos[3];
        var scoreTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        scoreTxt.text = data.status == 3 ? LanguageManager.getlocal("battlestaut" + data.status) : data.value;
        scoreTxt.x = pos.x + (pos.width - scoreTxt.width) / 2;
        scoreTxt.y = this.height / 2 - scoreTxt.height / 2;
        this.addChild(scoreTxt);
        pos = data.pos[4];
        var statusTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        statusTxt.text = LanguageManager.getlocal("battlestaut" + data.status);
        statusTxt.x = pos.x + (pos.width - statusTxt.width) / 2;
        statusTxt.y = this.height / 2 - statusTxt.height / 2;
        this.addChild(statusTxt);
        if (data.status == 3) {
            this.alpha = 0.5;
        }
    };
    Object.defineProperty(AcBattleHistoryPRankScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_BATTLEGROUND, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleHistoryPRankScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEGROUND, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcBattleHistoryPRankScrollItem.prototype.getSpaceY = function () {
        return -5;
    };
    AcBattleHistoryPRankScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    AcBattleHistoryPRankScrollItem.prototype.userShotCallback = function (event) {
        var data = event.data.data.data;
        if (String(data.ruid) == this._data.uid) {
            if (event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT) {
                data["crossZone"] = 1;
                data['zid'] = Api.mergeServerVoApi.getTrueZid(this._data.uid);
            }
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
        }
    };
    AcBattleHistoryPRankScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
        this.titleText = null;
        //标题背景
        this.titleBg = null;
        //内容背景
        this.descBg = null;
        //内容图片
        this.descImg = null;
        //内容购买按钮
        this.descBtn = null;
        //内容时间文本
        this.descTimeText = null;
        //数据
        this._data = null;
        this._itemIndex = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattleHistoryPRankScrollItem;
}(ScrollListItem));
__reflect(AcBattleHistoryPRankScrollItem.prototype, "AcBattleHistoryPRankScrollItem");
//# sourceMappingURL=AcBattleHistoryPRankScrollItem.js.map