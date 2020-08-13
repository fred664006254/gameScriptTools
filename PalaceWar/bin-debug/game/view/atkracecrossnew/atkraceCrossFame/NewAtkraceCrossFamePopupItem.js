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
* 江湖声望单个头衔 item
* date 2020.7.8
* author ycg
* @name NewAtkraceCrossFamePopupItem
*/
var NewAtkraceCrossFamePopupItem = /** @class */ (function (_super) {
    __extends(NewAtkraceCrossFamePopupItem, _super);
    function NewAtkraceCrossFamePopupItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._itemIndex = 0;
        _this._headEmptContainer = null;
        _this._headContainer = null;
        _this._nameContainer = null;
        return _this;
    }
    Object.defineProperty(NewAtkraceCrossFamePopupItem.prototype, "code", {
        get: function () {
            return Api.atkracecrossVoApi.newcrossCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewAtkraceCrossFamePopupItem.prototype, "aid", {
        get: function () {
            return "newCrossServerAtkRace";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewAtkraceCrossFamePopupItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    NewAtkraceCrossFamePopupItem.prototype.initItem = function (index, data, param) {
        this._itemIndex = index;
        this._data = data;
        var isFirst = false;
        var scale = 0.75;
        if (data.lineNum == 1 && data.isFirst) {
            scale = 1;
            isFirst = true;
        }
        this.width = 103 * scale;
        this.height = 100 * scale + 30;
        var headEmptContainer = new BaseDisplayObjectContainer();
        headEmptContainer.width = 103;
        headEmptContainer.height = 100;
        var bg = BaseBitmap.create("head_circle_bg");
        headEmptContainer.addChild(bg);
        var head = BaseBitmap.create("user_head999");
        head.y = -7;
        head.setScale(2 / 3);
        headEmptContainer.addChild(head);
        this._headEmptContainer = headEmptContainer;
        headEmptContainer.setScale(scale);
        this.addChild(headEmptContainer);
        var headContainer = new BaseDisplayObjectContainer();
        headContainer.width = 103;
        headContainer.height = 100;
        headContainer.setScale(scale);
        this.addChild(headContainer);
        this._headContainer = headContainer;
        var alphaBg = BaseBitmap.create("public_alphabg");
        alphaBg.width = this.width;
        alphaBg.height = this.height;
        this.addChild(alphaBg);
        alphaBg.addTouchTap(this.titleClick, this, [index + 1]);
        var nameContainer = new BaseDisplayObjectContainer();
        this.addChild(nameContainer);
        nameContainer.visible = false;
        this._nameContainer = nameContainer;
        var nameSize = 14;
        var nameBg = BaseBitmap.create("newcrossatkrace_titlenamebg");
        nameBg.name = "nameBg";
        if (isFirst) {
            nameBg.width = nameBg.width + 40;
            nameBg.height = 20;
            nameSize = 18;
        }
        nameContainer.addChild(nameBg);
        nameContainer.width = nameBg.width;
        nameContainer.height = nameBg.height;
        nameContainer.setPosition(this.width / 2 - nameBg.width / 2 - 5, this.height - 25);
        var name = ComponentManager.getTextField("", nameSize, TextFieldConst.COLOR_LIGHT_YELLOW);
        name.setPosition(nameBg.x + nameBg.width / 2 - name.width / 2, nameBg.y + nameBg.height / 2 - name.height / 2);
        nameContainer.addChild(name);
        name.name = "name";
        this.update();
    };
    NewAtkraceCrossFamePopupItem.prototype.update = function () {
        var lineNum = this._data.lineNum;
        var mapInfo = Api.atkracecrossVoApi.getFameMapInfoByFloor(lineNum);
        if (!mapInfo) {
            return;
        }
        var data = mapInfo[this._itemIndex];
        if (data.uid) {
            this._headEmptContainer.visible = false;
            this._nameContainer.visible = true;
            this._headContainer.visible = true;
            var nameBg = this._nameContainer.getChildByName("nameBg");
            var name_1 = this._nameContainer.getChildByName("name");
            if (data.uid == Api.playerVoApi.getPlayerID()) {
                name_1.setColor(TextFieldConst.COLOR_WARN_YELLOW);
            }
            else {
                name_1.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
            }
            name_1.text = data.name;
            name_1.x = nameBg.x + nameBg.width / 2 - name_1.width / 2;
            name_1.y = nameBg.y + nameBg.height / 2 - name_1.height / 2;
            var headContainer = this._headContainer.getChildByName("headContainer");
            if (headContainer) {
                headContainer.dispose();
            }
            headContainer = Api.playerVoApi.getPlayerCircleHead(data.pic, data.ptitle);
            this._headContainer.addChild(headContainer);
            headContainer.name = "headContainer";
        }
        else {
            this._headEmptContainer.visible = true;
            this._nameContainer.visible = false;
            this._headContainer.visible = false;
        }
    };
    NewAtkraceCrossFamePopupItem.prototype.titleClick = function (evt, index) {
        App.LogUtil.log("titleClick " + index);
        if (this.vo && !this.vo.isInActivity()) {
            this.vo.showAcEndTip();
            return;
        }
        var mapInfo = Api.atkracecrossVoApi.getFameMapInfoByFloor(this._data.lineNum);
        var uid = null;
        if (mapInfo && mapInfo[this._itemIndex] && Object.keys(mapInfo[this._itemIndex]).length > 0) {
            //席位有人
            var info = mapInfo[this._itemIndex];
            uid = info.uid;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.NEWATKRACECROSSFAMEHOLDPOPUPVIEW, { data: this._data, index: this._itemIndex, uid: uid, aid: this.aid, code: this.code });
    };
    NewAtkraceCrossFamePopupItem.prototype.playAni = function () {
        //     let lineNum = this._data.lineNum;
        //     let mapInfo = Api.sixsection1VoApi.getTitleInfoByFloor(lineNum);
        //     let data = mapInfo[this._itemIndex];
        //     let container = this._headEmptContainer;
        //     if (data.uid){
        //         container = this._headContainer;
        //     }
        //     let time = 400;
        //     let scale = container.scaleX;
        //     let bigScale = scale + 0.1;
        //     egret.Tween.get(container, {loop:false}).to({scaleX: bigScale, scaleY: bigScale}, time).to({scaleX: scale, scaleY: scale, alpha: 0.5}, time).to({scaleX: bigScale, scaleY: bigScale, alpha: 1}, time).to({scaleX: scale, scaleY: scale}, time);
    };
    NewAtkraceCrossFamePopupItem.prototype.getSpaceX = function () {
        return 0;
    };
    NewAtkraceCrossFamePopupItem.prototype.getSpaceY = function () {
        return 0;
    };
    NewAtkraceCrossFamePopupItem.prototype.dispose = function () {
        this._itemIndex = 0;
        this._data = null;
        this._headContainer = null;
        this._headEmptContainer = null;
        this._nameContainer = null;
        _super.prototype.dispose.call(this);
    };
    return NewAtkraceCrossFamePopupItem;
}(ScrollListItem));
//# sourceMappingURL=NewAtkraceCrossFamePopupItem.js.map