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
var DailyTask = (function (_super) {
    __extends(DailyTask, _super);
    function DailyTask() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btns = [];
        return _this;
    }
    DailyTask.prototype.getNetConstEventArr = function () {
        return [
            NetConst.TSAK_GET_DAY_REWARDS
        ];
    };
    DailyTask.prototype.netEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case NetConst.TSAK_GET_DAY_REWARDS:
                view.openPopupView(evt);
                break;
        }
    };
    DailyTask.prototype.initView = function () {
        this.initEventListener();
        this._bg = BaseBitmap.create("taskachievement");
        this._bg.width = 495;
        this._bg.y = 10;
        this.addChild(this._bg);
        var title = ComponentMgr.getTextField('1', TextFieldConst.SIZE_28, ColorEnums.white);
        this.addChild(title);
        title.text = LangMger.getlocal("dailytasktitle");
        title.x = 17;
        title.y = this._bg.y + 15;
        title.strokeColor = 0x08131A;
        var scale = 0.3;
        var urls = ["item2", "item1", "dicecardlevel1"];
        var btny = this._bg.y + 74;
        var startBtnX = 54;
        for (var index = 0; index < 3; index++) {
            var btn = ComponentMgr.getButton("ab_daily_task_icon1", "", this.btnOnclick, this, [index]);
            this.addChild(btn);
            btn.y = btny;
            btn.x = 144 * index + 54;
            var boxIcon = BaseBitmap.create(urls[index]);
            boxIcon.width = boxIcon.height = 50;
            btn.addChild(boxIcon);
            boxIcon.x = (btn.width - boxIcon.width) / 2;
            boxIcon.y = (btn.height - boxIcon.height) / 2 - 20;
            var goldTxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_20, ColorEnums.white);
            btn.addChild(goldTxt);
            goldTxt.width = btn.width;
            goldTxt.stroke = 1.5;
            goldTxt.textAlign = egret.HorizontalAlign.CENTER;
            goldTxt.text = "x " + Config.DailytaskCfg.getMustTaskReward(1, index);
            goldTxt.y = boxIcon.y + boxIcon.height - 8;
            if (Api.DailytaskVoApi.getDailyGet(index) == 0) {
                btn.addChild(this.dailyTxt());
            }
            else {
                btn.setBtnBitMap("ab_daily_task_icon2");
                // btn.setBtnSize(110,110);
                btn.touchEnabled = false;
                btn.addChild(this.dailyGouhao());
            }
            this.btns[index] = btn;
        }
    };
    DailyTask.prototype.dailyTxt = function () {
        var txt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_CONTENT_NORMAL_POPUP, ColorEnums.white);
        txt.text = LangMger.getlocal("taskviewcollet");
        txt.width = 116;
        txt.x = 0;
        txt.y = 72 + (38 - txt.height) / 2;
        txt.name = "taskreward";
        txt.textAlign = egret.HorizontalAlign.CENTER;
        txt.strokeColor = ColorEnums.strokeOrange;
        return txt;
    };
    DailyTask.prototype.dailyGouhao = function () {
        var gouhao = BaseBitmap.create("ab_task_view_gaohao");
        gouhao.x = 45;
        gouhao.y = 72 + (38 - gouhao.height) / 2 - 7;
        gouhao.name = "gouhao";
        return gouhao;
    };
    DailyTask.prototype.btnOnclick = function (param) {
        NetManager.request(NetConst.TSAK_GET_DAY_REWARDS, { keyPos: param + 1 });
        var item = this.btns[param];
        if (param < 2) {
            Api.UserinfoVoApi.setFreshInfo(true, new egret.Point(item.localToGlobal().x + item.width / 2, item.localToGlobal().y + item.height / 2));
        }
    };
    DailyTask.prototype.openPopupView = function (event) {
        if (event.data.ret) {
            if (event.data.data.data.rewards != "") {
                var rewardvo = GameData.formatRewardItem(event.data.data.data.rewards)[0];
                if (rewardvo.type > 2) {
                    ViewController.getInstance().openView(ViewConst.COMMONREWARDPOPUPVIEW, {
                        title: LangMger.getlocal("reward_pupopview_title"),
                        rewards: event.data.data.data.rewards
                    });
                }
            }
        }
    };
    DailyTask.prototype.dispose = function () {
        this.btns = [];
        _super.prototype.dispose.call(this);
    };
    return DailyTask;
}(BaseDisplayObjectContainer));
__reflect(DailyTask.prototype, "DailyTask");
//# sourceMappingURL=DailyTask.js.map