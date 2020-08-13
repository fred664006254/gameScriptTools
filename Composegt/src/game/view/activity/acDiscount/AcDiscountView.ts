/**
 * Vip折扣
 * author 赵占涛
 * date 2018/1/31
 * @class AcDiscountView
 */
class AcDiscountView extends AcCommonView
{
	private _scrollList:ScrollList;
	private _acBaseVoList:AcBaseVo[] = [];
	public constructor() 
	{
		super();
	}

	public initView():void
	{
		//顶部背景图片
		let forpeople_top: BaseBitmap = BaseBitmap.create("forpeople_top");
		this.addChildToContainer(forpeople_top);
		forpeople_top.y = -50;

		//描述 
		let acDescTxt = ComponentManager.getTextField(LanguageManager.getlocal("acDiscount_desc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this.addChildToContainer(acDescTxt);
		acDescTxt.x = 30;
		// acDescTxt.y = 20;
		acDescTxt.width = 550;

		this._acBaseVoList = Api.acVoApi.getActivityVoListByAid(this.aid);
		let rect = new egret.Rectangle(0,0,640,GameConfig.stageHeigth - 210);
		this._scrollList = ComponentManager.getScrollList(AcDiscountViewScrollItem,this._acBaseVoList,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(0,115);


		let bottomBg = BaseBitmap.create("public_9v_bg03");
		bottomBg.width = 640;
		bottomBg.height = GameConfig.stageHeigth - 65;
		bottomBg.x = 0;
		bottomBg.y = 60;
		this.addChild(bottomBg); 
		this.setChildIndex(bottomBg,3);
		

		return;
	}
	protected getTitleStr():string
	{
		return "ac"+App.StringUtil.firstCharToUper(this.aid)+"_Title";
	}


	protected getResourceList():string[]
	{

		let acBaseVoList = Api.acVoApi.getActivityVoListByAid(this.aid)
		let arr = [];
		for(let i = 0; i< acBaseVoList.length;i++)
		{
			let acBaseVo = acBaseVoList[i];
			if(acBaseVo.code != 2)
			{
				arr.push("acdiscountviewbg" + acBaseVo.code);
			}
			else
			{
				if(PlatformManager.checkIsWxSp())
				{
					arr.push("acdiscountviewbg2_wx");
				}
				else
				{
					arr.push("acdiscountviewbg" + acBaseVo.code);
				}
			}
		}
		return super.getResourceList().concat([
			"forpeople_top"
					]).concat(arr);
	}

	public dispose():void
	{
		this._scrollList = null;
		this._acBaseVoList = [];
		super.dispose();
	}
}