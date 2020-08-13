/**风华群芳  时间list
 * anthor
 */
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
var AcGroupwifeBattleTimerScrollItem = /** @class */ (function (_super) {
    __extends(AcGroupwifeBattleTimerScrollItem, _super);
    function AcGroupwifeBattleTimerScrollItem() {
        var _this = _super.call(this) || this;
        // 标题文本
        _this.titleText = null;
        //标题背景
        _this.titleBg = null;
        //内容背景
        _this.descBg = null;
        //内容图片
        _this.descImg = null;
        //内容购买按钮
        _this.descBtn = null;
        //内容时间文本
        _this.descTimeText = null;
        //数据
        _this._data = null;
        _this._itemIndex = null;
        _this._code = null;
        return _this;
    }
    AcGroupwifeBattleTimerScrollItem.prototype.initItem = function (index, data, _data) {
        var _this = this;
        this._code = _data.code;
        var need = _data.need;
        var nameStr = "battlelistbg1";
        if (index % 2 == 0) {
            nameStr = 'battlelistbg2';
        }
        var bit = BaseBitmap.create(nameStr);
        bit.x = -5;
        this.addChild(bit);
        if (data.btmLine == need) {
            var bit2 = BaseBitmap.create("battlelisttouch");
            bit2.x = -5;
            this.addChild(bit2);
        }
        //index 排名
        var rankNum = index + 1;
        var renkDesc = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x3e1f0f);
        renkDesc.text = rankNum + "";
        renkDesc.y = bit.y + bit.height / 2 - renkDesc.height / 2;
        renkDesc.x = 45;
        this.addChild(renkDesc);
        //时间  
        var time1 = App.DateUtil.getFormatBySecond(this.vo.versionst, 10);
        var nextSt = this.vo.versionst + data.time;
        var time2 = App.DateUtil.getFormatBySecond(nextSt, 10);
        var timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("acBattleTimeend3", [time1, time2]), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x3e1f0f);
        timeDesc.y = renkDesc.y;
        timeDesc.x = 130;
        this.addChild(timeDesc);
        var curPeriod = this.vo.getCurperiod();
        var str = "";
        if (curPeriod == 1) {
            str = "acBattleTimeend3";
        }
        if (curPeriod >= 3 || data.btmLine > need && need != 0) {
            str = "acBattleTimeend";
        }
        else if (need == 0) {
            str = "acBattleTimeend3";
        }
        else if (data.btmLine == need) {
            str = "acBattleTimeend2";
        }
        else {
            str = "acBattleTimeend4";
        }
        if (index == 0) {
            timeDesc.text = LanguageManager.getlocal(str, [time1, time2]);
        }
        if (index > 0) {
            var nextSt2 = this.vo.versionst + _data.arr[index - 1].time;
            var time23 = App.DateUtil.getFormatBySecond(nextSt2, 10);
            timeDesc.text = LanguageManager.getlocal(str, [time23, time2]);
        }
        //淘汰  
        var teliminateDesc = ComponentManager.getTextField(LanguageManager.getlocal("eliminate", [data.btmLine]), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x3e1f0f);
        teliminateDesc.y = renkDesc.y;
        teliminateDesc.x = 526 - 35;
        teliminateDesc.width = 75;
        teliminateDesc.textAlign = TextFieldConst.ALIGH_CENTER;
        this.addChild(teliminateDesc);
        if (data.btmLine == 1) {
            teliminateDesc.text = data.btmLine + "";
        }
        if (data.btmLine > need && curPeriod >= 2 && (!this.vo.isWaiting() || (this.vo.isWaiting() && this.vo.getCurRound() > (rankNum + 1)))) {
            renkDesc.alpha = 0.5;
            timeDesc.alpha = 0.5;
            teliminateDesc.alpha = 0.5;
            var askImg = ComponentManager.getButton("activity_rank_ask", "", function () {
                _this.vo.flag = true;
                ViewController.getInstance().openView(ViewConst.COMMON.ACGROUPWIFEBATTLEHISTORYRANKVIEW, {
                    data: data,
                    round: index + 1,
                    aid: AcConst.AID_GROUPWIFEBATTLE,
                    code: _this._code
                });
            }, this);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, askImg, teliminateDesc, [teliminateDesc.width + 3, 0]);
            this.addChild(askImg);
        }
    };
    Object.defineProperty(AcGroupwifeBattleTimerScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_GROUPWIFEBATTLE, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcGroupwifeBattleTimerScrollItem.prototype.getSpaceY = function () {
        return -5;
    };
    AcGroupwifeBattleTimerScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    AcGroupwifeBattleTimerScrollItem.prototype.dispose = function () {
        this.titleText = null;
        //标题背景
        this.titleBg = null;
        //内容背景
        this.descBg = null;
        //内容图片
        this.descImg = null;
        //内容购买按钮
        this.descBtn = null;
        //内容时间文本
        this.descTimeText = null;
        //数据
        this._data = null;
        this._itemIndex = null;
        _super.prototype.dispose.call(this);
    };
    AcGroupwifeBattleTimerScrollItem.lasttimer = null;
    return AcGroupwifeBattleTimerScrollItem;
}(ScrollListItem));
//# sourceMappingURL=AcGroupwifeBattleTimerScrollItem.js.map