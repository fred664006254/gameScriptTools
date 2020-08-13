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

		export function  isTheKingTitleId(titleId:string)
		{
			return String(titleId) == "3201";
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
		/**
		 * 是否是头衔
		*/
		export function getIsTitleOnly(titleId:string):boolean
		{
			let cfg:TitleItemCfg = titleList[titleId];
			if (cfg && cfg.type==4 && cfg.isTitle==4)
			{
				return true;
			}

			return false;
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

		export function formatRewardItemVoStr(id:number|string):string{
			let arr = (""+id).split("_");
			if (arr.length == 3){
				return ""+id;
			}
			return "11_"+id+"_1";
		}

		/**
		 * 检查是否有专属头像
		 */
		export function checkHasSpecialHead(id:number|string):boolean
		{
			let cfg = getTitleCfgById(id);
			if (cfg && cfg.titleType==7)
			{
				return true;
			}
			return false;
		}

		/**
		 * 专属头像后缀
		 */
		export function getSpecialHead(id:number|string,pic?:number):any
		{	
			let str = "user_head"+id;
			let picstr:any = pic;
			if (!pic)
			{
				picstr = Api.playerVoApi.getPlayePicId();
			}
			if (!ResourceManager.hasRes(str))
			{	
				
				picstr= 888;//id+"_"+Api.playerVoApi.getUserSex(pic)
			}
			return picstr;
		}
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

		 /**
		 * 是否开放
		 */
		private _unlock:number

		public effect1:number;
		public effect2:number;
		public atkEffect:number;
		public isLvUp:number;
		public lvUpEffect1:number;
		public lvUpEffect2:number;
		public lvLimit : number;
		public changePic:number[];
		public changePicFlame:number;
		/**头像性别（1，男性；2，女性） */
		public sex:number;
		public level:number;

		public specialType:number;
		public specialId:number;
		public specialValue:number;

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

		public titleType: number;  //称号类型  1：帝 2：王 3：公 4：侯 5：卿 6：仕
		/**称号转换奖励 */
		public exchange:string
		
		/**
		 * 道具名称
		 */
		
		public get name():string 
		{
			return LanguageManager.getlocal("itemName_" + this.id);
		}
		/**
		 * 头像框的Icon
		 */
		public getHeadBgIcon():string
		{
			return "head_circle_bg_"+this.id;
		}
		/** 
		 * 是否有新变字段
		*/
		public isChangePic():boolean
		{
			return (this.changePic && this.changePic.length > 0) ? true : false;
		}


		// public get titleIcon():string
		// {
		// 	return "user_title_"+this.id;
		// }

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
			// if (this.isLvUp == 1)
			// {	
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
			// }
			// else
			// {
			// 	return LanguageManager.getlocal("itemDesc_" + this.id);
			// }
		}

		

		// 道具描述
		public get dropDesc():string
		{
			return LanguageManager.getlocal("itemDropDesc_" + this.id);
		}
		/**
		 * 称号的名字 
		 */
		public get titleName():string
		{
			return LanguageManager.getlocal("palace_titleName" + this.id);
		}

		/**
		 * 获取icon显示对象
		 */
		public getIconContainer(isTouchInfo?:boolean,num?:number):BaseDisplayObjectContainer
		{
			let container:BaseDisplayObjectContainer=GameData.getIconContainer(this.icon,this.iconBg,num);
			if(isTouchInfo)
			{
				let bg:BaseBitmap = <BaseBitmap>container.getChildByName("iconBg");
				bg.addTouchTap((event:egret.TouchEvent,id)=>{
					ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW,id);
				},GameData,[this.id]);
			}
			return container;
		}		
	}
}