/**
 * author:qianjun
 * desc:港台美女投票界面
*/
class AcDraftVoteView extends CommonView{
	private _flowerCurText : BaseTextField = null;

	public constructor() 
	{
		super();
	}

	public static AID:string = null;
	public static CODE:string = null;
	private get cfg() : Config.AcCfg.DraftConfig{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcDraftView.AID, AcDraftView.CODE);
    }

    private get vo() : AcDraftVo{
        return <AcDraftVo>Api.acVoApi.getActivityVoByAidAndCode(AcDraftView.AID, AcDraftView.CODE);
    }

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"draftvotetopbg","draftflower","draftreward","draftreward_down","emparena_bottom"
		]);
	}

	protected getTitleStr():string{
		return 'AcDraftViewTitle';
	}

	public initView():void
	{	
        let view = this;
        let topbg = BaseBitmap.create('draftvotetopbg');
        view.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.titleBg, [0,view.titleBg.height]);
		view.addChild(topbg);
		
		let flower = BaseBitmap.create('draftflower');
		view.setLayoutPosition(LayoutConst.leftverticalCenter, flower, view.titleBg, [5,0]);
		view.addChild(flower);

		let haveFlower = 0;
		let fTxt = ComponentManager.getTextField(haveFlower.toString(), 22, TextFieldConst.COLOR_WHITE);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, fTxt, flower, [5,0]);
		view.addChild(fTxt);
		view._flowerCurText = fTxt;

		let awardBtn = ComponentManager.getButton('draftreward', '', view.awardClick, view);
		view.setLayoutPosition(LayoutConst.lefttop, awardBtn, topbg, [5,15]);
		view.addChild(awardBtn);

		let emparena_bottom = BaseBitmap.create('emparena_bottom');
		view.setLayoutPosition(LayoutConst.horizontalCenterbottom, emparena_bottom, view);
		view.addChild(emparena_bottom);

		let midbg = BaseBitmap.create('public_9_bg22');
		midbg.width = GameConfig.stageWidth - 10;
		midbg.height = GameConfig.stageHeigth - topbg.y - topbg.height - emparena_bottom.height;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, midbg, topbg, [0,topbg.height]);
		view.addChild(midbg);
		
	}
	
	private awardClick():void{
		let view = this;
	}
    
	public dispose():void
	{
		let view = this;
		view._flowerCurText = null;
		super.dispose();
	}
}