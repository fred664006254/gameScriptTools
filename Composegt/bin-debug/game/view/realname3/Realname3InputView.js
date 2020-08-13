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
var Realname3InputView = (function (_super) {
    __extends(Realname3InputView, _super);
    function Realname3InputView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nameInput = null;
        _this.idInput = null;
        return _this;
    }
    Realname3InputView.prototype.initView = function () {
        var nameInput = new BaseTextField();
        nameInput.type = egret.TextFieldType.INPUT;
        nameInput.width = 360;
        nameInput.height = 42;
        this.addChild(nameInput);
        this.nameInput = nameInput;
        var idInput = new BaseTextField();
        idInput.type = egret.TextFieldType.INPUT;
        idInput.width = 360;
        idInput.height = 42;
        this.addChild(idInput);
        this.idInput = idInput;
        this.goButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.goButtonClick, this);
        this.addChild(this.goButton);
    };
    Realname3InputView.prototype.goButtonClick = function () {
        var nameStr = this.nameInput.text.trim();
        var idStr = this.idInput.text.trim();
        console.log("goButtonClick", nameStr, idStr);
        if ((!App.CommonUtil.isCardNo(idStr)) || (!App.CommonUtil.isTrueName(nameStr))) {
            App.CommonUtil.showTip(LanguageManager.getlocal("realname_noid"));
            return;
        }
        this.request(NetRequestConst.REQUEST_OTHERINFO_IDCARDVERIFY, { idcardname: nameStr, idcardnum: idStr });
    };
    Realname3InputView.prototype.receiveData = function (data) {
        if (data.ret) {
            App.CommonUtil.showTip(LanguageManager.getlocal("realname_ok"));
            var rewards = data.data.data.rewards;
            var rewardList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardList);
            this.hide();
        }
    };
    Realname3InputView.prototype.getCloseBtnName = function () {
        return "btn_lantern";
    };
    Realname3InputView.prototype.getTitleBgName = function () {
        return "";
    };
    Realname3InputView.prototype.initBg = function () {
        this.viewBg = BaseBitmap.create("realname3_bg2");
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    Realname3InputView.prototype.resetBgSize = function () {
        this.closeBtn.setPosition(this.viewBg.x + 460, this.viewBg.y);
        this.nameInput.x = this.viewBg.x + 140;
        this.nameInput.y = this.viewBg.y + 260;
        this.idInput.x = this.viewBg.x + 140;
        this.idInput.y = this.viewBg.y + 350;
        this.goButton.x = this.viewBg.x + this.viewBg.width / 2 - this.goButton.width / 2;
        this.goButton.y = this.viewBg.y + this.viewBg.height - 78 - this.goButton.height / 2;
    };
    Realname3InputView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["realname3_bg2"]);
    };
    Realname3InputView.prototype.getTitleStr = function () {
        return null;
    };
    Realname3InputView.prototype.dispose = function () {
        this.goButton = null;
        this.nameInput = null;
        this.idInput = null;
        _super.prototype.dispose.call(this);
    };
    return Realname3InputView;
}(PopupView));
__reflect(Realname3InputView.prototype, "Realname3InputView");
