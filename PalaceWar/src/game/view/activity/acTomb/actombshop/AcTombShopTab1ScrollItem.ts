/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 活动商店itemrender
 */
class AcTombShopTab1ScrollItem extends ScrollListItem
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

	private get cfg() : Config.AcCfg.TombCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_TOMB, this._code);
    }

    private get vo() : AcTombVo{
        return <AcTombVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_TOMB, this._code);
	}
	
	private getUicode():string{
		let baseview : any = ViewController.getInstance().getView('AcTombView');
		return baseview.getUiCode();
	}
	
	private _code : string = '';
	protected initItem(index:number,data:any,itemparam:any)
    {	
        let view = this;
        view._code = itemparam;
		view.width = 505;
		view.height = 120 + 10;
		view._data = data;
		view._curIdx = index;
		let item : any;
		let icon;
		if(data.effect){
			let effecId = 2114;
			let itemvo = Config.ItemCfg.getItemCfgById(effecId);
			item = {
				name : itemvo.name,
				desc : LanguageManager.getlocal('acwipeBossShopEffect', [(data.effect * 100).toString()]),
				iconPic : itemvo.icon,
				dropDesc : itemvo.dropDesc,
			}
			let container:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
			let iconBg:BaseBitmap = BaseBitmap.create(itemvo.iconBg);
			container.addChild(iconBg);
			container.width = iconBg.width;
			container.height = iconBg.height;

			let Icon:BaseLoadBitmap = BaseLoadBitmap.create(itemvo.icon);
			container.addChild(Icon);
			Icon.setPosition(4,5);

			iconBg.addTouchTap((event:egret.TouchEvent,item:string|number|RewardItemVo)=>{
				ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW,item);
			},GameData,[effecId]);
		
			icon = container;
		}
		else{
			item = GameData.formatRewardItem(data.goods)[0];
			icon = GameData.getItemIcon(item,true,false);
		}
		
		let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg1");  
		wordsBg.width = view.width;
		wordsBg.height = view.height - 10; 
		view.addChild(wordsBg); 

		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, wordsBg, [10,0]);
		view.addChild(icon);

		let itemNameTF:BaseTextField = ComponentManager.getTextField(item.name,TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, itemNameTF, icon, [106+15,10]);
		view.addChild(itemNameTF);

		let itemCfg = GameData.getRewardItemVoByIdAndType(1);
		let itemicon = BaseLoadBitmap.create(itemCfg.icon);
		itemicon.setScale(0.4);
		itemicon.width = 100;
		itemicon.height = 100;

		let cost = data.effect ? data.needGem[Math.min(view.vo.getShopBuyLimitnum(data.id),9)] : data.needGem;
		let costTxt = ComponentManager.getTextField(LanguageManager.getlocal('allianceBuildCost'), 18);
		let priceTxt = ComponentManager.getTextField(cost.toString(), 18, TextFieldConst.COLOR_QUALITY_YELLOW);

		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, costTxt, itemNameTF, [0,itemNameTF.textHeight+10]);
		view.addChild(costTxt);

		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, itemicon, costTxt, [costTxt.textWidth,0]);
		view.addChild(itemicon);

		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, priceTxt, costTxt, [costTxt.textWidth + 50,0]);
		view.addChild(priceTxt);
		view._priceTxt = priceTxt;
        

		let itemDescTF:BaseTextField = ComponentManager.getTextField(item.desc,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		itemDescTF.textAlign = egret.HorizontalAlign.LEFT;
		itemDescTF.width = 350;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, itemDescTF, costTxt, [0,costTxt.textHeight + 17]);
		view.addChild(itemDescTF);

		let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceBtnBuy",view.buyHandler,view)
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, btn, wordsBg, [10,8]);
		view.addChild(btn);
		view._buyBtn = btn;
		if(!view.vo.isInActTime() || view.vo.getIsKillAll()){
			btn.setGray(true);
		}

        //限购
        if(data.limit){
            let curNum = data.limit - view.vo.getShopBuyLimitnum(data.id);
            let limitTxt = ComponentManager.getTextField(LanguageManager.getlocal('DragonBoatDayLimit',[curNum.toString()]), 20, TextFieldConst.COLOR_WARN_GREEN);
            view.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, btn, [0, btn.height + 5]);
            view.addChild(limitTxt);
			view._limitTxt = limitTxt;
			if(curNum <= 0){
				view._buyBtn.setEnable(false);
			}
        }
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
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view._limitTxt, view._buyBtn, [0, view._buyBtn.height + 5]);
		let cost = view._data.effect ? view._data.needGem[Math.min(view.vo.getShopBuyLimitnum(view._data.id),9)] : view._data.needGem;
		view._priceTxt.text = cost;	
	}

	private buyHandler(evt:egret.TouchEvent):void
	{
		let vo = this.vo; 
		if(!vo)
		{
			return;
		}
		if(!this.vo.getAttendQUality()){
			App.CommonUtil.showTip(LanguageManager.getlocal(`tombattend2-${this.getUicode()}`, [Api.playerVoApi.getPlayerOfficeByLevel(this.cfg.needLv)]));
			return;
		}
		if(this.vo.getCurPeriod() == 1){
            App.CommonUtil.showTip(LanguageManager.getlocal(`tombtime2-${this.getUicode()}`));
            return;
		}
		if(this.vo.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
            return;
		}
		if(!this.vo.isInActTime()){
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_time_error"));
            return;
		}
		if(!this.vo.isInFightTime() && this._index == 0){
			App.CommonUtil.showTip(LanguageManager.getlocal(`tombtime4-${this.getUicode()}`));
            return;
		}
		if(this.vo.getIsKillAll()){
			App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossSearchTip6"));
			return;
		}
		let view = this;
        let curNum = view._data.limit - view.vo.getShopBuyLimitnum(view._data.id);
        if(curNum <= 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("DragonBoatShopTip"));
            return;
		}
		
		let needGem = view._data.effect ? view._data.needGem[Math.min(view.vo.getShopBuyLimitnum(view._data.id),9)] : view._data.needGem;
        
        if(Api.playerVoApi.getPlayerGem() < needGem){
            App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
            return;
		}
		view.vo.setClickIdx('a',view._curIdx);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_TOMBSHOPBUY, {
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
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_TOMBSHOPBUY, {
            // activeId : view.acTivityId,
            shopId : view._data.id
        });	
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
		super.dispose();
	}
}