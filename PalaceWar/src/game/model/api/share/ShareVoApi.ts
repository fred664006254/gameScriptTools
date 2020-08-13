/**
 * 分享api
 * author jiangliuyang
 * date 2018/8/7
 * @class ShopVoApi
 */
class ShareVoApi extends BaseVoApi
{

	//a-->红颜  b-->子嗣  c-->官职
	private _curType: string;
	private _curLv: string;
	private _callback: Function = null;
	private _target: any = null;
	
	public static readonly TYPE_WIFE: string = "a";
	public static readonly TYPE_CHILD: string = "b";
	public static readonly TYPE_GRADE: string = "c";

	public constructor() 
	{
		super();
	}

	//弹出强制分享界面，如果条件不满足，则执行传入的回调函数
	public showShare(type: string, lv: string, callback:Function, target:any){

		if(this.checkCanShowShare(type,lv)){
			this._curType = type;
			this._curLv = lv;
			this._callback = callback;
			this._target = target;
			App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_USER_GETWXSHARE,this.openSharePopup,this);

			//发送请求服务器
			NetManager.request(NetRequestConst.REQUEST_USER_GETWXSHARE,{type:type,lv:lv});
			return;
		}

		callback.call(target);
	}
	//a 红颜  b子嗣 c升官
	private checkLockName(type: string, lv: string){
		
		switch(type){
			case ShareVoApi.TYPE_WIFE:
				return "openShareWife";
				
			case ShareVoApi.TYPE_CHILD:
				return "openShareChild";
				
			case ShareVoApi.TYPE_GRADE:
				
				return "openShareGrade"+lv;
		}
	}

	public openSharePopup(event){
		//event.data
		//event.data.wxshare
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_USER_GETWXSHARE,this.openSharePopup,this);
		ViewController.getInstance().openView(ViewConst.POPUP.SHARECOMMONPOPUPVIEW,{type:this._curType,lv:this._curLv,wxshare:event.data.data.data.wxshare,callback:this._callback,target:this._target});
	}	
	//检查是否需要展示分享
	public checkCanShowShare(type, lv){
		switch(type){
			case ShareVoApi.TYPE_WIFE:
				if (!this.checkIsFirstWife()){
					return false;
				}
				break;
			case ShareVoApi.TYPE_CHILD:
				if (!this.checkIsFirstChild()){
					return false;
				}
				break;
		}

		let lockName = this.checkLockName(type, lv);
		//判断是否开启
		if(Api.switchVoApi.checkOpenByName(lockName)){
			return true;
		}
		//平台是否有这个功能
		
		// if (1==1||PlatformManager.checkCommonShare()){	//本地不判断平台
	    // if (PlatformManager.checkCommonShare()){
		// 	let lockName = this.checkLockName(type, lv);
		// 	//判断是否开启
		// 	if(Api.switchVoApi.checkOpenByName(lockName)){
		// 		return true;
		// 	}
		// }
		return false;
	}

	//判断是否是除了冯小怜外第一个红颜
	private checkIsFirstWife(){
		if (Api.wifeVoApi.getWifeNum() == 2) {
			return true;
		} else {
			return false;
		}
	}

	//判断是否是第一个孩子 
	private checkIsFirstChild(){
		
		if (Api.childVoApi.getChildNum() ==1 && Api.adultVoApi.getAdultNum() == 0 && Api.adultVoApi.getAdultMarryNum() == 0 ) {
			return true;
		} else {
			return false;
		}
	}

	public dispose():void
	{
		super.dispose();
	}
}