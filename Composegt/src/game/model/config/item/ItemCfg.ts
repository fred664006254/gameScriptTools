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
		 * 使用条件
		 */
		public condition:number;
		/**
		 * 使用效果
		 */
		public getRewards: string;

		/**
		 * 碎片类型
		 */
		public chipType: string;

		//使用效果  特殊道具使用后是获得倍率相关资源
		public rateRewards:string;

		/**
		 * 道具名称
		 */
		public get name():string 
		{
			return LanguageManager.getlocal("itemName_" + this.id);
		}

		public get qualityColor():number
		{
			let color:number=TextFieldConst.COLOR_QUALITY_WHITE_NEW;
			switch(Number(this.quality))
			{
				// case 1:
				// 	color=TextFieldConst.COLOR_QUALITY_WHITE;
				// 	break;
				// case 2:
				// 	color=TextFieldConst.COLOR_QUALITY_GREEN;
				// 	break;
				// case 3:
				// 	color=TextFieldConst.COLOR_QUALITY_BLUE;
				// 	break;
				// case 4:
				// 	color=TextFieldConst.COLOR_QUALITY_PURPLE;
				// 	break;
				// case 5:
				// 	color=TextFieldConst.COLOR_QUALITY_ORANGE;
				// break;
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
				descStr=App.StringUtil.formatStringColor(LanguageManager.getlocal("effectTitle"),TextFieldConst.COLOR_BROWN)+this.desc;
			}
			else
			{
				descStr=this.desc;
			}
			let descTxt:BaseTextField=ComponentManager.getTextField(descStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
			descTxt.lineSpacing=2;
			return descTxt;
		}

		/**
		 * 获取icon显示对象
		 */
		public getIconContainer(isTouchInfo?:boolean):BaseDisplayObjectContainer
		{
			let container:BaseDisplayObjectContainer=GameData.getIconContainer(this.icon,this.iconBg);
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