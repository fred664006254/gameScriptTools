/**
 * 门客信息，道具部分
 * author yanyuling
 * date 2017/11/20
 * @class ServantInfoItemsScrollItem
 */

class ServantInfoItemsScrollItem extends ScrollListItem
{
    private _numTF:BaseTextField;
    public static servantId = "";
    private _lastUseNum:number = 0;
    private _isRequsting:boolean = false;
	private _mainTaskHandKey:string = null;
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:any)
    {
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.useBtnHandlerCallBaclk,this);
        this.width = 149 + 6;
        this.height = 264;
        let bottomBg = BaseBitmap.create("servant_equipbg");
        this.addChild(bottomBg); 

        let sid=ServantInfoItemsScrollItem.servantId;
        let eid = data;

        let isMaxQualityAndLv=Api.servantVoApi.checkEquipMaxQualityAndLv(sid,eid);
        // let isMaxQuality=Api.servantVoApi.checkEquipMaxQuality(sid,eid);
 
        let cfg = Config.ServantCfg.getServantItemById(ServantInfoItemsScrollItem.servantId);
        //分文武
        let itembg = BaseBitmap.create(`servant_equip_iconbg`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itembg, bottomBg, [0,47]);
        this.addChild(itembg); 
        
        let quality = Api.servantVoApi.getEquipQuality(ServantInfoItemsScrollItem.servantId, data);
        let qulitybg= BaseBitmap.create(`servant_equip_iconqulaity${quality}`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, qulitybg, itembg);
        this.addChild(qulitybg); 

		let item = BaseBitmap.create(`servant_equip${cfg.getServantType()}_icon${data}`); 
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, item, itembg, [0,2]);
        this.addChild(item); 
        
        let lvbg = BaseBitmap.create(`servant_equip_numbg`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, lvbg, itembg, [5,104]);
        this.addChild(lvbg); 

        let lv = Api.servantVoApi.getEquipAddLv(ServantInfoItemsScrollItem.servantId,data);
		this._numTF = ComponentManager.getTextField( isMaxQualityAndLv ? `Max` : `+${lv}`, 22, 0xFEFEFE);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._numTF, lvbg, [-5,3]);
		this.addChild(this._numTF);

        let itemNameTxt = ComponentManager.getTextField("",22,0x410D00);
        itemNameTxt.text = LanguageManager.getlocal(`servant_equip${cfg.getServantType()}_${data}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itemNameTxt, lvbg, [0,lvbg.height+5]);
        this.addChild(itemNameTxt);

        let itemDescTxt = ComponentManager.getTextField(LanguageManager.getlocal(`servant_equip${data}Add`, [App.StringUtil.changeIntToText2(Api.servantVoApi.getEquipAddAttr(data, quality, lv))]),18,0x410D00);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itemDescTxt, itemNameTxt, [0,itemNameTxt.height+10]);
        this.addChild(itemDescTxt);

        this.addTouchTap(()=>{
            ViewController.getInstance().openView(ViewConst.POPUP.SERVANTEQUIPLEVELUPOPVIEW,{
                sid : ServantInfoItemsScrollItem.servantId,
                eid : data,
            })

            if (Api.rookieVoApi.curGuideKey == "upequip") {
                Api.rookieVoApi.checkNextStep();
            }
        },this);

        let flag = false;
        let arr = Config.ServantequiplCfg.getCostEquipItem(data);
        for(let i = 0; i < arr.length; ++ i){
            if(Api.itemVoApi.getItemNumInfoVoById(arr[i].item)){
                flag = true;
                break;
            }
        }
        if(flag && (!isMaxQualityAndLv)){
            let reddot = BaseBitmap.create(`public_dot2`);
            this.addChild(reddot);
            reddot.x = 105;
            reddot.y = 47;
        }

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
        
    }

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

     public dispose():void
    {
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.useBtnHandlerCallBaclk,this);
        this._lastUseNum = 0;
        this._numTF = null;
        this._isRequsting = false;
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        super.dispose()
    }
}