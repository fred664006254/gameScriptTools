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
            "public_listbtn", "friends_arrow2", "progress_type1_yellow2", "progress_type3_bg",
        ]);
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
    AdultYinYuanRecordView.prototype.initView = function () {
        var view = this;
        var type = view.param.data.type;
        view.viewBg.height = 850;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CHOOSE_SADUNMARRY, this.chooseSadunMarry, this);
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
        var arr = [];
        var info = Api.adultVoApi.getALlMarryPlayerInfo();
        for (var i = 0; i < 2; ++i) {
            arr.push({
                index: Number(i),
                param: i == 0 ? 'sadun' : 'notsadun',
                type: type,
                show: true,
                childid: this.param.data.childid
            });
        }
        var tmpRect = new egret.Rectangle(0, 0, 530, bg.height - 20);
        var scrollList = ComponentManager.getScrollList(AdultYinYuanRecordScrollItem, arr, tmpRect);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, bg, [0, 10]);
        view.addChildToContainer(scrollList);
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
