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
 * 战斗结算
 * ViewController.getInstance().openView(ViewConst.POPUP.ATKRACESETTLEPOPUPVIEW, param)
 * param: {addPoint: number, rewards?: string, win: number}
 * 也可以直接把接口返回的data直接传入
 */
var AtkraceSettlePopupView = (function (_super) {
    __extends(AtkraceSettlePopupView, _super);
    function AtkraceSettlePopupView() {
        return _super.call(this) || this;
    }
    AtkraceSettlePopupView.prototype.initView = function () {
        Api.rookieVoApi.checkWaitingGuide();
        // this.data = this.param.data;
        this.initData();
        var _bg = BaseBitmap.create(this.data.type == 1 ? "atkrace_bg5" : "atkrace_bg4");
        this.addChildToContainer(_bg);
        var _title = BaseBitmap.create(this.data.type == 1 ? "atkrace_label2" : "atkrace_label1");
        this.addChildToContainer(_title);
        _title.setPosition((this.getShowWidth() - _title.width) / 2, 34);
        var _comB = this.data.type == 1 ? "atkrace_btn2" : "atkrace_btn1";
        var _confirmBtn = ComponentManager.getButton(_comB, "", this.onComfirmTap, this, null, 0);
        this.addChildToContainer(_confirmBtn);
        _confirmBtn.setPosition((this.getShowWidth() - _confirmBtn.width) / 2, 688);
        var _tipKey = this.data.type == 1 ? "atkrace_addtext13" : "atkrace_addtext12";
        if (this.data.fightnum == 0) {
            _tipKey = "atkrace_addtext20";
        }
        var _tip = ComponentManager.getTextField(LanguageManager.getlocal(_tipKey, [this.data.fightnum + ""]), 30, this.data.type == 1 ? 0xacacac : 0xfff0b5);
        this.addChildToContainer(_tip);
        _tip.width = this.getShowWidth();
        _tip.textAlign = TextFieldConst.ALIGH_CENTER;
        _tip.setPosition(0, 292);
        // 蓝方--我
        var _pbg_B = BaseBitmap.create("atkrace_bg7");
        this.addChildToContainer(_pbg_B);
        _pbg_B.setPosition(0, 376);
        var _head_B = Api.playerVoApi.getPlayerCircleHead(this.data.pic);
        this.addChildToContainer(_head_B);
        _head_B.setPosition(this.getShowWidth() / 2 - (_head_B.width + 3), _pbg_B.y - 12);
        var _name_B = ComponentManager.getTextField(this.data.name, 20, 0xfff1b3);
        _name_B.width = 200;
        _name_B.textAlign = TextFieldConst.ALIGH_RIGHT;
        this.addChildToContainer(_name_B);
        _name_B.setPosition(0, _pbg_B.y + 17);
        var _score_B = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_addtext14", [this.data.score]), 20, 0x3ae269);
        _score_B.width = 200;
        _score_B.textAlign = TextFieldConst.ALIGH_RIGHT;
        this.addChildToContainer(_score_B);
        _score_B.setPosition(0, _pbg_B.y + 47);
        // 红方--敌
        var _pbg_R = BaseBitmap.create("atkrace_bg6");
        this.addChildToContainer(_pbg_R);
        _pbg_R.setPosition(this.getShowWidth() - _pbg_R.width, 376);
        var _head_R = Api.playerVoApi.getUserCircleHead(this.data.pic2);
        this.addChildToContainer(_head_R);
        _head_R.setPosition(this.getShowWidth() / 2 + 3, 376 - 12);
        var _name_R = ComponentManager.getTextField(this.data.uname2, 20, 0xfff1b3);
        _name_R.width = 200;
        // _name_R.textAlign = TextFieldConst.ALIGH_RIGHT;
        this.addChildToContainer(_name_R);
        _name_R.setPosition(this.getShowWidth() - 200, _pbg_R.y + 17);
        var _score_R = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_addtext14", [this.data.score2]), 20, 0xfddad6);
        _score_R.width = 200;
        // _score_R.textAlign = TextFieldConst.ALIGH_RIGHT;
        this.addChildToContainer(_score_R);
        _score_R.setPosition(this.getShowWidth() - 200, _pbg_R.y + 47);
        if (this.data.rewards && this.data.rewards.length > 0) {
            var _rewTip = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_addtext15"), 24, 0xfef0b3);
            _rewTip.width = this.getShowWidth();
            _rewTip.textAlign = TextFieldConst.ALIGH_CENTER;
            this.addChildToContainer(_rewTip);
            _rewTip.setPosition(0, 487);
            var _icons = GameData.getRewardItemIcons(this.data.rewards);
            var _startX = (this.getShowWidth() - _icons.length * (94 + 16) + 16) / 2;
            for (var i = 0; i < _icons.length; i++) {
                this.addChildToContainer(_icons[i]);
                _icons[i].setScale(94 / _icons[i].width);
                _icons[i].setPosition(_startX + (94 + 16) * i, 523);
            }
        }
        // NetManager.request(NetRequestConst.REQUEST_ATKRACE_LIST, {});
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
    };
    AtkraceSettlePopupView.prototype.doGuide = function () {
        this.onComfirmTap();
    };
    /**
     * 初始化数据
     */
    AtkraceSettlePopupView.prototype.initData = function () {
        var _param = this.param.data;
        var _ainfo = Api.atkraceVoApi.getMyFightInfo();
        this.data = {
            type: _param.win == 1 ? 2 : 1,
            fightnum: _ainfo.fightnum,
            name: Api.playerVoApi.getPlayerName(),
            pic: Api.playerVoApi.getPlayePicId(),
            uid: Api.playerVoApi.getPlayerID(),
            score: "+" + _param.addPoint,
            uname2: _ainfo.fname,
            pic2: _ainfo.fpic,
            score2: "-" + Math.floor(_ainfo.atype == 4 ? _param.addPoint : _param.addPoint / 2),
            rewards: _param.rewards || ""
        };
    };
    /**
     * 点击确认按钮
     */
    AtkraceSettlePopupView.prototype.onComfirmTap = function () {
        ViewController.getInstance().hideView(ViewConst.POPUP.ATKRACESETTLEPOPUPVIEW);
    };
    // protected getBgName():string {
    //     return "atkrace_bg4";
    // }
    AtkraceSettlePopupView.prototype.getCloseBtnName = function () {
        return "";
    };
    AtkraceSettlePopupView.prototype.initTitle = function () {
        return;
    };
    AtkraceSettlePopupView.prototype.initBg = function () {
        return;
    };
    AtkraceSettlePopupView.prototype.getShowWidth = function () {
        return GameConfig.stageWidth;
    };
    AtkraceSettlePopupView.prototype.getShowHeight = function () {
        return 780;
    };
    AtkraceSettlePopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.container.y = Math.min((GameConfig.stageHeigth - this.getShowHeight()) / 2, 149);
    };
    AtkraceSettlePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkrace_bg4",
            "atkrace_bg5",
            "atkrace_bg6",
            "atkrace_bg7",
            "atkrace_btn1",
            "atkrace_btn2",
            "atkrace_label1",
            "atkrace_label2"
        ]);
    };
    AtkraceSettlePopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
        ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEVIEW);
        ViewController.getInstance().hideView(ViewConst.COMMON.ATKRACEBATTLEVIEW);
    };
    AtkraceSettlePopupView.prototype.dispose = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        _super.prototype.dispose.call(this);
    };
    return AtkraceSettlePopupView;
}(PopupView));
__reflect(AtkraceSettlePopupView.prototype, "AtkraceSettlePopupView");
