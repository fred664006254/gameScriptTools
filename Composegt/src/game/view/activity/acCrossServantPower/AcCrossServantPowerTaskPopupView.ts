/**
 * author:qianjun
 * desc:规则详情弹窗
*/
class AcCrossServantPowerTaskPopupView extends PopupView
{
	private _aid:string;
	private _code:string;
	private _acVo:AcCrossServantPowerVo;
	private __scrollList:ScrollList

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([ "progress_type3_yellow","progress_type3_bg"]);
	}

	protected initView():void
	{
		this._aid = this.param.data.aid;
		this._code = this.param.data.code;
		this._acVo = <AcCrossServantPowerVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid,this._code);
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);

		let rankBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		rankBg.width = 540;
		rankBg.height = 680;
		rankBg.setPosition(39,10);
		this.addChildToContainer(rankBg);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,rankBg.width,rankBg.height-20 );
		AcCrossServantPowerTaskScrollItem._ACVO = this._acVo;
		let servantPower = cfg.task;
		let keys = Object.keys(servantPower);
		keys.sort( (dataA:any,dataB:any)=>{
			return  Number(dataA) - Number(dataB);
		});
		let _scrollList = ComponentManager.getScrollList(AcCrossServantPowerTaskScrollItem,keys,rect);
		_scrollList.setPosition(rankBg.x + 10 ,rankBg.y + 10);
		this.addChildToContainer(_scrollList);
		this.__scrollList = _scrollList;
	}

	protected getBgExtraHeight():number
	{
		return 20;
	}

	public dispose():void
	{
		this._aid = null;
		this._code = null;
		this._acVo = null;

		super.dispose();
	}
}