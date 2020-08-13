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
 * 标签1 册封加成
 * author qianjun
 */
var AcCrossServerWifeTalentViewTab1 = (function (_super) {
    __extends(AcCrossServerWifeTalentViewTab1, _super);
    function AcCrossServerWifeTalentViewTab1(data) {
        var _this = _super.call(this) || this;
        // 滑动列表
        _this.bottomBg = null;
        //////////////////////////////////
        //去册封按钮
        _this._plusBtn = null;
        //册封加成描述
        _this._plusDesc = null;
        _this._rankText = null;
        _this._nameText = null;
        _this._scoreText = null;
        _this._descText = null;
        ///////////////////////////////////
        _this._plusDesc2 = null;
        _this._acDesc = null;
        _this._rankText2 = null;
        _this._nameText2 = null;
        _this._scoreText2 = null;
        _this._descText2 = null;
        //去提升按钮
        _this._plusBtn2 = null;
        _this._scrollList1 = null;
        _this._scrollList2 = null;
        _this._isHaveBuff = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    // protected getRequestData():{requestType:string,requestData:any}
    // {
    // 	return {requestType:NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL,requestData:{}};
    // }
    // protected request(requestType:string,requestData:any):void
    // {
    // 	console.log("refreshed----");
    // 	this.initView();
    // }
    AcCrossServerWifeTalentViewTab1.prototype.checkHaveBuff = function () {
        return true;
    };
    AcCrossServerWifeTalentViewTab1.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acsweetgift_make_infobg-1", "progress3", "progress3_bg", "wifeview_artistryicon",
        ]);
    };
    Object.defineProperty(AcCrossServerWifeTalentViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWifeTalentViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWifeTalentViewTab1.prototype.initView = function () {
        var scrollListBgRect = egret.Rectangle.create();
        scrollListBgRect.setTo(0, 0, 614, 435);
        var view = this;
        var model = this.vo.wifebattlecross; //Api.wifebattleVoApi.wifebattleVo;
        var add = 0;
        if (model && model.info && model.info.tmpattr && model.info.tmpattr.statusadd) {
            add = model.info.tmpattr.statusadd;
        }
        var statusadd = add ? add : 0; //Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd;
        var titleBg = BaseBitmap.create("wifetalenttopbg");
        titleBg.width = scrollListBgRect.width; //538
        titleBg.scaleY = 150 / 118;
        titleBg.x = GameConfig.stageWidth / 2 - titleBg.width / 2;
        titleBg.y = 15;
        this.addChild(titleBg);
        this["titleBg1"] = titleBg;
        var plusDesc = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewCurPlus1", [(statusadd).toFixed(0)]), 20, TextFieldConst.COLOR_WARN_YELLOW2);
        plusDesc.x = titleBg.x + 35;
        plusDesc.y = titleBg.y + 45;
        this._plusDesc = plusDesc;
        this.addChild(plusDesc);
        var plusDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewTip"), 20, TextFieldConst.COLOR_BROWN);
        plusDesc2.lineSpacing = 8;
        plusDesc2.x = plusDesc.x;
        plusDesc2.y = plusDesc.y + plusDesc.textHeight + 8;
        this.addChild(plusDesc2);
        var allTalentValue = 0;
        var actadd = 0;
        if (model && model.info && model.info.tmpattr && model.info.tmpattr.actadd) {
            actadd = model.info.tmpattr.actadd;
            allTalentValue = model.info.totaltalent;
        }
        var contentBg = BaseBitmap.create("public_9_bg32");
        contentBg.width = scrollListBgRect.width; //538
        contentBg.height = GameConfig.stageHeigth - 170 - titleBg.height * titleBg.scaleY - 23; //666
        contentBg.x = GameConfig.stageWidth / 2 - contentBg.width / 2; //view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
        contentBg.y = titleBg.y + titleBg.height * titleBg.scaleY + 8;
        view.addChild(contentBg);
        var title = BaseBitmap.create("qingyuanitemtitlebg");
        title.width = contentBg.width - 20;
        title.x = contentBg.x + contentBg.width / 2 - title.width / 2;
        title.y = contentBg.y + 10;
        this.addChild(title);
        var scroRect = new egret.Rectangle(0, 0, title.width, contentBg.height - 20 - title.height);
        var infoList = [];
        var wifestatusList = Config.WifestatusCfg.getWifestatusList();
        var maxNum = 0;
        for (var i = 0; i < wifestatusList.length; i++) {
            if (wifestatusList[i].maxNum) {
                maxNum += wifestatusList[i].maxNum;
            }
        }
        var index = 0;
        for (var j = 1; j <= maxNum; j++) {
            var obj = null;
            var effect = Config.WifebattleCfg.talentStatusBuff * j;
            if (effect <= statusadd) {
                if (effect == statusadd) {
                    index = j - 1;
                }
                obj = { level: j, num: j, effect: effect, isused: true };
            }
            else {
                obj = { level: j, num: j, effect: effect, isused: false };
            }
            infoList.push(obj);
        }
        this._scrollList1 = ComponentManager.getScrollList(WifeTalentPlusPopupScrollItem, infoList, scroRect);
        this._scrollList1.x = GameConfig.stageWidth / 2 - this._scrollList1.width / 2;
        this._scrollList1.y = title.y + title.height + 7;
        this.addChild(this._scrollList1);
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewLevel"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.setPosition(100, title.y + title.height / 2 - rankText.height / 2);
        this.addChild(rankText);
        this._rankText = rankText;
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewNum"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(225, rankText.y);
        this.addChild(nameText);
        this._nameText = nameText;
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewEffect"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.setPosition(430, rankText.y);
        this.addChild(scoreText);
        this._scoreText = scoreText;
        this._scrollList1.setScrollTopByIndex(index);
    };
    AcCrossServerWifeTalentViewTab1.prototype.goStatus = function () {
        var viewList = ViewController.getInstance().getView(ViewConst.COMMON.WIFESTATUSVIEW);
        if (viewList && viewList._isShow) {
            // let WifeTalentView = ViewController.getInstance().getView(ViewConst.COMMON.ACCROSSSERVERWIFEALLTALENTVIEW);
            // if(WifeTalentView){
            // 	WifeTalentView.hide();
            // }
        }
        else {
            ViewController.getInstance().openView(ViewConst.COMMON.WIFESTATUSVIEW);
            // let WifeTalentView = ViewController.getInstance().getView(ViewConst.COMMON.ACCROSSSERVERWIFEALLTALENTVIEW);
            // if(WifeTalentView){
            // 	WifeTalentView.hide();
            // }
            // let wifebattle = ViewController.getInstance().getView(ViewConst.COMMON.ACCROSSSERVERWIFEBATTLEVIEW);
            // if(wifebattle){
            // 	wifebattle.hide();
            // }
        }
    };
    AcCrossServerWifeTalentViewTab1.prototype.showBuffLvUI = function (param) {
        ViewController.getInstance().openView(ViewConst.POPUP.WIFETALENTBUFFPOPUPVIEW, param);
    };
    AcCrossServerWifeTalentViewTab1.prototype.getShowHeight = function () {
        return 830;
    };
    AcCrossServerWifeTalentViewTab1.prototype.getTitleStr = function () {
        return 'wifeTalentPlusPopupViewTitle';
    };
    AcCrossServerWifeTalentViewTab1.prototype.refreshList = function () {
    };
    AcCrossServerWifeTalentViewTab1.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AcCrossServerWifeTalentViewTab1.prototype.dispose = function () {
        this.bottomBg = null;
        //////////////////////////////////
        //去册封按钮
        this._plusBtn = null;
        //册封加成描述
        this._plusDesc = null;
        this._rankText = null;
        this._nameText = null;
        this._scoreText = null;
        this._descText = null;
        ///////////////////////////////////
        this._plusDesc2 = null;
        this._acDesc = null;
        this._rankText2 = null;
        this._nameText2 = null;
        this._scoreText2 = null;
        this._descText2 = null;
        //去提升按钮
        this._plusBtn2 = null;
        this._scrollList1 = null;
        this._scrollList2 = null;
        this._isHaveBuff = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWifeTalentViewTab1;
}(ViewTab));
__reflect(AcCrossServerWifeTalentViewTab1.prototype, "AcCrossServerWifeTalentViewTab1");
//# sourceMappingURL=AcCrossServerWifeTalentViewTab1.js.map