namespace Config 
{
	export namespace ChallengelvCfg
	{
		export function getAddPersonLvByChallengeId(id:number):number
		{
            let cfg = GameConfig.config.challengelvCfg;
			if(cfg && Object.keys(cfg).length){
                let addPersonLv = 0;
                for (const key in cfg) {
                    if (cfg.hasOwnProperty(key)) {
                        if(Number(id)>=Number(key)){
                            const element = cfg[key];
                            if(element.addPersonLv>=addPersonLv){
                                addPersonLv = element.addPersonLv
                            }
                        }
                    }
                }
				return addPersonLv;
			}
			return 0;
        }
        export function getNextAddChallengeId(hasPassId:number):number
		{
            let cfg = GameConfig.config.challengelvCfg;
			if(cfg && Object.keys(cfg).length){
                let nextChallengeId = 0;
                for (const key in cfg) {
                    if (cfg.hasOwnProperty(key)) {
                        if(Number(key)>Number(hasPassId)){
                            if(!nextChallengeId){
                                nextChallengeId = Number(key);
                            }
                            if(Number(key) <= nextChallengeId){
                                nextChallengeId = Number(key);
                            }
                        }
                    }
                }
				return nextChallengeId;
			}
			return 0;
		}
	}
}