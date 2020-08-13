/**
 * 积分兑换道具板子
 * author dky
 * date 2017/11/20
 * @class AcPunishExPopupView
 */

class AcPunishExPopupView extends PopupView
{	
	private _pointText:BaseTextField;

	private _scrollList: ScrollList;

	private _index:number = 0;
	private _aid:string ="";
	private _code:string="";
	public constructor() {
		super();
	}

	protected initView():void
	{
		this._aid = this.param.data.aid;
		this._code = this.param.data.code;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_PUNISH_EXITEM,this.doBuy,this);
		this._pointText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		this._pointText.y = 11;
		this.addChildToContainer(this._pointText);

		// this._pointText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		// this._pointText.y = 11;
		// this.addChildToContainer(this._pointText);


		let rect = egret.Rectangle.create();
		rect.setTo(0,0,540,710);


		let dataList =new Array<any>();
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid,this._code);
		for (var index = 1; index < 20; index++) {
			let tmpData = cfg.shop[index.toString()];
			if(tmpData){
				tmpData["aid"] = this._aid;
				tmpData["code"] = this._code;
				//元宵节头像
				if(tmpData.sell=="11_4017_1"&&Api.switchVoApi.checkIsTitleState("4017")==false)
				{
					continue;
				}  
				//斗鸡之王头像
				else if(tmpData.sell=="11_4009_1"&&Api.switchVoApi.checkIsTitleState("4009")==false)
				{
					continue;
				}
				//屠龙称号
				else if(tmpData.sell=="11_6001_1"&&Api.switchVoApi.checkIsTitleState("6001")==false)
				{
					continue;
				}
				//红颜田❤芯匠
				else if(tmpData.sell=="10_214_1"&&Api.switchVoApi.checkIsWifeLocked("214")==false)
				{
					continue;
				}
				else
				{ 
					tmpData.key = index;
					dataList.push(tmpData);	
				}  
				
			}
			else{
				break;
			}
		}

		this._scrollList = ComponentManager.getScrollList(AcPunishExScrollItem,dataList,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(23+GameData.popupviewOffsetX ,40);

		this.resetPointText();
	}
	
	private doBuy(event:egret.Event){
		let data  = event.data;
		this._index = data.index;
		this.request(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHSHOP, { activeId: this._aid +"-" +this._code,itemKey:data.key});
	}

//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		
		if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHSHOP) {
			if(data.data.data && data.data.data.rewards)
			{
				let rewards= GameData.formatRewardItem(data.data.data.rewards);
				if(rewards&&rewards.length>0)
				{
					App.CommonUtil.playRewardFlyAction(rewards);
				}
			}
			let index = this._index;
			let wideItem = <AcPunishExScrollItem>this._scrollList.getItemByIndex(index);
		
			wideItem.refreshData(index);

			
			// this._pointText.text = gem.toString();
			this.resetPointText();

		}	
	}


	private resetPointText():void
	{
		let acVo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid,this._code);
		this._pointText.text = LanguageManager.getlocal("acPunishShopScore1",[acVo.score.toString()]);
		this._pointText.x = this.viewBg.width/2 - this._pointText.width/2;
		// this._pointText.text = App.DateUtil.getFormatBySecond(1,2)
	}

	
	public dispose():void
	{	
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_PUNISH_EXITEM,this.doBuy,this);

		// this._pointText = null;
		// this._isLoading = false;
		// this._buyClickId = null;
		this._index = null;
		this._aid = "";
        this._code = "";

		super.dispose();
	}
}