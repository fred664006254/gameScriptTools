/**
 * 提升才艺
 * author jiangliuyang---wxz
 */
class AcGroupWifeBattleTalentUpPopupView extends PopupView
{
	// 滑动列表
    private _data:any = null;
	

    private _caiyi:BaseTextField = null;
    private _caiqing:BaseTextField = null;
	
    private _key:number = 0;
    private _lastUseNum:number = 0;

    private _numTF1:BaseTextField = null;
    private _numTF2:BaseTextField = null;
    private _numTF3:BaseTextField = null;
    private _callback:any = null;
    private _target:any = null;
    private _acVo = null;
    private _isHaveBuff = null;
    private aid:string = null;
    private code :string = null;
	public constructor() 
	{
		super();
	}
	
	private get cfg() : Config.AcCfg.GroupWifeBattleCfg{
 		return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid,this.param.data.code);
	}
	private get vo() : AcGroupWifeBattleVo{
        return <AcGroupWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid,this.param.data.code);
    }
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "wifestatus_namebg",`countrywarrewardview_itembg`,`servant_fl`,
		]);
	}
    protected getTabbarName():string|string[]
	{
		return ButtonConst.BTN_WINTAB;
	}
	protected getTabbarGroupX():number
    {
        return 17;
    }
	protected getTabbarGroupY():number
	{
		return 110;
	}
	public initView():void
	{		

        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL,this.hide,this);
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFEBATTLE_EXTRACRASHMODEL,this.refreshUI,this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CRASHMODEL,this.refreshUI,this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_USE_ITEM,this.useCallback,this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFE_AWARD,this.useWifeCallback,this);
        this._data = this.param.data.d;
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;

        let innerBg = BaseBitmap.create("public_9_bg14");
        innerBg.width = 530;//bg.width - 15;
        innerBg.height = 155;//bg.height - 15;
        innerBg.x = this.viewBg.width / 2 - innerBg.width/2;
        innerBg.y = 10;
        this.addChildToContainer(innerBg);

		let bookBg = BaseBitmap.create("public_9_bg44");
		bookBg.width = 530;
		bookBg.height = 255;
		bookBg.x = this.viewBg.width / 2 - bookBg.width/2;//view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
		bookBg.y = innerBg.y + innerBg.height + 10;
		this.addChildToContainer(bookBg);

        // let nameBg = BaseBitmap.create("wifestatus_namebg");
        // nameBg.x = innerBg.x + innerBg.width/2 - nameBg.width/2;
        // nameBg.y = innerBg.y
        // this.addChildToContainer(nameBg);

        let icon = this.getWifestatusIcon(this._data.wid);
        icon.x = innerBg.x + 35;
        icon.y = innerBg.y + 10;
        this.addChildToContainer(icon);

        

        let caiyi:number = Api.wifeVoApi.getWifeInfoVoById(this._data.wid).artistry;
        this._caiyi = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentUpPopupViewCaiyi",[String(caiyi)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		this._caiyi.x = innerBg.x + 200;
        this._caiyi.y = innerBg.y + 25;
        this.addChildToContainer(this._caiyi);
        
        let flag1 = BaseBitmap.create(`servant_fl`);
        flag1.x = this._caiyi.x - flag1.width - 8;
        flag1.y = this._caiyi.y + (this._caiyi.height - flag1.height) / 2;
        this.addChildToContainer(flag1);

        let caiqing:number = this._data.talentadd;
        let caiqingp:number = this._data.taddnum?this._data.taddnum:0;
        let cqStr = this.checkHaveBuff() ? caiqing+`\n(${LanguageManager.getlocal(`wifeTalentUpPopupViewExtraCaiqing`, [`<font color=0x3e9b00>${caiqingp}</font>`])})` : caiqing+"";
        this._caiqing = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentUpPopupViewCaiqing1",[String(cqStr)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
        this._caiqing.lineSpacing = 5;
        this._caiqing.x = innerBg.x + 200;
        this._caiqing.y = innerBg.y + 85;
		this.addChildToContainer(this._caiqing);

        let flag2 = BaseBitmap.create(`servant_fl`);
        flag2.x = this._caiqing.x - flag2.width - 8;
        flag2.y = this._caiqing.y + 3;
        this.addChildToContainer(flag2);

        let tipbg = BaseBitmap.create(`countrywarrewardview_itembg`);
        tipbg.x = bookBg.x + (bookBg.width - tipbg.width) / 2;
        tipbg.y = bookBg.y + 17;
        this.addChildToContainer(tipbg);

        let tip:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentUpPopupViewUseItem"),20);
        tip.x = tipbg.x + tipbg.width/2 - tip.width/2;
        tip.y = tipbg.y + tipbg.height/2 - tip.height/2;;
        this.addChildToContainer(tip);

        let itemInfoVo1 = Api.itemVoApi.getItemInfoVoById("1355");
        let itemInfoVo2 = Api.itemVoApi.getItemInfoVoById("1356");
        let itemInfoVo3 = Api.itemVoApi.getItemInfoVoById("1360");

        let itemCfg1 = Config.ItemCfg.getItemCfgById("1355");
        let itemCfg2 = Config.ItemCfg.getItemCfgById("1356");
        let itemCfg3 = Config.ItemCfg.getItemCfgById("1360");

        let itemBg1:BaseButton = ComponentManager.getButton(itemCfg1.iconBg,null,this.upClick,this,[1],3);
        itemBg1.x = bookBg.x + 60;
        itemBg1.y = bookBg.y + 68;
        this.addChildToContainer(itemBg1);

        let item1:BaseBitmap = BaseLoadBitmap.create(itemCfg1.icon);
		item1.x = itemBg1.x + itemBg1.width/2 - 100/2;
		item1.y = itemBg1.y + itemBg1.height/2 - 100/2;
		this.addChildToContainer(item1); 

		this._numTF1 = ComponentManager.getTextField(String(itemInfoVo1?itemInfoVo1.num:0),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		
        let numbg1:BaseBitmap = BaseBitmap.create("public_9_itemnumbg");
        numbg1.height = 22;
        numbg1.width = this._numTF1.width+18;
        numbg1.x = itemBg1.x+itemBg1.width-numbg1.width-4;
        numbg1.y = itemBg1.y+itemBg1.height-numbg1.height-4;
        this.addChildToContainer(numbg1);        
        
		this._numTF1.x = numbg1.x + numbg1.width/2 - this._numTF1.width/2;
		this._numTF1.y = numbg1.y + numbg1.height/2 - this._numTF1.height/2;
		this.addChildToContainer(this._numTF1);



        let itemBg2:BaseButton = ComponentManager.getButton(itemCfg2.iconBg,null,this.upClick,this,[2],3);
        itemBg2.x = bookBg.x + 210;
        itemBg2.y = bookBg.y + 68;
        this.addChildToContainer(itemBg2);

        let item2:BaseBitmap = BaseLoadBitmap.create(itemCfg2.icon);
		item2.x = itemBg2.x + itemBg2.width/2 - 100/2;
		item2.y = itemBg2.y + itemBg2.height/2 - 100/2;
		this.addChildToContainer(item2); 

		this._numTF2 = ComponentManager.getTextField(String(itemInfoVo2?itemInfoVo2.num:0),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		
        let numbg2:BaseBitmap = BaseBitmap.create("public_9_itemnumbg");
        numbg2.height = 22;
        numbg2.width = this._numTF2.width+18;        
        numbg2.x = itemBg2.x+itemBg2.width-numbg2.width-4;
        numbg2.y = itemBg2.y+itemBg2.height-numbg2.height-4;
        this.addChildToContainer(numbg2);          
        
		this._numTF2.x = numbg2.x + numbg2.width/2 - this._numTF2.width/2;
		this._numTF2.y = numbg2.y + numbg2.height/2 - this._numTF2.height/2;
		this.addChildToContainer(this._numTF2);


        let itemBg3:BaseButton = ComponentManager.getButton(itemCfg3.iconBg,null,this.upClick,this,[3],3);
        itemBg3.x = bookBg.x + 360;
        itemBg3.y = bookBg.y + 68;
        this.addChildToContainer(itemBg3);

        let item3:BaseBitmap = BaseLoadBitmap.create(itemCfg3.icon);
		item3.x = itemBg3.x + itemBg3.width/2 - 100/2;
		item3.y = itemBg3.y + itemBg3.height/2 - 100/2;
		this.addChildToContainer(item3); 

		this._numTF3 = ComponentManager.getTextField(String(itemInfoVo3?itemInfoVo3.num:0),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		
        let numbg3:BaseBitmap = BaseBitmap.create("public_9_itemnumbg");
        numbg3.height = 22;
        numbg3.width = this._numTF3.width+18;         
        numbg3.x = itemBg3.x+itemBg3.width-numbg3.width-4;
        numbg3.y = itemBg3.y+itemBg3.height-numbg3.height-4;
        this.addChildToContainer(numbg3);           
        
		this._numTF3.x = numbg3.x + numbg3.width/2 - this._numTF3.width/2;
		this._numTF3.y = numbg3.y + numbg3.height/2 - this._numTF3.height/2;
		this.addChildToContainer(this._numTF3);


        let itemDesc1 = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentUpPopupViewItem1"),18);
        itemDesc1.x = itemBg1.x + itemBg1.width/2 - itemDesc1.width/2;
        itemDesc1.y = itemBg1.y + itemBg1.height +10;
        this.addChildToContainer(itemDesc1);

        let itemDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentUpPopupViewItem2"),18);
        itemDesc2.x = itemBg2.x + itemBg2.width/2 - itemDesc2.width/2;
        itemDesc2.y = itemBg2.y + itemBg2.height +10;
        this.addChildToContainer(itemDesc2);

        let itemDesc3 = ComponentManager.getTextField(LanguageManager.getlocal("wifeTalentUpPopupViewItem3"),18);
        itemDesc3.textAlign = egret.HorizontalAlign.CENTER;
        itemDesc3.x = itemBg3.x + itemBg3.width/2 - itemDesc3.width/2;
        itemDesc3.y = itemBg3.y + itemBg3.height +10;
        this.addChildToContainer(itemDesc3);

    }
    
    private checkHaveBuff():boolean
	{
		return true;
    }
    
    private refreshUI(event:egret.Event):void
    {
        if(event.data.ret && event.data.data.ret == 0){
			if(event && event.data.data.data.groupwifebattle){
				this.vo.setWifebattleInfo(event.data.data.data.groupwifebattle);
			}
        }
        let caiyi:number = Api.wifeVoApi.getWifeInfoVoById(this._data.wid).artistry;
        this._caiyi.text = LanguageManager.getlocal("wifeTalentUpPopupViewCaiyi",[String(caiyi)]);


        let arr = this.vo.wifebattlecross.info.tmpattr.wifeadd_arr; //Api.wifebattleVoApi.wifebattleVo.info.tmpattr.wifeadd_arr;
        arr = arr?arr:[];
        let data = null;
        for(let i = 0;i < arr.length; i ++){
            let d = arr[i];
            if(d.wid == this._data.wid){
                data = d;
                break;
            }
        }
        

        let caiqing:number = data.talentadd;
        let caiqingp:number = data.taddnum?data.taddnum:0;
        let cqStr = this.checkHaveBuff() ? caiqing+`\n(${LanguageManager.getlocal(`wifeTalentUpPopupViewExtraCaiqing`, [`<font color=0x3e9b00>${caiqingp}</font>`])})` : caiqing+"";
        this._caiqing.text = LanguageManager.getlocal("wifeTalentUpPopupViewCaiqing1",[String(cqStr)]);



        let itemInfoVo1 = Api.itemVoApi.getItemInfoVoById("1355");
        let itemInfoVo2 = Api.itemVoApi.getItemInfoVoById("1356");
        let itemInfoVo3 = Api.itemVoApi.getItemInfoVoById("1360");

        this._numTF1.text = String(itemInfoVo1?itemInfoVo1.num:0);
        this._numTF2.text = String(itemInfoVo2?itemInfoVo2.num:0);
        this._numTF3.text = String(itemInfoVo3?itemInfoVo3.num:0);

    }

    private upClick(type:number):void
    {
   
         this.chooseBtnClick(type);
        
    }

	private getWifestatusIcon(wifeId:string):BaseDisplayObjectContainer
	{
		let iconContainer = new BaseDisplayObjectContainer();
		let iconBg:BaseBitmap = BaseBitmap.create("wifestatus_headbg");

		iconBg.name = "bg2";
		iconContainer.addChild(iconBg);

			
        let iconStr = Api.wifeVoApi.getWifeIcon(wifeId);

		let icon = BaseLoadBitmap.create(iconStr);

		icon.setPosition(10,8)

			
        icon.setScale(0.52);

		
		iconContainer.cacheAsBitmap = true;
		
		iconContainer.addChild(icon);

		// iconContainer.addTouchTap(this.clickItemHandler,this,[wifeId]);

		let nameBg = BaseBitmap.create("wifestatus_namebg");
		nameBg.setPosition(iconContainer.width/2 - nameBg.width/2,105)
		iconContainer.addChild(nameBg);

		let wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
		let nameTF = ComponentManager.getTextField(wifeCfg.name,18);
		nameTF.x = nameBg.x + nameBg.width/2 - nameTF.width/2 ;
		nameTF.y = nameBg.y + nameBg.height/2 - nameTF.height/2;
		iconContainer.addChild(nameTF); 

		return iconContainer;
	}
	private chooseBtnClick(type){
		
        let itemId = null;
        let key = 0;
        if(type == 1){
            itemId = 1355;
            key = 5;
        } else if(type == 2){
            itemId = 1356;
            key = 6;
        } else if(type == 3){
            itemId = 1360;
        }
		let cfg = Config.WifebaseCfg.wifeGift
		this._key = key;
        
		let hasNum:number = Api.itemVoApi.getItemNumInfoVoById(itemId);


		if(hasNum <= 0)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
			return ;
		}
		else{
			if(hasNum < 5)
			{
                if(this._key == 0){
                    this._lastUseNum = 1;
                    NetManager.request(NetRequestConst.REQUEST_USE_ITEM,{itemNum:1,itemId:1360});
                     
                } else {
                    // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_WIFE_GIVE,{"key":key,"num":1});
                    NetManager.request(NetRequestConst.REQUEST_WIFE_AWARD, { wifeId: this._data.wid.toString(),key:String(key),rnum:1});
                }
				
			}	
			else{
				ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW,{itemId:itemId,maxNum:null,callback:this.useItem,handler:this});
			}
		}
		
		
	}
    private useItem(itemNum:number,itemId:number)
	{
		// let num = itemNum;
        this._lastUseNum = itemNum;
		let data = {"itemNum":itemNum,"itemId":itemId};
        WifeView.wifeId = this._data.wid;
        if(this._key == 0){
            NetManager.request(NetRequestConst.REQUEST_USE_ITEM,{itemNum:itemNum,itemId:1360});
        } else {
            NetManager.request(NetRequestConst.REQUEST_WIFE_AWARD, { wifeId: this._data.wid.toString(),key:String(this._key),rnum:itemNum});
        }
	}

    private useWifeCallback(event:egret.Event):void
    {
        let rdata = event.data.data.data;
        if(rdata && rdata.rewards)
        {
            let rewards= GameData.formatRewardItem(rdata.rewards);
            if(rewards&&rewards.length>0)
            {
                
                App.CommonUtil.playRewardFlyAction(rewards);
            }
        
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CRASHMODEL,{activeId:this.aid+"-"+this.code});
        }
    }


    // 刷新道具数量
	private useCallback(event:egret.Event):void
	{
		let rdata = event.data.data.data;
		let ifRefresh:boolean = false;
		let isGetItem:boolean = false;
		if(rdata && rdata.rewards)
		{
			let rewardList = GameData.formatRewardItem(rdata.rewards);
			// let list = [];
			for(let i = 0;i < rewardList.length;i++)
			{
				let rewardItemVo:RewardItemVo = rewardList[i];
				if (rewardItemVo.type == 6) {
					isGetItem = true;
					break;
				}
			}
			App.CommonUtil.playRewardFlyAction(rewardList);
		}
		
        let itemInfoVo = Api.itemVoApi.getItemInfoVoById("1360");
        ViewController.getInstance().openView(ViewConst.BASE.ITEMUSESUCCESSVIEW,[rdata.wifeArr,this._lastUseNum,itemInfoVo])

        NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CRASHMODEL,{activeId:this.aid+"-"+this.code});
		
	}



    public hide():void
    {
        // if(this._callback && this._target){
        //     this._callback.apply(this._target);
        // }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFEBATTLE_REFRESH);
        super.hide();
    }

    // private tick(){
    //     // if(!this._acVo){
    //     //     this._acVo = this.getAcVo();
    //     // }
    //     // let t = this._acVo.et - GameData.serverTime  - 86400 * 1;
    //     // if(t<0){
    //     //     //  App.CommonUtil.showTip(LanguageManager.getlocal("wifeTalentUpPopupViewAcOver"));
    //     //      this.hide();
    //     // } 
    
    // }

	public dispose():void{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CRASHMODEL,this.refreshUI,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_USE_ITEM,this.useCallback,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFE_AWARD,this.useWifeCallback,this);
        this._data = null;
	

        this._caiyi = null;
        this._caiqing = null;
        this._key = 0;
        this._lastUseNum = 0;
        this._numTF1 = null;
        this._numTF2 = null;
        this._numTF3 = null;
        this._callback = null;
        this._target = null;
        this._acVo = null;
        this._isHaveBuff = null;
		super.dispose();
	}
}