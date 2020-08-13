
class BetheKingExPopupView extends PopupView
{	

	public constructor() {
		super();
	}

	private _aid:string;
	private _code:string;
	private _acVo:AcBeTheKingVo;
	private _cdTxt:BaseTextField;
	protected initView():void
	{
		this._aid = this.param.data.aid;
		this._code = this.param.data.code;
		this._acVo = <AcBeTheKingVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid,this._code);
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);

		let bg02:BaseBitmap = BaseBitmap.create("public_tc_bg02");
		bg02.x = this.viewBg.width/2 - bg02.width/2;
		bg02.y = 10;
		this.addChildToContainer(bg02);
		
		this._cdTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._cdTxt.x = bg02.x + bg02.width/2 ;
		this._cdTxt.y = bg02.y+15;
		this.addChildToContainer(this._cdTxt);

		let bg1= BaseBitmap.create("public_tc_bg01");
        bg1.width = 540;
        bg1.height = 670;
        bg1.x = this.viewBg.width/2 - bg1.width/2;
        bg1.y = bg02.y + bg02.height + 15;
        this.addChildToContainer(bg1);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,bg1.width-20,bg1.height-20);

		
		BetheKingExScrollItem._ACVO = this._acVo;
		let tmpList = [];//Object.keys(cfg.voteExchange);
		for (var key in cfg.voteExchange) {
			if (cfg.voteExchange.hasOwnProperty(key)) {
				var element = cfg.voteExchange[key];
				element["id"] = key;
				tmpList.push(element);
			}
		}
		tmpList.sort( (dataA:any,dataB:any)=>{
			return Number(dataA.id) - Number(dataB.id)
		});
		let _scrollList = ComponentManager.getScrollList(BetheKingExScrollItem,tmpList,rect);
		_scrollList.setPosition(bg1.x + 10 ,bg1.y + 10);
		this.addChildToContainer(_scrollList);
		TickManager.addTick(this.tick,this);
		this.tick();
	}

	public tick():boolean
	{
		let presecs = this._acVo.et - 86400 - GameData.serverTime;
        if( presecs >= 0 ){
			let secStr = App.DateUtil.getFormatBySecond(presecs,8);
            this._cdTxt.text = LanguageManager.getlocal("betheKing_excdTxt1",[secStr]);
        }else{
			this._cdTxt.text = LanguageManager.getlocal("betheKing_excdTxt2");
        }
		this._cdTxt.anchorOffsetX = this._cdTxt.width/2;
		return true;
	}
	
	public dispose():void
	{	
		TickManager.removeTick(this.tick,this);
		this._aid = null;
		this._code = null;
		this._acVo = null;
		this._cdTxt = null;
		super.dispose();
	}
}