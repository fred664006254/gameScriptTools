namespace Config
{
	/**
	 * 红颜配置
	 */
	export namespace WifeCfg 
	{
		let wifeListCfg:WifeItemCfg[]=[];
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:WifeItemCfg;
				if(!wifeListCfg.hasOwnProperty(String(key)))
				{
					wifeListCfg[String(key)]=new WifeItemCfg();
				}
				itemCfg=wifeListCfg[String(key)];
				itemCfg.initData(data[key]);
                itemCfg.id = String(key);
			}
		}

		export function getWifeCfgById(id:string|number):WifeItemCfg
		{
			return wifeListCfg[String(id)];
		}
        export function getWifeCfgList():Array<WifeItemCfg>
		{
			let list:WifeItemCfg[]=[];
				for (var key in wifeListCfg) {
					if(!Config.WifeCfg.checkIsLockedByGM(key)){
						list[key] = wifeListCfg[key];
					}
				}
			return list;
		}

		/**
		 * 获取最大长度
		 */
		export function getMaxLength():number
		{
			return Object.keys(wifeListCfg).length;
		}

		export function checkIsLockedByGM(id:string):boolean{

			let cfg = wifeListCfg[String(id)];
			if( cfg.state == 0 )
			{
				if( Api.switchVoApi.checkIsWifeLocked(id)){
					return false;
				}else{
					return true;
				}
			}
			return false;
		}

		export function formatRewardItemVoStr(id:number|string):string{
			let arr = (""+id).split("_");
			if (arr.length == 3){
				return ""+id;
			}
			return "10_"+id+"_1";
		}
	}

	export class WifeItemCfg extends BaseItemCfg
	{
        /**
		 * 红颜id
		 */
		public id: string;
		/**
		 * sortId
		 */
		public sortId: number;
		/**
		 * 品质
		 */
		public quality:number;
		/**
		 * 
		 * 代入感对话
		 * 
		 */
		public dialogue:string;
		/**
		 * 寻访进度
		 */
		public value:string;

		/**
		 * 解锁条件
		 */
		public unlock:Object;

		/**
		 * 红颜对话数量
		 */
		public wifeWords:number;
		/**初始魅力值 */
		public glamour:number;

		/**
		 * 红颜技能
		 * att  加成属性  1：武力 2：智力 3：政治 4：魅力
		 *    --growAtt  每级增加的属性
      -	-condition  技能解锁，需要红颜亲密度达到 X
		 */
		public wifeSkill:{att:number[],growAtt:number,condition:number,skillId:number}[];

		/**
		 * 红颜技能2
		 * att  加成属性  1：武力 2：智力 3：政治 4：魅力
		 *  --growAtt  每级增加的属性
         *  --condition  技能解锁，需要红颜亲密度达到 X
		 */
		public wifeSkill2:{att:number[],growAtt:number,condition:number,skillId:number}[];

		/**
		 * 对应门客
		 */
		public servantId:string;
		/**
		 * 转换奖励字段
		 */
		public exchange:string;

		/**
		 * 具备当家功能 1：具备此功能
		 */
		public canHome:number;

		/**
		 * 具备转生
		 */
		public isBlueFunction:number;
		public wifeStory:number;
        public blueStory:number;
		
        /**红颜名称 */

        public get name():string
        {
			let str = "wifeName_" + this.id;
			if(this.isBule()){
				str += `_male`;
			}
			return LanguageManager.getlocal(str);
        }
        /**红颜描述 */
        public get desc():string
        {			
			let str = "wifeDesc_" + this.id;
			if(this.isBule()){
				str += `_male`;
			}
			return LanguageManager.getlocal(str);
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
        /**红颜说的话 */
        public get words():string
        {
			let wordIndex = App.MathUtil.getRandom(1,4)
			if(this.isBule())
			{
				wordIndex = App.MathUtil.getRandom(1,6) 
				return LanguageManager.getlocal("wifeWords_male_" + this.id + "_" + wordIndex);
			}

			//todo 后面取配置
			if(Api.switchVoApi.checkOpenNewSound()){
				let arr = [`wifeWords_${this.id}_1_cn`, `wifeWords_${this.id}_2_cn`];
				return LanguageManager.getlocal(arr[this.randomId]);
			}else{
				return LanguageManager.getlocal(`wifeWords_${this.id}_${App.MathUtil.getRandom(1,4)}`);
			}
        }
        /**红颜解锁条件 */
        public get wifeunlock():string
        {
            if(this.unlock)
            {
                if(this.unlock["needPower"])
                {
                    return LanguageManager.getlocal("wifeUnlock_2",[this.unlock["needPower"]]);
                }
                if(this.unlock["needVip"])
                {
                    return LanguageManager.getlocal("wifeUnlock_3",[this.unlock["needVip"]]);
                }
				if(this.unlock["needQQ"])
				{
					return LanguageManager.getlocal("wifeUnlock_4");
				}
				if(this.unlock["needActive"])
				{
					return LanguageManager.getlocal("wifeUnlock_5");
				}
				if(this.unlock["signUp"])
                {
                    return LanguageManager.getlocal("wifeLockSignUpDesc",[this.unlock["signUp"]]);
                }
            }
            
            return LanguageManager.getlocal("wifeUnlock_1");
        }
        /**红颜背景 */
        public get bg():string
        {
			return "wifeview_bg1";			
            // return "wifeview_bg" + this.id;
        }

        /**红颜icon */
        public get icon():string
        {
			let res = "wife_half_" + this.id;
			if(this.isBule()){
				return res + "_male";
			}
			else{
				return res;
			}
		}
		
		public isBule():boolean
		{
			if(!Api.switchVoApi.checkOpenBlueWife()||Api.gameinfoVoApi.getSexswitch()!=1){
				return false;
			}
			if(Api.wifeVoApi.getWifeInfoVoById(this.id))
			{
				let wifeInfoVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(this.id)
				if(wifeInfoVo.sexflag&&wifeInfoVo.sexflag >= 1&&this.canBlueWife)
				{
					return true;
				}
			}else
			{
				if(this.canBlueWife && Api.gameinfoVoApi.getSexdefault())
				{
					return true;
				}
			}
			return false;
		}

        /**红颜半身像 */
        public get body():string
        {
			if ((this.id == "211" && Api.wifeVoApi.getWifeInfoVoById(211) === null && Api.searchVoApi.getWifeValueById("73") === 0)|| 
			(this.id == "212" && Api.wifeVoApi.getWifeInfoVoById(212) === null && Api.searchVoApi.getWifeValueById("24") === 0)){
				return "wife_full3_" + this.id;
			} 
			else{
				let res = "wife_full_" + this.id;
				if(this.isBule()){
					return res + "_male";
				}
				else{
					return res;
				}
			}
		}
		

        /**红颜脱衣半身像 */
        public get body2():string{
			let res = "wife_full2_" + this.id;
			if(this.isBule()){
				return res + "_male";
			}
			else{
				return res;
			}
		}


		/**红颜icon 区分男女 */
		public getIcon(isBlue:boolean):string
		{
			if(isBlue && ResourceManager.hasRes("wife_half_" + this.id+"_male"))
			{
				return "wife_half_" + this.id+"_male";
			}
			return "wife_half_" + this.id;
		}
		/**红颜半身像 区分男女*/
		public getBody(isBlue:boolean):string
		{
			if(isBlue&&ResourceManager.hasRes("wife_full_" + this.id+"_male"))
			{
				return "wife_full_" + this.id+"_male";
			}
			return "wife_full_" + this.id;
			
		}
		//区分男女
		public getBone(isBlue:boolean):string
		{
			if(isBlue)
			{
				  return "wife_full_" + this.id+"_male";
			}
            return "wife_full_" + this.id;
		}
		public getName(isBlue:boolean):string
		{

			if(isBlue)
			{
				return LanguageManager.getlocal("wifeName_" + this.id+"_male");
			}
            
            return LanguageManager.getlocal("wifeName_" + this.id, [], !isBlue);
		}

		
		
		private randomId : number = 1;
        /**红颜声音 */
        public get sound():string
        {
			if(this.isBule())
			{
				return  "effect_wife_" + this.id+"_male";
			}
			
			if(Api.switchVoApi.checkOpenNewSound()){
				let arr = [`effect_wife_${this.id}`, `effect_wife_${this.id}_2`];
				let wordIndex = App.MathUtil.getRandom(0,arr.length);
				this.randomId = wordIndex;
				return arr[wordIndex];
			}else{
				return `effect_wife_${this.id}`;
			}
			
		}
		//蓝颜根据序号取声音
		public getBlueSoundBySoundId(id:number):string
        {
			return  "effect_wife_" + this.id+"_male_" + id;
		}

		 /**红颜骨骼 */
        public get bone():string
        {
			let res = "wife_full_" + this.id;
			if(this.isBule()){
				return res + "_male";
			}
			else{
				return res;
			}
			// return "wife_full3_3051";
        }
		 /**红颜脱衣服骨骼 */
        public get bone2():string
        {
			let res = "wife_full2_" + this.id;
			if(this.isBule()){
				return res + "_male";
			}
			else{
				return res;
			}
		}
		
		/**看家 */
		public get canAtHome():boolean
		{
			return (this.canHome && this.canHome == 1);
		}
		/**转生 */
		public get canBlueWife():boolean
		{
			return (this.isBlueFunction && this.isBlueFunction == 1);
		}

		public constructor()
		{
			super();	
		}
	}
}