class PrestigeVo extends BaseVo
{
	public pem:number = 0;
	public info:{pid:number,v:number,ainfo:number[],first:number} = null;
	public log:any[] = null;
	public canemper:number = 0;//是否能称帝
	public constructor() {
		super();
	}

	public initData(data:any):void
	{
		if (data) {
			if (data.pem != null) {
				this.pem =data.pem;
			}
			if (data.info != null) {
				let isdispatch = false;
				let oldPid = this.info ? this.info.pid : null;
				let newPic = data.info.pid;
				if(oldPid && oldPid !=  newPic && newPic == 5){
					isdispatch = true;
				}
				this.info =data.info;
				//刷新头像框
				if(isdispatch){
					egret.callLater(function(){
						App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_REFRESH_SPECIAL_AVATAR);
					},this)
				}
			}
			if (data.log != null) {
				this.log =data.log;
			}
			if (data.canemper != null) {
				this.canemper =data.canemper;
			}
		}
	}

	
	public dispose()
    {
		this.pem = 0;
		this.info = null;
		this.log = null;
	}
}