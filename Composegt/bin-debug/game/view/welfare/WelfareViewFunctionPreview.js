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
var WelfareViewFunctionPreview = (function (_super) {
    __extends(WelfareViewFunctionPreview, _super);
    function WelfareViewFunctionPreview() {
        var _this = _super.call(this) || this;
        _this.arr2 = [];
        return _this;
    }
    WelfareViewFunctionPreview.prototype.init = function () {
        _super.prototype.init.call(this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_UPGRADE), this.refreshText, this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD),this.refreList,this);
        this.refreshDataList();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 492, GameConfig.stageHeigth - 70);
        this._scrollList = ComponentManager.getScrollList(WelfareViewFunctionScrollltem, this.arr2, rect);
        this.addChild(this._scrollList);
        this.bottomBg.visible = false;
        var bottomBg = BaseBitmap.create("public_9v_bg03");
        bottomBg.width = 490;
        bottomBg.height = GameConfig.stageHeigth - 65;
        bottomBg.x = 0;
        bottomBg.y = 0;
        this.addChild(bottomBg);
    };
    WelfareViewFunctionPreview.prototype.refreshText = function () {
        // console.log("玩家升官了！！");
        //1 玩家升官
        //2 关卡》2 >80;
        //3 子嗣 1个  培养一个成年子嗣
        //4 门客15个且大于60级
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT);
    };
    WelfareViewFunctionPreview.prototype.refreshDataList = function () {
        this.arr2 = [];
        var arr = Api.otherInfoVoApi.getUnlockList(); //领取数据 
        var arr2 = [];
        arr2 = Config.UnlocklistCfg.getUnlockItemCfgList();
        var arr3 = []; //已经领取过的
        var arr4 = []; //可以领取的
        var arr5 = []; //不可以领取的
        for (var i = 0; i < arr2.length; i++) {
            if (arr && arr[arr2[i].key] == 1) {
                arr3.push(arr2[i]);
            }
            else {
                if (Api[arr2[i].gameName + "VoApi"] && Api[arr2[i].gameName + "VoApi"].isShowNpc) {
                    var isShowNpc = Api[arr2[i].gameName + "VoApi"].isShowNpc();
                    if (isShowNpc) {
                        arr4.push(arr2[i]);
                    }
                    else {
                        arr5.push(arr2[i]);
                    }
                }
            }
        }
        arr3.sort(function (a, b) {
            if (a.sortId > b.sortId)
                return 1;
            else if (a.sortId == b.sortId)
                return 0;
            return -1;
        });
        arr4.sort(function (a, b) {
            if (a.sortId > b.sortId)
                return 1;
            else if (a.sortId == b.sortId)
                return 0;
            return -1;
        });
        arr5.sort(function (a, b) {
            if (a.sortId > b.sortId)
                return 1;
            else if (a.sortId == b.sortId)
                return 0;
            return -1;
        });
        arr2 = arr4.concat(arr5).concat(arr3);
        this.arr2 = arr2;
    };
    // private refreList():void
    // {
    // 	this.refreshDataList();
    // 	if(this._scrollList)
    // 	{
    // 		this._scrollList.refreshData(this.arr2);
    // 	}
    // } 
    WelfareViewFunctionPreview.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "funtionbottom"
        ]);
    };
    WelfareViewFunctionPreview.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_UPGRADE), this.refreshText, this);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETUNLOCKLISTREWARD),this.refreList,this);
        this._scrollList = null;
        this.arr2 = [];
        _super.prototype.dispose.call(this);
    };
    return WelfareViewFunctionPreview;
}(WelfareViewTab));
__reflect(WelfareViewFunctionPreview.prototype, "WelfareViewFunctionPreview");
