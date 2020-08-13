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
var AcBattleRank2ScrollItem = (function (_super) {
    __extends(AcBattleRank2ScrollItem, _super);
    function AcBattleRank2ScrollItem() {
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
    AcBattleRank2ScrollItem.prototype.initItem = function (index, data, code) {
        this.width = 626;
        this._data = data;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
        this._code = code;
        var nameStr = "battlelistbg1";
        if (index % 2 == 0) {
            nameStr = 'battlelistbg2';
        }
        var bit = BaseBitmap.create(nameStr);
        bit.width = 620;
        bit.x = -5;
        this.addChild(bit);
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            var bit2 = BaseBitmap.create("battlelisttouch");
            bit2.x = -5;
            this.addChild(bit2);
        }
        //index 排名
        var rankNum = data.myrank; //index+1;
        var renkDesc = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x3e1f0f);
        renkDesc.text = rankNum + "";
        renkDesc.y = bit.y + bit.height / 2 - renkDesc.height / 2;
        // renkDesc.x =40;
        renkDesc.x = 5;
        renkDesc.width = 70;
        renkDesc.textAlign = TextFieldConst.ALIGH_CENTER;
        this.addChild(renkDesc);
        //成员名称 
        var nameDesc = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x3e1f0f);
        nameDesc.text = data.name;
        nameDesc.y = renkDesc.y;
        // nameDesc.x = 183;
        nameDesc.y = renkDesc.y;
        nameDesc.width = 150;
        nameDesc.x = 140;
        nameDesc.textAlign = TextFieldConst.ALIGH_CENTER;
        this.addChild(nameDesc);
        //职位
        var teliminateDesc = ComponentManager.getTextField(LanguageManager.getlocal("allianceMemberPo" + data.po), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x3e1f0f);
        teliminateDesc.y = renkDesc.y;
        teliminateDesc.x = 388;
        this.addChild(teliminateDesc);
        //分数
        var scoreDesc = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x3e1f0f);
        scoreDesc.y = renkDesc.y;
        scoreDesc.x = 500;
        scoreDesc.width = 100;
        scoreDesc.textAlign = TextFieldConst.ALIGH_CENTER;
        scoreDesc.text = (data.value ? data.value : (data.alive ? 0 : (LanguageManager.getlocal("acBattleRoundOut-1")))) + "";
        this.addChild(scoreDesc);
        if (this.vo.getCurRound() != 0) {
            var need = this.cfg.weedOut[this.vo.getCurRound() - 1].btmLine;
            this.need = need;
        }
        if (data.myrank > this.need) {
            scoreDesc.textColor = TextFieldConst.COLOR_WARN_RED2;
            if (!data.alive || data.alive == 0) {
                scoreDesc.textColor = 0xaa825e;
            }
        }
        else {
            scoreDesc.textColor = TextFieldConst.COLOR_WARN_GREEN2;
        }
        teliminateDesc.textColor = scoreDesc.textColor;
        nameDesc.textColor = scoreDesc.textColor;
        renkDesc.textColor = scoreDesc.textColor;
        this.addTouchTap(function () {
            NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT, {
                ruid: data.uid,
                rzid: Api.mergeServerVoApi.getTrueZid(data.uid)
            });
        }, this);
        // if(!data.alive)
        // {
        // 	scoreDesc.alpha = 0.7; 
        // 	teliminateDesc.alpha =scoreDesc.alpha;
        // 	nameDesc.alpha =scoreDesc.alpha;
        // 	renkDesc.alpha =scoreDesc.alpha;
        // }
    };
    Object.defineProperty(AcBattleRank2ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_BATTLEGROUND, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleRank2ScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEGROUND, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcBattleRank2ScrollItem.prototype.getSpaceY = function () {
        return -5;
    };
    AcBattleRank2ScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    AcBattleRank2ScrollItem.prototype.userShotCallback = function (event) {
        var data = event.data.data.data;
        if (String(data.ruid) == this._data.uid) {
            if (event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT) {
                data["crossZone"] = 1;
                data['zid'] = Api.mergeServerVoApi.getTrueZid(this._data.uid);
            }
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
        }
    };
    AcBattleRank2ScrollItem.prototype.dispose = function () {
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
    return AcBattleRank2ScrollItem;
}(ScrollListItem));
__reflect(AcBattleRank2ScrollItem.prototype, "AcBattleRank2ScrollItem");
//# sourceMappingURL=AcBattleRank2ScrollItem.js.map