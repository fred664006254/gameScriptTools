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
var AcLocTombRewardViewTab3 = (function (_super) {
    __extends(AcLocTombRewardViewTab3, _super);
    function AcLocTombRewardViewTab3(param) {
        var _this = _super.call(this) || this;
        _this._nodeContainer = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcLocTombRewardViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombRewardViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombRewardViewTab3.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombRewardViewTab3.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombRewardViewTab3.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLocTombRewardViewTab3.prototype.getListType = function () {
        return 3;
    };
    AcLocTombRewardViewTab3.prototype.initView = function () {
        var view = this;
        view._nodeContainer = new BaseDisplayObjectContainer();
        var str = '';
        var rankList = view.vo.getArr('foe');
        rankList.sort(function (a, b) {
            if (a.type == b.type) {
                return b.id - a.id;
            }
            else {
                return a.type - b.type;
            }
        });
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
            var winbg = BaseBitmap.create("tombrewardrankbg-" + view.code);
            winbg.y = scroStartY;
            winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
            this._nodeContainer.addChild(winbg);
            var line1 = BaseBitmap.create("public_line3");
            line1.width = 480;
            line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
            line1.y = winbg.y + winbg.height / 2 - line1.height / 2;
            this._nodeContainer.addChild(line1);
            var rIcons1 = rItem.reward1Icons;
            var txt = ComponentManager.getTextField(rItem.getnpcName(view.code), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
            txt.x = GameConfig.stageWidth / 2 - txt.width / 2;
            txt.y = winbg.y + winbg.height / 2 - txt.height / 2;
            this._nodeContainer.addChild(txt);
            if (rItem.type == 1) {
                var descbg = BaseBitmap.create('aobaidescnamebg');
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, winbg, [0, winbg.height + 10]);
                view._nodeContainer.addChild(descbg);
                var alltxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossKillBasicReward'), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, alltxt, descbg);
                view._nodeContainer.addChild(alltxt);
                var len = rIcons1.length;
                var startY = alltxt.y + alltxt.textHeight + 20;
                tmpX = 20;
                scroStartY = startY;
                var scoreBg = BaseBitmap.create('itembg_1');
                // npcBg.setScale(106/194);
                scoreBg.width = 106;
                scoreBg.height = 106;
                scoreBg.x = tmpX;
                scoreBg.y = scroStartY;
                view._nodeContainer.addChild(scoreBg);
                var scoreImg = BaseBitmap.create("wipescore2icon");
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scoreImg, scoreBg);
                view._nodeContainer.addChild(scoreImg);
                var temScale = 1 / 0.74;
                var effectClip = ComponentManager.getCustomMovieClip("itemeffect", 10, 100);
                effectClip.x = scoreImg.x + 50 - 198 * temScale / 2;
                effectClip.y = scoreImg.y + 52 - 197 * temScale / 2;
                view._nodeContainer.addChild(effectClip);
                effectClip.scaleX = effectClip.scaleY = temScale;
                effectClip.playWithTime(-1);
                var scoretxt = ComponentManager.getTextField(rItem.killScore.toString(), 24, TextFieldConst.COLOR_QUALITY_WHITE);
                App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, scoretxt, scoreBg);
                view._nodeContainer.addChild(scoretxt);
                var scoreBg2 = BaseBitmap.create('itembg_1');
                // npcBg.setScale(106/194);
                scoreBg2.width = 106;
                scoreBg2.height = 106;
                scoreBg2.x = scoreBg.x + scoreBg.width + 15;
                scoreBg2.y = scroStartY;
                view._nodeContainer.addChild(scoreBg2);
                var scoreImg2 = BaseBitmap.create("wipescore1icon");
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scoreImg2, scoreBg2);
                view._nodeContainer.addChild(scoreImg2);
                var effectClip2 = ComponentManager.getCustomMovieClip("itemeffect", 10, 100);
                effectClip2.x = scoreImg2.x + 50 - 198 * temScale / 2;
                effectClip2.y = scoreImg2.y + 52 - 197 * temScale / 2;
                view._nodeContainer.addChild(effectClip2);
                effectClip2.scaleX = effectClip2.scaleY = temScale;
                effectClip2.playWithTime(-1);
                var scoretxt2 = ComponentManager.getTextField(rItem.killScore.toString(), 24, TextFieldConst.COLOR_QUALITY_WHITE);
                App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, scoretxt2, scoreBg2);
                view._nodeContainer.addChild(scoretxt2);
            }
            var descbg2 = BaseBitmap.create('aobaidescnamebg');
            descbg2.y = scroStartY + (rItem.type == 1 ? 123 : 75);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, descbg2, winbg);
            view._nodeContainer.addChild(descbg2);
            var ordtxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossKillPoolReward'), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, ordtxt, descbg2);
            view._nodeContainer.addChild(ordtxt);
            var rIcons2 = rItem.reward2Icons;
            var len2 = rIcons2.length;
            scroStartY = ordtxt.y + ordtxt.textHeight + 20;
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
            this._nodeContainer.height = winBottomBg.y + winBottomBg.height;
        }
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 150);
        var scrollView = ComponentManager.getScrollView(this._nodeContainer, rect);
        scrollView.y = -3;
        scrollView.horizontalScrollPolicy = "off";
        this.addChild(scrollView);
    };
    AcLocTombRewardViewTab3.prototype.getCountTimeStr = function (time) {
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    AcLocTombRewardViewTab3.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcLocTombRewardViewTab3;
}(CommonViewTab));
__reflect(AcLocTombRewardViewTab3.prototype, "AcLocTombRewardViewTab3");
//# sourceMappingURL=AcLocTombRewardViewTab3.js.map