/**
 * 宴会结算
 * author shaoliang
 * date 2017/11/2
 * @class DinnerFinishView
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
var DinnerFinishView = (function (_super) {
    __extends(DinnerFinishView, _super);
    function DinnerFinishView() {
        return _super.call(this) || this;
    }
    DinnerFinishView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "dinner_list_bg",
            "dinner_rankbg",
            "dinner_finish_dt01",
            "servant_advancehuawen"
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
        //test
        /*this.param = {
            data:{
                baodi:9,
                info : {
                    dtype: 1,
                    enemy_num: 0,
                    jinfo:[
                        {
                            dtype:2,
                            join_time: 1528965075,
                            name: "官人你好快",
                            pic: 9,
                            uid: 1000504
                        },
                        {dtype: 999,name:"空位"},
                        {dtype: 999,name:"空位"},
                        {dtype: 999,name:"空位"},
                        {dtype: 999,name:"空位"},
                        {dtype: 999,name:"空位"},
                        {dtype: 999,name:"空位"},
                        {dtype: 999,name:"空位"},
                        {dtype: 999,name:"空位"},
                        {dtype: 999,name:"空位"}
                    ],
                    num:1,
                    point: "950",
                    score: "950",
                    start_time: 1528948292,
                    uid: 1000502
                }
            }
        
    };
    */
        var info = this.param.data.info;
        var descBg = BaseBitmap.create("public_9_wordbg");
        descBg.width = GameConfig.stageWidth;
        descBg.height = 728;
        descBg.setPosition(0, GameConfig.stageHeigth / 2 - 413);
        this.addChildToContainer(descBg);
        var finishWord = BaseBitmap.create("dinner_hd_word");
        finishWord.setPosition(GameConfig.stageWidth / 2 - finishWord.width / 2, descBg.y - finishWord.height / 2);
        this.addChildToContainer(finishWord);
        var finishWord2 = BaseBitmap.create("dinner_finish_word2");
        var finishType = BaseBitmap.create("dinner_finish_type" + info.dtype);
        var totoalWidth = finishWord2.width + finishType.width;
        finishWord2.setPosition(GameConfig.stageWidth / 2 - totoalWidth / 2, descBg.y + 61);
        this.addChildToContainer(finishWord2);
        finishType.setPosition(finishWord2.x + finishWord2.width + 8, finishWord2.y);
        this.addChildToContainer(finishType);
        var totalGuest = ComponentManager.getTextField(LanguageManager.getlocal("dinnerTotalGuest", [info.num.toString()]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_QUALITY_ORANGE);
        totalGuest.setPosition(GameConfig.stageWidth / 2 - totalGuest.width / 2, descBg.y + 115);
        this.addChildToContainer(totalGuest);
        var finishLineR = BaseBitmap.create("servant_advancehuawen");
        // finishLineL.scaleX = 582/finishLineL.width;
        finishLineR.scaleX = 1.2;
        finishLineR.setPosition(GameConfig.stageWidth / 2 - 4, descBg.y + 160);
        this.addChildToContainer(finishLineR);
        var finishLineL = BaseBitmap.create("servant_advancehuawen");
        // finishLineL.scaleX = 582/finishLineL.width;
        finishLineL.scaleX = -1.2;
        finishLineL.setPosition(GameConfig.stageWidth / 2 + 4, descBg.y + 160);
        this.addChildToContainer(finishLineL);
        //奖励
        var dinnerReward = ComponentManager.getTextField(LanguageManager.getlocal("dinnerReward"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        dinnerReward.setPosition(66, descBg.y + 183);
        this.addChildToContainer(dinnerReward);
        var dinnerPoint = ComponentManager.getTextField(LanguageManager.getlocal("playerScore") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        dinnerPoint.setPosition(dinnerReward.x, dinnerReward.y + 36);
        this.addChildToContainer(dinnerPoint);
        var pointText = ComponentManager.getTextField(info.point, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
        pointText.setPosition(dinnerPoint.x + dinnerPoint.width + 10, dinnerPoint.y);
        this.addChildToContainer(pointText);
        var scorePoint = ComponentManager.getTextField(LanguageManager.getlocal("dinnerGetScore") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        scorePoint.setPosition(dinnerReward.x + 320, pointText.y);
        this.addChildToContainer(scorePoint);
        var scoreText = ComponentManager.getTextField(info.score, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
        scoreText.setPosition(scorePoint.x + scorePoint.width + 10, scorePoint.y);
        this.addChildToContainer(scoreText);
        //记录
        var dinnerRecord = ComponentManager.getTextField(LanguageManager.getlocal("dinnerRecord"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        dinnerRecord.setPosition(dinnerReward.x, descBg.y + 270);
        this.addChildToContainer(dinnerRecord);
        var listBg = BaseBitmap.create("dinner_finish_dt02");
        listBg.width = 584;
        listBg.height = 418 - 30;
        listBg.setPosition(GameConfig.stageWidth / 2 - listBg.width / 2, descBg.y + 304);
        this.addChildToContainer(listBg);
        var listTitleBg = BaseBitmap.create("dinner_finish_dt01");
        listTitleBg.width = 582;
        listTitleBg.height = 46;
        listTitleBg.setPosition(GameConfig.stageWidth / 2 - listTitleBg.width / 2, listBg.y + 1);
        this.addChildToContainer(listTitleBg);
        var titleOrder = ComponentManager.getTextField(LanguageManager.getlocal("orderNumber"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        titleOrder.setPosition(dinnerReward.x + 10, listTitleBg.y + listTitleBg.height / 2 - titleOrder.height / 2);
        this.addChildToContainer(titleOrder);
        var titleName = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        titleName.setPosition(titleOrder.x + 175, titleOrder.y);
        this.addChildToContainer(titleName);
        var titleScore = ComponentManager.getTextField(LanguageManager.getlocal("dinnerScore"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        titleScore.setPosition(titleName.x + 218, titleOrder.y);
        this.addChildToContainer(titleScore);
        //info.dtype
        var baodiNum = 0;
        if (this.param.data.baodi) {
            baodiNum = Number(this.param.data.baodi);
        }
        else {
            var count = Config.DinnerCfg.getFeastItemCfg(info.dtype).contain;
            // baodiNum = count-info.jinfo.length;
        }
        var infoArray = [];
        if (info.jinfo.length > 0) {
            infoArray = info.jinfo;
        }
        for (var i = 0; i < baodiNum; i++) {
            infoArray.push({ dtype: 999, name: LanguageManager.getlocal("dinnerGuest") });
        }
        this._scroRect = new egret.Rectangle(0, 0, listBg.width, listBg.height - listTitleBg.height - 28);
        this._scrollList = ComponentManager.getScrollList(DinnerFinishItem, infoArray, this._scroRect);
        this._scrollList.x = listBg.x;
        this._scrollList.y = listBg.y + listTitleBg.height;
        this.addChildToContainer(this._scrollList);
        //按钮
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.hide, this);
        confirmBtn.setPosition(GameConfig.stageWidth / 2 - confirmBtn.width / 2, descBg.y + descBg.height + 40);
        this.addChildToContainer(confirmBtn);
    };
    DinnerFinishView.prototype.dispose = function () {
        this._scroRect = null;
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return DinnerFinishView;
}(BaseView));
__reflect(DinnerFinishView.prototype, "DinnerFinishView");
