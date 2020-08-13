/**
 * 宴会结算
 * author shaoliang
 * date 2017/11/2
 * @class DinnerFinishView
 */
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
var DinnerFinishView = /** @class */ (function (_super) {
    __extends(DinnerFinishView, _super);
    function DinnerFinishView() {
        return _super.call(this) || this;
    }
    DinnerFinishView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "dinner_finish_word",
            "dinner_finish_word2",
            "dinner_finish_type1",
            "dinner_finish_type2",
            "dinner_finish_line",
            "dinner_list_title_bg",
            "dinner_list_bg",
            "dinner_rankbg",
        ]);
    };
    DinnerFinishView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    DinnerFinishView.prototype.getTitleBgName = function () {
        return null;
    };
    DinnerFinishView.prototype.getTitleStr = function () {
        return null;
    };
    DinnerFinishView.prototype.initView = function () {
        var info = this.param.data.info;
        var descBg = BaseBitmap.create("public_9_wordbg");
        descBg.width = GameConfig.stageWidth;
        descBg.height = 728;
        descBg.setPosition(0, GameConfig.stageHeigth / 2 - 413);
        this.addChildToContainer(descBg);
        var finishWord = BaseBitmap.create("dinner_finish_word");
        finishWord.setPosition(GameConfig.stageWidth / 2 - finishWord.width / 2, descBg.y - finishWord.height / 2);
        this.addChildToContainer(finishWord);
        var finishWord2 = BaseBitmap.create("dinner_finish_word2");
        var finishType = BaseBitmap.create("dinner_finish_type" + info.dtype);
        var totoalWidth = finishWord2.width + finishType.width;
        finishWord2.setPosition(GameConfig.stageWidth / 2 - totoalWidth / 2, descBg.y + 61);
        this.addChildToContainer(finishWord2);
        finishType.setPosition(finishWord2.x + finishWord2.width + 8, finishWord2.y);
        this.addChildToContainer(finishType);
        var totalGuest = ComponentManager.getTextField(LanguageManager.getlocal("dinnerTotalGuest", [String(info.num)]), TextFieldConst.FONTSIZE_TITLE_SMALL);
        totalGuest.setPosition(GameConfig.stageWidth / 2 - totalGuest.width / 2, descBg.y + 115);
        this.addChildToContainer(totalGuest);
        var finishLine = BaseBitmap.create("dinner_finish_line");
        finishLine.scaleX = 582 / finishLine.width;
        finishLine.setPosition(GameConfig.stageWidth / 2 - 582 / 2, descBg.y + 160);
        this.addChildToContainer(finishLine);
        //奖励
        var dinnerReward = ComponentManager.getTextField(LanguageManager.getlocal("dinnerReward"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        dinnerReward.setPosition(66, descBg.y + 183);
        this.addChildToContainer(dinnerReward);
        var dinnerPoint = ComponentManager.getTextField(LanguageManager.getlocal("playerScore") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        dinnerPoint.setPosition(dinnerReward.x, dinnerReward.y + 36);
        this.addChildToContainer(dinnerPoint);
        var pointText = ComponentManager.getTextField(info.point, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        pointText.setPosition(dinnerPoint.x + dinnerPoint.width + 10, dinnerPoint.y);
        this.addChildToContainer(pointText);
        var scorePoint = ComponentManager.getTextField(LanguageManager.getlocal("dinnerGetScore") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        scorePoint.setPosition(dinnerReward.x + 320, pointText.y);
        this.addChildToContainer(scorePoint);
        var scoreText = ComponentManager.getTextField(info.score, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        scoreText.setPosition(scorePoint.x + scorePoint.width + 10, scorePoint.y);
        this.addChildToContainer(scoreText);
        //记录
        var dinnerRecord = ComponentManager.getTextField(LanguageManager.getlocal("dinnerRecord"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        dinnerRecord.setPosition(dinnerReward.x, descBg.y + 270);
        this.addChildToContainer(dinnerRecord);
        var listBg = BaseBitmap.create("dinner_list_bg");
        listBg.width = 584;
        listBg.height = 418;
        listBg.setPosition(GameConfig.stageWidth / 2 - listBg.width / 2, descBg.y + 304);
        this.addChildToContainer(listBg);
        var listTitleBg = BaseBitmap.create("dinner_list_title_bg");
        listTitleBg.width = 582;
        listTitleBg.height = 46;
        listTitleBg.setPosition(GameConfig.stageWidth / 2 - listTitleBg.width / 2, listBg.y + 1);
        this.addChildToContainer(listTitleBg);
        var titleOrder = ComponentManager.getTextField(LanguageManager.getlocal("orderNumber"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        titleOrder.setPosition(dinnerReward.x + 10, listTitleBg.y + listTitleBg.height / 2 - titleOrder.height / 2);
        this.addChildToContainer(titleOrder);
        var titleName = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        titleName.setPosition(titleOrder.x + 175, titleOrder.y);
        this.addChildToContainer(titleName);
        var titleScore = ComponentManager.getTextField(LanguageManager.getlocal("dinnerScore"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        titleScore.setPosition(titleName.x + 218, titleOrder.y);
        this.addChildToContainer(titleScore);
        //info.dtype
        var baodiNum = 0;
        if (this.param.data.baodi) {
            baodiNum = Number(this.param.data.baodi);
        }
        else {
            // let count:number = Config.DinnerCfg.getFeastItemCfg(info.dtype).contain;
            // baodiNum = count-info.jinfo.length;
        }
        var infoArray = [];
        if (info.jinfo.length > 0) {
            infoArray = info.jinfo;
        }
        for (var i = 0; i < baodiNum; i++) {
            infoArray.push({ dtype: 999, name: LanguageManager.getlocal("dinnerGuest") });
        }
        this._scroRect = new egret.Rectangle(0, 0, listBg.width, listBg.height - listTitleBg.height - 8);
        this._scrollList = ComponentManager.getScrollList(DinnerFinishItem, infoArray, this._scroRect);
        this._scrollList.x = listBg.x;
        this._scrollList.y = listBg.y + listTitleBg.height;
        this.addChildToContainer(this._scrollList);
        //按钮
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.hide, this);
        confirmBtn.setPosition(GameConfig.stageWidth / 2 - confirmBtn.width / 2, descBg.y + descBg.height + 40);
        this.addChildToContainer(confirmBtn);
    };
    DinnerFinishView.prototype.hide = function () {
        _super.prototype.hide.call(this);
        if (ViewController.getInstance().getView(ViewConst.COMMON.DINNERDETAILVIEW)) {
            ViewController.getInstance().getView(ViewConst.COMMON.DINNERDETAILVIEW).hide();
        }
        if (ViewController.getInstance().getView(ViewConst.POPUP.DINNERSHAREPOPUPVIEW)) {
            ViewController.getInstance().getView(ViewConst.POPUP.DINNERSHAREPOPUPVIEW).hide();
        }
    };
    DinnerFinishView.prototype.dispose = function () {
        this._scroRect = null;
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return DinnerFinishView;
}(BaseView));
//# sourceMappingURL=DinnerFinishView.js.map