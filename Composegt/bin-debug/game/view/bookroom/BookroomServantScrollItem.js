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
 * 任务列表节点
 * author yanyuling
 * date 2017/10/28
 * @class BookroomServantScrollItem
 */
var BookroomServantScrollItem = (function (_super) {
    __extends(BookroomServantScrollItem, _super);
    function BookroomServantScrollItem() {
        var _this = _super.call(this) || this;
        _this._servantId = "";
        return _this;
    }
    BookroomServantScrollItem.prototype.initItem = function (index, servantId) {
        // this._cardType = cardFrom;
        this._servantId = servantId;
        var servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        var bottomBg = BaseBitmap.create("public_listbg"); //public_9_probiginnerbg
        bottomBg.width = 510;
        bottomBg.height = 125;
        bottomBg.x = 9;
        this.addChild(bottomBg);
        var leftBg = BaseBitmap.create("public_left");
        leftBg.width = 139;
        leftBg.height = 106.5;
        leftBg.x = 15;
        leftBg.y = 5.5;
        this.addChild(leftBg);
        var deltaScale = 0.55;
        var cardbg = BaseLoadBitmap.create(servantInfoObj.qualityBoxImgPath);
        cardbg.width = 194;
        cardbg.height = 192;
        cardbg.setScale(deltaScale);
        cardbg.x = 30;
        cardbg.y = 8;
        cardbg.name = "cardbg";
        this.addChild(cardbg);
        var servantImg = BaseLoadBitmap.create(servantInfoObj.halfImgPath);
        servantImg.width = 180;
        servantImg.height = 177;
        servantImg.x = cardbg.x + cardbg.width / 2 - servantImg.width / 2 - 5;
        servantImg.y = cardbg.y + cardbg.height / 2 - servantImg.height / 2 - 2;
        servantImg.setScale(deltaScale);
        this.addChild(servantImg);
        var nameBg = BaseBitmap.create("public_biaoti2");
        nameBg.width = 160;
        nameBg.x = 160;
        nameBg.y = 10;
        var nameTxt = ComponentManager.getTextField("", 20);
        nameTxt.textColor = TextFieldConst.COLOR_BROWN; //ServantScrollItem.getQualityColor(servantInfoObj.clv);
        nameTxt.text = servantInfoObj.servantName;
        nameTxt.x = nameBg.x + nameBg.width / 2 - nameTxt.width / 2; //140;
        nameTxt.y = nameBg.y + nameBg.height / 2 - nameTxt.height / 2; //30;
        this.addChild(nameBg);
        this.addChild(nameTxt);
        var skillExpTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        skillExpTxt.text = LanguageManager.getlocal("bookRoomServantSkillExp", [String(servantInfoObj.skillExp)]);
        // String(servantInfoObj.skillExp);
        skillExpTxt.x = nameBg.x;
        skillExpTxt.y = nameTxt.y + 50;
        this.addChild(skillExpTxt);
        // 
        if (Api.bookroomVoApi.isStudying(this._servantId)) {
            var flagTxt = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_BROWN);
            flagTxt.text = LanguageManager.getlocal("bookRoomServant_studyingTxt");
            flagTxt.x = bottomBg.x + bottomBg.width - 130;
            flagTxt.y = bottomBg.y + bottomBg.height / 2 - flagTxt.height / 2;
            ;
            this.addChild(flagTxt);
        }
        else {
            var studyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "bookRoomServant_study", this.studyHandler, this);
            studyBtn.x = bottomBg.x + bottomBg.width - 145;
            studyBtn.y = bottomBg.y + bottomBg.height / 2 - studyBtn.height / 2;
            this.addChild(studyBtn);
        }
    };
    BookroomServantScrollItem.prototype.studyHandler = function () {
        if (Api.bookroomVoApi.isStudying(this._servantId)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoomServant_studying"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_BOOKROOM_STUDY, {
            servantid: this._servantId,
            pos: BookroomServantScrollItem._posId,
            ismonthcard: BookroomServantScrollItem._cardType,
        });
    };
    BookroomServantScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    BookroomServantScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    BookroomServantScrollItem.prototype.dispose = function () {
        this._servantId = "";
        _super.prototype.dispose.call(this);
    };
    BookroomServantScrollItem._posId = 0;
    BookroomServantScrollItem._cardType = 0; //0 正常 ，1月卡，2年卡
    return BookroomServantScrollItem;
}(ScrollListItem));
__reflect(BookroomServantScrollItem.prototype, "BookroomServantScrollItem");
