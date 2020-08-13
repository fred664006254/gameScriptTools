/**
 * 门客信息，道具部分
 * author yanyuling
 * date 2017/11/20
 * @class ServantInfoItemsScrollItem
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
var ServantInfoItemsScrollItem = (function (_super) {
    __extends(ServantInfoItemsScrollItem, _super);
    function ServantInfoItemsScrollItem() {
        var _this = _super.call(this) || this;
        _this._lastUseNum = 0;
        _this._isRequsting = false;
        _this._mainTaskHandKey = null;
        return _this;
    }
    ServantInfoItemsScrollItem.prototype.initItem = function (index, data) {
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.useBtnHandlerCallBaclk,this);
        this.width = 149 + 6;
        this.height = 264;
        var bottomBg = BaseBitmap.create("servant_equipbg");
        this.addChild(bottomBg);
        var cfg = Config.ServantCfg.getServantItemById(ServantInfoItemsScrollItem.servantId);
        //分文武
        var itembg = BaseBitmap.create("servant_equip_iconbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itembg, bottomBg, [0, 47]);
        this.addChild(itembg);
        var quality = Api.servantVoApi.getEquipQuality(ServantInfoItemsScrollItem.servantId, data);
        var qulitybg = BaseBitmap.create("servant_equip_iconqulaity" + quality);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, qulitybg, itembg);
        this.addChild(qulitybg);
        var item = BaseBitmap.create("servant_equip" + cfg.getServantType() + "_icon" + data);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, item, itembg);
        this.addChild(item);
        var lvbg = BaseBitmap.create("servant_equip_numbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, lvbg, itembg, [0, 104]);
        this.addChild(lvbg);
        var lv = Api.servantVoApi.getEquipAddLv(ServantInfoItemsScrollItem.servantId, data);
        this._numTF = ComponentManager.getTextField(quality == 6 ? "Max" : "+" + lv, 22, 0xFEFEFE);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._numTF, lvbg, [0, 3]);
        this.addChild(this._numTF);
        var itemNameTxt = ComponentManager.getTextField("", 22, 0x410D00);
        itemNameTxt.text = LanguageManager.getlocal("servant_equip" + cfg.getServantType() + "_" + data);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itemNameTxt, lvbg, [0, lvbg.height + 5]);
        this.addChild(itemNameTxt);
        var itemDescTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_equip" + data + "Add", [Api.servantVoApi.getEquipAddAttr(data, quality, lv) + ""]), 22, 0x410D00);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itemDescTxt, itemNameTxt, [0, itemNameTxt.height + 10]);
        this.addChild(itemDescTxt);
        this.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.SERVANTEQUIPLEVELUPOPVIEW, {
                sid: ServantInfoItemsScrollItem.servantId,
                eid: data,
            });
        }, this);
        // let useBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"useBtn",this.useBtnHandler,this);
        // useBtn.x = bottomBg.x + bottomBg.width - 165;
        // useBtn.y = bottomBg.y + bottomBg.height/2 - useBtn.height/2;
        // useBtn.scaleX =1;
        // useBtn.scaleY =1;
        // this.addChild(useBtn);
        // let tmpthis = this;
        // egret.callLater(function() {
        //     if(!tmpthis || !tmpthis.parent){
        //         return
        //     }
        //     this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(useBtn, useBtn.width/2, useBtn.height/2, [useBtn], 107, true, function() {
        //         if (index === 0 && ServantInfoItemsScrollItem.servantId === Api.servantVoApi.getIdOfTotalMax()) {
        //             tmpthis.parent.setChildIndex(tmpthis, 100);
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     }, tmpthis);
        // }, tmpthis);
    };
    // protected showTipAfterUse(rewardsStr)
    // {
    //     let addStr = "";
    //     let rewardTab = App.StringUtil.splitString(rewardsStr,"_");
    //     if (rewardTab[0] == "7")
    //     {
    //         addStr = LanguageManager.getlocal("servantInfo_speciality"+rewardTab[1]) + "+" + rewardTab[2] ;
    //     }else
    //     {
    //         addStr = LanguageManager.getlocal("servantRewardType"+rewardTab[0],[rewardTab[2]]);
    //     }
    //     App.CommonUtil.showTip(addStr);
    // }
    // protected useBtnHandlerCallBaclk(event:egret.Event)
    // {
    //     if(event && !this._isRequsting)
    // 	{
    // 		this._isRequsting = false;
    // 		return;
    // 	}
    //     if(event.data.data.ret !=0)
    //     {
    //         App.CommonUtil.showTip(LanguageManager.getlocal("servantinfo_itemuseFailed"));
    //         return;
    //     }
    //     let rdata = event.data.data.data;
    //     let rewardList = GameData.formatRewardItem(rdata.rewards);
    //     App.CommonUtil.playRewardFlyAction(rewardList);
    //     if (this._lastUseNum > 0)
    //     {
    //         App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRSH_SERVANT_ITEM_USE,this._lastUseNum);
    //     }
    //     let num=  0;
    //     if (this._itemId)
    //     {
    //         num = Api.itemVoApi.getItemNumInfoVoById(this._itemId);
    //     }
    //     if (num > 0)
    //     {
    //         this._numTF.text = num.toString();
    //     }else
    //     {   this._itemId = null;
    //         App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST);
    //     }
    // }
    // protected doUseRequest(num:number)
    // {
    //     this._lastUseNum = num;
    //     let tmpServantId = ServantInfoItemsScrollItem.servantId;
    //     NetManager.request(NetRequestConst.REQUEST_USE_ITEM,{itemId:this._itemId,itemNum:num,servantId:tmpServantId});
    // }
    // protected useBtnHandler()
    // {
    //     /**
    //      * 需要刷新父UI的道具总数量
    //      */
    //     let num=  Api.itemVoApi.getItemNumInfoVoById(this._itemId);
    //     this._isRequsting = true;
    //     if (num >= 5)
    //     {
    //         ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW,{itemId:this._itemId,callback:this.doUseRequest,handler:this});
    //         return;
    //     }
    //     this.doUseRequest(1);
    // }
    ServantInfoItemsScrollItem.prototype.dispose = function () {
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.useBtnHandlerCallBaclk,this);
        this._lastUseNum = 0;
        this._numTF = null;
        this._isRequsting = false;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    ServantInfoItemsScrollItem.servantId = "";
    return ServantInfoItemsScrollItem;
}(ScrollListItem));
__reflect(ServantInfoItemsScrollItem.prototype, "ServantInfoItemsScrollItem");
