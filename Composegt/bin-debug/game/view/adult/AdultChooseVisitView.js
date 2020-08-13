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
 * 联姻选择拜访对象弹窗
 * author 钱竣
 */
var AdultChooseVisitView = (function (_super) {
    __extends(AdultChooseVisitView, _super);
    function AdultChooseVisitView() {
        var _this = _super.call(this) || this;
        _this._list = null;
        return _this;
    }
    Object.defineProperty(AdultChooseVisitView.prototype, "cfg", {
        get: function () {
            return Config.SadunCfg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdultChooseVisitView.prototype, "api", {
        get: function () {
            return Api.adultVoApi;
        },
        enumerable: true,
        configurable: true
    });
    // private get acTivityId() : string{
    //     return `${AcWorldCupView.AID}-${AcWorldCupView.CODE}`;
    // }
    AdultChooseVisitView.prototype.getTitleStr = function () {
        return 'adultchoosevisitviewTitle';
    };
    // protected resetBgSize() : void{
    // 	if(this.getBgName() != "public_rule_bg")
    // 	{
    // 		this.closeBtn.y = this.viewBg.y - 40;
    // 		this.closeBtn.x = PlatformManager.hasSpcialCloseBtn()? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 40);
    // 	}
    // 	else
    // 	{
    // 		this.closeBtn.y = this.viewBg.y - 18;
    // 		this.closeBtn.x = PlatformManager.hasSpcialCloseBtn()? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 37);
    // 	}
    // }
    AdultChooseVisitView.prototype.getShowHeight = function () {
        return 860;
    };
    AdultChooseVisitView.prototype.initView = function () {
        var view = this;
        view.viewBg.width = 560;
        view.viewBg.height = 860;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_GETVISITME), this.getvisitCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_VISIT), view.visitCallback, this);
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SUDANFRESH,this.doRefresh,this);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.viewBg, view);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view.titleTF, view.viewBg, [0, 12]);
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 550;
        bg.height = 740;
        bg.x = this.viewBg.width / 2 - bg.width / 2;
        bg.y = 10;
        view.addChildToContainer(bg);
        var rbg = BaseBitmap.create("public_9v_bg02");
        rbg.width = bg.width - 20;
        rbg.height = bg.height - 20;
        rbg.setPosition(bg.x + (bg.width - rbg.width) / 2, bg.y + 10);
        this.addChildToContainer(rbg);
        // let bg : BaseBitmap = BaseBitmap.create("public_9_bg44");
        // bg.width = kuang.width - 10;
        // bg.height = kuang.height - 10;
        // view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bg, kuang);
        // view.addChild(bg);
        // let rbg:BaseBitmap = BaseBitmap.create("public_tc_bg03");
        // rbg.width = bg.width-20;
        // rbg.height = bg.height - 20;
        // rbg.setPosition(bg.x+(bg.width-rbg.width)/2,bg.y + 10);
        // this.addChild(rbg);
        var childInfo = Api.adultVoApi.getAdultInfoVoById(this.param.data.childId);
        this.request(NetRequestConst.REQUEST_SADUN_GETVISITME, { aquality: childInfo.aquality, sex: childInfo.sex });
        var tmpRect = new egret.Rectangle(0, 0, 530, bg.height - 20);
        var scrollList = ComponentManager.getScrollList(AdultPlayerInfoScrollItem, [], tmpRect);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, bg, [0, 15]);
        view.addChildToContainer(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal('adultnosadun'));
        view._list = scrollList;
    };
    AdultChooseVisitView.prototype.getvisitCallback = function (evt) {
        Api.adultVoApi.setVisitInfo(evt.data.data.data.visitedmelist);
    };
    //请求回调
    AdultChooseVisitView.prototype.receiveData = function (data) {
        if (!data.data.data) {
            return;
        }
        var laifanglist = data.data.data.visitedmelist;
        var qinjiainfo = Api.adultVoApi.getQinjiaInfo();
        var arr = [];
        for (var i in qinjiainfo) {
            var unit = qinjiainfo[i];
            if (unit.times >= Config.SadunCfg.needNum) {
                arr.push({
                    childid: this.param.data.childId,
                    uid: i,
                    name: unit.name,
                    pic: unit.pic,
                    level: unit.level,
                    power: unit.power,
                    mygname: unit.mygname,
                    offtime: unit.olt,
                    type: 'choosevisit',
                    friend: unit.friend,
                    title: unit.ptitle,
                    visiting: unit.visiting,
                    laifang: typeof laifanglist[unit.uid] != 'undefined' && laifanglist[unit.uid] == 1
                });
            }
        }
        arr.sort(function (a, b) {
            var inviista = Api.adultVoApi.isUidInVisit(a.uid);
            var inviistb = Api.adultVoApi.isUidInVisit(b.uid);
            var visiteda = a.laifang;
            var visitedb = b.laifang;
            if (visiteda && !visitedb) {
                return -1;
            }
            else if (visitedb && !visiteda) {
                return 1;
            }
            else {
                if (inviista && !inviistb) {
                    return 1;
                }
                else if (inviistb && !inviista) {
                    return -1;
                }
                else {
                    return b.friend - a.friend;
                }
            }
        });
        this._list.refreshData(arr);
    };
    AdultChooseVisitView.prototype.doRefresh = function () {
        var view = this;
    };
    AdultChooseVisitView.prototype.visitCallback = function (evt) {
        if (Number(evt.data.data.data.sadunstat)) {
            var id = Api.adultVoApi.getVisitId();
            var name_1 = '';
            if (id) {
                name_1 = Api.adultVoApi.getSadunInfoByUid(Api.adultVoApi.getVisitId()).name;
            }
            App.CommonUtil.showTip(LanguageManager.getlocal("adultvisittip" + Number(evt.data.data.data.sadunstat), [name_1]));
            return;
        }
        var view = this;
        var data = evt.data.data.data;
        if (view.param.data.confirmCallback) {
            view.param.data.confirmCallback.apply(view.param.data.handler, ['visitSuccess']);
        }
        view.hide();
        //App.CommonUtil.showTip(LanguageManager.getlocal('adultissendVisit'));
    };
    AdultChooseVisitView.prototype.dispose = function () {
        var view = this;
        view._list = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_GETVISITME), this.getvisitCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_VISIT), view.visitCallback, this);
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SUDANFRESH,this.doRefresh,this);
        _super.prototype.dispose.call(this);
    };
    return AdultChooseVisitView;
}(PopupView));
__reflect(AdultChooseVisitView.prototype, "AdultChooseVisitView");
