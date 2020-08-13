/**
 * author : ycg
 * date : 2020.4.20
 * desc : 积分兑换itemrender
 */
class AcCrossServerIntimacyCheerViewScrollItem4 extends ScrollListItem
{
	private _aid: string = "";
	private _code : string = "";
	private _data:any = null;
    
	public constructor() 
	{
		super();
	}

    private get aid():string{
        return this._aid;
    }

    private get code():string{
        return this._code;
    }

    private get vo() : AcCrossServerIntimacyVo{
        return <AcCrossServerIntimacyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }	

	private get cfg() : Config.AcCfg.CrossServerIntimacyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
	
	protected initItem(index:number, data:any, itemparam:any)
    {	
		this._aid = itemparam.aid;
		this._code = itemparam.code;
		this._data = data;
        
		let item : RewardItemVo;
		item = GameData.formatRewardItem(data.sell)[0];
		let wordsBg:BaseBitmap = BaseBitmap.create("accshegemony_shopitembg");
		wordsBg.width = 204;
		wordsBg.height = 287; 
		this.width = wordsBg.width;
		this.height = wordsBg.height; 
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wordsBg, this);
		this.addChild(wordsBg); 

		let itemNameTF:BaseTextField = ComponentManager.getTextField(item.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, item.nameColor);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itemNameTF, wordsBg, [0, 32]);
		this.addChild(itemNameTF);

		let icon = GameData.getItemIcon(item, true);
		icon.width = icon.height = 106;
		icon.x = this.width/2 - icon.width/2;
		icon.y = 60;
		this.addChild(icon);
		//限购
		let buyNum:number = 0;
		if(data.isItem)
		{
			buyNum = this.vo.getShop2BuyNumById(data.id);
		}else
		{
			buyNum = this.vo.getShopBuyNumById(data.id);
		}
		let curNum = data.limitNum - buyNum;
		let limitTxt = ComponentManager.getTextField(LanguageManager.getlocal('acCrossserverPowerCheerScoreShopLimit',[String(curNum),String(TextFieldConst.COLOR_WARN_GREEN4)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN4);
		limitTxt.x = this.width/2 - limitTxt.width/2;
		limitTxt.y = 193 - 25;
		this.addChild(limitTxt);
		if(data.limitType == 0){
			limitTxt.visible = false;
		}

		let scoreIcon;
		if(data.isItem)
		{
			let needId = this.cfg.change.needNum.split("_")[1];
			scoreIcon = BaseBitmap.create("itemicon"+needId);
			scoreIcon.setScale(0.35);
		}else
		{
			scoreIcon = BaseBitmap.create(App.CommonUtil.getResByCode("accrosspower_flagicon", this.code, "7"));
			scoreIcon.setScale(0.7);
		}
        this.addChild(scoreIcon);
		let costNum = ComponentManager.getTextField(""+data.cost, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		this.addChild(costNum);
		let costW = scoreIcon.width * scoreIcon.scaleX + costNum.width;
		scoreIcon.x = limitTxt.x + limitTxt.width/2 - costW/2;
		scoreIcon.y = 185;
		costNum.setPosition(scoreIcon.x + scoreIcon.width * scoreIcon.scaleX, 193);

		let btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,"",this.buyHandler,this, null, null, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, wordsBg, [0,20]);
		let cost = data.cost;
		btn.setText(LanguageManager.getlocal("acCrossserverPowerCheerScoreShopExchange"), false);
		this.addChild(btn);

		let have = data.isItem ? this.vo.getExchangeItemNum() : this.vo.getFlagScore();
		if(!this.vo.isStart || (data.limitNum > 0 && curNum <= 0) || have < cost){
			btn.setGray(true);
		}
		if(data.isItem && !this.vo.checkIsInEndShowTime())
		{
			btn.setGray(true);
		}
	} 

	private buyHandler(evt:egret.TouchEvent):void
	{
		let vo = this.vo; 
		if(!vo)
		{
			return;
		}
		if(!this.vo.isStart){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
		}
		if(!this.vo.checkIsInEndShowTime())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("croessServerPowerExchangeTimeTipTxt"));
			return;
		}
		// let view = this;
		if(this._data.limitType != 0 && this._data.limitNum > 0){
			let num = 0;
			if(this._data.isItem)
			{
				num = this.vo.getShop2BuyNumById(this._data.id);
			}else
			{
				num = this.vo.getShopBuyNumById(this._data.id);
			}
			let curNum = this._data.limitNum - num;
			if(curNum <= 0){
				App.CommonUtil.showTip(LanguageManager.getlocal("croessServerPowerExchangeNoTimes"));
				return;
			}
		}
		let cost = this._data.cost;
		let have = this._data.isItem ? this.vo.getExchangeItemNum() : this.vo.getFlagScore();
		if(have < cost){
			if(this._data.isItem)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("croessServerImacyExchangeNoEnough"));
			}else
			{
				App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acCrossserverPowerFlagNotEnough", this.code)));
			}			
            return;
		}
		if(this._data.isItem)
		{
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_SHOP2EXCHANGE , {
				activeId : this.vo.aidAndCode,
				rkey:this._data.id,
				num : 1,
			});
		}else
		{
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_SHOPBUY , {
				activeId : this.vo.aidAndCode,
				rkey:this._data.id,
				num : 1,
			});
		}
	}
	
	public getSpaceX():number
	{
		return 0;
	}

   
	public getSpaceY():number
	{
		return 10;
	}
	
	public dispose():void
    {
		super.dispose();
	}
}