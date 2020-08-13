/**
 * 新手引导api
 * author shaoliang
 * date 2017/9/26
 * @class RookieVoApi
 */

class RookieVoApi extends BaseVoApi
{

	public isGuiding:boolean=false;
	public isInGuiding:boolean=false;
	private _waitingGuide:any[]=[];
	public curStep:string;

	//下一次引导框的Y
	public waitingPosY:number=null;

	//当前引导
	public curGuideKey:string=null;

	public curIndex:number = 1;
	public guideId:number = 1;


	public constructor() {
		super();
	}


	public getIsGuiding():boolean
	{
		return this.isGuiding;
	}

	// public set isGuiding(v:boolean)
	// {
	// 	this._isGuiding = v;
	// }



	/**
	 * @param t 等待引导信息 {"idx":引导ID  , "f": 回调方法 , "o": 回调对象}
	 */
	public insertWaitingGuide(t:any,isRemove?:boolean):void
	{
		this._waitingGuide.push(t);
		if(isRemove){
			this._waitingGuide = [t];
		}
		if(t.idx == `zhenqifang_1`){
			let posx = GameConfig.stageWidth - 152+3;
			if (Api.switchVoApi.checkOpenChangeBg()&& Config.SceneCfg.isSceneMulti())
			{
				posx -= 76;
			}
			if (Api.switchVoApi.checkOpenHousekeeper())
			{
				posx -= 76;
			}

			RookieCfg.rookieCfg[`zhenqifang_3`].clickRect.x = posx;
			RookieCfg.rookieCfg[`zhenqifang_3`].clickRect.y = GameConfig.stageHeigth - 117 - 38 - 80;
			RookieCfg.rookieCfg[`zhenqifang_3`].handPos.x = RookieCfg.rookieCfg[`zhenqifang_3`].clickRect.x + 50; 
			RookieCfg.rookieCfg[`zhenqifang_3`].handPos.y = GameConfig.stageHeigth - 117 - 38 - 50;
			if (Api.switchVoApi.checkOpenHouseBtnUp()){
				RookieCfg.rookieCfg[`zhenqifang_3`].clickRect.x = GameConfig.stageWidth - 275;
				RookieCfg.rookieCfg[`zhenqifang_3`].clickRect.y = GameConfig.stageHeigth - 117 - 38 - 80 - 140;
				RookieCfg.rookieCfg[`zhenqifang_3`].handPos.x = RookieCfg.rookieCfg[`zhenqifang_3`].clickRect.x + 50; 
				RookieCfg.rookieCfg[`zhenqifang_3`].handPos.y = GameConfig.stageHeigth - 117 - 38 - 50 - 140;
			}
		}
	}

	public removeWaitingGuide():void
	{
		this._waitingGuide.length = 0;
	}

	public checkWaitingGuide():void
	{
		if (this._waitingGuide.length > 0) {
			
			let a:any = this._waitingGuide.shift();
			if (a.idx == "atkrace_1" || a.idx == "search_1")
			{	
				ViewController.getInstance().hideAllView();
			}
			ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW,a);
		}
 	}
	
	/**
	 *  检测是否需要走下一步
	 */
	 public checkNextStep():void
	 {
		 if (this.isGuiding) {
			 App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ROOKIE_NEXT_STEP);
		 }
	 }

	public showRookieView():void
	{
		if (this.isGuiding) {
			ViewController.getInstance().getView(ViewConst.BASE.ROOKIEVIEW).visible = true;
		}
	}

	public hiddenRookieView():void
	{
		if (this.isGuiding) {
			ViewController.getInstance().getView(ViewConst.BASE.ROOKIEVIEW).visible = false;
		}
	}

	public isEnRookie():boolean
	{	
		if (PlatformManager.checkIsEnLang() && this.isInGuiding == true)
		{
			return true;
		}
		return false;
		// return true;
	}
	public isEnLang():boolean
	{	
		// return true;
		return PlatformManager.checkIsEnLang();
	}

	public dispose():void
	{
		this.isGuiding = false;
		this.isInGuiding = false;
		this._waitingGuide.length = 0;
		this.curStep = null;
		this.curIndex = 1;
		this.guideId = 1;
		this.waitingPosY = null;
		this.curGuideKey = null;

		super.dispose();
	}

}