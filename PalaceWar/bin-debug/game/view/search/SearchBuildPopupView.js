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
var SearchBuildPopupView = (function (_super) {
    __extends(SearchBuildPopupView, _super);
    function SearchBuildPopupView() {
        return _super.call(this) || this;
    }
    SearchBuildPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "searchbinfowifebg",
            "progress3", "progress3_bg"
        ]);
    };
    SearchBuildPopupView.prototype.initView = function () {
        var itemVoList = Api.searchVoApi.getPersonListByBuildId(this.getBuildId());
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 520, 800);
        var scrollList = ComponentManager.getScrollList(SearchBuildScrollItem, itemVoList, rect);
        this.addChildToContainer(scrollList);
        scrollList.setPosition((this.viewBg.width - scrollList.width) / 2, 15);
    };
    SearchBuildPopupView.prototype.getBuildId = function () {
        return this.param.data;
    };
    SearchBuildPopupView.prototype.getTitleStr = function () {
        return "searchBuild" + this.getBuildId();
    };
    SearchBuildPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return SearchBuildPopupView;
}(PopupView));
__reflect(SearchBuildPopupView.prototype, "SearchBuildPopupView");
var SearchBuildScrollItem = (function (_super) {
    __extends(SearchBuildScrollItem, _super);
    function SearchBuildScrollItem() {
        return _super.call(this) || this;
    }
    SearchBuildScrollItem.prototype.initItem = function (index, data) {
        var itemVo = data;
        var itemCfg = Config.SearchCfg.getPersonItemCfgByPersonId(itemVo.personId);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 300;
        this.addChild(bg);
        this.height = bg.height + this.getSpaceY();
        this.width = bg.width;
        var descBg = BaseBitmap.create("public_9_probiginnerbg");
        descBg.width = 254;
        if (itemVo.isShowProgress) {
            descBg.height = 248;
        }
        else {
            descBg.height = 248;
        }
        descBg.setPosition(bg.x + bg.width - descBg.width - 8, bg.y + 25);
        this.addChild(descBg);
        var txtWidth = descBg.width - 10;
        var headBg = BaseBitmap.create("searchbinfowifebg");
        headBg.setPosition(bg.x + (descBg.x - bg.x - headBg.width) / 2, bg.y + (bg.height - headBg.height) / 2);
        this.addChild(headBg);
        var personIcon = BaseLoadBitmap.create(itemCfg.personFullIcon);
        var size = itemCfg.fullIconSize;
        personIcon.width = size.width;
        personIcon.height = size.height;
        personIcon.setScale(210 / personIcon.width);
        personIcon.setPosition(20, bg.y + bg.height - personIcon.height * personIcon.scaleY - 10);
        this.addChild(personIcon);
        if (itemVo.type == 1) {
            personIcon.setScale(245 / personIcon.width);
            personIcon.setPosition(15, bg.y + bg.height - personIcon.height * personIcon.scaleY - 10);
        }
        var nameTxt = ComponentManager.getTextField(itemCfg.name, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        nameTxt.width = txtWidth;
        nameTxt.setPosition(descBg.x + 8, descBg.y + 8);
        this.addChild(nameTxt);
        var shortNameTxt = ComponentManager.getTextField(itemCfg.shortDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW);
        shortNameTxt.width = txtWidth;
        shortNameTxt.setPosition(nameTxt.x, nameTxt.y + nameTxt.height + 5);
        this.addChild(shortNameTxt);
        var descTxt = ComponentManager.getTextField(itemCfg.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        descTxt.width = txtWidth;
        descTxt.setPosition(shortNameTxt.x, shortNameTxt.y + shortNameTxt.height + 20);
        this.addChild(descTxt);
        var eventTxt = ComponentManager.getTextField(itemVo.eventDesc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        eventTxt.width = txtWidth;
        eventTxt.setPosition(descTxt.x, descBg.y + descBg.height - eventTxt.height - 10);
        this.addChild(eventTxt);
        var maskBg = BaseBitmap.create("public_searchmask");
        maskBg.width = 255;
        // maskBg.height = 200;
        maskBg.setPosition(10, bg.y + bg.height - maskBg.height - 5);
        this.addChild(maskBg);
        // if(itemVo.isShowProgress)
        // {
        // 	let progressBar:ProgressBar=ComponentManager.getProgressBar("progress3","progress3_bg",512);
        // 	progressBar.setPosition(bg.x+(bg.width-progressBar.width)/2,bg.y+bg.height-progressBar.height-5);
        // 	progressBar.setPercentage(itemVo.value/itemVo.maxValue,itemVo.value+"/"+itemVo.maxValue);
        // 	this.addChild(progressBar);
        // }
    };
    SearchBuildScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    SearchBuildScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    return SearchBuildScrollItem;
}(ScrollListItem));
__reflect(SearchBuildScrollItem.prototype, "SearchBuildScrollItem");
//# sourceMappingURL=SearchBuildPopupView.js.map