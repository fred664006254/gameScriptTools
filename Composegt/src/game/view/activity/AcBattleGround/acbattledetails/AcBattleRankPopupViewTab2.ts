//
class AcBattleRankPopupViewTab2 extends CommonViewTab
{
	public constructor(param?) 
	{
		super();
		this.param = param;
		this.initView();
	}



    private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

	protected getListType():number
	{
		return 1;
	}

	protected initView():void
	{
		//App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
		let view = this;

		let rankList = this.vo.getAlliRankList();
		
		let rect2 = egret.Rectangle.create();
		rect2.setTo(0,0,508,485);
        let scrollList = ComponentManager.getScrollList(AcBattleRankPopupViewScrollItem2,rankList,rect2);
		scrollList.x = 41;
		scrollList.y = 110;
		view.addChild(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"),TextFieldConst.COLOR_BROWN);
	}

	public dispose():void
	{
		super.dispose();
	}

}