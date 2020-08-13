/**
 * author wxz
 * date 2020.6.15
 * @class AcAskGodSkinRewardPopView
 */
class AcAskGodSkinRewardPopView extends PopupView
{
    public _scrollList:ScrollList = null;
    private _numTxt:BaseTextField = null;
    public constructor(data?:any)
    {
        super();
    }

    public initView():void
    {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACASKGOD_SHOPEXCHANGE, this.changeHandle, this);

        // let itembg = BaseBitmap.create("acaskgod_numbg2");
        // itembg.setPosition(GameConfig.stageWidth/2-itembg.width/2, 10);
        // this.addChildToContainer(itembg);

        let dataList = this.cfg.getShopList();

        // let icon = BaseBitmap.create("itemicon"+dataList[0].needItem);
        // icon.setScale(0.45);
        // icon.x = GameConfig.stageWidth/2 - 40;
        // icon.y = itembg.y + itembg.height/2 - icon.height*icon.scaleY/2;
        // this.addChildToContainer(icon);

        // let have = Api.itemVoApi.getItemNumInfoVoById(dataList[0].needItem)
        // let numTxt = ComponentManager.getTextField(String(have), 20,TextFieldConst.COLOR_WHITE);
        // numTxt.x = icon.x + icon.width*icon.scaleX + 5;
        // numTxt.y = itembg.y + itembg.height/2 - numTxt.height/2;
        // this.addChildToContainer(numTxt);
        // this._numTxt = numTxt;

        let bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 650;
        // bg.setPosition(55, itembg.y+itembg.height+10);
        bg.setPosition(55, 10);
        this.addChildToContainer(bg);

        let rect =  new egret.Rectangle(0, 0, 520, bg.height-10);
        let scrollList = ComponentManager.getScrollList(AcAskGodSkinRewardScrollItem, dataList, rect, {aid:this.aid, code:this.code});
        scrollList.setPosition(60, bg.y+5);
        this.addChildToContainer(scrollList);
        this._scrollList = scrollList;

        // this.freshView();
    }

    private freshView():void
    {
        let dataList = this.cfg.getShopList();
        this._scrollList.refreshData(dataList,{aid:this.aid, code:this.code});

        // let have = Api.itemVoApi.getItemNumInfoVoById(dataList[0].needItem);
        // this._numTxt.text = String(have);
    }

	private changeHandle(event:egret.Event):void
	{
        if(!event.data.ret)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
		let rdata = event.data.data.data;
		let replacerewards = rdata.replacerewards;
		if (replacerewards) 
		{
			ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
		} 			
		if(rdata.rewards)
		{
			let rewardVoList = GameData.formatRewardItem(rdata.rewards);
			App.CommonUtil.playRewardFlyAction(rewardVoList);      
		}
        this.freshView();
	}
    private get cfg():Config.AcCfg.AskGodCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
    
    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get code():string{
        return this.param.data.code;
    }
	
    private get vo():AcAskGodVo{
        return <AcAskGodVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

	// protected getShowHeight():number
	// {
	// 	return 800;
    // }
    protected resetBgSize():void
    {
        super.resetBgSize();
        this.container.x = 0;
    }      
	protected getBgExtraHeight():number
	{
		return 10;
	}    
	protected getTitleStr():string
	{
        return "acAskGodExchangeTitle-"+this.getTypeCode();
	}  
    protected getResourceList():string[]
    {
        let arr = [];
        let dataList = this.cfg.getShopList();
        for(let i = 0; i < dataList.length; i++)
        {
            let type = parseInt(dataList[i].getReward.split("_")[0]);
            let id = parseInt(dataList[i].getReward.split("_")[1]);

            if(type == 6)
            {
                let itemCfg=Config.ItemCfg.getItemCfgById(id);
                let getStr = itemCfg.getRewards;
                if(getStr && getStr.split("_")[0] == "19")
                {
                    let itemSerCfg = Config.ServantskinCfg.getServantSkinItemById(getStr.split("_")[1]);
                    arr.push(itemSerCfg.body);
                }else
                {
                    arr.push(itemCfg.icon);
                }
            }else if(type == 11)
            {
                let itemCfg=Config.TitleCfg.getTitleCfgById(id);
                arr.push(itemCfg.icon);
            }else if(type == 16)
            {
                let itemCfg = Config.WifeskinCfg.getWifeCfgById(id);
                arr.push(itemCfg.body);
            }else if(type == 19)
            {
                let itemCfg = Config.ServantskinCfg.getServantSkinItemById(id);
                arr.push(itemCfg.body);
            }
            if(arr.indexOf("itemicon"+dataList[i].needItem) < 0)
            {
                arr.push("itemicon"+dataList[i].needItem);
            }
        }
        return super.getResourceList().concat(arr).concat(["servant_info_detail"]);;
    }    
    public dispose(){
        super.dispose();
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACASKGOD_SHOPEXCHANGE, this.changeHandle, this);
    }
}