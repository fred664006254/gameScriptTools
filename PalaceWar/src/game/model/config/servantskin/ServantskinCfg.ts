namespace Config
{
	export namespace ServantskinCfg 
	{
		let servantSkinListCfg:Object={};
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:ServantskinItemCfg;
				if(!servantSkinListCfg.hasOwnProperty(String(key)))
				{
					servantSkinListCfg[String(key)]=new ServantskinItemCfg();
				}
				itemCfg=servantSkinListCfg[String(key)];
				itemCfg.initData(data[key]);
				itemCfg.id=String(key);
			}
		}

		export function getServantSkinItemById(id:string|number):ServantskinItemCfg
		{
			return servantSkinListCfg[String(id)];
		}

		export function getServantSkinItemByBook(id:string|number,servantId:string):ServantskinItemCfg
		{
			let obj = null;
			for (let key in servantSkinListCfg) {
				if (servantSkinListCfg.hasOwnProperty(key) ) {
					let element = servantSkinListCfg[key];
					if(element.ability){
						for (let k in element.ability)
						{
							if (Number(element.ability[k]) == Number(id) && Api.switchVoApi.checkIsServantSkinState(element.id) && element.servantId == servantId)
							{
								obj = element;
								return obj;
							}
						}						
					}
				}
			}
			return obj;
		}


		export function getServantSkinList():ServantskinItemCfg[]
		{
			let list = [];
			for (var key in servantSkinListCfg) {
				if (Api.switchVoApi.checkIsServantSkinState(key))
				{
					list.push(servantSkinListCfg[key]);
				}
			}
			return list;
		}
		export function getSkinMaxNum()
		{
			return this.getServantSkinList().length;
		}
		/**
		 * 
		 * 某门客是否配了皮肤
		 */
		export function isSkinDeploy(serid:string)
		{
			for (var key in servantSkinListCfg) {
				if (servantSkinListCfg.hasOwnProperty(key) ) {
					var element = servantSkinListCfg[key];
					if(element.servantId == serid && Api.switchVoApi.checkIsServantSkinState(element.id)){
						return true;
					}
				}
			}
			return false;
		}

		export function getIdListBySerVantId(sid:String|number)
		{
			let list = [];
			for (var key in servantSkinListCfg) {
				if (servantSkinListCfg.hasOwnProperty(key)) {
					var element = servantSkinListCfg[key];
					if(element.servantId == sid  && Api.switchVoApi.checkIsServantSkinState(element.id)){
						list.push(key);
					}
				}
			}
			return list;
		}

		export function getSkinIdByBid(bid:string)
		{
			for (var key in servantSkinListCfg) {
				if (servantSkinListCfg.hasOwnProperty(key)) {
					var ability = servantSkinListCfg[key].ability;
					for (var index = 0; index < ability.length; index++) {
						if( ability[index] == bid){
							return key;
						}
					}
				}
			}
		}

		export function formatRewardItemVoStr(id:number|string):string{
			let arr = (""+id).split("_");
			if (arr.length == 3){
				return ""+id;
			}
			return "19_"+id+"_1";
		}
		
	}

	export class ServantskinItemCfg extends BaseItemCfg
	{
		/**
		 * 门客皮肤id
		 */
		public id:string;
		/**
		 * 门客id
		 */
		public servantId:string;
		/**
		 * 对应道具
		 */
		public item:string;
		/**
		 * 
		 * 资质
		 * 
		 */
		public addAbility:string[];
		/**
		 * 增加的门客资质ID
		 */
		public ability:string[];
		/**
		 * 兑换所需道具
		 */
		public exchangeItem:any;
		/**
		 * 重复获得皮肤返还道具
		 */
		public returnItem:any;
		/** 
		 * 门客皮肤光环
		*/
		public aura:any;
		/** 
		 * 听雨轩可兑换日期
		*/
		public displayTime:number;
		/**门客背景颜色 */
		public servantBg:any;
		/**门课皮肤标签 */
		public type:number;

		/**门客衣装背景图 类型skinGround  皮肤背景  1默认  2三分天下背景*/
		public skinGround:number;

		/**门客衣装特殊光环*/
		public specialAura:any = null;
		public specialAuraCfg:ServantskinAuraCfg = null;

		public initData(data:any):void
		{
			super.initData(data);
			this.addAbility = this.ability;
			if(this.specialAura)
			{
				this.specialAuraCfg = new ServantskinAuraCfg();
				this.specialAuraCfg.initData(this.specialAura);
			}
		}

		public get skinImgPath():string
		{
			return "";
		}
		/**
		 * 皮肤的名字
		 */
		public getSkinName()
		{
			return LanguageManager.getlocal("servantSkinName" + this.id) ;
		}
		/**
		 * 皮肤的说明
		 */
		public getSkinDesc()
		{
			return LanguageManager.getlocal("servantSkinDesc" + this.id) ;
		}

		/**门客详情背景 门客详情*/
		public getServantDetailBg():string{
			return "servantdetail_skinbg_"+this.skinGround;
		}

		/**门客衣装预览背景 衣装预览*/
		public getSkinPreviewBg():string{
			return "servantskin_previewbg_"+this.skinGround;
		}

		/**门客衣装详情背景 听雨轩*/
		public getSkinDetailBg():string{
			return "servantskin_detailbg_"+this.skinGround;
		}

		/**门客衣装光环背景 听雨轩*/
		public getSkinDetailAuraBg():string{
			return "servantskin_detail_aurabg_"+this.skinGround;
		}

		/**门客衣装背景特效 龙骨 */
		public getSkinEffectBone():string{
			return "servantskin_bg_"+this.skinGround;
		}

		/**皮肤icon */
        public get icon():string
        {
            return "skin_half_" + this.id;
        }
		/**皮肤iconBg */
        public get iconBg():string
        {
            return "itembg_7"; 
        }

        /**皮肤半身像 ,暂时取的是门客资源*/ 
        public get body():string
        {
            return "skin_full_" + this.id;
        }

		 public get cell():string
        {
            return "skin_cell_" + this.id;
        }
		/**皮肤骨骼 */
        public get bone():string
        {
            return "servant_full2_"+this.id ;
		}
		
		public get name():string
        {
            return this.getSkinName();
        }

		public get servantAndSkinName():string
        {
			if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuLang()){
				return LanguageManager.getlocal("servant_newui_skinname1",[this.getSkinName(),LanguageManager.getlocal("servant_name"+this.servantId)]);
			}
			return LanguageManager.getlocal("servant_newui_skinname",[this.getSkinName(),LanguageManager.getlocal("servant_name"+this.servantId)]);
        }

		public getIconContainer(isTouchInfo?:boolean):BaseDisplayObjectContainer
		{
			let container:BaseDisplayObjectContainer=GameData.getIconContainer(this.icon,this.iconBg);
			return container;
		}

		public randomId : number = 1;
        public get sound():string
        {
			if(Api.switchVoApi.checkOpenNewSound()){
				let arr = [`effect_servant_${this.servantId}`, `effect_servant_${this.servantId}_2`, `effect_servant_${this.id}`];
				let wordIndex = App.MathUtil.getRandom(0,arr.length);
				this.randomId = wordIndex;
				return arr[wordIndex];
			}
			else{
				return "effect_servant_" + this.servantId;
			}
			
		}

		public get sound2():string
        {
			if(Api.switchVoApi.checkOpenNewSound()){
				return `effect_servant_${this.id}`;
			}
			else{
				return "effect_servant_" + this.servantId;
			}
			
		}
		
		 /**皮肤说的话 */
		public get words():string{
			//todo 后面取配置
			if(Api.switchVoApi.checkOpenNewSound()){
				let arr = [`effect_servant_${this.servantId}_cn`, `effect_servant_${this.servantId}_2_cn`, `effect_servant_${this.id}`];
				return LanguageManager.getlocal(arr[this.randomId]);
			}else{
				return LanguageManager.getlocal(`effect_servant_${this.servantId}_cn`);
			}
		}

		/**
		 * 是否还可以兑换皮肤道具 
		 */
		public canExchangeItem():boolean
		{
			let cfgNum = this.ability.length;
			let hasNum = 0;
			let servant:ServantInfoVo = Api.servantVoApi.getServantObj(this.servantId);			
			if (servant )
			{	
				let skinvo : ServantSkinVo = servant.getSkinInfobyId(this.id);
				if (skinvo)
				{
					hasNum = skinvo.getbookIdList().length;
				}
			}
			let itemNum = Api.itemVoApi.getItemNumInfoVoById(this.item);
			return  cfgNum >(hasNum+itemNum);
			// return false;
		}
	}

	export class ServantskinAuraCfg extends BaseItemCfg
	{
		/**门客皮肤给门客增加特殊光环*/
		public specialAuraType:number[];

		/**特殊光环初始加成值,初始为1级*/
		public specialAuraValue:number;

		/**特殊光环升级加成值*/
		public specialAuraLvValue:number;

		/**特殊光环最大等级*/
		public specialAuraLvMax:number;

		/**特殊光环升级所需道具ID*/
		public specialAuraLvNeed:number;

		/**特殊光环升级所需道具数量*/
		public specialAuraLvNeedNum:number[];

		/**icon*/
		public auraIcon:number;
		
		public initData(data:any):void
		{
			super.initData(data);
		}
	}
}