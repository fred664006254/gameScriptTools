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
 * 标签1 册封加成
 * author qianjun----wxz
 */
var AcGroupWifeBattleTalentViewTab1 = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleTalentViewTab1, _super);
    function AcGroupWifeBattleTalentViewTab1(data) {
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
    AcGroupWifeBattleTalentViewTab1.prototype.checkHaveBuff = function () {
        return true;
    };
    Object.defineProperty(AcGroupWifeBattleTalentViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleTalentViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleTalentViewTab1.prototype.initView = function () {
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
        titleBg.y = 5;
        this.addChild(titleBg);
        this["titleBg1"] = titleBg;
        var plusDesc = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewCurPlus1", [(statusadd).toFixed(0)]), 20, TextFieldConst.COLOR_WARN_YELLOW2);
        plusDesc.x = titleBg.x + 35;
        plusDesc.y = titleBg.y + 45;
        this._plusDesc = plusDesc;
        this.addChild(plusDesc);
        var plusDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleTalentTab1Tip1"), 20, TextFieldConst.COLOR_BROWN);
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
        // let contentBg = BaseBitmap.create("public_9_bg32");
        // contentBg.width = scrollListBgRect.width; //538
        // contentBg.height = GameConfig.stageHeigth - 170 - titleBg.height * titleBg.scaleY - 23; //666
        // contentBg.x = GameConfig.stageWidth / 2 - contentBg.width/2;//view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
        // contentBg.y = titleBg.y + titleBg.height * titleBg.scaleY + 8;
        // view.addChild(contentBg);
        var title = BaseBitmap.create("qingyuanitemtitlebg");
        title.width = 594;
        title.x = GameConfig.stageWidth / 2 - title.width / 2;
        title.y = titleBg.y + titleBg.height * titleBg.scaleY + 5;
        this.addChild(title);
        var scroRect = new egret.Rectangle(0, 0, title.width + 10, 770 - (1136 - GameConfig.stageHeigth));
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
        this._scrollList1 = ComponentManager.getScrollList(AcGroupWifeBattleTalentViewTab1Item, infoList, scroRect);
        this._scrollList1.x = GameConfig.stageWidth / 2 - this._scrollList1.width / 2;
        this._scrollList1.y = title.y + title.height + 5;
        this.addChild(this._scrollList1);
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewLevel"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.setPosition(100, title.y + title.height / 2 - rankText.height / 2);
        this.addChild(rankText);
        this._rankText = rankText;
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleTalentTab1Tip2"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(225, rankText.y);
        this.addChild(nameText);
        this._nameText = nameText;
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentPlusPopupViewEffect"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.setPosition(430, rankText.y);
        this.addChild(scoreText);
        this._scoreText = scoreText;
        this._scrollList1.setScrollTopByIndex(index);
    };
    AcGroupWifeBattleTalentViewTab1.prototype.goStatus = function () {
        var viewList = ViewController.getInstance().getView(ViewConst.COMMON.WIFESTATUSVIEW);
        if (viewList && viewList._isShow) {
        }
        else {
            ViewController.getInstance().openView(ViewConst.COMMON.WIFESTATUSVIEW);
        }
    };
    AcGroupWifeBattleTalentViewTab1.prototype.showBuffLvUI = function (param) {
        ViewController.getInstance().openView(ViewConst.POPUP.WIFETALENTBUFFPOPUPVIEW, param);
    };
    AcGroupWifeBattleTalentViewTab1.prototype.getShowHeight = function () {
        return 830;
    };
    AcGroupWifeBattleTalentViewTab1.prototype.getTitleStr = function () {
        return 'wifeTalentPlusPopupViewTitle';
    };
    AcGroupWifeBattleTalentViewTab1.prototype.refreshList = function () {
    };
    AcGroupWifeBattleTalentViewTab1.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AcGroupWifeBattleTalentViewTab1.prototype.dispose = function () {
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
    return AcGroupWifeBattleTalentViewTab1;
}(ViewTab));
//# sourceMappingURL=AcGroupWifeBattleTalentViewTab1.js.map