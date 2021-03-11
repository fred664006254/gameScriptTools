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
var AcBattleHistoryARankScrollItem = (function (_super) {
    __extends(AcBattleHistoryARankScrollItem, _super);
    function AcBattleHistoryARankScrollItem() {
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
    AcBattleHistoryARankScrollItem.prototype.initItem = function (index, data, code) {
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
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        nameTxt.text = data.alliname;
        nameTxt.x = pos.x + (pos.width - nameTxt.width) / 2;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        this.addChild(nameTxt);
        pos = data.pos[1];
        var zidTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        zidTxt.text = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, Number(data.zid));
        zidTxt.x = pos.x + (pos.width - zidTxt.width) / 2;
        zidTxt.y = this.height / 2 - zidTxt.height / 2;
        this.addChild(zidTxt);
        pos = data.pos[2];
        var allinameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        allinameTxt.text = data.num1;
        allinameTxt.x = pos.x + (pos.width - allinameTxt.width) / 2;
        allinameTxt.y = this.height / 2 - allinameTxt.height / 2;
        ;
        this.addChild(allinameTxt);
        pos = data.pos[3];
        var scoreTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        scoreTxt.text = data.status == 3 ? LanguageManager.getlocal("battlestaut" + data.status) : data.num2;
        scoreTxt.x = pos.x + (pos.width - scoreTxt.width) / 2;
        scoreTxt.y = this.height / 2 - scoreTxt.height / 2;
        this.addChild(scoreTxt);
        if (data.status == 3) {
            this.alpha = 0.5;
        }
    };
    Object.defineProperty(AcBattleHistoryARankScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_BATTLEGROUND, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleHistoryARankScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEGROUND, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcBattleHistoryARankScrollItem.prototype.getSpaceY = function () {
        return -5;
    };
    AcBattleHistoryARankScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    AcBattleHistoryARankScrollItem.prototype.userShotCallback = function (event) {
        var data = event.data.data.data;
        if (String(data.ruid) == this._data.uid) {
            if (event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT) {
                data["crossZone"] = 1;
                data['zid'] = Api.mergeServerVoApi.getTrueZid(this._data.uid);
            }
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
        }
    };
    AcBattleHistoryARankScrollItem.prototype.dispose = function () {
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
    return AcBattleHistoryARankScrollItem;
}(ScrollListItem));
__reflect(AcBattleHistoryARankScrollItem.prototype, "AcBattleHistoryARankScrollItem");
//# sourceMappingURL=AcBattleHistoryARankScrollItem.js.map