/**
 * 红颜许愿兑换
 * author yanyuling
 * date 2018/03/13
 * @class AcWishTreeExchangeItem
 */
class AcWishTreeExchangeItem  extends ScrollListItem
{
    private _cfgData:Config.AcCfg.WishTreeShopItem = null;
	public constructor() 
	{
		super();
	}

    protected initItem(index:number,data:any)
    {
        this._cfgData = data
        let wifeId = this._cfgData.wifeId;

        let bg = BaseBitmap.create("wishtree_listbg");
        this.addChild(bg);

        let nameTxt = ComponentManager.getTextField("",22);
        nameTxt.width = 25;
        nameTxt.multiline = true;
        nameTxt.lineSpacing = 4;
        nameTxt.text = LanguageManager.getlocal("wifeName_" +wifeId);
        nameTxt.x = 32;
        nameTxt.y = 90 - nameTxt.height/2;
        this.addChild(nameTxt);

        let headImg = BaseLoadBitmap.create("wife_half_" + wifeId);
        headImg.width = 205;
        headImg.height = 196;
        headImg.anchorOffsetY = headImg.height;
        headImg.setScale(0.9);
        headImg.x = 100;
        headImg.y = bg.y + bg.height-7;
        this.addChild(headImg);

        let costTxt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_BROWN);
        costTxt.text = LanguageManager.getlocal("acWishTreeCost",[""+this._cfgData.needNum]);
        costTxt.x = 510 - costTxt.width/2;
        costTxt.y = 80;
        this.addChild(costTxt);

        let exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"exchange",this.exchangeBtnHandler,this);
        exchangeBtn.x = 435;
        exchangeBtn.y = 110;
        this.addChild(exchangeBtn);
        this.checkMask();
    }
    
    protected checkMask()
    {
        if(Api.wifeVoApi.getWifeInfoVoById(this._cfgData.wifeId))
        {
            let mask = BaseBitmap.create("wishtree_mask");
            mask.touchEnabled = true;
            this.addChild(mask);

            let wishtree_get = BaseBitmap.create("wishtree_get");
            wishtree_get.x = mask.width/2 - wishtree_get.width/2;
            wishtree_get.y = mask.height/2 - wishtree_get.height/2;
            this.addChild(wishtree_get);
        }
    }
    protected exchangeBtnHandler()
    {
         if(Api.wifeVoApi.getWifeInfoVoById(this._cfgData.wifeId))
         {
             return;
         }
        let itemNum = Api.itemVoApi.getItemNumInfoVoById("2102");
        if (itemNum < this._cfgData.needNum)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("acWishTreeExchangeTip1"));
            return;
        }
        if(Api.wifeVoApi.getWifeInfoVoById(this._cfgData.wifeId))
        {
            return;
        }
        let vo = Api.acVoApi.getActivityVoByAidAndCode("wishTree");
        if(!vo.isStart)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_EXCHANGEWIFE,{activeId:vo.aidAndCode,shopId:this._cfgData.id});
    }
   
    public dispose():void
	{
        this._cfgData = null;
		super.dispose();
	}

}