/**
 * 排行榜Api
 * author yanyuling
 * date 2017/10/26
 * @class RankVoApi
 */
class RankVoApi extends BaseVoApi
{
	private rankVo:RankVo;
	public constructor() 
	{
		super();
	}

	public getRankListByTabIdx(idx:number)
	{
		if(!this.rankVo){
			return null;
		}
		if(idx == 0){
			return this.rankVo.pinfoList;
		}else if(idx == 1){
			return this.rankVo.cinfoList;
		}else if(idx == 2){
			return this.rankVo.iinfoList;
		}
		return  this.rankVo.pinfoList;
	}
	
	public getcInfoList()
	{
		return this.rankVo.cinfoList;
	}

	public getiInfoList()
	{
		return this.rankVo.iinfoList;
	}

	public getpInfoList()
	{
		return this.rankVo.pinfoList;
	}
	public getcRank()
	{
		return this.rankVo.crank;
	}
	
	public getimacy()
	{
		return this.rankVo.imacy;
	}
	public getcid()
	{
		return this.rankVo.cid;
	}
	public getprank()
	{
		return this.rankVo.prank;
	}
	public getirank()
	{
		return this.rankVo.irank;
	}

	public getanum()
	{
		return this.rankVo.anum;
	}
	public getapnum()
	{
		return this.rankVo.apnum;
	}
	public getCrossAllianceRankList()
	{
		return this.rankVo.ainfo;
	}
	public getCrossPowerList()
	{
		return this.rankVo.apinfo;
	}
	 public checkNpcMessage():boolean
	{
		let maxIdx = 3;
		if (Api.switchVoApi.checkOpenCrossRank()){
			maxIdx = 5;
		}
		for (let index = 0; index < maxIdx; index++) {
			let V = Api.otherInfoVoApi.isRankVisited(index);
			if(V == 0)
			{
				return true;
			}
		}
		return false;
	}

}