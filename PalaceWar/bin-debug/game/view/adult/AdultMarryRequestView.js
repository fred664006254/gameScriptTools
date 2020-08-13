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
 * 提亲请求列表
 * author dky
 * date 2017/10/31
 * @class AdultMarryRequestView
 */
var AdultMarryRequestView = (function (_super) {
    __extends(AdultMarryRequestView, _super);
    function AdultMarryRequestView() {
        return _super.call(this) || this;
    }
    AdultMarryRequestView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CLOSECHOOSE, this.hide, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_REFUSEMARRY, this.doRefuse, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CHOOSECHILD, this.doChoose, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_REFRESHCHILDMARRY, this.doRefresh, this);
        this._handler = this.param.data.handler;
        this._confirmCallback = this.param.data.confirmCallback;
        this.request(NetRequestConst.REQUEST_RADULT_GETPROPOSEE, null);
        // let gemBgIcon = BaseBitmap.create("public_9_resbg");
        // gemBgIcon.x = 230;
        // gemBgIcon.y = 21;
        // this.addChildToContainer(gemBgIcon);
        // let gemBg = BaseLoadBitmap.create("itemicon1");
        // gemBg.setScale(0.5);
        // gemBg.x = 230;
        // gemBg.y = gemBgIcon.y + gemBgIcon.height/2 - 100/2 + 23;
        // this.addChildToContainer(gemBg);
        // let gem = Api.playerVoApi.getPlayerGem();
        // let gemText = ComponentManager.getTextField(gem.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        // gemText.x = 280;
        // gemText.y = gemBgIcon.y + gemBgIcon.height/2 - gemText.height/2;
        // this.addChildToContainer(gemText);
        var arena_bottom = BaseBitmap.create("arena_bottom");
        this.setLayoutPosition(LayoutConst.horizontalCenterbottom, arena_bottom, this);
        this.addChild(arena_bottom);
        var bottomBg = BaseBitmap.create("public_9_bg23");
        bottomBg.width = GameConfig.stageWidth - 10;
        bottomBg.height = GameConfig.stageHeigth - this.container.y - arena_bottom.height;
        bottomBg.x = this.viewBg.x + this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = 0;
        // this.addChildToContainer(bottomBg);
        // let requestList = 
        // [
        // 	{aid:111,uid:111,childId:"c12",fatherName:"111",aquality:7,name:"111",needGem:111,needItemId:"1401"},
        // 	{aid:111,uid:111,childId:"c12",fatherName:"222",aquality:7,name:"222",needGem:111,needItemId:"1401"},
        // 	{aid:111,uid:111,childId:"c12",fatherName:"333",aquality:7,name:"333",needGem:111,needItemId:"1401"},
        // 	{aid:111,uid:111,childId:"c12",fatherName:"444",aquality:7,name:"444",needGem:111,needItemId:"1401"},
        // 	{aid:111,uid:111,childId:"c12",fatherName:"555",aquality:7,name:"555",needGem:111,needItemId:"1401"}
        // ]
        var rect = egret.Rectangle.create();
        rect.setTo(0, 5, GameConfig.stageWidth - 14, bottomBg.height - 20);
        this._scrollList = ComponentManager.getScrollList(AdultMarryRequestScrollItem, null, rect);
        this.addChildToContainer(this._scrollList);
        this.setLayoutPosition(LayoutConst.horizontalCentertop, this._scrollList, bottomBg, [0, 5]);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("adultEmptyTip2"));
        //一键拒绝
        var allMarryBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "adultMarryRequestRefuseAll", this.refuseAllHandler, this);
        this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, allMarryBtn, arena_bottom);
        // allMarryBtn.
        this.addChild(allMarryBtn);
        allMarryBtn.setColor(TextFieldConst.COLOR_BLACK);
    };
    //请求回调
    AdultMarryRequestView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_RADULT_GETPROPOSEE) {
            this._scrollList.refreshData(data.data.data.minfo);
        }
        else if (data.data.cmd == NetRequestConst.REQUEST_RADULT_REFUSEPROPOSE) {
            this._scrollList.refreshData(data.data.data.minfo);
        }
        if (data.data && data.data.data && data.data.data.minfo) {
            this.param.data.confirmCallback2.apply(this.param.data.handler, [1]);
        }
        else {
            this.param.data.confirmCallback2.apply(this.param.data.handler, [2]);
        }
    };
    AdultMarryRequestView.prototype.refreshHandler = function () {
    };
    //拒绝某个联姻
    AdultMarryRequestView.prototype.doRefuse = function (event) {
        this._selectChildData = event.data;
        // ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSETYPEVIEW, { type: 2, childId: this._adultInfoVo.id,confirmCallback: this.selectMarryHander, handler: this });
        this.request(NetRequestConst.REQUEST_RADULT_REFUSEPROPOSE, { aid: event.data.id, isBatch: 0 });
    };
    //选择某个联姻
    AdultMarryRequestView.prototype.doChoose = function (event) {
        this._selectChildData = event.data;
        ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSECHILDVIEW, { childInfo: event.data.childInfo, confirmCallback: this.selectMarryHander, handler: this });
    };
    //刷新列表
    AdultMarryRequestView.prototype.doRefresh = function (event) {
        this.request(NetRequestConst.REQUEST_RADULT_GETPROPOSEE, null);
    };
    //选好了道具
    AdultMarryRequestView.prototype.selectMarryHander = function (type) {
        this.doRefresh(null);
    };
    AdultMarryRequestView.prototype.refuseAllHandler = function () {
        if (!this._scrollList.getItemByIndex(0)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("adultEmptyTip2"));
            return;
        }
        this.request(NetRequestConst.REQUEST_RADULT_REFUSEPROPOSE, { isBatch: 1 });
    };
    AdultMarryRequestView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    // protected getTabbarTextArr():Array<string>
    // {
    // 	return ["wifeViewTab1Title",
    // 			"wifeViewTab2Title"
    // 	];
    // }
    // protected getRuleInfo():string
    // {
    // 	return "wife_description";
    // }
    AdultMarryRequestView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ADULT_REFUSEMARRY, this.doRefuse, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CHOOSECHILD, this.doChoose, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ADULT_REFRESHCHILDMARRY, this.doRefresh, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CLOSECHOOSE, this.hide, this);
        // 未婚滑动列表
        this._scrollList = null;
        this._confirmCallback = null;
        this._handler = null;
        this._timeTF = null;
        this._selectChildData = null;
        _super.prototype.dispose.call(this);
    };
    return AdultMarryRequestView;
}(CommonView));
__reflect(AdultMarryRequestView.prototype, "AdultMarryRequestView");
//# sourceMappingURL=AdultMarryRequestView.js.map