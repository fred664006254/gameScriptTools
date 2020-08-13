/**
 * 板子队列api
 * author shaoliang
 * date 2020/3/3
 * 
 * @class ViewqueueVoApi
 */

class ViewqueueVoApi extends BaseVoApi
{

	public isShowing:boolean=false;
	private _waitingQueue:{name:string,parms:any}[]=[];

    public constructor() {
		super();
	}

	
	private isCanShowView():boolean
	{
		if (this.isShowing || Api.rookieVoApi.isGuiding || Api.rookieVoApi.isInGuiding)
		{
			return false;
		}
		return true;
	}

	public checkShowView(viewname:string,parms?:any,isHead:boolean=false):void
	{
		if (this.isCanShowView()==false)
		{	
			if (isHead)
			{
				this._waitingQueue.splice(0,0,{name:viewname,parms:parms});
			}
			else
			{
				this._waitingQueue.push({name:viewname,parms:parms});
			}
		}
		else
		{	
			this.isShowing = true;
			ViewController.getInstance().openView(viewname,parms,true);
		}
	}

	public checkWaitingView():void
	{	
		this.isShowing = false;
		if (this.isCanShowView()==false)
		{	
			return;
		}

		if (this._waitingQueue.length > 0) {
			
			let a:{name:string,parms:any} = this._waitingQueue.shift();
			this.isShowing = true;
			ViewController.getInstance().openView(a.name,a.parms,true);
		}
		else
		{
			this.isShowing = false;
			 if(Api.rookieVoApi.curGuideKey == "zhenqifang"){
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_NEEDGUIDE);
            }
		}
 	}

    public dispose():void
	{
		this.isShowing = false;
		this._waitingQueue.length = 0;
		super.dispose();
	}
}