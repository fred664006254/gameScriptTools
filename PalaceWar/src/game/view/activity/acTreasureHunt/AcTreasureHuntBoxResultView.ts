/**
 * 骰子结果展示
 * author qianjun
 */

class AcTreasureHuntBoxResultView extends BaseView
{

	private _confirmCallback:Function;
	
	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		let rewardPic:string[] = super.getResourceList();

		return rewardPic.concat([

		]);
	}

	private get cfg() : Config.AcCfg.TreasureHuntCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcTreasureHuntVo{
        return <AcTreasureHuntVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }


	protected getTitleBgName():string
	{
		return null;
	}

	protected getTitleStr():string
	{
		return null;
	}

	protected getBgName():string
	{
		return "public_9_bg8";
    }
    
    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}
	
	protected isTouchMaskClose():boolean{
		return true;
	}

	protected isShowMask():boolean{
		return true;
	}

	protected initView():void
	{
		let view = this;
		let code = view.code;
		let result = view.param.data.result;
		// view.addTouchTap(view.hide,view);
		let effectClip = ComponentManager.getCustomMovieClip(`treasurebox${code}-`,18,100);
        effectClip.width = 100;
        effectClip.height = 100;
        effectClip.anchorOffsetX = effectClip.width / 2;
		effectClip.anchorOffsetY = effectClip.height / 2;
		effectClip.alpha = 0;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, effectClip, view.viewBg, [0,-300]);
		view.addChild(effectClip);
		effectClip.setStopFrame(view.param.data.skip ? (11 + result) : 0);
		let speed = 2;
        egret.Tween.get(effectClip).to({y : 0}, 300/speed).to({alpha : 1, y : GameConfig.stageHeigth/2 + 100}, (GameConfig.stageHeigth/2 + 100)/speed).to({y : GameConfig.stageHeigth/2}, GameConfig.stageHeigth/2/speed).wait(200).call(()=>{
			if(view.param.data.skip){
				effectClip.setStopFrame(11 + result);
				egret.Tween.get(effectClip).wait(300).to({alpha : 0, scaleX : 8, scaleY : 8}, 400).call(()=>{
					view.hide();
				},view)
			}
			else{
				effectClip.setEndFrameAndPlay(12);
				effectClip.setEndCallBack(()=>{
					effectClip.setStopFrame(11 + result);
					egret.Tween.get(effectClip).wait(300).to({alpha : 0, scaleX : 8, scaleY : 8}, 400).call(()=>{
						view.hide();
					},view)
				},view);
				effectClip.playWithTime(1);
			}
		},view);
	}
	
	private touchTap():void
	{
		this.hide();
	}

	public hide()
	{
		super.hide();
		if(this.param.data.confirmCallback){
			this.param.data.confirmCallback.apply(this.param.data.handler,[]);
		}
		
    }
    
	public dispose():void
	{
		this.removeTouchTap();
		super.dispose();
	}

}