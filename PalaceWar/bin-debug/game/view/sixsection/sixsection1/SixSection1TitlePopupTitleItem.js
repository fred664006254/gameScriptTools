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
* 兵部头衔 单个头衔 item
* date 2020.5.11
* author ycg
* @name SixSection1TitlePopupTitleItem
*/
var SixSection1TitlePopupTitleItem = (function (_super) {
    __extends(SixSection1TitlePopupTitleItem, _super);
    function SixSection1TitlePopupTitleItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._itemIndex = 0;
        _this._headEmptContainer = null;
        _this._headContainer = null;
        _this._nameContainer = null;
        return _this;
    }
    SixSection1TitlePopupTitleItem.prototype.initItem = function (index, data, param) {
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
        // let headContainer = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(), Api.playerVoApi.getPlayerPtitle());
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
        // else{
        //     headContainer = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(), Api.playerVoApi.getPlayerPtitle());
        // }
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
        var nameBg = BaseBitmap.create("sixsecton1_titlenamebg");
        nameBg.name = "nameBg";
        if (isFirst) {
            nameBg.width = nameBg.width + 40;
            nameBg.height = 20;
            nameSize = 18;
        }
        nameContainer.addChild(nameBg);
        nameContainer.width = nameBg.width;
        nameContainer.height = nameBg.height;
        nameContainer.setPosition(this.width / 2 - nameBg.width / 2, this.height - 25);
        var name = ComponentManager.getTextField("", nameSize, TextFieldConst.COLOR_LIGHT_YELLOW);
        name.setPosition(nameBg.x + nameBg.width / 2 - name.width / 2, nameBg.y + nameBg.height / 2 - name.height / 2);
        nameContainer.addChild(name);
        name.name = "name";
        this.update();
    };
    SixSection1TitlePopupTitleItem.prototype.update = function () {
        var lineNum = this._data.lineNum;
        var mapInfo = Api.sixsection1VoApi.getTitleInfoByFloor(lineNum);
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
    SixSection1TitlePopupTitleItem.prototype.titleClick = function (evt, index) {
        App.LogUtil.log("titleClick " + index);
        var mapInfo = Api.sixsection1VoApi.getTitleInfoByFloor(this._data.lineNum);
        var uid = null;
        var endTime = 0;
        var seatCfg = this._data.baseCfg;
        if (mapInfo && mapInfo[this._itemIndex] && Object.keys(mapInfo[this._itemIndex]).length > 0) {
            //席位有人
            var info = mapInfo[this._itemIndex];
            uid = info.uid;
            endTime = info.st + Math.ceil(info.remain * 3600 / seatCfg.influenceSpeed);
        }
        //判断时间是否已结束
        if (endTime > 0 && GameData.serverTime > endTime) {
            uid = null;
            //暂无资源
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1HoldSeatNotResTip"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.SIXSECTION1TITLEHOLDPOPUPVIEW, { data: this._data, index: this._itemIndex, uid: uid });
    };
    SixSection1TitlePopupTitleItem.prototype.playAni = function () {
        var lineNum = this._data.lineNum;
        var mapInfo = Api.sixsection1VoApi.getTitleInfoByFloor(lineNum);
        var data = mapInfo[this._itemIndex];
        var container = this._headEmptContainer;
        if (data.uid) {
            container = this._headContainer;
        }
        var time = 400;
        var scale = container.scaleX;
        var bigScale = scale + 0.1;
        egret.Tween.get(container, { loop: false }).to({ scaleX: bigScale, scaleY: bigScale }, time).to({ scaleX: scale, scaleY: scale, alpha: 0.5 }, time).to({ scaleX: bigScale, scaleY: bigScale, alpha: 1 }, time).to({ scaleX: scale, scaleY: scale }, time);
    };
    SixSection1TitlePopupTitleItem.prototype.getSpaceX = function () {
        return 0;
    };
    SixSection1TitlePopupTitleItem.prototype.getSpaceY = function () {
        return 0;
    };
    SixSection1TitlePopupTitleItem.prototype.dispose = function () {
        this._itemIndex = 0;
        this._data = null;
        this._headContainer = null;
        this._headEmptContainer = null;
        this._nameContainer = null;
        _super.prototype.dispose.call(this);
    };
    return SixSection1TitlePopupTitleItem;
}(ScrollListItem));
__reflect(SixSection1TitlePopupTitleItem.prototype, "SixSection1TitlePopupTitleItem");
//# sourceMappingURL=SixSection1TitlePopupTitleItem.js.map