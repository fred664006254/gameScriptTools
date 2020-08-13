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
//
var AcWipeBossRewardViewTab3 = (function (_super) {
    __extends(AcWipeBossRewardViewTab3, _super);
    function AcWipeBossRewardViewTab3(param) {
        var _this = _super.call(this) || this;
        _this._nodeContainer = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcWipeBossRewardViewTab3.prototype, "api", {
        get: function () {
            return Api.wipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossRewardViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossRewardViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWipeBossRewardViewTab3.prototype.getListType = function () {
        return 3;
    };
    AcWipeBossRewardViewTab3.prototype.initView = function () {
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        var view = this;
        view._nodeContainer = new BaseDisplayObjectContainer();
        // this.addChild(this._nodeContainer);
        var str = '';
        var rankList = view.vo.getArr('foe');
        rankList.reverse();
        var tmpX = 20;
        var scroStartY = 3;
        for (var index = 0; index < rankList.length; index++) {
            var id = index;
            var rItem = rankList[index];
            var key = rItem.id;
            var winBottomBg = BaseBitmap.create("public_9_bg23");
            winBottomBg.width = 628;
            winBottomBg.y = scroStartY;
            winBottomBg.x = 6;
            this._nodeContainer.addChild(winBottomBg);
            var winbg = BaseBitmap.create("atkracecross_rewatdbg3");
            winbg.y = scroStartY;
            winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
            this._nodeContainer.addChild(winbg);
            var line1 = BaseBitmap.create("public_line3");
            line1.width = 480;
            line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
            line1.y = winbg.y + winbg.height / 2 - line1.height / 2;
            this._nodeContainer.addChild(line1);
            var rIcons1 = rItem.reward1Icons;
            var rank = rItem.rank;
            var txt = ComponentManager.getTextField(rItem.type == 1 ? rItem.npcName : "acwipeBossKillBox" + (key - 7), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
            txt.x = GameConfig.stageWidth / 2 - txt.width / 2;
            txt.y = winbg.y + winbg.height / 2 - txt.height / 2;
            this._nodeContainer.addChild(txt);
            var alltxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossKillBasicReward'), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
            alltxt.x = 20;
            alltxt.y = winbg.y + winbg.height + 10;
            view._nodeContainer.addChild(alltxt);
            var len = rIcons1.length;
            var startY = alltxt.y + alltxt.textHeight + 10;
            tmpX = 20;
            scroStartY = startY;
            var scoreBg = BaseBitmap.create('itembg_7');
            // npcBg.setScale(106/194);
            scoreBg.width = 106;
            scoreBg.height = 106;
            scoreBg.x = tmpX;
            scoreBg.y = scroStartY;
            view._nodeContainer.addChild(scoreBg);
            var scoreImg = BaseBitmap.create("wipescore2icon");
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scoreImg, scoreBg);
            view._nodeContainer.addChild(scoreImg);
            var numbg2 = BaseBitmap.create("public_9_itemnumbg");
            var scoretxt = ComponentManager.getTextField(rItem.killScore, 16, TextFieldConst.COLOR_QUALITY_WHITE);
            numbg2.name = "numbg";
            if (rItem.killScore > 99) {
                numbg2.width = scoretxt.width + 18;
            }
            numbg2.setPosition(scoreBg.x + scoreBg.width - numbg2.width - 4, scoreBg.y + scoreBg.height - numbg2.height - 4);
            view._nodeContainer.addChild(numbg2);
            var temScale = 1 / 0.74;
            var effectClip = ComponentManager.getCustomMovieClip("itemeffect", 10, 100);
            effectClip.x = scoreImg.x + 50 - 198 * temScale / 2;
            effectClip.y = scoreImg.y + 52 - 197 * temScale / 2;
            view._nodeContainer.addChild(effectClip);
            effectClip.scaleX = effectClip.scaleY = temScale;
            effectClip.playWithTime(-1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, scoretxt, scoreBg);
            view._nodeContainer.addChild(scoretxt);
            scoretxt.setPosition(scoreImg.x + scoreImg.width - scoretxt.width - 12, numbg2.y + numbg2.height / 2 - scoretxt.height / 2);
            var scoreBg2 = BaseBitmap.create('itembg_7');
            // npcBg.setScale(106/194);
            scoreBg2.width = 106;
            scoreBg2.height = 106;
            scoreBg2.x = scoreBg.x + scoreBg.width + 15;
            scoreBg2.y = scroStartY;
            view._nodeContainer.addChild(scoreBg2);
            var scoreImg2 = BaseBitmap.create("wipescore1icon");
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scoreImg2, scoreBg2);
            view._nodeContainer.addChild(scoreImg2);
            var numbg = BaseBitmap.create("public_9_itemnumbg");
            numbg.name = "numbg";
            numbg.width = 55;
            numbg.setPosition(scoreBg2.x + scoreBg2.width - numbg.width - 4, scoreBg2.y + scoreBg2.height - numbg.height - 4);
            view._nodeContainer.addChild(numbg);
            var effectClip2 = ComponentManager.getCustomMovieClip("itemeffect", 10, 100);
            effectClip2.x = scoreImg2.x + 50 - 198 * temScale / 2;
            effectClip2.y = scoreImg2.y + 52 - 197 * temScale / 2;
            view._nodeContainer.addChild(effectClip2);
            effectClip2.scaleX = effectClip2.scaleY = temScale;
            effectClip2.playWithTime(-1);
            var scoretxt2 = ComponentManager.getTextField(rItem.killScore, 16, TextFieldConst.COLOR_QUALITY_WHITE);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, scoretxt2, scoreBg2);
            view._nodeContainer.addChild(scoretxt2);
            scoretxt2.setPosition(scoreImg2.x + scoreImg2.width - scoretxt2.width - 12, numbg.y + numbg.height / 2 - scoretxt2.height / 2);
            var ordtxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossKillPoolReward'), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
            ordtxt.x = 20;
            ordtxt.y = scroStartY + scoreImg.height + 13;
            view._nodeContainer.addChild(ordtxt);
            var rIcons2 = rItem.reward2Icons;
            var len2 = rIcons2.length;
            scroStartY = ordtxt.y + ordtxt.textHeight + 10;
            tmpX = 20;
            for (var innerIdx = 0; innerIdx < len2; innerIdx++) {
                var element = rIcons2[innerIdx];
                element.x = tmpX;
                element.y = scroStartY;
                tmpX += (element.width + 15);
                if (tmpX >= GameConfig.stageWidth) {
                    tmpX = 20;
                    scroStartY += (element.height + 15);
                    element.x = tmpX;
                    element.y = scroStartY;
                    tmpX += (element.width + 15);
                }
                this._nodeContainer.addChild(element);
            }
            scroStartY += 130;
            winBottomBg.height = scroStartY - winBottomBg.y - 10;
        }
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 150);
        var scrollView = ComponentManager.getScrollView(this._nodeContainer, rect);
        scrollView.y = -3;
        scrollView.horizontalScrollPolicy = "off";
        this.addChild(scrollView);
    };
    AcWipeBossRewardViewTab3.prototype.getCountTimeStr = function (time) {
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    AcWipeBossRewardViewTab3.prototype.dispose = function () {
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcWipeBossRewardViewTab3;
}(CommonViewTab));
__reflect(AcWipeBossRewardViewTab3.prototype, "AcWipeBossRewardViewTab3");
//# sourceMappingURL=AcWipeBossRewardViewTab3.js.map