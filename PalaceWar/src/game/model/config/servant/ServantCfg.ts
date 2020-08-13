namespace Config
{
	export namespace ServantCfg 
	{
		export let servantListCfg:Object={};
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:ServantItemCfg;
				if(!servantListCfg.hasOwnProperty(String(key)))
				{
					servantListCfg[String(key)]=new ServantItemCfg();
				}
				itemCfg=servantListCfg[String(key)];
				itemCfg.initData(data[key]);
				itemCfg.id=String(key);
				itemCfg._quality2 = data[key].quality2;
			}
		}

		export function getServantItemById(id:string|number):ServantItemCfg
		{
			return servantListCfg[String(id)];
		}

		export function checkIsLockedByGM(servantId:string):boolean{
			let sercfg = servantListCfg[servantId];
			if( sercfg.state == 0 )
			{
				if( Api.switchVoApi.checkIsServantLocked(servantId)){
					return false;
				}else{
					return true;
				}
			}
			return false;
		}

		//是否能门客免战
		export function checkCanAvoidAtkrace(servantId:string):boolean{
			let sercfg = servantListCfg[servantId];
			if( sercfg.avoid ){
				return true;
			}else{
				return false;
			}
			

		}

		//获取所有能免战的门客id列表
		export function getCanAvoidServantList():string[]{
			let idList = [];
			for (const key in servantListCfg) {
				if (servantListCfg.hasOwnProperty(key)) {
					const element = servantListCfg[key];
					if(element.avoid &&  (element.state == 1 ||Api.switchVoApi.checkIsServantLocked(element.id))){
						idList.push(element.id)
					}	
				}
			}
			return idList
		}

		export function formatRewardItemVoStr(id:number|string):string{
			let arr = (""+id).split("_");
			if (arr.length == 3){
				return ""+id;
			}
			return "8_"+id+"_1";
		}

	}

	export class ServantItemCfg extends BaseItemCfg
	{

		/**
		 * 门客id
		 */
		public id:string;
		/**
		 * 品质
		 */
		public quality:number;
		/**
		 * 角标品质
		 */
		public _quality2:number;
		/**
		 * 
		 * 代入感对话
		 * 
		 */
		public dialogue:string;

		public _wifeId:string;

		public get quality2():number
		{	
			if (Api.switchVoApi.checkOpenServantLvLabel())
			{
				return this._quality2;
			}
			else
			{
				return 0;
			}
		}

		public  get wifeId():string
		{
			if(!this._wifeId || Config.WifeCfg.checkIsLockedByGM(this._wifeId) ){
				return null;
			}
			return this._wifeId;
		}
		public set wifeId(tmpid:string)
		{
			this._wifeId = tmpid;
		}
		/**
		 * 特长  1：武力 2：智力 3：政治 4：魅力 5：均衡
		 */
		public speciality:number[];

		/**
		 * 门客的奖励
		 */
		public exchange:string;

		/**
		 * 资质
		 */
		public ability:string[];
		/**
		 * 光环
		 */
		public aura:{att:number[],growAtt:number,growNeed1:string[],maxLv:number,growNeed2:string,auraIcon:number}[]
		/**
		 * 门客免战
		 */
		public avoid:number;
		/**
		 * 性别
		 */
		public gender:number;

		public constructor()
		{
			super();
		}

		public get name():string
		{
			return LanguageManager.getlocal("servant_name"+this.id);
		}

		public get desc():string
		{
			return LanguageManager.getlocal("servant_Desc"+this.id);
		}

		public get story():string
		{
			return LanguageManager.getlocal("servant_story"+this.id);
		}
		/**
		 * 
		 * 对话ids
		 */
		public get dialogIds():string[]
		{
			if (this.dialogue){
				let dialogids = this.dialogue.split("_");
				return dialogids;
			} else {
				return null;
			}
		
		}
		public get fullIcon():string
		{
			return  "servant_full_"+this.id;
		}
		
		public get halfIcon():string
		{
			return  "servant_half_"+this.id;
		}
		
		private randomdId : number = 0;
		public get sound():string
		{
			
			if(Api.switchVoApi.checkOpenNewSound()){
				let arr = [`effect_servant_${this.id}`, `effect_servant_${this.id}_2`];
				this.randomdId = App.MathUtil.getRandom(0,arr.length);
				return  arr[this.randomdId];
			}
			else{
				return `effect_servant_${this.id}`;
			}
		}

		public get words():string
		{
			let arr = [`effect_servant_${this.id}_cn`, `effect_servant_${this.id}_2_cn`];
			return LanguageManager.getlocal(arr[this.randomdId]);//
		}

		// 道具描述
		public get dropDesc():string
		{
			return LanguageManager.getlocal("servantDropDesc_" + this.id);
		}

		public isContainsAbility(bid:string){
			if(this.ability.indexOf(bid) > -1){
				return true;
			}else{
				return false;
			}
		}
		// 默认总资质
		public getTotalAbility():number
		{
			let v = 0;
			for (let i =0;i < this.ability.length; i++)
			{
				let abcfg = GameConfig.config.abilityCfg[this.ability[i]];
				v+= abcfg.num;
			}
			return v;
		}

		//获取品质框资源
		public get qualityBoxImgPath():string{
			let tmpCfg = GameConfig.config.servantCfg[this.id];
			return "servant_cardbg_" + tmpCfg.quality;
		}

		// 是否有皮肤开启的光环
		public isOpenAuraBySkin():boolean
		{
            let skinList:string[] = Config.ServantskinCfg.getIdListBySerVantId(this.id);
            for(let i = 0; i < skinList.length; i++)
            {
                if(Api.servantVoApi.isOwnSkinOfSkinId(skinList[i]))
                {
                    let servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(skinList[i]);
                    if(servantSkinCfg.specialAura)
                    {
                        return true;
                    }
                }
            }
			return false;
		}
	}
}