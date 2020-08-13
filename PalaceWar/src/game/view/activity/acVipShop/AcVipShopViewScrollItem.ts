//vip
class AcVipShopViewScrollItem  extends ScrollListItem
{
    private _uiData = undefined;
    private _progress:ProgressBar;
    private _collectFlag:BaseBitmap;
    private _rechargeItem = null;
    private _collectBtn:BaseButton;
    private _chargeBtn:BaseButton;
    private _curIdx:number=0;
    private _lastReqIdx:number = null;
    //购买按钮
	private _buyBtn:BaseButton;
    private _databuyNum:Array<number> =[];   
    private _data = null;
    private _needGod:number =0;
    private _buyNum:number=0;
    private _acVo:AcVipShopVo =null;
    private _itemParam:string = "";
    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:any,itemParam?:any)
    {    
        let currVipLevel:number =Api.playerVoApi.getPlayerVipLevel();
        let currNextVipLevel:number =Api.playerVoApi.getPlayerNextVipLevel();
        
        this._databuyNum=data.buyNum;
        this._data = data;
        this._itemParam =  itemParam;
        // console.log(this._itemParam+"_code");
        
        let bg = BaseBitmap.create("public_9_managebg");
        bg.width = 189;
        bg.height = 237;
        this.addChild(bg);
 
        let icon = GameData.getRewardItemIcons(data.content,true)[0];
        icon.x=bg.width-icon.width-(bg.width-icon.width)/2;
        icon.y=bg.y+10;
        this.addChild(icon);
        if(data.needVip>0)
        {
            //红色角标
            let redIcon = BaseBitmap.create("acvipshopview_red");
            redIcon.x=icon.x;
            redIcon.y=icon.y;
            this.addChild(redIcon);

         	let vipImg = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(data.needVip).icon);
            this.addChild(vipImg);
            vipImg.anchorOffsetX =vipImg.width/2;
            vipImg.anchorOffsetY =vipImg.height/2;
            vipImg.scaleX =0.72;
            vipImg.scaleY =0.72;
            vipImg.rotation= vipImg.rotation-45;
           
            vipImg.x=redIcon.x+vipImg.width/2-5;
            vipImg.y=redIcon.y+vipImg.height+35;
          
        
        }
      
        //当前vip限购
        let activityTimerText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        let str = ""
        if(currVipLevel==0&&data.buyNum[currVipLevel]==0)
        {
           str = LanguageManager.getlocal("vipshopbuydes0",[currVipLevel+"",data.buyNum[currVipLevel]+""]);
           activityTimerText.x =icon.x+15;
        }
        else
        {   if(data.buyNum[currVipLevel]==0)
            {
               str = LanguageManager.getlocal("vipshopbuydes_red",[currVipLevel+"",data.buyNum[currVipLevel]+""]);
            }
            else
            {
               str = LanguageManager.getlocal("vipshopbuydes",[currVipLevel+"",data.buyNum[Math.min(currVipLevel, this._data.buyNum.length - 1)]+""]);
            }
            activityTimerText.x =icon.x-10;
        } 
       
        activityTimerText.text=str;
        activityTimerText.y =icon.y+icon.height+5;
      
        this.addChild(activityTimerText);
        this._buyNum = data.buyNum[currVipLevel];
        
        
        if(currVipLevel==Config.VipCfg.getMaxLevel())
        {
            activityTimerText.y =icon.y+icon.height+15;
        }
        else
        {
              //下一个vip限购
            var nextActivityTimerText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            let str2 = LanguageManager.getlocal("vipshopbuydes",[currNextVipLevel+"",data.buyNum[Math.min(currNextVipLevel, this._data.buyNum.length - 1)]+""]);
            nextActivityTimerText.text=str2;
            nextActivityTimerText.x=icon.x-10;
            nextActivityTimerText.y =activityTimerText.y+25;
            nextActivityTimerText.alpha=0.5;
            this.addChild(nextActivityTimerText);
            
            var num =this.getNextVipNum(data.buyNum[currVipLevel],data.buyNum[currNextVipLevel]);
            let maxNum =this._databuyNum.length-1;
            if(num&&num>0&&num!=maxNum)
            {
                str2 = LanguageManager.getlocal("vipshopbuydes",[num+"",data.buyNum[Math.min(num, this._data.buyNum.length - 1)]+""]);
                nextActivityTimerText.text=str2;
            }
        }
      
        //购买过的价格 
        let acVo = <AcVipShopVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACVIPSHOP,this._itemParam);
        this._acVo=acVo;
        var buyNum =0;
        if(acVo.shop)
        {   
            buyNum=acVo.shop[(data.id)];
        }
      
	    if(buyNum){
		   buyNum = buyNum;
           this._buyNum = data.buyNum[currVipLevel]-buyNum;
            //当前的
             let str = LanguageManager.getlocal("vipshopbuydes",[currVipLevel+"",data.buyNum[Math.min(currVipLevel, this._data.buyNum.length - 1)]-buyNum+""]);
             activityTimerText.text=str;
             if(data.buyNum[Math.min(currVipLevel, this._data.buyNum.length - 1)]-buyNum==0)
             {
                let str = LanguageManager.getlocal("vipshopbuydes_red",[currVipLevel+"",data.buyNum[Math.min(currVipLevel, this._data.buyNum.length - 1)]-buyNum+""]);
                 activityTimerText.text=str;
             }

             if(currVipLevel!=Config.VipCfg.getMaxLevel())
             {
                let str2 = LanguageManager.getlocal("vipshopbuydes",[currNextVipLevel+"",data.buyNum[Math.min(currNextVipLevel, this._data.buyNum.length - 1)]-buyNum+""]);
                var num =this.getNextVipNum(data.buyNum[currVipLevel],data.buyNum[currNextVipLevel]);
                let maxNum =this._databuyNum.length-1;
                if(num&&num>0&&num!=maxNum)
                {
                    str2 = LanguageManager.getlocal("vipshopbuydes",[num+"",data.buyNum[Math.min(num, this._data.buyNum.length - 1)]-buyNum+""]);
                }
                nextActivityTimerText.text=str2; 
             }
		}
        else
        {
            buyNum = 0;
        }

        let currBuyNum:number =data.buyNum[currVipLevel];
        let maxVip =Config.VipCfg.getMaxLevel();
        if(currBuyNum===buyNum&&currBuyNum!=0&&Api.vipVoApi.checkMaxVipLevel()==true)
        {

            let soldoutTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            soldoutTxt.text =LanguageManager.getlocal("vipshopSoldoutdes");
            soldoutTxt.x = icon.x+15;  
            soldoutTxt.y = icon.y+icon.height+60;
            this.addChild(soldoutTxt);
            return;
        }
        
        this._needGod =data.buyCost[buyNum];
        if(!this._needGod&&data.buyNum.length>data.buyCost.length)
        {
            this._needGod  = data.buyCost[data.buyCost.length-1];
        }
        this._buyBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"nothing",this.buyHandler,this);
        this._buyBtn.setText(this._needGod.toString(),false);
        this._buyBtn.addTextIcon("public_icon1");
        this._buyBtn.x = icon.x-30;  
        this._buyBtn.y = bg.y+bg.height - this._buyBtn.height-7;
        this.addChild(this._buyBtn);
         //购买过的限购次数
      
           
    }
    private getNextVipNum(num1:number,num2:number,boo:boolean=false):number
    {
        if(num1==num2)
        {
            for(var i:number=0;i<this._databuyNum.length;i++)
            {
                if(this._databuyNum[i]>num1)
                {  
                     return this._databuyNum.indexOf(this._databuyNum[i]);
                }
            }
        }
    }

    private buyHandler(param:any):void
	{
        if(this._acVo.isStart==false)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return
        }
        //活动已结束
    
        
		if(this._data.needVip > Api.playerVoApi.getPlayerVipLevel())
		{
			// App.CommonUtil.showTip(LanguageManager.getlocal("vipLvNotEnough"));
            ViewController.getInstance().openView(ViewConst.POPUP.ACVIPSHOPPOPUPVIEW,{
                code:this._itemParam,
            });
			return;
		}
		 
		if(this._buyNum == 0)
		{
             ViewController.getInstance().openView(ViewConst.POPUP.ACVIPSHOPPOPUPVIEW,
             {
                code:this._itemParam,
             });
			// App.CommonUtil.showTip(LanguageManager.getlocal("shopNumNotEnough"));
			return;
		}
		if(this._needGod > Api.playerVoApi.getPlayerGem())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			return;
		}
	    // console.log(this._itemParam+"_itemParam");
     
		NetManager.request(NetRequestConst.ACTIVITY_BUYVIPSHOP,{"activeId":AcConst.AID_ACVIPSHOP+"-"+this._itemParam,shopId:this._data.id});
	
    }
    public getSpaceX():number
	{
		return 10;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 10;
	}
    public dispose():void
    {
        this._uiData = null;
        this._collectFlag = null;
        this._progress = null;
        this._collectBtn = null;
        this._chargeBtn = null;
        this._curIdx = 0;
        this._rechargeItem = null;
        this._lastReqIdx = null;
        this._acVo =null;
         this._itemParam =null;

        super.dispose();
    }
}
