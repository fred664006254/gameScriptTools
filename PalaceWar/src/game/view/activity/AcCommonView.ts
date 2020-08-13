abstract class AcCommonView extends CommonView
{
	/**
	 * 当前活动的Id
	 */
	protected aid:string;
	public constructor() 
	{
		super();
		this.aid=App.StringUtil.firstCharToLower(this.getClassName().replace("Ac","").replace("View",""));
	}

	protected getProbablyInfo():string
	{
		let rStr:string=this.getClassName().toLowerCase().replace("view","")+"ProbablyInfo";
		let ruleStr=rStr+this.code;
		if(LanguageManager.checkHasKey(ruleStr))
		{
			return ruleStr;
		}
		else if(LanguageManager.checkHasKey(rStr))
		{
			return rStr;
		}
		else
		{
			
		}
		return "";
	}

	protected getResourceList():string[]
	{
		let resArr:string[]=[];
		if(this.code&&ResourceManager.hasRes(String(this.aid).toLowerCase()+this.code))
		{
			resArr.push(String(this.aid).toLowerCase()+this.code);
		}
		return super.getResourceList().concat(resArr);
	}

	protected get code():string
	{
		return this.param?this.param.data:"";
	}  
	
	protected  getUiCode():string
	{
		return this.code;
	}

	protected get acVo():AcBaseVo
	{
		return Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
	}
	protected getTitleStr():string
	{
		return "ac"+App.StringUtil.firstCharToUper(this.acVo.aidAndCode)+"_Title";
	}
	protected getTitleParams():string[]
	{
		return null;
	}

	/*
	*根据code获得资源图  资源必须严格命名 以xxx-code 结尾 如 xxx-1, xxx-2,xxxx-3
	*prev  资源前缀 分隔符"-"以前的字符串
	*code 传入code
	*/
	protected getResByCode(prev:string, code?:string):string{
		if(!code){
			code = this.getUiCode();
		}
		let resname = App.CommonUtil.getResByCode(prev, this.code, code);
		return resname;
	}
	
	/*
	*根据code获得cnkey  key严格命名以 必须 xxx-code 结尾 如 xxx-1, xxx-2,xxxx-3
	*prev  key前缀 分隔符"-"以前的字符串
	*code 传入code
	*/
	protected getCnByCode(prev:string, code?:string):string{
		if(!code){
			code = this.getUiCode();
		}
		let newkey = App.CommonUtil.getCnByCode(prev, this.code, code);
		return newkey;
	}

	/*
	* 活动显示剧情
	* keyStr  前面是一个key， 后面是typecode，一般是1
	* isSave 是否保存下次调用不触发剧情
	* visitId 和之前用法一样
	* callBack 回调方法

	* talkKey 在cn中的配法以天籁之音活动和默认参数为例 skySoundStartDialogTalk_1_1-1
	*/

    protected showAcDialog(keyStr:string="startDialog_1", isSave:boolean=true, visitId:string="1",callBack=null):void
    {
        let localkey:string = this.acVo.aidAndCode + Api.playerVoApi.getPlayerID()+keyStr+visitId;
        let lastTime:number = 0;
        let timeStr:string = LocalStorageManager.get(localkey);
        if (timeStr && timeStr!="")
        {
            lastTime = Number(timeStr);
        }
        if (lastTime == this.acVo.et && isSave)
        {	
			if(callBack)
			{
				callBack();
			}
            return;
        }
		if(isSave)
		{
			LocalStorageManager.set(localkey, String(this.acVo.et));
		}

		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let diaCfg = cfg[keyStr];
		if(diaCfg && diaCfg[visitId])
		{
			ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW,
			{
				aid : this.aid,
				code : keyStr.split("_")[1],
				AVGDialog : diaCfg,
				visitId : visitId,
				talkKey: this.aid+App.StringUtil.firstCharToUper(keyStr.split("_")[0])+"Talk_",
				callBack:callBack
			});
		}
    } 	
}