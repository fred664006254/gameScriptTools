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
 * 修身资质进度详情UI
 * author yanyuling
 * date 2018/04/16
 * @class PracticeAbilityDetailsPopupView
 */
var PracticeAbilityDetailsPopupView = (function (_super) {
    __extends(PracticeAbilityDetailsPopupView, _super);
    function PracticeAbilityDetailsPopupView() {
        return _super.call(this) || this;
    }
    PracticeAbilityDetailsPopupView.prototype.initView = function () {
        this._nodeContainer = new BaseDisplayObjectContainer();
        var startY = 10;
        var bg1 = BaseBitmap.create("public_9_probiginnerbg");
        bg1.width = 520;
        bg1.height = 666;
        bg1.x = this.viewBg.x + this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = this.viewBg.y + startY;
        this.addChildToContainer(bg1);
        var taskId = this.param.data.taskId;
        var taskvo = Api.practiceVoApi.getPracticeTaskInfo(taskId);
        var cfg = Config.PracticeCfg.getPracticeListById(taskId);
        var keys = Object.keys(cfg.getConditionList());
        keys.sort(function (keyA, keyB) {
            return Number(keyA) - Number(keyB);
        });
        var conV = Api.practiceVoApi._getTaskVoStageV(taskvo);
        var len = keys.length;
        var list = keys;
        var alOver = false;
        if (taskvo.stage == len && taskvo.f == 2) {
            alOver = true;
        }
        if (taskvo.stage > 1 && alOver == false) {
            var list1 = keys.slice(0, taskvo.stage - 1);
            var list2 = keys.slice(taskvo.stage);
            list = [];
            list.push(String(taskvo.stage));
            list = list.concat(list2).concat(list1);
        }
        var startIdx = 1;
        for (var index = 0; index < len; index++) {
            var key = list[index];
            var numKey = Number(key);
            var condit = cfg.getConditionList()[key];
            var idxbg = BaseBitmap.create("dinner_rankbg");
            idxbg.x = bg1.x + 20;
            idxbg.y = startY;
            this._nodeContainer.addChild(idxbg);
            var idTxt = ComponentManager.getTextField("" + key, 20);
            idTxt.x = idxbg.x + idxbg.width / 2 - idTxt.width / 2;
            idTxt.y = idxbg.y + idxbg.height / 2 - idTxt.height / 2;
            ;
            this._nodeContainer.addChild(idTxt);
            startIdx++;
            // startY += 30;
            var descTxt1 = ComponentManager.getTextField("", 20);
            descTxt1.text = this.getDescTxtWithInfo(numKey, condit, cfg.servantId, cfg.wifeId);
            descTxt1.x = idxbg.x + idxbg.width + 15;
            descTxt1.y = startY;
            this._nodeContainer.addChild(descTxt1);
            startY += 30;
            var descValue = ComponentManager.getTextField("", 20);
            descValue.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            descValue.x = descTxt1.x + descTxt1.width + 10;
            descValue.y = descTxt1.y;
            this._nodeContainer.addChild(descValue);
            var descTxt2 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WARN_GREEN);
            descTxt2.text = LanguageManager.getlocal("servantInfo_attrTxt" + cfg.type + "_1") + "+" + String(condit.effect);
            // this.getDescTxtWithInfo(index,condit,cfg.servantId,cfg.wifeId);
            descTxt2.x = descTxt1.x;
            descTxt2.y = startY;
            this._nodeContainer.addChild(descTxt2);
            startY += 45;
            var lineImg = BaseBitmap.create("public_line1");
            lineImg.x = this.viewBg.x + this.viewBg.width / 2 - lineImg.width / 2;
            lineImg.y = startY;
            this._nodeContainer.addChild(lineImg);
            startY += 20;
            var showBtn = false;
            var flagPath = "";
            var curV = conV;
            if (taskvo.stage > numKey || (taskvo.stage == numKey && taskvo.f == 2)) {
                flagPath = "practice_unlock_flag";
                curV = condit.needNum;
            }
            else if (taskvo.stage == numKey) {
                if (taskvo.f == 2) {
                    flagPath = "practice_unlock_flag";
                }
                else if (curV >= condit.needNum) {
                    showBtn = true;
                    flagPath = "";
                }
                else {
                    flagPath = "achievement_state1";
                }
            }
            else {
                // flagPath = "achievement_state1";
                showBtn = false;
                flagPath = "";
            }
            descValue.text = "(" + curV + "/" + condit.needNum + ")";
            if (flagPath != "") {
                var flagImg = BaseBitmap.create(flagPath);
                flagImg.x = bg1.x + bg1.width - flagImg.width - 10;
                flagImg.y = idxbg.y - 7;
                this._nodeContainer.addChild(flagImg);
            }
            if (showBtn) {
                var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "practice_upgrateBtn", this.btnHandler, this);
                btn.x = bg1.x + bg1.width - btn.width - 10;
                btn.y = idxbg.y + 10;
                btn.name = "btn";
                // btn.visible = false;
                this._nodeContainer.addChild(btn);
                if (PlatformManager.checkIsEnLang()) {
                    btn.y = idxbg.y + 10 + 13;
                }
            }
            descTxt1.height = 60;
            descTxt1.width = bg1.width;
            // startIdx++ ;
        }
        this._nodeContainer.height = startY + 40;
        /**
         * 填充列表信息
         */
        var rect = new egret.Rectangle(0, 0, this.viewBg.width, bg1.height - 10);
        var scrollView = ComponentManager.getScrollView(this._nodeContainer, rect);
        scrollView.horizontalScrollPolicy = "off";
        scrollView.x = 0;
        scrollView.y = bg1.y + 5;
        this.addChildToContainer(scrollView);
    };
    PracticeAbilityDetailsPopupView.prototype.btnHandler = function () {
        NetManager.request(NetRequestConst.REQUEST_REQUEST_UNLOCK, { taskId: this.param.data.taskId });
        this.hide();
    };
    /**
     *
     * ["conditionType"]=1,["needNum"]=1,["effect"]
     */
    PracticeAbilityDetailsPopupView.prototype.getDescTxtWithInfo = function (stage, param, servantId, wifeId) {
        var resStr = "";
        var sname = "";
        var wname = "";
        if (servantId && servantId != "") {
            sname = LanguageManager.getlocal("servant_name" + servantId);
            if (stage == 1) {
                resStr = LanguageManager.getlocal("practice_contionType1_1", [sname]);
            }
            else {
                resStr = LanguageManager.getlocal("practice_contionType" + param.conditionType, [sname]);
            }
        }
        if (wifeId && wifeId != "") {
            var wifecfg = Config.WifeCfg.getWifeCfgById(wifeId);
            wname = wifecfg.name; //LanguageManager.getlocal("wifeName_"+wifeId);
            if (stage == 1) {
                resStr = LanguageManager.getlocal("practice_contionType1_2", [wname]);
            }
            else {
                resStr = LanguageManager.getlocal("practice_contionType" + param.conditionType, [wname]);
            }
        }
        return resStr;
    };
    PracticeAbilityDetailsPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "dinner_rankbg", "practice_unlock_flag", "achievement_state1", "achievement_state2",
        ]);
    };
    PracticeAbilityDetailsPopupView.prototype.getParent = function () {
        // return LayerManager.panelLayer;
        return PlayerBottomUI.getInstance().parent;
    };
    PracticeAbilityDetailsPopupView.prototype.getShowHeight = function () {
        return 758;
    };
    PracticeAbilityDetailsPopupView.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return PracticeAbilityDetailsPopupView;
}(PopupView));
__reflect(PracticeAbilityDetailsPopupView.prototype, "PracticeAbilityDetailsPopupView");
//# sourceMappingURL=PracticeAbilityDetailsPopupView.js.map