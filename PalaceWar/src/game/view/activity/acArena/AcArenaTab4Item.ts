/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 劳动活动 商店 itemrender
 */
class AcArenaTab4Item extends ScrollListItem
{
 
	private _data : Config.AcCfg.ArenaFestivalMarketItemCfg = null; 
	private _buyBtn:BaseButton = null;
	private _limitTxt:BaseTextField =null;

	private _curIdx:number=0;

	public constructor() 
	{
		super();
	}
    private get cfg() : Config.AcCfg.ArenaCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcArenaVo{
        return <AcArenaVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_ARENA;
    }

    private get code() : string{
        return this._code;
    }
	
	private _code : string = '';
	protected initItem(index:number,data:Config.AcCfg.ArenaFestivalMarketItemCfg,itemparam:any)
    {	
        let view = this;
        view._code = itemparam;
		view.width = 510;
		view.height = 170 + 10;
		view._data = data;
		view._curIdx = index;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ARENASHOP),this.eventCollectHandlerCallBack,this);
		//App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);  
		let rewardsArr:Array<RewardItemVo> = GameData.formatRewardItem(data.goods);

		let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg14");  
		wordsBg.width  = 510;
		wordsBg.height = 170; 
		this.addChild(wordsBg); 

		let icon : any = GameData.getItemIcon(rewardsArr[0],true);
		let bindData : any = icon.bindData;
		view.setLayoutPosition(LayoutConst.lefttop, icon, wordsBg, [10,20]);
		view.addChild(icon);

		let itemNameBg:BaseBitmap = BaseBitmap.create("public_9_bg15");
		itemNameBg.width = 180;
		view.setLayoutPosition(LayoutConst.lefttop, itemNameBg, icon, [icon.width + 10,0]);
		view.addChild(itemNameBg);

		let itemNameTF:BaseTextField = ComponentManager.getTextField(bindData.name,TextFieldConst.FONTSIZE_TITLE_SMALL,rewardsArr[0].nameColor);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, itemNameTF, itemNameBg);
		view.addChild(itemNameTF);

		let itemDescTF:BaseTextField = ComponentManager.getTextField(rewardsArr[0].desc,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		itemDescTF.textAlign = egret.HorizontalAlign.LEFT;
		itemDescTF.width = 215;
		view.setLayoutPosition(LayoutConst.lefttop, itemDescTF, itemNameBg, [0,itemNameBg.height + 2]);
		view.addChild(itemDescTF);

		let btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"nothing",this.buyHandler,this)
		let str = data.needGem.toString(); 
		btn.setText(str,false);
		btn.addTextIcon("public_icon1",1);
		view.setLayoutPosition(LayoutConst.rightbottom, btn, view, [10,50]);
		view.addChild(btn);
		view._buyBtn = btn;
		if(!view.vo.isInActivity()){
			btn.setEnable(false);
		}

		//折扣
        if(data.discount){
            let tag = BaseBitmap.create('shopview_corner');
            view.setLayoutPosition(LayoutConst.lefttop, tag, view);
			view.addChild(tag);
			let cost = (data.discount * 10);
            let tagTxt = ComponentManager.getTextField(LanguageManager.getlocal('discountTitle',[cost.toString()]), 18, TextFieldConst.COLOR_WARN_YELLOW);
            tagTxt.rotation = -45;
            tagTxt.setPosition(0,28);
			if(PlatformManager.checkIsThSp())
			{
				// tagTxt.setPosition(0,33);
				tagTxt.setPosition(-5,38);
				tagTxt.text  = LanguageManager.getlocal("discountTitle",[String(100 - data.discount * 100)]);
			}
			if(PlatformManager.checkIsEnLang())
			{
				tagTxt.setPosition(0,33);
				tagTxt.text  = LanguageManager.getlocal("discountTitle",[String(100 - data.discount * 100)]);
			}
			view.addChild(tagTxt);
			
			let itemCfg = GameData.getRewardItemVoByIdAndType(1);
			let itemicon = BaseLoadBitmap.create(itemCfg.icon);
			itemicon.setScale(0.4);
			itemicon.width = 100;
			itemicon.height = 100;
			let oldTxt = ComponentManager.getTextField(LanguageManager.getlocal('acMayDayOldProce'), 18, TextFieldConst.COLOR_BLACK);
			let priceTxt = ComponentManager.getTextField(data.originalCost.toString(), 18, TextFieldConst.COLOR_BLACK);
			let desc = (btn.width - (oldTxt.textWidth + 40 + priceTxt.textWidth))/2;
			if (PlatformManager.checkIsRuLang()){
				view.setLayoutPosition(LayoutConst.lefttop, oldTxt, btn, [desc - 7,btn.height+8]);
			}
			else{
				view.setLayoutPosition(LayoutConst.lefttop, oldTxt, btn, [desc,btn.height+8]);
			}
			view.addChild(oldTxt);

			view.setLayoutPosition(LayoutConst.leftverticalCenter, itemicon, oldTxt, [oldTxt.textWidth,0]);
			view.addChild(itemicon);

			view.setLayoutPosition(LayoutConst.lefttop, priceTxt, oldTxt, [100*0.4+oldTxt.textWidth,0]);
			view.addChild(priceTxt);

			let line = BaseBitmap.create('shopview_line');
			view.setLayoutPosition(LayoutConst.leftverticalCenter, line, oldTxt, [(line.width - (oldTxt.textWidth + 40 + priceTxt.textWidth))/2,0]);
			line.x = oldTxt.x;
			line.scaleX = (oldTxt.width+priceTxt.width+35)/line.width;
			view.addChild(line);
        }

        //限购
        if(data.limit){
            let curNum = data.limit - view.vo.getBuyLimitnum(data.sortId);
			let limitTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acLaborlimit-${view.code}`,[curNum.toString()]), 20, TextFieldConst.COLOR_BLACK);
			if (PlatformManager.checkIsRuLang()){
				view.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, btn, [-7, -limitTxt.textHeight - 8]);
			}
			else{
				view.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, btn, [0, -limitTxt.textHeight - 8]);
			}
            view.addChild(limitTxt);
			view._limitTxt = limitTxt;
			if(curNum <= 0){
				view._buyBtn.setEnable(false);
			}
        }
		//this.update();
	} 

	private buyHandler(evt:egret.TouchEvent):void
	{
		let vo = this.vo; 
		if(!vo)
		{
			return;
		}
		if(this.vo.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
            return;
		}
		let view = this;
        let curNum = view._data.limit - view.vo.getBuyLimitnum(view._data.sortId);
        if(curNum <= 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("DragonBoatShopTip"));
            return;
        }
        
        if(Api.playerVoApi.getPlayerGem() < view._data.needGem){
            App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
            return;
		}

		view.checkNeedWarnPopup();
	}

	//弹出消费提示框显示确认
	private confirmCallbackHandler(): void
	{
		let view = this;
		view.vo.lastidx = this._curIdx;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_ARENASHOP, {
            activeId : view.acTivityId,
            shopId : view._data.sortId
        });	
	}

	//检查是否需要弹出消费提示框
	private checkNeedWarnPopup(): void{
		//物品价格
		let view = this;
		let num = view._data.needGem;
		//检查价格是否超过购买警告阈值
		if (num >= Config.ShopCfg.buyItemCheckVal)
		{
			let contentList:Array<RewardItemVo> = GameData.formatRewardItem(this._data.goods);//shopItemCfg.contentList;

			let rewardItemVo = contentList[0];
			//let icon = GameData.getItemIcon(rewardItemVo,true);
			//展示信息
			let message:string = LanguageManager.getlocal("shopBuyUseGem2",[num.toString(),rewardItemVo.name]);
			//玩家所持有的元宝数
			let playerGem = Api.playerVoApi.getPlayerGem();
			// ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,{useNum:rewardItemVo.num,confirmCallback:this.confirmCallbackHandler,handler:this,icon:rewardItemVo.icon,iconBg: rewardItemVo.iconBg,num:playerGem,msg:message,id : 1});
			ViewController.getInstance().openView(ViewConst.POPUP.COSTGEMBUYITEMPOPUPVIEW,{
				goods:this._data.goods,						//物品价格
				confirmCallback: this.confirmCallbackHandler,	//确认回调函数
				handler: this,									//target
				num: playerGem,									//玩家元宝数
				msg: message,									//显示消息
				id:1											//消耗物品id  1->元宝
			});			
		} else {
			this.confirmCallbackHandler();
		}
	}

	protected eventCollectHandlerCallBack(event:egret.Event)
    {
		let view = this;
		let rData = event.data.data.data;
		if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
            return;
        }
        if (view.vo.lastidx  != this._curIdx)
        {
            return;
        }
        view.vo.lastidx  = null;
		let data = event.data;
		let rewards = data.data.data.rewards;
		if(this._data.goods !== rewards){
            let rewardItemvo:RewardItemVo = GameData.formatRewardItem(this._data.goods)[0];
            let servantReward = null;
            let name = '';
            let exchange;
            if(rewardItemvo.type == 8){
                servantReward = Config.ServantCfg.getServantItemById(rewardItemvo.id);
                name = servantReward.name;
                exchange = servantReward.exchange;
			}
			else if(rewardItemvo.type == 16){
                servantReward = Config.WifeskinCfg.getWifeCfgById(rewardItemvo.id);
                name = servantReward.name;
                exchange = `6_2101_${servantReward.itemNum}`;
            }
            else if(rewardItemvo.type == 19){
                servantReward = Config.ServantskinCfg.getServantSkinItemById(rewardItemvo.id);
                name = servantReward.getSkinName();
                exchange = servantReward.returnItem;
            }
            if(servantReward){
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD,{"name":name,"touch":exchange,"message":"changeOtherRewardTip","callback":()=>{
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rewards,"isPlayAni":true});
                },"handler":this});
            }
            else{
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rewards,"isPlayAni":true});
            }
		}
		else{
			let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
			let pos = view._buyBtn.localToGlobal(view._buyBtn.width/2, 20);
			App.CommonUtil.playRewardFlyAction(rewardList, pos);
		}
        let curNum = view._data.limit - view.vo.getBuyLimitnum(view._data.sortId);
		view._limitTxt.text = LanguageManager.getlocal(`acLaborlimit-${view.code}`,[curNum.toString()]);
		if(curNum <= 0){
			view._buyBtn.setEnable(false);
		}
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view._limitTxt, view._buyBtn, [0, - view._limitTxt.textHeight - 8]);
		// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_DBDAY_FRESH_LIST);
	}

   
	public getSpaceY():number
	{
		return 10;
	}
	
	public dispose():void
    {
		let view = this;
		view._data =null; 
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ARENASHOP),this.eventCollectHandlerCallBack,this);
		//App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this); 		
		super.dispose();
	}
}