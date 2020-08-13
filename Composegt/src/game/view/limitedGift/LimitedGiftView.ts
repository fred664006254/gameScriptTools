/*
author : jiang
date : 2018.9.4
desc : 限时礼包
*/
class LimitedGiftView extends PopupView{
    public constructor(){
        super();
    }

    private titleImg: BaseBitmap = null;
    private contentList: any[] = null;
    private _scrollList: any = null;
    private _rechargeCfgMap: any = null;
	// private _rechargeCfgMap = {
	// 	g29: "LimitedGiftSoldierEmpty",//士兵空了
	// 	g30: "LimitedGiftGoldEmpty",	//银两空了
	// 	g31: "LimitedGiftPowerEmpty",	//体力空了
	// 	g32: "LimitedGiftEnergyEmpty",	//红颜精力空了
	// 	g33: "LimitedGiftVigourEmpty",  //子嗣活力空了
	// 	g34: "LimitedGiftDinnerEmpty"	//酒楼举办宴会
	// };


    public initView(){
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY,this.receivePushData,this);

        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LIMITEDGIFT_REFRESHLIST,this.refreshList,this);
        this.titleImg = BaseBitmap.create("limitedgiftview_title");
        this.titleImg.x = this.viewBg.x + this.viewBg.width/2 - this.titleImg.width/2;
        this.titleImg.y = this.viewBg.y + 5;
        // this.addChild(this.titleImg);
        this.addChildToContainer(this.titleImg);
       
        this.showList();

    }
    private showList(): void {

      
        let rect = egret.Rectangle.create();
        rect.setTo(0, 0, 545, 685);


        //设置列表数据
        this.contentList = [];
        this._rechargeCfgMap = Api.limitedGiftVoApi.rechargeCfgMap;
        let vo = null;
        let cfg = null;
        let test = null;
        
      
        //当前弹出的key
        let showKey = Api.shopVoApi.getPayShow();
        let redKey = Api.shopVoApi.getPayRedpoint();

        for(let key in this._rechargeCfgMap){
            let isOpen = false;
            if (showKey){
                if (key == showKey){
                    isOpen = true;
                }
            } else {
                if(redKey){
                    if(key == redKey){
                        isOpen = true;
                    }
                }
            }

            vo = Api.shopVoApi.getPayInfoById2(key);
            cfg = Config.RechargeCfg.getRechargeItemCfgByKey(key);
            if(vo && cfg && vo.isbuy == 0){
                let timeTmp = vo.st + cfg.lastTime - GameData.serverTime;
                if (timeTmp > 0){
                    let contentData = {color:this._rechargeCfgMap[key].color,rechargeId: key,isOpen: isOpen,title: this._rechargeCfgMap[key].title, img:this._rechargeCfgMap[key].img,cost:cfg.cost,reward:cfg.getReward,time:vo.st + cfg.lastTime,gemCost:cfg.gemCost};
                    this.contentList.push(contentData);
                }
            }
        }
        this.contentList.sort((a:any,b:any)=>{
            return a.time - b.time;
        });
        if(showKey == null && redKey == null){
            if(this.contentList.length > 0){
                this.contentList[0].isOpen = true;
            }      
        }

   
        let curIndex = 0;
        for(let i = 0;i < this.contentList.length; i++){
            if(this.contentList[i].isOpen){
                curIndex = i;
                break;
            }
        }
        this._scrollList = ComponentManager.getScrollList(LimitedGiftScrollItem, this.contentList, rect);
      
        this._scrollList.x = this.viewBg.x + this.viewBg.width / 2 - this._scrollList.width / 2 ;
        this._scrollList.y = this.viewBg.y + 122;
        if(this.contentList.length > 0){
            this._scrollList.setScrollTopByIndex(curIndex);
        }  
  


        if(showKey){
            NetManager.request(NetRequestConst.REQUEST_SHOP_SHOW1COSTSCENEGIFT,{showtype:1});
        } else {
            if(redKey){
                NetManager.request(NetRequestConst.REQUEST_SHOP_SHOW1COSTSCENEGIFT,{showtype:2});
            }
        }

        this.addChildToContainer(this._scrollList);



    }
    private refreshList(event:egret.Event):void
    {
        

        for(let i = 0; i < this.contentList.length; i++){
            if(i == event.data){
                this.contentList[i].isOpen = true;
            } else {
                this.contentList[i].isOpen = false;
            }
        }
    
        this._scrollList.refreshData(this.contentList);

    }
    private refreshListData():void
    {
        //设置列表数据
        this.contentList = [];
        this._rechargeCfgMap = Api.limitedGiftVoApi.rechargeCfgMap;
        let vo = null;
        let cfg = null;
        let test = null;
        
      
        //当前弹出的key
        let showKey = Api.shopVoApi.getPayShow();
        for(let key in this._rechargeCfgMap){
            let isOpen = false;
            if (key == showKey){
                isOpen = true;
            }
            vo = Api.shopVoApi.getPayInfoById2(key);
            cfg = Config.RechargeCfg.getRechargeItemCfgByKey(key);
            if(vo && cfg && vo.isbuy == 0){
                let timeTmp = vo.st + cfg.lastTime - GameData.serverTime;
                if (timeTmp > 0){
                    let contentData = {color:this._rechargeCfgMap[key].color,rechargeId: key,isOpen: isOpen,title: this._rechargeCfgMap[key].title, img:this._rechargeCfgMap[key].img,cost:cfg.cost,reward:cfg.getReward,time:vo.st + cfg.lastTime};
                    this.contentList.push(contentData);
                }
            }
        }
        this.contentList.sort((a:any,b:any)=>{
            return a.time - b.time;
        });
        if(showKey == null){
            if(this.contentList.length > 0){
                this.contentList[0].isOpen = true;
            }      
        }

   
        let curIndex = 0;
        for(let i = 0;i < this.contentList.length; i++){
            if(this.contentList[i].isOpen){
                curIndex = i;
                break;
            }
        }
        if(this.contentList.length > 0 ){
            this._scrollList.refreshData(this.contentList);
            this._scrollList.setScrollTopByIndex(curIndex);
        } else {
            this.hide();
        }

    }


    protected getBgName():string
	{
		return "limitedgiftview_bg";
	}
    	/**
	 * 重置背景的高度 主要设置 btn的位置
	 * 仅适用于新的分享
	 */
	protected resetBgSize():void
	{
        super.resetBgSize();
        this.closeBtn.x = this.closeBtn.x + 5;
		this.closeBtn.y = this.closeBtn.y + 65;
        //增加vip经验的提示
        let tipBg = BaseBitmap.create("public_searchdescbg");
		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("addVipExpTip"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		tipBg.width = tipTxt.width + 60;
		tipBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - tipBg.width / 2,this.viewBg.y + this.viewBg.height + 10);
		tipTxt.setPosition(tipBg.x + tipBg.width / 2 - tipTxt.width / 2,tipBg.y + tipBg.height / 2 - tipTxt.height / 2);
		this.addChild(tipBg);
		this.addChild(tipTxt);
	}
    protected initViewBg():void
	{
        this.viewBg.height = 850;
	}
	protected getTitleStr():string
	{
		return null;
	}

    protected receivePushData(event:egret.Event):void
	{
        let data:{ret:boolean,data:any}=event.data;


		if(data.data.ret == 0 && data.data.cmd==NetPushConst.PUSH_PAY)
		{
            
            let cfg = Config.RechargeCfg.getRechargeItemCfgByKey(data.data.data.payment.itemId);
            let rewards = "1_1_" + cfg.gemCost + "|" + data.data.data.rewards;
            let rewObj = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewObj);
			// if(data.data.data.payment)
			// {
				// let itemid=data.data.data.payment.itemId;
				// PlatformManager.analyticsPay(itemid,data.data.data.payment.orderId,);
			// }
            this.refreshListData();
		}
	}

	/**
	 * 重新一下关闭按钮 
	 * 仅适用于新的分享
	 */
	protected getCloseBtnName():string
	{
		return "load_closebtn";
	}



    
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "firstchargebutton01",
          

        ]);
    } 




    
    public dispose():void
	{   
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.receivePushData,this);

        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LIMITEDGIFT_REFRESHLIST,this.refreshList,this);
        this.titleImg = null;
        this.contentList = null;
        this._scrollList = null;
        this._rechargeCfgMap = null;
        super.dispose();
    }
}