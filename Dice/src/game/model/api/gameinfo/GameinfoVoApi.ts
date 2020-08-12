namespace Api
{
	export namespace GameinfoVoApi
	{
		let gameinfoVo:GameinfoVo;
		export let curGuideId = 0;
		export function formatData(data:any):void
		{
			if(!gameinfoVo)
			{
				gameinfoVo=new GameinfoVo();
				curGuideId = data.newerGuild;
			}
			if(data.newerGuild == GuideCfg.rookieCfg["guideSteps"]){
				curGuideId = data.newerGuild;
			}
			gameinfoVo.initData(data);
			
		}
		export function getGnum(){
			let num = 0;
			if(gameinfoVo){
				num = gameinfoVo.gnum;
			}
			return num;
		}
		export function getIsBuyRoyalPass():boolean
		{
			let flag = false;
			if(gameinfoVo && gameinfoVo.svip == 1)
			{
				flag = true;
			}
			return flag;
		}

		export function getIsBuyAssitance():boolean
		{
			let flag = false;
			if(gameinfoVo && gameinfoVo.jvip == 1)
			{
				flag = true;
			}
			return flag;
		}

		export function canGetRoyalPassReward():boolean{
			let flag = false;
			let cfg = Config.RoyalpassCfg.getRoyalPassCfgList();
			for(let i in cfg){
				let unit = cfg[i];
				if(!isGetRoyalPassReward(unit.id) && Api.UserinfoVoApi.getMaxScore() >= unit.needScore){
					flag = true;
					break;
				}
			}
			return flag;
		}

		export function getRoyalFirstNotReward(score:number){
			// if(getIsBuyRoyalPass()){
				let cfg = Config.RoyalpassCfg.getRoyalPassCfgList();
				let scorerst:number = Config.RoyalpassCfg.getNextNeedByScore(score);
				for(let i in cfg){
					let unit = cfg[i];
					if(!isGetRoyalPassReward(unit.id) && score >= unit.needScore){
						scorerst = unit.needScore;
						break;
					}
				}
				return scorerst == 0 ? 4000 : scorerst;
			// } else {
			// 	return Config.RoyalpassCfg.getNextNeedByScore(score);
			// }
		}

		//type 1普通 2高级
		export function canGetRoyalPassRewardByLevel(level : number, type : number):boolean{
			let flag = false;
			// 1primary 2advanced
			let unit = Config.RoyalpassCfg.getRoyalPassCfgById(level);
			let getflag = type == 1 ? (gameinfoVo.royalPass[level] && gameinfoVo.royalPass[level].primary && gameinfoVo.royalPass[level].primary == 1) : (gameinfoVo.royalPass[level] && gameinfoVo.royalPass[level].advanced && gameinfoVo.royalPass[level].advanced == 1)
			if(!getflag && Api.UserinfoVoApi.getMaxScore() >= unit.needScore){
				flag = true;
			}
			return flag;
		}

		//type 1普通 2高级
		export function isGetRoyalPassReward(level : number, type? : number):boolean{
			let flag = false;
			// 1primary 2advanced
			if(gameinfoVo && gameinfoVo.royalPass){
				if(type == 1){
					flag = gameinfoVo.royalPass[level] && gameinfoVo.royalPass[level].primary && gameinfoVo.royalPass[level].primary == 1;
				}
				else if(type == 2){
					if(Api.GameinfoVoApi.getIsBuyRoyalPass()){
						flag = gameinfoVo.royalPass[level] && gameinfoVo.royalPass[level].advanced && gameinfoVo.royalPass[level].advanced == 1; //gameinfoVo.royalPass[level].primary && gameinfoVo.royalPass[level].primary == 1 
					}
				}
				else{
					if(Api.GameinfoVoApi.getIsBuyRoyalPass()){
						flag = gameinfoVo.royalPass[level] && gameinfoVo.royalPass[level].primary && gameinfoVo.royalPass[level].primary == 1 && gameinfoVo.royalPass[level].advanced && gameinfoVo.royalPass[level].advanced == 1;
					}
					else{
						flag = gameinfoVo.royalPass[level] && gameinfoVo.royalPass[level].primary && gameinfoVo.royalPass[level].primary == 1;
					}
				}
			}
			return flag;
		}

		export function checkRedPoint():boolean{
			let flag = false;
			if(canGetRoyalPassReward()){
				flag = true;
			}
			return flag;
		}

		export function isGetAllRoyalPassReard():boolean{
			let flag = true;
			let cfg = Config.RoyalpassCfg.getRoyalPassCfgList();
			for(let i in cfg){
				let unit = cfg[i];
				if(!isGetRoyalPassReward(unit.id) || Api.UserinfoVoApi.getMaxScore() < unit.needScore){
					flag = false;
					break;
				}
			}
			return flag;
		}

		/**
		 * 获得剩余的协同次数
		 */
		export function getOperationNum(){
			return Config.TogetherCfg.getOperationMaxNum() - gameinfoVo.jnum;
		}
		/**
		 * 获取当天购买累计次数
		 */
		export function getOperationBuyNum(){
			return gameinfoVo.buynum;
		}

		export function getIsGuiding(){
			return curGuideId < GuideCfg.rookieCfg["guideSteps"] && curGuideId >= 0;
		}

		export function getIsFinishNewGuide(){
			return curGuideId == GuideCfg.rookieCfg["guideSteps"];
		}
		
		export function getCurGudingId(){
			if(getIsFinishNewGuide()){
				return gameinfoVo.stepId;
			}
			else{
				return curGuideId;
			}
		}

		export function checlIsInGuideId(guidid : number):boolean{
			return getIsGuiding() && getCurGudingId() == guidid;
		}

		export function checlIsInStepId(guidid : number):boolean{
			return getIsFinishNewGuide() && getCurGudingId() == guidid;
		}
		
		export function setCurGudingId(num){
			if(getIsFinishNewGuide()){
				gameinfoVo.stepId = num;
			}
			else{
				curGuideId = num;
			}
		}

		//阶段性引导 升级、协作宝箱
		export function getIsFinishStepGuide(guideid):boolean{
			return Api.GameinfoVoApi.getIsFinishNewGuide() && gameinfoVo.stepGuild && gameinfoVo.stepGuild[guideid];
			// gameinfoVo.curGuideId = num;
		}
		
		//游戏注册时间
		export function getRegdt():number
		{
			return gameinfoVo?gameinfoVo.regdt:0;
		}

		export function getADhuo(){
			return gameinfoVo && (gameinfoVo.zengfu == 1);
		}
		

		export function dispose():void
		{
			if(gameinfoVo)
			{
				gameinfoVo.dispose();
				curGuideId = 0;
				gameinfoVo=null;
			}
		}
	}
}