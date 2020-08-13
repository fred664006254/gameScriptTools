/**
 * author:qianjun
 * desc:奖励弹窗
*/
class AcCrossServerServantRewardView extends PopupView
{
	private public_dot1:BaseBitmap =null;
    private public_dot2:BaseBitmap =null;
	
	public constructor() {
		super();
	}

	protected getOffsetX():number
	{	
		return 32;
	}

	private get api() : AcCrossServerServantVoApi{
        return Api.crossServerServantVoApi;
	}
	
	private get vo() : AcCrossServerServantVo{
        return <AcCrossServerServantVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_SERVANTPK, this.param.data.code);
	}
	
	protected getTabbarTextArr():Array<string>{
		return [
			"crossservantRewardTab1",
			"crossservantRewardTab2",
			"crossservantRewardTab3",
		];
	}
	protected getResourceList():string[]{
		return super.getResourceList().concat([
			"atkracecross_rewatdbg1",
			"atkracecross_rewatdbg2",
			"atkracecross_rewatdbg3",
			"wifeview_bottombg",
			"crossservantawardbbg","forpeople_bottom","promotenamebg"
		]);
	}

	protected initView():void{	
		let view = this;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVANTPK,view.update,view);
		//红点1
		let public_dot1 =BaseBitmap.create("public_dot2");
		public_dot1.x = this.tabbarGroup.getChildAt(0).x + this.tabbarGroup.getChildAt(0).width-10;
		public_dot1.y = 0; 
		this.tabbarGroup.addChild(public_dot1); 
		this.public_dot1 = public_dot1;

		//红点2
		let public_dot2 =BaseBitmap.create("public_dot2");
		public_dot2.x = this.tabbarGroup.getChildAt(1).x + this.tabbarGroup.getChildAt(1).width-10;
		public_dot2.y = 0; 
		this.tabbarGroup.addChild(public_dot2); 
		this.public_dot2 = public_dot2;

		view.update();
	}

	protected getShowHeight():number{
		return 700;
	}

	private update(): void{
		//第一页 红点
		let view = this;
		if(this.public_dot1)
		{
			this.public_dot1.visible = view.vo.getpublicRedhot1();
		}
		//第二页 红点
		if(this.public_dot2)
		{
			 this.public_dot2.visible = view.vo.getpublicRedhot2();
		}     
   } 
	
	public dispose():void{
		let view = this;
		view.public_dot1 = null;
		view.public_dot2 = null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANTPK,view.update,view);
		super.dispose();
	}
}