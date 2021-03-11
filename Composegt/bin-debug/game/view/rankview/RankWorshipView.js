/**
 * 排行榜 膜拜弹出UI
 * author yanyuling
 * date 2017/10/26
 * @class RankWorshipView
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
var RankWorshipView = (function (_super) {
    __extends(RankWorshipView, _super);
    function RankWorshipView() {
        var _this = _super.call(this) || this;
        _this._clickNum = 0;
        _this._hideSt = null;
        _this._rewardStr = "";
        return _this;
    }
    RankWorshipView.prototype.initView = function () {
        var UIData = this.param.data.data.data;
        // let UIData = {gem:10000,title:"3001",level:11,pic:9,vip:11,name:"万爱雨"};
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.alpha = 0;
        this.addChild(this._nodeContainer);
        this.touchEnabled = false;
        this.addTouchTap(this.clickHandler, this);
        var topTxtBg = BaseBitmap.create("childview_talkbg_2");
        // topTxtBg.scaleX = -1;
        topTxtBg.width = 498;
        topTxtBg.height = 154;
        topTxtBg.x = GameConfig.stageWidth / 2 - topTxtBg.width / 2; //GameConfig.stageWidth/2 + topTxtBg.width/2;
        topTxtBg.y = 180;
        this._nodeContainer.addChild(topTxtBg);
        var bf = BaseBitmap.create("wifestatus_curmark");
        bf.x = topTxtBg.x + topTxtBg.width - 23;
        bf.y = topTxtBg.y - 17;
        this._nodeContainer.addChild(bf);
        var txt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW_NEW);
        txt.multiline = true;
        txt.lineSpacing = 5;
        txt.width = topTxtBg.width - 10;
        txt.x = topTxtBg.x + 20;
        txt.y = topTxtBg.y + 20;
        this._nodeContainer.addChild(txt);
        // let resBg = BaseBitmap.create("public_hb_bg01");
        // resBg.x = topTxtBg.x - topTxtBg.width + 320;
        // resBg.y = topTxtBg.y + 90;
        // this._nodeContainer.addChild(resBg);
        var startY = topTxtBg.y + 90 + 10;
        var goldIcon = null; //BaseBitmap.create("public_icon1");
        var getNum = UIData.gem;
        if (UIData.vzid) {
            // goldIcon.texture = ResourceManager.getRes("public_icon5");
            goldIcon = BaseBitmap.create("public_icon5");
            this._rewardStr = "5_5_" + UIData.getnum;
            getNum = UIData.getnum;
            goldIcon.y = startY - goldIcon.height / 2 - 25;
        }
        else {
            goldIcon = BaseBitmap.create("public_icon1");
            // goldIcon.setScale(0.5);
            this._rewardStr = "1_0_" + UIData.gem;
            goldIcon.y = startY - goldIcon.height / 2 - 20;
        }
        // goldIcon.x = resBg.x -10;
        goldIcon.y = startY - goldIcon.height / 2 + 5;
        this._nodeContainer.addChild(goldIcon);
        // this._rewardStr = "1_0_"+ UIData.gem;
        var goldTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        goldTxt.text = "+" + String(getNum);
        // goldTxt.x = goldIcon.x + 65;
        goldTxt.y = startY - goldTxt.height / 2 + 5;
        this._nodeContainer.addChild(goldTxt);
        var startX = topTxtBg.x + topTxtBg.width / 2 - (goldIcon.width + goldTxt.width) / 2;
        goldIcon.x = startX;
        goldTxt.x = goldIcon.x + goldIcon.width;
        var scaleV = 1.3;
        var fullImg = Api.playerVoApi.getPlayerPortrait(UIData.level, UIData.pic);
        fullImg.setScale(scaleV);
        fullImg.x = GameConfig.stageWidth / 2 - fullImg.width / 2 * scaleV;
        // fullImg.y = GameConfig.stageHeigth - fullImg.height*scaleV * 0.7 ;
        // let tmpH = GameConfig.stageHeigth - resBg.y - resBg.height;
        fullImg.y = startY + 10 + 40;
        this._nodeContainer.addChild(fullImg);
        // UIData.title = "3001";
        if (UIData.title != "") {
            if (PlatformManager.checkIsTextHorizontal()) {
                var titleBg = BaseBitmap.create("atkracevipbg");
                var titleTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WHITE);
                // titleTxt.width = 31;
                titleTxt.text = LanguageManager.getlocal("palace_titleName" + UIData.title);
                titleBg.rotation = -90;
                titleBg.height = titleTxt.width + 30;
                titleBg.x = this.viewBg.width / 2 - titleBg.height / 2;
                titleBg.y = GameConfig.stageHeigth - 220;
                titleTxt.x = titleBg.x + titleBg.height / 2 - titleTxt.width / 2;
                titleTxt.y = titleBg.y + titleBg.width / 2 - titleTxt.height / 2 - titleBg.width;
                // titleTxt.x = titleBg.x + titleBg.width/2 - titleTxt.width/2;
                // titleTxt.y = titleBg.y + titleBg.height/2 - titleTxt.height/2  - 35;
                this._nodeContainer.addChild(titleBg);
                this._nodeContainer.addChild(titleTxt);
            }
            else {
                var titleBg = BaseBitmap.create("public_get_namebg");
                titleBg.x = GameConfig.stageWidth - 120;
                titleBg.y = fullImg.y + 30;
                var titleTxt = ComponentManager.getTextField("", 30, TextFieldConst.COLOR_WHITE);
                titleTxt.width = 31;
                titleTxt.text = LanguageManager.getlocal("palace_titleName" + UIData.title);
                titleTxt.x = titleBg.x + titleBg.width / 2 - titleTxt.width / 2;
                titleTxt.y = titleBg.y + titleBg.height / 2 - titleTxt.height / 2 - 35;
                this._nodeContainer.addChild(titleBg);
                this._nodeContainer.addChild(titleTxt);
            }
            // let officerImg = BaseLoadBitmap.create("user_title_" + UIData.title +"_2");
            // officerImg.x = GameConfig.stageWidth - 120;
            // officerImg.y = fullImg.y + 30;
            // this._nodeContainer.addChild(officerImg);
        }
        if (Number(UIData.vip) > 0) {
            var vipImg = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(UIData.vip).icon);
            vipImg.x = GameConfig.stageWidth / 2 - 40;
            vipImg.y = GameConfig.stageHeigth - 190;
            this._nodeContainer.addChild(vipImg);
        }
        var namebg = BaseBitmap.create("public_lockbg");
        namebg.x = GameConfig.stageWidth / 2 - namebg.width / 2;
        namebg.y = GameConfig.stageHeigth - 150;
        this._nodeContainer.addChild(namebg);
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_QUALITY_YELLOW);
        nameTxt.text = UIData.name;
        nameTxt.x = GameConfig.stageWidth / 2 - nameTxt.width / 2;
        nameTxt.y = namebg.y + namebg.height / 2 - nameTxt.height / 2;
        this._nodeContainer.addChild(nameTxt);
        var tmpThis = this;
        egret.Tween.get(this._nodeContainer, { loop: false }).to({ alpha: 1 }, 700).call(function () {
            var rnd = App.MathUtil.getRandom(1, 11);
            var text = LanguageManager.getlocal("rankDialogue" + rnd);
            tmpThis.typerEffect(txt, text);
            tmpThis.touchEnabled = false;
        });
    };
    /**
  * 文字打字机效果
  * obj           文本对象
  * content       文字
  * interval      打字间隔 毫秒
  */
    RankWorshipView.prototype.typerEffect = function (obj, content, interval, backFun) {
        if (content === void 0) { content = ""; }
        if (interval === void 0) { interval = 200; }
        if (backFun === void 0) { backFun = null; }
        var strArr = content.split("");
        var len = strArr.length;
        for (var i = 0; i < len; i++) {
            egret.setTimeout(function () {
                obj.appendText(strArr[Number(this)]);
                if ((Number(this) >= len - 1) && (backFun != null)) {
                    backFun();
                }
            }, i, interval * i);
        }
    };
    RankWorshipView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "public_get_namebg",
            "atkracevipbg",
            "childview_talkbg_2",
            "wifestatus_curmark"
        ]);
    };
    RankWorshipView.prototype.getTitleStr = function () {
        return "";
    };
    RankWorshipView.prototype.clickHandler = function () {
        //飘奖励
        if (this._clickNum == 0) {
            var rList = GameData.formatRewardItem(this._rewardStr);
            App.CommonUtil.playRewardFlyAction(rList);
        }
        else if (this._clickNum == 1) {
            this._hideSt = egret.setTimeout(this.hideSelf, this, 500);
        }
        this._clickNum++;
    };
    RankWorshipView.prototype.hideSelf = function () {
        egret.clearTimeout(this._hideSt);
        _super.prototype.hide.call(this);
    };
    RankWorshipView.prototype.dispose = function () {
        this._nodeContainer = null;
        this._clickNum = 0;
        this._hideSt = null;
        this._rewardStr = "";
        _super.prototype.dispose.call(this);
    };
    return RankWorshipView;
}(BaseView));
__reflect(RankWorshipView.prototype, "RankWorshipView");