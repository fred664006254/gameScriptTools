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
var BookroomStrenthenPopupView = (function (_super) {
    __extends(BookroomStrenthenPopupView, _super);
    function BookroomStrenthenPopupView() {
        var _this = _super.call(this) || this;
        _this._cost = 0;
        return _this;
    }
    BookroomStrenthenPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 530;
        bg.height = 320;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        var bookroomCfg = GameConfig.config.bookroomCfg;
        var count = bookroomCfg.count;
        var betterStudy = bookroomCfg.betterStudy;
        var messageStr = this.param.data.msg;
        var bRoomInfoVos = {};
        //单个
        if (this.param.data.pos) {
            var svo_1 = Api.bookroomVoApi.getSeatInfoByPosId(this.param.data.pos);
            var betterStudy_1 = bookroomCfg.betterStudy;
            var level = svo_1.level;
            var uptxt1 = "100%";
            var uptxt2 = betterStudy_1[0].upLevel * 100 + "%";
            if (level > 0) {
                uptxt1 = betterStudy_1[level - 1].upLevel * 100 + "%";
                uptxt2 = betterStudy_1[level].upLevel * 100 + "%";
            }
            var cost = betterStudy_1[level]["gemCost"];
            var message = LanguageManager.getlocal("bookRoom_strenghenStudyTxt", ["" + cost, uptxt1, uptxt2]);
            this._cost = cost;
            var msgTF = ComponentManager.getTextField(message, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            msgTF.width = 480;
            msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
            msgTF.x = this.viewBg.x + this.viewBg.width / 2 - msgTF.width / 2;
            msgTF.y = bg.y + bg.height / 2 - msgTF.height / 2;
            msgTF.lineSpacing = 5;
            this.addChildToContainer(msgTF);
        }
        else {
            bRoomInfoVos = Api.bookroomVoApi.getSeatInfos();
            var message = ""; //LanguageManager.getlocal("bookRoom_strenghenStudyTxt2",[""]);
            var totalCost = 0;
            var startY = 100;
            for (var key in bRoomInfoVos) {
                var svo = bRoomInfoVos[key];
                var level = svo.level;
                if (level >= count || svo.et < GameData.serverTime) {
                    continue;
                }
                var uptxt1 = "100%";
                var uptxt2 = betterStudy[0].upLevel * 100 + "%";
                if (level > 0) {
                    uptxt1 = betterStudy[level - 1].upLevel * 100 + "%";
                    uptxt2 = betterStudy[level].upLevel * 100 + "%";
                }
                totalCost += betterStudy[level]["gemCost"];
                var sname = LanguageManager.getlocal("servant_name" + svo.servantid);
                var snameTxt = ComponentManager.getTextField(sname, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
                snameTxt.x = this.viewBg.x + 160;
                snameTxt.y = startY;
                this.addChildToContainer(snameTxt);
                var changeStr = LanguageManager.getlocal("bookRoom_strenghenStudyTxt3", [uptxt1, uptxt2]);
                var changeTxt = ComponentManager.getTextField(changeStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
                changeTxt.x = snameTxt.x + 100;
                changeTxt.y = startY;
                this.addChildToContainer(changeTxt);
                startY += 30;
            }
            this._cost = totalCost;
            var newH = startY - bg.y + 15;
            if (newH > bg.height) {
                bg.height = newH;
            }
            var topMsg = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            topMsg.text = LanguageManager.getlocal("bookRoom_strenghenStudyTxt2", ["" + totalCost]);
            topMsg.width = 480;
            topMsg.textAlign = TextFieldConst.ALIGH_CENTER;
            topMsg.x = this.viewBg.x + this.viewBg.width / 2 - topMsg.width / 2;
            topMsg.y = 40;
            topMsg.lineSpacing = 5;
            this.addChildToContainer(topMsg);
        }
        var conBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "confirmBtn", this.clickConHandler, this);
        conBtn.x = bg.x + bg.width / 2 - conBtn.width / 2;
        conBtn.y = bg.y + bg.height + 20;
        this.addChildToContainer(conBtn);
        var cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE, "cancelBtn", this.hide, this);
        cancelBtn.x = 80;
        cancelBtn.y = bg.y + bg.height + 20;
        this.addChildToContainer(cancelBtn);
        conBtn.x = 330;
    };
    BookroomStrenthenPopupView.prototype.strenthenReqCallback = function (event) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_INTENSIVESTUDY), this.strenthenReqCallback, this);
        var ret = event.data.data.ret;
        if (ret == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_strenghen_success"));
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_strenghen_fail"));
        }
        this.hide();
    };
    BookroomStrenthenPopupView.prototype.clickConHandler = function (data) {
        if (this._cost > Api.playerVoApi.getPlayerGem()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_strenghen_gemTip"));
            return;
        }
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_INTENSIVESTUDY), this.strenthenReqCallback, this);
        var _pos = this.param.data.pos;
        var cardType = this.param.data.cardType;
        if (_pos) {
            NetManager.request(NetRequestConst.REQUEST_BOOKROOM_INTENSIVESTUDY, { pos: _pos, ismonthcard: cardType });
        }
        else {
            var ismonthcard = 0;
            if (Api.shopVoApi.ifBuyMonthCard()) {
                ismonthcard++;
            }
            if (Api.shopVoApi.ifBuyYearCard()) {
                ismonthcard++;
            }
            NetManager.request(NetRequestConst.REQUEST_BOOKROOM_INTENSIVESTUDY, { onekey: 1, ismonthcard: ismonthcard });
        }
    };
    BookroomStrenthenPopupView.prototype.getTitleStr = function () {
        return "bookRoom_strenghenTitle1";
    };
    BookroomStrenthenPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    BookroomStrenthenPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return BookroomStrenthenPopupView;
}(PopupView));
__reflect(BookroomStrenthenPopupView.prototype, "BookroomStrenthenPopupView");
