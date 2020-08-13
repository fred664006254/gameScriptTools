
class CouncilVo extends BaseVo
{
	public constructor() {
		super();
	}

	public initData(data:any):void{
		if (data) {

		}
	}

	public get maxJoinNum():number{
		return Config.CouncilCfg.maxPlayer;
	}

	public dispose(){

	}
}