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
var LevyScrollItem1DetailPopupView = (function (_super) {
    __extends(LevyScrollItem1DetailPopupView, _super);
    // 滑动列表
    function LevyScrollItem1DetailPopupView() {
        return _super.call(this) || this;
    }
    LevyScrollItem1DetailPopupView.prototype.isHaveTitle = function () {
        return true;
    };
    LevyScrollItem1DetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    LevyScrollItem1DetailPopupView.prototype.initView = function () {
        var view = this;
        var contentBg = BaseBitmap.create("public_9v_bg12");
        contentBg.width = view.getShowWidth() - 60;
        contentBg.height = 520;
        contentBg.x = view.viewBg.x + view.viewBg.width / 2 - contentBg.width / 2;
        contentBg.y = 70;
        view.addChildToContainer(contentBg);
        var bottomBg = BaseBitmap.create("public_9v_bg12");
        bottomBg.width = contentBg.width;
        bottomBg.height = 96;
        bottomBg.x = this.viewBg.x + this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = contentBg.y + contentBg.height + 5;
        view.addChildToContainer(bottomBg);
        var totalStr = ComponentManager.getTextField(LanguageManager.getlocal("levy_scrollitem1detail_total"), 22, TextFieldConst.COLOR_BROWN_NEW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, totalStr, bottomBg, [125, 5]);
        view.addChildToContainer(totalStr);
        var totalRate = Api.levyVoApi.getLevyItemRate(0);
        var interval = Config.LevyCfg.LevyItemList[0].interval;
        var totalGold = ComponentManager.getTextField(LanguageManager.getlocal("levy_scrollitem1detailtxt2", [totalRate.grate, interval]), 22, TextFieldConst.COLOR_BROWN_NEW);
        totalGold.x = totalStr.x + totalStr.width + 40;
        totalGold.y = totalStr.y + 20;
        view.addChildToContainer(totalGold);
        var goldBm = BaseBitmap.create("public_icon2");
        goldBm.setPosition(totalGold.x + totalGold.width / 2 - goldBm.width / 2, totalGold.y - 45);
        view.addChildToContainer(goldBm);
        // let totalFood = ComponentManager.getTextField(LanguageManager.getlocal("levy_scrollitem1detailtxt2",[totalRate.frate,interval]), 22,TextFieldConst.COLOR_BROWN_NEW);
        // totalFood.x = totalStr.x + totalStr.width + 155;
        // totalFood.y = totalStr.y+ 20;
        // view.addChildToContainer(totalFood);
        // let foodBm = BaseBitmap.create("public_icon3");
        // foodBm.setPosition(totalFood.x + totalFood.width/2 - foodBm.width/2,totalFood.y - 45);
        // view.addChildToContainer(foodBm);
        // let totalSoldier = ComponentManager.getTextField(LanguageManager.getlocal("levy_scrollitem1detailtxt2",[totalRate.srate,interval]), 22,TextFieldConst.COLOR_BROWN_NEW);
        // totalSoldier.x = totalStr.x + totalStr.width + 265;
        // totalSoldier.y = totalStr.y+ 20;
        // view.addChildToContainer(totalSoldier);
        // let soldierBm = BaseBitmap.create("public_icon4");
        // soldierBm.setPosition(totalSoldier.x + totalSoldier.width/2 - soldierBm.width/2,totalSoldier.y - 45);
        // view.addChildToContainer(soldierBm);
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("levy_scrollitem1detailtitle1"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = this.x + 100;
        titleTxt1.y = this.y + 30;
        view.addChildToContainer(titleTxt1);
        var titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("levy_scrollitem1detailtitle3"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt2.x = this.x + 285;
        titleTxt2.y = titleTxt1.y;
        view.addChildToContainer(titleTxt2);
        var titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("levy_scrollitem1detailtitle2"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt3.x = this.x + 460;
        titleTxt3.y = titleTxt1.y;
        view.addChildToContainer(titleTxt3);
        var addList = [];
        var personMap = Api.composemapVoApi.getMapinfoLvData();
        var lv = 1;
        for (var key in personMap) {
            addList.push({ level: Number(key), num: personMap[key].length });
            lv++;
        }
        var arr = [];
        for (var i in addList) {
            var unit = addList[i];
            unit.pos = [
                { width: titleTxt1.textWidth, x: titleTxt1.x - 30 },
                { width: titleTxt2.textWidth, x: titleTxt2.x - 30 },
                { width: titleTxt3.textWidth, x: titleTxt3.x - 30 },
            ];
            arr.push(unit);
        }
        // let rankInfo = view.vo.getRankInfo();
        // if(rankInfo.rankList && rankInfo.rankList.length){
        // 	rankList = rankInfo.rankList;
        // }
        var rect = new egret.Rectangle(0, 0, contentBg.width, contentBg.height - 10);
        var scrollList = ComponentManager.getScrollList(LevyScrollItem1DetailPopupViewItem, arr, rect);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, contentBg, [0, 0]);
        view.addChildToContainer(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
    };
    // protected getRequestData():{requestType:string,requestData:any}
    // {	
    // 	let view = this;
    // 	return {requestType:NetRequestConst.REQUEST_ACTIVITY_LOCTOMBRANK,requestData:{
    // 		activeId : view.vo.aidAndCode,
    // 	}};
    // }
    // protected receiveData(data:{ret:boolean,data:any}):void
    // {
    // 	let view = this;
    // 	view.vo.setRankInfo(data.data.data);
    // }
    LevyScrollItem1DetailPopupView.prototype.getShowWidth = function () {
        return 585;
    };
    LevyScrollItem1DetailPopupView.prototype.getShowHeight = function () {
        return 798;
    };
    LevyScrollItem1DetailPopupView.prototype.getTitleStr = function () {
        return 'levyScrollItem1DetailPopupViewTitle';
    };
    LevyScrollItem1DetailPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    LevyScrollItem1DetailPopupView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return LevyScrollItem1DetailPopupView;
}(PopupView));
__reflect(LevyScrollItem1DetailPopupView.prototype, "LevyScrollItem1DetailPopupView");
