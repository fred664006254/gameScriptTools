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
var AdultChooseReceiveView = (function (_super) {
    __extends(AdultChooseReceiveView, _super);
    function AdultChooseReceiveView() {
        var _this = _super.call(this) || this;
        _this._list = null;
        return _this;
    }
    Object.defineProperty(AdultChooseReceiveView.prototype, "cfg", {
        get: function () {
            return Config.SadunCfg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdultChooseReceiveView.prototype, "api", {
        get: function () {
            return Api.adultVoApi;
        },
        enumerable: true,
        configurable: true
    });
    // private get acTivityId() : string{
    //     return `${AcWorldCupView.AID}-${AcWorldCupView.CODE}`;
    // }wifestatus_headbg
    AdultChooseReceiveView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifestatus_headbg", "wifestatus_headmask", "adult_listbg",
        ]);
    };
    AdultChooseReceiveView.prototype.getTitleStr = function () {
        return 'adultChooseReceive';
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
    AdultChooseReceiveView.prototype.initView = function () {
        var view = this;
        view.viewBg.width = 540;
        view.viewBg.height = 850;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_AGREEVISIT), view.agreevisitCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SUDANFRESH, this.doRefresh, this);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.viewBg, view);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view.titleTF, view.viewBg, [0, 12]);
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 530;
        bg.height = 710;
        // view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view.viewBg, [0,60]);
        // view.addChild(bg);
        bg.x = this.viewBg.width / 2 - bg.width / 2;
        bg.y = 10;
        view.addChildToContainer(bg);
        // let bg : BaseBitmap = BaseBitmap.create("public_9_bg44");
        // bg.width = kuang.width - 10;
        // bg.height = kuang.height - 10;
        // view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bg, kuang);
        // view.addChild(bg);
        var wifeInfo = Api.wifeVoApi.getWifeInfoVoList();
        var arr = [];
        for (var i in wifeInfo) {
            var unit = wifeInfo[i];
            arr.push({
                childInfo: this.param.data.childInfo,
                wifeid: unit.id,
                name: unit.name,
                level: Api.wifestatusVoApi.getWifestatusLevelById(unit.id.toString()),
                isinreceive: Api.adultVoApi.judgeWifeIsInReceive(unit.id)
            });
        }
        arr.sort(function (a, b) {
            if (a.isinreceive && !b.isinreceive) {
                return 1;
            }
            else if (!a.isinreceive && b.isinreceive) {
                return -1;
            }
            else {
                return b.level - a.level;
            }
        });
        var tmpRect = new egret.Rectangle(0, 0, 520, bg.height - 20);
        var scrollList = ComponentManager.getScrollList(AdultReceiveScrollItem, arr, tmpRect);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, bg, [0, 10]);
        view.addChildToContainer(scrollList);
        view._list = scrollList;
        var nameTxt = ComponentManager.getTextField(LanguageManager.getlocal('adultReceiveTip'), 20, TextFieldConst.COLOR_BROWN);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, nameTxt, view.viewBg, [0, 50]);
        view.addChild(nameTxt);
    };
    AdultChooseReceiveView.prototype.agreevisitCallback = function (evt) {
        var view = this;
        if (evt.data.data.ret >= 0) {
            var wifeInfo = Api.wifeVoApi.getWifeInfoVoList();
            var arr = [];
            for (var i in wifeInfo) {
                var unit_1 = wifeInfo[i];
                arr.push({
                    childInfo: this.param.data.childInfo,
                    wifeid: unit_1.id,
                    name: unit_1.name,
                    level: Api.wifestatusVoApi.getWifestatusLevelById(unit_1.id.toString()),
                    isinreceive: Api.adultVoApi.judgeWifeIsInReceive(unit_1.id)
                });
            }
            arr.sort(function (a, b) {
                if (a.isinreceive && !b.isinreceive) {
                    return 1;
                }
                else if (!a.isinreceive && b.isinreceive) {
                    return -1;
                }
                else {
                    return b.level - a.level;
                }
            });
            this._list.refreshData(arr);
            // this._visitTxt.text = LanguageManager.getlocal('adultreceivetxt', [Api.adultVoApi.getSadunInfoByUid(Api.adultVoApi.getVisitId()).name]);
            // this._visitGroup.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._visitTxt, this._descBg);
            //view._visitGroup.alpha = 1;
            //egret.Tween.get(this._visitGroup).to({alpha : 1},1).wait(3000).to({alpha : 0}, 3000);
            var unit = Api.adultVoApi.getReceiveWifeInfo();
            ViewController.getInstance().openView(ViewConst.BASE.ADULTVISITSUCCESSVIEW, {
                wifename: unit.wifename,
                childname: unit.childname,
                attr: unit.attr,
                confirmCallback: view.hide,
                handler: view,
                type: 'receiveSuccess'
            });
        }
        else {
            var str = '';
            switch (evt.data.data.data.sadunstat) {
                case 'overtime':
                    str = LanguageManager.getlocal('adultcancelovertime');
                    break;
                default:
                    str = LanguageManager.getlocal('adulthavecancel');
                    break;
            }
            App.CommonUtil.showTip(str);
            this.request(NetRequestConst.REQUEST_SADUN_GETINFO, null);
            this.hide();
        }
    };
    AdultChooseReceiveView.prototype.doRefresh = function () {
        var wifeInfo = Api.wifeVoApi.getWifeInfoVoList();
        var arr = [];
        for (var i in wifeInfo) {
            var unit = wifeInfo[i];
            arr.push({
                childInfo: this.param.data.childInfo,
                wifeid: unit.id,
                name: unit.name,
                level: Api.wifestatusVoApi.getWifestatusLevelById(unit.id.toString()),
                isinreceive: Api.adultVoApi.judgeWifeIsInReceive(unit.id)
            });
        }
        arr.sort(function (a, b) {
            if (a.isinreceive && !b.isinreceive) {
                return 1;
            }
            else if (!a.isinreceive && b.isinreceive) {
                return -1;
            }
            else {
                return b.level - a.level;
            }
        });
        this._list.refreshData(arr);
    };
    AdultChooseReceiveView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SADUN_AGREEVISIT), this.agreevisitCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SUDANFRESH, this.doRefresh, this);
        this._list = null;
        _super.prototype.dispose.call(this);
    };
    return AdultChooseReceiveView;
}(PopupView));
__reflect(AdultChooseReceiveView.prototype, "AdultChooseReceiveView");
