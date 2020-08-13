/**
 * 门客系统vo
 * author dmj
 * date 2017/9/22
 * @class ServantVo
 */
class ServantVo extends BaseVo
{
	// 门客vo列表
	public servantInfoVoObj:{[index: string]: ServantInfoVo} = null;
	//是否通过擂台引导
	// private isShowAtkraceGuide = false;
	// private isCheckGuide = false;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			if(data.info)
			{
				if(this.servantInfoVoObj == null)
				{
					this.servantInfoVoObj = {};
				}
				
				for(var key in data.info)
				{
					if (this.servantInfoVoObj[key])
					{
						this.servantInfoVoObj[key].initData(data.info[key]);
					}else
					{
						let servantInfoVo:ServantInfoVo = new ServantInfoVo();
						servantInfoVo.servantId = key;
						servantInfoVo.initData(data.info[key]);
						this.servantInfoVoObj[key] = servantInfoVo;
					}

				}
				
				// 引导擂台与否？
				if(Api.atkraceVoApi.isShowNpc() && !Api.servantVoApi.isShowAtkraceGuide){
					
					for(var key in data.info)
					{
						if(data.info[key].lv>= 60){
							// if(this.isCheckGuide){
							// 	this.isShowAtkraceGuide = true;
							// }

							//功能解锁
							App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT);
							Api.servantVoApi.isShowAtkraceGuide = true;
							if(Api.servantVoApi.isCheckGuide) {
								Api.rookieVoApi.curGuideKey = "atkrace";
								Api.rookieVoApi.insertWaitingGuide({"idx":"atkrace_1"},true);
							}
							break;
						}
					}
				
				}
				Api.servantVoApi.isCheckGuide = true;
			}
		}
		/**
		 * 检测修身相关红点
		 */
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_PRACTICE_RED);
	}
	public dispose():void
	{
		//是否通过擂台引导
		// this.isShowAtkraceGuide = false;
		// this.isCheckGuide = false; 
		this.servantInfoVoObj = null;
	}
}