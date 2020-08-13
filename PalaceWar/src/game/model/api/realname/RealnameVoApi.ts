/**
 * 实名认证Api
 * author 赵占涛
 * date 2018/8/9
 * @class RealnameVoApi
 */
class RealnameVoApi extends BaseVoApi
{
    /** 设置实名认证信息 */
	public setIdcardInfo(idnumber:string, name:string, usertype:string, cb)
	{

		let reqData:any={t:"setidcardinfo",pid:LoginManager.getLocalUserName(),idnumber:idnumber, name:name, usertype:usertype};
		
		if(ServerCfg.checkServerDebug())
		{
			reqData.debug=1;
		}

		let version =PlatformManager.getAppVersion();
		let channel =PlatformManager.getAppid();
		if(version)
		{
			reqData.version=version;
		}
		if(channel)
		{
			reqData.channel =channel; 
		}
		if(PlatformManager.checkIsIOSShenheSp())
		{
			reqData.isShenhe="1";
		}
		reqData.isnew =true;
		if (App.DeviceUtil.isAndroid()) {
			console.log("判断为andorid");
			reqData.os = "android";
		} else if (App.DeviceUtil.isIOS()) {
			console.log("判断为ios");
			reqData.os = "ios";
		}
        NetManager.http.get(ServerCfg.svrCfgUrl,reqData,(newdata:any)=>{
            GameData.isAntiaddiction = false;
            cb(false);
        }, ()=>{
			NetLoading.hide();
            cb(true);
			console.log("get setidcardinfo error");
        }, this);
	}

}