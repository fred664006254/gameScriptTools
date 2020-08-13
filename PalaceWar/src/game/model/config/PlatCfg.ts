/**
 * 平台配置
 * @author 赵占涛
 */
class PlatCfg {
	/** 登录界面logo */
	public static loginLogo:string;
	/** 登录界面背景 */
	public static loginBg:string;

	private static defaultCfg={
		"3k":"1",
		"yyb":"1",
		"xly":"1",
		"zjly":"1",
		"tw":"1",
		"kr":"1",
		"th":"1",
		"en":"1"
	};

	private static  _jsonName:string="";
	private static _initCb:Function=null;
	private static _initCbObj:any=null;

	public constructor() {
	}
	// 初始化平台配置
	public static initCfg(initCb:Function, initCbObject:any) {
		this._initCb=initCb;
		this._initCbObj=initCbObject;
		var sub = PlatformManager.getAppid();
		var middle = PlatformManager.getSpName();
		var big = PlatformManager.getBigAppid();
		console.log("sub middle big", sub,middle,big);

		var cb = (data:any)=>{
			RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,PlatCfg.loadJsonError,PlatCfg);
			PlatCfg.loginLogo = data.loginLogo;
			PlatCfg.loginBg = data.loginBg;
			if(PlatformManager.checkIsIOSShenheSp())
			{
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
			}
			else
			{
				PlatCfg.loginBg="loginbg"
				if(PlatformManager.checkIsFB())
				{
					PlatCfg.loginBg="loginbg_fben";
				}
				else if(data.use)
				{
					PlatCfg.loginBg=data.loginBg;
				}
			}
			if(PlatformManager.checkIsTWBSp())
			{
				let date=new Date();
				if(date.getTime()/1000>=1548727200)
				{
					if(PlatCfg.loginBg&&ResourceManager.hasRes(PlatCfg.loginBg+"_tw2"))
					{
						PlatCfg.loginBg=PlatCfg.loginBg+"_tw2";
					}
					if(PlatCfg.loginLogo&&ResourceManager.hasRes(PlatCfg.loginLogo+"_tw2"))
					{
						PlatCfg.loginLogo=PlatCfg.loginLogo+"_tw2";
					}
				}
			}
			if(PlatCfg._initCb)
			{
				PlatCfg._initCb.call(PlatCfg._initCbObj);
			}
			this._initCb=null;
			this._initCbObj=null;
		}
		let jsonName:string="";
		if (sub !== "" && RES.hasRes("sub" + sub + "_json")) {
			jsonName="sub" + sub + "_json";
		} else if (middle !== "" && RES.hasRes("middle" + middle + "_json")) {
			jsonName="middle" + middle + "_json";
		} else if (big !== "" && big !== "0" && RES.hasRes("big" + big + "_json")) {
			jsonName="big" + big + "_json";
		} else {
			let cfgNameKey:string="0";
			if(!PlatCfg.defaultCfg[PlatformManager.getSpid()])
			{
				cfgNameKey="1";
				if(!ResourceManager.hasRes("big1_json"))
				{
					cfgNameKey="0";
				}
			}
			else
			{
				if(Number(big)==17009000&&Number(sub)>17009010)
				{
					cfgNameKey="1";
					if(!ResourceManager.hasRes("big1_json"))
					{
						cfgNameKey="0";
					}
				}
			}
			jsonName="big"+cfgNameKey+"_json";
			PlatCfg._jsonName=jsonName;
		}
		RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,PlatCfg.loadJsonError,PlatCfg);
		ResourceManager.loadItem(jsonName, cb, this);
	}

	private static loadJsonError(e:RES.ResourceEvent):void
	{
		if(e.resItem.name==PlatCfg._jsonName)
		{
			App.ResourceUtil.retrySwithCDN(e.resItem.name,()=>{
				RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,PlatCfg.loadJsonError,PlatCfg);
				PlatCfg.initCfg(PlatCfg._initCb,PlatCfg._initCbObj);
			},PlatCfg);
		}
	}
}