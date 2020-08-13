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
 * author yanyuling
 * date 2018/04/18
 * @class PlayerBottomUI
 */
var PlayerBottomUI = (function (_super) {
    __extends(PlayerBottomUI, _super);
    function PlayerBottomUI() {
        var _this = _super.call(this) || this;
        _this._btnList = [];
        _this._openIdx = 0;
        return _this;
        // this.show();
    }
    PlayerBottomUI.prototype.show = function (data) {
        // super.show(data);
        ViewController.getInstance().openView(ViewConst.COMMON.PLAYERVIEW);
    };
    /**
     * 填内容
     */
    PlayerBottomUI.prototype.init = function () {
        this.height = 0;
        if (Api.practiceVoApi.isPracticeOPen()) {
            App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED, this.checkRedPoints, this);
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_INDEX), this.checkRedPoints, this);
            NetManager.request(NetRequestConst.REQUEST_REQUEST_INDEX, {});
            var bg = BaseBitmap.create("wifeskin_barbg");
            bg.x = 0;
            bg.y = GameConfig.stageHeigth - bg.height;
            this.addChild(bg);
            var resList = [
                "", "player_tab1", "player_tab3", "player_tab2"
            ];
            for (var index = 1; index <= 3; index++) {
                // let btnImg = "practice_btn";
                // let btnText = "practice_bottomBtnTxt"+index;
                var btnImg = resList[index];
                var btnText = "";
                var tabBtn = ComponentManager.getButton(btnImg, btnText, this.btnHandler, this, [index]);
                tabBtn.x = bg.width / 2 + (index - 2) * 200 - tabBtn.width / 2;
                tabBtn.y = bg.y + bg.height / 2 - tabBtn.height / 2;
                this.addChild(tabBtn);
                this._btnList.push(tabBtn);
                if (index == 3 && !Api.practiceVoApi.isPracticeUnlock()) {
                    // tabBtn.visible = false;
                    // tabBtn.setEnable(false);
                    // tabBtn.updateButtonImage(BaseButton.BTN_STATE3);
                    App.DisplayUtil.changeToGray(tabBtn);
                }
            }
            this.height = bg.height;
            this.checkRedPoints();
        }
        /**
        * 默认打开官品UI
        */
        this.btnHandler(1);
    };
    PlayerBottomUI.prototype.checkRedPoints = function () {
        if (!Api.practiceVoApi.isPracticeOPen() || this._btnList.length == 0) {
            return;
        }
        if (Api.practiceVoApi.isPracticeUnlock()) {
            App.DisplayUtil.changeToNormal(this._btnList[2]);
            this._btnList[2].visible = true;
        }
        if (Api.practiceVoApi.isShowRedForPBottom() && Api.practiceVoApi.isPracticeUnlock()) {
            App.CommonUtil.addIconToBDOC(this._btnList[2]);
            var reddot = this._btnList[2].getChildByName("reddot");
            reddot.x = 90;
            reddot.y = 5;
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._btnList[2]);
        }
        /**
         * 升官红点
         */
        var curLv = Api.playerVoApi.getPlayerLevel();
        var nextLvCfg = Config.LevelCfg.getCfgByLevel((curLv + 1).toString());
        if (nextLvCfg && Api.playerVoApi.getPlayerExp() >= nextLvCfg.exp) {
            App.CommonUtil.addIconToBDOC(this._btnList[0]);
            var reddot = this._btnList[0].getChildByName("reddot");
            reddot.x = 90;
            reddot.y = 5;
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._btnList[0]);
        }
        /**
         * 称帝红点
         */
        if (Api.prestigeVoApi.isShowRedDot) {
            App.CommonUtil.addIconToBDOC(this._btnList[1]);
            var reddot = this._btnList[1].getChildByName("reddot");
            reddot.x = 90;
            reddot.y = 5;
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._btnList[1]);
        }
    };
    PlayerBottomUI.prototype.btnHandler = function (param) {
        var openKey = "";
        var keyList = [
            ViewConst.COMMON.PLAYERVIEW,
            ViewConst.COMMON.PRACTICEVIEW,
            ViewConst.COMMON.PRESTIGEVIEW,
        ];
        if (param == 1) {
            openKey = ViewConst.COMMON.PLAYERVIEW;
        }
        else if (param == 3) {
            if (!Api.practiceVoApi.isPracticeUnlock()) {
                App.CommonUtil.showTip(Api.practiceVoApi.getUnlockStr());
                return;
            }
            openKey = ViewConst.COMMON.PRACTICEVIEW;
        }
        else if (param == 2) {
            openKey = ViewConst.COMMON.PRESTIGEVIEW;
        }
        ViewController.getInstance().openView(openKey);
        // let tmpview = ViewController.getInstance().getView(openKey) ;
        // let idx = tmpview.parent.getChildIndex(tmpview);
        // egret.callLater(()=>{
        //     this.getParent().addChild(this);
        // },this)
        for (var key in keyList) {
            if (keyList[key] != openKey) {
                ViewController.getInstance().hideView(keyList[key]);
            }
        }
        for (var index = 0; index < this._btnList.length; index++) {
            if (index == param - 1) {
                this._btnList[index].updateButtonImage(BaseButton.BTN_STATE2);
            }
            else {
                this._btnList[index].updateButtonImage(BaseButton.BTN_STATE1);
            }
        }
    };
    PlayerBottomUI.prototype.dispose = function () {
        this._btnList = [];
        this._openIdx = 0;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_INDEX), this.checkRedPoints, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED, this.checkRedPoints, this);
        _super.prototype.dispose.call(this);
    };
    PlayerBottomUI.prototype.getResourceList = function () {
        return [
            // "wifeskin_barbg",
            "practice_btn_down",
            "practice_btn",
            "player_tab1", "player_tab1_down",
            "player_tab2", "player_tab2_down",
            "player_tab3", "player_tab3_down",
        ];
    };
    PlayerBottomUI.prototype.hide = function (isForce) {
        if (isForce) {
            _super.prototype.hide.call(this);
        }
    };
    PlayerBottomUI.prototype.getParent = function () {
        return LayerManager.panelLayer;
        // return LayerManager.maskLayer
    };
    Object.defineProperty(PlayerBottomUI.prototype, "showHeight", {
        get: function () {
            return this.height;
        },
        enumerable: true,
        configurable: true
    });
    PlayerBottomUI.getInstance = function () {
        if (!PlayerBottomUI._instance) {
            PlayerBottomUI._instance = new PlayerBottomUI();
        }
        return PlayerBottomUI._instance;
    };
    PlayerBottomUI.checkInstance = function () {
        if (PlayerBottomUI._instance) {
            return true;
        }
        return false;
    };
    return PlayerBottomUI;
}(BaseLoadDisplayObjectContiner));
__reflect(PlayerBottomUI.prototype, "PlayerBottomUI");
