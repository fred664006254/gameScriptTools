/**
 * 骰子结果展示
 * author shaoliang
 */

class AcAC2020BoxResultView extends BaseView
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

	private get cfg() : Config.AcCfg.EnjoyNightCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcEnjoyNightVo{
        return <AcEnjoyNightVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
		return "public_9_viewmask";
    }
    
    private get code():string{
        return this.param.data.code;
    }

	private get uicode():string{
        return this.param.data.uicode;
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

		this._maskBmp.alpha = 0;
		this.viewBg.height = 400;
		this.viewBg.y = GameConfig.stageHeigth/2 - this.viewBg.height/2;

		let view = this;
		let code = view.uicode;
		let result = view.param.data.result;
		// view.addTouchTap(view.hide,view);



		let effectClip:CustomMovieClip ;
        if ( view.param.data.aidice)
        {
            effectClip= ComponentManager.getCustomMovieClip(`aidice_effect`,18,50);
        }
        else
        {
            effectClip= ComponentManager.getCustomMovieClip(`treasurebox1-`,18,50);
        }
        
        effectClip.width = 100;
        effectClip.height = 100;
        effectClip.anchorOffsetX = effectClip.width / 2;
		effectClip.anchorOffsetY = effectClip.height / 2;
		effectClip.alpha = 0;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, effectClip, view.viewBg, [0,-300]);
		view.addChild(effectClip);
		effectClip.setStopFrame(view.param.data.skip ? (11 + result) : 0);
		let speed = 3;
        egret.Tween.get(effectClip).to({y : 0}, 300/speed).to({alpha : 1, y : GameConfig.stageHeigth/2 + 100}, (GameConfig.stageHeigth/2 + 100)/speed).to({y : GameConfig.stageHeigth/2}, GameConfig.stageHeigth/2/speed).wait(100).call(()=>{
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
					egret.Tween.get(effectClip).wait(200).to({alpha : 0, scaleX : 8, scaleY : 8}, 400).call(()=>{
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