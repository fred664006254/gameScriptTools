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
 * 骰子能量升级按钮
 * author 陈可
 * date 2020/4/23
 * @class UpDice
 */
var UpDice = (function (_super) {
    __extends(UpDice, _super);
    function UpDice(upinfo) {
        var _this = _super.call(this) || this;
        _this._upmask = null;
        _this._bg = null;
        _this._info = upinfo;
        _this.init();
        _this.initEventListener();
        return _this;
    }
    UpDice.prototype.init = function () {
        var _this = this;
        this.width = 112;
        this.height = 112;
        var diceCfg = Config.DiceCfg.getCfgById(this._info.id);
        var icon = BaseLoadBitmap.create(Config.DiceCfg.getIconById(this._info.id));
        icon.setScale(DiceScaleEnum.scale_fight_team);
        var view = this;
        // diceCfg.getBtShawdow()
        var bg = BaseLoadBitmap.create("bird_team_item_" + diceCfg.quality, null, { callback: function (icon) {
                // bg.setPosition((icon.width*icon.scaleX-bg.width)*0.5,(icon.height*icon.scaleY-bg.height)*0.5+3);
            }, callbackThisObj: this, callbackParams: [icon] });
        bg.setScale(0.7);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, bg, [0, 0]);
        this.addChild(bg);
        this._bg = bg;
        this.addChild(icon);
        /*this.addTouchTap((e:egret.Event)=>{
            NetManager.request(NetConst.BATTLE_OPT,{opt:1,upId:this._info.id});
        },this);*/
        // this.addTouch(this.eventHandler, this);
        icon.addTouch(this.eventHandler, this);
        var lvTxt = ComponentMgr.getTextField("LV." + this._info.pwlv, TextFieldConst.SIZE_20, ColorEnums.white);
        this._lvTxt = lvTxt;
        lvTxt.stroke = 1.5;
        lvTxt.width = 80;
        lvTxt.textAlign = egret.HorizontalAlign.LEFT;
        lvTxt.setPosition(0, 0);
        this.addChild(lvTxt);
        this.name = "up" + this._info.id;
        var spIco = BaseBitmap.create("battle_sp");
        spIco.setPosition(0, 60 - 2);
        this.addChild(spIco);
        var numTxt = ComponentMgr.getTextField(Api.BattleVoApi.getPowerUpCostByLv(this._info.pwlv) + "", TextFieldConst.SIZE_CONTENT_NORMAL_POPUP);
        this._numTxt = numTxt;
        numTxt.width = 100;
        numTxt.setPosition(spIco.x + spIco.width, spIco.y + (spIco.height - numTxt.height) * 0.5 + 2);
        this.addChild(numTxt);
        var info = BaseBitmap.create("dicecardext");
        // info.setScale(0.8);
        info.width = info.width * 0.8;
        info.height = info.height * 0.8;
        this.addChild(info);
        info.y = -8;
        info.x = bg.x + 89 - info.width - 5;
        App.CommonUtil.addTouchScaleEffect(info, function () {
            //新手引导不响应
            if (Api.GameinfoVoApi.getIsGuiding()) {
                return;
            }
            var info = null;
            info = {
                lv: Api.BattleVoApi.getUpinfoLvByDiceId(true, _this._info.id),
            };
            ViewController.getInstance().openView(ViewConst.DICEDETAILINFOVIEW, {
                dice: _this._info.id,
                // check : true,
                inbattle: true,
                info: info,
                isPowerUp: true
            });
        }, this);
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    };
    UpDice.prototype.showMask = function () {
        if (!this._upmask) {
            var mask = BaseBitmap.create("btupdicemask");
            mask.setScale(0.95);
            mask.setPosition(this._bg.x + (this._bg.width * this._bg.scaleX - mask.width * mask.scaleX) * 0.5, this._bg.y + (this._bg.height * this._bg.scaleY - mask.height * mask.scaleY) * 0.5);
            this.addChild(mask);
            this._upmask = mask;
        }
        else {
            if (!this.contains(this._upmask)) {
                this.addChild(this._upmask);
            }
        }
    };
    UpDice.prototype.hideaMask = function () {
        if (this._upmask && this.contains(this._upmask)) {
            this.removeChild(this._upmask);
        }
    };
    UpDice.prototype.refresh = function (isMe) {
        this._lvTxt && this._lvTxt.setString("LV." + this._info.pwlv);
        this._numTxt && this._numTxt.setString(Api.BattleVoApi.getPowerUpCostByLv(this._info.pwlv) + "");
        //满级后增幅置灰
        if (isMe && this._info.pwlv >= 5) {
            this._lvTxt && this._lvTxt.setString("Max");
            //  App.DisplayUtil.changeToGray(this);
            this.showMask();
        }
    };
    UpDice.prototype.eventHandler = function (event) {
        if (BattleStatus.startBattleTime < 5000 || Api.BattleVoApi.getHasOwnDiceNum(true) <= 0) {
            return;
        }
        var view = this;
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this.setScale(0.9);
                break;
            case egret.TouchEvent.TOUCH_END:
                NetManager.request(NetConst.BATTLE_OPT, { opt: 1, upId: this._info.id });
                this.setScale(1);
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                this.setScale(1);
                break;
        }
    };
    UpDice.prototype.dispose = function () {
        this._info = null;
        this._lvTxt = null;
        this._numTxt = null;
        this._upmask = null;
        this._bg = null;
        _super.prototype.dispose.call(this);
    };
    return UpDice;
}(BaseDisplayObjectContainer));
__reflect(UpDice.prototype, "UpDice");
//# sourceMappingURL=UpDice.js.map