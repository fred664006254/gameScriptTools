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
 * 出巡列表item
 * date 2019.12.12
 * author ycg
 * @class EmperorOutListScrollItem
 */
var EmperorOutListScrollItem = (function (_super) {
    __extends(EmperorOutListScrollItem, _super);
    function EmperorOutListScrollItem() {
        var _this = _super.call(this) || this;
        _this._time = null;
        _this._info = null;
        _this._data = null;
        _this._goBtn = null;
        return _this;
    }
    EmperorOutListScrollItem.prototype.initItem = function (index, data, param) {
        var playerUid = Api.playerVoApi.getPlayerID();
        var isAuthor = false;
        if (playerUid == data.uid) {
            isAuthor = true;
        }
        var bgStr = "emperorout_wishitembg2";
        if (isAuthor) {
            bgStr = "emperorout_wishitembg1";
        }
        var bg = BaseBitmap.create(bgStr);
        this.addChild(bg);
        this.width = bg.width;
        this.height = bg.height;
        this._data = data;
        var titleData = App.CommonUtil.getTitleData(data.data.title);
        var titleCfg = Config.TitleCfg;
        var titleconfig = null;
        var curTitleId = null;
        if (titleData.clothes) {
            titleconfig = titleCfg.getTitleCfgById(titleData.clothes);
            curTitleId = titleData.clothes;
        }
        var curLevel = 1;
        if (titleconfig && titleconfig.isTitle == 1 && (titleconfig.titleType == 1 || titleconfig.titleType == 2 || titleconfig.titleType == 7)) {
            curTitleId = titleData.clothes;
            curLevel = titleData.clv;
            if (curLevel == 0) {
                curLevel = 1;
            }
        }
        var picId = curTitleId;
        if (!picId) {
            picId = data.data.level;
        }
        // let role = Api.playerVoApi.getPlayerPortrait(Number(picId), data.data.pic);
        // // let role = Api.playerVoApi.getMyPortrait();
        // role.setScale(0.7);
        // role.setPosition(-5, 0);
        // this.addChild(role);
        // let rect = new egret.Rectangle();
        // rect.setTo(0, 0, role.width, 195);
        // role.mask = rect;
        // App.LogUtil.log("role.width: "+role.width);
        // if (role.width>460)
        // {
        //     role.x = -112;
        // }
        // else if (role.width >= 382){
        //     role.x = -15;
        // }
        /**
        let role = Api.playerVoApi.getPlayerPortrait(Number(picId), data.data.pic);
        role.anchorOffsetX = role.width/2;
        role.setPosition(105, 0);
        let offX = 0;
        if (role.width>460)
        {
            // role.setScale(0.55);
            offX = role.width * role.scaleX/2 - 95;
        }
        else if (role.width >= 382){
            // role.setScale(0.6);
        }
        else{
            // role.setScale(0.7);
        }
        this.addChild(role);
        let rect = new egret.Rectangle();
        // if (offX > 0){
            // rect.setTo(offX/role.scaleX, 0, role.width, 138/role.scaleY);
        // }
        // else{
            // rect.setTo(0, 0, role.width, 138/role.scaleY);
        // }
        // rect.setTo(0, 0, 190, 138/role.scaleY);
        //最新
        rect.setTo(role.width/2 - 95, 0, 180, 138);
        role.mask = rect;
        App.LogUtil.log("role.width: "+role.width + " offX: "+offX);
        //end
        */
        var headContainer = Api.playerVoApi.getPlayerCircleHead(data.data.pic, data.data.ptitle);
        headContainer.setPosition(bg.x + 40, bg.y + bg.height / 2 - headContainer.height / 2);
        this.addChild(headContainer);
        // let maskSp = new egret.Shape();
        // maskSp.graphics.beginFill(0x000000);
        // maskSp.graphics.drawRect(0, 0, 180, 138);
        // maskSp.graphics.endFill();
        // maskSp.x = 10;
        // maskSp.y = 0;
        // this.addChild(maskSp);
        // role.mask = maskSp;
        // let roleTitle =this.getRoleTitlePic(data);
        // if (roleTitle){
        //     roleTitle.width = 155;
        //     roleTitle.height = 59;
        //     roleTitle.setScale(0.7);
        //     roleTitle.x = 185;
        //     roleTitle.y = 8;
        //     this.addChild(roleTitle);
        // }
        var name = ComponentManager.getTextField(data.data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        // name.setPosition(195 + 155 * 0.7, 20);
        name.setPosition(160, 20);
        this.addChild(name);
        // if (!roleTitle){
        //     name.setPosition(195 + 270/2 - name.width/2, 20);
        // }
        var roleTitle = this.getRoleTitlePic(data);
        if (roleTitle) {
            roleTitle.width = 155;
            roleTitle.height = 59;
            roleTitle.setScale(0.7);
            roleTitle.x = name.x + name.width + 10;
            roleTitle.y = 8;
            this.addChild(roleTitle);
        }
        var goBtnBg = "emperorout_empvisitbtn";
        if (!isAuthor) {
            goBtnBg = "emperorout_wishbtn";
        }
        var goBtn = ComponentManager.getButton(goBtnBg, "", function () {
            var timeInfo = Api.emperorAchieveVoApi.getOutTimeCountDown(data.st);
            if (timeInfo.time == 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("emperorOutListEnd"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.EMPEROROUTVIEW, { uid: data.uid });
            var parent = ViewController.getInstance().getView("EmperorOutListPopupView");
            parent.hide();
        }, this);
        goBtn.setPosition(this.width - goBtn.width - 25, this.height / 2 - goBtn.height / 2 + 15);
        this.addChild(goBtn);
        this._goBtn = goBtn;
        var infoStr = "emperorOutListInfo";
        if (isAuthor) {
            infoStr = "emperorOutListInfo1";
        }
        var info = ComponentManager.getTextField(LanguageManager.getlocal(infoStr), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        info.setPosition(160, this.height / 2 - info.height / 2);
        info.lineSpacing = 6;
        this.addChild(info);
        this._info = info;
        var timeData = Api.emperorAchieveVoApi.getOutTimeCountDown(data.st);
        var time = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutListTime", ["" + timeData.timeStr]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        time.setPosition(info.x, info.y + info.height + 8);
        this.addChild(time);
        this._time = time;
        TickManager.addTick(this.tick, this);
        if (Api.emperorAchieveVoApi.isShowSendWordRedDot(data.uid) || Api.emperorAchieveVoApi.isCanGetBonusReward(data.uid) || (Api.emperorAchieveVoApi.isHavePopularRewardByuid(data.uid, isAuthor) && !Api.emperorAchieveVoApi.isFirstSendWordByUid(data.uid))) {
            App.CommonUtil.addIconToBDOC(goBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(goBtn);
        }
    };
    EmperorOutListScrollItem.prototype.tick = function () {
        var timeData = Api.emperorAchieveVoApi.getOutTimeCountDown(this._data.st);
        if (timeData.time == 0) {
            // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_EMPERORACHIEVEREWARD_FRESHOUTLIST, {uid: this._data.uid});
            TickManager.removeTick(this.tick, this);
            this._goBtn.setGray(true);
            App.CommonUtil.removeIconFromBDOC(this._goBtn);
            this._info.visible = false;
            this._time.text = LanguageManager.getlocal("emperorOutListEnd");
            this._time.y = this._info.y;
        }
        else {
            this._time.text = LanguageManager.getlocal("emperorOutListTime", ["" + timeData.timeStr]);
        }
    };
    EmperorOutListScrollItem.prototype.getRoleTitlePic = function (data) {
        var titleData = App.CommonUtil.getTitleData(data.data.title);
        var curLv = titleData.tlv;
        var titleId = titleData.title;
        // if (Config.TitleCfg.getIsTitleOnly(titleData.title))
        // {
        //     titleId = 0;
        // }
        // else{
        //     titleId = titleData.title;
        // }
        // if (titleData.clothes != ""){
        //     titleId = titleData.clothes;
        //     curLv = titleData.tlv;
        // }
        if (titleId) {
            return App.CommonUtil.getTitlePic(titleId, curLv);
        }
        return null;
    };
    EmperorOutListScrollItem.prototype.dispose = function () {
        TickManager.removeTick(this.tick, this);
        this._time = null;
        this._data = null;
        this._goBtn = null;
        this._info = null;
        _super.prototype.dispose.call(this);
    };
    return EmperorOutListScrollItem;
}(ScrollListItem));
__reflect(EmperorOutListScrollItem.prototype, "EmperorOutListScrollItem");
//# sourceMappingURL=EmperorOutListScrollItem.js.map