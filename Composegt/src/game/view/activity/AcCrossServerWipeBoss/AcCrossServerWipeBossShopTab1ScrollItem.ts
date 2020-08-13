/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 活动商店itemrender
 */
class AcCrossServerWipeBossShopTab1ScrollItem extends ScrollListItem
{
 
	private _data=null; 
	private _buyBtn:BaseButton = null;
	private _limitTxt:BaseTextField =null;
	private _priceTxt : BaseTextField = null;

	private _curIdx:number=0;

	public constructor() 
	{
		super();
	}

	private get api() : CrossServerWipeBossVoApi{
        return Api.crossServerWipeBossVoApi;
    }
	
	private get cfg() : Config.AcCfg.CrossServerWipeBossCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_CROSSSERVERWIPEBOSS, this._code);
    }

    private get vo() : AcCrossServerWipeBossVo{
        return <AcCrossServerWipeBossVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_CROSSSERVERWIPEBOSS, this._code);
    }
	
	private _code : string = '';
	protected initItem(index:number,data:any,itemparam:any)
    {	
        let view = this;
        view._code = itemparam;
		view.width = 505;
		view.height = 120 + 10 + 15;
		view._data = data;
		view._curIdx = index;
		//App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY),this.eventCollectHandlerCallBack,this);
		//App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);  
		let item : any;
		let icon;
		// let bg = BaseBitmap.create("public_listbg");
		// bg.width = this.width;
		// bg.height = this.height;
		// this.addChild(bg);

		if(data.effect){
			item = {
				name : LanguageManager.getlocal('accrossserverwipeBossShopEffectName'),
				desc : LanguageManager.getlocal('accrossserverwipeBossShopEffect', [(data.effect * 100).toString()]),
				iconPic : 'accrossserverwipeboss_useitem',
				dropDesc : LanguageManager.getlocal('itemDropDesc_2110'),
				// iconBg:"itembg_2"
			}
			let container:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
			let iconBg:BaseBitmap = BaseBitmap.create('itembg_2');//
			container.addChild(iconBg);
			container.width = iconBg.width;
			container.height = iconBg.height;

			let Icon:BaseLoadBitmap = BaseLoadBitmap.create('accrossserverwipeboss_useitem');
			container.addChild(Icon);
			Icon.setPosition(4,3);

			iconBg.addTouchTap((event:egret.TouchEvent,item:string|number|RewardItemVo)=>{
				ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW,item);
			},GameData,['2120']);
		
			icon = container;
		}
		else{
			item = GameData.formatRewardItem(data.goods)[0];
			icon = GameData.getItemIcon(item,true,false);
		}
		
		let wordsBg:BaseBitmap = BaseBitmap.create("public_listbg");  
		wordsBg.width = view.width;
		wordsBg.height = view.height -5; 
		view.addChild(wordsBg); 
		let bb = BaseBitmap.create("public_left");
		bb.width = 125;
		bb.height = 122;
		bb.x = 5;
		bb.y = 5;
		this.addChild(bb);

		icon.setScale(1);
		icon.x = wordsBg.x + 15;
		icon.y = wordsBg.y + 14; //public_left
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, bb, [10,0]);
		view.addChild(icon);

		let itemNameTF:BaseTextField = ComponentManager.getTextField(item.name,TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, itemNameTF, icon, [106+20,0]);
		view.addChild(itemNameTF);

		let itemCfg = GameData.getRewardItemVoByIdAndType(1);
		let itemicon = BaseLoadBitmap.create(itemCfg.icon);
		itemicon.setScale(0.4);
		itemicon.width = 100;
		itemicon.height = 100;

		let cost = data.limit ? data.needGem[Math.min(view.vo.getShopBuyLimitnum(data.id),9)] : data.needGem;
		let costTxt = ComponentManager.getTextField(LanguageManager.getlocal('allianceBuildCost'), 18,TextFieldConst.COLOR_BROWN);
		let priceTxt = ComponentManager.getTextField(cost.toString(), 18, TextFieldConst.COLOR_BROWN);

		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, costTxt, itemNameTF, [0,itemNameTF.textHeight+10]);
		view.addChild(costTxt);

		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, itemicon, costTxt, [costTxt.textWidth,0]);
		view.addChild(itemicon);

		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, priceTxt, costTxt, [costTxt.textWidth + 50,0]);
		view.addChild(priceTxt);
		view._priceTxt = priceTxt;
        

		let itemDescTF:BaseTextField = ComponentManager.getTextField(item.desc,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		itemDescTF.textAlign = egret.HorizontalAlign.LEFT;
		itemDescTF.width = 350;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, itemDescTF, costTxt, [0,costTxt.textHeight + 17]);
		view.addChild(itemDescTF);

		let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceBtnBuy",view.buyHandler,view)
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, btn, wordsBg, [10,30]);
		view.addChild(btn);
		view._buyBtn = btn;



		// if((!this.vo.isInFightTime())||(!view.vo.isInTansuoTime()) || Api.crossServerWipeBossVoApi.getIsKillAll()){
		if((!this.vo.isInFightTime())||(!view.vo.isInTansuoTime())){
			btn.setGray(true);
		}

		

		if(!this.vo.isCanJoin()){
			btn.setEnable(false);
		} 


        //限购
        if(data.limit){
            let curNum = data.limit - view.vo.getShopBuyLimitnum(data.id);
            let limitTxt = ComponentManager.getTextField(LanguageManager.getlocal('DragonBoatDayLimit',[curNum.toString()]), 20, TextFieldConst.COLOR_WARN_GREEN);
            view.setLayoutPosition(LayoutConst.horizontalCenterbottom, limitTxt, btn, [0, btn.height + 5]);
            view.addChild(limitTxt);
			view._limitTxt = limitTxt;
			if(curNum <= 0){
				view._buyBtn.setEnable(false);
			}
        }
		//this.update();
	} 

	public update():void{
		let view = this;
		let curNum = view._data.limit - view.vo.getShopBuyLimitnum(view._data.id);
		view._limitTxt.text = LanguageManager.getlocal('DragonBoatDayLimit',[curNum.toString()]);
		if(curNum <= 0){
			if(view._buyBtn){
				view._buyBtn.setEnable(false);
			}
		}
        // view.setLayoutPosition(LayoutConst.horizontalCentertop, view._limitTxt, view._buyBtn, [0, view._buyBtn.height + 5]);
		view.setLayoutPosition(LayoutConst.horizontalCenterbottom, view._limitTxt, view._buyBtn, [0, view._buyBtn.height + 5]);
		let cost = view._data.limit ? view._data.needGem[Math.min(view.vo.getShopBuyLimitnum(view._data.id),9)] : view._data.needGem;
		view._priceTxt.text = cost;	
	}

	private buyHandler(evt:egret.TouchEvent):void
	{
		let vo = this.vo; 

		if(!vo)
		{
			return;
		}

		if(Api.playerVoApi.getPlayerLevel() < this.cfg.needLv){
			App.CommonUtil.showTip(LanguageManager.getlocal(`accrossserverwipeBossOpenTip`, [Api.playerVoApi.getPlayerOfficeByLevel(this.cfg.needLv)]));
			return;
		}
		if(this.vo.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
            return;
		}
		if(!this.vo.isInFightTime()){
			App.CommonUtil.showTip(LanguageManager.getlocal("accrossserverwipeBossMidDesc6"));
			return;
		}
		if(!this.vo.isInTansuoTime()){
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
            return;
		}
		// if(Api.crossServerWipeBossVoApi.getIsKillAll()){
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("accrossserverwipeBossSearchTip6"));
		// 	return;
		// }
		let view = this;
        let curNum = view._data.limit - view.vo.getShopBuyLimitnum(view._data.id);
        if(curNum <= 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("DragonBoatShopTip"));
            return;
		}
		
		let needGem = view._data.limit ? view._data.needGem[Math.min(view.vo.getShopBuyLimitnum(view._data.id),9)] : view._data.needGem;
        
        if(Api.playerVoApi.getPlayerGem() < needGem){
            App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
            return;
		}
		view.api.setClickIdx('a',view._curIdx);
		NetManager.request(NetRequestConst.REQUEST_WIPEBOSS_SHOPBUY, {
            activeId : view.vo.aidAndCode,
			num : 1,
			goods : view._data.id,
			stype : 'a'
        });	
	}

	//弹出消费提示框显示确认
	private confirmCallbackHandler(): void
	{
		let view = this;
        NetManager.request(NetRequestConst.REQUEST_WIPEBOSS_SHOPBUY, {
            // activeId : view.acTivityId,
            shopId : view._data.id
        });	
	}

	protected eventCollectHandlerCallBack(event:egret.Event)
    {
		let view = this;
		let rData = event.data.data.data;
		if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("accrossserverwipeBossShopEffectSuccess"));
            return;
        }
        // //this.update();
        // let rewards = rData.rewards
        // let rewardList =  GameData.formatRewardItem(rewards);
        // let pos =  AcDragonBoatDayTab4ScrollItem._lastPos;
		// App.CommonUtil.playRewardFlyAction(rewardList,pos);
		let data = event.data;
		let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
        let pos = view._buyBtn.localToGlobal(view._buyBtn.width/2, 20);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    }

   
	public getSpaceY():number
	{
		return 10;
	}
	
	public dispose():void
    {
		let view = this;
		view._data =null; 
		view._buyBtn = null;
		view._limitTxt =null;
		view._priceTxt = null;
		//App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY),this.eventCollectHandlerCallBack,this);
		//App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this); 		
		super.dispose();
	}
}