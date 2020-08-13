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
 * desc:门客擂台奖励item
*/
var AcCrossServerServantRewardItem = (function (_super) {
    __extends(AcCrossServerServantRewardItem, _super);
    function AcCrossServerServantRewardItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        return _this;
    }
    Object.defineProperty(AcCrossServerServantRewardItem.prototype, "api", {
        get: function () {
            return Api.crossServerServantVoApi;
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerServantRewardItem.prototype.initItem = function (index, data) {
        var type = data.type;
        var view = this;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        view._data = data;
        view.width = 512;
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = view.width;
        if (data.type == 'prank') {
            view.height = (index == 0 ? 250 : 140) + 10;
            bg.height = view.height - 10;
        }
        else {
            view.height = 160 + 10;
            bg.height = view.height - 10;
        }
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view);
        view.addChild(bg);
        var rankbg = BaseBitmap.create(data.type == 'prank' ? "crossservantrankbg" : (index == 0 ? 'crossservantwinbg' : 'crossservantlosebg'));
        rankbg.width = 140;
        if (PlatformManager.checkIsEnLang() && data.type != 'prank') {
            rankbg.setRes("crossservantrankbg");
            rankbg.width = 240;
        }
        view.setLayoutPosition(LayoutConst.horizontalCentertop, rankbg, bg, [0, 10]);
        view.addChild(rankbg);
        var rankTxt = ComponentManager.getTextField('', 20);
        if (data.type == 'prank') {
            if (Number(index) < 3) {
                rankTxt.text = LanguageManager.getlocal("acRank_rank" + (index + 1));
            }
            else {
                rankTxt.text = LanguageManager.getlocal("acRank_rank4", [String(data.rewards.minRank), String(data.rewards.maxRank)]);
            }
        }
        else {
            rankTxt.text = LanguageManager.getlocal("crossservantWinserver" + (index + 1));
        }
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rankTxt, rankbg);
        view.addChild(rankTxt);
        var rIcons = data.type == 'prank' ? data.rewards.rewardIcons : GameData.getRewardItemIcons((index == 0 ? view.api.cfg.winServer : view.api.cfg.loseServer), true, true);
        var scroStartY = rankbg.y + rankbg.height * 0.7 + 20;
        //奖励物品
        var tmpX = (view.width - rIcons.length * rIcons[0].width * 0.7 - 4 * 8) / 2;
        var maxY = 0;
        for (var index_1 = 0; index_1 < rIcons.length; index_1++) {
            var element = rIcons[index_1];
            element.scaleX = element.scaleY = 0.7;
            element.x = tmpX;
            element.y = scroStartY;
            tmpX += (element.width * element.scaleX + 8);
            //换行处理
            if (tmpX >= view.width) {
                tmpX = (view.width - 5 * rIcons[0].width * 0.7 - 4 * 8) / 2;
                ;
                scroStartY += element.height * 0.7 + 15;
                element.x = tmpX;
                element.y = scroStartY;
                tmpX += (element.width * 0.7 + 8);
            }
            maxY = element.y;
            view.addChild(element);
        }
        if (data.type == 'prank' && index == 0) {
            var line = BaseBitmap.create("public_line3");
            line.width = 430;
            view.setLayoutPosition(LayoutConst.horizontalCentertop, line, bg, [0, maxY + rIcons[0].height * 0.7 + 15]);
            view.addChild(line);
            var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal('crossservantReawrdSkinTitle', [Config.ServantCfg.getServantItemById(view.api.getVsServant(1)).name, Config.ServantCfg.getServantItemById(view.api.getVsServant(2)).name]), 20, TextFieldConst.COLOR_BLACK);
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, titleTxt, line);
            view.addChild(titleTxt);
            var descbg = BaseBitmap.create("crossservantawardbbg");
            descbg.height = 69;
            descbg.width = 470;
            view.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, titleTxt, [0, titleTxt.textHeight + 5]);
            view.addChild(descbg);
            var cfg1 = Config.ServantskinCfg.getServantSkinItemById(view.api.getVsServantSkin(1));
            var cfg2 = Config.ServantskinCfg.getServantSkinItemById(view.api.getVsServantSkin(2));
            var servantVo1 = Api.servantVoApi.getServantObj(cfg1.servantId);
            var servantVo2 = Api.servantVoApi.getServantObj(cfg2.servantId);
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal('crossServerServantTip2', [cfg1.getSkinName(), cfg2.getSkinName(), servantVo1.servantName, servantVo2.servantName]), 20);
            tipTxt.lineSpacing = 5;
            tipTxt.textAlign = egret.HorizontalAlign.CENTER;
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, descbg);
            view.addChild(tipTxt);
        }
    };
    AcCrossServerServantRewardItem.prototype.dispose = function () {
        var view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerServantRewardItem;
}(ScrollListItem));
__reflect(AcCrossServerServantRewardItem.prototype, "AcCrossServerServantRewardItem");
//# sourceMappingURL=AcCrossServerServantRewardItem.js.map