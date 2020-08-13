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
	static aid:string ="";
	static code:string="";
	public constructor() {
		super();
	}

	protected initView():void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_PUNISH_EXITEM,this.doBuy,this);
		this._pointText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		this._pointText.y = 11;
		this.addChildToContainer(this._pointText);

		// this._pointText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		// this._pointText.y = 11;
		// this.addChildToContainer(this._pointText);


		let bg1= BaseBitmap.create("public_tc_bg01");
        bg1.width = 540;
        bg1.height = 670;
        bg1.x = this.viewBg.width/2 - bg1.width/2;
        bg1.y = 50;
        this.addChildToContainer(bg1);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,bg1.width-20,bg1.height-20);


		let dataList =new Array<any>();
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
		for (var index = 1; index < 20; index++) {
			if(cfg.shop[index.toString()]){
				dataList.push(cfg.shop[index.toString()]);
			}
			else{
				break;
			}
		}

		this._scrollList = ComponentManager.getScrollList(AcPunishExScrollItem,dataList,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(bg1.x + 10 ,bg1.y + 10);

		this.resetPointText();
	}
	
	private doBuy(event:egret.Event){
		let data  = event.data;
		this._index = data.index;
		this.request(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHSHOP, { activeId: this.param.data.aid +"-" +this.param.data.code,itemKey:data.key});
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
		let acVo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid,this.param.data.code);
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

		super.dispose();
	}
}