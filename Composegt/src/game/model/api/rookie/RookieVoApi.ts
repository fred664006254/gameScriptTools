/**
 * 新手引导api
 * author shaoliang
 * date 2017/9/26
 * @class RookieVoApi
 */

class RookieVoApi extends BaseVoApi
{
	/**所有引导 */
	public isGuiding:boolean=false;
	/** 新手引导 */
	public isInGuiding:boolean=false;
	public _waitingGuide:any[]=[];
	public curStep:string;

	//下一次引导框的Y
	public waitingPosY:number=null;
	//下一次引导框的X
	public waitingPosX:number=null;

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
	}

	public checkWaitingGuide():void
	{
		if (this._waitingGuide.length > 0) {
			let a:any = this._waitingGuide.shift();
			ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW,a);
		}
 	}

	/**
	 * 根据关键字检查是否有等待的引导
	 * @param key 关键字（indexOf(key) >= 0）
	*/
	public checkWaitingGuideByKey(key: string): void {
		if (this._waitingGuide.length <= 0) return;
		let _guideName: {idx: string, f: ()=>void, o: any} = null;
		for (let i=0;i<this._waitingGuide.length;i++) {
			let n: {idx: string, f: ()=>void, o: any} = this._waitingGuide[i];
			if (n.idx.indexOf(key) >= 0) {
				_guideName = n;
				this._waitingGuide.splice(i, 1);
				break;
			}
		}
		if (_guideName) {
			ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, _guideName);
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

	public dispose():void
	{
		this.isGuiding = false;
		this.isInGuiding = false;
		this._waitingGuide.length = 0;
		this.curStep = null;
		this.curIndex = 1;
		this.guideId = 1;
		this.waitingPosY = null;
		this.waitingPosX= null;
		this.curGuideKey = null;

		super.dispose();
	}

}