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
			return Object.keys(servantSkinListCfg).length;
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
					var addAbility = servantSkinListCfg[key].addAbility;
					for (var index = 0; index < addAbility.length; index++) {
						if( addAbility[index] == bid){
							return key;
						}
					}
				}
			}
		}
		
	}

	class ServantskinItemCfg extends BaseItemCfg
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
		 * 
		 * 资质
		 * 
		 */
		public addAbility:string[];
		/**
		 * 
		 * 没有对应门客是获得对应道具
		 */
		public noServExch:number;
		/**
		 * 兑换所需道具
		 */
		public exchangeItem:any;
		/**
		 * 重复获得皮肤返还道具
		 */
		public exchange:any;
		
		/**
		 * 光环
		 */
		public aura:{att:number[],growAtt:number,growNeed1:string[],maxLv:number,growNeed2:string,auraIcon:number}[]

		public amulet:string;
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
		public getSkinDropDesc()
		{
			return LanguageManager.getlocal("skinDropDesc_" + this.id) ;
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
		/**皮肤骨骼 */
        public get bone():string
        {
            return "servant_full2_"+this.id ;
        }
		public getIconContainer(isTouchInfo?:boolean):BaseDisplayObjectContainer
		{
			let container:BaseDisplayObjectContainer=GameData.getIconContainer(this.icon,this.iconBg);
			return container;
		}
	}

}