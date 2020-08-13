/**
 * 配置
 */
namespace Config
{
	/**
	 * 寻访配置
	 */
	export namespace SearchCfg
	{
		let personList:any={};
		let buildList:any={}
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				if(typeof(data[key])=="object")
				{
					if(key=="personList")
					{
						formatpersonList(data[key]);
					}
					else if(key=="buildList")
					{
						formatbuildList(data[key]);
					}
				}
				else
				{
					SearchCfg[key]=data[key];
				}
			}
		}

		function formatpersonList(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:SearchPersonItemCfg=new SearchPersonItemCfg();
				itemCfg.initData(data[key]);
				itemCfg.personId=String(key);
				personList[key]=itemCfg;
			}
		}

		function formatbuildList(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:SearchBuildItemCfg=new SearchBuildItemCfg();
				itemCfg.initData(data[key]);
				buildList[key]=itemCfg;
			}
		}

		export function getRandromPersonId():string
		{
			let keys:any[] = Object.keys(personList);
			let l:number=keys.length;
			let selectIndex:number=Math.floor(Math.random()*l);
			return String(keys[selectIndex]);
		}

		export function getPersonItemCfgByPersonId(personId:string):SearchPersonItemCfg
		{
			return personList[personId];
		}

		export function getPersonItemCfgByWifeId(wifeId:string):SearchPersonItemCfg
		{
			let resultList:SearchPersonItemCfg[]=[];
			let itemCfg:SearchPersonItemCfg=null;
			for(var key in personList)
			{
				itemCfg=personList[key];
				if(String(wifeId)==String(itemCfg.wifeId) && ! Config.WifeCfg.checkIsLockedByGM(itemCfg.wifeId))
				{
					return itemCfg;
				}
			}
			return null;
		}

		export function getPersonItemCfgListByBuildId(buildId:number):SearchPersonItemCfg[]
		{
			let resultList:SearchPersonItemCfg[]=[];
			let itemCfg:SearchPersonItemCfg=null;
			for(var key in personList)
			{
				itemCfg=personList[key];
				if(Number(buildId)==Number(itemCfg.build))
				{					 
					if(itemCfg.wifeId &&  Config.WifeCfg.checkIsLockedByGM(String(itemCfg.wifeId))){
						continue;
					}
					if(itemCfg.servantId && Config.ServantCfg.checkIsLockedByGM(String(itemCfg.servantId))){
						continue;
					}
					resultList.push(itemCfg);
				}
			}
			return resultList;
		}
	}

	class SearchPersonItemCfg extends BaseItemCfg
	{
		/**
		 * 所属建筑ID
		 */
		public build:number;

		/**
		 * 类型 1：普通  2：红颜
		 */
		public type:number;

		/**
		 * 红颜ID
		 */
		public wifeId:string;

		/**
		 * 解锁条件  条件会有VIP等级，势力值，关注官微等特殊条件  解锁寻访
		 */
		public unlock:{needVip?:number,needPower?:number,needQQ?:number,needActive?:number,needSignUp?:number};

		/**
		 * 红颜获得的进度
		 */
		public value:number;

		/**
		 * 人物Id
		 */
		public personId:string;

		/**
		 * 门客ID
		 */
		public servantId:string;

		/**
		 * 寻访奖励  奖励的类型，系数通过运势取ratioList里的值  1：银两 2：粮草 3：士兵
		 */
		public reward:number;

		/**
		 *  寻访时间要求  单位：秒
		 */
		public needTime:number;

		public get personFullIcon():string
		{
			let icon:string;
			if(this.type==2)
			{
				icon=WifeCfg.getWifeCfgById(this.wifeId).body;
			}
			else if(this.servantId)
			{
				let item = Config.ServantCfg.getServantItemById(this.servantId);//Api.servantVoApi.getFullImgPathWithId(this.servantId);
				icon = item.fullIcon;
			}
			else
			{
				icon="searchnpc_full"+this.personId;
			}
			return icon;
		}

		public get fullIconSize():{width:number,height:number}
		{
			let size:{width:number,height:number};
			if(this.type==2)
			{
				size={width:640,height:840};
			}
			else if(this.servantId)
			{
				size={width:405,height:467};
			}
			else
			{
				size={width:405,height:467};
			}
			return size;
		}

		public get name():string
		{
			let localKey:string;
			let wifeCfg = Config.WifeCfg.getWifeCfgById(this.wifeId);
			if(this.type==2)
			{
				localKey="wifeName_"+this.wifeId;
				if(wifeCfg && wifeCfg.isBule()){
					localKey = "wifeName_"+this.wifeId + "_male";
				}
			}
			else
			{
				localKey="searchPersonName"+this.personId;
				if(wifeCfg && wifeCfg.isBule()){
					localKey = "searchPersonName"+this.personId + "_male";
				}
			}
			return LanguageManager.getlocal(localKey);
		}

		public get shortDesc():string
		{
			let wifeCfg = Config.WifeCfg.getWifeCfgById(this.wifeId);
			if(wifeCfg && wifeCfg.isBule()){
				return LanguageManager.getlocal("searchPersonshortDesc"+this.personId + "_male");
			}
			return LanguageManager.getlocal("searchPersonshortDesc"+this.personId);
		}

		public get desc():string
		{
			let wifeCfg = Config.WifeCfg.getWifeCfgById(this.wifeId);
			if(wifeCfg && wifeCfg.isBule()){
				return LanguageManager.getlocal("searchPersonDesc"+this.personId + "_male");
			}
			return LanguageManager.getlocal("searchPersonDesc"+this.personId);
		}

		public get sound():string{
			let wifeCfg = Config.WifeCfg.getWifeCfgById(this.wifeId);
			if(wifeCfg && wifeCfg.isBule()){
				return LanguageManager.getlocal("searchPersonTalk"+this.personId + "_male");
			}
			return `searchPersonTalk${this.personId}`
		}

		public get words():string{
			let wifeCfg = Config.WifeCfg.getWifeCfgById(this.wifeId);
			if(wifeCfg && wifeCfg.isBule()){
				return LanguageManager.getlocal(`searchPersonTalk${this.personId}_cn` + "_male");
			}
			return LanguageManager.getlocal(`searchPersonTalk${this.personId}_cn`);
		}

		//红颜事件索引ID
		public wifeValueStory:string;

		//是否蓝颜
		public isBlue:number;
		
		//蓝颜事件索引ID
		public blueValueStory:string;

		public constructor() 
		{
			super()
		}
	}

	class SearchBuildItemCfg extends BaseItemCfg
	{
		public icon:string;
		public name:string;
		public constructor() 
		{
			super()
		}
	}
}