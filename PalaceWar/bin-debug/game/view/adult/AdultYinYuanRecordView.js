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
 * 姻缘记录
 * author 钱竣
 */
var AdultYinYuanRecordView = (function (_super) {
    __extends(AdultYinYuanRecordView, _super);
    function AdultYinYuanRecordView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AdultYinYuanRecordView.prototype, "cfg", {
        get: function () {
            return Config.SadunCfg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdultYinYuanRecordView.prototype, "api", {
        get: function () {
            return Api.adultVoApi;
        },
        enumerable: true,
        configurable: true
    });
    AdultYinYuanRecordView.prototype.getTitleStr = function () {
        var type = this.param.data.type;
        return type == 'marry' ? 'adultMarryOnsundan' : 'adultyinyuanrecord';
    };
    AdultYinYuanRecordView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "friends_seprate_bg", "friends_arrow2"
        ]);
    };
    AdultYinYuanRecordView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        if (this.getBgName() != "public_rule_bg") {
            this.closeBtn.y = this.viewBg.y - 15;
            this.closeBtn.x = PlatformManager.hasSpcialCloseBtn() ? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 15);
        }
        else {
            this.closeBtn.y = this.viewBg.y - 18;
            this.closeBtn.x = PlatformManager.hasSpcialCloseBtn() ? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 37);
        }
    };
    AdultYinYuanRecordView.prototype.getRequestData = function () {
        var childInfo = Api.adultVoApi.getAdultInfoVoById(this.param.data.childid);
        if (childInfo) {
            return { requestType: NetRequestConst.REQUEST_SADUN_GETVISITME, requestData: { aquality: childInfo.aquality, sex: childInfo.sex } };
        }
        else {
            return null;
        }
    };
    AdultYinYuanRecordView.prototype.receiveData = function (data) {
        if (data.ret) {
            Api.adultVoApi.setVisitInfo(data.data.data.visitedmelist);
        }
    };
    AdultYinYuanRecordView.prototype.initView = function () {
        var view = this;
        var type = view.param.data.type;
        view.viewBg.height = 863;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CHOOSE_SADUNMARRY, this.chooseSadunMarry, this);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.viewBg, view);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view.titleTF, view.viewBg, [0, 12]);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 770;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view.viewBg, [0, 70]);
        view.addChild(bg);
        var arr = [];
        var info = Api.adultVoApi.getALlMarryPlayerInfo();
        // let len = info.sadun.length + info.notsadun.length;
        // //let info = Api.adultVoApi.getALlMarryPlayerInfo();
        // arr.push({
        // 	index : 0,
        // 	param : 'sadun',
        // 	type : type,
        // 	show : true,
        // 	start : true,
        // 	empty1 : info.sadun.length == 0 
        // });
        // let temp1 = [];
        // for(let i in info.sadun){
        // 	let unit = info.sadun[i];
        // 	temp1.push({
        // 		index : Number(i) + 1,
        // 		param : 'sadun',
        // 		type : type,
        // 		show : true,
        // 		childid : this.param.data.childid,
        // 		uid : unit.uid,
        // 		name : unit.name,
        // 		pic : unit.pic,
        // 		level : unit.level,
        // 		power : unit.power,
        // 		mygname : unit.mygname,
        // 		offtime : unit.olt,//olt
        // 		friend : unit.friend,
        // 		title : unit.ptitle,
        // 		start : false
        // 	});
        // }
        // temp1.sort((a,b)=>{
        // 	return b.friend - a.friend;
        // });
        // arr = arr.concat(temp1);
        // arr.push({
        // 	index : 0,
        // 	param : 'notsadun',
        // 	type : type,
        // 	show : true,
        // 	start : true,
        // 	empty2 : info.notsadun.length == 0
        // });
        // let temp = [];
        // for(let i in info.notsadun){
        // 	let unit = info.notsadun[i];
        // 	temp.push({
        // 		index : Number(i),
        // 		param : 'notsadun',
        // 		type : type,
        // 		show : true,
        // 		childid : this.param.data.childid,
        // 		uid : unit.uid,
        // 		name : unit.name,
        // 		pic : unit.pic,
        // 		level : unit.level,
        // 		power : unit.power,
        // 		mygname : unit.mygname,
        // 		offtime : unit.olt,//olt
        // 		friend : unit.friend,
        // 		title : unit.ptitle,
        // 		start : Number(i) == 0
        // 	});
        // }
        // temp.sort((a,b)=>{
        // 	return Api.adultVoApi.getLyinnum(b.uid) - Api.adultVoApi.getLyinnum(a.uid);
        // });
        // arr = arr.concat(temp);
        for (var i = 0; i < 2; ++i) {
            // let unit = view.cfg.odds[i];
            arr.push({
                index: Number(i),
                param: i == 0 ? 'sadun' : 'notsadun',
                type: type,
                show: true,
                childid: this.param.data.childid
            });
        }
        var tmpRect = new egret.Rectangle(0, 0, 520, bg.height - 20);
        var scrollList = ComponentManager.getScrollList(AdultYinYuanRecordScrollItem, arr, tmpRect);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, bg, [0, 5]);
        view.addChild(scrollList);
        // view._list1 = scrollList; 
        // let separate2 = BaseBitmap.create('friends_seprate_bg');
        // separate2.width = 520;
        // view.setLayoutPosition(LayoutConst.horizontalCentertop, separate2, scrollList, [0,scrollList.height + 8]);
        // view.addChild(separate2);
        // let arrow2 = BaseBitmap.create('friends_arrow2');
        // arrow2.anchorOffsetX = arrow1.width / 2;
        // arrow2.anchorOffsetY = arrow1.height / 2;
        // arrow2.addTouchTap(view.arrow2click, view);
        // let qinjiaTxt2 = ComponentManager.getTextField(LanguageManager.getlocal('adultyinyuanrecordTitle2'), 22, TextFieldConst.COLOR_WHITE);
        // let param2 = (separate1.width - arrow2.width - qinjiaTxt2.textWidth - 5) / 2;
        // view._arrow2 = arrow2;
        // view.setLayoutPosition(LayoutConst.leftverticalCenter, qinjiaTxt2, separate2, [param2, 0]);
        // view.addChild(qinjiaTxt2);
        // view.setLayoutPosition(LayoutConst.lefttop, arrow2, qinjiaTxt2, [qinjiaTxt2.textWidth + 5, 0]);
        // view.addChild(arrow2);
        // let arr2 = [];
        // for(let i = 0; i < info.notsadun.length; ++ i){
        //     // let unit = view.cfg.odds[i];
        //     arr2.push({
        //         uid : 1,
        //         name : "拉拉手老地方",
        //         pic : 1,
        //         level : 2,
        //         power : 109019,
        //         mygname : '',
        //         offtime : 0,//olt
        //         type : type,
        //         friend : 1092,
        //         title : Math.random() > 0.5 ? '4001' : ''
        //     });
        // }
        // let tmpRect2 =  new egret.Rectangle(0,0,520, bg.y + bg.height - separate2.y - separate2.height - 10);
        // let scrollList2 = ComponentManager.getScrollList(AdultPlayerInfoScrollItem, arr2, tmpRect2);
        // view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList2, separate2, [0, separate2.height + 3]);
        // view.addChild(scrollList2); 
        // view._list2 = scrollList2; 
    };
    AdultYinYuanRecordView.prototype.chooseSadunMarry = function (evt) {
        var data = evt.data;
        this.param.data.confirmCallback.apply(this.param.data.handler, [data.fuid]);
        this.hide();
    };
    AdultYinYuanRecordView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CHOOSE_SADUNMARRY, this.chooseSadunMarry, this);
        _super.prototype.dispose.call(this);
    };
    return AdultYinYuanRecordView;
}(PopupView));
__reflect(AdultYinYuanRecordView.prototype, "AdultYinYuanRecordView");
//# sourceMappingURL=AdultYinYuanRecordView.js.map