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
 * author:qianjun
 * desc: 帮会信息item
*/
var AcBattleGroundAlliInfoItem = (function (_super) {
    __extends(AcBattleGroundAlliInfoItem, _super);
    function AcBattleGroundAlliInfoItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    Object.defineProperty(AcBattleGroundAlliInfoItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEGROUND, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundAlliInfoItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_BATTLEGROUND, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundAlliInfoItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        this._data = data;
        this.width = 530;
        this.height = 45;
        this.code = itemparam;
        if (index % 2 == 1) {
            var bg = BaseBitmap.create("public_tc_bg05");
            bg.width = 510;
            bg.height = 40;
            bg.x = this.width / 2 - bg.width / 2;
            ;
            bg.y = this.height / 2 - bg.height / 2;
            this.addChild(bg);
        }
        var serverTxt = ComponentManager.getTextField(data.rank, 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, serverTxt, view, [70, 0]);
        view.addChild(serverTxt);
        var nameTxt = ComponentManager.getTextField(data.name, 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, view, [-5, 0]);
        view.addChild(nameTxt);
        var scoreTxt = ComponentManager.getTextField(data.score ? data.score : LanguageManager.getlocal(this.getDefaultCn("acBattleRoundOut")), 20);
        if (view.vo.isWaiting()) {
            scoreTxt.text = LanguageManager.getlocal(this.getDefaultCn("acBattleGroundTip11"));
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, scoreTxt, view, [70, 0]);
        view.addChild(scoreTxt);
        // let lineImg = BaseBitmap.create("public_line1");
        // lineImg.width = view.width;
        // this.setLayoutPosition(LayoutConst.horizontalCenterbottom, lineImg, view);
        // this.addChild(lineImg);
        //个人是否淘汰
        var need = view.vo.getCurperiod() == 2 ? view.cfg.weedOut[view.vo.getCurRound() - 1].btmLine : 99999;
        var color = null;
        if (view.vo.isWaiting()) {
            color = TextFieldConst.COLOR_QUALITY_WHITE;
        }
        else {
            if (data.alive) {
                color = Number(data.rank) <= need ? TextFieldConst.COLOR_WARN_GREEN : TextFieldConst.COLOR_WARN_RED3;
            }
            else {
                color = TextFieldConst.COLOR_QUALITY_GRAY;
            }
        }
        serverTxt.textColor = nameTxt.textColor = scoreTxt.textColor = color;
    };
    AcBattleGroundAlliInfoItem.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this.code)) {
            return cnName + "-" + this.code;
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    AcBattleGroundAlliInfoItem.prototype.dispose = function () {
        var view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundAlliInfoItem;
}(ScrollListItem));
__reflect(AcBattleGroundAlliInfoItem.prototype, "AcBattleGroundAlliInfoItem");
