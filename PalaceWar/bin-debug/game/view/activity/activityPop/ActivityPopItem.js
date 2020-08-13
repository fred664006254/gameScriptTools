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
var ActivityPopItem = /** @class */ (function (_super) {
    __extends(ActivityPopItem, _super);
    function ActivityPopItem() {
        var _this = _super.call(this) || this;
        _this._vo = null;
        _this.sortId = 0;
        _this._time = null;
        return _this;
    }
    ActivityPopItem.prototype.init = function (info) {
        this.sortId = info.sortId;
        this._vo = info.vo;
        var bgres = info.p + (this._vo && this._vo.zids && this._vo.isCrossLeague() ? "_multicross" : ""); //info.vo && info.vo. 
        if (this._vo && this._vo.zids && info.vo.isCrossFengYun()) {
            bgres = info.p + "_fengyun";
        }
        var bg = BaseBitmap.create(bgres);
        bg.addTouchTap(this.clickHandle, this);
        this.addChild(bg);
        var label = BaseBitmap.create("activitypop_type" + info.label);
        this.addChild(label);
        if (info.label == 3) {
            var tempBM = BaseBitmap.create("acpop_hot_ef_1");
            //水波纹特效
            var clip = ComponentManager.getCustomMovieClip("acpop_hot_ef_", 10, 100);
            clip.setPosition(label.width / 2 - tempBM.width / 2 + 5, label.height / 2 - tempBM.height / 2 - 2);
            this.addChild(clip);
            clip.playWithTime(-1);
            // clip.blendMode = egret.BlendMode.ADD;
        }
        if (info.label == 4) {
            //水波纹特效
            var clip = ComponentManager.getCustomMovieClip("activitypopseason", 10, 100);
            clip.width = 75;
            clip.height = 35;
            clip.setPosition(-3, 0);
            this.addChild(clip);
            clip.blendMode = egret.BlendMode.ADD;
            clip.playWithTime(-1);
        }
        if (PlatformManager.checkIsLocalSp() && bg.texture == null) {
            var name_1 = ComponentManager.getTextField(info.vo.aidAndCode, TextFieldConst.FONTSIZE_BUTTON_COMMON);
            name_1.x = 375 - name_1.width / 2;
            name_1.y = 30;
            this.addChild(name_1);
        }
        if (this._vo.aid == AcConst.AID_BATTLEPASS && (Number(this._vo.code == 4) || Number(this._vo.code == 5) || Number(this._vo.code) == 7)) {
        }
        else if (info.showhead || this._vo.aid == "locTomb" || this._vo.aid == "tomb" || this._vo.aid == "wipeBoss" || this._vo.aid == "battleGround" || this._vo.aid == "crossServerPower" || this._vo.aid == "crossServerIntimacy" || this._vo.aid == "crossServerAtkRace" || this._vo.aid == "emperorWar" || this._vo.aid == "crossServerHegemony") {
            var rect1 = egret.Rectangle.create();
            rect1.setTo(0, 0, 136 * 0.75, 143 * 0.75);
            var res = "user_head" + Api.playerVoApi.getPlayePicId();
            // if(this._vo.aid == `spring2020`){
            //     res = `user_head390${Api.playerVoApi.getUserSex(Api.playerVoApi.getPlayePicId()) == 1 ? 5 : 6}`;
            // }
            var myHead = BaseLoadBitmap.create(res, rect1);
            myHead.setPosition(78, 0);
            this.addChild(myHead);
        }
        this._time = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
        this._time.y = 112;
        this.addChild(this._time);
        this.tick();
        this.height = 143;
    };
    ActivityPopItem.prototype.clickHandle = function () {
        if (this._vo.aid == "firstcharge") {
            var viewName = void 0;
            if (Api.switchVoApi.checkWeChatFirstcharge()) {
                viewName = ViewConst.POPUP.FIRSTRECHARGEVIEW;
            }
            else {
                viewName = ViewConst.COMMON.WELFAREVIEWFIRSTRECHARGE;
            }
            ViewController.getInstance().openView(viewName);
        }
        else if (this._vo.aid == "newyear") {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_DINNER_GUIDE);
        }
        else if (this._vo.aid == "homenewyear") {
            return;
        }
        else if (this._vo.aid == "emperorWar") {
            var api = Api.emperorwarVoApi;
            if (api.judgeType() == 5) {
                ViewController.getInstance().openView(ViewConst.COMMON.EMPERORWARENDSHOWVIEW);
            }
            else {
                ViewController.getInstance().openView(ViewConst.COMMON.EMPERORWARENTERVIEW);
            }
        }
        else if (this._vo.aid == "exam") {
            ViewController.getInstance().openView(ViewConst.COMMON.EXAMVIEW);
        }
        else if (this._vo.aid == "sevenDaysSignUp") {
            ViewController.getInstance().openView(ViewConst.COMMON.SEVENDAYSSIGNUPVIEW);
        }
        else if (PlatformManager.checkIsTWBSp() && (this._vo.aid == "firstSightLove" || this._vo.aid == "rechargeBoxSP" || this._vo.aid == "yiyibushe" || this._vo.aid == "courtDuty" || this._vo.aid == "nvyouComing")) {
            PlatformManager.loadUrl("https://page.heyyogame.com/gd/event/20191108/");
        }
        else if (this._vo) {
            Api.acVoApi.openActivityViewByAid(this._vo.aid, this._vo.code, this._vo.atype);
        }
    };
    //反回是否需要重新排序  0 不变 1 排序   2 删除排序
    ActivityPopItem.prototype.tick = function () {
        if (this._vo.aid == "firstcharge") {
            this._time.text = LanguageManager.getlocal("activityPopForever");
            this._time.x = 375 - this._time.width / 2;
            return 0;
        }
        else if (this._vo.aid == "newyear" || this._vo.aid == "homenewyear") {
            return 0;
        }
        else if (GameData.serverTime > this._vo.et || this._vo.isShowBanner == false) {
            return 2;
        }
        else if (this._vo.aid == "emperorWar") {
            this._time.text = LanguageManager.getlocal("timelimitwifeview_time", [App.DateUtil.getFormatBySecond((this._vo.et - GameData.serverTime), 1)]);
            this._time.x = 375 - this._time.width / 2;
            return 0;
        }
        else if (this._vo.aid == "exam") {
            var endTime = Api.examVoApi.getEndTimeByDay(0);
            if (endTime < GameData.serverTime) {
                if (this.sortId < 10000) {
                    this.sortId += 10000;
                    this._time.text = LanguageManager.getlocal("crossIntimacyCDTime4");
                    this._time.x = 375 - this._time.width / 2;
                    return 1;
                }
            }
            else {
                this._time.text = LanguageManager.getlocal("timelimitwifeview_time", [App.DateUtil.getFormatBySecond((endTime - GameData.serverTime), 1)]);
                this._time.x = 375 - this._time.width / 2;
                return 0;
            }
        }
        else if (this._vo.aid == "sevenDaysSignUp") {
            this._time.text = LanguageManager.getlocal("sevenDaysSignUpViewTime", [Api.sevenDaysSignupLoginVoApi.CountDownTime()]);
            this._time.x = 375 - this._time.width / 2;
            return 0;
        }
        else if (this._vo.checkIsInEndShowTime()) {
            if (this.sortId < 10000) {
                this.sortId += 10000;
                this._time.text = LanguageManager.getlocal("crossIntimacyCDTime4");
                this._time.x = 375 - this._time.width / 2;
                return 1;
            }
        }
        else {
            this._time.text = LanguageManager.getlocal("timelimitwifeview_time", [this._vo.acCountDownNoExtra]);
            this._time.x = 375 - this._time.width / 2;
            return 0;
        }
    };
    ActivityPopItem.prototype.dispose = function () {
        this._vo = null;
        this.sortId = 0;
        this._time = null;
        _super.prototype.dispose.call(this);
    };
    return ActivityPopItem;
}(BaseDisplayObjectContainer));
//# sourceMappingURL=ActivityPopItem.js.map