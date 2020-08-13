/**跨服时间list
 * anthor
 */
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
var AcBattleTimerScrollItem = (function (_super) {
    __extends(AcBattleTimerScrollItem, _super);
    function AcBattleTimerScrollItem() {
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
    AcBattleTimerScrollItem.prototype.initItem = function (index, data, _data) {
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
                // if(this.vo.isWaiting() && ){
                // 	App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleGroundTip11-1`));
                // 	return;
                // }
                _this.vo.flag = true;
                ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEHISTORYRANKVIEW, {
                    data: data,
                    round: index + 1,
                    aid: AcConst.AID_BATTLEGROUND,
                    code: _this._code,
                });
            }, this);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, askImg, teliminateDesc, [teliminateDesc.width + 3, 0]);
            this.addChild(askImg);
        }
    };
    Object.defineProperty(AcBattleTimerScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEGROUND, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcBattleTimerScrollItem.prototype.getSpaceY = function () {
        return -5;
    };
    AcBattleTimerScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    AcBattleTimerScrollItem.prototype.dispose = function () {
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
    AcBattleTimerScrollItem.lasttimer = null;
    return AcBattleTimerScrollItem;
}(ScrollListItem));
__reflect(AcBattleTimerScrollItem.prototype, "AcBattleTimerScrollItem");
//# sourceMappingURL=AcBattleTimerScrollItem.js.map