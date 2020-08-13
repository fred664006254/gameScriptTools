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
 * author qianjun
 * date 2017/10/31
 * @class AdultVisitRequestView
 */
var AdultVisitRequestView = (function (_super) {
    __extends(AdultVisitRequestView, _super);
    function AdultVisitRequestView() {
        return _super.call(this) || this;
    }
    AdultVisitRequestView.prototype.getTitleStr = function () {
        return "adultvisit";
    };
    AdultVisitRequestView.prototype.initView = function () {
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_REFUSEMARRY,this.doRefuse,this);
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CHOOSECHILD,this.doChoose,this);
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_REFRESHCHILDMARRY,this.doRefresh,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SUDANFRESH, this.doRefresh, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_REFUSEVISIT), this.refuseVisitCallback, this);
        //this.request(NetRequestConst.REQUEST_RADULT_GETPROPOSEE,null);
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
        // let arr = [];
        // let info = Api.adultVoApi.getVisitRequestList();
        // for(let i in info){
        // 	let unit = info[i];
        // 	arr.push({
        // 		id : unit.childId,
        // 		visit : true,
        // 		sex : unit.sex,
        // 		aquality : unit.aquality,
        // 		name : unit.cname,
        // 		fatherName : unit.fname,
        // 		uid : i,
        // 		pro : 1,
        // 		et : unit.end_ts,
        // 		total : unit.attr[0] + unit.attr[1] + unit.attr[2] + unit.attr[3],
        // 	});
        // }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 5, GameConfig.stageWidth - 14, bottomBg.height - 20);
        this._scrollList = ComponentManager.getScrollList(AdultMarryRequestScrollItem, null, rect);
        this.addChildToContainer(this._scrollList);
        this.container.setLayoutPosition(LayoutConst.horizontalCentertop, this._scrollList, bottomBg, [0, 5]);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("adultnovisit"));
        // //一键拒绝
        // let allMarryBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"adultMarryRequestRefuseAll",this.refuseAllHandler,this);
        // this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, allMarryBtn, arena_bottom);
        // // allMarryBtn.
        // this.addChild(allMarryBtn);
        // allMarryBtn.setColor(TextFieldConst.COLOR_BLACK);
        var visitnum = Api.adultVoApi.getVisitNum();
        var visitnumTxt = ComponentManager.getTextField(LanguageManager.getlocal('adultvisitnum', [visitnum.toString(), Config.SadunCfg.maxReception.toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, visitnumTxt, arena_bottom);
        this._visitnumTxt = visitnumTxt;
        this.addChild(visitnumTxt);
        this.request(NetRequestConst.REQUEST_SADUN_GETINFO, null);
    };
    //请求回调
    AdultVisitRequestView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        // if(data.data && data.data.data&&data.data.data.minfo)
        // {
        // 	this.param.data.confirmCallback2.apply(this.param.data.handler,[1]);
        // }
        // else
        // {
        // 	this.param.data.confirmCallback2.apply(this.param.data.handler,[2]);
        // }
    };
    AdultVisitRequestView.prototype.refreshHandler = function () {
    };
    AdultVisitRequestView.prototype.refuseVisitCallback = function (evt) {
        if (evt.data.ret) {
            App.CommonUtil.showTip(LanguageManager.getlocal('adultrefusereceive', Api.adultVoApi.param));
        }
        //App.CommonUtil.showTip(LanguageManager.getlocal('adultrefusereceive'), []);
    };
    //拒绝某个联姻
    AdultVisitRequestView.prototype.doRefuse = function (event) {
        this._selectChildData = event.data;
        // ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSETYPEVIEW, { type: 2, childId: this._adultInfoVo.id,confirmCallback: this.selectMarryHander, handler: this });
        this.request(NetRequestConst.REQUEST_RADULT_REFUSEPROPOSE, { aid: event.data.id, isBatch: 0 });
    };
    //选择某个联姻
    AdultVisitRequestView.prototype.doChoose = function (event) {
        this._selectChildData = event.data;
        ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSECHILDVIEW, { childInfo: event.data.childInfo, confirmCallback: this.selectMarryHander, handler: this });
    };
    //刷新列表
    AdultVisitRequestView.prototype.doRefresh = function (event) {
        var view = this;
        var info = Api.adultVoApi.getVisitRequestList();
        var arr = [];
        for (var i in info) {
            var unit = info[i];
            arr.push({
                id: unit.childId,
                visittype: true,
                sex: unit.sex,
                aquality: unit.aquality,
                name: unit.cname,
                fatherName: unit.fname,
                uid: i,
                pro: 1,
                et: unit.end_ts,
                attr: unit.attr,
                total: unit.attr[0] + unit.attr[1] + unit.attr[2] + unit.attr[3]
            });
        }
        arr.sort(function (a, b) {
            return a.et - b.et;
        });
        this._scrollList.refreshData(arr);
        this._visitnumTxt.text = LanguageManager.getlocal('adultvisitnum', [Api.adultVoApi.getVisitNum().toString(), Config.SadunCfg.maxReception.toString()]);
        //this.request(NetRequestConst.REQUEST_RADULT_GETPROPOSEE,null);
    };
    //选好了道具
    AdultVisitRequestView.prototype.selectMarryHander = function (type) {
        this.doRefresh(null);
    };
    AdultVisitRequestView.prototype.refuseAllHandler = function () {
        if (!this._scrollList.getItemByIndex(0)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("adultEmptyTip2"));
            return;
        }
        this.request(NetRequestConst.REQUEST_RADULT_REFUSEPROPOSE, { isBatch: 1 });
    };
    AdultVisitRequestView.prototype.chooseOneCallBack = function (type) {
        // App.LogUtil.log(type);
    };
    AdultVisitRequestView.prototype.hide = function () {
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
    AdultVisitRequestView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SUDANFRESH, this.doRefresh, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_REFUSEVISIT), this.refuseVisitCallback, this);
        // 未婚滑动列表
        this._scrollList = null;
        this._selectChildData = null;
        this._visitnumTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AdultVisitRequestView;
}(CommonView));
__reflect(AdultVisitRequestView.prototype, "AdultVisitRequestView");
//# sourceMappingURL=AdultVisitRequestView.js.map