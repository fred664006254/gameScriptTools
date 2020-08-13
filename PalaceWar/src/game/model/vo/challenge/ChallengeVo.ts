
class ChallengeVo extends BaseVo
{

	/**
	 * 目前已经通过的关卡ID
	 */
	public cid:number = 0;
	/**
	 * 正在战斗的关卡已经消灭的士兵数
	 */
	public ksoldier:number = 0;

	/**
	 *  "攻击过的门客信息 1001 ＝ 1已攻击过 可恢复 2攻击过 不可恢复
	 */
	public info:Object = {};

	public constructor() {
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			if(data.cid != null)
			{	
				let curCid = this.cid;
				this.cid = Number(data.cid);
				// this.cid = 3; // test code
				//分阶段引导
				if(curCid != this.cid && this.cid == 82 && curCid == 81){
					Api.rookieVoApi.curGuideKey = "prison";
					Api.rookieVoApi.insertWaitingGuide({"idx":"prison_1"},true);
				}
			
			}
			if(data.ksoldier != null)
			{
				this.ksoldier = Number(data.ksoldier);
			}
			if(data.info != null)
			{
				this.info = data.info;
			}
		}
	}

	public dispose():void
	{
		this.cid = 0;
		this.ksoldier = 0;
		this.info = {};
	}
}