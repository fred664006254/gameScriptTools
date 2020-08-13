/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 积分兑换itemrender
 */
class AcCrossServerWipeBossShopTab2ScrollItem extends ScrollListItem
{
 
	private _data=null; 
	private _buyBtn:BaseButton = null;
	private _limitTxt:BaseTextField =null;
	private _icon : any = null;

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
		view.width = 156 + 7+ view.getSpaceX();
		view.height = 250 + view.getSpaceY();
		view._data = data;
		view._curIdx = index;
		//App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY),this.eventCollectHandlerCallBack,this);
		//App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);  
		let item : RewardItemVo;
		item = GameData.formatRewardItem(data.goods)[0];
		
		
		let wordsBg:BaseBitmap = BaseBitmap.create("public_listbg");  
		wordsBg.width = view.width - view.getSpaceX();
		wordsBg.height = view.height - view.getSpaceY(); 
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wordsBg, view);
		view.addChild(wordsBg); 

		let itemBg2:BaseBitmap = BaseBitmap.create("public_up3");
		itemBg2.width = 153;
		itemBg2.height = 30
		itemBg2.x = 5;
		itemBg2.y = 5;
		this.addChild(itemBg2);


		let itemNameTF:BaseTextField = ComponentManager.getTextField(item.name,22,TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itemNameTF, wordsBg, [0,10]);
		view.addChild(itemNameTF);

		let icon = GameData.getItemIcon(item,true);
		icon.width = icon.height = 108;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon, itemNameTF, [0,itemNameTF.textHeight + 10]);
		view.addChild(icon);
		view._icon = icon;

		//限购
		let curNum = data.limit - view.vo.getPointChangeLimitnum(data.id);
		let limitTxt = ComponentManager.getTextField(LanguageManager.getlocal('buyNum',[TextFieldConst.COLOR_WARN_GREEN.toString(),curNum.toString()]), 20,TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, icon, [0, icon.height + 7]);
		view.addChild(limitTxt);
		view._limitTxt = limitTxt;
		
		let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"",view.buyHandler,view)
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, wordsBg, [0,15]);
		btn.setText(LanguageManager.getlocal('accrossserverwipeBossCostPoint',[data.costScore]),false);
		if(!this.vo.isCanJoin()){
			btn.setEnable(false);
		} 
		view.addChild(btn);
		view._buyBtn = btn;
		if(!view.vo.isInActivity() || curNum <= 0){
			btn.setEnable(false);
		}
	} 

	public update():void{
		let view = this;
		let curNum = view._data.limit - view.vo.getPointChangeLimitnum(view._data.id);
		view._limitTxt.text = LanguageManager.getlocal('buyNum',[TextFieldConst.COLOR_WARN_GREEN.toString(),curNum.toString()]);
		if(curNum <= 0){
			if(view._buyBtn){
				view._buyBtn.setEnable(false);
			}
		}
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._limitTxt, view._icon, [0, view._icon.height + 10]);
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
        let curNum = view._data.limit - view.vo.getPointChangeLimitnum(view._data.id);
        if(curNum <= 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("DragonBoatShopTip"));
            return;
        }
        
        if(view.vo.getActPoints() < view._data.costScore){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishShopTip2'));
            return;
		}
		view.api.setClickIdx('b', view._curIdx);
		NetManager.request(NetRequestConst.REQUEST_WIPEBOSS_SHOPBUY, {
            activeId : view.vo.aidAndCode,
			num : 1,
			goods : view._data.id,
			stype : 'b'
        });	
	}

	//弹出消费提示框显示确认
	private confirmCallbackHandler(): void
	{
		let view = this;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY, {
            // activeId : view.acTivityId,
            shopId : view._data.id
        });	
	}

	protected eventCollectHandlerCallBack(event:egret.Event)
    {
		let view = this;
		let rData = event.data.data.data;
		if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
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
        let curNum = view._data.limit - view.vo.getPointChangeLimitnum(view._data.id);
		view._limitTxt.text = LanguageManager.getlocal('DragonBoatDayLimit',[curNum.toString()]);
		if(curNum <= 0){
			if(view._buyBtn){
				view._buyBtn.setEnable(false);
			}
		}
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view._limitTxt, view._buyBtn, [0, view._buyBtn.height + 5]);
	}
	
	public getSpaceX():number
	{
		return 7;
	}

   
	public getSpaceY():number
	{
		return 7;
	}
	
	public dispose():void
    {
		let view = this;
		view._data =null; 
		view._buyBtn = null;
		view._limitTxt =null;
		view._icon = null;
		//App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY),this.eventCollectHandlerCallBack,this);
		//App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this); 		
		super.dispose();
	}
}