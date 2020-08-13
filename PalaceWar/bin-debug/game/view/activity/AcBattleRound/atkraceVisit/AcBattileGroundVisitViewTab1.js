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
 * 防守消息
 */
var AcBattileGroundVisitViewTab1 = (function (_super) {
    __extends(AcBattileGroundVisitViewTab1, _super);
    function AcBattileGroundVisitViewTab1(data) {
        var _this = _super.call(this) || this;
        _this.defenseList = [];
        _this._scrollList = null;
        _this.noDataTxt = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcBattileGroundVisitViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattileGroundVisitViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattileGroundVisitViewTab1.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattileGroundVisitViewTab1.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattileGroundVisitViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattileGroundVisitViewTab1.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 516;
        bg.height = 618;
        bg.x = 25;
        bg.y = 55; // GameConfig.stageHeigth - bg.height-240;
        this.addChild(bg);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY), this.freshlist, this);
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY, {
            activeId: this.acTivityId
        });
        AcBattileGroundVisitViewTab1.AtkaceType = 0;
        // public useCallback(data:any):void
        // {
        // 	if(data.data.ret)
        // 	{
        // 		if(data.data.data.data.atkrace.dinfo&&data.data.data.data.atkrace.dinfo.length>=1)
        // 		{
        // 			this.defenseList=data.data.data.data.atkrace.dinfo;
        // 			if(AtkraceVisitViewTab1.AtkaceType ==0)
        // 			{
        // 				this.showList();
        // 			}
        // 		}
        // 		else 
        // 		{
        // 			//没有数据消息
        // 			if(this.noDataTxt==null)
        // 			{
        // 				this.noDataTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_WHITE);
        // 				this.noDataTxt.text =LanguageManager.getlocal("atkracedes1");
        // 				this.noDataTxt.x = 220;//rankImg.x+60
        // 				if(PlatformManager.checkIsEnLang()){
        // 					this.noDataTxt.x = 570 / 2 - this.noDataTxt.width / 2;
        // 				}
        // 				this.noDataTxt.y = 300;//rankImg.y+10;
        // 			}
        // 			this.addChild(this.noDataTxt);
        // 		}	
        // 	}
    };
    AcBattileGroundVisitViewTab1.prototype.showList = function () {
        if (this._scrollList == null) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 640, 610);
            this._scrollList = ComponentManager.getScrollList(AcBattileGroundVisitTab1Item, this.defenseList, rect);
            this.addChild(this._scrollList);
            this._scrollList.setPosition(-35, 60);
        }
    };
    AcBattileGroundVisitViewTab1.prototype.freshlist = function (evt) {
        if (evt.data.ret == false) {
            return;
        }
        if (evt.data.data.data && evt.data.data.data.dinfo) {
            if (AcBattileGroundVisitViewTab1.AtkaceType == 0) {
                if (this._scrollList) {
                    this._scrollList.dispose();
                    this._scrollList = null;
                }
                var dinfo = evt.data.data.data.dinfo;
                if (dinfo && dinfo.length >= 1) {
                    this.defenseList = dinfo;
                    this.showList();
                }
                else {
                    //没有数据消息
                    if (this.noDataTxt == null) {
                        this.noDataTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_WHITE);
                        this.noDataTxt.text = LanguageManager.getlocal("atkracedes1");
                        this.noDataTxt.x = 220; //rankImg.x+60
                        if (PlatformManager.checkIsEnLang()) {
                            this.noDataTxt.x = 570 / 2 - this.noDataTxt.width / 2;
                        }
                        this.noDataTxt.y = 300; //rankImg.y+10;
                    }
                    this.addChild(this.noDataTxt);
                }
            }
        }
        // NetManager.request(NetRequestConst.REQUEST_ATKRACE_GETMODEL, {});
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_GETMODEL), this.useCallback, this);
    };
    AcBattileGroundVisitViewTab1.prototype.dispose = function () {
        this.noDataTxt = null;
        this.defenseList = [];
        this._scrollList = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_ENERMY), this.freshlist, this);
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_GETMODEL), this.useCallback, this);
        AcBattileGroundVisitViewTab1.AtkaceType = 0;
        _super.prototype.dispose.call(this);
    };
    AcBattileGroundVisitViewTab1.AtkaceType = 0;
    return AcBattileGroundVisitViewTab1;
}(PopupViewTab));
__reflect(AcBattileGroundVisitViewTab1.prototype, "AcBattileGroundVisitViewTab1");
//# sourceMappingURL=AcBattileGroundVisitViewTab1.js.map