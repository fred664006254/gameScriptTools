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
 * 仇人
 */
var AcBattileGroundVisitViewTab2 = (function (_super) {
    __extends(AcBattileGroundVisitViewTab2, _super);
    function AcBattileGroundVisitViewTab2(data) {
        var _this = _super.call(this) || this;
        _this.einList = [];
        _this._scrollList = null;
        _this._bg = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcBattileGroundVisitViewTab2.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_BATTLEGROUND_BATTLEEND, this.sendList, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY), this.freshlist, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_REVENGE), this.challengeCallback, this);
        this._bg = BaseBitmap.create("public_9_probiginnerbg");
        this._bg.width = 516;
        this._bg.height = 618;
        this._bg.x = 25;
        this._bg.y = 55;
        this.addChild(this._bg);
        AcBattileGroundVisitViewTab1.AtkaceType = 1;
        //this.freshlist();
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY, {
            activeId: this.acTivityId
        });
    };
    AcBattileGroundVisitViewTab2.prototype.challengeCallback = function (evt) {
        var view = this;
        if (evt.data.ret < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundTip3-" + view.getUiCode()));
            view.sendList();
        }
        //NetManager.request(NetRequestConst.REQUEST_ATKRACE_GETMODEL, {});
    };
    Object.defineProperty(AcBattileGroundVisitViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattileGroundVisitViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattileGroundVisitViewTab2.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattileGroundVisitViewTab2.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattileGroundVisitViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattileGroundVisitViewTab2.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcBattileGroundVisitViewTab2.prototype.sendList = function () {
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY, {
            activeId: this.acTivityId
        });
    };
    AcBattileGroundVisitViewTab2.prototype.freshlist = function (evt) {
        if (evt.data.ret == false) {
            return;
        }
        if (evt.data.data.data) {
            var einfo = evt.data.data.data.einfo;
            if (einfo) {
                if (this._scrollList) {
                    this._scrollList.dispose();
                    this._scrollList = null;
                }
                this.einList = einfo;
                if (this.einList.length > 0) {
                    AcBattileGroundVisitViewTab1.AtkaceType = 1;
                    if (AcBattileGroundVisitViewTab1.AtkaceType == 1) {
                        this.showList();
                    }
                }
                else {
                    this.shownoDataTxt();
                }
            }
        }
    };
    // public useCallback(data:any):void
    // {	
    // 	if (this._scrollList)
    // 	{
    // 		this._scrollList.dispose();
    // 		this._scrollList = null;
    // 	}
    // 	if(data.data.ret)
    // 	{
    // 		if(data.data.data.data.atkrace.einfo)
    // 		{
    // 			this.einList=data.data.data.data.atkrace.einfo;
    // 			if(this.einList.length>0)
    // 			{
    // 					AcBattileGroundVisitViewTab1.AtkaceType=1;
    // 					if(AcBattileGroundVisitViewTab1.AtkaceType ==1)
    // 					{
    // 						this.showList();
    // 					}
    // 			}
    // 			else
    // 			{
    // 				this.shownoDataTxt();
    // 			}
    // 		}
    // 	}
    // 	else 
    // 	{	
    // 		this.shownoDataTxt();
    // 	}	
    // }
    AcBattileGroundVisitViewTab2.prototype.shownoDataTxt = function () {
        //没有仇人消息
        var noDataTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_WHITE);
        noDataTxt.text = LanguageManager.getlocal("atkracedes2");
        noDataTxt.x = 220; //rankImg.x+60
        if (PlatformManager.checkIsEnLang()) {
            noDataTxt.x = 570 / 2 - noDataTxt.width / 2;
        }
        noDataTxt.y = 300; //rankImg.y+10;
        this.addChild(noDataTxt);
    };
    AcBattileGroundVisitViewTab2.prototype.showList = function () {
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 640, 610);
        this._scrollList = ComponentManager.getScrollList(AcBattileGroundVisitTab2Item, this.einList, rect, this.code);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(-35, 60);
    };
    AcBattileGroundVisitViewTab2.prototype.dispose = function () {
        this.einList = [];
        this._bg = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_BATTLEGROUND_BATTLEEND, this.sendList, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY), this.freshlist, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_REVENGE), this.challengeCallback, this);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESET_ATKRACE,this.battleCallback,this);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_GETMODEL), this.useCallback, this);
        _super.prototype.dispose.call(this);
        AcBattileGroundVisitViewTab1.AtkaceType = 1;
    };
    return AcBattileGroundVisitViewTab2;
}(PopupViewTab));
__reflect(AcBattileGroundVisitViewTab2.prototype, "AcBattileGroundVisitViewTab2");
//# sourceMappingURL=AcBattileGroundVisitViewTab2.js.map