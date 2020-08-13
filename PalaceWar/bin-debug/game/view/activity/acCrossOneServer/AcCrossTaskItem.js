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
var AcCrossTaskItem = /** @class */ (function (_super) {
    __extends(AcCrossTaskItem, _super);
    function AcCrossTaskItem() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcCrossTaskItem.prototype, "Vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.data.aid, this.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossTaskItem.prototype.initItem = function (index, data, param) {
        this.data = data;
        this.width = 510;
        var l = this.data.rewards.split("|").length;
        this.height = Math.floor((l - 1) / 5) * 88 + 208;
        var _bg = BaseLoadBitmap.create("public_popupscrollitembg");
        this.addChild(_bg);
        _bg.height = this.height - 6;
        _bg.y = 4;
        var _titleBg = BaseLoadBitmap.create("ackite_tasktitlebg-1");
        _titleBg.width = 490;
        this.addChild(_titleBg);
        _titleBg.setPosition((this.width - _titleBg.width) / 2, 0);
        var _titleLabel = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText5", ["" + this.data.powerAdd]), 22, 0x3e1f0f);
        this.addChild(_titleLabel);
        _titleLabel.width = 510;
        _titleLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        _titleLabel.y = 8;
        var _itemBg = BaseLoadBitmap.create("public_scrolllistbg");
        _itemBg.width = 490;
        _itemBg.height = Math.floor((l - 1) / 5) * 88 + 94;
        this.addChild(_itemBg);
        _itemBg.setPosition((this.width - _itemBg.width) / 2, 42);
        var _icons = GameData.getRewardItemIcons(this.data.rewards, true, true);
        for (var i = 0; i < _icons.length; i++) {
            var _icon = _icons[i];
            this.addChild(_icon);
            _icon.setPosition(i % 5 * 95 + 22, Math.floor(i / 5) * 88 + 48);
            _icon.setScale(84 / _icon.width);
        }
        this._progressbar = ComponentManager.getProgressBar("progress7", "progress7_bg", 344);
        this.addChild(this._progressbar);
        this._progressbar.setPosition(14, Math.floor((l - 1) / 5) * 88 + 154);
        this._progressbar.setText(this.data.powerNow + "/" + this.data.powerAdd);
        this._progressbar.setPercentage(this.data.powerNow / this.data.powerAdd);
        if (this.data.status == 1) {
            var _getIcon = BaseLoadBitmap.create("collectflag");
            this.addChild(_getIcon);
            _getIcon.width = 128;
            _getIcon.height = 84;
            _getIcon.setPosition(361, Math.floor((l - 1) / 5) * 88 + 118);
        }
        else {
            var _getText = this.data.status == 3 ? "acCrossOneServerText6" : "acCrossOneServerText23";
            this._getBtn = ComponentManager.getButton(this.data.status == 3 ? "btn2_small_yellow" : "btn2_small_red", _getText, this.getRews, this);
            this.addChild(this._getBtn);
            this._getBtn.setPosition(362, Math.floor((l - 1) / 5) * 88 + 142);
            if (this.data.status == 2) {
                this._getBtn.setGray(this.Vo.checkIsInEndShowTime());
            }
            // this._getBtn.setGray(this.data.status == 2);
        }
    };
    AcCrossTaskItem.prototype.getRews = function () {
        if (this.Vo.isEnd) {
            // ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            //     title: "itemUseConstPopupViewTitle",
            //     msg: LanguageManager.getlocal("acCrossOneServerText19"),
            //     callback:()=>{
            //         ViewController.getInstance().hideView(ViewConst.COMMON.ACACTIVITYEXCHANGEVIEW);
            //     },
            //     handler: this
            // });
            // App.CommonUtil.showTip(LanguageManager.getlocal("acCrossOneServerText19"));
            this.Vo.showAcEndTip();
            return;
        }
        if (this.data.status == 2) {
            if (this.Vo.checkIsInEndShowTime()) {
                this.Vo.showAcEndTip();
                return;
            }
            var _sid = this.Vo.config.servant;
            if (Api.servantVoApi.getServantInfoList()[_sid]) {
                ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, _sid);
            }
            else {
                // ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                //     title: "itemUseConstPopupViewTitle",
                //     msg: LanguageManager.getlocal("acCrossOneServerText24"),
                //     handler: this
                // });
                App.CommonUtil.showTip(LanguageManager.getlocal("acCrossOneServerText24"));
            }
            // 
        }
        if (this.data.status != 3) {
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_ACCROSSONESERVER_GETREW, {
            "activeId": this.data.aid + "-" + this.data.code,
            "rkey": this.data.rkey
        });
    };
    AcCrossTaskItem.prototype.dispose = function () {
        this.data = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossTaskItem;
}(ScrollListItem));
//# sourceMappingURL=AcCrossTaskItem.js.map