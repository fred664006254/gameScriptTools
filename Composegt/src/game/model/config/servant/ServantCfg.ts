namespace Config
{
	export namespace ServantCfg 
	{
		let servantListCfg:Object={};
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
			}
		}

		export function getServantAllCfg()
		{
			return servantListCfg;
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

		/**
		 * 获取门客品质ICON资源KEY (静态图)
		 * 1-普通(没Icon) 2-名仕 3-传奇 4-神将
		 * @param sid 门客ID
		 * @return String 品质图标Key
		 */
		export function getQualityIconKeyBySid(sid: string): string {
			let _servant = Config.ServantCfg.getServantItemById(sid);
			let _icon: string = "";
			if (_servant && _servant.quality && _servant.quality > 1) {
				_icon = `servant_qualitytag${_servant.quality}`
			}
			return _icon;
		}

		/**
		 * 获取门客品质ICON资源KEY（帧动画）
		 * 1-普通(没动画) 2-名仕(没动画) 3-传奇 4-神将
		 * @param sid 门客ID
		 * @return String 品质动画Key前缀
		 */
		export function getQualityMvKeyBySid(sid: string): string {
			let _servant = Config.ServantCfg.getServantItemById(sid);
			let _icon: string = "";
			if (_servant && _servant.quality && _servant.quality > 1) {
				_icon = `servantquality${_servant.quality}_eff`
			}
			return _icon;
		}

		/**
         * 根据门客ID获取经营技能
         */
        export function getSkillLevyByServantId(servantId: string): SkillLevyCfgItem {
            let _servant: ServantItemCfg = this.getServantItemById(servantId);
            if (_servant.skillLevy) {
                return Config.SkilllevyCfg.getSkillLevyById(_servant.skillLevy);
            } else {
                return null;
            }
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
		 * 
		 * 代入感对话
		 * 
		 */
		public showType:number;
		public dialogue:string;
		public state:number;
		public combination:string[];
		public _wifeId:string;
		/**特殊技能 */
		public skillActive:string;
		/**经营技能 */
		public skillLevy: string;
		/**被动技能 */
		public skillPassive: string;
		public getType:string[];
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
		 * 特长  1：武力 2：智力 3：政治 4：魅力 5：均衡 6：全能
		 */
		public speciality:number[];

		public get specialityStr(): string[] {
			return this.speciality.map(v => {
				return LanguageManager.getlocal(`servantInfo_speciality${v}`);
			})
		}

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
		public aura:{att:number[],growAtt:number,growNeed1:string[],maxLv:number,growNeed2:string,auraIcon:number,startDemand:string,lvUpLimitType:number,lvUpDemand:string[],breaklvUpDemand:string[], breakMaxlv:number, breakGrowNeed:string[], breakSwitch:string}[]

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
		public get sound():string
		{
			return  "effect_servant_"+this.id;
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
		public getStarNums()
		{
			let num = 0;
			for (var key in this.ability) {
				if (this.ability.hasOwnProperty(key)) {
					let tmpAcfg = GameConfig.config.abilityCfg[this.ability[key]];
					num += tmpAcfg.num
				}
			}
			return num;
		}
		//获取品质框资源
		public get qualityBoxImgPath():string{
			let tmpCfg = GameConfig.config.servantCfg[this.id];
			return "servant_cardbg_" + tmpCfg.quality;
		}

		  /**皮肤半身像 ,暂时取的是门客资源*/ 
        public get body():string
        {
            return "servant_full_" + this.id;
        }
		/**皮肤骨骼 */
        public get bone():string
        {
            return "servant_full2_"+this.id ;
		}
		
		//文将还是武将
		public getServantType():string
        {
            return (3-this.showType)+'';
		}
		
		public getUnlockStr():string{
			let str = '';
			this.getType.forEach((x)=>{
				let typeArr = x.split('_');
				let type = typeArr[0];
				let param = [];
				if(typeArr.length > 1){
					if(Number(type) == 4){
						let tmp = typeArr[1].split('-');
						let aid = tmp[0];
						let code = tmp[1];
						if(aid == `fourPeople`){
							aid = 'FourPeople';
						}
						param.push(LanguageManager.getlocal(`ac${aid}-${code}_Title`));
					}
					else{
						param.push(typeArr[1]);
					}
					
				}
				else{
					if(Number(type) == 4){
						param.push('');
					}
				}
				str += `${LanguageManager.getlocal(`servantUnlockTip`, [LanguageManager.getlocal(`servantUnlockType${type}`, param)])}、`;
			});
			return str.substring(0, str.length - 1);
		}

		/**
		 * 经营技能信息
		 * 若无则返回null
		 */
		public get skillLevyInfo(): Config.SkillLevyCfgItem {
			if (this.skillLevy) {
                return Config.SkilllevyCfg.getSkillLevyById(this.skillLevy);
            } else {
                return null;
            }
		}

	}
}