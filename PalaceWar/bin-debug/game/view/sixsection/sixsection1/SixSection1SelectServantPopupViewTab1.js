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
/**
* 门客选择
* date 2020.
* author ycg
* @name SixSection1SelectServantPopupViewTab1
*/
var SixSection1SelectServantPopupViewTab1 = /** @class */ (function (_super) {
    __extends(SixSection1SelectServantPopupViewTab1, _super);
    function SixSection1SelectServantPopupViewTab1(data) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._servantData = [];
        _this._selList = [];
        _this.param = data;
        _this.initView();
        return _this;
    }
    SixSection1SelectServantPopupViewTab1.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_SELSERVANT_REFRESH, this.selServantRefresh, this);
        this.width = 530;
        this.height = 400;
        var bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 360;
        bg.x = 26;
        bg.y = 0;
        this.addChild(bg);
        var servantList = this.freshServantListData();
        this._servantData = servantList;
        var scrollList = ComponentManager.getScrollList(SixSection1SelectServantScrollItem1, servantList, new egret.Rectangle(0, 0, 510, 350), { callback: this.isCanSel, obj: this });
        scrollList.setPosition(bg.x + 10, bg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    };
    SixSection1SelectServantPopupViewTab1.prototype.freshServantListData = function () {
        var list = [];
        // let servantList = Api.sixsection1VoApi.getServantInfoIdListWithSort();
        var servantList = Api.sixsection1VoApi.getSortServantList();
        var useList = [];
        for (var i = 0; i < servantList.length; i++) {
            if (Api.sixsection1VoApi.isUsedServant(servantList[i])) {
                useList.push(servantList[i]);
            }
            else {
                list.push(servantList[i]);
            }
        }
        var data = list.concat(useList);
        return data;
    };
    //派遣
    SixSection1SelectServantPopupViewTab1.prototype.selServantRefresh = function (evt) {
        if (evt && evt.data) {
            if (evt.data.type == "servant") {
                var isFind = false;
                var index = this._selList.length > 0 ? this._selList.length : 0;
                ;
                for (var i = 0; i < this._selList.length; i++) {
                    if (this._selList[i] && this._selList[i] < 0) {
                        this._selList[i] = Number(evt.data.id);
                        isFind = true;
                        index = i;
                        break;
                    }
                }
                if (!isFind) {
                    this._selList[index] = Number(evt.data.id);
                }
            }
        }
    };
    //取消派遣
    SixSection1SelectServantPopupViewTab1.prototype.cancelSelServant = function (id) {
        for (var i = 0; i < this._selList.length; i++) {
            if (id == this._selList[i]) {
                this._selList[i] = -1;
            }
        }
        var index = 0;
        for (var i = 0; i < this._servantData.length; i++) {
            if (id == Number(this._servantData[i])) {
                index = i;
                break;
            }
        }
        var item = this._scrollList.getItemByIndex(index);
        item.update(false);
    };
    SixSection1SelectServantPopupViewTab1.prototype.isCanSel = function () {
        var count = 0;
        for (var i = 0; i < this._selList.length; i++) {
            if (this._selList[i] > 0) {
                count += 1;
            }
        }
        if (count >= 5) {
            return false;
        }
        return true;
    };
    SixSection1SelectServantPopupViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_SELSERVANT_REFRESH, this.selServantRefresh, this);
        this._scrollList = null;
        this._servantData = [];
        this._selList = [];
        _super.prototype.dispose.call(this);
    };
    return SixSection1SelectServantPopupViewTab1;
}(CommonViewTab));
//# sourceMappingURL=SixSection1SelectServantPopupViewTab1.js.map