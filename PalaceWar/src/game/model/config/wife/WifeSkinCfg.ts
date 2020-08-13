namespace Config
{
	/**
	 * 皮肤配置
	 */
	export namespace WifeskinCfg 
	{
		let wifeListCfg:Object={};
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:WifeSkinItemCfg;
				if(!wifeListCfg.hasOwnProperty(String(key)))
				{
					wifeListCfg[String(key)]=new WifeSkinItemCfg();
				}
				itemCfg=wifeListCfg[String(key)];
				itemCfg.initData(data[key]);
                itemCfg.id = String(key);
			}
		}

		export function getWifeCfgById(id:string|number):WifeSkinItemCfg
		{
			return wifeListCfg[String(id)];
		}


		export function isSkinOPend(skinId:string)
		{
			let cfg:WifeSkinItemCfg = wifeListCfg[skinId];
			if(!cfg)
			{
				return false;
			}
			if( cfg.state == 0 && Api.switchVoApi.checkIsSkinState(skinId))
			{
				return true;
			}
			else if( cfg.state == 1 && !Api.switchVoApi.checkIsSkinState(skinId))
			{
				return true;
			}
			else if(Api.wifeSkinVoApi.isOwnSkinOfSkinId(skinId))
			{
				return true;
			}
			return false;
			
		}

        export function getWifeCfgList():Array<WifeSkinItemCfg>
		{
			let arr:Array<Config.WifeSkinItemCfg> = new Array();
			for(let key in wifeListCfg)
			{	
				if (isSkinOPend(key))
				{
					arr.push(wifeListCfg[key]);
				}
			}
			return arr;
		}

		/**
		 * 获取最大长度
		 */
		export function getMaxLength():number
		{	
			let length:number = 0;
			for(let key in wifeListCfg)
			{
				if (isSkinOPend(key))
				{
					length++;
				}
			}
			return length;
			// return Object.keys(wifeListCfg).length;
		}

		export function formatRewardItemVoStr(id:number|string):string{
			let arr = (""+id).split("_");
			if (arr.length == 3){
				return ""+id;
			}
			return "16_"+id+"_1";
		}
	}

	export class WifeSkinItemCfg extends BaseItemCfg
	{
        /**
		 * 皮肤id
		 */
		public id: string;
		/**
		 * 皮肤标签类型
		 */
		public type:number;
		/**
		 * 皮肤id
		 */
		public wifeId: string;
		/**
		 * atkAdd
		 */
		public atkAdd: any;
		public atkAdd2: any;
		/**
		 * inteAdd
		 */
		public inteAdd: any;
		public inteAdd2: any;
		/**
		 * politicsAdd
		 */
		public politicsAdd: any;
		public politicsAdd2: any;
		/**
		 * charmAdd
		 */
		public charmAdd: any;
		public charmAdd2: any;
		/**
		 * 红颜亲密度增加  只增加对应红颜的亲密度
		 */
		public wifeIntimacy:number;

		/**
		 * 红颜魅力值增加  只增加对应红颜的魅力值
		 */
		public wifeGlamour:number;

		/**
		 * 子嗣恢复时间减少X  单位：秒
		 */
		public childReduce:number;
		/**
		 *  寻访恢复时间减少  单位：秒
		 */
		public searchReduce:number;
		/**
		 * 红颜传唤恢复时间减少  单位：秒
		 */
		public wifeReduce:number;

		public atkLvUpAdd:any;
        public inteLvUpAdd:any;
        public politicsLvUpAdd:any;
        public charmLvUpAdd:any;
        public wifeLvUpIntimacy:number;
		public wifeLvUpGlamour:number;
		public claim:string;
		public displayTime:number;
		/**红颜皮肤背景图类型 */
		public wifeBg:any;
		/**转换绸缎数量 */
		public itemNum:number;
		/**重复获得转换 */
		public exchange:string;
		//升级信息
		public levelUp:any;
		/**
		 * 初始状态  1：初始开启  0：初始关闭
		 */
		public state:number;
		/**
		 * 具备当家功能 1：具备此功能
		 */
		public canHome:number;
		/**
		 * 是否蓝颜的皮肤  0是女红颜的皮肤,1是男蓝颜的皮肤
		 */
		public isBlue:number;

        /**皮肤名称 */

        public get name():string
        {
            return LanguageManager.getlocal("skinName" + this.id);
        }
        /**皮肤描述 */
        public get desc():string
        {			
            return LanguageManager.getlocal("skinDesc" + this.id);
        }
		 /**皮肤描述 */
        public get desc2():string
        {			
            return LanguageManager.getlocal("skinDesc_" + this.id);
        }

		public get dropDesc():string
        {			
            return LanguageManager.getlocal("skinDropDesc_" + this.id);
		}
		public get isBlueSkin():boolean
        {			
            return this.isBlue && this.isBlue == 1;
        }
        /**皮肤说的话 */
        public get words():string
        {
            //todo 后面取配置
            // let wordIndex = App.MathUtil.getRandom(1,4)
			// return LanguageManager.getlocal("wifeWords_" + this.id + "_" + wordIndex);
			//todo 后面取配置
			if(Api.switchVoApi.checkOpenNewSound()){
				let arr = [`wifeWords_${this.wifeId}_1_cn`, `wifeWords_${this.wifeId}_2_cn`, `effect_wifeskin_${this.id}_cn`];
				if(Api.switchVoApi.checkWifeSkinLevelUp()){
					let unit = Config.WifeskinCfg.getWifeCfgById(this.id);
					let levelup = unit.levelUp;
					let skinLevel = Api.wifeSkinVoApi.getWifeSkinLV(unit.id);

					for(let j in levelup){
						let obj = levelup[j];
						if(obj && obj.levelUpUnlock){
							let tmp = String(obj.levelUpUnlock).split(`_`);
							//剧情、配音、背景
							let type = ``;
							if(tmp.length == 1){

							}
							else{
								let id = Number(tmp[1]);
								if(id < 200){
								}
								else if(id < 300){
									//有开关
									if(Api.switchVoApi.checkWifeSkinSoundOpen(unit.id) && skinLevel >= (Number(j) + 1)){
										//配音
										arr.push(`effect_wifeskin_${obj.levelUpUnlock}_cn`);
									}
								}
							}

						}
					}
				}
				return LanguageManager.getlocal(arr[this.randomId]);
			}else{
				return LanguageManager.getlocal("wifeWords_" + this.wifeId + "_" + App.MathUtil.getRandom(1,4));
			}
			
        }
      
        /**皮肤icon */
        public get icon():string
        {
            return "wife_skinhalf_" + this.id;
        }

        /**皮肤半身像 */
        public get body():string
        {
            return "wife_skin_" + this.id;
        }

            /**皮肤脱衣半身像 */
        public get body2():string
        {
            return "wife_skinfull2_" + this.id;
        }
		/**皮肤骨骼 */
        public get bone():string
        {
            return "wife_full3_" + this.id;
        }
		/**皮肤骨骼脱一夫 */
        public get bone2():string
        {
            return "wife_full4_" + this.id;
		}
		/**看家 */
		public get canAtHome():boolean
		{
			return (this.canHome && this.canHome == 1);
		}
			
		public getIcon(isBlue:boolean):string
        {
            return "wife_skinhalf_" + this.id;
		}
		/**皮肤半身像 区分男女 */
		public getBody(isBlue:boolean):string
		{
			return "wife_skin_" + this.id;
		}
		/**皮肤骨骼  区分男女 */
		public getBone(isBlue:boolean):string
		{
			return "wife_full3_" + this.id;
		}
		/**皮肤名称 区分男女 */
		public getName(isBlue:boolean):string
		{
			return LanguageManager.getlocal("skinName" + this.id,null,!isBlue);
		}
	 
		
		/**皮肤声音 */
		public randomId : number = 1;
        public get sound():string
        {
			if(Api.switchVoApi.checkOpenNewSound()){
				let arr = [`effect_wife_${this.wifeId}`, `effect_wife_${this.wifeId}_2`, `effect_wifeskin_${this.id}`];
				if(Api.switchVoApi.checkWifeSkinLevelUp()){
					let unit = Config.WifeskinCfg.getWifeCfgById(this.id);
					let levelup = unit.levelUp;
					let skinLevel = Api.wifeSkinVoApi.getWifeSkinLV(unit.id);

					for(let j in levelup){
						let obj = levelup[j];
						if(obj && obj.levelUpUnlock){
							let tmp = String(obj.levelUpUnlock).split(`_`);
							//剧情、配音、背景
							let type = ``;
							if(tmp.length == 1){

							}
							else{
								let id = Number(tmp[1]);
								if(id < 200){
								}
								else if(id < 300){
									//有开关
									if(Api.switchVoApi.checkWifeSkinSoundOpen(unit.id) && skinLevel >= (Number(j) + 1)){
										//配音
										arr.push(`effect_wifeskin_${obj.levelUpUnlock}`);
									}
								}
							}

						}
					}
				}
				let wordIndex = App.MathUtil.getRandom(0,arr.length);
				this.randomId = wordIndex;
				return arr[wordIndex];
			}
			else{
				return "effect_wifeskin_" + this.id;
			}
			
		}
		
		public constructor()
		{
			super();	
		}
	}
}