namespace Config {
    /**
     * 道具配置类
     * author shaoliang
     * date 2017/10/28
     * @namespace TitleCfg
     */

    export namespace TitleCfg {
        let titleList: Object = {};
        export function formatData(data: any): void {
            for (var key in data) {
                let titleCfg: TitleItemCfg;
                if (!titleList.hasOwnProperty(String(key))) {
                    titleList[String(key)] = new TitleItemCfg();
                }
                titleCfg = titleList[String(key)];
                titleCfg.initData(data[key]);
                titleCfg.id = String(key);
            }
        }
        /**
         * 通过道具id获取单个道具配置
         * @param id 道具id
         */
        export function getTitleCfgById(id: number|string): TitleItemCfg {
            return titleList[String(id)];
        }

         export function getTitleCfg(): Object {
            return titleList;
        }

		export function getTitleIdList()
		{
			return Object.keys(titleList);
		}
		export function getIsonlyTitleIdList()
		{
			let result = [];
			for (var key in titleList) {
				let cfg = titleList[key]
				if (Number(cfg.id) <= 3005 && cfg.isOnly == 1 && cfg.unlock == 1) {
					result.push(key);
				}
			}
			return result;
		}

		export function isTitleOPend(titleId:string)
		{
			let cfg:TitleItemCfg = titleList[titleId];
			if(!cfg)
			{
				return false;
			}
			if( cfg.state == 0&& Api.switchVoApi.checkIsTitleState(titleId))
			{
				return true;
			}

			if( cfg.state == 1 && !Api.switchVoApi.checkIsTitleState(titleId))
			{
				return true;
			}

			return false;
			
		}

		export function  isTheKingTitleId(titleId:string)
		{
			return String(titleId) == "3201";
		}
		//有等级的称号icon3
		export function getTitleIcon3WithLv(tid:string|number,tlv:string|number = 1)
		{
			if(Number(tlv) > 1){
				return  "user_title_"+tid+"_3_" + tlv;
			}
			return  "user_title_"+tid+"_3";
		}
		// export function getIsonlyTitleIdList()
		// {
		// 	let result = [];
		// 	for (var key in titleList) {
		// 		if (titleList[key].isOnly == 1) {
		// 			result.push(key);
		// 		}
		// 	}
		// 	return result;
		// }
    }

    export class TitleItemCfg extends BaseItemCfg {
		/**
		 * 道具id
		 */
		public id: string;
		/**
		 * 类型  1：道具 2：合成 3：时装
		 */
		public type: number;
		/**
		 * 分组  1委任状，2称号，3头像框，
		 */
		public group: number;
		/**
		 * 品质
		 */
		public quality: number;
		/**
		 * 排序
		 */
		public sortId: number;
		/**
		 * 是否唯一
		 */
		public isOnly: number;
        /**
		 * 是否可用 已废弃
		 */
		public isUse: number;

		public effect1:number;
		public effect2:number;
		public atkEffect:number;

		public isLvUp:number;
		public lvUpEffect1:number;
		public lvUpEffect2:number;

		public lvLimit : number = 100;
		public emperorLvUpNeed:number[] = [];
		 /**
		 * 是否开放
		 */
		public _unlock: number;
		public get unlock()
		{
			return Config.TitleCfg.isTitleOPend(this.id) ? 1 : 0
			// return this._unlock;
			// if(Config.TitleCfg.isTitleOPend(this.id))
			// {
			// 	return 1;
			// }
			// return 0;
		}

		public set unlock(value:number)
		{
			this._unlock = value;
		}
		 /**
		 * 是否跨服
		 */
		public isCross: number;

		public state: number;
		 /**
		 * 类型标识  1：称号 2：头像框
		 */
		public isTitle: number;

		public titleType: number;  //称号类型  1：帝 2：王 3：公 4：侯
		
		/**
		 * 道具名称
		 */
				public get qualityColor():number
		{
			let color:number=TextFieldConst.COLOR_QUALITY_WHITE_NEW;
			switch(Number(this.quality))
			{

				case 1:
					color=TextFieldConst.COLOR_QUALITY_WHITE_NEW;
					break;
				case 2:
					color=TextFieldConst.COLOR_QUALITY_GREEN_NEW;
					break;
				case 3:
					color=TextFieldConst.COLOR_QUALITY_BLUE_NEW;
					break;
				case 4:
					color=TextFieldConst.COLOR_QUALITY_PURPLE_NEW;
					break;
				case 5:
					color=TextFieldConst.COLOR_QUALITY_ORANGE_NEW;
					break;
				case 6:
					color=TextFieldConst.COLOR_QUALITY_RED_NEW;
					break;
				case 7:
					color=TextFieldConst.COLOR_QUALITY_YELLOW_NEW;					
					break;
				case 8:
					color=TextFieldConst.COLOR_QUALITY_GOLD_NEW;					
					break;
			}
			return color;
		}
		public get name():string 
		{
			return LanguageManager.getlocal("itemName_" + this.id);
		}

		public get titleIcon():string
		{
			return "user_title_"+this.id;
		}

		public get titleIcon2():string
		{
			return "user_title_"+this.id+"_2";
		}

		public get titleIcon3():string
		{
			return "user_title_"+this.id+"_3";
		}
		
		/**
		 * 道具图片
		 */
		public get icon():string 
		{
			return "itemicon" + this.id;
		}
		/**
		 * 道具图片背景
		 */
		public get iconBg():string 
		{
			return "itembg_" + (this.quality?this.quality:1);
		}
		// 道具描述
		public get desc():string
		{
			if (this.isLvUp == 1)
			{	
				let parms:string[] = [];
				if (this.effect1)
				{	
					parms.push(String(this.effect1));
				}
				if (this.effect2)
				{	
					parms.push(String(this.effect2*100+"%"));
				}
				if(this.atkEffect){
					parms.push(String(Math.ceil(this.atkEffect*100)));
				}
				return LanguageManager.getlocal("itemDesc_" + this.id,parms);
			}
			else
			{
				return LanguageManager.getlocal("itemDesc_" + this.id);
			}

		}
		// 道具描述
		public get dropDesc():string
		{
			return LanguageManager.getlocal("itemDropDesc_" + this.id);
		}
	}
}