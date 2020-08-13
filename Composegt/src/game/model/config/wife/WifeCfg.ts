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
	}

	export class WifeItemCfg extends BaseItemCfg
	{
		public glamour:number;
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
		 * 转换奖励字段
		 */
		public exchange:string;

		/**
		 * 红颜对话数量
		 */
		public wifeWords:number;

		public state:number;

		// 每级才艺技能1效果 全属性
		public artistrySkill_1:number;
		// 每级才艺技能2效果 百分比
		public artistrySkill_2:number;

		/**
		 * 红颜技能
		 * att  加成属性  1：武力 2：智力 3：政治 4：魅力
		 *    --growAtt  每级增加的属性
      -	-condition  技能解锁，需要红颜亲密度达到 X
		 */
		public wifeSkill:{att:number[],growAtt:number,condition:number,skillId:number}[];

		/**
		 * 对应门客
		 */
		public servantId:string;

		/**
		 * 是否具有蓝颜功能
		 */
		public isBlueFunction:number;
		/**
		 * 红转蓝剧情ID
		 */
		public blueStory:number;
				/**
		 * 蓝转红剧情ID
		 */
		public wifeStory:number;


        /**红颜名称 */

        public get name():string
        {
			if(this.isBule())
			{
				return LanguageManager.getlocal("wifeName_" + this.id+"_male");
			}
            
            return LanguageManager.getlocal("wifeName_" + this.id);
        }


		public getName(isBlue:boolean):string
		{

			if(isBlue)
			{
				return LanguageManager.getlocal("wifeName_" + this.id+"_male");
			}
            
            return LanguageManager.getlocal("wifeName_" + this.id);
		}
		/**红颜日本名称 */

        public get nameJP():string
        {
			if(String(this.id) == "222"){
				return "";
			} else {
				
				if(this.isBule())
				{
					return LanguageManager.getlocal("wifeName_" + this.id + "_jp"+"_male");
				}
				
				return LanguageManager.getlocal("wifeName_" + this.id + "_jp");
			}
            
        }
        /**红颜描述 */
        public get desc():string
        {			
			if(this.isBule())
			{
				return LanguageManager.getlocal("wifeDesc_" + this.id+"_male");
			}
            return LanguageManager.getlocal("wifeDesc_" + this.id);
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
		public getArtistrySkillList():any[]
		{
			let itemDataList = [
				{
					skillId : 1,
					artistrySkillMax : Config.WifebaseCfg.artistrySkill_1_Max	
				},{
					skillId : 2,
					artistrySkillMax : Config.WifebaseCfg.artistrySkill_2_Max	
				}
			];


			return itemDataList;
		}


        /**红颜说的话 */
        public get words():string
        {
            //todo 后面取配置
            let wordIndex = App.MathUtil.getRandom(1,4)
			if(this.isBule())
			{
				wordIndex = App.MathUtil.getRandom(1,6)
				 return LanguageManager.getlocal("wifeWords_male_" + this.id + "_" + wordIndex);
			}
            return LanguageManager.getlocal("wifeWords_" + this.id + "_" + wordIndex);
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
					if(PlatformManager.checkIsWxCfg())
					{
						return LanguageManager.getlocal("searchnewdesc_"+this.id);
					}
                    return LanguageManager.getlocal("wifeUnlock_3",[this.unlock["needVip"]]);
                }
				if(this.unlock["needQQ"])
				{
					if(PlatformManager.checkIsWxCfg())
					{
						return LanguageManager.getlocal("searchnewdesc_"+this.id);
					}
					return LanguageManager.getlocal("wifeUnlock_4");
				}
				if(this.unlock["needActive"])
				{
					return LanguageManager.getlocal("wifeUnlock_5");
				}
				if(this.unlock["needServantlv"])
				{
					let revo = GameData.formatRewardItem(this.unlock["needServantlv"])[0];
					return LanguageManager.getlocal("wifeUnlock_6",[revo.name,""+revo.num]);
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
			if(this.isBule()&&ResourceManager.hasRes("wife_half_" + this.id+"_male"))
			{
				return "wife_half_" + this.id+"_male";
			}
            return "wife_half_" + this.id;
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
			// 安希的寻访id为73
			// if (
			// 	(this.id == "211" && Api.wifeVoApi.getWifeInfoVoById(211) === null && Api.searchVoApi.getWifeValueById("73") === 0)
			// 	|| 
			// 	(this.id == "212" && Api.wifeVoApi.getWifeInfoVoById(212) === null && Api.searchVoApi.getWifeValueById("24") === 0)) {
			// 	return "wife_full3_" + this.id;
			// } else {
			// 	return "wife_full_" + this.id;
			// }
	
			// if(!Api.switchVoApi.checkOpenBuleWife()||Api.gameinfoVoApi.getSexdefault()!=1){
			// 	return "wife_full_" + this.id;
			// }
			// if(Api.wifeVoApi.getWifeInfoVoById(this.id))
			// {
			// 	let wifeInfoVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(this.id)
			// 	if(wifeInfoVo.sexflag&&wifeInfoVo.sexflag >= 1&&ResourceManager.hasRes("wife_full_" + this.id+"_male"))
			// 	{
			// 		return "wife_full_" + this.id+"_male";
			// 	}
			// }else
			// {
			// 	if(ResourceManager.hasRes("wife_full_" + this.id+"_male"))
			// 	{
			// 		return "wife_full_" + this.id+"_male";
			// 	}
			// }
			if(isBlue&&ResourceManager.hasRes("wife_full_" + this.id+"_male"))
			{
				return "wife_full_" + this.id+"_male";
			}
			return "wife_full_" + this.id;
			
        }

        /**红颜半身像 */
        public get body():string
        {
			// 安希的寻访id为73
			// if (
			// 	(this.id == "211" && Api.wifeVoApi.getWifeInfoVoById(211) === null && Api.searchVoApi.getWifeValueById("73") === 0)
			// 	|| 
			// 	(this.id == "212" && Api.wifeVoApi.getWifeInfoVoById(212) === null && Api.searchVoApi.getWifeValueById("24") === 0)) {
			// 	return "wife_full3_" + this.id;
			// } else {
			// 	return "wife_full_" + this.id;
			// }
	
			// if(!Api.switchVoApi.checkOpenBuleWife()||Api.gameinfoVoApi.getSexdefault()!=1){
			// 	return "wife_full_" + this.id;
			// }
			// if(Api.wifeVoApi.getWifeInfoVoById(this.id))
			// {
			// 	let wifeInfoVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(this.id)
			// 	if(wifeInfoVo.sexflag&&wifeInfoVo.sexflag >= 1&&ResourceManager.hasRes("wife_full_" + this.id+"_male"))
			// 	{
			// 		return "wife_full_" + this.id+"_male";
			// 	}
			// }else
			// {
			// 	if(ResourceManager.hasRes("wife_full_" + this.id+"_male"))
			// 	{
			// 		return "wife_full_" + this.id+"_male";
			// 	}
			// }
			if(this.isBule()&&ResourceManager.hasRes("wife_full_" + this.id+"_male"))
			{
				return "wife_full_" + this.id+"_male";
			}
			return "wife_full_" + this.id;
			
        }
		public isBule():boolean
		{
			if(!Api.switchVoApi.checkOpenBuleWife()||Api.gameinfoVoApi.getSexswitch()!=1){
				return false;
			}
			if(Api.wifeVoApi.getWifeInfoVoById(this.id))
			{
				let wifeInfoVo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(this.id)
				if(wifeInfoVo.sexflag&&wifeInfoVo.sexflag >= 1&&Api.wifeVoApi.checkWifeCanChangeSex(this.id))
				{
					return true;
				}
			}else
			{
				if(Api.wifeVoApi.checkWifeCanChangeSex(this.id) && Api.gameinfoVoApi.getSexdefault())
				{
					return true;
				}
			}
			return false;
		}

            /**红颜脱衣半身像 */
        public get body2():string
        {
			if(this.isBule())
			{
				 return "wife_full2_" + this.id+"_male";
			}
            return "wife_full2_" + this.id;
        }

        /**红颜声音 */
        public get sound():string
        {
			if(this.isBule())
			{
				let id = App.MathUtil.getRandom(1,4);
				return  "effect_wife_" + this.id+"_male_" + id;
			}
            return "effect_wife_" + this.id;
		}
		
		//蓝颜根据序号取声音
		public getBlueSoundBySoundId(id:number):string
        {
			return  "effect_wife_" + this.id+"_male_" + id;
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
		 /**红颜骨骼 */
        public get bone():string
        {
			if(this.isBule())
			{
				  return "wife_full_" + this.id+"_male";
			}
            return "wife_full_" + this.id;
			// return "wife_full3_3051";
        }
		 /**红颜脱衣服骨骼 */
        public get bone2():string
        {
			if(this.isBule())
			{
				  return "wife_full2_" + this.id+"_male";
			}
            return "wife_full2_" + this.id;
        }
		public constructor()
		{
			super();	
		}
	}
}