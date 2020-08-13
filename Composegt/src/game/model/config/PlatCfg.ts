/**
 * 平台配置
 * @author 赵占涛
 */
class PlatCfg {
	/** 登录界面logo */
	public static loginLogo:string="loginres_logo_wx";
	/** 登录界面背景 */
	public static loginBg:string="loginbg";

	public constructor() {
	}
	// 初始化平台配置
	public static initCfg(initCb:Function, initCbObject:any) {
		var sub = PlatformManager.getAppid();
		var middle = PlatformManager.getSpName();
		var big = PlatformManager.getBigAppid();
		console.log("sub middle big", sub,middle,big);

		let logoCfg:any = {

		"1003017007":"loginres_logo_jshy",
		"1003017008":"loginres_logo_jztx",
		"1003017009":"loginres_logo_hsmn",
		"1014001004":"loginres_logo_wdbtn",
		"1014001005":"loginres_logo_wjdzd",
		"1014004007":"loginres_logo_ypxjd",
		// "1014001010":"loginres_logo_jmkx",
	 }

		var cb = (data:any)=>{
			PlatCfg.loginLogo = data?data.loginLogo:PlatCfg.loginLogo;
			PlatCfg.loginBg = data?data.loginBg:PlatCfg.loginLogo;
			if(logoCfg[sub])
			{
				PlatCfg.loginLogo = logoCfg[sub]
			}
			let loginBgName:string="loginbg_"+sub;
			if(RES.hasRes(loginBgName))
			{
				PlatCfg.loginBg=loginBgName;
			}
			else
			{
				loginBgName="loginbg_"+big;
				if(RES.hasRes(loginBgName))
				{
					PlatCfg.loginBg=loginBgName;
				}
				
			}
			initCb.call(initCbObject);
		}
		if (sub !== "" && RES.hasRes("sub" + sub + "_json")) {
			ResourceManager.loadItem("sub" + sub + "_json", cb, this);
		} else if (middle !== "" && RES.hasRes("middle" + middle + "_json")) {
			ResourceManager.loadItem("middle" + middle + "_json", cb, this);
		} else if (big !== "" && RES.hasRes("big" + big + "_json")) {
			ResourceManager.loadItem("big" + big + "_json", cb, this);
		} else {
			ResourceManager.loadItem("big0_json", cb, this);
		}
	}


}