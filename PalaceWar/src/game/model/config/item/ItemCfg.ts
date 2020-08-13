namespace Config {
	/**
	 * 道具配置类
	 * author dmj
	 * date 2017/9/25
	 * @class ItemCfg
	 */
	export namespace ItemCfg {
		let itemList: Object = {};
		export function formatData(data: any): void {
			for (var key in data) {
				let itemCfg: ItemItemCfg;
				if (!itemList.hasOwnProperty(String(key))) {
					itemList[String(key)] = new ItemItemCfg();
				}
				itemCfg = itemList[String(key)];
				itemCfg.initData(data[key]);
				itemCfg.id = String(key);
			}
		}
		/**
		 * 通过道具id获取单个道具配置
		 * @param id 道具id
		 */
		export function getItemCfgById(id: number|string): ItemItemCfg {
			return itemList[String(id)];
		}

		
	}

	export class ItemItemCfg extends BaseItemCfg {
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
		 * 是否可用
		 */
		public isUse: number;
		/**
		 * 目标  1:角色 2：门客
		 */
		public target: number;
		/**
		 * 指定目标ID 
		 */
		public targetId: number;
		/**
		 * 使用效果
		 */
		public getRewards: string;

		/**
		 * 使用效果
		 */
		public dropId: string;
		
		/**
		 * 使用效果
		 */
		public showContent: number;
		/** 
		 * 挑选奖励  特殊道具使用后可以挑选其中一个道具
		*/
		public chooseRewards: string;


		public costHeCheng: number = 0;

		/**
		 * 门客皮肤id
		 */
		public servantSkinID: number = 0;
		
		/**
		 * 道具名称
		 */
		public get name():string 
		{
			return LanguageManager.getlocal("itemName_" + this.id);
		}

		public get qualityColor():number
		{
			let color:number=GameConfig.getQualityColor(Number(this.quality));
			return color;
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
			if(GameData.isInArray(this.id,["2101"]) && Api.switchVoApi.checkWifeSkinLevelUp()){
				return LanguageManager.getlocal("itemDesc_" + this.id+"_wifeskinlevelup");
			}
			if (GameData.isInArray(this.id,[
				"1716","1717","1718","1035","1036","1037","1038","1039",
				"51001","51002","51003","51004","51005","51006","51007","51008","51009","51010",
				"51011","51012","51013","51014","51015","51016","51017","51018","51019","51020","51021","51022","51023","51024","51025","51026","51027","51028","51029","51030","51031","51032","51033","51034","51035","51036","51037","51038","51039","51040","51041","51042","51043","51044","51045","51046","51047","51048","51049","51050","51051","51052","51053","51054","51055","51056","51057","51058","51059","51060","51061","51062","51063","51064","51065","51066","51067","51068","51069","51070","51071","51072","51073","51074","51075","51076","51077","51078","51079","51080"]))
			{
				if (Api.switchVoApi.checkOpenServantLevel450())
				{
					return LanguageManager.getlocal("itemDesc_" + this.id+"_withOpen");
				}
			}
			else if (this.type == 2)
			{
				return LanguageManager.getlocal("itemDesc_" + this.id,[String(this.costHeCheng)]);
			}
			// if(this.target == 7)//门客书籍等级
			// {
			// 	let param1 = LanguageManager.getlocal("servant_name"+this.targetId);
			// 	let arry = this.getRewards.split("_");
			// 	let param2 = LanguageManager.getlocal("servant_attrNameTxt"+arry[1]);
			// 	return LanguageManager.getlocal("itemDesc_purpose_" + arry[0],[param1,param2,arry[2]]);
			// }
			// else if(this.target == 8)//红颜亲密/魅力
			// {	
			// 	let arry = this.getRewards.split("_");
			// 	let param1 = LanguageManager.getlocal("wifeName_"+arry[1]);
			// 	return LanguageManager.getlocal("itemDesc_purpose_" + arry[0],[param1,arry[2]]);
			// }
			return LanguageManager.getlocal("itemDesc_" + this.id);
		}

		// 道具掉落描述
		public get dropDesc():string
		{
			return LanguageManager.getlocal("itemDropDesc_" + this.id);
		}
		
		public get nameTxt():BaseTextField
		{
			let nameTxt:BaseTextField=ComponentManager.getTextField(this.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,this.qualityColor);
			return nameTxt;
		}

		public getDescTxt(showEffectStr?:boolean):BaseTextField
		{
			let descStr:string;
			if(showEffectStr)
			{
				descStr=App.StringUtil.formatStringColor(LanguageManager.getlocal("effectTitle"),TextFieldConst.COLOR_LIGHT_YELLOW)+this.desc;
			}
			else
			{
				descStr=this.desc;
			}
			let descTxt:BaseTextField=ComponentManager.getTextField(descStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
			descTxt.lineSpacing=2;
			return descTxt;
		}

		public descByNum(n:number):string
		{	
			let desc = "";
			if(this.target == 7)//门客书籍等级
			{
				let param1 = LanguageManager.getlocal("servant_name"+this.targetId);
				let arry = this.getRewards.split("_");
				let param2 = LanguageManager.getlocal("servant_attrNameTxt"+arry[1]);
				let value = Number(arry[2])*n;
				desc = LanguageManager.getlocal("itemDesc_purpose_" + arry[0],[param1,param2,String(value)]);
			}
			else if(this.target == 8)//红颜亲密/魅力
			{	
				let arry = this.getRewards.split("_");
				let param1 = LanguageManager.getlocal("wifeName_"+arry[1]);
				let value = Number(arry[2])*n;
				desc = LanguageManager.getlocal("itemDesc_purpose_" + arry[0],[param1,String(value)]);
			}

			let descStr=App.StringUtil.formatStringColor(LanguageManager.getlocal("effectTitle"),TextFieldConst.COLOR_LIGHT_YELLOW)+desc;
			return descStr;
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