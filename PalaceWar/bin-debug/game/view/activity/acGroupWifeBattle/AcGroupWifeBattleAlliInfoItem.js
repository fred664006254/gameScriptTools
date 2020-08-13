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
/**
 * author:qianjun---wxz
 * desc: 帮会信息item
*/
var AcGroupWifeBattleAlliInfoItem = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleAlliInfoItem, _super);
    function AcGroupWifeBattleAlliInfoItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    Object.defineProperty(AcGroupWifeBattleAlliInfoItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_GROUPWIFEBATTLE, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleAlliInfoItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_GROUPWIFEBATTLE, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleAlliInfoItem.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcGroupWifeBattleAlliInfoItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        this._data = data;
        this.width = 530;
        this.height = 45;
        this.code = itemparam;
        var title1Text = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleAlliRank-" + this.getUiCode()), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
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
        var scoreTxt = ComponentManager.getTextField(typeof data.score != 'undefined' ? data.score : LanguageManager.getlocal("acGroupWifeBattleOut-" + view.getUiCode()), 20);
        if (view.vo.isWaiting()) {
            scoreTxt.text = LanguageManager.getlocal("acGroupWifeBattleTip11-" + view.getUiCode());
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
    AcGroupWifeBattleAlliInfoItem.prototype.dispose = function () {
        var view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        _super.prototype.dispose.call(this);
    };
    return AcGroupWifeBattleAlliInfoItem;
}(ScrollListItem));
//# sourceMappingURL=AcGroupWifeBattleAlliInfoItem.js.map