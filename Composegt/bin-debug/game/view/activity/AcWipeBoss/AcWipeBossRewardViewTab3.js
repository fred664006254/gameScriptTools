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
        var scroStartY = 8;
        for (var index = 0; index < rankList.length; index++) {
            var id = index;
            var rItem = rankList[index];
            var key = rItem.id;
            var winBottomBg = BaseBitmap.create("rechargevie_db_01");
            winBottomBg.width = 628;
            winBottomBg.y = scroStartY;
            winBottomBg.x = 6;
            this._nodeContainer.addChild(winBottomBg);
            var winbg = BaseBitmap.create("public_ts_bg01");
            winbg.width = 250;
            winbg.y = scroStartY + 13;
            winbg.x = GameConfig.stageWidth / 2 - winbg.width / 2;
            this._nodeContainer.addChild(winbg);
            // let line1 =  BaseBitmap.create("public_line3");
            // line1.width = 480;
            // line1.x = GameConfig.stageWidth/2 - line1.width/2;
            // line1.y = winbg.y + winbg.height/2 - line1.height/2;
            // this._nodeContainer.addChild(line1);
            var rIcons1 = rItem.reward1Icons;
            var rank = rItem.rank;
            var txt = ComponentManager.getTextField(rItem.type == 1 ? rItem.npcName : "acwipeBossKillBox" + (key - 7), 22, TextFieldConst.COLOR_BROWN);
            txt.x = GameConfig.stageWidth / 2 - txt.width / 2;
            txt.y = winbg.y + winbg.height / 2 - txt.height / 2;
            this._nodeContainer.addChild(txt);
            var alltxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossKillBasicReward'), 22, TextFieldConst.COLOR_BROWN);
            alltxt.x = GameConfig.stageWidth / 2 - alltxt.width / 2;
            alltxt.y = winbg.y + winbg.height + 15;
            view._nodeContainer.addChild(alltxt);
            var line11 = BaseBitmap.create("public_v_huawen02");
            line11.x = alltxt.x + alltxt.width + 15;
            line11.y = alltxt.y + alltxt.height / 2 - line11.height / 2;
            this._nodeContainer.addChild(line11);
            var line12 = BaseBitmap.create("public_v_huawen02");
            line12.scaleX = -1;
            line12.x = alltxt.x - 10;
            line12.y = alltxt.y + alltxt.height / 2 - line12.height / 2;
            this._nodeContainer.addChild(line12);
            var len = rIcons1.length;
            var startY = alltxt.y + alltxt.textHeight + 10;
            tmpX = 20;
            scroStartY = startY;
            var scoreBg = BaseBitmap.create('itembg_1');
            // npcBg.setScale(106/194);
            scoreBg.width = 106;
            scoreBg.height = 106;
            scoreBg.x = tmpX;
            scoreBg.y = scroStartY;
            view._nodeContainer.addChild(scoreBg);
            var scoreImg = BaseBitmap.create("acwipeboss_scoreicon2");
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scoreImg, scoreBg);
            view._nodeContainer.addChild(scoreImg);
            var temScale = 1 / 0.8;
            var effectClip = ComponentManager.getCustomMovieClip("itemeffect", 10, 100);
            // effectClip.x = scoreImg.x + 50 - 198*temScale/2;
            // effectClip.y = scoreImg.y + 52 - 197*temScale/2;
            effectClip.x = scoreBg.x + scoreBg.width / 2 - 125 * temScale / 2;
            effectClip.y = scoreBg.y + scoreBg.height / 2 - 125 * temScale / 2;
            view._nodeContainer.addChild(effectClip);
            effectClip.scaleX = effectClip.scaleY = temScale;
            effectClip.playWithTime(-1);
            var scoretxt = ComponentManager.getTextField(rItem.killScore, 22, TextFieldConst.COLOR_QUALITY_WHITE);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, scoretxt, scoreBg);
            view._nodeContainer.addChild(scoretxt);
            var scoreBg2 = BaseBitmap.create('itembg_1');
            // npcBg.setScale(106/194);
            scoreBg2.width = 106;
            scoreBg2.height = 106;
            scoreBg2.x = scoreBg.x + scoreBg.width + 15;
            scoreBg2.y = scroStartY;
            view._nodeContainer.addChild(scoreBg2);
            var scoreImg2 = BaseBitmap.create("acwipeboss_scoreicon1");
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scoreImg2, scoreBg2);
            view._nodeContainer.addChild(scoreImg2);
            var effectClip2 = ComponentManager.getCustomMovieClip("itemeffect", 10, 100);
            effectClip2.scaleX = effectClip2.scaleY = temScale;
            effectClip2.playWithTime(-1);
            effectClip2.x = scoreBg2.x + scoreBg2.width / 2 - 125 * temScale / 2; //scoreImg2.x + 50 - 198*temScale/2;
            effectClip2.y = scoreBg2.y + scoreBg2.height / 2 - 125 * temScale / 2; //scoreImg2.y + 52 - 197*temScale/2;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, effectClip2, scoreBg2);
            view._nodeContainer.addChild(effectClip2);
            var scoretxt2 = ComponentManager.getTextField(rItem.killScore, 22, TextFieldConst.COLOR_QUALITY_WHITE);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, scoretxt2, scoreBg2);
            view._nodeContainer.addChild(scoretxt2);
            var ordtxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossKillPoolReward'), 22, TextFieldConst.COLOR_BROWN);
            ordtxt.x = GameConfig.stageWidth / 2 - ordtxt.width / 2;
            ordtxt.y = scroStartY + scoreBg.height + 13;
            view._nodeContainer.addChild(ordtxt);
            var line21 = BaseBitmap.create("public_v_huawen02");
            line21.x = ordtxt.x + ordtxt.width + 15;
            line21.y = ordtxt.y + ordtxt.height / 2 - line21.height / 2;
            this._nodeContainer.addChild(line21);
            var line22 = BaseBitmap.create("public_v_huawen02");
            line22.scaleX = -1;
            line22.x = ordtxt.x - 15;
            line22.y = ordtxt.y + ordtxt.height / 2 - line22.height / 2;
            this._nodeContainer.addChild(line22);
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
            winBottomBg.height = scroStartY - winBottomBg.y - 2;
        }
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 150 - 18);
        var scrollView = ComponentManager.getScrollView(this._nodeContainer, rect);
        scrollView.y = -3;
        scrollView.horizontalScrollPolicy = "off";
        this.addChild(scrollView);
        var bottomBgFrame = BaseBitmap.create("public_9v_bg03");
        bottomBgFrame.width = 640;
        bottomBgFrame.height = GameConfig.stageHeigth - 69 - 83;
        bottomBgFrame.x = 0;
        bottomBgFrame.y = 0;
        this.addChild(bottomBgFrame);
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
