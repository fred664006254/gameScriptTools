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
    AcBattleGroundAlliInfoItem.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcBattleGroundAlliInfoItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        this._data = data;
        this.width = 530;
        this.height = 45;
        this.code = itemparam;
        var title1Text = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundAlliRank-" + this.getUiCode()), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, title1Text, view, [10, 0]);
        var title2Text = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, title2Text, view);
        var title3Text = ComponentManager.getTextField(LanguageManager.getlocal("acPunish_score"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, title3Text, view, [25, 0]);
        var serverTxt = ComponentManager.getTextField(data.rank, 20);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, serverTxt, title1Text);
        view.addChild(serverTxt);
        var nameTxt = ComponentManager.getTextField(data.name, 20);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, title2Text);
        view.addChild(nameTxt);
        var scoreTxt = ComponentManager.getTextField(typeof data.score != 'undefined' ? data.score : LanguageManager.getlocal("acBattleRoundOut-" + view.getUiCode()), 20);
        if (view.vo.isWaiting()) {
            scoreTxt.text = LanguageManager.getlocal("acBattleGroundTip11-" + view.getUiCode());
        }
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scoreTxt, title3Text);
        view.addChild(scoreTxt);
        var lineImg = BaseBitmap.create("public_line1");
        lineImg.width = view.width;
        this.setLayoutPosition(LayoutConst.horizontalCenterbottom, lineImg, view);
        this.addChild(lineImg);
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
        // view.serverTxt = serverTxt;
        // view.nameTxt = nameTxt;
        // else if(Api.mergeServerVoApi.judgeIsSameServer(data.zid,Api.mergeServerVoApi.getTrueZid())){
        // 	serverTxt.textColor = nameTxt.textColor = TextFieldConst.COLOR_QUALITY_BLUE; 
        // }
    };
    AcBattleGroundAlliInfoItem.prototype.dispose = function () {
        var view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundAlliInfoItem;
}(ScrollListItem));
__reflect(AcBattleGroundAlliInfoItem.prototype, "AcBattleGroundAlliInfoItem");
//# sourceMappingURL=AcBattleGroundAlliInfoItem.js.map